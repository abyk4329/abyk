import Image from 'next/image'

export default function Home() {
  return (
    <main className="container min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center py-12 px-4">
  <div className="space-y-10 md:space-y-12 slide-up max-w-4xl mx-auto">
        {/* לוגו גדול יותר */}
        <div className="logo animate-logo-entrance">
          <Image
            src="/logo.svg"
            alt="Awakening by Ksenia Logo"
            width={520}
            height={240}
            className="mx-auto drop-shadow-[0_6px_30px_rgba(167,131,90,0.25)]"
            priority
          />
        </div>

        {/* סלוגן כ-SVG במקום טקסט */}
        <div className="max-w-[700px] md:max-w-[820px] mx-auto px-4">
          <Image
            src="/slogan.svg"
            alt="Unlock Your Inner Light"
            width={820}
            height={180}
            className="mx-auto opacity-95 drop-shadow-[0_8px_24px_rgba(167,131,90,0.20)] slogan-shadow float-y"
            priority
          />
        </div>

        {/* כפתור */}
        <a
          href="/money-code"
          className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-b from-champagne to-gold text-espresso px-9 py-3 text-lg font-semibold shadow-[0_6px_22px_rgba(167,131,90,0.22)] hover:from-gold hover:to-gold-deep hover:text-ivory transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold ring-offset-2 ring-offset-ivory active:translate-y-[1px] animate-fade-in ripple mt-2"
        >
          <span className="relative z-10">מחשבון קוד הכסף</span>
        </a>
      </div>
    </main>
  )
}
