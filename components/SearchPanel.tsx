'use client'

import { useMemo, useState, useSyncExternalStore, type FormEvent } from 'react'
import Link from 'next/link'
import { EmptyState } from '@/components/EmptyState'
import { searchAll } from '@/lib/content'

const STORAGE_KEY = 'asap-search'
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

function readStoredQuery() {
  if (typeof window === 'undefined') return ''
  const fromUrl = new URLSearchParams(window.location.search).get('q')
  return fromUrl?.trim() || sessionStorage.getItem(STORAGE_KEY) || ''
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener('storage', listener)
  window.addEventListener('asap-search', listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', listener)
    window.removeEventListener('asap-search', listener)
  }
}

export function SearchPanel() {
  const stored = useSyncExternalStore(subscribe, readStoredQuery, () => '')
  const [draft, setDraft] = useState<string | null>(null)
  const query = draft ?? stored
  const hits = useMemo(() => searchAll(query), [query])

  function persist(value: string) {
    setDraft(value)
    sessionStorage.setItem(STORAGE_KEY, value)
    emit()
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    persist(query)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row" role="search">
        <label className="sr-only" htmlFor="search-q">
          Search
        </label>
        <input
          id="search-q"
          value={query}
          onChange={(event) => persist(event.target.value)}
          placeholder="Search news, reviews, releases…"
          className="h-12 flex-1 border border-line bg-elevated px-3"
        />
        <button type="submit" className="h-12 bg-accent px-5 font-semibold text-accent-ink">
          Search
        </button>
      </form>
      {!query.trim() ? (
        <EmptyState
          title="Type a term"
          detail="Try Wolverine, handheld, Bond or PlayStation."
        />
      ) : hits.length === 0 ? (
        <EmptyState
          title="Nothing found"
          detail={`No hits for “${query.trim()}”. Try a game title or a desk.`}
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
