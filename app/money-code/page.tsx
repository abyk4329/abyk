'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function MoneyCode() {
  const [birthDate, setBirthDate] = useState('')
  const [result, setResult] = useState<{
    bd: number;
    bm: number;
    by: number;
    lp: number;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ISO-only date parsing (YYYY-MM-DD). Throws on invalid input.
  const parseISODate = (iso: string) => {
    const m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(iso)
    if (!m) throw new Error('Invalid date format. Use YYYY-MM-DD')
    const y = m[1], mo = m[2], d = m[3]
    const year = Number(y), month = Number(mo), day = Number(d)
    // Validate using JS Date to catch impossible dates (e.g., 2025-02-30)
    const dt = new Date(Date.UTC(year, month - 1, day))
    const valid = dt.getUTCFullYear() === year && dt.getUTCMonth() === (month - 1) && dt.getUTCDate() === day
    if (!valid) throw new Error('Invalid date values')
    return { year, month, day }
  }

  // Reduce to single digit 1–9 only
  const reduceToSingleDigit = (num: number): number => {
    num = Math.abs(num)
    while (num >= 10) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0)
    }
    return num
  }

  // חישוב קוד הכסף
  const calculateMoneyCode = () => {
    if (!birthDate) return

    setIsLoading(true)
    setError(null)
    
    let year = 0, month = 0, day = 0
    try {
      const d = parseISODate(birthDate)
      year = d.year; month = d.month; day = d.day
    } catch {
      setIsLoading(false)
      setError('תאריך לא תקין. פורמט נדרש YYYY-MM-DD')
      return
    }

    // חישוב הקודים
    const bd = reduceToSingleDigit(day)
    const bm = reduceToSingleDigit(month)
    const by = reduceToSingleDigit(year)
    
    // Life Path - צמצום כל התאריך
    const allDigits = (day + month + year).toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0)
    const lp = reduceToSingleDigit(allDigits)

    // Validate results 1–9 only
    const isValid = (...vals: number[]) => vals.every(v => Number.isInteger(v) && v >= 1 && v <= 9)
    if (!isValid(bd, bm, by, lp)) {
      setIsLoading(false)
      setError('רק מספרים 1–9 מותרים. אנא בדוק את התאריך שהוזן.')
      return
    }

    setTimeout(() => {
      setResult({ bd, bm, by, lp })
      setIsLoading(false)
    }, 1000)
  }

  const clearData = () => {
    setBirthDate('')
    setResult(null)
    setError(null)
  }

  const handlePayment = () => {
    if (!result || !birthDate) return
    
    // יצירת URL עם הפרמטרים לתשלום
    const params = new URLSearchParams({
      bd: result.bd.toString(),
      bm: result.bm.toString(),
      by: result.by.toString(),
      lp: result.lp.toString(),
  birthDate: birthDate,
  // כתובת החזרה לאחר תשלום מוצלח
  return_url: `${window.location.origin}/thank-you?bd=${result.bd}&bm=${result.bm}&by=${result.by}&lp=${result.lp}`,
  business_name: 'Awakening by Ksenia',
  business_tagline: 'Personal Space for Growth. Unlock Your Inner Light.',
  logo_url: `${window.location.origin}/icon.svg`
    })
    
    // מעבר לקישור התשלום
    window.open(`https://pay.grow.link/7ec8e239e21b225640340c6821c3d7a5-MjQ2MDA0Nw?${params.toString()}`, '_blank')
  }

  return (
    <main className="container min-h-screen px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-8 text-center">
        {/* לוגו */}
        <div className="logo">
          <Image
            src="/logo.svg"
            alt="Awakening by Ksenia Logo"
            width={250}
            height={125}
            className="mx-auto"
            priority
          />
        </div>

        {/* תווית SVG לכותרת */}
        <div className="mt-3 mb-6 animate-gleam-fade-in">
          <Image 
            src="/moneycodelable.svg" 
            alt="Money Code Calculator" 
            width={400} 
            height={100} 
            className="mx-auto drop-shadow-[0_3px_10px_rgba(167,131,90,0.15)]" 
          />
        </div>

        {/* כרטיס המחשבון */}
        <div className="max-w-md p-8 mx-auto border-2 shadow-md bg-ivory/90 backdrop-blur-sm rounded-2xl border-sand-100/60">
          <div className="space-y-6">
            {/* קלט תאריך לידה */}
            <div>
              <label className="block mb-3 text-sm font-medium text-espresso/90">
                הכניסו את תאריך הלידה שלכם
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 font-normal text-center transition-all border-2 rounded-lg shadow-sm border-sand-100/50 bg-ivory-soft text-espresso focus:outline-none focus:ring-1 focus:ring-sand-100 focus:border-sand-100"
                dir="ltr"
                aria-label="תאריך לידה"
              />
            </div>

            {/* הודעת שגיאה */}
            {error && (
              <div className="p-3 text-center border rounded-lg bg-red-50 border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* כפתורים */}
            <div className="space-y-3">
              <button
                onClick={calculateMoneyCode}
                disabled={!birthDate || isLoading}
                className="w-full px-5 py-3 text-sm font-medium transition-all duration-300 border-2 rounded-lg shadow-sm btn-shine bg-sand-100/50 hover:bg-sand-100/80 disabled:opacity-50 disabled:cursor-not-allowed border-sand-100/80 hover:shadow-md text-espresso"
                aria-label="חשב קוד כסף"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-espresso/30 border-t-espresso rounded-full animate-spin"></div>
                    מחשבים...
                  </div>
                ) : (
                  'קבלו את הקוד האישי שלכם'
                )}
              </button>
              
              <button
                onClick={clearData}
                className="w-full px-5 py-2 text-xs font-normal transition-all duration-300 border rounded-lg shadow-sm bg-ivory/80 hover:bg-ivory text-espresso/70 border-sand-100/30 hover:border-sand-100/50 hover:shadow-md hover:text-espresso"
                aria-label="נקה נתונים"
              >
                ניקוי שדות
              </button>
            </div>
          </div>
        </div>        {/* תוצאה */}
        {result && (
          <div className="max-w-lg p-6 mx-auto border-2 shadow-md bg-ivory/90 backdrop-blur-sm rounded-xl border-sand-100/60 animate-fade-in">
            <h2 className="mb-5 text-lg font-medium text-cacao animate-gleam-fade-in">הקוד האישי שלכם</h2>
            
            {/* תצוגת הקוד בשורה אחת */}
            <div className="p-5 mb-8 text-center border-2 rounded-lg shadow-md bg-ivory-soft/95 backdrop-blur-sm border-sand-100/60 animate-slide-up">
              <div className="font-mono text-5xl font-light tracking-wider text-cacao">
                {result.bd}{result.bm}{result.by}{result.lp}
              </div>
            </div>

            {/* הסבר איך להשתמש בקוד */}
            <div className="p-6 mb-8 border rounded-lg shadow-sm bg-ivory-soft/80 backdrop-blur-sm border-sand-100/40 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="mb-5 text-base font-medium text-center text-cacao">איך להשתמש בקוד שלכם</h3>
              
              <div className="mb-6 space-y-3 text-right">
                <div className="flex items-start gap-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <div className="w-4 h-4 rounded-full bg-sand-100/30 border border-sand-100/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cacao/60"></div>
                  </div>
                  <div className="text-xs leading-relaxed text-text-secondary">
                    <span className="text-cacao font-medium">קוד סודי:</span> השתמשו במספרים כקוד סודי לכרטיסים, סיסמאות או נעילת מכשירים
                  </div>
                </div>
                
                <div className="flex items-start gap-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <div className="w-4 h-4 rounded-full bg-sand-100/30 border border-sand-100/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cacao/60"></div>
                  </div>
                  <div className="text-xs leading-relaxed text-text-secondary">
                    <span className="text-cacao font-medium">בארנק:</span> כתבו את הקוד על פתק קטן ושימו בארנק לאנרגיית שפע
                  </div>
                </div>
                
                <div className="flex items-start gap-2 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                  <div className="w-4 h-4 rounded-full bg-sand-100/30 border border-sand-100/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cacao/60"></div>
                  </div>
                  <div className="text-xs leading-relaxed text-text-secondary">
                    <span className="text-cacao font-medium">מדיטציה יומית:</span> חזרו על הקוד בראש כמנטרה אישית לעוצמה פנימית
                  </div>
                </div>
              </div>
              
              <div className="pt-5 text-center border-t border-sand-100/40 animate-fade-in" style={{ animationDelay: '1s' }}>
                <h4 className="mb-3 text-sm font-medium text-cacao">למה הפירוש המלא חשוב?</h4>
                <div className="space-y-2 text-xs leading-relaxed text-text-secondary">
                  <p>
                    <span className="text-cacao font-medium">הקוד הוא רק ההתחלה.</span> הפירוש המלא חושף את המשמעות הנומרולוגית העמוקה של כל מספר באופן אישי ומותאם.
                  </p>
                  <p>
                    גלו את <span className="text-cacao font-medium">הכוחות הפנימיים</span> שלכם, את <span className="text-cacao font-medium">האתגרים הייחודיים</span> שאתם מתמודדים איתם, ואת <span className="text-cacao font-medium">הדרך המושלמת</span> להשתמש באנרגיה שלכם למשיכת שפע ופרנסה.
                  </p>
                  <p>
                    זה לא סתם מספרים - זו <span className="text-cacao font-medium">מפת דרכים אישית</span> להתפתחות רוחנית וחומרית.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <p className="mb-6 text-sm leading-relaxed text-cacao/80 animate-gleam-fade-in">
                רוצים לקבל פירוש מלא ואישי של הקוד שלכם?
              </p>
              
              <button
                onClick={handlePayment}
                className="px-8 py-3 text-base font-medium transition-all duration-300 border-2 shadow-md bg-sand-100/50 hover:bg-sand-100/80 text-espresso border-sand-100/80 hover:scale-[1.02] rounded-lg hover:shadow-lg"
                aria-label="קבל פירוש מלא"
              >
                קבלו פירוש מלא - 36.9₪
              </button>
              
              <p className="mt-4 text-xs leading-relaxed text-text-secondary animate-gleam-fade-in">
                הפירוש יישלח אליכם למייל תוך דקות ספורות
              </p>
            </div>
          </div>
        )}

        {/* כפתור חזרה */}
        <div className="pt-8">
          <a
            href="/"
            className="inline-block px-6 py-2 text-sm font-normal transition-all duration-300 border rounded-lg shadow-sm bg-ivory/80 hover:bg-ivory text-espresso/80 hover:text-espresso border-sand-100/30 hover:border-sand-100/50 hover:shadow-md"
          >
            ← חזרה לעמוד הבית
          </a>
        </div>
      </div>
    </main>
  )
}
