import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { DM_Sans, Syne } from 'next/font/google'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { site } from '@/data/site'
import { buildMetadata } from '@/lib/seo'
import './globals.css'

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

const display = Syne({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.name} — nieuws, reviews, releases`,
    description: site.description,
    path: '/',
  }),
  metadataBase: new URL(site.url),
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl" className={`${body.variable} ${display.variable}`}>
      <body className="flex min-h-svh flex-col overflow-x-hidden font-sans antialiased">
        <SiteHeader />
        <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 md:px-6 md:py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
