import { useMemo, useState } from 'react'
import { ReviewCard } from '@/components/ReviewCard'
import { EmptyState, LoadingGrid } from '@/components/StatusStates'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { reviews } from '@/data/reviews'
import { useSimulatedLoad } from '@/hooks/useSimulatedLoad'

const genres = ['Alle', ...Array.from(new Set(reviews.map((review) => review.genre)))]

export function ReviewsListPage() {
  const loading = useSimulatedLoad()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Alle')

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return reviews.filter((review) => {
      const matchesGenre = genre === 'Alle' || review.genre === genre
      const haystack = `${review.game} ${review.title} ${review.excerpt} ${review.platforms.join(' ')}`.toLowerCase()
      return matchesGenre && (needle.length === 0 || haystack.includes(needle))
    })
  }, [genre, query])

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-hot">Reviews</p>
        <h1 className="mt-2 font-display text-5xl tracking-wide md:text-6xl">Het oordeel</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Cijfers van 1 tot 10, plus een verdict. Must-play betekent: plan je week eromheen.
        </p>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Zoek game, platform, genre…"
          aria-label="Zoek reviews"
        />
        <div className="flex flex-wrap gap-2">
          {genres.map((item) => (
            <button key={item} type="button" onClick={() => setGenre(item)}>
              <Badge
                className={
                  genre === item
                    ? 'border-acid bg-acid text-void'
                    : 'hover:border-acid hover:text-acid'
                }
              >
                {item}
              </Badge>
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <LoadingGrid label="Reviews laden…" />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Geen matches"
          detail="Geen review die dit filter overleeft. Reset en probeer een kortere zoekterm."
          onReset={() => {
            setQuery('')
            setGenre('Alle')
          }}
        />
      ) : (
        <div className="grid gap-4">
          {filtered.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      )}
    </div>
  )
}
