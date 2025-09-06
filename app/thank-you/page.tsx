import Image from 'next/image'

export default function ThankYou() {
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
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gold/30">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-gold-deep text-3xl font-bold mb-4">תודה על הרכישה!</h1>
          </div>

          <div className="space-y-6 text-lg">
            <p className="text-charcoal">
              <strong>התשלום התקבל בהצלחה! 🎉</strong>
            </p>
            
            <p className="text-text-secondary">
              הפירוש הנומרולוגי האישי שלך כבר בדרך אליך למייל.
            </p>
            
            <div className="bg-gold/10 rounded-xl p-6 text-charcoal">
              <h2 className="font-bold mb-3">מה קורה עכשיו?</h2>
              <ul className="text-right space-y-2">
                <li>✨ אנחנו יוצרים עבורך פירוש מותאם אישית</li>
                <li>📧 הפירוש יישלח למייל תוך 5-10 דקות</li>
                <li>📄 תקבלי קובץ HTML עם כל הפירושים שלך</li>
                <li>💎 הפירוש נשמר אצלך לתמיד</li>
              </ul>
            </div>

            <p className="text-text-secondary text-base">
              אם לא קיבלת את המייל תוך 15 דקות, בדקי גם בתיקיית הספאם
            </p>
          </div>
        </div>

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
            className="btn bg-gold hover:bg-gold-deep text-charcoal px-6 py-3 rounded-lg font-medium transition-all duration-300"
          >
            חזרה לעמוד הבית
          </a>
          
          <a
            href="/numbersmeaning"
            className="bg-text-secondary hover:bg-charcoal text-ivory px-6 py-3 rounded-lg font-medium transition-colors duration-300"
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
