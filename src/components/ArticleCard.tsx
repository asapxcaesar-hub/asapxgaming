import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { NewsItem } from '@/data/news'
import { formatDate } from '@/lib/utils'

export function ArticleCard({ item }: { item: NewsItem }) {
  return (
    <Card>
      <Link to={`/nieuws/${item.slug}`} className="block p-5 focus-visible:outline-acid">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge className="border-hot/40 text-hot">{item.kicker}</Badge>
          <span className="text-xs text-muted">{formatDate(item.publishedAt)}</span>
        </div>
        <h3 className="font-display text-3xl leading-none tracking-wide text-ink">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{item.excerpt}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-acid">Lees door →</p>
      </Link>
    </Card>
  )
}
