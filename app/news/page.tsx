import { NewsArchive } from '@/components/NewsArchive'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'NEWS',
  description: 'Game news from ASAPxGaming.',
  path: '/news/',
})

export default function NewsPage() {
  return (
    <div className="grid gap-6">
      <header>
        <h1 className="font-display text-5xl uppercase tracking-wide">NEWS</h1>
      </header>
      <NewsArchive />
    </div>
  )
}
