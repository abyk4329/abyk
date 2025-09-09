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

            {/* הודעה על שליחת מייל */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-espresso">
              <div className="flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-green-600 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <h2 className="font-bold text-lg">📧 המייל בדרך אליך!</h2>
              </div>
              <p className="text-center mb-4 font-semibold">הפירוש האישי שלך נשלח למייל תוך 2-5 דקות</p>
              <div className="text-sm text-center">
                <p className="mb-2">✉️ תקבל מייל מעוצב עם הפירושים המלאים</p>
                <p className="mb-2">💻 ניתן לצפות ולהוריד ישירות מהאתר למטה</p>
                <p>📱 הפירוש נשמר אצלך לתמיד</p>
              </div>
            </div>

            {/* אזהרת ספאם וצור קשר */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 font-semibold mb-3 text-center">⏰ עברו 15 דקות והמייל עדיין לא הגיע?</p>
              <div className="space-y-2 text-amber-700 text-sm">
                <p>✓ בדוק בתיקיית הספאם/זבל</p>
                <p>✓ וודא שהכתובת נכונה</p>
                <p>✓ או צור קשר איתנו:</p>
              </div>
              
              {/* כפתורי קשר */}
              <div className="flex justify-center gap-4 mt-4">
                <a 
                  href="mailto:awakening.by.ksenia@gmail.com?subject=לא קיבלתי מייל עם הפירוש&body=שלום, הזמנתי פירוש נומרולוגי אבל לא קיבלתי מייל. אודה לעזרה."
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  שלח מייל
                </a>
                
                <a 
                  href="https://wa.me/972524616121?text=שלום, הזמנתי פירוש נומרולוגי אבל לא קיבלתי מייל. אודה לעזרה 🙏"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  וואטסאפ
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* תצוגה והורדה של הפירוש */}
        {htmlPreview && (
          <div className="max-w-4xl w-full">
            {/* כפתורי פעולה למעלה */}
            <div className="bg-gradient-to-r from-gold/20 to-amber/20 rounded-2xl p-6 mb-6 border border-gold/30">
              <h2 className="text-cacao text-2xl font-bold mb-4 text-center" style={{ fontFamily: 'var(--font-slogan), serif' }}>
                📖 הפירוש שלך מוכן!
              </h2>
              
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                <a
                  className="flex items-center gap-2 bg-gold hover:bg-gold-deep text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-lg"
                  href={`/api/interpretation?bd=${code.bd}&bm=${code.bm}&by=${code.by}&lp=${code.lp}&download=1&source=1`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  הורד כקובץ HTML
                </a>
                
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" />
                  </svg>
                  הדפס
                </button>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'הפירוש הנומרולוגי שלי',
                        text: `הפירוש הנומרולוגי האישי שלי - המספרים: ${code.bd}, ${code.bm}, ${code.by}, ${code.lp}`,
                        url: window.location.href
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                      alert('הקישור הועתק ללוח!')
                    }
                  }}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.84,2.84 0 0,0 18,16.08Z" />
                  </svg>
                  שתף
                </button>
              </div>
              
              <div className="text-center text-sm text-espresso/70">
                <p>💡 <strong>טיפ:</strong> המספרים הייחודיים שלך: <span className="font-bold text-gold">{uniqueNumbers.join(', ')}</span></p>
                <p>שמור את הקישור הזה - הפירוש יישאר זמין כאן לתמיד!</p>
              </div>
            </div>

            {/* תצוגת הפירוש */}
            <div className="bg-ivory/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gold/30 text-right">
              <div className="max-h-96 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
              </div>
              
              <div className="mt-6 pt-4 border-t border-gold/30 text-center">
                <p className="text-text-secondary text-sm mb-3">
                  רוצה לראות את הפירוש המלא? גלול למעלה או הורד את הקובץ
                </p>
                <a
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-deep font-semibold"
                  href={`/api/interpretation?bd=${code.bd}&bm=${code.bm}&by=${code.by}&lp=${code.lp}&source=1`}
                  target="_blank"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                  </svg>
                  פתח בחלון נפרד
                </a>
              </div>
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
