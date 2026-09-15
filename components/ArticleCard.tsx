import Link from 'next/link'
import { CoverPlaceholder } from '@/components/CoverPlaceholder'
import { formatDate } from '@/lib/utils'

export function ArticleCard({
  href,
  kicker,
  title,
  excerpt,
  date,
  coverLabel,
  featured = false,
}: {
  href: string
  kicker: string
  title: string
  excerpt: string
  date: string
  coverLabel: string
  featured?: boolean
}) {
  return (
    <article className={featured ? 'grid gap-4 md:grid-cols-2 md:gap-8' : 'grid gap-3'}>
      <Link href={href} className="block overflow-hidden rounded-sm border border-line">
        <CoverPlaceholder label={coverLabel} large={featured} />
      </Link>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{kicker}</p>
        <h3 className={featured ? 'font-display text-4xl leading-none md:text-5xl' : 'text-xl font-semibold'}>
          <Link href={href} className="hover:text-accent">
            {title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted">{excerpt}</p>
        <p className="text-xs text-muted">{formatDate(date)}</p>
      </div>
    </article>
  )
}
