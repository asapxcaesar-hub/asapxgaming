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

**News** is the English edition of KayvE’s Games desk on [id.nl/games](https://id.nl/games). Manual pieces live in `content/news/batch-*.ts`. New posts land in `content/ingested.json` via `npm run ingest`. Giveaways and podcast landing pages are skipped.

## Automatic ingest from id.nl

ASAPxGaming is a **static export**. A visitor cannot pull a new id.nl article at request time. Instant means: id.nl tells GitHub the moment you publish, GitHub translates and commits, Wasmer rebuilds from git.

### Instant (use this)

id.nl already runs on DatoCMS. Add a webhook on **record publish** for Games articles only.

1. GitHub repo **Settings → Secrets and variables → Actions**
   - `OPENAI_API_KEY`: required for a full English body to go live
   - `INGEST_GITHUB_TOKEN`: a PAT with `contents:write` (needed if `GITHUB_TOKEN` cannot push, or if you ingest into a non-default branch)
   - optional: `IDNL_COOKIE`, `IDNL_RSS_URL`, `OPENAI_MODEL`
2. GitHub **Settings → Actions → General**: allow GitHub Actions to create and approve pull requests is not required; do allow Actions to push to the deploy branch.
3. DatoCMS → **Settings → Webhooks** → new webhook on **record publish** (Games model):
   - URL `https://api.github.com/repos/<owner>/<repo>/dispatches`
   - Header `Authorization: Bearer <PAT with repo scope>`
   - Header `Accept: application/vnd.github+json`
   - Header `X-GitHub-Api-Version: 2022-11-28`
   - JSON body (send the **full Dutch article**, not only the title):

```json
{
  "event_type": "idnl-publish",
  "client_payload": {
    "slug": "007-first-light-op-nintendo-switch-2-laat-nog-wat-langer-op-zich-wachten",
    "url": "https://id.nl/huis-en-entertainment/computer-en-gaming/nintendo/007-first-light-op-nintendo-switch-2-laat-nog-wat-langer-op-zich-wachten",
    "title": "Dutch title",
    "summary": "Dutch lede",
    "publishedAt": "2026-09-15",
    "category": "Nintendo",
    "branch": "main",
    "body": ["Full Dutch paragraph 1", "paragraph 2"]
  }
}
```

`branch` should be the branch Wasmer deploys (`main` once you merge, or the preview branch until then). Giveaways (`we-geven-*`) and podcast landings are skipped.

That fires `.github/workflows/ingest-idnl.yml` (`repository_dispatch` / `idnl-publish`). The script fetches missing body text from the live URL when needed, writes English into `content/ingested.json`, and pushes. Wasmer then rebuilds from git. Point Wasmer at the same branch you ingest into.

Without `OPENAI_API_KEY` the Dutch source is stored in `content/inbox/` and **does not go live**.

### Polling (backup)

The same workflow also runs every **20 minutes** against `https://id.nl/api/rss` (Games URLs only). Public fetches often hit the Vercel bot wall. If RSS fails, set secret `IDNL_COOKIE` to a logged-in browser cookie from id.nl, or set `IDNL_RSS_URL` to an internal feed that skips the wall.

Locally:

```bash
npm run ingest
```

### Why this is not a live scrape on Wasmer

Wasmer serves the `out/` folder. There is no Node server to poll id.nl on every visitor. The webhook is the “as soon as it is posted” path. Cron is only a safety net.

## Images

Game covers, heroes and cards use stills stored locally in `public/covers/`. Every news piece, review, and calendar row points at a still for that title.

**Calendar.** Site “today” is 16 September 2026. The list starts there and only scrolls forward. Closed months disappear. Filters run on dated rows only. Tiny niche titles are out. Undated is ignored. Calendar stills match the public dated listing, cached in `public/covers/`.

**News.** Full English translations of current id.nl Games articles. New posts should arrive through ingest, not by inventing copy.

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
