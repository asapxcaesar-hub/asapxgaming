import { games } from '@/content/games'
import { news } from '@/content/news'
import { reviews } from '@/content/reviews'
import { SITE_MONTH } from '@/data/site'
import type { NewsFilter, RelatedRef } from '@/types/content'

export function allNews() {
  return byDate([...news])
}

export function isOpenCalendarMonth(isoMonth: string) {
  return isoMonth >= SITE_MONTH
}

export function calendarGames() {
  return games.filter((game) => isOpenCalendarMonth(game.releaseDate.slice(0, 7)))
}

export function byDate<T extends { publishedAt: string }>(items: T[]) {
  return [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getNews(slug: string) {
  return allNews().find((item) => item.slug === slug)
}

export function getReview(slug: string) {
  return reviews.find((item) => item.slug === slug)
}

export function getGame(slug: string) {
  return games.find((item) => item.slug === slug)
}

export function filterNews(category: NewsFilter) {
  const list = allNews()
  if (category === 'All') return list
  return list.filter((item) => item.category === category)
}

export function reviewsForGame(gameSlug: string) {
  return reviews.filter((item) => item.gameSlug === gameSlug)
}

export function coverForGame(slug?: string) {
  if (!slug) return undefined
  return getGame(slug)?.coverImage
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

  for (const item of allNews()) {
    if (matches(needle, item.title, item.excerpt, item.tags.join(' '))) {
      hits.push({
        href: `/news/${item.slug}/`,
        title: item.title,
        kind: 'News',
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
  for (const item of games) {
    if (matches(needle, item.title, item.summary, item.genre, item.developer)) {
      const review = reviewsForGame(item.slug)[0]
      hits.push({
        href: review ? `/reviews/${review.slug}/` : '/releases/',
        title: item.title,
        kind: review ? 'Review' : 'Release',
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
          ? {
              href: `/news/${item.slug}/`,
              title: item.title,
              kind: 'News',
              label: item.coverLabel,
              image: coverForGame(item.gameSlug),
            }
          : null
      }
      const item = getReview(ref.slug)
      return item
        ? {
            href: `/reviews/${item.slug}/`,
            title: item.title,
            kind: 'Review',
            label: item.coverLabel,
            image: coverForGame(item.gameSlug),
          }
        : null
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
}

export function upcomingGames() {
  return calendarGames()
    .filter((game) => game.status === 'upcoming')
    .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
}

export function filterGames(opts: { platform?: string; genre?: string; month?: string }) {
  return calendarGames().filter((game) => {
    const platformOk =
      !opts.platform || opts.platform === 'All' || game.platforms.includes(opts.platform)
    const genreOk = !opts.genre || opts.genre === 'All' || game.genre === opts.genre
    const monthOk =
      !opts.month || opts.month === 'All' || game.releaseDate.slice(0, 7) === opts.month
    return platformOk && genreOk && monthOk
  })
}

export { news, reviews, games }
