import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Cookiebeleid',
  description: 'Cookiebeleid van ASAPxGaming: deze statische build zet geen trackingcookies.',
  path: '/cookiebeleid/',
})

export default function CookiePage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <h1 className="font-display text-5xl">Cookiebeleid</h1>
      <p>
        Deze website is een statische export. ASAPxGaming zet zelf geen trackingcookies en toont geen
        cookiebanner die “accepteer alles” duwt.
      </p>
      <p>
        Je browser kan technische gegevens bijhouden (zoals een localStorage-vlag als je zelf iets
        kopieert). Dat is jouw machine, geen profiel bij ons.
      </p>
      <p>
        Ingebedde video’s van YouTube, Twitch of TikTok — als je die vanaf de volg-knoppen opent —
        vallen onder het cookiebeleid van die platforms. We hosten die players niet op de homepage.
      </p>
    </div>
  )
}
