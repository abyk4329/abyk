import Image from 'next/image'
import TypewriterText from '@/components/TypewriterText'

export default function Home() {
  return (
    <main className="container min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="space-y-12 slide-up max-w-4xl mx-auto">
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

        {/* סיסמה באנגלית עם אפקט הקלדה */}
        <h2 className="text-gold text-xl md:text-3xl font-light italic tracking-wide min-h-[3rem] md:min-h-[4rem]" style={{ fontFamily: 'var(--font-slogan), serif' }}>
          <TypewriterText 
            text="Unlock Your Inner Light" 
            speed={120}
            startDelay={800}
            className="inline-block"
          />
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
