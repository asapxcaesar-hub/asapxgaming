import type { VideoClip } from '@/types/content'
import { site } from '@/data/site'

export const videos: VideoClip[] = [
  {
    id: 'yt-desk-33',
    title: 'Desk-run: Expedition 33 parry-window',
    platform: 'YouTube',
    href: site.socials.youtube,
    coverLabel: 'YT',
  },
  {
    id: 'tw-silksong',
    title: 'VOD: Silksong tot de eerste echte muur',
    platform: 'Twitch',
    href: site.socials.twitch,
    coverLabel: 'LIVE',
  },
  {
    id: 'tt-kart',
    title: 'TikTok: 20 seconden Mario Kart-tilt',
    platform: 'TikTok',
    href: site.socials.tiktok,
    coverLabel: 'TT',
  },
]
