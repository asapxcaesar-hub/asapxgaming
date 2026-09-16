#!/usr/bin/env node
/**
 * Pull Games posts from https://id.nl/games into ASAPxGaming.
 *
 * Instant: DatoCMS Games-record publish → GitHub repository_dispatch
 *   event_type: idnl-publish
 *
 * Poll: npm run ingest
 *   1. https://id.nl/games hub links (when the network allows)
 *   2. https://id.nl/api/rss filtered to the Games desk only
 *
 * Site-wide RSS is Tech/TV/Smart Living as well. Those never go live.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const GAMES_HUB = 'https://id.nl/games'
export const RSS_URL_DEFAULT = 'https://id.nl/api/rss'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ingestedPath = join(root, 'content/ingested.json')
const newsDir = join(root, 'content/news')
const inboxDir = join(root, 'content/inbox')
const payloadPath = process.env.IDNL_PAYLOAD_FILE || ''

const RSS_URL = process.env.IDNL_RSS_URL || RSS_URL_DEFAULT

/** id.nl/games desk: console/PC games only, not laptops under computer-en-gaming. */
export const GAMES_DESK_HREF =
  /\/huis-en-entertainment\/computer-en-gaming\/(nintendo|playstation|xbox|spelcomputer-games)\//i

const EXCLUDE_HREF =
  /\/(laptops-en-ultrabooks|tv|film|films|series|audio|auto|auto-en-verkeer|mobiel|smartphone|tech|smart-living|koken|huishouden|zekerheid)\//i

const SKIP =
  /we-geven-|power-up-podcast|bonuslevel|kieskeurig|jurjen-tiersma|giveaway/i

export function loadJson(path, fallback) {
  if (!existsSync(path)) return fallback
  return JSON.parse(readFileSync(path, 'utf8'))
}

export function canonicalSourceUrl(url) {
  if (!url || typeof url !== 'string') return ''
  try {
    const u = new URL(url.trim())
    u.hash = ''
    u.search = ''
    const host = u.hostname.replace(/^www\./i, '').toLowerCase()
    if (host !== 'id.nl') return ''
    const path = u.pathname.replace(/\/+$/, '')
    return `https://id.nl${path}`
  } catch {
    return ''
  }
}

export function slugFromUrl(url) {
  const canon = canonicalSourceUrl(url) || url || ''
  try {
    const path = new URL(canon).pathname.replace(/\/$/, '')
    return path.split('/').filter(Boolean).pop() || ''
  } catch {
    return String(canon).split('/').filter(Boolean).pop() || ''
  }
}

export function isGamesDeskUrl(url) {
  const canon = canonicalSourceUrl(url)
  if (!canon) return false
  if (EXCLUDE_HREF.test(canon)) return false
  return GAMES_DESK_HREF.test(canon)
}

export function isSkippedPiece(item) {
  const blob = [item.slug, item.url, item.link, item.title, item.category].filter(Boolean).join(' ')
  return SKIP.test(blob)
}

export function isGamesItem(item) {
  if (isSkippedPiece(item)) return false
  const url = item.url || item.link || ''
  if (!isGamesDeskUrl(url)) return false
  const cat = String(item.category || '')
  if (/^(tech|film|tv|entertainment|smart living|auto)$/i.test(cat.trim())) return false
  return true
}

export function decode(xml) {
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

export function parseRss(xml) {
  const items = []
  const re = /<item>([\s\S]*?)<\/item>/gi
  let m
  while ((m = re.exec(xml))) {
    const block = m[1]
    const link = tag(block, 'link')
    const guid = tag(block, 'guid')
    const category = tag(block, 'category')
    const title = tag(block, 'title')
    const description = tag(block, 'description')
    const pubDate = tag(block, 'pubDate')
    const url = canonicalSourceUrl(link)
    items.push({
      link: url,
      url,
      guid,
      category,
      title,
      description,
      pubDate,
      slug: slugFromUrl(url),
      sourceId: guid || url,
    })
  }
  return items
}

export function publishedDay(pubDate) {
  const d = pubDate ? new Date(pubDate) : new Date()
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10)
  return d.toISOString().slice(0, 10)
}

