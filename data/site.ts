export const site = {
  name: 'ASAPxGaming',
  tagline: 'Onafhankelijk gamingplatform. Persoonlijk oordeel.',
  description:
    'ASAPxGaming is het Nederlandse creator-platform van Sem Harms: nieuws, reviews, releases, features en hardware — zonder redactiefabriek.',
  locale: 'nl_NL',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asaspxgaming.wasmer.app',
  creator: {
    name: 'Sem Harms',
    handle: 'ASAP',
    role: 'Oprichter & hoofdredacteur',
    city: 'Rotterdam',
    email: 'redactie@asaspxgaming.nl',
    bio: 'Sem “ASAP” Harms speelt, streamt en schrijft sinds 2018. ASAPxGaming is zijn desk: geen nieuwsfabriek, wel een oordeel dat je kunt naspelen.',
  },
  accent: '#2EE6A6',
  socials: {
    youtube: 'https://www.youtube.com/@ASAPxGaming',
    twitch: 'https://www.twitch.tv/asaspxgaming',
    tiktok: 'https://www.tiktok.com/@asaspxgaming',
    x: 'https://x.com/asaspxgaming',
    instagram: 'https://www.instagram.com/asaspxgaming',
    discord: 'https://discord.gg/asaspxgaming',
  },
} as const

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/nieuws/', label: 'Nieuws' },
  { href: '/reviews/', label: 'Reviews' },
  { href: '/games/', label: 'Games' },
  { href: '/releases/', label: 'Releases' },
  { href: '/features/', label: 'Features' },
  { href: '/hardware/', label: 'Hardware' },
  { href: '/over-asapxgaming/', label: 'Over' },
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
