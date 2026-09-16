#!/usr/bin/env node
/**
 * Pull Games posts from id.nl into ASAPxGaming.
 *
 * Instant path: DatoCMS (or id.nl) POSTs to GitHub repository_dispatch
 *   event_type: idnl-publish
 *   client_payload: { slug, title, summary, body, publishedAt, category, url }
 *
 * Poll path: npm run ingest  (reads https://id.nl/api/rss, Games only)
 *
 * Full English bodies are only written when OPENAI_API_KEY is set, or when the
 * webhook already sends English `body` paragraphs. Dutch stubs land in
 * content/inbox/ and do not go live.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ingestedPath = join(root, 'content/ingested.json')
const batchAPath = join(root, 'content/news/batch-a.ts')
const inboxDir = join(root, 'content/inbox')
const payloadPath = process.env.IDNL_PAYLOAD_FILE || ''

const RSS_URL = process.env.IDNL_RSS_URL || 'https://id.nl/api/rss'
const GAMES_HREF =
  /\/huis-en-entertainment\/computer-en-gaming\/(nintendo|playstation|xbox|spelcomputer-games)\//i
const SKIP =
  /we-geven-|power-up-podcast|bonuslevel|kieskeurig|jurjen-tiersma/i

function loadJson(path, fallback) {
  if (!existsSync(path)) return fallback
  return JSON.parse(readFileSync(path, 'utf8'))
}

function existingSlugs() {
  const ingested = loadJson(ingestedPath, [])
  const batch = existsSync(batchAPath) ? readFileSync(batchAPath, 'utf8') : ''
  const fromBatch = [...batch.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
  return new Set([...ingested.map((a) => a.slug), ...fromBatch])
}

function slugFromUrl(url) {
  try {
    const path = new URL(url).pathname.replace(/\/$/, '')
    return path.split('/').filter(Boolean).pop() || ''
  } catch {
    return ''
  }
}

function decode(xml) {
  return xml
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'))
  return m ? decode(m[1]).trim() : ''
}

function parseRss(xml) {
  const items = []
  const re = /<item>([\s\S]*?)<\/item>/gi
  let m
  while ((m = re.exec(xml))) {
    const block = m[1]
    const link = tag(block, 'link')
    const category = tag(block, 'category')
    const title = tag(block, 'title')
    const description = tag(block, 'description')
    const pubDate = tag(block, 'pubDate')
    const slug = slugFromUrl(link)
    items.push({ link, category, title, description, pubDate, slug })
  }
  return items
}

function isGamesItem(item) {
  if (SKIP.test(item.slug) || SKIP.test(item.link) || SKIP.test(item.title)) return false
  if (/^Games$/i.test(item.category)) return true
  return GAMES_HREF.test(item.link)
}

function publishedDay(pubDate) {
  const d = pubDate ? new Date(pubDate) : new Date()
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10)
  return d.toISOString().slice(0, 10)
}

function categoryFromUrl(url) {
  if (/\/nintendo\//i.test(url)) return 'Nintendo'
  if (/\/xbox\//i.test(url)) return 'Xbox'
  if (/\/playstation\//i.test(url)) return 'PlayStation'
  return 'PC'
}

function stripDashes(s) {
  return s.replace(/[\u2013\u2014]/g, ':').replace(/ - /g, ': ')
}

async function fetchText(url) {
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (compatible; ASAPxGamingIngest/1.0; +https://asaspxgaming.wasmer.app)',
    Accept: 'application/rss+xml, application/json, text/html;q=0.9, */*;q=0.8',
  }
  if (process.env.IDNL_COOKIE) headers.Cookie = process.env.IDNL_COOKIE
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  return res.text()
}

