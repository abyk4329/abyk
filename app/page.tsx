import Image from "next/image";
export default function Home() {
  return (
    <div className="homepage-container px-4">
      <div className="slide-up mx-auto w-full max-w-4xl text-center">
        {/* HERO with 3D circle background */}
        <div className="relative flex min-h-[400px] flex-col items-center justify-center">
          {/* 3D Circle Background */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse-slow h-[450px] w-[450px] rounded-full border border-sand-100/30 bg-gradient-to-br from-champagne/15 via-sand-50/25 to-pearl-sand/15 shadow-[inset_0_25px_50px_rgba(167,131,90,0.08),_0_30px_60px_rgba(167,131,90,0.12)] backdrop-blur-[2px] md:h-[550px] md:w-[550px]"></div>
          </div>

          {/* Logo and Tagline Container - Horizontal Layout */}
          <div className="relative z-10 flex flex-col items-center space-y-1 md:space-y-2">
            {/* לוגו בסיס - ימין קלות */}
            <div className="animate-logo-entrance -translate-y-2 translate-x-6 transform md:translate-x-12">
              <Image
                src="/newlogos/logobase.png"
                alt="Awakening by Ksenia Logo"
                width={340}
                height={150}
                className="logo-responsive contrast-105 saturate-105 drop-shadow-[0_10px_35px_rgba(167,131,90,0.3)] filter"
                priority
              />
            </div>

            {/* סלוגן - שמאל קלות ומטה */}
            <div className="animate-fade-in-float -translate-x-8 translate-y-1 transform md:-translate-x-16">
              <Image
                src="/newlogos/Unlock the light within you....png"
                alt="Unlock the light within you"
                width={380}
                height={60}
                className="tagline-responsive contrast-105 drop-shadow-[0_8px_30px_rgba(167,131,90,0.25)] filter"
              />
            </div>
          </div>
        </div>
        {/* כפתור */}
        <div className="relative z-10 mt-6 md:mt-8">
          <a
            href="/thewelthcode"
            className="animate-fade-in ripple group relative inline-flex items-center justify-center rounded-full bg-gradient-to-b from-champagne to-gold px-8 py-3 text-ms-0 md:text-ms-1 font-semibold text-espresso shadow-[0_8px_28px_rgba(167,131,90,0.25)] ring-offset-2 ring-offset-ivory transition-all duration-300 hover:from-gold hover:to-gold-deep hover:text-ivory hover:shadow-[0_12px_35px_rgba(167,131,90,0.35)] focus:outline-none focus:ring-2 focus:ring-gold active:translate-y-[1px]"
          >
            <span className="relative z-10">מחשבון קוד העושר</span>
          </a>
        </div>
      </div>
    </div>
  );
}
