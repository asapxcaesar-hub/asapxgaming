import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CoverPlaceholder } from '@/components/CoverPlaceholder'
import { RelatedGrid } from '@/components/RelatedGrid'
import { games } from '@/content/games'
import { getGame, resolveRelated, reviewsForGame } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/utils'

export function generateStaticParams() {
  return games.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getGame(slug)
  if (!item) return {}
  return buildMetadata({
    title: item.seo.title,
    description: item.seo.description,
    path: `/games/${item.slug}/`,
  })
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getGame(slug)
  if (!item) notFound()
  const linkedReviews = reviewsForGame(item.slug)

  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: '/games/', label: 'Games' }, { label: item.title }]} />
      <CoverPlaceholder label={item.coverLabel} large />
      <p className="text-xs uppercase tracking-[0.18em] text-accent">
        {item.status === 'upcoming' ? 'Upcoming' : 'Released'} · {item.genre}
      </p>
      <h1 className="font-display text-5xl leading-none">{item.title}</h1>
      <p className="text-muted">{item.summary}</p>
      <dl className="grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted">Developer</dt>
          <dd>{item.developer}</dd>
        </div>
        <div>
          <dt className="text-muted">Publisher</dt>
          <dd>{item.publisher}</dd>
        </div>
        <div>
          <dt className="text-muted">Platforms</dt>
          <dd>{item.platforms.join(', ')}</dd>
        </div>
        <div>
          <dt className="text-muted">Release</dt>
          <dd>{formatDate(item.releaseDate)}</dd>
        </div>
      </dl>
      {linkedReviews.length > 0 ? (
        <section>
          <h2 className="font-display text-3xl">Reviews</h2>
          <ul className="mt-3 grid gap-2">
            {linkedReviews.map((review) => (
              <li key={review.slug}>
                <Link href={`/reviews/${review.slug}/`} className="text-accent hover:underline">
                  {review.title} — {review.score.toFixed(1)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-sm text-muted">Nog geen review. Geen trailer-oordeel.</p>
      )}
      <section>
        <h2 className="font-display text-3xl">Coverage</h2>
        <div className="mt-3">
          <RelatedGrid items={resolveRelated(item.related)} />
        </div>
      </section>
    </div>
  )
}
