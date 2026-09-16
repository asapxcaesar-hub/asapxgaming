import { site } from '@/data/site'
import type { Metadata } from 'next'

export function absUrl(path: string) {
  const base = site.url.replace(/\/$/, '')
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix}`
}

export function buildMetadata(opts: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  publishedTime?: string
  authors?: string[]
}): Metadata {
  const url = absUrl(opts.path)
  const title = opts.title.includes('ASAPxGaming') ? opts.title : `${opts.title} · ASAPxGaming`
  return {
    title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: opts.type ?? 'website',
      locale: site.locale,
      url,
      siteName: site.name,
      title,
      description: opts.description,
      publishedTime: opts.publishedTime,
      authors: opts.authors,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: opts.description,
    },
  }
}

export function articleJsonLd(opts: {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  author: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { '@type': 'Person', name: opts.author },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: absUrl(opts.path),
    inLanguage: 'en-GB',
  }
}

export function reviewJsonLd(opts: {
  name: string
  path: string
  datePublished: string
  author: string
  score: number
  body: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'VideoGame', name: opts.name },
    author: { '@type': 'Person', name: opts.author },
    datePublished: opts.datePublished,
    reviewBody: opts.body,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: opts.score,
      bestRating: 10,
      worstRating: 1,
    },
    publisher: { '@type': 'Organization', name: site.name },
    url: absUrl(opts.path),
  }
}
