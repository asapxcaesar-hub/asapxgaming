import type { LongformArticle } from '@/types/content'

export const features: LongformArticle[] = [
  {
    slug: 'turn-based-is-niet-dood',
    title: 'Turn-based was nooit weg. Het durfde alleen geen parry',
    excerpt:
      'Expedition 33 (9.0 bij ons) maakt de beurt weer zichtbaar. Dat is geen revival-hype, dat is ontwerp dat je niet in een battle-pass A/B-test.',
    author: 'Kay van Elsen',
    publishedAt: '2026-08-30',
    tags: ['RPG', 'Design', 'Opinion'],
    coverLabel: 'TURN',
    related: [{ collection: 'reviews', slug: 'clair-obscur-expedition-33' }],
    seo: {
      title: 'Column: turn-based was nooit weg',
      description:
        'ASAPxGaming over beurten, parries en waarom Expedition 33 een correctie is, geen toevalstreffer.',
    },
    body: [
      'Jarenlang was “turn-based” een waarschuwing onder een trailer, alsof nadenken een bug was. Ondertussen groeide een stille catalogus: indie-tactics, SRPG-revivals, roguelites die ronden verstopten achter neon. Dat was geen dood genre. Dat was een genre dat de keynote niet haalde.',
      'Clair Obscur: Expedition 33 (24 april 2025, Sandfall) maakt de ronde weer fysiek. De parry is geen actie-emulatie; het is de belofte dat jouw aandacht telt. 9.0 van deze desk, met de kanttekening dat diezelfde parry in akt 3 te veel van de build-diepte opeet.',
      'De les voor live-service-huizen is ongemakkelijk. Je kunt een parry-window niet A/B-testen in een seizoenspas. Je moet hem ontwerpen. Als je combat-feel wilt, hoeft de camera niet altijd achter je rug. Soms wint de beurt.',
    ],
  },
  {
    slug: 'hype-zonder-build',
    title: 'Hype zonder build is geen journalistiek — ook niet in GTA-maand',
    excerpt:
      '19 november staat GTA VI op de kalender van Rockstar zelf. Tot die tijd geen lek-screenshots op deze desk. Wolverine mocht wél: die is uit.',
    author: 'Kay van Elsen',
    publishedAt: '2026-08-21',
    tags: ['Industry', 'Opinion'],
    coverLabel: 'HYPE',
    related: [{ collection: 'news', slug: 'gta-vi-wachtkamer' }],
    seo: {
      title: 'Column: hype zonder build is geen journalistiek',
      description:
        'Waarom ASAPxGaming geen lek-JPG’s publiceert, wel officiële data (GTA VI 19 nov) en eigen reviews (Wolverine 7.7).',
    },
    body: [
      'Een persoonlijk platform heeft geen newsroom van dertig mensen. Dat is geen excuus om garbage te shovelen. Het is een filter: als ik een lek niet kan verifiëren, is het geen nieuws. Het is traffic. X beloont het tweede. Wij kiezen het eerste.',
      'Grand Theft Auto VI heeft een datum van Take-Two en Rockstar: 19 november 2026, PS5 en Xbox Series. Dat mag op de kalender. Fan-renders, dashboard-crops en “inside source”-stills mogen de prullenbak in. Marvel’s Wolverine daarentegen is 15 september 2026 uit — store, disc, speelbaar. Daar hoort een eigen oordeel bij: 7.7.',
      'Wat wél mag zonder build: de machine benoemen. Wie verdient aan de wachtkamer? Welke catalogus (GTA Online) blijft printen terwijl jij wacht? Dat is industry-verslag. Dat is geen rumor-mill.',
    ],
  },
  {
    slug: 'handheld-koorts-essay',
    title: 'De trein is geen gaming-pc — ook niet met een Xbox-schil',
    excerpt:
      'Deck OLED blijft de Steam-referentie. ROG Xbox Ally (oktober 2025) is Windows in je palm. Koop de winkel, niet de 120 Hz-slide.',
    author: 'Kay van Elsen',
    publishedAt: '2026-08-01',
    tags: ['Hardware', 'PC', 'Opinion'],
    coverLabel: 'TREIN',
    related: [
      { collection: 'news', slug: 'handheld-pc-koorts' },
      { collection: 'news', slug: 'steam-deck-oled-dagelijks' },
    ],
    seo: {
      title: 'Column: de trein is geen gaming-pc',
      description:
        'Handhelds in 2026: Steam Deck OLED versus ROG Xbox Ally. Indies en TDP, geen keynote.',
    },
    body: [
      'Ik hou van een Deck in de tas. Ik hou er niet van als een fabrikant doet alsof Cyberpunk in een rugleuning hetzelfde is als Cyberpunk op een desktop. De ROG Xbox Ally (16 oktober 2025, ASUS + Xbox) plakte er Game Pass op. De TDP bleef TDP.',
      'De eerlijke pitch in 2026: indies, emulatie, korte runs, cloud als noodverband. Compatibility-labels (Valve, Microsoft) zijn het enige verkoopargument dat ik serieus neem. Alles daarboven is een demo voor het vliegtuig-wifi-publiek.',
      'Koop de machine voor het leven dat je hebt. SteamOS als je in Steam woont. Windows-pocket als je al in Game Pass woont. Niet voor de slide in een keynote.',
    ],
  },
  {
    slug: 'waarom-ik-offline-brackets-mis',
    title: 'Waarom ik offline brackets mis — herfst 2026',
    excerpt:
      'Twitch is handig. Een zaal met freeze-frames liegt minder over netcode. Eén LAN deze herfst is genoeg.',
    author: 'Kay van Elsen',
    publishedAt: '2026-09-06',
    tags: ['Esports', 'NL', 'Opinion'],
    coverLabel: 'LAN',
    related: [{ collection: 'news', slug: 'benelux-esports-herfst' }],
    seo: {
      title: 'Column: offline brackets in de Benelux-herfst',
      description: 'Kay van Elsen over LAN’s versus Twitch-only esports, september 2026.',
    },
    body: [
      'Online brackets zijn schoon. Offline brackets liegen minder over netcode, tilt, en of iemand écht durft te dashen. De Benelux-herfst zet weer zalen open: mixcups, Smash, fighters, een enkele conventie-hal. Kijk naar de TO die je kent, niet naar een LED-wand.',
      'Ik mis de gang. Niet de LED-wand. De gang, waar je een set naspeelt met iemand die je vijf minuten geleden nog haatte.',
      'Ga deze herfst naar één LAN. Eén. Daarna mag je weer chatten in 1080p.',
    ],
  },
]
