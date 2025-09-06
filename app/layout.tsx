import '../styles/globals.css'
import type { Metadata } from 'next'
import { Assistant } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const assistant = Assistant({ subsets: ['latin'], weight: ['300','400','500','600','700','800'] })

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
      <head />
      <body className={`${assistant.className} bg-ivory text-charcoal`} suppressHydrationWarning>
        <div className="relative min-h-screen bg-bokeh">
          <Header />
          <div className="pt-20">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
