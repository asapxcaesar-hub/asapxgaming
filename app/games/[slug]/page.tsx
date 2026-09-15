import { notFound } from 'next/navigation'
import { FoldNotice } from '@/components/FoldNotice'
import { games } from '@/content/games'
import { getGame, reviewsForGame } from '@/lib/content'

export const metadata = { robots: { index: false, follow: true } }

export function generateStaticParams() {
  return games.map((item) => ({ slug: item.slug }))
}

export default async function GameRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getGame(slug)
  if (!item) notFound()
  const review = reviewsForGame(slug)[0]
  return (
    <FoldNotice
      to={review ? `/reviews/${review.slug}/` : '/releases/'}
      title={review ? 'de review' : 'de releasekalender'}
    />
  )
}
