import type { ReactNode } from 'react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CoverPlaceholder } from '@/components/CoverPlaceholder'
import { RelatedGrid } from '@/components/RelatedGrid'
import { ShareLinks } from '@/components/ShareLinks'
import { formatDate } from '@/lib/utils'

export function ArticleLayout({
  crumbs,
  kicker,
  title,
  excerpt,
  author,
  date,
  coverLabel,
  path,
  related,
  children,
}: {
  crumbs: { href?: string; label: string }[]
  kicker: string
  title: string
  excerpt: string
  author: string
  date: string
  coverLabel: string
  path: string
  related: { href: string; title: string; kind: string; label: string }[]
  children: ReactNode
}) {
  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs items={crumbs} />
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{kicker}</p>
      <h1 className="mt-2 font-display text-4xl leading-none md:text-6xl">{title}</h1>
      <p className="mt-4 text-lg text-muted">{excerpt}</p>
      <p className="mt-3 text-sm text-muted">
        {author} · {formatDate(date)}
      </p>
      <div className="mt-6 overflow-hidden rounded-sm border border-line">
        <CoverPlaceholder label={coverLabel} large />
      </div>
      <div className="mt-8 grid gap-4 text-base leading-relaxed text-ink/95">{children}</div>
      <div className="mt-10">
        <ShareLinks path={path} title={title} />
      </div>
      <section className="mt-12">
        <h2 className="font-display text-3xl">Gerelateerd</h2>
        <div className="mt-4">
          <RelatedGrid items={related} />
        </div>
      </section>
    </article>
  )
}
