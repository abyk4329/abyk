"use client"
import { useEffect, useRef, useState } from 'react'

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
      <a href="/" className="hover:text-espresso text-espresso/80 font-normal text-sm" onClick={() => { setSoonOpen(false); setContactOpen(false) }}>בית</a>
      <a href="/money-code" className="hover:text-espresso text-espresso/80 font-normal text-sm" onClick={() => { setSoonOpen(false); setContactOpen(false) }}>מחשבון קוד הכסף</a>
      <div className="relative" ref={soonRef}>
        <button
          className="font-normal text-sm text-espresso/80 hover:text-espresso"
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
          className="font-normal text-sm text-espresso/80 hover:text-espresso"
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
      <div className="flex items-center gap-2">
        <a className="px-2 py-1 rounded border border-pearl-soft text-xs text-espresso/70 hover:text-espresso hover:bg-pearl-soft" href="#" onClick={(e)=>e.preventDefault()}>HE</a>
        <a className="px-2 py-1 rounded border border-pearl-soft text-xs text-espresso/70 hover:text-espresso hover:bg-pearl-soft" href="#" onClick={(e)=>e.preventDefault()}>EN</a>
        <a className="px-2 py-1 rounded border border-pearl-soft text-xs text-espresso/70 hover:text-espresso hover:bg-pearl-soft" href="#" onClick={(e)=>e.preventDefault()}>RU</a>
      </div>
    </nav>
  )

  // סגירת תפריט הנייד בלחיצה מחוץ לו
  useEffect(() => {
    const closeMenuOnOutsideClick = (e: MouseEvent) => {
      if (open) {
        const target = e.target as Node;
        const header = document.querySelector('header');
        const isClickInsideHeader = header?.contains(target);
        
        // אם הלחיצה היא מחוץ להדר, סגור את התפריט
        if (!isClickInsideHeader) {
          setOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', closeMenuOnOutsideClick);
    return () => {
      document.removeEventListener('mousedown', closeMenuOnOutsideClick);
    };
  }, [open]);
  
  return (
    <header className="w-full fixed top-0 inset-x-0 bg-pearl shadow-sm border-b border-pearl-soft z-40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <button aria-label="תפריט" className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <svg className="w-5 h-5 text-espresso" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <a href="/" className="flex items-center">
          {/* Brand text only - elegant and thin */}
          <span className="text-espresso text-sm sm:text-base font-light tracking-wider whitespace-nowrap">
            AWAKENING BY KSENIA ⎮ PERSONAL SPACE FOR GROWTH
          </span>
        </a>
        <div className="hidden md:block">{nav}</div>
      </div>

      {open && (
        <div className="md:hidden bg-pearl border-t border-pearl-soft px-4 py-4">
          {nav}
        </div>
      )}
    </header>
  )
}
