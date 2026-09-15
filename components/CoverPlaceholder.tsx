import { cn } from '@/lib/utils'

export function CoverPlaceholder({
  label,
  className,
  large = false,
}: {
  label: string
  className?: string
  large?: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-panel text-accent',
        'bg-[radial-gradient(circle_at_20%_20%,rgba(46,230,166,0.18),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(156,163,175,0.12),transparent_40%)]',
        large ? 'min-h-52 font-display text-5xl md:min-h-72 md:text-7xl' : 'min-h-32 font-display text-3xl',
        className,
      )}
      aria-hidden="true"
    >
      {label}
    </div>
  )
}
