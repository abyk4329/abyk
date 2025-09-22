import type { ReactNode } from 'react'
export const metadata = {
  title: 'ABYK',
  applicationName: 'ABYK',
  description: 'Awakening by Ksenia - Wealth Code',
  metadataBase: new URL('https://abyk.online'),
  themeColor: '#0b0a10',
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'ABYK',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/maskable-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/maskable-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
