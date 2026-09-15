import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Card({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'slash-frame border border-line bg-panel/80 transition-colors hover:border-acid/60',
        className,
      )}
    >
      {children}
    </div>
  )
}
