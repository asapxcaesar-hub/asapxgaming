import Link from 'next/link'
import { ArticleCard } from '@/components/ArticleCard'
import { ReviewCard } from '@/components/ReviewCard'
import { CoverImage } from '@/components/CoverImage'
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
          href={`/news/${featured.slug}/`}
          kicker={featured.category}
          title={featured.title}
          excerpt={featured.excerpt}
          date={featured.publishedAt}
          coverLabel={featured.coverLabel}
          coverSrc={coverForGame(featured.gameSlug)}
          featured
        />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-4xl">Latest news</h2>
          <Link href="/news/" className="text-sm text-accent">
            Archive
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {latestNews.map((item) => (
            <ArticleCard
              key={item.slug}
              href={`/news/${item.slug}/`}
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
            All scores
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
            Calendar
          </Link>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          {coming.map((game) => {
            const review = reviewsForGame(game.slug)[0]
            return (
              <li key={game.slug} className="border border-line bg-elevated p-4">
                <CoverImage src={game.coverImage} alt={game.title} label={game.coverLabel} className="mb-3 h-28 min-h-28" />
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
    </div>
  )
}
