import { site } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Disclaimer',
  description: 'ASAPxGaming disclaimer on verdicts, keys and trademarks.',
  path: '/disclaimer/',
})

export default function DisclaimerPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <h1 className="font-display text-5xl">Disclaimer</h1>
      <p>
        Reviews and news on ASAPxGaming are editorial takes from {site.creator.name}, not purchase
        advice with a guarantee. Scores are this desk’s verdict.
      </p>
      <p>
        Game and brand names stay with their owners. Coverage is not a partnership unless we write
        that out loud.
      </p>
      <p>
        Review keys or free hardware get named in the piece when that applies. This demo set has no
        hidden affiliate layer.
      </p>
      <p>
        Facts can change after publication. We correct proven errors. We do not rewrite history to
        please a publisher.
      </p>
    </div>
  )
}
