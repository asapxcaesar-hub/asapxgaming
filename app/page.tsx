import Link from 'next/link'
import { ArticleCard } from '@/components/ArticleCard'
import { ReviewCard } from '@/components/ReviewCard'
import { CoverImage } from '@/components/CoverImage'
import { Button } from '@/components/ui/button'
import { videos } from '@/content/videos'
import { site } from '@/data/site'
import { allNews, byDate, coverForGame, reviews, reviewsForGame, upcomingGames } from '@/lib/content'

export default function HomePage() {
  const feed = allNews()
  const featured = feed[0]
  const latestNews = feed.slice(1, 5)
  const latestReviews = byDate(reviews).slice(0, 3)
  const coming = upcomingGames().slice(0, 3)

  return (
    <div className="grid gap-14">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Featured story</p>
        <ArticleCard
          href={`/nieuws/${featured.slug}/`}
          kicker={featured.category}
          title={featured.title}
          excerpt={featured.excerpt}
          date={featured.publishedAt}
          coverLabel={featured.coverLabel}
          coverSrc={coverForGame(featured.gameSlug)}
          featured
        />
        <p className="mt-6 max-w-2xl text-sm text-muted">
          {site.creator.bio}
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-4xl">Laatste nieuws</h2>
          <Link href="/nieuws/" className="text-sm text-accent">
            Archief
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {latestNews.map((item) => (
            <ArticleCard
              key={item.slug}
              href={`/nieuws/${item.slug}/`}
              kicker={item.category}
              title={item.title}
              excerpt={item.excerpt}
              date={item.publishedAt}
              coverLabel={item.coverLabel}
              coverSrc={coverForGame(item.gameSlug)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-4xl">Reviews</h2>
          <Link href="/reviews/" className="text-sm text-accent">
            Alle scores
          </Link>
        </div>
        <div className="grid gap-3">
          {latestReviews.map((item) => (
            <ReviewCard
              key={item.slug}
              href={`/reviews/${item.slug}/`}
              game={item.title}
              excerpt={item.excerpt}
              score={item.score}
              verdict={item.verdict}
              date={item.publishedAt}
              coverLabel={item.coverLabel}
              coverSrc={coverForGame(item.gameSlug)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-4xl">Coming soon</h2>
          <Link href="/releases/" className="text-sm text-accent">
            Kalender
          </Link>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          {coming.map((game) => {
            const review = reviewsForGame(game.slug)[0]
            return (
              <li key={game.slug} className="border border-line bg-elevated p-4">
                <CoverImage src={game.coverImage} alt={game.title} label={game.coverLabel} className="mb-3 min-h-36" />
                <p className="text-xs text-accent">{game.releaseDate}</p>
                {review ? (
                  <Link href={`/reviews/${review.slug}/`} className="mt-2 block font-semibold hover:text-accent">
                    {game.title}
                  </Link>
                ) : (
                  <p className="mt-2 font-semibold">{game.title}</p>
                )}
                <p className="mt-1 text-sm text-muted">{game.platforms.join(' · ')}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="border border-line bg-elevated p-6 md:p-8">
        <h2 className="font-display text-4xl">Watch / follow</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Streams en shorts staan op de kanalen van {site.creator.handle}.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {videos.map((clip) => (
            <a key={clip.id} href={clip.href} target="_blank" rel="noreferrer" className="grid gap-2 hover:text-accent">
              <CoverImage alt={clip.title} label={clip.coverLabel} />
              <p className="text-xs uppercase tracking-[0.16em] text-accent">{clip.platform}</p>
              <p className="font-semibold">{clip.title}</p>
            </a>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <a href={site.socials.youtube} target="_blank" rel="noreferrer">
              YouTube
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={site.socials.twitch} target="_blank" rel="noreferrer">
              Twitch
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={site.socials.tiktok} target="_blank" rel="noreferrer">
              TikTok
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
