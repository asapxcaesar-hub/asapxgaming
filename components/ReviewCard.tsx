import Link from 'next/link'
import { CoverImage } from '@/components/CoverImage'
import { formatDate } from '@/lib/utils'

export function ScoreBadge({ score }: { score: number }) {
  return (
    <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-sm bg-accent font-display text-3xl leading-none text-accent-ink">
      {score.toFixed(1)}
    </div>
  )
}

export function ReviewCard({
  href,
  game,
  excerpt,
  score,
  verdict,
  date,
  coverLabel,
  coverSrc,
}: {
  href: string
  game: string
  excerpt: string
  score: number
  verdict: string
  date: string
  coverLabel: string
  coverSrc?: string
}) {
  return (
    <Link
      href={href}
      className="grid grid-cols-[minmax(4.5rem,6.5rem)_1fr_auto] gap-4 rounded-sm border border-line bg-elevated p-4 hover:border-accent"
    >
      <CoverImage src={coverSrc} alt={game} label={coverLabel} className="hidden w-full sm:block" />
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-accent">{verdict}</p>
        <h3 className="mt-1 text-lg font-semibold">{game}</h3>
        <p className="mt-1 text-sm text-muted">{excerpt}</p>
        <p className="mt-2 text-xs text-muted">{formatDate(date)}</p>
      </div>
      <ScoreBadge score={score} />
    </Link>
  )
}
