# ASAPxGaming

Onafhankelijk Nederlands gamingplatform (nieuws, reviews, releases, features, hardware) van Sem “ASAP” Harms. Next.js 16 App Router, TypeScript, Tailwind, **static export** — hostbaar op de gratis tier van [Wasmer Edge](https://wasmer.io) vanaf GitHub.

Geen accounts, geen database, geen CMS-server. Content ligt in TypeScript-modules (CMS-klaar: zelfde velden, andere loader later).

## Starten

Node 22+.

```bash
npm install
npm run dev
```

Dev-server: [http://127.0.0.1:4629](http://127.0.0.1:4629)

```bash
npm run build   # schrijft naar out/
npm run lint
```

## Stackkeuze

De eerste slice was Vite SPA. Deze build migreert naar **Next.js `output: 'export'`** omdat de spec per pagina SEO eist (canonical, Open Graph, Twitter, Article/Review JSON-LD, sitemap, robots) en HTML per route. Wasmer blijft een static file server (`out/` i.p.v. `dist/`).

## Content beheren

| Map | Wat |
| --- | --- |
| `data/site.ts` | Merk, tagline, creator, **alle social-URL’s**, navigatie |
| `content/news.ts` | Kort nieuws |
| `content/reviews.ts` | Game reviews (scores + secties) |
| `content/features.ts` | Longreads / columns |
| `content/hardware.ts` | Hardware reviews |
| `content/games.ts` | Game-database + release-datums |
| `content/videos.ts` | Watch/Follow-kaarten (linken naar socials) |
| `types/content.ts` | Vormen |
| `lib/content.ts` | Lookups, filters, zoeken |

Voeg een object toe, hergebruik `slug` in `related`. Geen copy-paste in components.

## Beelden

Geen stockfoto’s of nagemaakte nieuwsfoto’s. Covers zijn CSS-placeholders (`CoverPlaceholder`) met een label. Vervang later door echte screenshots in `public/` en een `coverSrc`-veld.

## Branding

Donker palet (CSS variables in `styles/theme.css`): `#08090C`, `#111318`, `#181B22`, `#FFFFFF`, `#9CA3AF`, één accent `#2EE6A6`. Geen tweede merkkleur, geen PU.nl-layout of logo.

## Socials

Gecentraliseerd in `data/site.ts` → `site.socials` (YouTube, Twitch, TikTok, X, Instagram, Discord). Header, footer en Watch/Follow lezen alleen daaruit.

## SEO

`lib/seo.ts` + `generateMetadata` per route. `app/sitemap.ts` en `app/robots.ts` gaan mee in de export. Zet `NEXT_PUBLIC_SITE_URL` vóór de build op je echte Wasmer-URL (default: `https://asaspxgaming.wasmer.app`).

## Wasmer.io (gratis, vanaf GitHub)

1. Push naar GitHub.
2. Wasmer-account, app koppelen aan de repo, production branch `main`.
3. Build indien gevraagd: `npm ci` + `npm run build`, publicatiemap **`out`**.
4. Repo-config: `wasmer.toml` (mount `out` → `/public`), `app.yaml`, `Staticfile` (`root: out`), `settings/config.toml` (SPA-fallback voor onbekende paden).

CLI:

```bash
npm run build
wasmer deploy
```

Zet `owner` in `app.yaml` op je Wasmer-namespace na de eerste login.

Docs: [static site](https://docs.wasmer.io/edge/guides/static-site/), [React/static](https://docs.wasmer.io/edge/guides/react-static-site/), [Git](https://docs.wasmer.io/edge/git/).

## Routes

`/`, `/nieuws`, `/nieuws/[slug]`, `/reviews`, `/reviews/[slug]`, `/games`, `/games/[slug]`, `/releases`, `/features`, `/features/[slug]`, `/hardware`, `/hardware/[slug]`, `/over-asapxgaming`, `/contact`, `/zoeken`, `/privacy`, `/disclaimer`, `/cookiebeleid`.
