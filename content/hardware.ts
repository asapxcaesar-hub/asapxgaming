import type { HardwareReview } from '@/types/content'

export const hardware: HardwareReview[] = [
  {
    slug: 'steam-deck-oled-dagelijks',
    product: 'Steam Deck OLED',
    title: 'Steam Deck OLED in 2026: nog steeds de eerlijke pocket',
    excerpt:
      'Zelfde APU-familie als de LCD, beter scherm, langere batterij. Referentie als je in Steam woont. AAA in de trein blijft een compromis.',
    author: 'Kay van Elsen',
    publishedAt: '2026-07-18',
    score: 8.6,
    verdict: 'Referentie',
    coverLabel: 'DECK',
    plus: ['OLED die avonden redt', 'SteamOS-catalogus die klopt', 'Te repareren zonder theater'],
    minus: ['AAA blijft medium/30', 'Sleep-resume is niet heilig'],
    related: [
      { collection: 'news', slug: 'handheld-pc-koorts' },
      { collection: 'news', slug: 'handheld-koorts-essay' },
    ],
    seo: {
      title: 'Hardware: Steam Deck OLED — 8.6 Referentie',
      description:
        'Dagelijks gebruik 2026: 7,4 inch OLED, Steam-verified, waar AAA stopt. Geen Windows-schil.',
    },
    body: [
      'De Deck OLED (Valve, najaar 2023) is in 2026 geen nieuwe chip-mythe. Het is de versie die je meeneemt: 7,4 inch HDR-OLED, bekende APU, langere batterij dan de LCD. Heldere zwartwaarden maken 2D-indies en films in de trein dragelijk. De chip is bekend: dat is een feature, geen insult.',
      'ASAPxGaming meet handhelds aan verified-uren. Op dit toestel: Silksong, Expedition 33 op lager, emulators, korte runs. Cyberpunk op medium is een flex voor vijf stations, geen levensstijl. De ROG Xbox Ally bestaat sinds oktober 2025 als Windows-alternatief; koop die als je Game Pass in je tas wilt, niet als “de Deck maar dan 120 Hz”.',
      '8.6: referentie in SteamOS. Koop hem niet als impulse naast een Ally. Kies de winkel.',
    ],
  },
  {
    slug: 'dualsense-edge-desk',
    product: 'DualSense Edge',
    title: 'DualSense Edge: precisie voor een lade vol sticks',
    excerpt:
      'Verwisselbare modules, paddles, profielen. Duur. Voor Wolverine-avonden en shooters, niet voor Mario Kart-feestjes.',
    author: 'Kay van Elsen',
    publishedAt: '2026-05-09',
    score: 8.0,
    verdict: 'Niche-koop',
    coverLabel: 'EDGE',
    plus: ['Paddles die blijven zitten', 'Profielen per titel', 'Sticks die je zelf wisselt'],
    minus: ['Prijs van een game + DLC', 'Kabeldrama als de dock zoek is'],
    related: [{ collection: 'reviews', slug: 'wolverine-marvel' }],
    seo: {
      title: 'Hardware: DualSense Edge — 8.0 Niche-koop',
      description: 'Wanneer de Edge de moeite is op PS5 (Wolverine, shooters) — en wanneer de standaard-pad wint.',
    },
    body: [
      'De Edge is geen must voor een Mario Kart World-avond. Het is een must als stick-drift een jaargetijde is. Verwisselbare modules maken hem tot het enige Sony-pad dat ik durf te slijten. Launch-week Wolverine (september 2026) is precies het soort brawler waar paddles een reload of rage-knop mogen zijn zonder je duimen te verplaatsen.',
      'Profielen slaan op. Dat klinkt saai tot drie games één account delen. De prijs blijft die van een full-price game plus DLC. 8.0: gereedschap. Belachelijk als impulse naast de console zelf.',
    ],
  },
  {
    slug: 'xbox-wireless-headset',
    product: 'Xbox Wireless Headset',
    title: 'Xbox Wireless Headset: lobby-mic, nette prijs',
    excerpt:
      'Licht, paar-en-klaar met Xbox en pc-dongle. Voor party chat. Niet voor een collab-opname.',
    author: 'Kay van Elsen',
    publishedAt: '2026-04-12',
    score: 7.4,
    verdict: 'Oké instap',
    coverLabel: 'MIC',
    plus: ['Licht op je hoofd', 'Pairing zonder drama', 'Prijs die klopt'],
    minus: ['Mic is lobby-niveau', 'EQ-app is extra huiswerk'],
    related: [{ collection: 'news', slug: 'xbox-id-handheld-vragen' }],
    seo: {
      title: 'Hardware: Xbox Wireless Headset — 7.4 Oké instap',
      description: 'Party chat en singleplayer. Geen desk-microfoon. Bundel-koop, geen endgame-audio.',
    },
    body: [
      'Voor party chat en een Forza Horizon 6-festival in je eentje is dit headset in orde. Voor streams en “even een collab” pak ik iets anders. De microfoon klinkt als een lobby, niet als een desk. Pairing met Xbox is het verkoopargument; pc via dongle werkt; telefoon is een bijzaak.',
      '7.4: koop hem in de bundle, niet als endgame-audio. Spatial-audio-vinkjes in de Xbox-instellingen maken geen studio.',
    ],
  },
]
