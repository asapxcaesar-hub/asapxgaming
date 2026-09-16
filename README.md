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

ASAPxGaming is a **static export**. The live site only serves files in `out/`. A visitor never talks to id.nl. A new Games article appears on ASAPxGaming only after **a GitHub repository** gets a commit and Wasmer rebuilds.

If you open github.com and there is no ASAPxGaming / genesis repo: that is expected. This project started in Cursor. It is **not** on GitHub until you create the repo.

### Start here (no GitHub repo yet)

1. Get a free account at [github.com](https://github.com) and sign in. Your username is the first half of `OWNER/REPO` later (example: if GitHub shows `asapxcaesar-hub`, that is `OWNER`).
2. In this Cursor project, click the **Create repo** pill. That publishes this code to **your** GitHub account. After it finishes, github.com shows a real repository. The address looks like `https://github.com/OWNER/REPO`.
3. Open that URL. You should see folders such as `app`, `content`, `.github`. Under **Actions** you should see a workflow named **Ingest id.nl games**. If Actions is empty, wait a minute and refresh; the workflow file only exists after the repo is created and this branch is on GitHub.
4. Remember `OWNER/REPO` from the URL. Every later step uses that, not a name I invent for you.

Do **not** look for the repo on Origin / Cursor git hosting for this webhook. GitHub Actions only run on github.com. Wasmer should also connect to that same github.com repo.

Then continue with secrets, a test ping, DatoCMS, and Wasmer below.

**Instant** = id.nl tells GitHub when you hit Publish. GitHub translates, commits, Wasmer rebuilds. That is the path to use.

**Backup** = the same GitHub Action also checks the RSS feed every 20 minutes, in case a webhook is missed.

Giveaways (`we-geven-*`) and podcast landings are skipped. Without `OPENAI_API_KEY`, Dutch stubs land in `content/inbox/` and **do not go live**.

The Action file is `.github/workflows/ingest-idnl.yml`. It only runs on **GitHub**. Connect Wasmer to that same GitHub repo (not only Origin).

### 0. What you need

- The GitHub repo Wasmer deploys from (example: `asapxcaesar-hub/genesis`)
- An OpenAI API key
- A GitHub personal access token (classic `repo` scope, or fine-grained with Contents write on that repo)
- DatoCMS admin on id.nl

Replace `OWNER/REPO` below with your GitHub repo. Use `main` as `branch` once that is the Wasmer production branch.

### 1. GitHub: secrets and Actions

1. Open the GitHub repo → **Settings → Secrets and variables → Actions**.
2. **New repository secret** `OPENAI_API_KEY` = your OpenAI key. Without this, nothing goes live.
3. Optional secrets:
   - `INGEST_GITHUB_TOKEN` = the same PAT, if the default `GITHUB_TOKEN` cannot push (protected branch, or a non-default branch)
   - `IDNL_COOKIE` = a logged-in `Cookie` header from id.nl, only needed if RSS/page fetches hit the Vercel bot wall
   - `IDNL_RSS_URL` = an internal RSS URL that is not behind that wall
   - `OPENAI_MODEL` = override (default `gpt-4.1-mini`)
4. **Settings → Actions → General**: Actions enabled. For “Workflow permissions” pick **Read and write**.

Keep the PAT. You paste it into DatoCMS in the next step as well.

### 2. Prove the Action works (do this before Dato)

From a terminal, with the PAT in `GITHUB_TOKEN`:

```bash
curl -sS -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/OWNER/REPO/dispatches \
  -d '{
    "event_type": "idnl-publish",
    "client_payload": {
      "slug": "test-ingest-from-curl",
      "url": "https://id.nl/huis-en-entertainment/computer-en-gaming/playstation/test-ingest-from-curl",
      "title": "Testartikel voor ASAPxGaming ingest",
      "summary": "Korte Nederlandse samenvatting.",
      "publishedAt": "2026-09-16",
      "category": "PlayStation",
      "branch": "main",
      "body": [
        "Eerste volledige Nederlandse alinea.",
        "Tweede volledige Nederlandse alinea."
      ]
    }
  }'
```

A **204** response is success. Then GitHub → **Actions** → workflow **Ingest id.nl games**. It should run, commit English into `content/ingested.json`, and Wasmer should rebuild.

If the run writes `content/inbox/test-ingest-from-curl.json` instead, `OPENAI_API_KEY` is missing. If the workflow never starts, the PAT cannot create `repository_dispatch` on that repo.

Delete the test article from `content/ingested.json` after you are happy.

### 3. DatoCMS: webhook on Publish

1. id.nl DatoCMS → **Project settings → Webhooks → Create a new webhook**.
2. Name: `ASAPxGaming ingest`.
3. URL (POST): `https://api.github.com/repos/OWNER/REPO/dispatches`
4. Headers:
   - `Authorization` = `Bearer PASTE_THE_PAT_HERE`
   - `Accept` = `application/vnd.github+json`
   - `X-GitHub-Api-Version` = `2022-11-28`
   - `Content-Type` = `application/json`
5. Trigger: **record published** (or “publish”). Restrict it to the Games article model only, so house/tech posts do not fire.
6. Custom JSON body. GitHub does **not** accept Dato’s default payload. The body must look exactly like the curl example: top-level `event_type` plus `client_payload`. Map Dato fields onto these keys:

| JSON key | What to send |
| --- | --- |
| `slug` | URL slug of the article |
| `url` | Public https://id.nl/... URL |
| `title` | Dutch title |
| `summary` | Dutch lede |
| `publishedAt` | `YYYY-MM-DD` |
| `category` | `Nintendo`, `PlayStation`, `Xbox` or `PC` |
| `branch` | Wasmer deploy branch (`main`) |
| `body` | Array of **full** Dutch paragraphs, not only the lede |

Dato field API names differ per project. In the webhook template, use your real field keys (often `{{title}}`, `{{slug}}`, `{{content}}`). If Dato stores body as HTML, that is fine: ingest strips tags. If you cannot send `body`, at least send `url`; ingest will try to fetch the live page.

GitHub limits `client_payload` to **10 top-level keys**. Do not dump the whole Dato record into extra fields.

7. Save. Publish a Games article on id.nl. Watch **Actions** on GitHub.

### 4. Wasmer

Wasmer must watch the **same GitHub repo and branch** the Action pushes to (`branch` in the payload, default repo default branch). After the ingest commit, Wasmer rebuilds `out/` and the English piece is on `/news/`.

### 5. Backup poll and local run

The workflow also runs every 20 minutes against `https://id.nl/api/rss` (Games URLs only). You can start it by hand: GitHub → Actions → **Ingest id.nl games** → **Run workflow**.

On your machine:

```bash
npm run ingest
```

Public RSS often returns a Vercel bot wall from GitHub’s network. Then either the Dato webhook (preferred) or secrets `IDNL_COOKIE` / `IDNL_RSS_URL` are required.

### Why Wasmer cannot scrape id.nl itself

Wasmer only serves the exported `out/` folder. There is no Node process on the edge that can poll id.nl when someone opens the site. The webhook is “as soon as it is posted”. Cron is only a safety net.

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

Do this **after** the GitHub repo exists (Create repo pill, then confirm `https://github.com/OWNER/REPO`).

1. Sign in at [wasmer.io](https://wasmer.io) with GitHub.
2. Create an app from **that** GitHub repo. Production branch: `main` (or the branch GitHub shows as default after you create the repo).
3. Build if asked: `npm ci` + `npm run build`, publish folder **`out`**.
4. Repo config already in this project: `wasmer.toml` (mount `out` → `/public`), `app.yaml`, `Staticfile` (`root: out`), `settings/config.toml`.

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