async function translateArticle(dutch) {
  const key = process.env.OPENAI_API_KEY
  if (!key) return null
  const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini'
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You translate Dutch games journalism into full English for ASAPxGaming. Author is always Kay van Elsen. Do not invent facts. Do not omit paragraphs. Never use hyphen, en dash or em dash in title, excerpt, body or seo. Return JSON {title, excerpt, body: string[], seoTitle, seoDescription, category, tags: string[], coverLabel}. category must be one of PlayStation, Xbox, Nintendo, PC, Industry, Indie.',
        },
        {
          role: 'user',
          content: JSON.stringify(dutch),
        },
      ],
    }),
  })
  if (!res.ok) throw new Error(`openai ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return JSON.parse(data.choices[0].message.content)
}

function toNews(slug, source, english) {
  const cover =
    source.coverImage ||
    '/covers/articles/grand-theft-auto-vi.jpg'
  return {
    slug,
    title: stripDashes(english.title),
    excerpt: stripDashes(english.excerpt),
    author: 'Kay van Elsen',
    publishedAt: source.publishedAt,
    category: english.category || categoryFromUrl(source.url),
    tags: english.tags || [categoryFromUrl(source.url)],
    coverLabel: (english.coverLabel || 'NEWS').slice(0, 6).toUpperCase(),
    coverImage: cover,
    related: [],
    seo: {
      title: stripDashes(english.seoTitle || english.title),
      description: stripDashes(english.seoDescription || english.excerpt).slice(0, 160),
    },
    body: (english.body || []).map(stripDashes),
  }
}

function writeInbox(item) {
  mkdirSync(inboxDir, { recursive: true })
  const dest = join(inboxDir, `${item.slug}.json`)
  writeFileSync(dest, JSON.stringify(item, null, 2) + '\n')
  return dest
}

async function ingestOne(raw) {
  const slug = raw.slug || slugFromUrl(raw.url || raw.link || '')
  if (!slug) return { status: 'skip', reason: 'no-slug' }
  if (existingSlugs().has(slug)) return { status: 'exists', slug }
  if (SKIP.test(slug) || SKIP.test(raw.title || '')) return { status: 'skip', reason: 'filtered', slug }

  const source = {
    slug,
    url: raw.url || raw.link,
    title: raw.title,
    summary: raw.summary || raw.description || raw.excerpt || '',
    body: raw.body || raw.paragraphs || [],
    publishedAt: raw.publishedAt || publishedDay(raw.pubDate),
    category: raw.category,
    coverImage: raw.coverImage,
  }

  if (Array.isArray(raw.body) && raw.language === 'en') {
    const article = toNews(slug, source, {
      title: raw.title,
      excerpt: source.summary,
      body: raw.body,
      category: raw.category,
      tags: raw.tags,
      coverLabel: raw.coverLabel,
      seoTitle: raw.seoTitle,
      seoDescription: raw.seoDescription,
    })
    const list = loadJson(ingestedPath, [])
    list.unshift(article)
    writeFileSync(ingestedPath, JSON.stringify(list, null, 2) + '\n')
    return { status: 'published', slug }
  }

  const english = await translateArticle({
    title: source.title,
    excerpt: source.summary,
    url: source.url,
    body: source.body,
  }).catch((err) => {
    console.error('translate failed', err.message)
    return null
  })

  if (english?.title && Array.isArray(english.body) && english.body.length) {
    const article = toNews(slug, source, english)
    const list = loadJson(ingestedPath, [])
    list.unshift(article)
    writeFileSync(ingestedPath, JSON.stringify(list, null, 2) + '\n')
    return { status: 'published', slug }
  }

  const dest = writeInbox(source)
  return { status: 'inbox', slug, dest }
}

async function fromRss() {
  const xml = await fetchText(RSS_URL)
  if (xml.includes('verifying your browser') || xml.includes('Just a moment')) {
    throw new Error(
      'id.nl RSS is behind a bot wall from this network. Use a DatoCMS webhook (instant) or set IDNL_COOKIE.',
    )
  }
  return parseRss(xml).filter(isGamesItem)
}

async function main() {
  mkdirSync(inboxDir, { recursive: true })
  const results = []

  if (payloadPath && existsSync(payloadPath)) {
    const payload = JSON.parse(readFileSync(payloadPath, 'utf8'))
    const article = payload.client_payload || payload.article || payload
    results.push(await ingestOne(article))
  } else if (process.env.IDNL_PAYLOAD) {
    const payload = JSON.parse(process.env.IDNL_PAYLOAD)
    const article = payload.client_payload || payload.article || payload
    results.push(await ingestOne(article))
  } else {
    const items = await fromRss()
    for (const item of items) {
      results.push(await ingestOne(item))
    }
  }

  console.log(JSON.stringify({ ok: true, results }, null, 2))
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
