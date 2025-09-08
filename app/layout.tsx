import '../styles/globals.css'
import type { Metadata } from 'next'
import { Assistant, Quicksand } from 'next/font/google'
import Footer from '@/components/Footer'
import CursorTrail from '@/components/CursorTrail'

const assistant = Assistant({ subsets: ['hebrew'], weight: ['300','400','500','600','700','800'], display: 'swap' })
const quicksand = Quicksand({ subsets: ['latin'], weight: ['300','400'], display: 'swap' })
const assistantHeadings = Assistant({ subsets: ['latin', 'hebrew'], weight: ['600','700','800'], display: 'swap', variable: '--font-headings' })

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
  <body className={`${assistant.className} ${quicksand.className} ${assistantHeadings.variable} bg-ivory text-charcoal`} suppressHydrationWarning>
  <div className="relative min-h-screen bg-bokeh" style={{ backgroundColor: 'var(--ivory)' }}>
      <CursorTrail />
  {/* PWA register */}
          <div className="pt-8">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
