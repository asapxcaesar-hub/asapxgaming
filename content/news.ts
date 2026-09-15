import type { NewsArticle } from '@/types/content'

export const news: NewsArticle[] = [
  {
    slug: 'wolverine-ps5-launch',
    title: 'Wolverine is uit op PS5 — wij geven 7.7, geen 9',
    excerpt:
      '15 september 2026, Insomniac, alleen PlayStation 5. Combat tillen, lineariteit zakken. Dat is onze launch-review, geen rondje aggregaat-kopiëren.',
    author: 'Kay van Elsen',
    publishedAt: '2026-09-15',
    category: 'PlayStation',
    tags: ['PlayStation', 'Marvel', 'Release'],
    coverLabel: 'WOLV',
    gameSlug: 'wolverine-marvel',
    related: [{ collection: 'reviews', slug: 'wolverine-marvel' }],
    seo: {
      title: 'Marvel’s Wolverine is uit: ASAPxGaming 7.7',
      description:
        'Launch 15 september 2026 op PS5. Officiële datum, eigen review 7.7 bij de publieke consensus.',
    },
    body: [
      'Marvel’s Wolverine van Insomniac is vanaf vandaag speelbaar op PlayStation 5. Prijs in de EU-store: in de buurt van €80 voor de standaardeditie, zoals Sony in juni bij de pre-order zette. Geen pc, geen Xbox, geen early-access-weekend. Dat zijn feiten van de uitgever, geen forum-dump.',
      'De embargo-golf van vorige week landde bij aggregaten rond de 7.7–7.9. Spelers op de PlayStation Store mogen harder juichen; dat is hun stoel. Onze stoel: 7.7 Hit. Klauwen en stemwerk tillen. Vijandenvariatie en een plot die zijn eigen premisse undersellt, zakken. De volledige uitsplitsing staat in de review.',
      'Volgende grote datum op deze kalender: Grand Theft Auto VI op 19 november, PS5 en Xbox Series, volgens Rockstar en Take-Two. Tot die tijd speel je iets dat uit is — of je slacht Logan, met de kanttekeningen erbij.',
    ],
  },
  {
    slug: 'steam-nazomer-sale-picks',
    title: 'Steam in september: drie koopjes, twee harde nee’s',
    excerpt:
      'Geen wishlist-dump. Wel wat Kay deze week in de bibliotheek duwde — en welke bak je laat staan, ook met −75%.',
    author: 'Kay van Elsen',
    publishedAt: '2026-09-11',
    category: 'PC',
    tags: ['PC', 'Deals', 'Steam'],
    coverLabel: 'SALE',
    gameSlug: 'clair-obscur-expedition-33',
    related: [{ collection: 'reviews', slug: 'clair-obscur-expedition-33' }],
    seo: {
      title: 'Steam september: drie koopjes, twee harde nee’s',
      description:
        'ASAPxGaming-koopadvies voor de Steam-kortingen: Expedition 33, Silksong, Split Fiction, handheld-checks.',
    },
    body: [
      'Steam heeft altijd wel ergens een “seasonal”. Deze week is het weer een etalage van min-symbolen op titels die je vorig jaar al had. Deze desk filtert op wat je nú kunt starten zonder een wiki-tab, en op wat een handheld-port nog steeds als thermische grap behandelt.',
      'Drie ja’s, kort: Expedition 33 (9.0) als je turn-based met parry aandurft. Silksong (8.9) als je een avond mag verliezen. Pragmata (8.5, uit april) als je Capcoms maan-IP nog niet speelde. Split Fiction alleen mét een duo. Geen pre-order-geloof, geen lek-JPG.',
      'Twee nee’s: de zoveelste open-world survival-craft in de aanbieding, en AAA-ports die op Deck/Ally “playable” staan zolang je medium, 30 fps en een ventilator accepteert. Check de verified-lijst. Koop geen korting die je in de trein niet kunt uitspelen.',
    ],
  },
  {
    slug: 'benelux-esports-herfst',
    title: 'Herfst in de Benelux: één LAN is meer waard dan tien VODs',
    excerpt:
      'De living-room-scene is niet dood. Ze zat achter latency. Waar je naartoe kunt zonder een festival-LED als bewijs.',
    author: 'Kay van Elsen',
    publishedAt: '2026-09-05',
    category: 'Industry',
    tags: ['Esports', 'NL', 'Industry'],
    coverLabel: 'LAN',
    related: [{ collection: 'news', slug: 'waarom-ik-offline-brackets-mis' }],
    seo: {
      title: 'Benelux-herfst: LAN’s boven Twitch-only esports',
      description:
        'ASAPxGaming over offline brackets in Nederland en België deze herfst — Smash, fighters, lokale cups.',
    },
    body: [
      'Online brackets zijn schoon. Offline brackets liegen minder over netcode, tilt, en of iemand écht durft te dashen. In de Benelux is de herfst traditioneel het seizoen waarin sporthallen, campus-zalen en een enkele conventie weer een setup-rij durven neerzetten — van Valorant-mixcups tot Smash- en fighting-brackets die geen persbericht nodig hebben.',
      'Mijn filter is saai en bruikbaar: kijk of er een TO is die je kent, of de setup-tijd realistisch is, en of de buy-in naar de spelers gaat in plaats van naar een LED-wand. DreamHack-achtige hallen zijn prima als je de crowd wilt. De betere set speel je vaak in een zaal waar de caster naast de setup staat.',
      'Kaarten: vroeg. De laatste edities die ik bijhield, waren vol terwijl Discord nog “wie gaat er?” zat te spammen. Eén weekend is genoeg. Daarna mag je weer 1080p chatten.',
    ],
  },
  {
    slug: 'gta-vi-wachtkamer',
    title: 'GTA VI staat op 19 november — de wachtkamer blijft het product',
    excerpt:
      'Take-Two en Rockstar zetten de datum op 19 november 2026, PS5 en Xbox Series. Lek-JPG’s behandelen we nog steeds niet als nieuws.',
    author: 'Kay van Elsen',
    publishedAt: '2026-08-20',
    category: 'Industry',
    tags: ['Industry', 'GTA', 'PlayStation'],
    coverLabel: 'GTA',
    gameSlug: 'grand-theft-auto-vi',
    related: [{ collection: 'news', slug: 'hype-zonder-build' }],
    seo: {
      title: 'GTA VI: 19 november 2026, geen lek-screenshots',
      description:
        'Officiële GTA VI-datum (PS5, Xbox Series) en waarom ASAPxGaming de wachtkamer niet vult met leaks.',
    },
    body: [
      'Grand Theft Auto VI heeft een datum die van Rockstar en Take-Two zelf komt: 19 november 2026, PlayStation 5 en Xbox Series. Dat is nieuws. Fan-renders, “inside source”-screenshots en een Discord-crop van een dashboard zijn dat niet. Deze desk publiceert het eerste. Het tweede is traffic.',
      'De wachtkamer is inmiddels een seizoen. GTA Online blijft draaien terwijl de kalender tikt; dat is de context van elke “wanneer”-vraag, niet een lek. Pre-orders en prijs volgen wanneer de uitgever ze zelf neerzet. Tot die tijd is het advies saai: speel iets dat uit is.',
      'Als Rockstar zelf gameplay drop — officieel, met hun logo erop — zijn we er. Niet eerder, en niet met iemands JPG uit een forum-dump.',
    ],
  },
  {
    slug: 'handheld-pc-koorts',
    title: 'Handhelds in 2026: de catalogus groeit, de TDP liegt nog',
    excerpt:
      'Deck OLED, Windows-pockets, ROG Xbox Ally. Meer schermen. Dezelfde keuze: indies of een ventilator in de coupé.',
    author: 'Kay van Elsen',
    publishedAt: '2026-07-30',
    category: 'PC',
    tags: ['Hardware', 'PC'],
    coverLabel: 'HAND',
    related: [
      { collection: 'news', slug: 'steam-deck-oled-dagelijks' },
      { collection: 'news', slug: 'handheld-koorts-essay' },
    ],
    seo: {
      title: 'Handheld-pc’s 2026: Deck, Ally, Xbox — dezelfde bottlenecks',
      description:
        'ASAPxGaming over Steam Deck OLED, Windows-handhelds en de ROG Xbox Ally: thermals, drivers, verified-lijsten.',
    },
    body: [
      'De pocket-pc is geen experiment meer. Valve’s Deck OLED is de Linux-referentie, Windows-handhelds van ASUS en Lenovo vullen de schappen, en de ROG Xbox Ally (oktober 2025) plakte er een Xbox-schil en Game Pass-praatje op. De chip-generaties schuiven. De natuurkunde niet: 7 inch, TDP, en een ventilator die de coupérust gijzelt.',
      'Koopargumenten die ik wél accepteer: Steam-verified indies, emulatie, korte runs, cloud als noodverband. Koopargumenten die ik niet accepteer: een trailer op 120 Hz. AAA in 2026 op handheld is vaak medium, 30–40 fps, en een driver-update die een save in de tas sloopt.',
      'Onze regel blijft: kies de winkel waar je al woont (SteamOS versus Microsoft-store), lees de compatibility-lijst, en behandel de pocket niet als desktopvervanger tenzij je van compromissen houdt. Dat mag. Zeg het dan wel hardop.',
    ],
  },
  {
    slug: 'nederlandse-indies-spotlight',
    title: 'NL-indies: speel de demo, skip de subsidie-pitch',
    excerpt:
      'Van NL-VR-huizen tot zolder-builds. Drie types producties die een store-page verdienen zonder patriotisme-korting.',
    author: 'Kay van Elsen',
    publishedAt: '2026-06-18',
    category: 'Indie',
    tags: ['Indie', 'NL'],
    coverLabel: 'NL',
    gameSlug: 'polder-ghost-line',
    related: [{ collection: 'news', slug: 'handheld-pc-koorts' }],
    seo: {
      title: 'Nederlandse indie-games: demo’s boven patriotisme',
      description:
        'ASAPxGaming over NL- en Benelux-indies: Vertigo, kleine pc-builds, en de Polder Ghost Line-demo.',
    },
    body: [
      'Nederlandse games worden in praatjes óf “schattig” óf “Horizon-buren”. Beide zijn lui. Guerrilla en Nixxes zijn AAA-adressen. Vertigo Games bewees dat VR-horror hier commercieel kan. Daaronder zit een laag pc- en Switch-builds die geen influencer-regen krijgt en wél een Demo-knop op Steam heeft. Die laag is het gesprek.',
      'Drie types die ik deze zomer aanzette: een tactische run die geen live-service-pas nodig heeft, co-op puzzels die twee spelers respecteren zonder Hazelight te kopiëren, en fiets-horror door de mist — Polder Ghost Line van Fietslamp Studio, een demo die ik tot de polder-dijk speelde. Full release staat bij ons op de kalender rond Halloween 2026. Geen review tot de build af is.',
      'Steam-tags liegen. Subsidie-copy ook. Speel de demo. Als de feel klopt, wishlist. Als de feel een PowerPoint is, geen patriotisme-korting.',
    ],
  },
  {
    slug: 'mario-kart-world-online-seizoen',
    title: 'Mario Kart World: een jaar later wint de lobby, niet Free Roam',
    excerpt:
      'Cups zijn uitgespeeld. Knockout Tour en 24-speleronline houden het feest gaande. De open wereld blijft een omweg.',
    author: 'Kay van Elsen',
    publishedAt: '2026-09-02',
    category: 'Nintendo',
    tags: ['Nintendo', 'Mario Kart'],
    coverLabel: 'MKW',
    gameSlug: 'mario-kart-world',
    related: [{ collection: 'reviews', slug: 'mario-kart-world' }],
    seo: {
      title: 'Mario Kart World online: Knockout Tour boven Free Roam',
      description:
        'ASAPxGaming, najaar 2026: hoe Mario Kart World op Switch 2 overleeft na de cups.',
    },
    body: [
      'Mario Kart World is sinds 5 juni 2025 de Switch 2-kart. De singleplayer-cups droogden uit zoals elke Kart. Wat overblijft: 24-spelerlobbies, Knockout Tour, en een Free Roam die Nintendo als continent verkocht en die de meeste avonden als omweg eindigt.',
      'Nintendo blijft seizoenen en rotaties duwen. Dat houdt de lobby voller dan het Grand Prix-menu. Rubberbanding is nog steeds de baas — identiteit, geen nieuws. Wie tight racing wil, speelt iets anders. Wie de bank wilt laten winnen, blijft hier.',
      'Onze review (8.4) is niet verouderd: Knockout Tour was toen al de mode die de hardware gebruikt. Een jaar later is dat alleen duidelijker. Koop hem voor de lobby, niet voor stickers in het gras.',
    ],
  },
  {
    slug: 'xbox-id-handheld-vragen',
    title: 'ROG Xbox Ally: de schil is Xbox, de bottleneck is Windows',
    excerpt:
      'Sinds oktober 2025 kun je Game Pass in je tas stoppen. Thermals, compatibility-labels en de store op 7 inch zijn het huiswerk dat overblijft.',
    author: 'Kay van Elsen',
    publishedAt: '2026-08-08',
    category: 'Xbox',
    tags: ['Xbox', 'Hardware', 'Industry'],
    coverLabel: 'XBX',
    related: [{ collection: 'news', slug: 'handheld-pc-koorts' }],
    seo: {
      title: 'ROG Xbox Ally in 2026: Game Pass in je tas, Windows-tax in je palm',
      description:
        'ASAPxGaming over de ROG Xbox Ally na launch: compatibility-programma, TDP, wanneer de Deck wint.',
    },
    body: [
      'ASUS en Xbox shippingen de ROG Xbox Ally en Ally X op 16 oktober 2025: Windows, een Xbox-fullscreen-schil, Play Anywhere, cloud, en in veel regio’s drie maanden Game Pass aan de doos. Op papier is dat de logische pocket: catalogus plus controller-dna. In de palm is het nog steeds een Windows-handheld met TDP-keuzes.',
      'Microsoft’s Handheld Compatibility-programma is het enige verkoopargument dat ik serieus neem — labels slaan op “werkt dit op 7 inch”, niet op een keynote. Wat ik na maanden gebruik nog steeds wil zien: eerlijke frametimes op AAA uit Game Pass, slaap/resume dat een treinrit overleeft, en een store die niet voelt als een desktop-ui in je duim.',
      'Tot die lijst jouw bibliotheek dekt: de Deck OLED blijft de referentie als je in Steam woont. De Ally is de referentie als je al in Game Pass en Windows woont. Koop geen vapor, koop de winkel.',
    ],
  },
  {
    slug: 'playstation-plus-extra-september',
    title: 'PS Plus Extra in september: catalogus is geen cadeau',
    excerpt:
      'Extra is nuttig als je de backlog snoeit. Deze maand voelt als magazijn. Death Stranding 2 blijft een slimmere avond.',
    author: 'Kay van Elsen',
    publishedAt: '2026-09-01',
    category: 'PlayStation',
    tags: ['PlayStation', 'Plus'],
    coverLabel: 'PS+',
    gameSlug: 'death-stranding-2',
    related: [{ collection: 'reviews', slug: 'death-stranding-2' }],
    seo: {
      title: 'PlayStation Plus Extra september: skippen mag',
      description:
        'ASAPxGaming over PS Plus Extra: wanneer de maandelijkse drop de moeite is — en wanneer DS2 wint.',
    },
    body: [
      'PlayStation Plus Extra is een catalogus, geen verjaardag. Sony wisselt maandelijks namen in en uit; de waarde zit in wat je nog niet hebt uitgespeeld, niet in het persbericht. September 2026 voelt als een opruiming: bekende covers, weinig urgentie voor wie de store al een jaar volgt.',
      'Pak de drop als er een titel in zit die je bewust hebt laten liggen. Neem geen extra terabyte “omdat het Plus is”. Dat is hoe catalogi schijfruimte gijzelen.',
      'Op deze desk wint Death Stranding 2 (onze 8.7) het van een middelmatige Extra-maand: één game uitspelen is een beter seizoen dan drie covers downloaden die je in de map Games laat staan.',
    ],
  },
]
