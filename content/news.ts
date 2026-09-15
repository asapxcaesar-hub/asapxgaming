import type { NewsArticle } from '@/types/content'

export const news: NewsArticle[] = [
  {
    slug: 'steam-nazomer-sale-picks',
    title: 'Steam-nazomer: vijf drops die wél de moeite zijn',
    excerpt:
      'Niet de wishlist-dump, wel de titels die Sem zelf in de bibliotheek duwde. Inclusief wat je kunt overslaan.',
    author: 'Sem Harms',
    publishedAt: '2026-09-11',
    category: 'PC',
    tags: ['PC', 'Deals', 'Steam'],
    coverLabel: 'SALE',
    related: [
      { collection: 'reviews', slug: 'clair-obscur-expedition-33' },
      { collection: 'games', slug: 'clair-obscur-expedition-33' },
    ],
    seo: {
      title: 'Steam-nazomer sale: vijf drops die wél de moeite zijn',
      description:
        'ASAPxGaming filtert de Steam-nazomer-sale: wat je nu start, wat je laat liggen, en waar je op let op handheld.',
    },
    body: [
      'De nazomer-sale op Steam is weer een vuurwerkshow van −75% op dingen die je vorig jaar al had. ASAPxGaming filtert op titels die je nu nog kunt starten zonder een wiki-tab te openen.',
      'Shortlist van deze desk: Expedition 33 als je turn-based durft, Silksong als je straf wilt eten, Split Fiction als je een duo hebt. De “open world survival craft”-bak laten we links liggen — tenzij je écht nog één tree-chopper nodig hebt.',
      'Tip: check Deck-verificatie voordat je een handheld-koop doet. Te veel 2024-ports gedragen zich in 2026 nog steeds als thermische grap. Dat is geen hate, dat is een ventilator in een stille coupé.',
    ],
  },
  {
    slug: 'benelux-esports-herfst',
    title: 'Benelux-herfst: LAN’s die ertoe doen',
    excerpt:
      'Van Valorant tot Rocket League: waar je naartoe moet als je de scene live wilt ruiken, niet alleen op Twitch.',
    author: 'Sem Harms',
    publishedAt: '2026-09-05',
    category: 'Industry',
    tags: ['Esports', 'NL', 'Industry'],
    coverLabel: 'LAN',
    related: [{ collection: 'features', slug: 'waarom-ik-offline-brackets-mis' }],
    seo: {
      title: 'Benelux esports-herfst: LAN’s die ertoe doen',
      description:
        'Welke LAN’s in de Benelux deze herfst de moeite waard zijn — en welke mix-cups je kunt laten.',
    },
    body: [
      'De Nederlandse living-room-scene is nooit verdwenen, ze zat alleen achter een latency-smokescreen. Deze herfst staan er weer LANs op de kalender waar je de casters kunt aankijken.',
      'Kijk verder dan alleen de “grote” titels. De lokale Smash- en fighting-brackets zijn vaak beter georganiseerd dan de mix-cups die een sponsorlogo op een LED-wand plakken en het een festival noemen.',
      'Kaarten: koop ze vroeg. De laatste twee edities waren uitverkocht terwijl Discord nog “wie gaat er?” zat te spammen.',
    ],
  },
  {
    slug: 'gta-vi-wachtkamer',
    title: 'GTA VI: de wachtkamer is het product',
    excerpt:
      'Elke lek is content, elke delay is een seizoen. Wij kijken naar wat Rockstar wél controleert: de hype-cyclus.',
    author: 'Sem Harms',
    publishedAt: '2026-08-20',
    category: 'Industry',
    tags: ['Industry', 'GTA', 'PlayStation'],
    coverLabel: 'GTA',
    related: [{ collection: 'features', slug: 'hype-zonder-build' }],
    seo: {
      title: 'GTA VI: de wachtkamer is het product',
      description:
        'Waarom ASAPxGaming geen lek-screenshots als nieuws behandelt, en wat de GTA Online-machine zegt over de wachtkamer.',
    },
    body: [
      'GTA VI is geen game meer in het publieke gesprek, het is een kalender. ASAPxGaming weigert screenshots van twijfelachtige leaks als nieuws te behandelen. Wat wél telt: hoe publishers de aandacht vasthouden zonder te shippen.',
      'Voor spelers is het advies saai en correct: speel iets dat uit is. De wachtkamer verdient geen pre-order-religie. Als de eerste gameplay-drop van Rockstar zelf komt, zijn we er — niet eerder met fan-renders.',
      'Ondertussen blijft GTA Online geld printen. Dat is de échte context van elke “wanneer”-vraag.',
    ],
  },
  {
    slug: 'handheld-pc-koorts',
    title: 'Handheld-koorts: meer schermen, dezelfde bottlenecks',
    excerpt:
      'Elke maker belooft 120 Hz in je broekzak. Wij keken naar thermals, drivers en of je écht AAA in de trein wilt.',
    author: 'Sem Harms',
    publishedAt: '2026-07-30',
    category: 'PC',
    tags: ['Hardware', 'PC'],
    coverLabel: 'HAND',
    related: [
      { collection: 'hardware', slug: 'steam-deck-oled-dagelijks' },
      { collection: 'features', slug: 'handheld-koorts-essay' },
    ],
    seo: {
      title: 'Handheld-pc’s in 2026: meer schermen, dezelfde bottlenecks',
      description:
        'Wat nieuwe handhelds beloven, wat drivers slopen, en wanneer AAA in je broekzak een slecht idee is.',
    },
    body: [
      'De handheld-pc is volwassen en tegelijkertijd een circus. Nieuwe chassis, oude GPU-architecturen, en een driver-update die je vacation-save sloopt.',
      'Als je een Steam Deck-opvolger of Windows-handheld overweegt: reken op verified-lijsten, niet op trailers. AAA in 2026 op 7 inch is vaak medium, 30–40 fps, en een ventilator die de coupérust gijzelt.',
      'Onze regel: koop hem voor indies, emulation en “even een run”. Niet als vervanging van je desktop, tenzij je van compromissen houdt — en dat mag.',
    ],
  },
  {
    slug: 'nederlandse-indies-spotlight',
    title: 'Nederlandse indies die harder hitsen dan hun budget',
    excerpt:
      'Drie studio’s, geen subsidie-praatje: wat er écht speelt in Utrecht, Rotterdam en een zolder in Groningen.',
    author: 'Sem Harms',
    publishedAt: '2026-06-18',
    category: 'Indie',
    tags: ['Indie', 'NL'],
    coverLabel: 'NL',
    related: [{ collection: 'games', slug: 'polder-ghost-line' }],
    seo: {
      title: 'Nederlandse indie-games 2026: harder dan hun budget',
      description:
        'Drie NL-producties die een store-page verdienden zonder influencer-regen — zonder patriotisme-korting.',
    },
    body: [
      'De NL-indiehoek wordt vaak als “schattig” weggezet. Fout. Er zitten designers bij die combat-feel beter snappen dan menig live-service-team met honderd man.',
      'We lichten drie producties uit die dit jaar een store-page verdienden zonder influencer-regen: een tactische roguelite, een fiets-horror door de polder, en een co-op puzzler die Split Fiction niet kopieert maar wél hetzelfde respect voor twee spelers heeft.',
      'Steam-tags liegen. Speel de demo’s. De beste Nederlandse games van 2026 vragen geen patriotisme, alleen aandacht.',
    ],
  },
  {
    slug: 'mario-kart-world-online-seizoen',
    title: 'Mario Kart World: het online-seizoen is de échte cup',
    excerpt:
      'De singleplayer droogt uit. De lobby’s niet. Wat Nintendo deze herfst met ranked-achtige rotaties doet.',
    author: 'Sem Harms',
    publishedAt: '2026-09-02',
    category: 'Nintendo',
    tags: ['Nintendo', 'Mario Kart'],
    coverLabel: 'MKW',
    related: [
      { collection: 'reviews', slug: 'mario-kart-world' },
      { collection: 'games', slug: 'mario-kart-world' },
    ],
    seo: {
      title: 'Mario Kart World online-seizoen: de échte cup',
      description:
        'Hoe Mario Kart World na de cups overleeft: rotaties, tilt, en waarom de bank nog steeds wint.',
    },
    body: [
      'World beloofde een continent. Na de cups blijft een speeltuin over die vooral online leeft. Nieuwe rotaties houden de lobby voller dan de Grand Prix-menu’s.',
      'Rubberbanding is nog steeds de baas. Dat is geen nieuws, dat is de identiteit. Wie tight racing wil, blijft iets anders spelen — en dat mogen we hardop zeggen.',
      'Voor de woonkamer blijft het de sterkste Switch-drop van het jaar. Voor ranked-fantasieën: verwacht chaos, geen sim.',
    ],
  },
  {
    slug: 'xbox-id-handheld-vragen',
    title: 'Xbox-handheld: de vragen die Microsoft niet beantwoordt',
    excerpt:
      'Game Pass in je tas klinkt als een win. Drivers, exclusives en thermals klinken als huiswerk.',
    author: 'Sem Harms',
    publishedAt: '2026-08-08',
    category: 'Xbox',
    tags: ['Xbox', 'Hardware', 'Industry'],
    coverLabel: 'XBX',
    related: [{ collection: 'hardware', slug: 'xbox-wireless-headset' }],
    seo: {
      title: 'Xbox-handheld: vragen die Microsoft open laat',
      description:
        'Wat een Xbox-handheld moet bewijzen voordat Game Pass in je tas een koopargument is.',
    },
    body: [
      'Een Xbox-handheld is logisch op papier: catalogus, cloud, controller-dna. In de praktijk is het dezelfde bottleneck als elke Windows-pocket: thermals en een store die niet voor 7 inch is gebouwd.',
      'ASAPxGaming koopt geen vapor. We willen een verified-lijst, een eerlijke TDP-story en of Game Pass-titels écht speelbaar zijn zonder docking-station.',
      'Tot die drop: de Deck blijft de referentie, niet de trailer.',
    ],
  },
  {
    slug: 'playstation-plus-extra-september',
    title: 'PlayStation Plus Extra: september is geen cadeau-maand',
    excerpt:
      'De lineup is “prima voor wie het al speelde”. Voor wie de catalogus bijhoudt: skippen mag.',
    author: 'Sem Harms',
    publishedAt: '2026-09-01',
    category: 'PlayStation',
    tags: ['PlayStation', 'Plus'],
    coverLabel: 'PS+',
    related: [{ collection: 'reviews', slug: 'death-stranding-2' }],
    seo: {
      title: 'PlayStation Plus Extra september: geen cadeau-maand',
      description:
        'Korte lezing van de september-drop op PS Plus Extra — wat je pakt, wat je laat.',
    },
    body: [
      'Plus Extra is nuttig als je de backlog durft te snoeien. Deze maand voelt als een Magazijn-opruiming: bekende namen, weinig urgentie.',
      'Pak hem als je de titels nog niet hebt uitgespeeld. Koop hem niet “omdat het Plus is”. Dat is hoe catalogs je schijfruimte gijzelen.',
      'Death Stranding 2 blijft relevanter dan deze lineup. Speel dat eerst.',
    ],
  },
]
