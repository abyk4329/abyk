import '../styles/globals.css'
import type { Metadata } from 'next'
import { Assistant } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CursorTrail from '@/components/CursorTrail'

const assistant = Assistant({ subsets: ['hebrew'], weight: ['200','300','400','500','600','700','800'], display: 'swap' })
const assistantLatin = Assistant({ subsets: ['latin'], weight: ['200','300'], display: 'swap' })
const assistantHeadings = Assistant({ subsets: ['latin', 'hebrew'], weight: ['600','700','800'], display: 'swap', variable: '--font-headings' })

export const metadata: Metadata = {
  title: 'Awakening by Ksenia',
  description: 'Your Personal Space For Growth — Unlock Your Inner Light',
  applicationName: 'ABYK',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ABYK',
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/newlogos/iconfavicon.png', type: 'image/png' },
      { url: '/newlogos/iconfavicon.png', sizes: '192x192', type: 'image/png' },
      { url: '/newlogos/iconfavicon.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: '/newlogos/iconfavicon.png',
    apple: [
      { url: '/newlogos/iconfavicon.png', sizes: '180x180', type: 'image/png' },
      { url: '/newlogos/iconfavicon.png', sizes: '152x152', type: 'image/png' },
      { url: '/newlogos/iconfavicon.png', sizes: '120x120', type: 'image/png' }
    ],
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
        <meta name="theme-color" content="#fdfcfa" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ABYK" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="ABYK" />
        
  <link rel="apple-touch-icon" href="/newlogos/iconfavicon.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/newlogos/iconfavicon.png" />
  <link rel="apple-touch-icon" sizes="152x152" href="/newlogos/iconfavicon.png" />
  <link rel="apple-touch-icon" sizes="120x120" href="/newlogos/iconfavicon.png" />
        
  <link rel="icon" type="image/png" href="/newlogos/iconfavicon.png" />
  <link rel="shortcut icon" href="/newlogos/iconfavicon.png" />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
  <body className={`${assistant.className} ${assistantLatin.className} ${assistantHeadings.variable} bg-ivory text-charcoal`} suppressHydrationWarning>
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
