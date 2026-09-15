import Link from 'next/link'
import { CoverImage } from '@/components/CoverImage'

export function RelatedGrid({
  items,
}: {
  items: { href: string; title: string; kind: string; label: string; image?: string }[]
}) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted">Geen gerelateerde stukken in deze demo-set.</p>
    )
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="grid gap-2 hover:text-accent">
            <CoverImage src={item.image} alt={item.title} label={item.label} className="min-h-24" />
            <p className="text-xs uppercase tracking-[0.16em] text-accent">{item.kind}</p>
            <p className="font-semibold">{item.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
