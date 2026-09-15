'use client'

import { useState } from 'react'
import { site } from '@/data/site'
import { Button } from '@/components/ui/button'

export function ShareLinks({ path, title }: { path: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const url = `${site.url.replace(/\/$/, '')}${path}`
  const tweet = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`

  async function copy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild variant="outline" size="sm">
        <a href={tweet} target="_blank" rel="noreferrer">
          Deel op X
        </a>
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={copy}>
        {copied ? 'Link gekopieerd' : 'Kopieer link'}
      </Button>
    </div>
  )
}
