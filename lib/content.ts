import { features } from '@/content/features'
import { games } from '@/content/games'
import { hardware } from '@/content/hardware'
import { news } from '@/content/news'
import { reviews } from '@/content/reviews'
import type { NewsFilter, RelatedRef } from '@/types/content'

export function byDate<T extends { publishedAt: string }>(items: T[]) {
  return [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getNews(slug: string) {
  return news.find((item) => item.slug === slug)
}

export function getReview(slug: string) {
  return reviews.find((item) => item.slug === slug)
}

export function getFeature(slug: string) {
  return features.find((item) => item.slug === slug)
}

export function getHardware(slug: string) {
  return hardware.find((item) => item.slug === slug)
}

export function getGame(slug: string) {
  return games.find((item) => item.slug === slug)
}

export function filterNews(category: NewsFilter) {
  const list = byDate(news)
  if (category === 'Alles') return list
  return list.filter((item) => item.category === category)
}

export function reviewsForGame(gameSlug: string) {
  return reviews.filter((item) => item.gameSlug === gameSlug)
}

export type SearchHit = {
  href: string
  title: string
  kind: string
  excerpt: string
}

export function searchAll(query: string): SearchHit[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return []

  const hits: SearchHit[] = []

  for (const item of news) {
    if (matches(needle, item.title, item.excerpt, item.tags.join(' '))) {
      hits.push({
        href: `/nieuws/${item.slug}/`,
        title: item.title,
        kind: 'Nieuws',
        excerpt: item.excerpt,
      })
    }
  }
  for (const item of reviews) {
    if (matches(needle, item.title, item.excerpt, item.genre)) {
      hits.push({
        href: `/reviews/${item.slug}/`,
        title: item.title,
        kind: 'Review',
        excerpt: item.excerpt,
      })
    }
  }
  for (const item of features) {
    if (matches(needle, item.title, item.excerpt, item.tags.join(' '))) {
      hits.push({
        href: `/features/${item.slug}/`,
        title: item.title,
        kind: 'Feature',
        excerpt: item.excerpt,
      })
    }
  }
  for (const item of hardware) {
    if (matches(needle, item.title, item.product, item.excerpt)) {
      hits.push({
        href: `/hardware/${item.slug}/`,
        title: item.title,
        kind: 'Hardware',
        excerpt: item.excerpt,
      })
    }
  }
  for (const item of games) {
    if (matches(needle, item.title, item.summary, item.genre, item.developer)) {
      hits.push({
        href: `/games/${item.slug}/`,
        title: item.title,
        kind: 'Game',
        excerpt: item.summary,
      })
    }
  }

  return hits
}

function matches(needle: string, ...fields: string[]) {
  return fields.join(' ').toLowerCase().includes(needle)
}

export function resolveRelated(refs: RelatedRef[]) {
  return refs
    .map((ref) => {
      if (ref.collection === 'news') {
        const item = getNews(ref.slug)
        return item
          ? { href: `/nieuws/${item.slug}/`, title: item.title, kind: 'Nieuws', label: item.coverLabel }
          : null
      }
      if (ref.collection === 'reviews') {
        const item = getReview(ref.slug)
        return item
          ? { href: `/reviews/${item.slug}/`, title: item.title, kind: 'Review', label: item.coverLabel }
          : null
      }
      if (ref.collection === 'features') {
        const item = getFeature(ref.slug)
        return item
          ? { href: `/features/${item.slug}/`, title: item.title, kind: 'Feature', label: item.coverLabel }
          : null
      }
      if (ref.collection === 'hardware') {
        const item = getHardware(ref.slug)
        return item
          ? { href: `/hardware/${item.slug}/`, title: item.title, kind: 'Hardware', label: item.coverLabel }
          : null
      }
      const item = getGame(ref.slug)
      return item
        ? { href: `/games/${item.slug}/`, title: item.title, kind: 'Game', label: item.coverLabel }
        : null
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
}

export function upcomingGames() {
  return [...games]
    .filter((game) => game.status === 'upcoming')
    .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
}

export function filterGames(opts: { platform?: string; genre?: string; month?: string }) {
  return games.filter((game) => {
    const platformOk =
      !opts.platform || opts.platform === 'Alle' || game.platforms.includes(opts.platform)
    const genreOk = !opts.genre || opts.genre === 'Alle' || game.genre === opts.genre
    const monthOk =
      !opts.month || opts.month === 'Alle' || game.releaseDate.slice(0, 7) === opts.month
    return platformOk && genreOk && monthOk
  })
}

export { news, reviews, features, hardware, games }
