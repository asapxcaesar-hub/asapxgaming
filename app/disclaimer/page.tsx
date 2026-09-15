import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Disclaimer',
  description: 'Disclaimer van ASAPxGaming over oordelen, keys en merken.',
  path: '/disclaimer/',
})

export default function DisclaimerPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <h1 className="font-display text-5xl">Disclaimer</h1>
      <p>
        Reviews en nieuws op ASAPxGaming zijn redactionele oordelen van Sem Harms, geen koopadvies
        met garantie. Scores zijn van deze desk, geen aggregaat.
      </p>
      <p>
        Game- en merknamen blijven van hun rechthebbenden. Coverage betekent geen partnership, tenzij
        we dat expliciet schrijven.
      </p>
      <p>
        Review keys of reise gratis hardware benoemen we in het stuk als dat speelt. Deze demo-set
        bevat geen verborgen affiliate-laag.
      </p>
      <p>
        Feiten kunnen veranderen na publicatie. We corrigeren aantoonbare fouten; we herschrijven geen
        history om een publisher te pleasen.
      </p>
    </div>
  )
}
