import type { DatedRelease } from '@/content/gamespotDated'
import { gamespotDated2026 } from '@/content/gamespotDated'
import { SITE_TODAY } from '@/data/site'
import { formatDate } from '@/lib/utils'
import type { GameEntry, RelatedRef } from '@/types/content'

const slugOverrides: Record<string, string> = {
  'Marvel’s Wolverine': 'wolverine-marvel',
  'Moonlighter 2': 'moonlighter-2',
  'Fire Emblem: Fortune’s Weave': 'fire-emblem-fortunes-weave',
  'Control Resonant': 'control-resonant',
  'Silent Hill: Townfall': 'silent-hill-townfall',
  'Minecraft Dungeons 2': 'minecraft-dungeons-2',
  'Ace Combat 8: Wings of Theve': 'ace-combat-8',
  'Gears of War: E-Day': 'gears-of-war-e-day',
  'Final Fantasy Resonance': 'final-fantasy-resonance',
  'Nintendo Switch Sports Resort': 'nintendo-switch-sports-resort',
  'Call of Duty: Modern Warfare 4': 'call-of-duty-modern-warfare-4',
  'Phantom Blade Zero': 'phantom-blade-zero',
  'The Legend of Zelda: Ocarina of Time': 'zelda-ocarina-of-time-switch-2',
  'Grand Theft Auto 6': 'grand-theft-auto-vi',
  'Dragon Quest Monsters: The Withered World': 'dragon-quest-monsters-withered-world',
  'Monster Hunter Wilds': 'monster-hunter-wilds-switch-2',
  'Professor Layton and the New World of Steam': 'professor-layton-new-world-of-steam',
  'Path of Exile 2': 'path-of-exile-2',
}

const coverBySlug: Record<string, string> = {
  'wolverine-marvel': '/covers/wolverine-marvel.jpg',
  'grand-theft-auto-vi': '/covers/grand-theft-auto-vi.jpg',
  pragmata: '/covers/pragmata.jpg',
  'resident-evil-requiem': '/covers/resident-evil-requiem.jpg',
  'forza-horizon-6': '/covers/forza-horizon-6.jpg',
  '007-first-light': '/covers/007-first-light.jpg',
  'moonlighter-2': '/covers/moonlighter-2.jpg',
}

