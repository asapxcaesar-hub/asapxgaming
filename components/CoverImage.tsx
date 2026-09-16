'use client'

import { useState } from 'react'
import { CoverPlaceholder } from '@/components/CoverPlaceholder'
import { cn } from '@/lib/utils'

export function CoverImage({
  src,
  alt,
  label,
  className,
  large = false,
}: {
  src?: string
  alt: string
  label?: string
  className?: string
  large?: boolean
}) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return <CoverPlaceholder label={label ?? alt.slice(0, 4).toUpperCase()} className={className} large={large} />
  }
  return (
    <div className={cn('overflow-hidden bg-panel', large ? 'min-h-52 md:min-h-72' : 'min-h-32', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" onError={() => setFailed(true)} />
    </div>
  )
}
