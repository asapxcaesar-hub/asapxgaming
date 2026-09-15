'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { EmptyState } from '@/components/EmptyState'
import { games } from '@/content/games'
import { filterGames } from '@/lib/content'
import { formatDate, formatMonth } from '@/lib/utils'

const platforms = ['Alle', ...Array.from(new Set(games.flatMap((game) => game.platforms)))]
const genres = ['Alle', ...Array.from(new Set(games.map((game) => game.genre)))]
const months = ['Alle', ...Array.from(new Set(games.map((game) => game.releaseDate.slice(0, 7)))).sort()]

export function ReleaseCalendar() {
  const [platform, setPlatform] = useState('Alle')
  const [genre, setGenre] = useState('Alle')
  const [month, setMonth] = useState('Alle')
  const filtered = useMemo(
    () =>
      filterGames({ platform, genre, month }).sort((a, b) => a.releaseDate.localeCompare(b.releaseDate)),
    [genre, month, platform],
  )

  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, game) => {
    const key = game.releaseDate.slice(0, 7)
    acc[key] ??= []
    acc[key].push(game)
    return acc
  }, {})

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 md:grid-cols-3">
        <label className="grid gap-1 text-xs uppercase tracking-wider text-muted">
          Platform
          <select
            className="h-10 border border-line bg-elevated px-2 text-sm text-ink"
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
          >
            {platforms.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-xs uppercase tracking-wider text-muted">
          Genre
          <select
            className="h-10 border border-line bg-elevated px-2 text-sm text-ink"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          >
            {genres.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-xs uppercase tracking-wider text-muted">
          Maand
          <select
            className="h-10 border border-line bg-elevated px-2 text-sm text-ink"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
          >
            {months.map((item) => (
              <option key={item} value={item}>
                {item === 'Alle' ? 'Alle' : formatMonth(item)}
              </option>
            ))}
          </select>
        </label>
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          title="Geen releases"
          detail="Deze combo van platform, genre en maand is leeg in de demo-kalender."
          action={{
            label: 'Reset filters',
            onClick: () => {
              setPlatform('Alle')
              setGenre('Alle')
              setMonth('Alle')
            },
          }}
        />
      ) : (
        Object.entries(grouped).map(([key, list]) => (
          <section key={key}>
            <h2 className="font-display text-3xl capitalize">{formatMonth(key)}</h2>
            <ul className="mt-3 divide-y divide-line border border-line">
              {list.map((game) => (
                <li key={game.slug} className="grid gap-1 bg-elevated p-4 md:grid-cols-[8rem_1fr_auto]">
                  <p className="text-sm text-accent">{formatDate(game.releaseDate)}</p>
                  <div>
                    <Link href={`/games/${game.slug}/`} className="font-semibold hover:text-accent">
                      {game.title}
                    </Link>
                    <p className="text-sm text-muted">
                      {game.genre} · {game.platforms.join(', ')} · {game.status === 'upcoming' ? 'Verwacht' : 'Uit'}
                    </p>
                  </div>
                  <Link href={`/games/${game.slug}/`} className="text-sm text-accent">
                    Gamepagina
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  )
}
