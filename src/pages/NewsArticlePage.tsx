import { Link, useParams } from 'react-router-dom'
import { ErrorState, LoadingGrid } from '@/components/StatusStates'
import { Badge } from '@/components/ui/badge'
import { getNews } from '@/data/news'
import { useSimulatedLoad } from '@/hooks/useSimulatedLoad'
import { formatDate } from '@/lib/utils'

export function NewsArticlePage() {
  const { slug } = useParams()
  const loading = useSimulatedLoad(280)
  const item = slug ? getNews(slug) : undefined

  if (loading) {
    return <LoadingGrid label="Artikel laden…" />
  }

  if (!item) {
    return (
      <ErrorState
        title="Artikel kwijt"
        detail="Deze slug zit niet in de feed. Misschien een oude link, of een typo in de URL."
      />
    )
  }

  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs uppercase tracking-[0.18em] text-hot">{item.kicker}</p>
      <h1 className="mt-3 font-display text-5xl leading-none tracking-wide md:text-6xl">
        {item.title}
      </h1>
      <p className="mt-4 text-sm text-muted">
        {item.author} · {formatDate(item.publishedAt)}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="mt-8 grid gap-4 text-base leading-relaxed text-ink/90">
        {item.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Link className="mt-10 inline-block text-xs uppercase tracking-[0.16em] text-acid" to="/nieuws">
        ← Terug naar de feed
      </Link>
    </article>
  )
}
