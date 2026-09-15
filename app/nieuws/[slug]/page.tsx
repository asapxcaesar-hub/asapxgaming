import { notFound } from 'next/navigation'
import { ArticleLayout } from '@/components/ArticleLayout'
import { JsonLd } from '@/components/JsonLd'
import { news } from '@/content/news'
import { getNews, resolveRelated } from '@/lib/content'
import { articleJsonLd, buildMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getNews(slug)
  if (!item) return {}
  return buildMetadata({
    title: item.seo.title,
    description: item.seo.description,
    path: `/nieuws/${item.slug}/`,
    type: 'article',
    publishedTime: item.publishedAt,
    authors: [item.author],
  })
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getNews(slug)
  if (!item) notFound()

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: item.title,
          description: item.seo.description,
          path: `/nieuws/${item.slug}/`,
          datePublished: item.publishedAt,
          dateModified: item.updatedAt,
          author: item.author,
        })}
      />
      <ArticleLayout
        crumbs={[
          { href: '/', label: 'Home' },
          { href: '/nieuws/', label: 'Nieuws' },
          { label: item.title },
        ]}
        kicker={item.category}
        title={item.title}
        excerpt={item.excerpt}
        author={item.author}
        date={item.publishedAt}
        coverLabel={item.coverLabel}
        path={`/nieuws/${item.slug}/`}
        related={resolveRelated(item.related)}
      >
        {item.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </ArticleLayout>
    </>
  )
}
