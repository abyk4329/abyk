"use client"
import { useEffect, useState } from 'react'

export const dynamic = 'force-static'

export default function NumbersMeaning() {
  const [html, setHtml] = useState('')

  useEffect(() => {
    // Prefer the new file if present; fall back to the old one.
    const tryPaths = [
      '/numbersmeaninglast.html',
      '/numbersmeaning.html',
    ]
    ;(async () => {
      for (const p of tryPaths) {
        try {
          const r = await fetch(p, { cache: 'no-store' })
          if (r.ok) {
            const text = await r.text()
            if (text && text.trim()) { setHtml(text); break }
          }
        } catch {/* next */}
      }
    })()
  }, [])

  return (
    <main className="container py-8 mx-auto">
      <div className="text-right content">
        <h1 className="mb-8 text-3xl font-bold text-gold-deep">פירושי המספרים</h1>
        <div className="leading-relaxed text-charcoal" dangerouslySetInnerHTML={{ __html: html || '<p>התוכן מתעדכן...</p>' }} />
        <div className="mt-10">
          <a href="/" className="inline-block px-6 py-3 font-bold transition-colors duration-300 rounded-lg ripple bg-charcoal hover:bg-gold-deep text-ivory">
            חזרה לעמוד הבית
          </a>
        </div>
      </div>
    </main>
  )
}
