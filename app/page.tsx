import Image from 'next/image'

export default function Home() {
  return (
    <main className="container min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center py-4 px-4">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-5 slide-up">
        {/* לוגו */}
        <div className="mb-0 logo animate-logo-entrance">
          <Image
            src="/logo.svg"
            alt="Awakening by Ksenia Logo"
            width={600}
            height={280}
            className="mx-auto drop-shadow-[0_6px_30px_rgba(167,131,90,0.25)]"
            priority
          />
        </div>

        {/* סלוגן כ-SVG במקום טקסט */}
        <div className="max-w-[700px] md:max-w-[820px] mx-auto px-2">
          <Image
            src="/slogan.svg"
            alt="Unlock Your Inner Light"
            width={700}
            height={100}
            className="mx-auto slogan-shadow float-y energy-pulse"
            priority
          />
        </div>

        {/* כפתור */}
        <div className="pt-2">
          <a
            href="/money-code"
            className="btn-shine group relative inline-flex items-center justify-center rounded-full bg-gradient-to-b from-champagne to-gold text-espresso px-8 py-3 text-base md:text-lg font-semibold shadow-[0_6px_22px_rgba(167,131,90,0.22)] hover:from-gold hover:to-gold-deep hover:text-ivory transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold ring-offset-2 ring-offset-ivory active:translate-y-[1px] animate-fade-in ripple"
          >
            <span className="relative z-10">מחשבון קוד הכסף</span>
          </a>
        </div>
      </div>
    </main>
  )
}
