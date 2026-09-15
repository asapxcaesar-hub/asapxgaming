import { site } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Over ASAPxGaming',
  description: site.creator.bio,
  path: '/over-asapxgaming/',
})

export default function AboutPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">Over</p>
      <h1 className="font-display text-5xl">ASAPxGaming is een desk, geen fabriek</h1>
      <p className="text-lg text-muted">{site.creator.bio}</p>
      <p>
        {site.creator.name} ({site.creator.handle}) runt dit platform vanuit {site.creator.city}. Nieuws,
        reviews, features en hardware lopen via dezelfde lat: speelbaar, nagespeeld, geen lek-JPG.
        Later kunnen deals, guides en interviews erbij — niet voordat de basis staat.
      </p>
      <p>
        ASAPxGaming is onafhankelijk. Geen kansspel-hoek, geen nagemaakte PU-layout. Wel een duidelijke
        hiërarchie: featured story, feed, scores, kalender, achtergrond, video-kanalen.
      </p>
      <p className="text-sm text-muted">
        {site.creator.role} · {site.creator.email}
      </p>
    </div>
  )
}
