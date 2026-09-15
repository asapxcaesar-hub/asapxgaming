import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-panel">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} ASAPxGaming — redactie NL. Geen hype, wel een oordeel.
        </p>
        <div className="flex gap-4">
          <Link className="hover:text-acid" to="/nieuws">
            Nieuws
          </Link>
          <Link className="hover:text-acid" to="/reviews">
            Reviews
          </Link>
          <Link className="hover:text-acid" to="/over">
            Over
          </Link>
        </div>
      </div>
    </footer>
  )
}
