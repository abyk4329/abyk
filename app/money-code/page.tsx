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
      birthDate: birthDate
    })
    
    // מעבר לקישור התשלום
    window.open(`https://mrng.to/NzYedNr0Ku?${params.toString()}`, '_blank')
  }

  return (
    <main className="container min-h-screen py-8">
      <div className="text-center space-y-8">
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

        {/* כותרת */}
        <h1 className="text-gold-deep text-3xl md:text-4xl font-bold">
          מחשבון קוד הכסף
        </h1>

        {/* חתימה */}
        <div className="signature">
          <Image
            src="/signature.svg"
            alt="Ksenia Signature"
            width={120}
            height={60}
            className="mx-auto mb-8"
          />
        </div>

        {/* כרטיס המחשבון */}
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gold/20">
          <div className="space-y-6">
            {/* קלט תאריך לידה */}
            <div>
              <label className="block text-gold-deep text-lg font-semibold mb-3">
                תאריך לידה
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-ivory/90 text-charcoal text-center font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                dir="ltr"
              />
            </div>

            {/* כפתורים */}
            <div className="space-y-4">
              <button
                onClick={calculateMoneyCode}
                disabled={!birthDate || isLoading}
                className="w-full btn bg-gold hover:bg-gold-deep disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg font-semibold transition-all duration-300"
              >
                {isLoading ? 'מחשב...' : 'חשב קוד כסף'}
              </button>
              
              <button
                onClick={clearData}
                className="w-full bg-text-secondary hover:bg-charcoal text-ivory py-3 rounded-lg font-medium transition-colors duration-300"
              >
                נקה נתונים
              </button>
            </div>
          </div>
        </div>

        {/* תוצאה */}
        {result && (
          <div className="max-w-lg mx-auto bg-white/15 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gold/30 animate-fade-in">
            <h2 className="text-gold-deep text-2xl font-bold mb-6">הקוד שלך</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gold/10 rounded-xl p-4">
                <div className="text-gold-deep font-bold text-sm">BD (יום)</div>
                <div className="text-3xl font-bold text-charcoal">{result.bd}</div>
              </div>
              <div className="bg-gold/10 rounded-xl p-4">
                <div className="text-gold-deep font-bold text-sm">BM (חודש)</div>
                <div className="text-3xl font-bold text-charcoal">{result.bm}</div>
              </div>
              <div className="bg-gold/10 rounded-xl p-4">
                <div className="text-gold-deep font-bold text-sm">BY (שנה)</div>
                <div className="text-3xl font-bold text-charcoal">{result.by}</div>
              </div>
              <div className="bg-gold/10 rounded-xl p-4">
                <div className="text-gold-deep font-bold text-sm">LP (נתיב חיים)</div>
                <div className="text-3xl font-bold text-charcoal">{result.lp}</div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-text-secondary mb-6 text-lg">
                רוצה לקבל פירוש מלא ואישי של הקוד שלך?
              </p>
              
              <button
                onClick={handlePayment}
                className="btn bg-gold hover:bg-gold-deep px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105"
              >
                קבל פירוש מלא - 97₪
              </button>
              
              <p className="text-text-secondary text-sm mt-4">
                הפירוש יישלח אליך למייל תוך דקות ספורות
              </p>
            </div>
          </div>
        )}

        {/* כפתור חזרה */}
        <div className="pt-8">
          <a
            href="/"
            className="inline-block ripple font-bold bg-charcoal hover:bg-gold-deep text-ivory px-6 py-3 rounded-lg transition-colors duration-300"
          >
            ← חזרה לעמוד הבית
          </a>
        </div>
      </div>
    </main>
  )
}
