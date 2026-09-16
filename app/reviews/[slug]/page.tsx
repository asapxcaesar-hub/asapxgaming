import { notFound } from 'next/navigation'
import { ArticleLayout } from '@/components/ArticleLayout'
import { JsonLd } from '@/components/JsonLd'
import { ScoreBadge } from '@/components/ReviewCard'
import { reviews } from '@/content/reviews'
import { getReview, resolveRelated } from '@/lib/content'
import { buildMetadata, reviewJsonLd } from '@/lib/seo'

export function generateStaticParams() {
  return reviews.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getReview(slug)
  if (!item) return {}
  return buildMetadata({
    title: item.seo.title,
    description: item.seo.description,
    path: `/reviews/${item.slug}/`,
    type: 'article',
    publishedTime: item.publishedAt,
    authors: [item.author],
  })
}

function Block({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section>
      <h2 className="font-display text-3xl text-accent">{title}</h2>
      <div className="mt-2 grid gap-3">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getReview(slug)
  if (!item) notFound()

  const scoreRows = [
    ['Gameplay', item.scores.gameplay],
    ['Story', item.scores.story],
    ['Graphics', item.scores.graphics],
    ['Audio', item.scores.audio],
    ['Performance', item.scores.performance],
  ] as const

  return (
    <>
      <JsonLd
        data={reviewJsonLd({
          name: item.title,
          path: `/reviews/${item.slug}/`,
          datePublished: item.publishedAt,
          author: item.author,
          score: item.score,
          body: item.conclusion.join(' '),
        })}
      />
      <ArticleLayout
        crumbs={[
          { href: '/', label: 'Home' },
          { href: '/reviews/', label: 'Reviews' },
          { label: item.title },
        ]}
        kicker={`${item.genre} · ${item.platforms.join(' / ')}`}
        title={item.title}
        excerpt={item.excerpt}
        author={item.author}
        date={item.publishedAt}
        coverLabel={item.coverLabel}
        coverSrc={item.coverImage}
        path={`/reviews/${item.slug}/`}
        related={resolveRelated(item.related)}
      >
        <div className="flex flex-wrap items-center gap-4 border border-line bg-elevated p-4">
          <ScoreBadge score={item.score} />
          <div>
            <p className="font-display text-3xl text-accent">{item.verdict}</p>
            <p className="text-sm text-muted">Scored from 1 to 10</p>
          </div>
        </div>
        <ul className="grid gap-2 sm:grid-cols-5">
          {scoreRows.map(([label, value]) => (
            <li key={label} className="border border-line bg-panel p-3 text-center">
              <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
              <p className="mt-1 font-display text-2xl">{value.toFixed(1)}</p>
            </li>
          ))}
        </ul>
        <Block title="Intro" paragraphs={item.take} />
        <Block title="Gameplay" paragraphs={item.gameplay} />
        <Block title="Story" paragraphs={item.story} />
        <Block title="Presentation" paragraphs={[...item.graphics, ...item.audio]} />
        <Block title="Performance" paragraphs={item.performance} />
        <Block title="Verdict" paragraphs={item.conclusion} />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Plus</p>
            <ul className="mt-2 grid gap-1 text-sm">
              {item.plus.map((entry) => (
                <li key={entry}>+ {entry}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Min</p>
            <ul className="mt-2 grid gap-1 text-sm">
              {item.minus.map((entry) => (
                <li key={entry}>No: {entry}</li>
              ))}
            </ul>
          </div>
        </div>
      </ArticleLayout>
    </>
  )
}
