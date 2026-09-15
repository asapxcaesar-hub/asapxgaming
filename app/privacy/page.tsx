import { site } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Privacy',
  description: 'Privacyverklaring van ASAPxGaming: wat we wél en niet bijhouden.',
  path: '/privacy/',
})

export default function PrivacyPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <h1 className="font-display text-5xl">Privacy</h1>
      <p>
        ASAPxGaming is een statische website. We hosten geen accounts en slaan via dit project geen
        profielen, wachtwoorden of nieuwsbrieven op.
      </p>
      <p>
        Het contactformulier in deze demo verstuurt niets naar een server. In productie zou mail naar{' '}
        {site.creator.email} gaan en alleen gebruikt worden om je vraag te beantwoorden.
      </p>
      <p>
        Analytics of cookies van derden staan niet in deze build. Als dat later verandert, past deze
        pagina mee — tot die tijd: geen tracking-laag.
      </p>
      <p className="text-sm text-muted">Laatst bijgewerkt: 15 september 2026.</p>
    </div>
  )
}
