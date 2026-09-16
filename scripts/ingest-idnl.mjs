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

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ingestedPath = join(root, 'content/ingested.json')
const newsDir = join(root, 'content/news')
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
  const fromBatches = []
  if (existsSync(newsDir)) {
    for (const name of readdirSync(newsDir)) {
      if (!name.endsWith('.ts')) continue
      const batch = readFileSync(join(newsDir, name), 'utf8')
      fromBatches.push(...[...batch.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]))
    }
  }
  return new Set([...ingested.map((a) => a.slug), ...fromBatches])
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
  return String(s ?? '')
    .replace(/[\u2013\u2014]/g, ':')
    .replace(/ - /g, ': ')
}

function htmlToParagraphs(html) {
  return decode(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<\/(p|h[1-6]|li|blockquote|div|figcaption)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .split(/\n+/)
    .map((s) => s.replace(/\s+/g, ' ').trim())
    .filter((s) => s.length > 40 && !/cookie|consent|verifying your browser/i.test(s))
}

function walk(node, visit) {
  if (!node || typeof node !== 'object') return
  visit(node)
  if (Array.isArray(node)) {
    for (const child of node) walk(child, visit)
    return
  }
  for (const value of Object.values(node)) walk(value, visit)
}

function paragraphsFromNextData(html) {
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i)
  if (!m) return []
  let data
  try {
    data = JSON.parse(m[1])
  } catch {
    return []
  }
  const out = []
  walk(data, (node) => {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return
    if (Array.isArray(node.contentBlocks)) {
      for (const block of node.contentBlocks) {
        const htmlBlock = block?.html || block?.content || block?.text || ''
        if (typeof htmlBlock === 'string' && htmlBlock.trim()) {
          out.push(...htmlToParagraphs(htmlBlock))
        }
        if (block?.header || block?.title) out.push(String(block.header || block.title).trim())
      }
    }
    if (typeof node.body === 'string' && node.body.includes('<')) {
      out.push(...htmlToParagraphs(node.body))
    }
  })
  return [...new Set(out)]
}

function unwrapPayload(payload) {
  const nested =
    payload.client_payload ||
    payload.article ||
    payload.entity ||
    payload.data ||
    payload
  const attrs = nested.attributes || nested
  const slug =
    attrs.slug ||
    nested.slug ||
    slugFromUrl(attrs.url || attrs.canonical_url || nested.url || '')
  const body = attrs.body || attrs.content || nested.body || nested.paragraphs || []
  const paragraphs = Array.isArray(body)
    ? body
    : typeof body === 'string'
      ? htmlToParagraphs(body).length
        ? htmlToParagraphs(body)
        : body.split(/\n+/).map((s) => s.trim()).filter(Boolean)
      : []
  return {
    slug,
    url: attrs.url || attrs.canonical_url || nested.url || nested.link,
    title: attrs.title || nested.title,
    summary: attrs.summary || attrs.excerpt || attrs.seo_description || nested.description,
    body: paragraphs,
    publishedAt: attrs.publishedAt || attrs.published_at || nested.publishedAt,
    pubDate: attrs.pubDate || nested.pubDate,
    category: attrs.category || nested.category,
    coverImage: attrs.coverImage || attrs.cover_image || nested.coverImage,
    language: attrs.language || nested.language,
    tags: attrs.tags || nested.tags,
    coverLabel: attrs.coverLabel || nested.coverLabel,
    seoTitle: attrs.seoTitle || nested.seoTitle,
    seoDescription: attrs.seoDescription || nested.seoDescription,
  }
}

async function fetchText(url) {
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (compatible; ASAPxGamingIngest/1.0; +https://asaspxgaming.wasmer.app)',
    Accept: 'application/rss+xml, application/json, text/html;q=0.9, */*;q=0.8',
  }
  if (process.env.IDNL_COOKIE) headers.Cookie = process.env.IDNL_COOKIE
  const res = await fetch(url, { headers, redirect: 'follow' })
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  return res.text()
}

async function fillBodyFromPage(source) {
  if (Array.isArray(source.body) && source.body.length >= 3) return source
  if (!source.url) return source
  try {
    const html = await fetchText(source.url)
    if (html.includes('verifying your browser') || html.includes('Just a moment')) {
      console.error('article page behind bot wall', source.url)
      return source
    }
    const fromNext = paragraphsFromNextData(html)
    const fromHtml = htmlToParagraphs(html)
    const body = fromNext.length >= 3 ? fromNext : fromHtml
    if (body.length) source.body = body
  } catch (err) {
    console.error('page fetch failed', err.message)
  }
  return source
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
            'You translate Dutch games journalism into full English for ASAPxGaming. Author is always Kay van Elsen. Do not invent facts. Do not omit paragraphs. Never use hyphen, en dash or em dash in title, excerpt, body or seo except inside existing product names. Return JSON {title, excerpt, body: string[], seoTitle, seoDescription, category, tags: string[], coverLabel}. category must be one of PlayStation, Xbox, Nintendo, PC, Industry, Indie.',
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
  const cover = source.coverImage || '/covers/articles/grand-theft-auto-vi.jpg'
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

function publish(article) {
  const list = loadJson(ingestedPath, [])
  list.unshift(article)
  writeFileSync(ingestedPath, JSON.stringify(list, null, 2) + '\n')
}

async function ingestOne(raw) {
  const slug = raw.slug || slugFromUrl(raw.url || raw.link || '')
  if (!slug) return { status: 'skip', reason: 'no-slug' }
  if (existingSlugs().has(slug)) return { status: 'exists', slug }
  if (SKIP.test(slug) || SKIP.test(raw.title || '')) return { status: 'skip', reason: 'filtered', slug }

  let source = {
    slug,
    url: raw.url || raw.link,
    title: raw.title,
    summary: raw.summary || raw.description || raw.excerpt || '',
    body: raw.body || raw.paragraphs || [],
    publishedAt: raw.publishedAt || publishedDay(raw.pubDate),
    category: raw.category,
    coverImage: raw.coverImage,
  }

  source = await fillBodyFromPage(source)

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
    publish(article)
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
    publish(toNews(slug, source, english))
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
    results.push(await ingestOne(unwrapPayload(payload)))
  } else if (process.env.IDNL_PAYLOAD) {
    const payload = JSON.parse(process.env.IDNL_PAYLOAD)
    results.push(await ingestOne(unwrapPayload(payload)))
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
