import type { VideoClip } from '@/types/content'
import { site } from '@/data/site'

export const videos: VideoClip[] = [
  {
    id: 'yt-wolverine-launch',
    title: 'Desk: Wolverine launch, eerste uur zonder hype voice',
    platform: 'YouTube',
    href: site.socials.youtube,
    coverLabel: 'YT',
  },
  {
    id: 'tw-moonlighter',
    title: 'VOD: Moonlighter 2 tot de winkel draait',
    platform: 'Twitch',
    href: site.socials.twitch,
    coverLabel: 'LIVE',
  },
  {
    id: 'tt-gta-wachtkamer',
    title: 'TikTok: 19 november, geen lek JPG',
    platform: 'TikTok',
    href: site.socials.tiktok,
    coverLabel: 'TT',
  },
]
