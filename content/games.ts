import { datedReleases, type DatedRelease } from '@/content/datedReleases'
import { SITE_TODAY } from '@/data/site'
import { formatDate } from '@/lib/utils'
import type { GameEntry, RelatedRef } from '@/types/content'

const slugOverrides: Record<string, string> = {
  "Fire Emblem: Fortune's Weave": 'fire-emblem-fortunes-weave',
  'Minecraft Dungeons II': 'minecraft-dungeons-2',
  'Ace Combat 8: Wings of Theve': 'ace-combat-8',
  'Gears of War: E-Day': 'gears-of-war-e-day',
  'Nintendo Switch Sports Resort': 'nintendo-switch-sports-resort',
  'Final Fantasy Resonance': 'final-fantasy-resonance',
  'Call of Duty: Modern Warfare 4': 'call-of-duty-modern-warfare-4',
  'Phantom Blade 0': 'phantom-blade-zero',
  'The Legend of Zelda: Ocarina of Time': 'zelda-ocarina-of-time-switch-2',
  'Grand Theft Auto VI': 'grand-theft-auto-vi',
  'Professor Layton and the New World of Steam': 'professor-layton-new-world-of-steam',
}

const relatedBySlug: Record<string, RelatedRef[]> = {
  'wolverine-marvel': [
    { collection: 'reviews', slug: 'wolverine-marvel' },
    { collection: 'news', slug: 'review-wolverine-is-een-fantastisch-gemaakte-game-maar-geen-fantastische-game' },
    { collection: 'news', slug: 'interview-insomniac-games-over-wolverine-reviews-openwereldgames-en-de-grote-lek' },
  ],
  'moonlighter-2': [{ collection: 'reviews', slug: 'moonlighter-2' }],
  'fire-emblem-fortunes-weave': [
    { collection: 'news', slug: 'review-fire-emblem-fortunes-weave-is-eindelijk-voor-iedereen' },
  ],
  'control-resonant': [],
  'silent-hill-townfall': [],
  'minecraft-dungeons-2': [],
  'ace-combat-8': [],
  'gears-of-war-e-day': [],
  'final-fantasy-resonance': [
    { collection: 'news', slug: 'gespeeld-final-fantasy-resonance-voelt-als-een-warm-dekentje' },
  ],
  'nintendo-switch-sports-resort': [],
  'call-of-duty-modern-warfare-4': [],
  'phantom-blade-zero': [],
  'zelda-ocarina-of-time-switch-2': [
    { collection: 'news', slug: 'the-legend-of-zelda-ocarina-of-time-remake-komt-op-5-november-naar-switch-2' },
    { collection: 'news', slug: 'nintendo-direct-van-september-2026-de-trailers-en-aankondigingen-op-een-rij' },
  ],
  'grand-theft-auto-vi': [
    { collection: 'news', slug: 'grote-artiesten-teasen-gta-6-soundtrack-alle-namen-op-een-rij' },
    { collection: 'news', slug: 'de-eerste-gta-6-stemacteur-is-officieel-bekendgemaakt' },
  ],
  pragmata: [{ collection: 'reviews', slug: 'pragmata' }],
  'resident-evil-requiem': [{ collection: 'reviews', slug: 'resident-evil-requiem' }],
  'forza-horizon-6': [
    { collection: 'reviews', slug: 'forza-horizon-6' },
  ],
  '007-first-light': [
    { collection: 'reviews', slug: '007-first-light' },
    { collection: 'news', slug: '007-first-light-op-nintendo-switch-2-laat-nog-wat-langer-op-zich-wachten' },
  ],
}

