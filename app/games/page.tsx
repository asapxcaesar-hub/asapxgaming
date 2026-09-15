import Link from 'next/link'
import { CoverPlaceholder } from '@/components/CoverPlaceholder'
import { games } from '@/content/games'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Games',
  description: 'Game-database van ASAPxGaming: platforms, releases en gerelateerde coverage.',
  path: '/games/',
})

export default function GamesPage() {
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Games</p>
        <h1 className="mt-2 font-display text-5xl">Database</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Geen wiki van 30.000 pagina’s. Wel de titels waar deze desk coverage op heeft of verwacht.
        </p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {games.map((game) => (
          <li key={game.slug}>
            <Link href={`/games/${game.slug}/`} className="grid gap-3 border border-line p-4 hover:border-accent">
              <CoverPlaceholder label={game.coverLabel} className="min-h-28" />
              <p className="text-xs uppercase tracking-wider text-accent">
                {game.status === 'upcoming' ? 'Verwacht' : 'Uit'} · {game.genre}
              </p>
              <h2 className="text-xl font-semibold">{game.title}</h2>
              <p className="text-sm text-muted">{game.platforms.join(' · ')}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
