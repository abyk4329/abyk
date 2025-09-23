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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
