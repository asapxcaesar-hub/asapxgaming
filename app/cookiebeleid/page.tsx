import { FoldNotice } from '@/components/FoldNotice'

export const metadata = { robots: { index: false, follow: true } }

export default function LegacyCookiePage() {
  return <FoldNotice to="/cookies/" title="cookies" />
}
