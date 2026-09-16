import type { VideoClip } from '@/types/content'
import { site } from '@/data/site'

export const videos: VideoClip[] = [
  {
    id: 'yt-wolverine-launch',
    title: 'Desk: Wolverine launch, first hour without hype voice',
    platform: 'YouTube',
    href: site.socials.youtube,
    coverLabel: 'YT',
  },
  {
    id: 'tw-moonlighter',
    title: 'VOD: Moonlighter 2 until the shop runs',
    platform: 'Twitch',
    href: site.socials.twitch,
    coverLabel: 'LIVE',
  },
  {
    id: 'tt-gta-wachtkamer',
    title: 'TikTok: 19 November, no leak JPG',
    platform: 'TikTok',
    href: site.socials.tiktok,
    coverLabel: 'TT',
  },
]