const relatedBySlug: Record<string, RelatedRef[]> = {
  'wolverine-marvel': [
    { collection: 'reviews', slug: 'wolverine-marvel' },
    { collection: 'news', slug: 'wolverine-is-uit' },
  ],
  'moonlighter-2': [
    { collection: 'reviews', slug: 'moonlighter-2' },
    { collection: 'news', slug: 'moonlighter-2-is-uit' },
  ],
  'fire-emblem-fortunes-weave': [{ collection: 'news', slug: 'fire-emblem-overmorgen' }],
  'control-resonant': [{ collection: 'news', slug: 'september-na-wolverine' }],
  'silent-hill-townfall': [{ collection: 'news', slug: 'september-na-wolverine' }],
  'minecraft-dungeons-2': [{ collection: 'news', slug: 'september-na-wolverine' }],
  'ace-combat-8': [{ collection: 'news', slug: 'oktober-is-dichtbij' }],
  'gears-of-war-e-day': [{ collection: 'news', slug: 'oktober-is-dichtbij' }],
  'final-fantasy-resonance': [{ collection: 'news', slug: 'oktober-is-dichtbij' }],
  'nintendo-switch-sports-resort': [{ collection: 'news', slug: 'oktober-is-dichtbij' }],
  'call-of-duty-modern-warfare-4': [{ collection: 'news', slug: 'oktober-is-dichtbij' }],
  'phantom-blade-zero': [{ collection: 'news', slug: 'oktober-is-dichtbij' }],
  'zelda-ocarina-of-time-switch-2': [{ collection: 'news', slug: 'ocarina-krijgt-een-dag' }],
  'grand-theft-auto-vi': [{ collection: 'news', slug: 'gta-vi-blijft-19-november' }],
  pragmata: [{ collection: 'reviews', slug: 'pragmata' }],
  'resident-evil-requiem': [{ collection: 'reviews', slug: 'resident-evil-requiem' }],
  'forza-horizon-6': [
    { collection: 'reviews', slug: 'forza-horizon-6' },
    { collection: 'news', slug: 'forza-ps5-blijft-2026' },
  ],
  '007-first-light': [
    { collection: 'reviews', slug: '007-first-light' },
    { collection: 'news', slug: 'bond-switch-verschuift' },
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
  if (t.includes('silent hill') || t.includes('fleming')) return 'Horror'
  if (t.includes('fire emblem') || t.includes('dawn of war') || t.includes('endless legend')) return 'Strategy'
  if (
    t.includes('final fantasy') ||
    t.includes('trails') ||
    t.includes('dragon quest') ||
    t.includes('path of exile') ||
    t.includes('witcher') ||
    t.includes('tales of eternia')
  ) {
    return 'RPG'
  }
  if (t.includes('call of duty') || t.includes('gears of war') || t.includes('sniper dan')) return 'Shooter'
  if (t.includes('switch sports') || t.includes('horse club')) return 'Sport'
  if (t.includes('hot wheels') || t.includes('galactic racer') || t.includes('forza')) return 'Racing'
  if (t.includes('layton')) return 'Puzzle'
  if (t.includes('zelda') || t.includes('ocarina')) return 'Adventure'
  if (t.includes('moonlighter')) return 'Indie'
  if (
    t.includes('wolverine') ||
    t.includes('control resonant') ||
    t.includes('phantom blade') ||
    t.includes('ace combat') ||
    t.includes('onimusha') ||
    t.includes('grand theft') ||
    t.includes('minecraft dungeons') ||
    t.includes('monster hunter')
  ) {
    return 'Action'
  }
  return 'Other'
}

function formatPlatforms(platforms: string[]) {
  return platforms
    .map((item) => {
      if (item === 'Xbox') return 'Xbox Series'
      if (item === 'PC') return 'PC'
      return item
    })
    .join(', ')
}

function fromDated(row: DatedRelease): GameEntry {
  const slug = slugify(row.title)
  const early = Boolean(row.early)
  const status = row.date <= SITE_TODAY ? 'released' : 'upcoming'
  const summary = early
    ? `${formatDate(row.date)}. ${formatPlatforms(row.platforms)}. Early access, as on the dated list.`
    : `${formatDate(row.date)}. ${formatPlatforms(row.platforms)}.`
  return {
    slug,
    title: row.title === 'Grand Theft Auto 6' ? 'Grand Theft Auto VI' : row.title,
    developer: '',
    publisher: '',
    platforms: row.platforms,
    genre: genreFor(row.title),
    releaseDate: row.date,
    status,
    summary,
    coverLabel: coverLabel(row.title),
    coverImage: coverBySlug[slug],
    related: relatedBySlug[slug] ?? [],
    seo: {
      title: `${row.title === 'Grand Theft Auto 6' ? 'Grand Theft Auto VI' : row.title} calendar`,
      description: summary,
    },
  }
}

const libraryGames: GameEntry[] = [
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
    coverImage: coverBySlug['resident-evil-requiem'],
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
    coverImage: coverBySlug.pragmata,
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
    coverImage: coverBySlug['forza-horizon-6'],
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
    coverImage: coverBySlug['007-first-light'],
    related: relatedBySlug['007-first-light'],
    seo: {
      title: '007 First Light coverage',
      description: 'Release 27 May 2026, ASAPxGaming review 8.6.',
    },
  },
]

function mergeMoonlighterReview(game: GameEntry): GameEntry {
  if (game.slug !== 'moonlighter-2' && game.slug !== 'wolverine-marvel') return game
  if (game.slug === 'moonlighter-2') {
    return {
      ...game,
      developer: 'Digital Sun',
      publisher: 'Digital Sun',
      summary: `${game.summary} Review: 8.2.`,
    }
  }
  return {
    ...game,
    developer: 'Insomniac',
    publisher: 'Sony',
    coverLabel: 'WOLV',
    summary: `${game.summary} Review: 7.7.`,
  }
}

const datedGames = gamespotDated2026.map(fromDated).map(mergeMoonlighterReview)
const datedSlugs = new Set(datedGames.map((game) => game.slug))

export const games: GameEntry[] = [
  ...libraryGames.filter((game) => !datedSlugs.has(game.slug)),
  ...datedGames,
]
