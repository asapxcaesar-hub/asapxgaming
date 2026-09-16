import { FoldNotice } from '@/components/FoldNotice'

export const metadata = { robots: { index: false, follow: true } }

export default function LegacySearchPage() {
  return <FoldNotice to="/search/" title="search" />
}
