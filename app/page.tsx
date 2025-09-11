import Image from "next/image";

export default function Home() {
  return (
    <main className="container flex flex-col items-center justify-start min-h-screen px-4 pt-6 pb-10 text-center md:pt-8">
      <div className="w-full max-w-4xl mx-auto slide-up">
        {/* HERO */}
        <div className="flex flex-col items-center">
          {/* לוגו – הועלה למעלה */}
          <div className="animate-logo-entrance">
            <Image
              src="/newlogos/logowithsloganhomepage.png"
              alt="Awakening by Ksenia - Unlock the light within you"
              width={480}
              height={300}
              className="mx-auto drop-shadow-[0_6px_26px_rgba(167,131,90,0.22)]"
              priority
            />
          </div>
        </div>

        {/* כפתור */}
        <div className="mt-8 md:mt-10">
          <a
            href="/money-code"
            className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-b from-champagne to-gold text-espresso px-9 py-3 text-lg font-semibold shadow-[0_6px_22px_rgba(167,131,90,0.22)] hover:from-gold hover:to-gold-deep hover:text-ivory transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold ring-offset-2 ring-offset-ivory active:translate-y-[1px] animate-fade-in ripple"
          >
            <span className="relative z-10">מחשבון קוד הכסף</span>
          </a>
        </div>
      </div>
    </main>
  );
}
