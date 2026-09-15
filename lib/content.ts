import { features } from '@/content/features'
import { games } from '@/content/games'
import { hardware } from '@/content/hardware'
import { news } from '@/content/news'
import { reviews } from '@/content/reviews'
import type { NewsArticle, NewsFilter, RelatedRef } from '@/types/content'

const foldedNews: NewsArticle[] = [
  ...features.map((item) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    body: item.body,
    author: item.author,
    publishedAt: item.publishedAt,
    category: 'Industry' as const,
    tags: item.tags,
    coverLabel: item.coverLabel,
    gameSlug:
      item.slug === 'turn-based-is-niet-dood'
        ? 'clair-obscur-expedition-33'
        : item.slug === 'hype-zonder-build'
          ? 'wolverine-marvel'
          : undefined,
    related: item.related,
    seo: item.seo,
  })),
  ...hardware.map((item) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    body: item.body,
    author: item.author,
    publishedAt: item.publishedAt,
    category: 'PC' as const,
    tags: ['Hardware'],
    coverLabel: item.coverLabel,
    related: item.related,
    seo: item.seo,
  })),
]

export function allNews() {
  return byDate([...news, ...foldedNews])
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
  if (category === 'Alles') return list
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
              href: `/nieuws/${item.slug}/`,
              title: item.title,
              kind: 'Nieuws',
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

export { news, reviews, games }
