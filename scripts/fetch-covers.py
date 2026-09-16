#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import ssl
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/workspace")
COVERS = ROOT / "public" / "covers"
DATED = ROOT / "content" / "gamespotDated.ts"
CTX = ssl.create_default_context()
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36"

OVERRIDES = {
    "Marvel’s Wolverine": "wolverine-marvel",
    "Moonlighter 2": "moonlighter-2",
    "Fire Emblem: Fortune’s Weave": "fire-emblem-fortunes-weave",
    "Control Resonant": "control-resonant",
    "Silent Hill: Townfall": "silent-hill-townfall",
    "Minecraft Dungeons 2": "minecraft-dungeons-2",
    "Ace Combat 8: Wings of Theve": "ace-combat-8",
    "Gears of War: E-Day": "gears-of-war-e-day",
    "Final Fantasy Resonance": "final-fantasy-resonance",
    "Nintendo Switch Sports Resort": "nintendo-switch-sports-resort",
    "Call of Duty: Modern Warfare 4": "call-of-duty-modern-warfare-4",
    "Phantom Blade Zero": "phantom-blade-zero",
    "The Legend of Zelda: Ocarina of Time": "zelda-ocarina-of-time-switch-2",
    "Grand Theft Auto 6": "grand-theft-auto-vi",
    "Dragon Quest Monsters: The Withered World": "dragon-quest-monsters-withered-world",
    "Monster Hunter Wilds": "monster-hunter-wilds-switch-2",
    "Professor Layton and the New World of Steam": "professor-layton-new-world-of-steam",
    "Path of Exile 2": "path-of-exile-2",
}


def slugify(title: str) -> str:
    if title in OVERRIDES:
        return OVERRIDES[title]
    s = title.lower().replace("’", "").replace("'", "")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def titles() -> list[str]:
    found = re.findall(r'"title": "([^"]+)"', DATED.read_text())
    extra = ["Resident Evil Requiem", "Pragmata", "Forza Horizon 6", "007 First Light"]
    out, seen = [], set()
    for t in extra + found:
        if t not in seen:
            seen.add(t)
            out.append(t)
    return out


def fetch(url: str, timeout: int = 18) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as res:
            data = res.read()
            if len(data) < 5000 or data[:3] == b"GIF":
                return None
            return data
    except Exception:
        return None


def fetch_text(url: str, timeout: int = 18) -> str | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as res:
            return res.read().decode("utf-8", "ignore")
    except Exception:
        return None


def steam(title: str) -> bytes | None:
    q = urllib.parse.quote(title.split(":")[0][:60])
    raw = fetch_text(f"https://store.steampowered.com/api/storesearch/?term={q}&l=english&cc=US")
    if not raw:
        return None
    try:
        items = json.loads(raw).get("items") or []
    except json.JSONDecodeError:
        return None
    if not items:
        return None
    appid = items[0].get("id")
    for path in (
        f"https://cdn.cloudflare.steamstatic.com/steam/apps/{appid}/library_hero.jpg",
        f"https://cdn.cloudflare.steamstatic.com/steam/apps/{appid}/header.jpg",
        f"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/{appid}/header.jpg",
    ):
        img = fetch(path)
        if img:
            return img
    return None


def wiki(title: str) -> bytes | None:
    for candidate in (title, title.split(":")[0], title.split("–")[0].strip()):
        q = urllib.parse.quote(candidate.replace(" ", "_"))
        raw = fetch_text(f"https://en.wikipedia.org/api/rest_v1/page/summary/{q}")
        if not raw:
            continue
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            continue
        src = (data.get("originalimage") or data.get("thumbnail") or {}).get("source")
        if src:
            img = fetch(src)
            if img:
                return img
    return None


def one(title: str) -> tuple[str, str, bool]:
    slug = slugify(title)
    dest = COVERS / f"{slug}.jpg"
    if dest.exists() and dest.stat().st_size > 8000:
        return slug, title, True
    img = steam(title) or wiki(title)
    if img:
        dest.write_bytes(img)
        return slug, title, True
    return slug, title, False


def main() -> None:
    COVERS.mkdir(parents=True, exist_ok=True)
    rows = titles()
    ok = miss = 0
    missing = []
    with ThreadPoolExecutor(max_workers=10) as pool:
        futs = {pool.submit(one, t): t for t in rows}
        for fut in as_completed(futs):
            slug, title, good = fut.result()
            if good:
                ok += 1
                print("OK", slug, flush=True)
            else:
                miss += 1
                missing.append([slug, title])
                print("MISS", slug, title, flush=True)
    print("done", ok, "ok", miss, "miss", flush=True)
    (ROOT / "scripts" / "cover-missing.json").write_text(json.dumps(missing, indent=2))


if __name__ == "__main__":
    main()
