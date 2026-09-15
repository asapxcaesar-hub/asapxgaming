import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Home' },
  { to: '/nieuws', label: 'Nieuws' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/over', label: 'Over' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-void/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center bg-acid font-display text-xl text-void">
            X
          </span>
          <span className="font-display text-3xl leading-none tracking-wide">
            ASAP<span className="text-acid">x</span>Gaming
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Hoofdmenu">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted hover:text-acid',
                  isActive && 'text-acid',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Button
          variant="outline"
          size="sm"
          className="md:hidden"
          type="button"
          aria-expanded={open}
          aria-controls="mobiel-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
          Menu
        </Button>
      </div>
      {open ? (
        <nav
          id="mobiel-menu"
          className="grid gap-1 border-t border-line bg-panel px-4 py-3 md:hidden"
          aria-label="Mobiel menu"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'px-2 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-muted',
                  isActive && 'text-acid',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
