import { FoldNotice } from '@/components/FoldNotice'

export const metadata = { robots: { index: false, follow: true } }

export default function HardwareHubPage() {
  return <FoldNotice to="/nieuws/" title="het nieuwsarchief" />
}
