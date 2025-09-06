import Image from 'next/image'

export default function Home() {
  return (
    <main className="container min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center py-16">
      <div className="space-y-8 slide-up">
        {/* לוגו */}
        <div className="logo animate-logo-entrance">
          <Image
            src="/logo.svg"
            alt="Awakening by Ksenia Logo"
            width={200}
            height={100}
            className="mx-auto"
            priority
          />
        </div>

        {/* סיסמה ראשית */}
        <h1 className="text-gold-deep text-4xl md:text-5xl font-bold animate-fade-in energy-pulse">
          המרחב האישי לצמיחה
        </h1>

        {/* תת סיסמה */}
        <h2 className="text-text-secondary text-xl md:text-2xl font-medium animate-fade-in typing-caret">
          כלים עדינים ומדויקים להתחברות פנימה
        </h2>

        {/* תיאור */}
        <p className="text-text-secondary text-lg max-w-2xl mx-auto px-4 animate-fade-in">
          גלו את המשמעות הנומרולוגית שלכם ופתחו שער להבנה עמוקה יותר של עצמכם
        </p>

        {/* כפתור */}
        <a
          href="/money-code"
          className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-b from-champagne to-gold text-charcoal px-10 py-3 text-lg font-semibold shadow-[0_8px_30px_rgba(198,161,112,0.25)] hover:from-gold hover:to-gold-deep hover:text-ivory transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold ring-offset-2 ring-offset-ivory active:translate-y-[1px] animate-fade-in ripple"
        >
          <span className="relative z-10">חשב קוד</span>
        </a>

        <p className="text-text-secondary text-sm animate-fade-in">
          פירוש מלא ומותאם אישית - 97₪
        </p>

        {/* חתימה */}
        <div className="signature mt-12 animate-fade-in">
          <Image
            src="/signature.svg"
            alt="Ksenia Signature"
            width={150}
            height={75}
            className="mx-auto"
          />
        </div>
      </div>
    </main>
  )
}
