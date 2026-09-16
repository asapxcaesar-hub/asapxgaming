import { FoldNotice } from '@/components/FoldNotice'

export const metadata = { robots: { index: false, follow: true } }

export default function LegacyNewsHubPage() {
  return <FoldNotice to="/news/" title="the news archive" />
}
