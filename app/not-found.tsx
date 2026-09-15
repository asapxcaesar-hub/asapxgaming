import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-12 text-center">
      <p className="font-display text-7xl text-accent">404</p>
      <h1 className="mt-2 font-display text-4xl">Pagina bestaat niet</h1>
      <p className="mt-3 text-muted">Deze URL zit niet in de export. Terug naar home of de feed.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/nieuws/">Nieuws</Link>
        </Button>
      </div>
    </div>
  )
}
