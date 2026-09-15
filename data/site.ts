export const site = {
  name: 'ASAPxGaming',
  tagline: 'Onafhankelijk gamingplatform. Persoonlijk oordeel.',
  description:
    'ASAPxGaming is het Nederlandse creator-platform van Kay van Elsen: nieuws, reviews en releases — zonder redactiefabriek.',
  locale: 'nl_NL',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asaspxgaming.wasmer.app',
  creator: {
    name: 'Kay van Elsen',
    handle: 'asapxcaesar',
    role: 'Oprichter',
    email: 'asapxcaesar@gmail.com',
    bio: 'Kay van Elsen speelt, streamt en schrijft als asapxcaesar. ASAPxGaming is de desk: geen nieuwsfabriek, wel een oordeel dat je kunt naspelen.',
  },
  accent: '#2EE6A6',
  socials: {
    youtube: 'https://www.youtube.com/@asapxcaesar',
    twitch: 'https://www.twitch.tv/asapxcaesar',
    tiktok: 'https://www.tiktok.com/@asapxcaesar',
  },
} as const

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/nieuws/', label: 'Nieuws' },
  { href: '/reviews/', label: 'Reviews' },
  { href: '/releases/', label: 'Releases' },
] as const

export const footerNav = [
  { href: '/contact/', label: 'Contact' },
  { href: '/zoeken/', label: 'Zoeken' },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/disclaimer/', label: 'Disclaimer' },
  { href: '/cookiebeleid/', label: 'Cookiebeleid' },
] as const

export const newsFilters = [
  'Alles',
  'PlayStation',
  'Xbox',
  'Nintendo',
  'PC',
  'Industry',
  'Indie',
] as const
