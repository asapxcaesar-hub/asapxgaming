import { ContactForm } from '@/components/ContactForm'
import { site } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'PR, review keys, collabs and general questions for ASAPxGaming.',
  path: '/contact/',
})

export default function ContactPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
        <h1 className="mt-2 font-display text-5xl">Get in touch</h1>
        <p className="mt-3 text-muted">
          Review keys, collabs or a plain question. This form is layout: in the static demo no
          backend mail goes out. Mail{' '}
          <a className="text-accent hover:underline" href={`mailto:${site.creator.email}`}>
            {site.creator.email}
          </a>
          .
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-muted">
          <li>PR / review keys: build plus embargo, no hype deck without a code.</li>
          <li>Collabs: only if independence stays standing.</li>
          <li>General: tips, corrections, a bracket you want on the calendar.</li>
        </ul>
      </div>
      <ContactForm />
    </div>
  )
}
