export type Review = {
  slug: string
  title: string
  game: string
  platforms: string[]
  genre: string
  score: number
  verdict: string
  excerpt: string
  author: string
  publishedAt: string
  coverLabel: string
  body: string[]
  plus: string[]
  minus: string[]
}

export const reviews: Review[] = [
  {
    slug: 'clair-obscur-expedition-33',
    title: 'Expedition 33 is een turn-based knockout',
    game: 'Clair Obscur: Expedition 33',
    platforms: ['PC', 'PS5', 'Xbox'],
    genre: 'RPG',
    score: 9.2,
    verdict: 'Must-play',
    excerpt:
      'Een Franse RPG die parries, paint en pathos tot één run smeedt. Wij gingen tot expeditie-einde — en wilden meteen ng+.',
    author: 'Noor Veldkamp',
    publishedAt: '2026-08-28',
    coverLabel: 'EXP 33',
    plus: ['Combat die écht klikt', 'Kunstrichting zonder filter', 'Party die je mist als ze zwijgen'],
    minus: ['Laat-game grind piekt', 'Sommige sidequests voelen als extra canvas'],
    body: [
      'Turn-based is dood, zeiden ze. Expedition 33 zet daar een penseelstreek tegenin: elke ronde is een duel, elke parry een statement. Je plant niet alleen skills, je danst op de timing van een boss die zich als schilderij opent.',
      'Het verhaal blijft Frans-melancholisch zonder in zelfspot te verzuipen. Lumière voelt als een stad die weet dat de klok tikt, en de expeditie is geen heldentocht maar een wanhoopsdaad met stijl. Dat is zeldzaam in 2026: een JRPG-achtige structuur die Europees durft te zijn.',
      'Technisch is de pc-build strak. Framepacing houdt stand bij spektakelscènes, en de soundtrack gooit orkest tegen synth alsof het de meta is. Wij gaven hem een 9.2 omdat de dip in het derde akt wel bestaat — maar nooit de wil om door te duwen.',
    ],
  },
  {
    slug: 'hollow-knight-silksong',
    title: 'Silksong straft, beloont, en laat je niet los',
    game: 'Hollow Knight: Silksong',
    platforms: ['PC', 'Switch', 'PS5', 'Xbox'],
    genre: 'Metroidvania',
    score: 9.4,
    verdict: 'Must-play',
    excerpt:
      'Hornet is geen Hollow Knight-kloon. Ze is sneller, gemeener, en Pharloom eist dat je je oude muscle memory overboord gooit.',
    author: 'Kai Mensah',
    publishedAt: '2026-07-12',
    coverLabel: 'SILK',
    plus: ['Movement als verslaving', 'Bossfights met karakter', 'Kaart die blijft verrassen'],
    minus: ['Difficulty-spikes zonder waarschuwing', 'Sommige runs voelen onnodig lang'],
    body: [
      'Wie Silksong als DLC in een groter jasje verwacht, botst meteen. Hornet beweegt als een naald: scherp, kort, onverbiddelijk. De pogo is anders, de resources zijn anders, en Pharloom laat je merken dat Hallownest een tutorial was.',
      'De wereldontwerp-loop is Team Cherry op z’n best: een shortcut voelt als een cheatcode die je zelf hebt verdiend. We stierven. Vaak. Maar bijna nooit oneerlijk — behalve bij twee late arenas die net te lang dezelfde fout straffen.',
      'Voor wie de wait heeft overleefd: ja, het is het waard. Niet omdat het “eindelijk uit is”, maar omdat de game durft om gemeen te zijn zonder cynisch te worden.',
    ],
  },
  {
    slug: 'death-stranding-2',
    title: 'Death Stranding 2: meer wegen, minder eenzaamheid',
    game: 'Death Stranding 2: On the Beach',
    platforms: ['PS5', 'PC'],
    genre: 'Action',
    score: 8.6,
    verdict: 'Koop hem',
    excerpt:
      'Kojima verdubbelt de connecting-fantasy. De deliveries blijven zen, de setpieces knallen harder, en de lore is nóg dikker.',
    author: 'Sanne de Groot',
    publishedAt: '2026-06-04',
    coverLabel: 'DS2',
    plus: ['Setpieces met blockbuster-gewicht', 'Traversal voelt rijper', 'Co-op ghosts die ertoe doen'],
    minus: ['Uitleg-lawine in akt 1', 'Sommige menu’s zijn nog steeds een labyrint'],
    body: [
      'Als je DS1 haatte omdat het “lopen-simulator” was, verandert DS2 je waarschijnlijk niet. Als je die loop wél voelde, is dit de versie waarin het netwerk écht als beschaving groeit. Elke ladder van een ander is nog steeds een high-five over tijd heen.',
      'Combat is minder optioneel. Dat is een plus voor spektakel, een min voor de meditatie. Wij misten soms de stille tocht door de regen, maar de nieuwe routes en voertuigen maken de kaart minder tot een straf.',
      'Kojima blijft Kojima: namen, cameo’s, cutscenes die een koffiepauze eisen. Score 8.6 omdat de pieken hoger zijn dan deel één, terwijl de bloat ook meegroeit.',
    ],
  },
  {
    slug: 'split-fiction',
    title: 'Split Fiction is co-op zonder compromis',
    game: 'Split Fiction',
    platforms: ['PC', 'PS5', 'Xbox'],
    genre: 'Co-op avontuur',
    score: 8.8,
    verdict: 'Koop hem',
    excerpt:
      'Hazelight bewijst opnieuw dat twee controllers slimmer zijn dan één open wereld. Sci-fi versus fantasy, en jullie moeten elkaar zien.',
    author: 'Noor Veldkamp',
    publishedAt: '2026-03-19',
    coverLabel: 'SPLIT',
    plus: ['Leveldesign dat twee breinen eist', 'Toon die nooit cringe wordt', 'Replaywaarde in de gags'],
    minus: ['Solo-modus blijft een noodverband', 'Sommige chapters pieken te vroeg'],
    body: [
      'It Takes Two was de drop. Split Fiction is de double kill: twee genres in één hoofd, letterlijk. De beste momenten zijn geen cutscenes maar silent agreements — jij springt, ik cover, niemand legt het uit.',
      'Technisch blijft Hazelight vies strak. Camera’s liegen zelden, fails zijn grappig in plaats van giftig, en de split-screen-leesbaarheid is beter dan bij de meeste live-service shooters.',
      'Alleen kopen als je een vaste duo hebt. Dat is geen zwakte, dat is de pitch. ASAPxGaming speelde hem couch én online: beide werken, couch wint.',
    ],
  },
  {
    slug: 'mario-kart-world',
    title: 'Mario Kart World is maximaal chaos, minimaal focus',
    game: 'Mario Kart World',
    platforms: ['Switch'],
    genre: 'Racing',
    score: 8.1,
    verdict: 'Hit',
    excerpt:
      'Nintendo gooit de cup open: open routes, nieuwe items, oude tilt. Feest op de bank, minder scherp als pure racer.',
    author: 'Lars Hoekstra',
    publishedAt: '2026-01-22',
    coverLabel: 'MKW',
    plus: ['Partysfeer onmiddellijk', 'Nieuwe track-taal', 'Online dat voller voelt'],
    minus: ['Rubberbanding blijft tilt-baas', 'Singleplayer droogt uit na de cups'],
    body: [
      'World belooft een kart-continent en levert vooral een speeltuin. Tussen de klassieke cups door slinger je over verbindingswegen die soms geniaal zijn en soms voelen als loading with scenery.',
      'Items blijven Nintendo-chaos. Dat is de identiteit, geen bug — maar in ranked-achtige lobbies blijft een blue shell een conversatie-ender. Wie tight racing wil, speelt nog steeds iets anders.',
      'Als launch-title doet hij wat hij moet doen: de woonkamer vullen. Score 8.1: hoog feestcijfer, geen sim-cijfer. En dat is oké, zolang je de pitch gelooft.',
    ],
  },
]

export function getReview(slug: string) {
  return reviews.find((review) => review.slug === slug)
}
