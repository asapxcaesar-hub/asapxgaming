import Link from 'next/link'
import { CoverImage } from '@/components/CoverImage'
import { formatDate } from '@/lib/utils'

export function ArticleCard({
  href,
  kicker,
  title,
  excerpt,
  date,
  coverLabel,
  coverSrc,
  featured = false,
}: {
  href: string
  kicker: string
  title: string
  excerpt: string
  date: string
  coverLabel: string
  coverSrc?: string
  featured?: boolean
}) {
  return (
    <article className="grid gap-3">
      <Link
        href={href}
        className={
          featured
            ? 'block max-w-xl overflow-hidden rounded-sm border border-line'
            : 'block overflow-hidden rounded-sm border border-line'
        }
      >
        <CoverImage src={coverSrc} alt={title} label={coverLabel} />
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
