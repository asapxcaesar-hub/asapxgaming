import { notFound } from 'next/navigation'
import { FoldNotice } from '@/components/FoldNotice'
import { hardware } from '@/content/hardware'
import { getNews } from '@/lib/content'

export const metadata = { robots: { index: false, follow: true } }

export function generateStaticParams() {
  return hardware.map((item) => ({ slug: item.slug }))
}

export default async function HardwareRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!getNews(slug)) notFound()
  return <FoldNotice to={`/nieuws/${slug}/`} title="het nieuwsarchief" />
}
