import type { HardwareReview } from '@/types/content'

export const hardware: HardwareReview[] = [
  {
    slug: 'steam-deck-oled-dagelijks',
    product: 'Steam Deck OLED',
    title: 'Steam Deck OLED: nog steeds de eerlijke pocket-pc',
    excerpt:
      'Geen nieuwe chip-mythe. Wel het scherm, de batterij en waarom hij in 2026 de referentie blijft.',
    author: 'Sem Harms',
    publishedAt: '2026-07-18',
    score: 8.7,
    verdict: 'Referentie',
    coverLabel: 'DECK',
    plus: ['Scherm dat avonden redt', 'Linux-catalogus die klopt', 'Repairable genoeg'],
    minus: ['AAA blijft een compromis', 'Sleep-resume is niet heilig'],
    related: [
      { collection: 'news', slug: 'handheld-pc-koorts' },
      { collection: 'features', slug: 'handheld-koorts-essay' },
    ],
    seo: {
      title: 'Hardware: Steam Deck OLED — 8.7 Referentie',
      description:
        'Dagelijks gebruik van de Steam Deck OLED in 2026: batterij, catalogus, en waar AAA stopt.',
    },
    body: [
      'De OLED is geen revolutie, het is de versie die je wél meeneemt. Heldere zwartwaarden maken 2D-indies en films in de trein dragelijk. De chip is bekend: dat is een feature, geen insult.',
      'ASAPxGaming meet handhelds aan verified-uren, niet aan trailers. Op dit toestel speel ik Silksong, slay-the-spire-achtigen en emulators zonder schaamte. Cyberpunk op medium is een flex voor vijf stations, geen levensstijl.',
      'Koop hem als je al in Steam woont. Koop hem niet als je “Xbox in je tas” wilt zonder de Windows-tax te voelen — dat is een ander gesprek.',
    ],
  },
  {
    slug: 'dualsense-edge-desk',
    product: 'DualSense Edge',
    title: 'DualSense Edge: precisie voor mensen met een lade vol sticks',
    excerpt:
      'Swappable modules, paddles, profielen. Duur. Voor wie écht uren in één shooter leeft.',
    author: 'Sem Harms',
    publishedAt: '2026-05-09',
    score: 8.0,
    verdict: 'Niche-koop',
    coverLabel: 'EDGE',
    plus: ['Paddles die blijven zitten', 'Profielen per titel', 'Sticks die je zelf wisselt'],
    minus: ['Prijs van een game + DLC', 'Kabeldrama als je de dock vergeet'],
    related: [{ collection: 'news', slug: 'playstation-plus-extra-september' }],
    seo: {
      title: 'Hardware: DualSense Edge — 8.0 Niche-koop',
      description: 'Wanneer de DualSense Edge de moeite waard is — en wanneer de standaard-pad wint.',
    },
    body: [
      'De Edge is geen must voor Mario Kart-avonden. Het is een must als je stick-drift als jaargetijde kent. De modules maken hem tot het enige Sony-pad dat ik durf te slijten.',
      'Paddles veranderen DS2-traversal en shooter-reload-dansjes. Profielen slaan op. Dat klinkt saai, tot je drie games deelt op één account.',
      'Score 8.0: uitstekend gereedschap, belachelijk als impulse-buy naast een nieuwe console.',
    ],
  },
  {
    slug: 'xbox-wireless-headset',
    product: 'Xbox Wireless Headset',
    title: 'Xbox Wireless Headset: prima, tot je een microfoon-serieus gesprek voert',
    excerpt:
      'Licht, Game Pass-pairing, en een mic die Discord niet voor de gek houdt.',
    author: 'Sem Harms',
    publishedAt: '2026-04-12',
    score: 7.4,
    verdict: 'Oké instap',
    coverLabel: 'MIC',
    plus: ['Licht op je hoofd', 'Pairing zonder drama', 'Prijs die klopt'],
    minus: ['Mic is lobby-niveau', 'EQ-app is een extra huiswerkblad'],
    related: [{ collection: 'news', slug: 'xbox-id-handheld-vragen' }],
    seo: {
      title: 'Hardware: Xbox Wireless Headset — 7.4 Oké instap',
      description: 'Korte hardware-review van de Xbox Wireless Headset voor party chat en singleplayer.',
    },
    body: [
      'Voor party chat en singleplayer-scores is dit headset in orde. Voor streams en “even een collab opnemen” pak ik iets anders. De microfoon klinkt als een lobby, niet als een desk.',
      'Pairing met Xbox is het verkoopargument. PC via dongle werkt. Telefoon is een bijzaak.',
      '7.4: koop hem in de bundle, niet als endgame-audio.',
    ],
  },
]
