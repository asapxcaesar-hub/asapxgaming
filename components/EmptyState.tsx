import { Button } from '@/components/ui/button'

export function EmptyState({
  title,
  detail,
  action,
}: {
  title: string
  detail: string
  action?: { label: string; onClick: () => void }
}) {
  return (
    <div className="rounded-sm border border-dashed border-line bg-elevated p-8 text-center">
      <p className="font-display text-3xl text-accent">{title}</p>
      <p className="mt-2 text-sm text-muted">{detail}</p>
      {action ? (
        <Button className="mt-5" variant="outline" type="button" onClick={action.onClick}>
          {action.label}
        </Button>
      ) : null}
    </div>
  )
}
