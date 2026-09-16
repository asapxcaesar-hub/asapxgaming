import { Suspense } from 'react'
import { SearchPanel } from '@/components/SearchPanel'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Search',
  description: 'Search news, reviews and the release calendar on ASAPxGaming.',
  path: '/search/',
})

export default function SearchPage() {
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Search</p>
        <h1 className="mt-2 font-display text-5xl">Find it</h1>
      </header>
      <Suspense fallback={<p className="text-sm text-muted">Loading search…</p>}>
        <SearchPanel />
      </Suspense>
    </div>
  )
}
