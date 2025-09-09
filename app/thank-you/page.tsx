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
            src="/newlogos/logo.png"
            alt="Awakening by Ksenia Logo"
            width={250}
            height={125}
            className="mx-auto"
          />
        </div>

        {/* הודעת תודה */}
  <div className="bg-ivory/90 backdrop-blur-sm rounded-2xl p-8 shadow-warm-md border border-beige-200">
          <div className="mb-6">
            <h1 className="text-cacao text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-slogan), serif' }}>תודה על הרכישה</h1>
          </div>

          <div className="space-y-6 text-lg">
            <p className="text-espresso font-bold">התשלום נקלט בהצלחה, והפירוש האישי שלך כבר מוכן</p>
            <p className="text-text-secondary">אפשר לעיין בו מיד כאן בעמוד, ובסוף הטקסט יופיע קישור נוח להורדה. במקביל נשלח אליך גם דוא״ל.</p>

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

            {/* הודעה מינימליסטית על המייל */}
            <div className="bg-ivory border border-beige-200 rounded-xl p-6 text-espresso shadow-warm-sm">
              <p className="text-center text-base leading-relaxed mb-4">
                אם חלפו יותר מ־15 דקות והמייל עדיין לא התקבל, 
                <span className="font-medium"> ניתן לפנות אליי ואשמח לעזור</span>.
              </p>
              
              {/* כפתורי קשר עם אייקונים */}
              <div className="flex justify-center gap-6">
                <a 
                  href="mailto:awakening.by.ksenia@gmail.com?subject=לא קיבלתי מייל עם הפירוש&body=שלום, הזמנתי פירוש נומרולוגי אבל לא קיבלתי מייל. אודה לעזרה."
                  className="text-smoky-brown hover:text-cacao transition-colors duration-200"
                  aria-label="דוא״ל"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                
                <a 
                  href="https://wa.me/972524616121?text=שלום, הזמנתי פירוש נומרולוגי אבל לא קיבלתי מייל. אודה לעזרה"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-smoky-brown hover:text-cacao transition-colors duration-200"
                  aria-label="וואטסאפ"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* תצוגה והורדה של הפירוש */}
        {htmlPreview && (
          <div className="max-w-4xl w-full">
            {/* אזור הפירוש */}
            <div className="bg-ivory border border-beige-200 rounded-xl p-6 mb-6 shadow-warm-sm">
              <h2 className="text-cacao text-2xl font-medium mb-4 text-center assistant-light" style={{ fontFamily: 'var(--font-slogan), serif' }}>
                הפירוש האישי שלך
              </h2>
              
              <div className="text-center text-sm text-espresso/60 mb-4">
                <span className="assistant-light">המספרים הייחודיים שלך: </span>
                <span className="font-medium text-cacao">{uniqueNumbers.join(', ')}</span>
              </div>
            </div>

            {/* תצוגת הפירוש */}
            <div className="bg-ivory/95 backdrop-blur-sm rounded-xl p-6 border border-beige-200 text-right shadow-warm-sm">
              <div className="prose prose-lg max-w-none" dir="rtl">
                <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
              </div>
              
              <div className="mt-8 pt-6 border-t border-gold/20 text-center">
                <a
                  className="assistant-regular text-espresso/80 hover:text-espresso underline decoration-gold/50 hover:decoration-gold transition-colors"
                  href={`/api/interpretation?bd=${code.bd}&bm=${code.bm}&by=${code.by}&lp=${code.lp}&download=1&source=1`}
                >
                  הורדת הפירוש המלא
                </a>
              </div>
            </div>
          </div>
        )}

        {/* כפתור שיתוף */}
  <div className="bg-ivory border border-beige-200 rounded-xl p-6 text-center shadow-warm-sm">
          <p className="text-espresso mb-4 text-lg font-medium">
            אהבתם את הפירוש וקיבלתם ערך?
          </p>
          <button
            className="px-6 py-3 text-base font-medium transition-all duration-300 border-2 rounded-xl text-accent-choco bg-gold-primary/20 hover:bg-gold-primary/30 border-gold-primary/50 shadow-warm-sm hover:shadow-warm-md has-sheen flex items-center gap-2 mx-auto"
            onClick={async () => {
              const data = { 
                title: 'פירוש נומרולוגי מקצועי - Awakening by Ksenia', 
                text: 'גיליתי את הפירוש הנומרולוגי האישי שלי! מדהים כמה זה מדויק ומעמיק 🌟', 
                url: 'https://awakening-by-ksenia-app.vercel.app/money-code'
              }
              if (navigator.share) {
                await navigator.share(data).catch(()=>{})
              } else {
                await navigator.clipboard.writeText(`${data.text} ${data.url}`)
                alert('הטקסט והקישור הועתקו! עכשיו אפשר להדביק בכל מקום')
              }
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186z" />
            </svg>
            <span>שתפו עם חברים</span>
          </button>
        </div>

        {/* חתימה */}
        <div className="signature">
          <Image src="/newlogos/sig.png" alt="Ksenia Signature" width={150} height={75} className="mx-auto" />
        </div>

        {/* כפתורי פעולה */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/" className="ripple bg-espresso hover:bg-gold-deep text-ivory px-6 py-3 rounded-lg font-bold transition-colors duration-300 text-center">
            חזרה לעמוד הבית
          </a>
        </div>

        <div className="text-text-secondary text-sm">
          <p>יש שאלות? ניתן ליצור קשר</p>
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