export function categoryFromUrl(url) {
  if (/\/nintendo\//i.test(url)) return 'Nintendo'
  if (/\/xbox\//i.test(url)) return 'Xbox'
  if (/\/playstation\//i.test(url)) return 'PlayStation'
  return 'PC'
}

export function stripDashes(s) {
  return String(s ?? '')
    .replace(/[\u2013\u2014]/g, ':')
    .replace(/ - /g, ': ')
}

export function htmlToParagraphs(html) {
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

export function paragraphsFromNextData(html) {
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

export function linksFromGamesHub(html) {
  const hrefs = new Set()
  const re = /https?:\/\/(?:www\.)?id\.nl\/[^"'\\\s>]+/gi
  let m
  while ((m = re.exec(html))) {
    const url = canonicalSourceUrl(m[0])
    if (isGamesDeskUrl(url)) hrefs.add(url)
  }
  const rel = /href="(\/huis-en-entertainment\/computer-en-gaming\/(?:nintendo|playstation|xbox|spelcomputer-games)\/[^"]+)"/gi
  while ((m = rel.exec(html))) {
    const url = canonicalSourceUrl(`https://id.nl${m[1]}`)
    if (isGamesDeskUrl(url)) hrefs.add(url)
  }
  return [...hrefs]
}

export function unwrapPayload(payload) {
  const nested =
    payload.client_payload ||
    payload.article ||
    payload.entity ||
    payload.data ||
    payload
  const attrs = nested.attributes || nested
  const meta = attrs.metadata || nested.metadata || payload.metadata || {}
  const url = canonicalSourceUrl(
    attrs.url || attrs.canonical_url || nested.url || nested.link || meta.url || '',
  )
  const slug = attrs.slug || nested.slug || meta.slug || slugFromUrl(url)
  const body = attrs.body || attrs.content || nested.body || nested.paragraphs || meta.body || []
  const paragraphs = Array.isArray(body)
    ? body
    : typeof body === 'string'
      ? htmlToParagraphs(body).length
        ? htmlToParagraphs(body)
        : body
            .split(/\n+/)
            .map((s) => s.trim())
            .filter(Boolean)
      : []
  return {
    slug,
    url,
    title: attrs.title || nested.title || meta.title,
    summary: attrs.summary || attrs.excerpt || attrs.lede || attrs.seo_description || nested.description,
    body: paragraphs,
    publishedAt: attrs.publishedAt || attrs.published_at || nested.publishedAt || meta.publishedAt,
    pubDate: attrs.pubDate || nested.pubDate,
    category: attrs.category || nested.category || meta.category,
    coverImage: attrs.coverImage || attrs.cover_image || nested.coverImage || meta.coverImage,
    tags: attrs.tags || nested.tags || meta.tags,
    coverLabel: attrs.coverLabel || nested.coverLabel,
    seoTitle: attrs.seoTitle || nested.seoTitle,
    seoDescription: attrs.seoDescription || nested.seoDescription,
    sourceId: String(meta.id || attrs.id || nested.id || url || slug || ''),
    metadata: meta,
  }
}

function batchArticleSlugs(ts) {
  return [...ts.matchAll(/^    slug:\s*'([^']+)'/gm)].map((m) => m[1])
}

function collectSourceUrlsFromText(text) {
  return [...text.matchAll(/sourceUrl:\s*'([^']+)'/g)].map((m) => canonicalSourceUrl(m[1]))
}

export function indexSeen({ ingested = [], newsDirPath = newsDir, inboxDirPath = inboxDir } = {}) {
  const slugs = new Set()
  const urls = new Set()
  const ids = new Set()

  const remember = (slug, url, id) => {
    if (slug) slugs.add(slug)
    const canon = canonicalSourceUrl(url)
    if (canon) urls.add(canon)
    if (id) ids.add(String(id))
  }

  for (const a of ingested) {
    remember(a.slug, a.sourceUrl || a.url, a.sourceId)
  }

  if (existsSync(newsDirPath)) {
    for (const name of readdirSync(newsDirPath)) {
      if (!name.endsWith('.ts')) continue
      const batch = readFileSync(join(newsDirPath, name), 'utf8')
      for (const slug of batchArticleSlugs(batch)) remember(slug, '', '')
      for (const url of collectSourceUrlsFromText(batch)) remember('', url, '')
    }
  }

  if (inboxDirPath && existsSync(inboxDirPath)) {
    for (const name of readdirSync(inboxDirPath)) {
      if (!name.endsWith('.json')) continue
      try {
        const item = JSON.parse(readFileSync(join(inboxDirPath, name), 'utf8'))
        remember(item.slug, item.url || item.sourceUrl, item.sourceId)
      } catch {
        remember(name.replace(/\.json$/, ''), '', '')
      }
    }
  }

  return { slugs, urls, ids }
}

export function alreadyHave(seen, item) {
  const url = canonicalSourceUrl(item.url || item.link || item.sourceUrl || '')
  const slug = item.slug || slugFromUrl(url)
  const id = item.sourceId || item.id
  if (url && seen.urls.has(url)) return true
  if (slug && seen.slugs.has(slug)) return true
  if (id && seen.ids.has(String(id))) return true
  return false
}

function rememberSeen(seen, item) {
  const url = canonicalSourceUrl(item.url || item.sourceUrl || '')
  if (item.slug) seen.slugs.add(item.slug)
  if (url) seen.urls.add(url)
  if (item.sourceId) seen.ids.add(String(item.sourceId))
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

async function rewriteArticle(dutch) {
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
            'You write original English games journalism for ASAPxGaming. Author is always Kay van Elsen. The user JSON is a Dutch id.nl/games source. Use only facts, quotes, dates, scores, prices and names from that source. Do not invent. Do not omit material facts or FAQ answers. Do not produce a sentence-by-sentence clone; rewrite in English. Never use hyphen, en dash or em dash in title, excerpt, body or seo except inside existing product names. Return JSON {title, excerpt, body: string[], seoTitle, seoDescription, category, tags: string[], coverLabel}. category must be one of PlayStation, Xbox, Nintendo, PC, Industry, Indie.',
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
    sourceUrl: source.url,
    sourceId: source.sourceId || source.url,
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

export async function ingestOne(raw, seen) {
  const url = canonicalSourceUrl(raw.url || raw.link || '')
  const slug = raw.slug || slugFromUrl(url)
  if (!slug) return { status: 'skip', reason: 'no-slug' }
  const candidate = { ...raw, slug, url, sourceId: raw.sourceId || raw.id || url }
  if (!isGamesItem(candidate)) return { status: 'skip', reason: 'not-games', slug, url }
  if (alreadyHave(seen, candidate)) return { status: 'exists', slug, url }

  let source = {
    slug,
    url,
    sourceId: candidate.sourceId,
    title: raw.title,
    summary: raw.summary || raw.description || raw.excerpt || '',
    body: raw.body || raw.paragraphs || [],
    publishedAt: raw.publishedAt || publishedDay(raw.pubDate),
    category: raw.category,
    coverImage: raw.coverImage,
    metadata: raw.metadata,
  }

  source = await fillBodyFromPage(source)

  if (!process.env.OPENAI_API_KEY) {
    const dest = writeInbox(source)
    rememberSeen(seen, source)
    console.error(
      '::warning::OPENAI_API_KEY is not set. Dutch source stored in content/inbox/ and not published.',
    )
    return { status: 'inbox', reason: 'missing-openai-key', slug, url, dest }
  }

  const english = await rewriteArticle({
    title: source.title,
    excerpt: source.summary,
    url: source.url,
    body: source.body,
    metadata: source.metadata,
  }).catch((err) => {
    console.error('rewrite failed', err.message)
    return null
  })

  if (english?.title && Array.isArray(english.body) && english.body.length) {
    const article = toNews(slug, source, english)
    publish(article)
    rememberSeen(seen, article)
    const inboxFile = join(inboxDir, `${slug}.json`)
    if (existsSync(inboxFile)) unlinkSync(inboxFile)
    return { status: 'published', slug, url }
  }

  const dest = writeInbox(source)
  rememberSeen(seen, source)
  return { status: 'inbox', slug, url, dest }
}

async function fromGamesHub() {
  try {
    const html = await fetchText(GAMES_HUB)
    if (html.includes('verifying your browser') || html.includes('Just a moment') || html.includes('Vercel Security Checkpoint')) {
      console.error('id.nl/games hub behind bot wall; using RSS filter')
      return []
    }
    return linksFromGamesHub(html).map((url) => ({
      url,
      link: url,
      slug: slugFromUrl(url),
      title: '',
      sourceId: url,
    }))
  } catch (err) {
    console.error('hub fetch failed', err.message)
    return []
  }
}

async function fromRss() {
  const xml = await fetchText(RSS_URL)
  if (xml.includes('verifying your browser') || xml.includes('Just a moment')) {
    throw new Error(
      'id.nl RSS is behind a bot wall from this network. Use a DatoCMS Games webhook or set IDNL_COOKIE.',
    )
  }
  return parseRss(xml).filter(isGamesItem)
}

function mergeDiscoveries(hubItems, rssItems) {
  const byUrl = new Map()
  for (const item of [...hubItems, ...rssItems]) {
    const url = canonicalSourceUrl(item.url || item.link)
    if (!url || !isGamesDeskUrl(url)) continue
    const prev = byUrl.get(url) || {}
    byUrl.set(url, {
      ...prev,
      ...item,
      url,
      link: url,
      slug: item.slug || prev.slug || slugFromUrl(url),
      title: item.title || prev.title,
      sourceId: item.sourceId || prev.sourceId || url,
    })
  }
  return [...byUrl.values()]
}

export async function main() {
  mkdirSync(inboxDir, { recursive: true })
  const ingested = loadJson(ingestedPath, [])
  const hasKey = Boolean(process.env.OPENAI_API_KEY)
  const seen = indexSeen({
    ingested,
    newsDirPath: newsDir,
    inboxDirPath: hasKey ? '' : inboxDir,
  })
  const results = []

  if (payloadPath && existsSync(payloadPath)) {
    const payload = JSON.parse(readFileSync(payloadPath, 'utf8'))
    results.push(await ingestOne(unwrapPayload(payload), seen))
  } else if (process.env.IDNL_PAYLOAD) {
    const payload = JSON.parse(process.env.IDNL_PAYLOAD)
    results.push(await ingestOne(unwrapPayload(payload), seen))
  } else {
    const hubItems = await fromGamesHub()
    const rssItems = await fromRss()
    const items = mergeDiscoveries(hubItems, rssItems)
    for (const item of items) {
      results.push(await ingestOne(item, seen))
    }
    if (hasKey && existsSync(inboxDir)) {
      for (const name of readdirSync(inboxDir)) {
        if (!name.endsWith('.json')) continue
        const item = JSON.parse(readFileSync(join(inboxDir, name), 'utf8'))
        results.push(await ingestOne(item, seen))
      }
    }
  }

  const missingKey = results.some((r) => r.reason === 'missing-openai-key')
  if (missingKey) {
    console.error(
      '::warning::OPENAI_API_KEY is not set. No Games article was published. Check GitHub Secrets.',
    )
  }

  console.log(JSON.stringify({ ok: true, source: GAMES_HUB, results }, null, 2))
}

const invokedDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href

if (invokedDirectly) {
  main().catch((err) => {
    console.error(err.message || err)
    process.exit(1)
  })
}
