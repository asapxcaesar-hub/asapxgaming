import { ArticleCard } from '@/components/ArticleCard'
import { byDate, features } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Features',
  description: 'Achtergrond en columns van ASAPxGaming — langer, persoonlijker, visueel los van kort nieuws.',
  path: '/features/',
})

export default function FeaturesPage() {
  return (
    <div className="grid gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Features</p>
        <h1 className="mt-2 font-display text-5xl">Achtergrond</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Essays en columns. Geen 400-woorden-nieuws in een groter jasje — dat zit onder Nieuws.
        </p>
      </header>
      <div className="grid gap-10">
        {byDate(features).map((item) => (
          <ArticleCard
            key={item.slug}
            href={`/features/${item.slug}/`}
            kicker="Achtergrond"
            title={item.title}
            excerpt={item.excerpt}
            date={item.publishedAt}
            coverLabel={item.coverLabel}
            featured
          />
        ))}
      </div>
    </div>
  )
}
