import type { LongformArticle } from '@/types/content'

export const features: LongformArticle[] = [
  {
    slug: 'turn-based-is-niet-dood',
    title: 'Turn-based is niet dood — het was alleen onzichtbaar',
    excerpt:
      'Van JRPG-shame naar parry-vensters. Waarom Expedition 33 geen uitzondering is maar een correctie.',
    author: 'Sem Harms',
    publishedAt: '2026-08-30',
    tags: ['RPG', 'Design', 'Opinion'],
    coverLabel: 'TURN',
    related: [
      { collection: 'reviews', slug: 'clair-obscur-expedition-33' },
    ],
    seo: {
      title: 'Feature: turn-based is niet dood',
      description:
        'Achtergrond over de terugkeer van turn-based combat, parries, en waarom ASAPxGaming Expedition 33 als correctie leest.',
    },
    body: [
      'Jarenlang was “turn-based” een waarschuwing in een trailer-comment. Alsof nadenken een bug was. Tegelijkertijd groeide een stille catalogus: indie-tactics, SRPG-revivals, roguelites die ronden verstopten achter neon.',
      'Expedition 33 maakt de ronde weer zichtbaar én fysiek. Dat is de truc: het is niet trager, het is leesbaarder. De parry is geen actie-emulatie, het is een belofte dat jouw aandacht telt.',
      'ASAPxGaming speelt geen nostalgie-kaart. We zeggen: als je combat-feel wilt, hoeft de camera niet altijd achter je rug te hangen. Soms wint de beurt.',
      'De les voor live-service-huizen is ongemakkelijk. Je kunt geen parry-venster A/B-testen in een battle-pass. Je moet het ontwerpen.',
    ],
  },
  {
    slug: 'hype-zonder-build',
    title: 'Hype zonder build is geen journalistiek',
    excerpt:
      'Leaks, calendars, pre-orders. Waarom deze desk weigert de wachtkamer te vullen met andermans JPG.',
    author: 'Sem Harms',
    publishedAt: '2026-08-21',
    tags: ['Industry', 'Opinion'],
    coverLabel: 'HYPE',
    related: [{ collection: 'news', slug: 'gta-vi-wachtkamer' }],
    seo: {
      title: 'Feature: hype zonder build is geen journalistiek',
      description:
        'Waarom ASAPxGaming geen lek-screenshots publiceert en wat dat betekent voor een persoonlijk gamingplatform.',
    },
    body: [
      'Een persoonlijk platform heeft geen newsroom van dertig mensen. Dat is geen excuus om garbage te shovelen. Het is een filter.',
      'Als ik een lek niet kan verifiëren, is het geen nieuws. Het is traffic. ASAPxGaming kiest het eerste, ook als X het tweede beloont.',
      'Wat wél mag: de machine benoemen. Wie verdient aan de wachtkamer? Welke catalogus blijft printen terwijl jij wacht? Dat is industry-verslag, geen rumor-mill.',
    ],
  },
  {
    slug: 'handheld-koorts-essay',
    title: 'De trein is geen gaming-pc',
    excerpt:
      'Waarom handheld-marketing AAA belooft en indies de échte use-case blijven.',
    author: 'Sem Harms',
    publishedAt: '2026-08-01',
    tags: ['Hardware', 'PC', 'Opinion'],
    coverLabel: 'TREIN',
    related: [
      { collection: 'news', slug: 'handheld-pc-koorts' },
      { collection: 'news', slug: 'steam-deck-oled-dagelijks' },
    ],
    seo: {
      title: 'Feature: de trein is geen gaming-pc',
      description:
        'Essay over handheld-pc’s, thermals, en waarom ASAPxGaming AAA-in-je-broekzak als marketing leest.',
    },
    body: [
      'Ik hou van een Deck in de tas. Ik hou er niet van als een fabrikant doet alsof Cyberpunk in een rugleuning hetzelfde is als Cyberpunk op een desktop.',
      'De eerlijke pitch is: indies, emulation, korte runs, cloud als noodverband. Alles daarboven is een demo voor het vliegtuig-wifi-publiek.',
      'Koop de machine voor het leven dat je hebt. Niet voor de slide in een keynote.',
    ],
  },
  {
    slug: 'waarom-ik-offline-brackets-mis',
    title: 'Waarom ik offline brackets mis',
    excerpt:
      'Twitch is handig. Een zaal met freeze-frames is eerlijker. Een column over LAN-lucht.',
    author: 'Sem Harms',
    publishedAt: '2026-09-06',
    tags: ['Esports', 'NL', 'Opinion'],
    coverLabel: 'LAN',
    related: [{ collection: 'news', slug: 'benelux-esports-herfst' }],
    seo: {
      title: 'Column: waarom ik offline brackets mis',
      description: 'Persoonlijke column van Sem Harms over LAN’s in de Benelux versus Twitch-only esports.',
    },
    body: [
      'Online brackets zijn schoon. Offline brackets liegen minder over netcode, tilt en of iemand écht durft te dashen.',
      'Ik mis de gang. Niet de LED-wand. De gang, waar je een set naspeelt met iemand die je vijf minuten geleden nog haatte.',
      'Ga deze herfst naar één LAN. Eén. Daarna mag je weer chatten in 1080p.',
    ],
  },
]
