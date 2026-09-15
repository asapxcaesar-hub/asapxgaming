import { Suspense } from 'react'
import { SearchPanel } from '@/components/SearchPanel'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Zoeken',
  description: 'Doorzoek nieuws, reviews en de releasekalender op ASAPxGaming.',
  path: '/zoeken/',
})

export default function SearchPage() {
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Zoeken</p>
        <h1 className="mt-2 font-display text-5xl">Vind het</h1>
      </header>
      <Suspense fallback={<p className="text-sm text-muted">Zoeken laden…</p>}>
        <SearchPanel />
      </Suspense>
    </div>
  )
}
