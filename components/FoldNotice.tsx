'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function FoldNotice({
  to,
  title,
}: {
  to: string
  title: string
}) {
  const router = useRouter()

  useEffect(() => {
    router.replace(to)
  }, [router, to])

  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <p className="text-sm text-muted">This hub now lives at {title}.</p>
      <Link href={to} className="mt-4 inline-block text-accent">
        Continue to {title} →
      </Link>
    </div>
  )
}
