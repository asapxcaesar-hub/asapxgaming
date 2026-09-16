# ASAPxGaming

Independent games coverage (news, reviews, releases) from Kay van Elsen (@asapxcaesar). Next.js 16 App Router, TypeScript, Tailwind, **static export**, hostable on the free tier of [Wasmer Edge](https://wasmer.io) from GitHub.

No accounts, no database, no CMS server. Content lives in TypeScript modules (CMS-ready: same fields, different loader later).

## Run it

Node 22+.

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:4629](http://127.0.0.1:4629)

```bash
npm run build   # writes to out/
npm run lint
```

## Stack

The first slice was a Vite SPA. This build uses **Next.js `output: 'export'`** because the spec needs per-page SEO (canonical, Open Graph, Twitter, Article/Review JSON-LD, sitemap, robots) and HTML per route. Wasmer stays a static file server (`out/` instead of `dist/`).

## Content

| Path | What |
| --- | --- |
| `data/site.ts` | Brand, tagline, creator, **all social URLs**, navigation |
| `content/news.ts` | Short news |
| `content/reviews.ts` | Game reviews (scores + sections) |
| `content/features.ts` | Old longreads; only via redirect hubs |
| `content/hardware.ts` | Old hardware pieces; only via redirect hubs |
| `content/games.ts` | Releases (dated, from the current month) + cover paths |
| `content/videos.ts` | Optional social cards (not shown on the homepage) |
| `types/content.ts` | Shapes |
| `lib/content.ts` | Lookups, filters, search |

Add an object, reuse `slug` in `related`. No copy-paste in components.

**No scrape pipeline.** News and reviews are original English pieces in these modules, based on public facts (dates, platforms, what the game does). We do not translate or republish third-party articles.

## Images

Game covers, heroes and cards use stills stored locally in `public/covers/`. Every news piece, review, and calendar row points at a still for that title.

**Calendar.** Site “today” is 16 September 2026. The list starts there and only scrolls forward. Closed months disappear. Filters run on dated rows only. Tiny niche titles are out. Undated is ignored. Calendar stills match the public dated listing, cached in `public/covers/`.

**News.** Topics follow what public Dutch games coverage is actually writing about that week. Sentences are original English, checked against publisher dates and platforms. We do not translate other outlets. Unclear facts are left out.

**News.** September 2026 only, biggest games or indie that matters. Features and hardware are not in the feed.

**Reviews.** 2026 titles that matter, no 2025 leftover.

**Copy.** In news and reviews (title, excerpt, body, cards, SEO title) no hyphen, no en dash, no em dash. Titles are punchy and match the piece.

## Branding

Dark palette (CSS variables in `styles/theme.css`): `#08090C`, `#111318`, `#181B22`, `#FFFFFF`, `#9CA3AF`, one accent `#2EE6A6`. No second brand colour.

## Socials

Centralised in `data/site.ts` → `site.socials` (YouTube, Twitch, TikTok: @asapxcaesar). Contact: `asapxcaesar@gmail.com`. Header and footer read only from there.

## SEO

`lib/seo.ts` plus `generateMetadata` per route. `app/sitemap.ts` and `app/robots.ts` ship in the export. Set `NEXT_PUBLIC_SITE_URL` before build to your real Wasmer URL (default: `https://asaspxgaming.wasmer.app`).

## Wasmer.io (free, from GitHub)

1. Push to GitHub (`asapxcaesar-hub/genesis` if that is the live remote).
2. Wasmer account, app linked to the repo, production branch `main`.
3. Build if asked: `npm ci` + `npm run build`, publish folder **`out`**.
4. Repo config: `wasmer.toml` (mount `out` → `/public`), `app.yaml`, `Staticfile` (`root: out`), `settings/config.toml` (SPA fallback for unknown paths).

CLI:

```bash
npm run build
wasmer deploy
```

Set `owner` in `app.yaml` to your Wasmer namespace after first login.

Docs: [static site](https://docs.wasmer.io/edge/guides/static-site/), [React/static](https://docs.wasmer.io/edge/guides/react-static-site/), [Git](https://docs.wasmer.io/edge/git/).

## Routes

First class: `/`, `/news`, `/news/[slug]`, `/reviews`, `/reviews/[slug]`, `/releases`, `/contact`, `/search`, `/privacy`, `/disclaimer`, `/cookies`.

Old Dutch paths (`/nieuws`, `/zoeken`, `/cookiebeleid`) and old hubs (`/games`, `/features`, `/hardware`, `/over-asapxgaming` and their slugs) stay as client redirects to news, reviews, search, cookies or the calendar.
