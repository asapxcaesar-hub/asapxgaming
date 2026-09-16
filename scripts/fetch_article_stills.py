#!/usr/bin/env python3
"""Save the hero image from the first IGN page for `{game} IGN`."""

from __future__ import annotations

import json
import re
import ssl
import urllib.request
from pathlib import Path

OUT = Path("/workspace/public/covers/articles")
OUT.mkdir(parents=True, exist_ok=True)

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)
CTX = ssl.create_default_context()

PAGES: dict[str, list[str]] = {
    "wolverine-marvel": [
        "https://www.ign.com/games/marvels-wolverine",
        "https://www.ign.com/articles/marvels-wolverine-review",
        "https://me.ign.com/en/marvel-wolverine/248017/marvels-wolverine-review",
    ],
    "resident-evil-requiem": [
        "https://www.ign.com/games/resident-evil-requiem",
        "https://www.ign.com/articles/resident-evil-requiem-review",
    ],
    "pragmata": [
        "https://www.ign.com/games/pragmata",
        "https://www.ign.com/articles/pragmata-review",
    ],
    "forza-horizon-6": [
        "https://www.ign.com/games/forza-horizon-6",
        "https://www.ign.com/articles/forza-horizon-6-review",
    ],
    "007-first-light": [
        "https://www.ign.com/games/007-first-light",
        "https://www.ign.com/articles/007-first-light-review",
        "https://www.ign.com/games/project-007",
    ],
    "moonlighter-2": [
        "https://www.ign.com/games/moonlighter-2-the-endless-vault",
    ],
    "silent-hill-townfall": [
        "https://www.ign.com/games/silent-hill-townfall",
        "https://www.ign.com/articles/silent-hill-townfall-might-be-exactly-what-the-series-needs-ign-preview",
    ],
    "fire-emblem-fortunes-weave": [
        "https://www.ign.com/games/fire-emblem-fortunes-weave",
        "https://me.ign.com/en/fire-emblem-fortunes-weave/245378/nintendo-confirms-fire-emblem-fortunes-weave-switch-2-release-date",
    ],
    "ace-combat-8": [
        "https://www.ign.com/games/ace-combat-8-wings-of-theve",
        "https://pk.ign.com/ace-combat-8-wings-of-theve/256052/ace-combat-8-wings-of-theve-official-release-date-trailer-state-of-play-2026",
    ],
    "grand-theft-auto-vi": [
        "https://www.ign.com/games/grand-theft-auto-vi",
        "https://www.ign.com/videos/gta-6-grand-theft-auto-6-official-extended-gameplay",
    ],
    "zelda-ocarina-of-time-switch-2": [
        "https://www.ign.com/games/the-legend-of-zelda-ocarina-of-time",
    ],
}


def get(url: str) -> tuple[bytes, str]:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.9",
        },
    )
    with urllib.request.urlopen(req, context=CTX, timeout=45) as resp:
        return resp.read(), resp.headers.get("Content-Type", "")


def og_images(html: str) -> list[str]:
    found: list[str] = []
    for pattern in (
        r'<meta[^>]+property=["\']og:image(?::url)?["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image(?::url)?["\']',
        r'"thumbnailUrl"\s*:\s*"(https?://[^"]+)"',
        r'"image"\s*:\s*"(https?://assets-prd\.ignimgs\.com[^"]+)"',
        r'(https://assets-prd\.ignimgs\.com/[^"\s>]+\.(?:jpg|jpeg|png|webp))',
    ):
        for m in re.findall(pattern, html, re.I):
            url = m.replace("\\u0026", "&").replace("&amp;", "&")
            if url not in found:
                found.append(url)
    return found


def save(slug: str, url: str) -> Path | None:
    try:
        data, ctype = get(url)
    except Exception as exc:
        print("dl fail", slug, url, exc)
        return None
    if len(data) < 8000:
        print("small", slug, len(data))
        return None
    # Skip obvious non-photos (tiny logos)
    if data[:8].startswith(b"<svg") or data[:15].startswith(b"<!DOCTYPE"):
        return None
    ext = ".jpg"
    lower = url.lower()
    if "png" in ctype or lower.endswith(".png"):
        ext = ".png"
    elif "webp" in ctype or lower.endswith(".webp"):
        ext = ".webp"
    dest = OUT / f"{slug}{ext}"
    # remove other extensions for this slug
    for old in OUT.glob(f"{slug}.*"):
        if old.suffix != ".json":
            old.unlink()
    dest.write_bytes(data)
    print("saved", dest.name, len(data), url[:100])
    return dest


def main() -> None:
    log: dict[str, str] = {}
    for slug, pages in PAGES.items():
        ok = False
        for page in pages:
            try:
                raw, _ = get(page)
            except Exception as exc:
                print("page fail", page, exc)
                continue
            html = raw.decode("utf-8", "replace")
            urls = og_images(html)
            print(slug, "from", page, "candidates", len(urls), urls[:2])
            for url in urls:
                if "logo" in url.lower() or "avatar" in url.lower():
                    continue
                if save(slug, url):
                    log[slug] = url
                    ok = True
                    break
            if ok:
                break
        if not ok:
            print("FAILED", slug)
    (OUT / "sources.json").write_text(json.dumps(log, indent=2) + "\n")


if __name__ == "__main__":
    main()
