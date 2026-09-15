import { site } from '@/data/site'
import { features } from '@/content/features'
import { games } from '@/content/games'
import { hardware } from '@/content/hardware'
import { news } from '@/content/news'
import { reviews } from '@/content/reviews'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '')
  const staticRoutes = [
    '',
    '/nieuws/',
    '/reviews/',
    '/games/',
    '/releases/',
    '/features/',
    '/hardware/',
    '/over-asapxgaming/',
    '/contact/',
    '/zoeken/',
    '/privacy/',
    '/disclaimer/',
    '/cookiebeleid/',
  ]
  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path || '/'}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }))
  for (const item of news) entries.push({ url: `${base}/nieuws/${item.slug}/` })
  for (const item of reviews) entries.push({ url: `${base}/reviews/${item.slug}/` })
  for (const item of features) entries.push({ url: `${base}/features/${item.slug}/` })
  for (const item of hardware) entries.push({ url: `${base}/hardware/${item.slug}/` })
  for (const item of games) entries.push({ url: `${base}/games/${item.slug}/` })
  return entries
}
