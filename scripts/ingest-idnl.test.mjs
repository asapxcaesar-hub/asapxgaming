import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  alreadyHave,
  canonicalSourceUrl,
  indexSeen,
  isGamesDeskUrl,
  isGamesItem,
  isSkippedPiece,
  linksFromGamesHub,
  parseRss,
  slugFromUrl,
  unwrapPayload,
} from './ingest-idnl.mjs'

const fe =
  'https://id.nl/huis-en-entertainment/computer-en-gaming/nintendo/review-fire-emblem-fortunes-weave-is-eindelijk-voor-iedereen'
const laptop =
  'https://id.nl/huis-en-entertainment/computer-en-gaming/laptops-en-ultrabooks/sandboxie-plus-veilig-in-de-zandbak'
const tv =
  'https://id.nl/huis-en-entertainment/beeld-en-geluid/tv/streamtips-nieuwe-films-en-series-neagley-monster-the-lizzie-borden-story-en-superman'
const giveaway =
  'https://id.nl/huis-en-entertainment/computer-en-gaming/playstation/we-geven-marvels-wolverine-weg'

test('canonicalSourceUrl strips www, query and slash', () => {
  assert.equal(
    canonicalSourceUrl('https://www.id.nl/huis-en-entertainment/computer-en-gaming/nintendo/foo/?utm=1'),
    'https://id.nl/huis-en-entertainment/computer-en-gaming/nintendo/foo',
  )
  assert.equal(canonicalSourceUrl('https://ign.com/x'), '')
})

test('Games desk URLs exclude Tech laptops, TV and film', () => {
  assert.equal(isGamesDeskUrl(fe), true)
  assert.equal(isGamesDeskUrl(laptop), false)
  assert.equal(isGamesDeskUrl(tv), false)
  assert.equal(isGamesDeskUrl('https://id.nl/games'), false)
})

test('giveaways and podcasts are skipped', () => {
  assert.equal(isSkippedPiece({ url: giveaway, slug: 'we-geven-marvels-wolverine-weg', title: 'We geven Marvel’s Wolverine weg' }), true)
  assert.equal(
    isSkippedPiece({
      slug: 'wolverine-stelt-teleur-power-up-podcast-30',
      url: 'https://id.nl/huis-en-entertainment/computer-en-gaming/playstation/wolverine-stelt-teleur-power-up-podcast-30',
      title: 'Power-Up Podcast',
    }),
    true,
  )
  assert.equal(isGamesItem({ url: fe, slug: slugFromUrl(fe), title: 'Review', category: 'Games' }), true)
  assert.equal(isGamesItem({ url: giveaway, slug: slugFromUrl(giveaway), title: 'We geven', category: 'Games' }), false)
  assert.equal(isGamesItem({ url: laptop, slug: slugFromUrl(laptop), title: 'Sandboxie', category: 'Tech' }), false)
  assert.equal(isGamesItem({ url: tv, slug: slugFromUrl(tv), title: 'Streamtips', category: 'Entertainment' }), false)
})

test('RSS parser keeps only Games-desk items when filtered', () => {
  const xml = `<?xml version="1.0"?>
  <rss><channel>
    <item><title>TV</title><link>${tv}</link><category>Entertainment</category></item>
    <item><title>FE</title><link>${fe}</link><category>Games</category><guid>dato-1</guid></item>
    <item><title>Laptop</title><link>${laptop}</link><category>Tech</category></item>
  </channel></rss>`
  const items = parseRss(xml).filter(isGamesItem)
  assert.equal(items.length, 1)
  assert.equal(items[0].url, fe)
  assert.equal(items[0].sourceId, 'dato-1')
})

test('hub HTML extraction only keeps Games desk hrefs', () => {
  const html = `
    <a href="${fe}">fe</a>
    <a href="${laptop}">laptop</a>
    <a href="${tv}">tv</a>
    <a href="/huis-en-entertainment/computer-en-gaming/playstation/gta-6">gta</a>
  `
  const links = linksFromGamesHub(html)
  assert.ok(links.includes(fe))
  assert.ok(links.includes('https://id.nl/huis-en-entertainment/computer-en-gaming/playstation/gta-6'))
  assert.ok(!links.includes(laptop))
  assert.ok(!links.some((u) => u.includes('/tv/')))
})

test('dedupe on source URL, slug and stable id', () => {
  const dir = mkdtempSync(join(tmpdir(), 'asap-ingest-'))
  const newsDirPath = join(dir, 'news')
  const inboxDirPath = join(dir, 'inbox')
  mkdirSync(newsDirPath)
  mkdirSync(inboxDirPath)
  writeFileSync(
    join(newsDirPath, 'batch-a.ts'),
    `export const newsBatchA = [\n  {\n    slug: 'review-fire-emblem-fortunes-weave-is-eindelijk-voor-iedereen',\n    title: 'x',\n  },\n]\n`,
  )
  const ingested = [
    {
      slug: 'wardogs',
      sourceUrl: 'https://id.nl/huis-en-entertainment/computer-en-gaming/spelcomputer-games/militaire-shooter-wardogs-is-een-groot-succes-in-early-access',
      sourceId: 'dato-wardogs',
    },
  ]
  writeFileSync(
    join(inboxDirPath, 'pending.json'),
    JSON.stringify({
      slug: 'pending-slug',
      url: 'https://id.nl/huis-en-entertainment/computer-en-gaming/xbox/pending-slug',
      sourceId: 'inbox-1',
    }),
  )
  const seen = indexSeen({ ingested, newsDirPath, inboxDirPath })
  assert.equal(
    alreadyHave(seen, { slug: 'review-fire-emblem-fortunes-weave-is-eindelijk-voor-iedereen', url: fe }),
    true,
  )
  assert.equal(
    alreadyHave(seen, {
      slug: 'other',
      url: ingested[0].sourceUrl,
    }),
    true,
  )
  assert.equal(alreadyHave(seen, { slug: 'x', url: 'https://id.nl/huis-en-entertainment/computer-en-gaming/xbox/x', sourceId: 'dato-wardogs' }), true)
  assert.equal(
    alreadyHave(seen, {
      slug: 'brand-new',
      url: 'https://id.nl/huis-en-entertainment/computer-en-gaming/nintendo/brand-new',
    }),
    false,
  )
})

test('Dato webhook unwrap keeps url, lede, body and metadata id', () => {
  const raw = unwrapPayload({
    event_type: 'idnl-publish',
    client_payload: {
      slug: 'foo-bar',
      url: fe,
      title: 'Dutch title',
      summary: 'Dutch lede',
      publishedAt: '2026-09-16',
      category: 'Nintendo',
      branch: 'main',
      body: ['Para 1', 'Para 2'],
      metadata: { id: 'dato-99', tags: ['Nintendo'] },
    },
  })
  assert.equal(raw.url, fe)
  assert.equal(raw.summary, 'Dutch lede')
  assert.deepEqual(raw.body, ['Para 1', 'Para 2'])
  assert.equal(raw.sourceId, 'dato-99')
})
