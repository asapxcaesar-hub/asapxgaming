export type NewsFilter =
  | 'All'
  | 'PlayStation'
  | 'Xbox'
  | 'Nintendo'
  | 'PC'
  | 'Industry'
  | 'Indie'

export type SeoFields = {
  title: string
  description: string
}

export type RelatedRef = {
  collection: 'news' | 'reviews'
  slug: string
}

export type NewsArticle = {
  slug: string
  title: string
  excerpt: string
  body: string[]
  author: string
  publishedAt: string
  updatedAt?: string
  category: Exclude<NewsFilter, 'All'>
  tags: string[]
  coverLabel: string
  coverImage: string
  gameSlug?: string
  related: RelatedRef[]
  seo: SeoFields
}

export type ReviewScores = {
  gameplay: number
  story: number
  graphics: number
  audio: number
  performance: number
}

export type GameReview = {
  slug: string
  gameSlug: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  platforms: string[]
  genre: string
  score: number
  verdict: string
  coverLabel: string
  coverImage: string
  plus: string[]
  minus: string[]
  scores: ReviewScores
  take: string[]
  gameplay: string[]
  story: string[]
  graphics: string[]
  audio: string[]
  performance: string[]
  conclusion: string[]
  related: RelatedRef[]
  seo: SeoFields
}

export type LongformArticle = {
  slug: string
  title: string
  excerpt: string
  body: string[]
  author: string
  publishedAt: string
  tags: string[]
  coverLabel: string
  related: RelatedRef[]
  seo: SeoFields
}

export type HardwareReview = {
  slug: string
  product: string
  title: string
  excerpt: string
  body: string[]
  author: string
  publishedAt: string
  score: number
  verdict: string
  coverLabel: string
  plus: string[]
  minus: string[]
  related: RelatedRef[]
  seo: SeoFields
}

export type GameEntry = {
  slug: string
  title: string
  developer: string
  publisher: string
  platforms: string[]
  genre: string
  releaseDate: string
  status: 'released' | 'upcoming'
  summary: string
  coverLabel: string
  coverImage?: string
  related: RelatedRef[]
  seo: SeoFields
}

export type VideoClip = {
  id: string
  title: string
  platform: 'YouTube' | 'Twitch' | 'TikTok'
  href: string
  coverLabel: string
}
