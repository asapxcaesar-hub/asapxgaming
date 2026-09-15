'use client'

import { useMemo, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { EmptyState } from '@/components/EmptyState'
import { searchAll } from '@/lib/content'

export function SearchPanel() {
  const router = useRouter()
  const params = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const hits = useMemo(() => searchAll(query), [query])

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const q = query.trim()
    router.replace(q ? `/zoeken/?q=${encodeURIComponent(q)}` : '/zoeken/')
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row" role="search">
        <label className="sr-only" htmlFor="search-q">
          Zoekterm
        </label>
        <input
          id="search-q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Zoek nieuws, reviews, games, hardware…"
          className="h-12 flex-1 border border-line bg-elevated px-3"
        />
        <button type="submit" className="h-12 bg-accent px-5 font-semibold text-accent-ink">
          Zoeken
        </button>
      </form>
      {!query.trim() ? (
        <EmptyState
          title="Typ een term"
          detail="Bijvoorbeeld Silksong, handheld, Rotterdam of PlayStation."
        />
      ) : hits.length === 0 ? (
        <EmptyState
          title="Niets gevonden"
          detail={`Geen treffers voor “${query.trim()}”. Probeer een gametitel of rubriek.`}
        />
      ) : (
        <ul className="grid gap-4">
          {hits.map((hit) => (
            <li key={hit.href} className="border border-line bg-elevated p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-accent">{hit.kind}</p>
              <Link href={hit.href} className="mt-1 block text-lg font-semibold hover:text-accent">
                {hit.title}
              </Link>
              <p className="mt-1 text-sm text-muted">{hit.excerpt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
