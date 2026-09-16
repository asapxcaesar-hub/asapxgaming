import { notFound } from 'next/navigation'
import { FoldNotice } from '@/components/FoldNotice'
import { allNews, getNews } from '@/lib/content'

export const metadata = { robots: { index: false, follow: true } }

export function generateStaticParams() {
  return allNews().map((item) => ({ slug: item.slug }))
}

export default async function LegacyNewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getNews(slug)
  if (!item) notFound()
  return <FoldNotice to={`/news/${item.slug}/`} title="the story" />
}
