import { ReviewCard } from '@/components/ReviewCard'
import { byDate, hardware } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Hardware',
  description: 'Hardware-reviews van ASAPxGaming: handhelds, controllers, headsets. Eerlijk over niche-prijzen.',
  path: '/hardware/',
})

export default function HardwarePage() {
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Hardware</p>
        <h1 className="mt-2 font-display text-5xl">Kits</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Geen unboxing-theater. Wel of het ding je week overleeft.
        </p>
      </header>
      <div className="grid gap-3">
        {byDate(hardware).map((item) => (
          <ReviewCard
            key={item.slug}
            href={`/hardware/${item.slug}/`}
            game={item.product}
            excerpt={item.excerpt}
            score={item.score}
            verdict={item.verdict}
            date={item.publishedAt}
            coverLabel={item.coverLabel}
          />
        ))}
      </div>
    </div>
  )
}
