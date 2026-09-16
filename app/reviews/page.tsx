import { ReviewCard } from '@/components/ReviewCard'
import { byDate, reviews } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Reviews',
  description: 'Game reviews from ASAPxGaming with a score, verdict and a split per pillar.',
  path: '/reviews/',
})

export default function ReviewsPage() {
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Reviews</p>
        <h1 className="mt-2 font-display text-5xl">The take</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Scores out of 10. Must play means: plan your week around it. Hit is a party, not scripture.
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
            coverSrc={item.coverImage}
          />
        ))}
      </div>
    </div>
  )
}
