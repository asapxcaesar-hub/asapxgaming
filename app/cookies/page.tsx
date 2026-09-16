import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Cookies',
  description: 'Cookie notice for ASAPxGaming: this static build sets no tracking cookies.',
  path: '/cookies/',
})

export default function CookiePage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <h1 className="font-display text-5xl">Cookies</h1>
      <p>
        This site is a static export. ASAPxGaming does not set tracking cookies and does not show a
        banner that pushes “accept all”.
      </p>
      <p>
        Your browser may keep technical data (such as a localStorage flag if you copy something
        yourself). That is your machine, not a profile here.
      </p>
      <p>
        Embedded video on YouTube, Twitch or TikTok (if you open those from the follow buttons)
        falls under those platforms’ cookie rules. We do not host those players on the homepage.
      </p>
    </div>
  )
}
