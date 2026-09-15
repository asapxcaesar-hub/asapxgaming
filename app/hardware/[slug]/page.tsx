import { notFound } from 'next/navigation'
import { ArticleLayout } from '@/components/ArticleLayout'
import { JsonLd } from '@/components/JsonLd'
import { ScoreBadge } from '@/components/ReviewCard'
import { hardware } from '@/content/hardware'
import { getHardware, resolveRelated } from '@/lib/content'
import { buildMetadata, reviewJsonLd } from '@/lib/seo'

export function generateStaticParams() {
  return hardware.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getHardware(slug)
  if (!item) return {}
  return buildMetadata({
    title: item.seo.title,
    description: item.seo.description,
    path: `/hardware/${item.slug}/`,
    type: 'article',
    publishedTime: item.publishedAt,
    authors: [item.author],
  })
}

export default async function HardwareArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getHardware(slug)
  if (!item) notFound()

  return (
    <>
      <JsonLd
        data={reviewJsonLd({
          name: item.product,
          path: `/hardware/${item.slug}/`,
          datePublished: item.publishedAt,
          author: item.author,
          score: item.score,
          body: item.body.join(' '),
        })}
      />
      <ArticleLayout
        crumbs={[
          { href: '/', label: 'Home' },
          { href: '/hardware/', label: 'Hardware' },
          { label: item.product },
        ]}
        kicker="Hardware"
        title={item.title}
        excerpt={item.excerpt}
        author={item.author}
        date={item.publishedAt}
        coverLabel={item.coverLabel}
        path={`/hardware/${item.slug}/`}
        related={resolveRelated(item.related)}
      >
        <div className="flex items-center gap-4 border border-line bg-elevated p-4">
          <ScoreBadge score={item.score} />
          <p className="font-display text-3xl text-accent">{item.verdict}</p>
        </div>
        {item.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="grid gap-4 sm:grid-cols-2">
          <ul className="text-sm">
            {item.plus.map((entry) => (
              <li key={entry}>+ {entry}</li>
            ))}
          </ul>
          <ul className="text-sm">
            {item.minus.map((entry) => (
              <li key={entry}>− {entry}</li>
            ))}
          </ul>
        </div>
      </ArticleLayout>
    </>
  )
}
