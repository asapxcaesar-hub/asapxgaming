import { ReleaseCalendar } from '@/components/ReleaseCalendar'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Releases',
  description: 'Releasekalender van ASAPxGaming: filter op maand, platform en genre.',
  path: '/releases/',
})

export default function ReleasesPage() {
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Releases</p>
        <h1 className="mt-2 font-display text-5xl">Kalender</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Datums uit de demo-set. Upcoming blijft upcoming tot we een build hebben.
        </p>
      </header>
      <ReleaseCalendar />
    </div>
  )
}
