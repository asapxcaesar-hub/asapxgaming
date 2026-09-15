import { notFound } from 'next/navigation'
import { ArticleLayout } from '@/components/ArticleLayout'
import { JsonLd } from '@/components/JsonLd'
import { features } from '@/content/features'
import { getFeature, resolveRelated } from '@/lib/content'
import { articleJsonLd, buildMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return features.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getFeature(slug)
  if (!item) return {}
  return buildMetadata({
    title: item.seo.title,
    description: item.seo.description,
    path: `/features/${item.slug}/`,
    type: 'article',
    publishedTime: item.publishedAt,
    authors: [item.author],
  })
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getFeature(slug)
  if (!item) notFound()

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: item.title,
          description: item.seo.description,
          path: `/features/${item.slug}/`,
          datePublished: item.publishedAt,
          author: item.author,
        })}
      />
      <ArticleLayout
        crumbs={[
          { href: '/', label: 'Home' },
          { href: '/features/', label: 'Features' },
          { label: item.title },
        ]}
        kicker="Achtergrond"
        title={item.title}
        excerpt={item.excerpt}
        author={item.author}
        date={item.publishedAt}
        coverLabel={item.coverLabel}
        path={`/features/${item.slug}/`}
        related={resolveRelated(item.related)}
      >
        {item.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </ArticleLayout>
    </>
  )
}
