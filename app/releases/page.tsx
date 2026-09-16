import { ReleaseCalendar } from '@/components/ReleaseCalendar'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Releases',
  description: 'ASAPxGaming release calendar from September 2026 onward, dated titles only.',
  path: '/releases/',
})

export default function ReleasesPage() {
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Releases</p>
        <h1 className="mt-2 font-display text-5xl">Calendar</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Starts at September 2026 and only moves forward. Closed months stay shut. Filters run on
          the leftover set. Title, day and platforms from the dated 2026 list. Undated titles are
          not on it.
        </p>
      </header>
      <ReleaseCalendar />
    </div>
  )
}
