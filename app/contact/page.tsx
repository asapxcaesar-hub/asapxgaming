import { ContactForm } from '@/components/ContactForm'
import { site } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'PR, review keys, samenwerkingen en algemene vragen voor ASAPxGaming.',
  path: '/contact/',
})

export default function ContactPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
        <h1 className="mt-2 font-display text-5xl">Schrijf de desk</h1>
        <p className="mt-3 text-muted">
          Review keys, samenwerkingen of een gewone vraag. Dit formulier is een layout: in de
          statische demo gaat er geen backend-mail. Mail{' '}
          <a className="text-accent hover:underline" href={`mailto:${site.creator.email}`}>
            {site.creator.email}
          </a>
          .
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-muted">
          <li>PR / review keys — build + embargo, geen hypedeck zonder code.</li>
          <li>Samenwerkingen — alleen als de onafhankelijkheid overeind blijft.</li>
          <li>Algemeen — tips, correcties, LAN-kaartjes.</li>
        </ul>
      </div>
      <ContactForm />
    </div>
  )
}
