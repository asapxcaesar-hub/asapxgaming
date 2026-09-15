'use client'

import { Menu, Search, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { nav, site } from '@/data/site'
import { cn } from '@/lib/utils'

const socials = [
  { href: site.socials.youtube, label: 'YouTube' },
  { href: site.socials.twitch, label: 'Twitch' },
  { href: site.socials.tiktok, label: 'TikTok' },
  { href: site.socials.x, label: 'X' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  function onSearch(event: FormEvent) {
    event.preventDefault()
    const q = query.trim()
    setOpen(false)
    router.push(q ? `/zoeken/?q=${encodeURIComponent(q)}` : '/zoeken/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 md:h-[4.25rem] md:px-6">
        <Link href="/" className="shrink-0 font-display text-2xl tracking-wide md:text-3xl">
          ASAP<span className="text-accent">x</span>Gaming
        </Link>

        <nav className="ml-4 hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto lg:flex" aria-label="Hoofdmenu">
          {nav.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'whitespace-nowrap px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted hover:text-accent',
                  active && 'text-accent',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <form onSubmit={onSearch} className="ml-auto hidden items-center md:flex" role="search">
          <label className="sr-only" htmlFor="desk-search">
            Zoeken
          </label>
          <div className="flex items-center border border-line bg-elevated">
            <Search className="ml-2 size-4 text-muted" aria-hidden="true" />
            <input
              id="desk-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Zoeken"
              className="h-9 w-36 bg-transparent px-2 text-sm outline-none lg:w-48"
            />
          </div>
        </form>

        <div className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted xl:flex">
          {socials.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="hover:text-accent">
              {item.label}
            </a>
          ))}
        </div>

        <Link
          href="/zoeken/"
          className="ml-auto inline-flex size-10 items-center justify-center border border-line md:hidden"
          aria-label="Zoeken"
        >
          <Search className="size-4" />
        </Link>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center border border-line lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
          <span className="sr-only">Menu</span>
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-elevated px-4 py-4 lg:hidden">
          <form onSubmit={onSearch} className="mb-3 md:hidden" role="search">
            <label className="sr-only" htmlFor="mob-search">
              Zoeken
            </label>
            <input
              id="mob-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Zoeken op ASAPxGaming"
              className="h-10 w-full border border-line bg-bg px-3 text-sm"
            />
          </form>
          <nav className="grid gap-1" aria-label="Mobiel menu">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-semibold uppercase tracking-wider text-muted hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact/" onClick={() => setOpen(false)} className="py-2 text-sm font-semibold uppercase tracking-wider text-muted">
              Contact
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
