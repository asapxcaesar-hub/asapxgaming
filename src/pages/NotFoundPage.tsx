import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl py-10 text-center">
      <p className="font-display text-8xl text-hot">404</p>
      <h1 className="mt-2 font-display text-4xl">Map niet gevonden</h1>
      <p className="mt-3 text-muted">
        Deze route zit niet in de build. Terug naar spawn, of open de reviews.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button asChild>
          <Link to="/">Naar home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/reviews">Reviews</Link>
        </Button>
      </div>
    </div>
  )
}
