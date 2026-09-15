import { useMemo, useState } from 'react'
import { ArticleCard } from '@/components/ArticleCard'
import { EmptyState, LoadingGrid } from '@/components/StatusStates'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { news } from '@/data/news'
import { useSimulatedLoad } from '@/hooks/useSimulatedLoad'

const tags = ['Alle', ...Array.from(new Set(news.flatMap((item) => item.tags)))]

export function NewsListPage() {
  const loading = useSimulatedLoad()
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('Alle')

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return news.filter((item) => {
      const matchesTag = tag === 'Alle' || item.tags.includes(tag)
      const matchesQuery =
        needle.length === 0 ||
        `${item.title} ${item.excerpt} ${item.kicker}`.toLowerCase().includes(needle)
      return matchesTag && matchesQuery
    })
  }, [query, tag])

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-hot">Nieuws</p>
        <h1 className="mt-2 font-display text-5xl tracking-wide md:text-6xl">De feed</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Industry, hardware, esports en deals — gefilterd op wat je kunt spelen of laten liggen.
        </p>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Zoek in de feed…"
          aria-label="Zoek nieuws"
        />
        <div className="flex flex-wrap gap-2">
          {tags.map((item) => (
            <button key={item} type="button" onClick={() => setTag(item)}>
              <Badge
                className={
                  tag === item ? 'border-acid bg-acid text-void' : 'hover:border-acid hover:text-acid'
                }
              >
                {item}
              </Badge>
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <LoadingGrid label="Feed laden…" />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Geen hits"
          detail="Die combo van zoekterm en tag levert niks op. Gooi de filters om of zoek ruimer."
          onReset={() => {
            setQuery('')
            setTag('Alle')
          }}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((item) => (
            <ArticleCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