function slugify(title: string) {
  if (slugOverrides[title]) return slugOverrides[title]
  return title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function coverLabel(title: string) {
  const compact = title.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
  return compact.slice(0, 4) || 'GAME'
}

function genreFor(title: string) {
  const t = title.toLowerCase()
  if (t.includes('silent hill') || t.includes('hellraiser') || t.includes('until dawn') || t.includes('metro 2039')) {
    return 'Horror'
  }
  if (
    t.includes('fire emblem') ||
    t.includes('dawn of war') ||
    t.includes('tropico') ||
    t.includes('planet zoo')
  ) {
    return 'Strategy'
  }
  if (
    t.includes('final fantasy') ||
    t.includes('trails') ||
    t.includes('persona') ||
    t.includes('fable') ||
    t.includes('exodus')
  ) {
    return 'RPG'
  }
  if (
    t.includes('call of duty') ||
    t.includes('gears of war') ||
    t.includes('boltgun') ||
    t.includes('ace combat')
  ) {
    return 'Shooter'
  }
  if (t.includes('switch sports')) return 'Sport'
  if (t.includes('galactic racer') || t.includes('forza')) return 'Racing'
  if (t.includes('layton') || t.includes('we were here')) return 'Puzzle'
  if (t.includes('zelda') || t.includes('ocarina') || t.includes('tomb raider')) return 'Adventure'
  if (
    t.includes('moonlighter') ||
    t.includes('graveyard keeper') ||
    t.includes('trine') ||
    t.includes('pony island') ||
    t.includes('ananta')
  ) {
    return 'Indie'
  }
  return 'Action'
}

function formatPlatforms(platforms: string[]) {
  return platforms
    .map((item) => {
      if (item === 'Xbox') return 'Xbox Series'
      return item
    })
    .join(', ')
}

function fromDated(row: DatedRelease): GameEntry {
  const slug = slugify(row.title)
  const status = row.date <= SITE_TODAY ? 'released' : 'upcoming'
  const summary = `${formatDate(row.date)}. ${formatPlatforms(row.platforms)}.`
  return {
    slug,
    title: row.title,
    developer: '',
    publisher: '',
    platforms: row.platforms,
    genre: genreFor(row.title),
    releaseDate: row.date,
    status,
    summary,
    coverLabel: coverLabel(row.title),
    coverImage: row.coverImage,
    related: relatedBySlug[slug] ?? [],
    seo: {
      title: `${row.title} on the calendar`,
      description: summary,
    },
  }
}

const libraryGames: GameEntry[] = [
  {
    slug: 'wolverine-marvel',
    title: 'Marvel’s Wolverine',
    developer: 'Insomniac',
    publisher: 'Sony',
    platforms: ['PS5'],
    genre: 'Action',
    releaseDate: '2026-09-15',
    status: 'released',
    summary: '15 September 2026. PS5. Review: 7.7.',
    coverLabel: 'WOLV',
    coverImage: '/covers/wolverine-marvel.jpg',
    related: relatedBySlug['wolverine-marvel'],
    seo: {
      title: 'Marvel’s Wolverine coverage',
      description: 'Release 15 September 2026 on PS5 and ASAPxGaming review 7.7.',
    },
  },
  {
    slug: 'moonlighter-2',
    title: 'Moonlighter 2',
    developer: 'Digital Sun',
    publisher: 'Digital Sun',
    platforms: ['PC', 'PS5', 'Xbox', 'Switch 2'],
    genre: 'Indie',
    releaseDate: '2026-09-02',
    status: 'released',
    summary: '2 September 2026. PC, PS5, Xbox Series, Switch 2. Review: 8.2.',
    coverLabel: 'MOON',
    coverImage: '/covers/moonlighter-2.jpg',
    related: relatedBySlug['moonlighter-2'],
    seo: {
      title: 'Moonlighter 2 coverage',
      description: 'Release 2 September 2026 and ASAPxGaming review 8.2.',
    },
  },
  {
    slug: 'resident-evil-requiem',
    title: 'Resident Evil Requiem',
    developer: 'Capcom',
    publisher: 'Capcom',
    platforms: ['PC', 'PS5', 'Xbox', 'Switch 2'],
    genre: 'Horror',
    releaseDate: '2026-02-27',
    status: 'released',
    summary: '27 February 2026. PC, PS5, Xbox Series, Switch 2. Review: 8.7.',
    coverLabel: 'REQ',
    coverImage: '/covers/resident-evil-requiem.jpg',
    related: relatedBySlug['resident-evil-requiem'],
    seo: {
      title: 'Resident Evil Requiem coverage',
      description: 'Release 27 February 2026 and ASAPxGaming review 8.7.',
    },
  },
  {
    slug: 'pragmata',
    title: 'Pragmata',
    developer: 'Capcom',
    publisher: 'Capcom',
    platforms: ['PC', 'PS5', 'Xbox', 'Switch'],
    genre: 'Action',
    releaseDate: '2026-04-17',
    status: 'released',
    summary: '17 April 2026. PC, PS5, Xbox Series, Switch. Review: 8.5.',
    coverLabel: 'PRAG',
    coverImage: '/covers/pragmata.jpg',
    related: relatedBySlug.pragmata,
    seo: {
      title: 'Pragmata coverage',
      description: 'Release 17 April 2026 and ASAPxGaming review 8.5.',
    },
  },
  {
    slug: 'forza-horizon-6',
    title: 'Forza Horizon 6',
    developer: 'Playground Games',
    publisher: 'Xbox Game Studios',
    platforms: ['PC', 'Xbox'],
    genre: 'Racing',
    releaseDate: '2026-05-19',
    status: 'released',
    summary: '19 May 2026. PC and Xbox Series. Review: 8.9.',
    coverLabel: 'FH6',
    coverImage: '/covers/forza-horizon-6.jpg',
    related: relatedBySlug['forza-horizon-6'],
    seo: {
      title: 'Forza Horizon 6 coverage',
      description: 'Release 19 May 2026 Xbox and PC, ASAPxGaming review 8.9.',
    },
  },
  {
    slug: '007-first-light',
    title: '007 First Light',
    developer: 'IO Interactive',
    publisher: 'IO Interactive',
    platforms: ['PC', 'PS5', 'Xbox'],
    genre: 'Action',
    releaseDate: '2026-05-27',
    status: 'released',
    summary: '27 May 2026. PC, PS5, Xbox Series. Review: 8.6.',
    coverLabel: '007',
    coverImage: '/covers/007-first-light.jpg',
    related: relatedBySlug['007-first-light'],
    seo: {
      title: '007 First Light coverage',
      description: 'Release 27 May 2026, ASAPxGaming review 8.6.',
    },
  },
]

const datedGames = datedReleases.map(fromDated)
const datedSlugs = new Set(datedGames.map((game) => game.slug))

export const games: GameEntry[] = [...libraryGames.filter((game) => !datedSlugs.has(game.slug)), ...datedGames]
