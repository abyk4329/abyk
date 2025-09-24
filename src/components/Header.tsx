"use client"
import Link from 'next/link'

export function Header() {
  return (
    <header className="backdrop-blur-lg border-b border-white/30 shadow-xl sm:backdrop-blur-md sm:border-white/25 bg-[rgba(254,254,254,0.12)]">
      <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 sm:py-6 relative">
        <div className="flex items-center justify-center">
          {/* Back arrow button on the left (LTR) */}
          <Link
            href="/"
            aria-label="Back to home"
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 font-bold text-2xl leading-none px-3 py-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md text-[#473B31] hover:opacity-80 hover:scale-[1.02] transition"
          >
            ←
          </Link>

          {/* Centered title */}
          <h1
            className="header-title font-['Assistant'] font-normal text-center text-[#473B31] tracking-[0.25em] text-sm sm:text-base md:text-lg"
            dir="ltr"
          >
            YOUR PERSONAL SPACE FOR GROWTH
          </h1>

          {/* Right spacer to keep title centered */}
          <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px]" />
        </div>
      </div>
    </header>
  )
}

export default Header
