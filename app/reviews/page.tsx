import { ReviewCard } from '@/components/ReviewCard'
import { byDate, reviews } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Reviews',
  description: 'Game reviews van ASAPxGaming met cijfer, verdict en uitsplitsing per onderdeel.',
  path: '/reviews/',
})

export default function ReviewsPage() {
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Reviews</p>
        <h1 className="mt-2 font-display text-5xl">Het oordeel</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Cijfers tot 10. Must-play betekent: plan je week eromheen. Hit is feest, geen bijbel.
        </p>
      </header>
      <div className="grid gap-3">
        {byDate(reviews).map((item) => (
          <ReviewCard
            key={item.slug}
            href={`/reviews/${item.slug}/`}
            game={item.title}
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
