import Image from 'next/image'

export default function Home() {
  return (
    <main className="container min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center py-16">
  <div className="space-y-8 slide-up">
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

        {/* סיסמה באנגלית */}
  <h1 className="text-cacao text-3xl md:text-5xl font-light animate-fade-in italic tracking-wide" style={{ fontFamily: 'var(--font-slogan), serif' }}>
          Personal Space for Growth
        </h1>
  <h2 className="text-smoky-brown text-lg md:text-2xl font-light animate-fade-in" style={{ fontFamily: 'var(--font-slogan), serif' }}>
          Unlock Your Inner Light
        </h2>

        {/* כפתור */}
        <a
          href="/money-code"
          className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-b from-champagne to-gold text-espresso px-10 py-3 text-lg font-semibold shadow-[0_8px_30px_rgba(167,131,90,0.25)] hover:from-gold hover:to-gold-deep hover:text-ivory transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold ring-offset-2 ring-offset-ivory active:translate-y-[1px] animate-fade-in ripple"
        >
          <span className="relative z-10">מחשבון קוד הכסף</span>
        </a>

      </div>
    </main>
  )
}
