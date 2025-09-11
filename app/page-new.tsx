import Image from 'next/image'

export default function Home() {
  return (
    <main className="container min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-8 slide-up">
        {/* לוגו */}
        <div className="logo animate-logo-entrance">
          <Image
            src="/newlogos/logo.png"
            alt="Awakening by Ksenia Logo"
            width={200}
            height={100}
            className="mx-auto"
            priority
          />
        </div>

        {/* כותרת ראשית */}
        <h1 className="text-gold-deep text-4xl md:text-5xl font-bold animate-fade-in">
          התעוררות
        </h1>

        {/* תת כותרת */}
        <h2 className="text-gold text-xl md:text-2xl font-medium animate-fade-in">
          חישוב קוד נומרולוגי אישי
        </h2>

        {/* תיאור */}
        {/* היה: גלה את המשמעות הנומרולוגית שלך ופתח שער להבנה עמוקה יותר של עצמך */}
        <p className="text-text-secondary text-lg max-w-2xl mx-auto px-4 animate-fade-in">
          גלו את המשמעות הנומרולוגית שלכם ופתחו שער להבנה עמוקה יותר על עצמכם
        </p>

        {/* כפתור */}
        {/* היה: חשבי קוד כסף ✨ */}
        <a
          href="/money-code"
          className="inline-block btn bg-gold hover:bg-gold-deep text-charcoal px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 animate-fade-in"
        >
          חשבו קוד כסף
        </a>

        <p className="text-text-secondary text-sm animate-fade-in">
          פירוש מלא ומותאם אישית - 97₪
        </p>

        {/* חתימה */}
        <div className="signature mt-12 animate-fade-in">
          <Image
            src="/newlogos/sig.png"
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
