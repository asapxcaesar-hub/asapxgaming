import { FoldNotice } from '@/components/FoldNotice'
import { features } from '@/content/features'

export const metadata = { robots: { index: false, follow: true } }

export function generateStaticParams() {
  return features.map((item) => ({ slug: item.slug }))
}

export default function FeatureRedirectPage() {
  return <FoldNotice to="/news/" title="the news archive" />
}
