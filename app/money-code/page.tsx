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

  // פונקציה לצמצום מספר לספרה אחת
  const reduceToSingleDigit = (num: number): number => {
    while (num >= 10 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    }
    return num
  }

  // חישוב קוד הכסף
  const calculateMoneyCode = () => {
    if (!birthDate) return

    setIsLoading(true)
    
    const date = new Date(birthDate)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    // חישוב הקודים
    const bd = reduceToSingleDigit(day)
    const bm = reduceToSingleDigit(month)
    const by = reduceToSingleDigit(year)
    
    // Life Path - צמצום כל התאריך
    const allDigits = (day + month + year).toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    const lp = reduceToSingleDigit(allDigits)

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
  business_tagline: 'Personal Space for Growht. Unlock Your Inner Light.',
  logo_url: `${window.location.origin}/icon.svg`
    })
    
    // מעבר לקישור התשלום
    window.open(`https://mrng.to/NzYedNr0Ku?${params.toString()}`, '_blank')
  }

  return (
    <main className="container min-h-screen py-8 px-4">
      <div className="text-center space-y-10 max-w-4xl mx-auto">
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
        <div className="mt-4 mb-8">
          <Image 
            src="/moneycodelable.svg" 
            alt="Money Code Calculator" 
            width={480} 
            height={120} 
            className="mx-auto drop-shadow-[0_4px_20px_rgba(167,131,90,0.2)]" 
          />
        </div>

        {/* כרטיס המחשבון */}
        <div className="max-w-md mx-auto bg-ivory/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gold/15">
          <div className="space-y-8">
            {/* קלט תאריך לידה */}
            <div>
              <label className="block text-espresso text-lg font-semibold mb-4">
                תאריך לידה
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-gold/25 bg-ivory text-espresso text-center font-medium focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all shadow-sm"
                dir="ltr"
              />
            </div>

            {/* כפתורים */}
            <div className="space-y-4">
              <button
                onClick={calculateMoneyCode}
                disabled={!birthDate || isLoading}
                className="w-full bg-ivory hover:bg-gold/25 disabled:opacity-50 disabled:cursor-not-allowed py-4 px-6 text-lg font-semibold transition-all duration-300 border border-gold/25 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] text-espresso"
              >
                {isLoading ? 'מחשב...' : 'חשב קוד כסף'}
              </button>
              
              <button
                onClick={clearData}
                className="w-full bg-ivory hover:bg-gold/20 text-espresso py-3 px-6 rounded-xl font-medium transition-all duration-300 border border-gold/20 shadow-md hover:shadow-lg"
              >
                נקה נתונים
              </button>
            </div>
          </div>
        </div>        {/* תוצאה */}
        {result && (
          <div className="max-w-lg mx-auto bg-ivory/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gold/15 animate-fade-in">
            <h2 className="text-espresso text-2xl font-semibold mb-8">הקוד שלך</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-ivory rounded-2xl p-6 border border-gold/20 shadow-md">
                <div className="text-espresso font-semibold text-sm mb-2">BD (יום)</div>
                <div className="text-4xl font-bold text-espresso">{result.bd}</div>
              </div>
              <div className="bg-ivory rounded-2xl p-6 border border-gold/20 shadow-md">
                <div className="text-espresso font-semibold text-sm mb-2">BM (חודש)</div>
                <div className="text-4xl font-bold text-espresso">{result.bm}</div>
              </div>
              <div className="bg-ivory rounded-2xl p-6 border border-gold/20 shadow-md">
                <div className="text-espresso font-semibold text-sm mb-2">BY (שנה)</div>
                <div className="text-4xl font-bold text-espresso">{result.by}</div>
              </div>
              <div className="bg-ivory rounded-2xl p-6 border border-gold/20 shadow-md">
                <div className="text-espresso font-semibold text-sm mb-2">LP (נתיב חיים)</div>
                <div className="text-4xl font-bold text-espresso">{result.lp}</div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-text-secondary mb-8 text-lg leading-relaxed">
                רוצה לקבל פירוש מלא ואישי של הקוד שלך?
              </p>
              
              <button
                onClick={handlePayment}
                className="bg-ivory hover:bg-gold/25 text-espresso border border-gold/25 px-10 py-5 text-xl font-bold transition-all duration-300 hover:scale-105 rounded-2xl shadow-lg hover:shadow-xl"
              >
                קבל פירוש מלא - 97₪
              </button>
              
              <p className="text-text-secondary text-sm mt-6 leading-relaxed">
                הפירוש יישלח אליך למייל תוך דקות ספורות
              </p>
            </div>
          </div>
        )}

        {/* כפתור חזרה */}
        <div className="pt-12">
          <a
            href="/"
            className="inline-block font-bold bg-ivory hover:bg-gold/25 text-espresso border border-gold/20 px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            ← חזרה לעמוד הבית
          </a>
        </div>
      </div>
    </main>
  )
}
