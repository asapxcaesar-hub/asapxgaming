# ASAPxGaming

Nederlandse website voor **game reviews** en **nieuws**. Statische Vite + React + TypeScript + Tailwind-site, klaar om gratis op [Wasmer Edge](https://wasmer.io) te hosten vanaf GitHub.

Geen accounts, geen database, geen CMS. Reviews en artikelen staan in `src/data/`.

## Lokaal draaien

Vereisten: Node.js 22+.

```bash
npm install
npm run dev
```

Dev-server: [http://127.0.0.1:4629](http://127.0.0.1:4629) (poort 4629, niet 5173).

Productiebuild:

```bash
npm run build
npm run preview
```

`npm run build` schrijft naar `dist/`. Die map serveert Wasmer.

## Routes

| Pad | Inhoud |
| --- | --- |
| `/` | Home |
| `/nieuws` | Nieuwsoverzicht (zoek + tags, inclusief lege staat) |
| `/nieuws/:slug` | Artikel |
| `/reviews` | Reviewlijst |
| `/reviews/:slug` | Review |
| `/over` | Redactie / over de site |

Onbekende slugs en routes tonen een fout- of 404-staat.

## Gratis hosten: GitHub → Wasmer.io

Wasmer Edge heeft een gratis tier voor apps. Git-deploys werken met GitHub.

1. Zet deze repo op GitHub (leeg of bestaande remote).
2. Maak een account op [wasmer.io](https://wasmer.io) (GitHub-login mag).
3. Ga naar [een nieuwe app](https://wasmer.io/apps/create?template=static-website) of **New App** in het dashboard.
4. Kies **GitHub** als bron, autoriseer Wasmer, selecteer deze repository.
5. Zet de production branch op `main` (of de branch die je wilt releasen).
6. Als Wasmer om een build vraagt: install `npm ci`, build `npm run build`, output `dist`.
7. Sla op en deploy. Pushes naar die branch kunnen daarna automatisch uitrollen.

Config in deze repo (niet weggooien):

- `wasmer.toml` — package + `wasmer/static-web-server`, map `dist` → `/public`
- `app.yaml` — Edge-app (`name: asaspxgaming`, `package: .`)
- `Staticfile` — `root: dist` (Wasmer static-website template)
- `settings/config.toml` — SPA-fallback naar `index.html` zodat `/reviews/...` werkt

Eerste deploy via CLI (optioneel, na `wasmer login`):

```bash
npm run build
# Zet in app.yaml het veld owner: op jouw Wasmer-username als de CLI daarom vraagt
wasmer deploy
```

Na de eerste publicatie kun je `owner` in `app.yaml` vastzetten op jouw namespace. De packagenaam in `wasmer.toml` mag je wijzigen naar `<username>/asaspxgaming`.

Docs: [static site](https://docs.wasmer.io/edge/guides/static-site/), [React op Edge](https://docs.wasmer.io/edge/guides/react-static-site/), [GitHub-deploys](https://docs.wasmer.io/edge/git/).

## Stack

Vite 8, React 19, TypeScript, Tailwind 4, React Router, shadcn-achtige primitives (Button, Badge, Input, Skeleton).
