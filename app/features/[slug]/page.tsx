import { notFound } from 'next/navigation'
import { FoldNotice } from '@/components/FoldNotice'
import { features } from '@/content/features'
import { getNews } from '@/lib/content'

export const metadata = { robots: { index: false, follow: true } }

export function generateStaticParams() {
  return features.map((item) => ({ slug: item.slug }))
}

export default async function FeatureRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!getNews(slug)) notFound()
  return <FoldNotice to={`/nieuws/${slug}/`} title="het nieuwsarchief" />
}
