import { FoldNotice } from '@/components/FoldNotice'
import { hardware } from '@/content/hardware'

export const metadata = { robots: { index: false, follow: true } }

export function generateStaticParams() {
  return hardware.map((item) => ({ slug: item.slug }))
}

export default function HardwareRedirectPage() {
  return <FoldNotice to="/nieuws/" title="het nieuwsarchief" />
}
