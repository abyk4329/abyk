"use client"
import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const [contactOpen, setContactOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const contactRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  // סגירת תפריטים בלחיצה מחוץ או ESC
  useEffect(() => {
    const onDocClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node
      if (contactRef.current && !contactRef.current.contains(target)) {
        setContactOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setContactOpen(false)
        setMobileMenuOpen(false)
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

  return (
    <>
  <header className="w-full fixed top-0 inset-x-0 bg-ivory/95 shadow-sm shadow-warm-sm z-40 backdrop-blur-md border-b border-gold-primary/30">
        <div className="flex items-center justify-between px-4 py-3 md:py-4">
          {/* כפתור המבורגר למובייל */}
          <button
            className="md:hidden flex items-center text-espresso hover:text-cacao transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="תפריט"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* ניווט לדסקטופ */}
      <nav className="hidden md:flex flex-row items-center gap-6 text-espresso">
            <a 
              href="/" 
        className="hover:text-cta-dark text-espresso assistant-light text-sm transition-colors duration-200"
            >
              בית
            </a>
            
            <a 
              href="/money-code" 
        className="hover:text-cta-dark text-espresso assistant-light text-sm transition-colors duration-200"
            >
              מחשבון קוד העושר
            </a>
            
            {/* יצירת קשר עם תפריט נפתח */}
            <div className="relative" ref={contactRef}>
              <button
                className="hover:text-cta-dark text-espresso assistant-light text-sm transition-colors duration-200 flex items-center gap-1"
                onClick={() => setContactOpen(!contactOpen)}
                aria-expanded={contactOpen}
              >
                יצירת קשר
                <svg 
                  className={`w-3 h-3 transition-transform duration-200 ${contactOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* תפריט יצירת קשר */}
              {contactOpen && (
                <div className="absolute right-0 mt-2 bg-ivory border border-beige-200 rounded-lg shadow-lg py-2 min-w-[160px] z-50">
                  <a
                    href="https://wa.me/972524616121"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-smoky-brown hover:text-cta-dark hover:bg-beige-100/50 transition-colors duration-200"
                    onClick={() => setContactOpen(false)}
                  >
                    <svg className="w-4 h-4 text-smoky-brown" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="assistant-light text-sm">WhatsApp</span>
                  </a>
                  
                  <a
                    href="mailto:awakening.by.ksenia@gmail.com"
                    className="flex items-center gap-2 px-3 py-2 text-smoky-brown hover:text-cta-dark hover:bg-beige-100/50 transition-colors duration-200"
                    onClick={() => setContactOpen(false)}
                  >
                    <svg className="w-4 h-4 text-smoky-brown" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="assistant-light text-sm">Email</span>
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* טקסט המותג */}
          <div className="flex items-center">
            <div className="text-right">
              <div className="assistant-light text-sm text-espresso tracking-wide">
                <span className="assistant-medium">Awakening by Ksenia</span>
                <span aria-hidden className="inline-block align-middle mx-1 md:mx-1.5 h-px w-6 md:w-8 bg-espresso/40"></span>
                <span className="assistant-extralight">Personal Space for Growth</span>
              </div>
            </div>
          </div>
        </div>
        {/* thin gold divider for emphasis */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-gold-primary/50 to-transparent" />
      </header>

      {/* תפריט צדדי למובייל */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
          <div 
            ref={mobileMenuRef}
            className="fixed top-0 right-0 h-full w-80 bg-ivory shadow-xl transform transition-transform duration-300 ease-in-out border-l border-beige-200/70"
            onClick={(e) => e.stopPropagation()}
          >
            {/* כותרת התפריט */}
            <div className="flex items-center justify-between p-4 border-b border-sand-100">
              <div className="english-light text-sm text-cacao">
                PERSONAL SPACE FOR GROWTH
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-espresso hover:text-cacao transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* פריטי תפריט */}
            <div className="p-4 space-y-4">
              <a
                href="/"
                className="block py-3 text-right text-espresso hover:text-cacao assistant-regular text-lg transition-colors duration-200 border-b border-sand-100/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                בית
              </a>

              <a
                href="/money-code"
                className="block py-3 text-right text-espresso hover:text-cacao assistant-regular text-lg transition-colors duration-200 border-b border-sand-100/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                מחשבון קוד העושר
              </a>

              {/* יצירת קשר במובייל */}
              <div className="py-3 border-b border-sand-100/50">
                <div className="assistant-regular text-lg text-espresso mb-3 text-right">יצירת קשר</div>
                
                <div className="space-y-1 text-right">
                  <div>
                    <a
                      href="https://wa.me/972524616121"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 text-right text-smoky-brown hover:text-cacao assistant-light text-lg transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      WhatsApp
                    </a>
                  </div>
                  
                  <div>
                    <a
                      href="mailto:awakening.by.ksenia@gmail.com"
                      className="block py-2 text-right text-smoky-brown hover:text-cacao assistant-light text-lg transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
