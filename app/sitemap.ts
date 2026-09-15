import { site } from '@/data/site'
import { allNews } from '@/lib/content'
import { reviews } from '@/content/reviews'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '')
  const staticRoutes = [
    '',
    '/nieuws/',
    '/reviews/',
    '/releases/',
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
  for (const item of allNews()) entries.push({ url: `${base}/nieuws/${item.slug}/` })
  for (const item of reviews) entries.push({ url: `${base}/reviews/${item.slug}/` })
  return entries
}
