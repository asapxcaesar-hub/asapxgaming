import { site } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Privacy',
  description: 'Privacy notice for ASAPxGaming: what we keep, and what we do not.',
  path: '/privacy/',
})

export default function PrivacyPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <h1 className="font-display text-5xl">Privacy</h1>
      <p>
        ASAPxGaming is a static website. We host no accounts and this project stores no profiles,
        passwords or newsletters.
      </p>
      <p>
        The contact form in this demo sends nothing to a server. In production, mail would go to{' '}
        {site.creator.email} and only be used to answer your question.
      </p>
      <p>
        Analytics or third party cookies are not in this build. If that changes later, this page
        changes with it. Until then: no tracking layer.
      </p>
      <p className="text-sm text-muted">Last updated: 16 September 2026.</p>
    </div>
  )
}
