import Link from 'next/link'

export function Breadcrumbs({
  items,
}: {
  items: { href?: string; label: string }[]
}) {
  return (
    <nav aria-label="Broodkruimel" className="text-xs text-muted">
      <ol className="flex flex-wrap gap-1">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-accent">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
