import { cn } from '@/lib/utils'

export function CoverPlaceholder({
  label,
  className,
}: {
  label: string
  className?: string
  large?: boolean
}) {
  return (
    <div
      className={cn(
        'flex aspect-square items-center justify-center bg-panel font-display text-3xl text-accent',
        'bg-[radial-gradient(circle_at_20%_20%,rgba(46,230,166,0.18),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(156,163,175,0.12),transparent_40%)]',
        className,
      )}
      aria-hidden="true"
    >
      {label}
    </div>
  )
}
