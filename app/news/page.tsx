import { NewsArchive } from '@/components/NewsArchive'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'News',
  description: 'Game news from ASAPxGaming: dated public facts, original copy, no leak theatre.',
  path: '/news/',
})

export default function NewsPage() {
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">News</p>
        <h1 className="mt-2 font-display text-5xl">The feed</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Dated public facts from September 2026. Original English. No leak theatre.
        </p>
      </header>
      <NewsArchive />
    </div>
  )
}
