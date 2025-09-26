"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { paths } from '@/lib/urls'

export function Header() {
  const pathname = usePathname()
  const showBack = Boolean(pathname) && pathname !== '/'

  return (
    <header className="border-b border-white/30 bg-[rgba(254,254,254,0.12)] shadow-xl backdrop-blur-lg sm:border-white/25 sm:backdrop-blur-md">
      <div className="relative mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6">
        <div className="flex items-center justify-center">
          {/* Back arrow button on the left (LTR) */}
          {showBack && (
            <Link
              href={paths.home()}
              aria-label="Back to home"
              className="absolute left-4 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-md px-3 py-2 text-[#473B31] transition hover:scale-[1.02] hover:opacity-80 sm:left-6"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          )}

          {/* Centered title */}
          <h1
            className="header-title text-center font-['Assistant'] text-sm font-normal tracking-[0.25em] text-[#473B31] sm:text-base md:text-lg"
            dir="ltr"
          >
            YOUR PERSONAL SPACE FOR GROWTH
          </h1>

          {/* Right spacer to keep title centered */}
          <div className="absolute right-4 top-1/2 min-h-[44px] min-w-[44px] -translate-y-1/2 sm:right-6" />
        </div>
      </div>
    </header>
  )
}

export default Header
