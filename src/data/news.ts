export type NewsItem = {
  slug: string
  title: string
  kicker: string
  excerpt: string
  author: string
  publishedAt: string
  tags: string[]
  body: string[]
}

export const news: NewsItem[] = [
  {
    slug: 'steam-nazomer-sale-picks',
    title: 'Steam-nazomer: vijf drops die wél de moeite zijn',
    kicker: 'Deals',
    excerpt:
      'Niet de wishlist-dump, wel de titels die we zelf in de bibliotheek duwden. Inclusief wat je kunt overslaan.',
    author: 'Kai Mensah',
    publishedAt: '2026-09-11',
    tags: ['PC', 'Deals'],
    body: [
      'De nazomer-sale op Steam is weer een vuurwerkshow van -75% op dingen die je vorig jaar al had. ASAPxGaming filtert op titels die je nu nog kunt starten zonder een wiki-tab te openen.',
      'Onze shortlist: Expedition 33 als je turn-based durft, Silksong als je straf wilt eten, en Split Fiction als je een duo hebt. De “open world survival craft”-bak laten we links liggen — tenzij je écht nog één tree-chopper nodig hebt.',
      'Tip van de redactie: check de deck-verificatie voordat je een handheld-koop doet. Te veel 2024-ports gedragen zich in 2026 nog steeds als thermische grap.',
    ],
  },
  {
    slug: 'benelux-esports-herfst',
    title: 'Benelux-herfst: LAN’s die ertoe doen',
    kicker: 'Esports',
    excerpt:
      'Van Valorant tot Rocket League: waar je naartoe moet als je de scene live wilt ruiken, niet alleen op Twitch.',
    author: 'Sanne de Groot',
    publishedAt: '2026-09-05',
    tags: ['Esports', 'NL'],
    body: [
      'De Nederlandse living-room-scene is nooit verdwenen, ze zat alleen achter een latency-smokescreen. Deze herfst staan er weer LANs op de kalender waar je de casters kunt aankijken.',
      'Kijk verder dan alleen de “grote” titels. De lokale Smash- en fighting-brackets zijn vaak beter georganiseerd dan de mix-cups die een sponsorlogo op een LED-wand plakken en het een festival noemen.',
      'Kaarten: koop ze vroeg. De laatste twee edities waren uitverkocht terwijl Discord nog “wie gaat er?” zat te spammen.',
    ],
  },
  {
    slug: 'gta-vi-wachtkamer',
    title: 'GTA VI: de wachtkamer is het product',
    kicker: 'Industry',
    excerpt:
      'Elke lek is content, elke delay is een seizoen. Wij kijken naar wat Rockstar wél controleert: de hype-cyclus.',
    author: 'Lars Hoekstra',
    publishedAt: '2026-08-20',
    tags: ['Industry', 'GTA'],
    body: [
      'GTA VI is geen game meer in het publieke gesprek, het is een kalender. ASAPxGaming weigert screenshots van twijfelachtige leaks als nieuws te behandelen. Wat wél telt: hoe publishers de aandacht vasthouden zonder te shippen.',
      'Voor spelers is het advies saai en correct: speel iets dat uit is. De wachtkamer verdient geen pre-order-religie. Als de eerste gameplay-drop van Rockstar zelf komt, zijn we er — niet eerder met fan-renders.',
      'Ondertussen blijft GTA Online geld printen. Dat is de échte context van elke “wanneer”-vraag.',
    ],
  },
  {
    slug: 'handheld-pc-koorts',
    title: 'Handheld-koorts: meer schermen, dezelfde bottlenecks',
    kicker: 'Hardware',
    excerpt:
      'Elke maker belooft 120 Hz in je broekzak. Wij keken naar thermals, drivers en of je écht AAA in de trein wilt.',
    author: 'Noor Veldkamp',
    publishedAt: '2026-07-30',
    tags: ['Hardware', 'PC'],
    body: [
      'De handheld-pc is volwassen en tegelijkertijd een circus. Nieuwe chassis, oude GPU-architecturen, en een driver-update die je vacation-save sloopt.',
      'Als je een Steam Deck-opvolger of Windows-handheld overweegt: reken op verified-lijsten, niet op trailers. AAA in 2026 op 7 inch is vaak medium, 30-40 fps, en een ventilator die de coupérust gijzelt.',
      'Onze regel: koop hem voor indies, emulation en “even een run”. Niet als vervanging van je desktop, tenzij je van compromissen houdt — en dat mag.',
    ],
  },
  {
    slug: 'nederlandse-indies-spotlight',
    title: 'Nederlandse indies die harder hitsen dan hun budget',
    kicker: 'Indie',
    excerpt:
      'Drie studio’s, geen subsidie-praatje: wat er écht speelt in Utrecht, Rotterdam en een zolder in Groningen.',
    author: 'Kai Mensah',
    publishedAt: '2026-06-18',
    tags: ['Indie', 'NL'],
    body: [
      'De NL-indiehoek wordt vaak als “schattig” weggezet. Fout. Er zitten designers bij die combat-feel beter snappen dan menig live-service-team met honderd man.',
      'We lichten drie producties uit die dit jaar een store-page verdienden zonder influencer-regen: een tactische roguelite, een fiets-horror door de polder (ja, serieus), en een co-op puzzler die Split Fiction niet kopieert maar wél hetzelfde respect voor twee spelers heeft.',
      'Steam-tags liegen. Speel de demo’s. De beste Nederlandse games van 2026 vragen geen patriotisme, alleen aandacht.',
    ],
  },
]

export function getNews(slug: string) {
  return news.find((item) => item.slug === slug)
}
