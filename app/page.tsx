import Image from 'next/image'

export default function Home() {
  return (
    <main className="container min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center py-4 px-4">
      <div className="max-w-4xl mx-auto space-y-0 slide-up">
        {/* לוגו */}
        <div className="logo animate-logo-entrance">
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
        <div className="max-w-[700px] md:max-w-[820px] mx-auto px-2 -mt-12 md:-mt-16">
          <Image
            src="/slogan.svg"
            alt="Unlock Your Inner Light"
            width={700}
            height={100}
            className="mx-auto slogan-shadow float-y"
            priority
          />
        </div>

        {/* טקסט הזמנה */}
        <div className="pt-8 pb-4">
          <p className="text-subtitle text-depth-light emphasis-gold tracking-wide animate-fade-in">
            גלו את קוד העושר האישי שלכם
          </p>
        </div>

        {/* כפתור */}
        <div className="pt-2">
          <a
            href="/money-code"
            className="btn-shine group relative inline-flex items-center justify-center rounded-full bg-gradient-to-b from-sand-100 to-stone-soft text-espresso px-8 py-3 text-base md:text-lg font-semibold shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:from-stone-soft hover:to-stone-soft hover:text-cacao transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold ring-offset-2 ring-offset-ivory active:translate-y-[1px] animate-fade-in ripple"
          >
            <span className="relative z-10">מחשבון קוד העושר</span>
          </a>
        </div>
      </div>
    </main>
  )
}
