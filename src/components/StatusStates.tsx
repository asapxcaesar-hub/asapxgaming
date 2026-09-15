import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function LoadingGrid({ label }: { label: string }) {
  return (
    <div aria-busy="true" aria-live="polite" className="grid gap-4">
      <p className="text-sm uppercase tracking-[0.18em] text-muted">{label}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-40" />
        ))}
      </div>
    </div>
  )
}

export function EmptyState({
  title,
  detail,
  onReset,
}: {
  title: string
  detail: string
  onReset?: () => void
}) {
  return (
    <div className="border border-dashed border-line bg-panel p-8 text-center">
      <p className="font-display text-4xl text-acid">{title}</p>
      <p className="mt-2 text-sm text-muted">{detail}</p>
      {onReset ? (
        <Button className="mt-6" variant="outline" onClick={onReset} type="button">
          Reset filters
        </Button>
      ) : null}
    </div>
  )
}

export function ErrorState({
  title,
  detail,
  onRetry,
}: {
  title: string
  detail: string
  onRetry?: () => void
}) {
  return (
    <div className="border border-hot/50 bg-hot/10 p-8">
      <p className="font-display text-4xl text-hot">{title}</p>
      <p className="mt-2 text-sm text-ink/90">{detail}</p>
      {onRetry ? (
        <Button className="mt-6" variant="hot" onClick={onRetry} type="button">
          Opnieuw proberen
        </Button>
      ) : null}
    </div>
  )
}
