import type { ReactNode } from 'react'

export const metadata = {
  title: 'AWAKENING BY KSENIA ─ Your Personal Space for Growth',
  applicationName: 'AWAKENING BY KSENIA',
  description: 'מרחב אישי שמעניק לך כלים פשוטים לחיים מודעים, מלאי אהבה ובהירות.',
  metadataBase: new URL('https://abyk.online'),
  manifest: '/manifest.json?v=2',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AWAKENING BY KSENIA ─ Your Personal Space for Growth',
    description: 'מרחב אישי שמעניק לך כלים פשוטים לחיים מודעים, מלאי אהבה ובהירות.',
    type: 'website',
    url: 'https://abyk.online',
    images: [{ url: 'https://abyk.online/share-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AWAKENING BY KSENIA ─ Your Personal Space for Growth',
    description: 'מרחב אישי שמעניק לך כלים פשוטים לחיים מודעים, מלאי אהבה ובהירות.',
    images: ['https://abyk.online/share-image.png'],
  },
  appleWebApp: {
    capable: true,
    title: 'AWAKENING BY KSENIA ─ Your Personal Space for Growth',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/icon', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-40.png', sizes: '40x40', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/icon', '/favicon.ico'],
    apple: [{ url: '/icon-180.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport = {
  themeColor: 'transparent',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

import './globals.css'
import QaOverlay from '@/components/QaOverlay'
import routeMap from '@/routeMap.json'
import NoIndexWhenQA from '@/components/NoIndexWhenQA'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'

const isQA = process.env.NEXT_PUBLIC_QA === 'true'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className="relative min-h-screen bg-root">
        {/* Global background overlay spanning the entire viewport */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/35 via-transparent to-rose-100/30 sm:bg-gradient-to-b sm:from-orange-50/25 sm:via-transparent sm:to-rose-50/25" />
          <div className="absolute inset-0 backdrop-saturate-[1.12] backdrop-contrast-105 backdrop-brightness-[1.05]" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Sticky Header */}
          <div className="sticky top-0 z-50 w-full">
            <Header />
          </div>

          {/* Main content area */}
          <main className="relative flex-1">
            <div className="relative z-10">
              {children}
            </div>
          </main>

          {/* Footer pinned to bottom */}
          <div className="mt-auto">
            <Footer />
          </div>
        </div>

        {isQA && <NoIndexWhenQA />}
        {isQA && <QaOverlay routeMap={routeMap as Record<string, string>} />}
      </body>
    </html>
  )
}
