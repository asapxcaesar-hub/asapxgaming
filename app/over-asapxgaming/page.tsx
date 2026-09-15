import { FoldNotice } from '@/components/FoldNotice'

export const metadata = { robots: { index: false, follow: true } }

export default function AboutRedirectPage() {
  return <FoldNotice to="/" title="home" />
}
