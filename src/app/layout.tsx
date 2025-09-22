import type { ReactNode } from 'react'
export const metadata = {
  title: 'abykonline',
  description: 'Awakening by Ksenia - Wealth Code',
  metadataBase: new URL('https://abyk.online'),
}

import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
