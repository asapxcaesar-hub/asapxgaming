import { Link } from 'react-router-dom'
import { ScoreBadge } from '@/components/ScoreBadge'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Review } from '@/data/reviews'
import { formatDate } from '@/lib/utils'

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card>
      <Link to={`/reviews/${review.slug}`} className="flex gap-4 p-5 focus-visible:outline-acid">
        <div className="hidden h-24 w-20 shrink-0 items-center justify-center bg-void font-display text-2xl text-acid sm:flex">
          {review.coverLabel}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap gap-2">
            {review.platforms.map((platform) => (
              <Badge key={platform}>{platform}</Badge>
            ))}
          </div>
          <h3 className="font-display text-3xl leading-none tracking-wide">{review.game}</h3>
          <p className="mt-2 text-sm text-muted">{review.excerpt}</p>
          <p className="mt-3 text-xs text-muted">{formatDate(review.publishedAt)}</p>
        </div>
        <ScoreBadge score={review.score} />
      </Link>
    </Card>
  )
}
