"use client"
import { useEffect, useRef, useState } from 'react'

export default function Header() {
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
    <nav className="flex flex-row items-center gap-5 text-espresso relative whitespace-nowrap overflow-x-auto">
      <a href="/" className="hover:text-espresso text-espresso/80 font-normal text-xs shrink-0" onClick={() => { setSoonOpen(false); setContactOpen(false) }}>בית</a>
      <a href="/money-code" className="hover:text-espresso text-espresso/80 font-normal text-xs shrink-0" onClick={() => { setSoonOpen(false); setContactOpen(false) }}>מחשבון קוד הכסף</a>
      <div className="relative" ref={soonRef}>
        <button
          className="font-normal text-xs text-espresso/80 hover:text-espresso shrink-0"
          onClick={() => setSoonOpen((v) => !v)}
          aria-expanded={soonOpen}
        >
          בקרוב
        </button>
        {soonOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-pearl border border-pearl-soft rounded-lg shadow-md p-2 z-50">
            <div className="px-3 py-2 text-espresso/70 text-sm cursor-default">מצפן פנג שואי</div>
            <div className="px-3 py-2 text-espresso/70 text-sm cursor-default">אנרגיה של היום</div>
          </div>
        )}
      </div>
      <div className="relative" ref={contactRef}>
        <button
          className="font-normal text-xs text-espresso/80 hover:text-espresso shrink-0"
          onClick={() => setContactOpen((v) => !v)}
          aria-expanded={contactOpen}
        >
          צור קשר
        </button>
        {contactOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-pearl border border-pearl-soft rounded-lg shadow-md p-2 z-50">
            <a className="block px-3 py-2 hover:bg-pearl-soft rounded text-sm text-espresso/80 hover:text-espresso" href="https://wa.me/972524616121" target="_blank" rel="noreferrer" onClick={() => setContactOpen(false)}>שלח וואטסאפ</a>
            <a className="block px-3 py-2 hover:bg-pearl-soft rounded text-sm text-espresso/80 hover:text-espresso" href="mailto:awakening.by.ksenia@gmail.com" onClick={() => setContactOpen(false)}>שלח מייל</a>
          </div>
        )}
      </div>
    </nav>
  )

  // סגירת תפריטים צפים בלחיצה מחוץ להדר
  useEffect(() => {
    const closeDropdowns = (e: MouseEvent) => {
      const target = e.target as Node
      const header = document.querySelector('header')
      const inside = header?.contains(target)
      if (!inside) {
        setSoonOpen(false)
        setContactOpen(false)
      }
    }
    document.addEventListener('mousedown', closeDropdowns)
    return () => document.removeEventListener('mousedown', closeDropdowns)
  }, [])
  
  return (
    <header className="w-full fixed top-0 inset-x-0 bg-ivory/80 shadow-sm z-40 backdrop-blur-md border-b border-sand-100/60">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Navigation on the left */}
        <div className="flex-1 overflow-x-auto">
          {nav}
        </div>
        {/* Brand text on the right */}
        <a href="/" className="flex items-center shrink-0 ml-4">
          <span className="text-cacao text-xs sm:text-sm font-light tracking-wider whitespace-nowrap">
            AWAKENING BY KSENIA ⎮ PERSONAL SPACE FOR GROWTH
          </span>
        </a>
      </div>
    </header>
  )
}
