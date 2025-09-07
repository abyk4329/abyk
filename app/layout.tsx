import '../styles/globals.css'
import type { Metadata } from 'next'
import { Assistant, Cormorant_Garamond } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CursorTrail from '@/components/CursorTrail'

const assistant = Assistant({ subsets: ['latin'], weight: ['300','400','500','600','700','800'], display: 'swap' })
const slogan = Cormorant_Garamond({ subsets: ['latin'], weight: ['300','400','500','600','700'], style: ['normal','italic'], display: 'swap', variable: '--font-slogan' })

export const metadata: Metadata = {
  title: 'Awakening by Ksenia',
  description: 'Personal Space for Growth — Unlock Your Inner Light',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
  <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#EFEAE4" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
  <body className={`${assistant.className} ${slogan.variable} bg-ivory text-charcoal`} suppressHydrationWarning>
  <div className="relative min-h-screen bg-bokeh" style={{ backgroundColor: 'var(--ivory)' }}>
      <CursorTrail />
      <Header />
  {/* PWA register */}
          <div className="pt-20">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
