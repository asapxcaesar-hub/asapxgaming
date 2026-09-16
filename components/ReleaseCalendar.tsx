'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CoverImage } from '@/components/CoverImage'
import { EmptyState } from '@/components/EmptyState'
import { reviews } from '@/content/reviews'
import { calendarGames, filterGames } from '@/lib/content'
import { formatDate, formatMonth } from '@/lib/utils'

const catalog = calendarGames()
const platforms = ['All', ...Array.from(new Set(catalog.flatMap((game) => game.platforms)))]
const genres = ['All', ...Array.from(new Set(catalog.map((game) => game.genre)))]
const months = [
  'All',
  ...Array.from(new Set(catalog.map((game) => game.releaseDate.slice(0, 7)))).sort(),
]

export function ReleaseCalendar() {
  const [platform, setPlatform] = useState('All')
  const [genre, setGenre] = useState('All')
  const [month, setMonth] = useState('All')
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

  const monthKeys = Object.keys(grouped).sort()

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
          Month
          <select
            className="h-10 border border-line bg-elevated px-2 text-sm text-ink"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
          >
            {months.map((item) => (
              <option key={item} value={item}>
                {item === 'All' ? 'All' : formatMonth(item)}
              </option>
            ))}
          </select>
        </label>
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          title="No releases"
          detail="This mix of platform, genre and month is empty in the open months."
          action={{
            label: 'Reset filters',
            onClick: () => {
              setPlatform('All')
              setGenre('All')
              setMonth('All')
            },
          }}
        />
      ) : (
        monthKeys.map((key) => {
          const list = grouped[key]
          return (
            <section key={key}>
              <h2 className="font-display text-3xl capitalize">{formatMonth(key)}</h2>
              <ul className="mt-3 divide-y divide-line border border-line">
                {list.map((game) => {
                  const review = reviews.find((item) => item.gameSlug === game.slug)
                  return (
                    <li key={game.slug} className="grid gap-1 bg-elevated p-4 md:grid-cols-[8rem_1fr_auto]">
                      <p className="text-sm text-accent">{formatDate(game.releaseDate)}</p>
                      <div className="flex gap-3">
                        <CoverImage
                          src={game.coverImage}
                          alt={game.title}
                          label={game.coverLabel}
                          className="hidden size-16 min-h-16 sm:block"
                        />
                        <div>
                          {review ? (
                            <Link href={`/reviews/${review.slug}/`} className="font-semibold hover:text-accent">
                              {game.title}
                            </Link>
                          ) : (
                            <p className="font-semibold">{game.title}</p>
                          )}
                          <p className="text-sm text-muted">
                            {game.genre} · {game.platforms.join(', ')} · {game.status === 'upcoming' ? 'Upcoming' : 'Out'}
                          </p>
                        </div>
                      </div>
                      {review ? (
                        <Link href={`/reviews/${review.slug}/`} className="text-sm text-accent">
                          Review
                        </Link>
                      ) : (
                        <span className="text-sm text-muted">On the calendar</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })
      )}
    </div>
  )
}
