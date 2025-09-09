"use client"
import Image from 'next/image'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

function ThankYouContent() {
  const searchParams = useSearchParams()
  const [htmlPreview, setHtmlPreview] = useState<string>('')
  const [uniqueNumbers, setUniqueNumbers] = useState<number[]>([])

  // Derive code from URL first, then fallback to localStorage
  const code = useMemo(() => {
    const bd = Number(searchParams.get('bd') || '0')
    const bm = Number(searchParams.get('bm') || '0')
    const by = Number(searchParams.get('by') || '0')
    const lp = Number(searchParams.get('lp') || '0')
    if (bd && bm && by && lp) return { bd, bm, by, lp }
    // Fallback
    try {
      const raw = localStorage.getItem('abyk_money_code')
      if (raw) {
        const saved = JSON.parse(raw)
        const fbd = Number(saved?.bd || 0)
        const fbm = Number(saved?.bm || 0)
        const fby = Number(saved?.by || 0)
        const flp = Number(saved?.lp || 0)
        if (fbd && fbm && fby && flp) return { bd: fbd, bm: fbm, by: fby, lp: flp }
      }
    } catch {}
    return { bd: 0, bm: 0, by: 0, lp: 0 }
  }, [searchParams])

  useEffect(() => {
    if (!code.bd || !code.bm || !code.by || !code.lp) return
    const url = `/api/interpretation?inline=1&source=1&bd=${code.bd}&bm=${code.bm}&by=${code.by}&lp=${code.lp}`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data?.html) setHtmlPreview(data.html)
        if (Array.isArray(data?.uniqueNumbers)) setUniqueNumbers(data.uniqueNumbers)
      })
      .catch(() => {})
  }, [code])

  return (
    <main className="container min-h-screen flex flex-col items-center justify-center py-8">
      <div className="text-center space-y-8 max-w-2xl">
        {/* לוגו */}
        <div className="logo">
          <Image
            src="/logo.svg"
            alt="Awakening by Ksenia Logo"
            width={250}
            height={125}
            className="mx-auto"
          />
        </div>

        {/* הודעת תודה */}
        <div className="bg-ivory/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gold/30">
          <div className="mb-6">
            <h1 className="text-cacao text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-slogan), serif' }}>תודה על הרכישה!</h1>
          </div>

          <div className="space-y-6 text-lg">
            <p className="text-espresso font-bold">התשלום התקבל בהצלחה</p>
            <p className="text-text-secondary">הפירוש הנומרולוגי האישי שלך כבר בדרכך אליך למייל.</p>

            {/* קוד המספרים בפיל לבן */}
            {code.bd && code.bm && code.by && code.lp ? (
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'BD', value: code.bd },
                  { label: 'BM', value: code.bm },
                  { label: 'BY', value: code.by },
                  { label: 'LP', value: code.lp },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-espresso px-3 py-3 border border-espresso/30 shadow-sm">
                    <div className="text-pearl/80 text-xs mb-1">{item.label}</div>
                    <div className="text-white text-2xl font-extrabold leading-none">{item.value}</div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="bg-gold/10 rounded-xl p-6 text-espresso">
              <h2 className="font-bold mb-3">מה קורה עכשיו?</h2>
              <ul className="text-right space-y-2">
                <li>אנחנו יוצרים עבורך פירוש מותאם אישי</li>
                <li>הפירוש יישלח למייל תוך 5-10 דקות</li>
                <li>תקבל קובץ HTML/‏PDF עם הפירושים למספרים שלך</li>
                <li>הפירוש נשמר אצלך לתמיד</li>
              </ul>
            </div>

            <p className="text-text-secondary text-base">אם לא קיבלת את המייל תוך 15 דקות, בדוק גם בתיקיית הספאם</p>
          </div>
        </div>

        {/* תצוגת פירוש מדויקת מהמקור */}
        {htmlPreview && (
          <div className="max-w-3xl w-full bg-ivory/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gold/30 text-right">
            <h2 className="text-cacao text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-slogan), serif' }}>תקציר הפירוש שלך</h2>
            <div className="text-sm text-text-secondary mb-2">מספרים ייחודיים: {uniqueNumbers.join(', ')}</div>
            <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
            <div className="mt-6 flex gap-3">
              <a
                className="btn bg-gold hover:bg-gold-deep px-6 py-3 font-bold"
                href={`/api/interpretation?bd=${code.bd}&bm=${code.bm}&by=${code.by}&lp=${code.lp}&download=1&source=1`}
              >
                הורדת המסמך (HTML)
              </a>
            </div>
          </div>
        )}

        {/* חתימה */}
        <div className="signature">
          <Image src="/signature.svg" alt="Ksenia Signature" width={150} height={75} className="mx-auto" />
        </div>

        {/* כפתורי פעולה */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/" className="ripple bg-espresso hover:bg-gold-deep text-ivory px-6 py-3 rounded-lg font-bold transition-colors duration-300 text-center">
            חזרה לעמוד הבית
          </a>
        </div>

        <div className="text-text-secondary text-sm">
          <p>שאלות? צור קשר במייל או בווטסאפ</p>
        </div>
      </div>
    </main>
  )
}

export default function ThankYou() {
  return (
    <Suspense fallback={<main className="container min-h-screen flex items-center justify-center"><div className="text-text-secondary">טוען...</div></main>}>
      <ThankYouContent />
    </Suspense>
  )
}
