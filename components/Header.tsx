"use client"
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const [open, setOpen] = useState(false)

  const [soonOpen, setSoonOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const soonRef = useRef<HTMLDivElement | null>(null)
  const contactRef = useRef<HTMLDivElement | null>(null)

  // סגירת תפריטים בלחיצה מחוץ או ESC
  useEffect(() => {
    const onDocClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node
      if (
        soonRef.current && !soonRef.current.contains(target) &&
        contactRef.current && !contactRef.current.contains(target)
      ) {
        setSoonOpen(false)
        setContactOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSoonOpen(false)
        setContactOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('touchstart', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('touchstart', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const nav = (
    <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-espresso relative">
      <a href="/" className="hover:text-gold-deep font-medium" onClick={() => { setSoonOpen(false); setContactOpen(false) }}>בית</a>
      <a href="/money-code" className="hover:text-gold-deep font-medium" onClick={() => { setSoonOpen(false); setContactOpen(false) }}>מחשבון קוד הכסף</a>
      <div className="relative" ref={soonRef}>
        <button
          className="font-medium text-espresso hover:text-gold-deep"
          onClick={() => setSoonOpen((v) => !v)}
          aria-expanded={soonOpen}
        >
          בקרוב
        </button>
        {soonOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-ivory border border-gold/25 rounded-lg shadow-lg p-2 z-50">
            <div className="px-3 py-2 text-text-secondary cursor-default">מצפן פנג שואי</div>
            <div className="px-3 py-2 text-text-secondary cursor-default">אנרגיה של היום</div>
          </div>
        )}
      </div>
      <div className="relative" ref={contactRef}>
        <button
          className="font-medium text-espresso hover:text-gold-deep"
          onClick={() => setContactOpen((v) => !v)}
          aria-expanded={contactOpen}
        >
          צור קשר
        </button>
        {contactOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-ivory border border-gold/25 rounded-lg shadow-lg p-2 z-50">
            <a className="block px-3 py-2 hover:bg-gold/10 rounded" href="https://wa.me/972524616121" target="_blank" rel="noreferrer" onClick={() => setContactOpen(false)}>שלח וואטסאפ</a>
            <a className="block px-3 py-2 hover:bg-gold/10 rounded" href="mailto:awakening.by.ksenia@gmail.com" onClick={() => setContactOpen(false)}>שלח מייל</a>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <a className="px-2 py-1 rounded border border-gold/50 text-sm hover:bg-gold/10" href="#" onClick={(e)=>e.preventDefault()}>HE</a>
        <a className="px-2 py-1 rounded border border-gold/50 text-sm hover:bg-gold/10" href="#" onClick={(e)=>e.preventDefault()}>EN</a>
        <a className="px-2 py-1 rounded border border-gold/50 text-sm hover:bg-gold/10" href="#" onClick={(e)=>e.preventDefault()}>RU</a>
      </div>
    </nav>
  )

  return (
    <header className="w-full fixed top-0 inset-x-0 bg-ivory/90 backdrop-blur-md border-b border-gold/20 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <button aria-label="תפריט" className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <a href="/" className="flex flex-col items-center gap-2 md:gap-3">
          {/* Logo */}
          <Image
            src="/logo.svg"
            alt="Awakening by Ksenia Logo"
            width={120}
            height={60}
            className="shrink-0"
          />
          {/* Brand + tagline */}
          <div className="text-center leading-tight">
            <span className="block text-gold text-xs md:text-sm font-medium tracking-wider energy-pulse">AWAKENING BY KSENIA - Personal Space For Growth</span>
            <span className="block text-gold text-xs italic font-light energy-pulse mt-1" style={{ fontFamily: 'var(--font-slogan), serif' }}>Unlock Your Inner Light</span>
          </div>
        </a>
        <div className="hidden md:block">{nav}</div>
      </div>

      {open && (
        <div className="md:hidden bg-ivory border-t border-gold/25 px-4 py-4">
          {nav}
        </div>
      )}
    </header>
  )
}
