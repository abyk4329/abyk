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
    
    let year = 0, month = 0, day = 0
    try {
      const d = parseISODate(birthDate)
      year = d.year; month = d.month; day = d.day
  } catch {
      setIsLoading(false)
      alert('תאריך לא תקין. פורמט נדרש YYYY-MM-DD')
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
      alert('רק מספרים 1–9 מותרים. אנא בדוק את התאריך שהוזן.')
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
    window.open(`https://mrng.to/NzYedNr0Ku?${params.toString()}`, '_blank')
  }

  return (
    <main className="container min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-10 text-center">
        {/* לוגו */}
        <div className="logo">
          <Image
            src="/logo.svg"
            alt="Awakening by Ksenia Logo"
            width={300}
            height={150}
            className="mx-auto"
            priority
          />
        </div>

        {/* תווית SVG לכותרת */}
        <div className="mt-4 mb-8 animate-gleam-fade-in">
          <Image 
            src="/moneycodelable.svg" 
            alt="Money Code Calculator" 
            width={480} 
            height={120} 
            className="mx-auto drop-shadow-[0_4px_20px_rgba(167,131,90,0.2)]" 
          />
        </div>

        {/* כרטיס המחשבון */}
        <div className="max-w-md p-8 mx-auto border shadow-xl bg-ivory/95 backdrop-blur-sm rounded-3xl border-gold/15">
          <div className="space-y-8">
            {/* קלט תאריך לידה */}
            <div>
              <label className="block mb-4 text-lg font-semibold text-espresso">
                תאריך לידה
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-5 py-4 font-medium text-center transition-all border shadow-sm rounded-xl border-gold/25 bg-ivory text-espresso focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40"
                dir="ltr"
              />
            </div>

            {/* כפתורים */}
            <div className="space-y-4">
              <button
                onClick={calculateMoneyCode}
                disabled={!birthDate || isLoading}
                className="btn-shine w-full bg-ivory hover:bg-gold/25 disabled:opacity-50 disabled:cursor-not-allowed py-4 px-6 text-lg font-semibold transition-all duration-300 border border-gold/25 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] text-espresso"
              >
                {isLoading ? 'מחשב...' : 'חשב קוד כסף'}
              </button>
              
              <button
                onClick={clearData}
                className="w-full px-6 py-3 font-medium transition-all duration-300 border shadow-md btn-shine bg-ivory hover:bg-gold/20 text-espresso rounded-xl border-gold/20 hover:shadow-lg"
              >
                נקה נתונים
              </button>
            </div>
          </div>
        </div>        {/* תוצאה */}
        {result && (
          <div className="max-w-lg p-8 mx-auto border shadow-xl bg-ivory/95 backdrop-blur-sm rounded-3xl border-gold/15 animate-fade-in">
            <h2 className="mb-8 text-2xl font-semibold text-espresso animate-gleam-fade-in">הקוד שלך</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-6 border shadow-md bg-ivory rounded-2xl border-gold/20">
                <div className="mb-2 text-sm font-semibold text-espresso">BD (יום)</div>
                <div className="text-4xl font-bold text-espresso">{result.bd}</div>
              </div>
              <div className="p-6 border shadow-md bg-ivory rounded-2xl border-gold/20">
                <div className="mb-2 text-sm font-semibold text-espresso">BM (חודש)</div>
                <div className="text-4xl font-bold text-espresso">{result.bm}</div>
              </div>
              <div className="p-6 border shadow-md bg-ivory rounded-2xl border-gold/20">
                <div className="mb-2 text-sm font-semibold text-espresso">BY (שנה)</div>
                <div className="text-4xl font-bold text-espresso">{result.by}</div>
              </div>
              <div className="p-6 border shadow-md bg-ivory rounded-2xl border-gold/20">
                <div className="mb-2 text-sm font-semibold text-espresso">LP (נתיב חיים)</div>
                <div className="text-4xl font-bold text-espresso">{result.lp}</div>
              </div>
            </div>

            <div className="text-center">
              <p className="mb-8 text-lg leading-relaxed text-text-secondary animate-gleam-fade-in">
                רוצה לקבל פירוש מלא ואישי של הקוד שלך?
              </p>
              
              <button
                onClick={handlePayment}
                className="px-10 py-5 text-xl font-bold transition-all duration-300 border shadow-lg btn-shine bg-ivory hover:bg-gold/25 text-espresso border-gold/25 hover:scale-105 rounded-2xl hover:shadow-xl"
              >
                קבל פירוש מלא - 97₪
              </button>
              
              <p className="mt-6 text-sm leading-relaxed text-text-secondary animate-gleam-fade-in">
                הפירוש יישלח אליך למייל תוך דקות ספורות
              </p>
            </div>
          </div>
        )}

        {/* כפתור חזרה */}
        <div className="pt-12">
          <a
            href="/"
            className="inline-block px-8 py-4 font-bold transition-all duration-300 border shadow-lg btn-shine bg-ivory hover:bg-gold/25 text-espresso border-gold/20 rounded-2xl hover:shadow-xl hover:scale-105"
          >
            ← חזרה לעמוד הבית
          </a>
        </div>
      </div>
    </main>
  )
}
