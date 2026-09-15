import { cn } from '@/lib/utils'

export function ScoreBadge({ score, className }: { score: number; className?: string }) {
  const tone =
    score >= 9 ? 'bg-acid text-void' : score >= 8 ? 'bg-ink text-void' : 'bg-hot text-white'
  return (
    <div
      className={cn(
        'flex size-14 shrink-0 flex-col items-center justify-center font-display text-3xl leading-none',
        tone,
        className,
      )}
    >
      {score.toFixed(1)}
    </div>
  )
}
