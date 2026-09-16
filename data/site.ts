/** Editorial "today" for the static site: current month of the release list. */
export const SITE_TODAY = '2026-09-16'
export const SITE_MONTH = SITE_TODAY.slice(0, 7)

export const site = {
  name: 'ASAPxGaming',
  tagline: 'Independent games coverage. Personal verdict.',
  description:
    'ASAPxGaming is Kay van Elsen’s site for news, reviews, and releases, without a news factory.',
  locale: 'en_US',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asaspxgaming.wasmer.app',
  creator: {
    name: 'Kay van Elsen',
    handle: 'asapxcaesar',
    role: 'Founder',
    email: 'asapxcaesar@gmail.com',
    bio: 'Kay van Elsen writes as asapxcaesar. ASAPxGaming is news, reviews, and a verdict you can replay.',
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
  { href: '/news/', label: 'News' },
  { href: '/reviews/', label: 'Reviews' },
  { href: '/releases/', label: 'Releases' },
] as const

export const footerNav = [
  { href: '/contact/', label: 'Contact' },
  { href: '/search/', label: 'Search' },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/disclaimer/', label: 'Disclaimer' },
  { href: '/cookies/', label: 'Cookies' },
] as const

export const newsFilters = [
  'All',
  'PlayStation',
  'Xbox',
  'Nintendo',
  'PC',
  'Industry',
  'Indie',
] as const
