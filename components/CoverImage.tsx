'use client'

import { CoverPlaceholder } from '@/components/CoverPlaceholder'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function CoverImage({
  src,
  alt,
  label,
  className,
}: {
  src?: string
  alt: string
  label?: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <CoverPlaceholder
        label={label ?? alt.slice(0, 4).toUpperCase()}
        className={cn('overflow-hidden bg-panel', className)}
      />
    )
  }

  return (
    <div className={cn('overflow-hidden bg-panel', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full max-w-full"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
