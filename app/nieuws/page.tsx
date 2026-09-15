import { NewsArchive } from '@/components/NewsArchive'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Nieuws',
  description: 'Game nieuws van ASAPxGaming: platforms, industry en indie. Gefilterd, geen lektheater.',
  path: '/nieuws/',
})

export default function NewsPage() {
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Nieuws</p>
        <h1 className="mt-2 font-display text-5xl">De feed</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Alleen september 2026: grootste games en indie die ertoe doet. Filters volgen de desk.
        </p>
      </header>
      <NewsArchive />
    </div>
  )
}
