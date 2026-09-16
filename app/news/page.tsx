import { NewsArchive } from '@/components/NewsArchive'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'News',
  description: 'Game news from ASAPxGaming: platforms, industry and indie. Filtered, no leak theatre.',
  path: '/news/',
})

export default function NewsPage() {
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">News</p>
        <h1 className="mt-2 font-display text-5xl">The feed</h1>
        <p className="mt-3 max-w-2xl text-muted">
          September 2026 only: the biggest games and the indie that matters. Filters follow the desk.
        </p>
      </header>
      <NewsArchive />
    </div>
  )
}
