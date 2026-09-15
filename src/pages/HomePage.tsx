import { Link } from 'react-router-dom'
import { ArticleCard } from '@/components/ArticleCard'
import { ReviewCard } from '@/components/ReviewCard'
import { Button } from '@/components/ui/button'
import { news } from '@/data/news'
import { reviews } from '@/data/reviews'

export function HomePage() {
  const featured = reviews[0]
  const latestNews = news.slice(0, 3)
  const latestReviews = reviews.slice(0, 3)

  return (
    <div className="grid gap-12">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-hot">
            NL · reviews · nieuws
          </p>
          <h1 className="mt-3 font-display text-6xl leading-[0.9] tracking-wide md:text-8xl">
            ASAPxGaming
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Scores zonder sponsorwaas. Nieuws zonder lek-theater. Wij spelen de build, noteren de
            tilt, en zeggen of je hem pakt of laat liggen.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/reviews">Naar de reviews</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/nieuws">Laatste nieuws</Link>
            </Button>
          </div>
        </div>
        <Link
          to={`/reviews/${featured.slug}`}
          className="slash-frame border border-acid/40 bg-panel p-6 hover:border-acid"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-acid">Featured review</p>
          <p className="mt-3 font-display text-5xl leading-none">{featured.game}</p>
          <p className="mt-3 text-sm text-muted">{featured.excerpt}</p>
          <p className="mt-5 font-display text-5xl text-acid">{featured.score.toFixed(1)}</p>
        </Link>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl tracking-wide">Verse drops</h2>
          <Link className="text-xs uppercase tracking-[0.16em] text-acid" to="/nieuws">
            Alle nieuws
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestNews.map((item) => (
            <ArticleCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl tracking-wide">Laatste oordelen</h2>
          <Link className="text-xs uppercase tracking-[0.16em] text-acid" to="/reviews">
            Alle reviews
          </Link>
        </div>
        <div className="grid gap-4">
          {latestReviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      </section>
    </div>
  )
}
