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

  const code = useMemo(() => {
    const bd = Number(searchParams.get('bd') || '0')
    const bm = Number(searchParams.get('bm') || '0')
    const by = Number(searchParams.get('by') || '0')
    const lp = Number(searchParams.get('lp') || '0')
    return { bd, bm, by, lp }
  }, [searchParams])

  useEffect(() => {
    if (!code.bd || !code.bm || !code.by || !code.lp) return
    const url = `/api/interpretation?bd=${code.bd}&bm=${code.bm}&by=${code.by}&lp=${code.lp}`
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
        <div className="bg-pearl/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pearl-soft">
          <div className="mb-6">
            <h1 className="text-espresso text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-slogan), serif' }}>תודה על הרכישה!</h1>
          </div>

          <div className="space-y-6 text-lg">
            <p className="text-espresso font-bold">התשלום התקבל בהצלחה</p>
            
            <p className="text-text-secondary">
              הפירוש הנומרולוגי האישי שלך כבר בדרך אליך למייל.
            </p>
            
            <div className="bg-pearl/50 rounded-xl p-6 text-espresso border border-pearl-soft">
              <h2 className="font-bold mb-3">מה קורה עכשיו?</h2>
              <ul className="text-right space-y-2">
                <li>אנחנו יוצרים עבורך פירוש מותאם אישית</li>
                <li>הפירוש יישלח למייל תוך 5-10 דקות</li>
                <li>תקבלי קובץ HTML/‏PDF עם הפירושים למספרים שלך</li>
                <li>הפירוש נשמר אצלך לתמיד</li>
              </ul>
            </div>

            <p className="text-text-secondary text-base">
              אם לא קיבלת את המייל תוך 15 דקות, בדקי גם בתיקיית הספאם
            </p>
          </div>
        </div>

        {/* תצוגת פירוש מקומי לפי המספרים הייחודיים */}
        {htmlPreview && (
          <div className="max-w-3xl w-full bg-pearl/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pearl-soft text-right">
            <h2 className="text-espresso text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-slogan), serif' }}>תקציר הפירוש שלך</h2>
            <div className="text-sm text-text-secondary mb-2">
              מספרים ייחודיים: {uniqueNumbers.join(', ')}
            </div>
            <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
            <div className="mt-6 flex gap-3">
              <a
                className="bg-pearl hover:bg-pearl-soft border border-pearl-soft px-6 py-3 font-bold text-espresso rounded-lg transition-all duration-300"
                href={`/api/interpretation?bd=${code.bd}&bm=${code.bm}&by=${code.by}&lp=${code.lp}&download=1`}
              >
                הורדת המסמך (HTML)
              </a>
            </div>
          </div>
        )}

  {/* חתימה */}
        <div className="signature">
          <Image
            src="/signature.svg"
            alt="Ksenia Signature"
            width={150}
            height={75}
            className="mx-auto"
          />
        </div>

        {/* כפתורי פעולה */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="bg-espresso hover:bg-espresso/90 text-pearl px-6 py-3 rounded-lg font-bold transition-all duration-300 text-center border border-espresso/20 shadow-md"
          >
            חזרה לעמוד הבית
          </a>
          
          <a
            href="/numbersmeaning"
            className="bg-pearl hover:bg-pearl-soft text-espresso px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-pearl-soft shadow-md"
          >
            קראי על פירוש המספרים
          </a>
        </div>

        <div className="text-text-secondary text-sm">
          <p>שאלות? צרי קשר במייל או בוואטסאפ</p>
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
