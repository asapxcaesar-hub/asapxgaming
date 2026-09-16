import Link from 'next/link'
import { footerNav, nav, site } from '@/data/site'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-elevated">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-display text-3xl">
            ASAP<span className="text-accent">x</span>Gaming
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted">{site.tagline}</p>
          <p className="mt-3 text-sm text-muted">{site.creator.name}</p>
          <p className="mt-1 text-sm">
            <a className="text-accent hover:underline" href={`mailto:${site.creator.email}`}>
              {site.creator.email}
            </a>
          </p>
          <p className="mt-2 max-w-sm text-xs text-muted">{site.creator.bio}</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Navigate</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="text-muted hover:text-accent" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Follow and legal</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {Object.entries(site.socials).map(([key, href]) => (
              <li key={key}>
                <a className="capitalize text-muted hover:text-accent" href={href} target="_blank" rel="noreferrer">
                  {key}
                </a>
              </li>
            ))}
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link className="text-muted hover:text-accent" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-[1440px] px-4 py-4 text-xs text-muted md:px-6">
          © 2026 {site.name}. Independent games site. No gambling, no leak JPGs.
        </p>
      </div>
    </footer>
  )
}
