import { Link, useParams } from 'react-router-dom'
import { ScoreBadge } from '@/components/ScoreBadge'
import { ErrorState, LoadingGrid } from '@/components/StatusStates'
import { Badge } from '@/components/ui/badge'
import { getReview } from '@/data/reviews'
import { useSimulatedLoad } from '@/hooks/useSimulatedLoad'
import { formatDate } from '@/lib/utils'

export function ReviewDetailPage() {
  const { slug } = useParams()
  const loading = useSimulatedLoad(280)
  const review = slug ? getReview(slug) : undefined

  if (loading) {
    return <LoadingGrid label="Review laden…" />
  }

  if (!review) {
    return (
      <ErrorState
        title="Review offline"
        detail="Deze titel zit niet in de sample-redactie. Check de reviewslijst voor wat wél live is."
      />
    )
  }

  return (
    <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-hot">{review.genre}</p>
        <h1 className="mt-2 font-display text-5xl leading-none tracking-wide md:text-6xl">
          {review.game}
        </h1>
        <p className="mt-3 text-lg text-muted">{review.title}</p>
        <p className="mt-2 text-sm text-muted">
          {review.author} · {formatDate(review.publishedAt)}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {review.platforms.map((platform) => (
            <Badge key={platform}>{platform}</Badge>
          ))}
        </div>
        <div className="mt-8 grid gap-4 text-base leading-relaxed">
          {review.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link className="mt-10 inline-block text-xs uppercase tracking-[0.16em] text-acid" to="/reviews">
          ← Alle reviews
        </Link>
      </div>
      <aside className="h-fit border border-line bg-panel p-5">
        <ScoreBadge score={review.score} className="size-20 text-4xl" />
        <p className="mt-3 font-display text-3xl text-acid">{review.verdict}</p>
        <div className="mt-5">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Plus</p>
          <ul className="mt-2 grid gap-1 text-sm">
            {review.plus.map((item) => (
              <li key={item}>+ {item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Min</p>
          <ul className="mt-2 grid gap-1 text-sm">
            {review.minus.map((item) => (
              <li key={item}>− {item}</li>
            ))}
          </ul>
        </div>
      </aside>
    </article>
  )
}
