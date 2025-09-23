import type { ReactNode } from 'react'

export const metadata = {
  title: 'AWAKENING BY KSENIA',
  applicationName: 'AWAKENING BY KSENIA',
  description: 'מרחב אישי שמעניק לך כלים פשוטים לחיים מודעים, מלאי אהבה ובהירות.',
  metadataBase: new URL('https://abyk.online'),
  themeColor: '#0b0a10',
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AWAKENING BY KSENIA',
    description: 'מרחב אישי שמעניק לך כלים פשוטים לחיים מודעים, מלאי אהבה ובהירות.',
    type: 'website',
    url: '/',
    images: [{ url: '/share-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AWAKENING BY KSENIA',
    description: 'מרחב אישי שמעניק לך כלים פשוטים לחיים מודעים, מלאי אהבה ובהירות.',
    images: ['/share-image.png'],
  },
  appleWebApp: {
    capable: true,
    title: 'AWAKENING BY KSENIA',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/favicon-40.png', sizes: '40x40', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icon-180.png', sizes: '180x180', type: 'image/png' }],
  },
}

import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        {/* Global header */}
        <header className="w-full flex flex-col items-center text-center py-6 select-none">
          <h1 className="uppercase font-bold tracking-wide text-[#473B31]">AWAKENING BY KSENIA</h1>
          <div
            className="h-px w-1/2 my-3 mx-auto"
            style={{ backgroundColor: '#473B31', opacity: 0.3 }}
          />
          <p className="font-light text-[#473B31]" dir="ltr">
            YOUR PERSONAL SPACE FOR GROWTH
          </p>
        </header>
        {children}
      </body>
    </html>
  )
}
