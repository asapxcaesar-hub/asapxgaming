import { FoldNotice } from '@/components/FoldNotice'

export const metadata = { robots: { index: false, follow: true } }

export default function GamesHubPage() {
  return <FoldNotice to="/releases/" title="de releasekalender" />
}
