"use client"
import { useEffect, useRef, useState } from 'react'

// Minimal type for the non-standard "beforeinstallprompt" event
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export default function Header() {

  // Language state
  const [locale, setLocale] = useState<'he' | 'en' | 'ru'>('he')

  // PWA install prompt state
  const [canInstall, setCanInstall] = useState(false)
  const installEvtRef = useRef<BeforeInstallPromptEvent | null>(null)

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

  // Load preferred language from storage
  useEffect(() => {
    try {
      const fromStorage = (typeof window !== 'undefined') ? (localStorage.getItem('locale') as 'he' | 'en' | 'ru' | null) : null
      const initial = fromStorage || 'he'
      setLocale(initial)
      if (typeof document !== 'undefined') {
        document.documentElement.lang = initial
      }
    } catch {}
  }, [])

  // PWA: detect install availability
  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault()
      installEvtRef.current = e as BeforeInstallPromptEvent
      setCanInstall(true)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall)
  }, [])

  const onInstallClick = async () => {
    const evt = installEvtRef.current
    if (!evt) return
    setCanInstall(false)
    await evt.prompt()
    try {
      await evt.userChoice
    } catch {}
    installEvtRef.current = null
  }

  const switchLang = (lng: 'he' | 'en' | 'ru') => {
    setLocale(lng)
    try {
      localStorage.setItem('locale', lng)
      document.documentElement.lang = lng
    } catch {}
    // refresh to allow pages to read language in future
    if (typeof window !== 'undefined') window.location.reload()
  }

  const t = {
    he: {
      home: 'בית',
      calculator: 'מחשבון קוד הכסף',
      soon: 'בקרוב',
      contact: 'צור קשר',
      whatsapp: 'שלח וואטסאפ',
      email: 'שלח מייל',
      install: 'התקן אפליקציה'
    },
    en: {
      home: 'Home',
      calculator: 'Money Code Calculator',
      soon: 'Coming soon',
      contact: 'Contact',
      whatsapp: 'Send WhatsApp',
      email: 'Send Email',
      install: 'Install App'
    },
    ru: {
      home: 'Домой',
      calculator: 'Калькулятор денежного кода',
      soon: 'Скоро',
      contact: 'Связаться',
      whatsapp: 'Отправить WhatsApp',
      email: 'Отправить Email',
      install: 'Установить приложение'
    }
  }[locale]

  const nav = (
    <nav className="flex flex-row items-center gap-5 text-espresso relative whitespace-nowrap overflow-x-auto">
      <a href="/" className="hover:text-espresso text-espresso/80 font-normal text-xs shrink-0" onClick={() => { setSoonOpen(false); setContactOpen(false) }}>{t.home}</a>
      <a href="/money-code" className="hover:text-espresso text-espresso/80 font-normal text-xs shrink-0" onClick={() => { setSoonOpen(false); setContactOpen(false) }}>{t.calculator}</a>
      <div className="relative" ref={soonRef}>
        <button
          className="font-normal text-xs text-espresso/80 hover:text-espresso shrink-0"
          onClick={() => setSoonOpen((v) => !v)}
          aria-expanded={soonOpen}
        >
          {t.soon}
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
          {t.contact}
        </button>
        {contactOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-pearl border border-pearl-soft rounded-lg shadow-md p-2 z-50">
            <a className="block px-3 py-2 hover:bg-pearl-soft rounded text-sm text-espresso/80 hover:text-espresso" href="https://wa.me/972524616121" target="_blank" rel="noreferrer" onClick={() => setContactOpen(false)}>{t.whatsapp}</a>
            <a className="block px-3 py-2 hover:bg-pearl-soft rounded text-sm text-espresso/80 hover:text-espresso" href="mailto:awakening.by.ksenia@gmail.com" onClick={() => setContactOpen(false)}>{t.email}</a>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button className={`px-2 py-1 rounded border border-pearl-soft text-xs ${locale==='he' ? 'text-espresso bg-pearl-soft' : 'text-espresso/70 hover:text-espresso hover:bg-pearl-soft'}`} onClick={() => switchLang('he')}>HE</button>
        <button className={`px-2 py-1 rounded border border-pearl-soft text-xs ${locale==='en' ? 'text-espresso bg-pearl-soft' : 'text-espresso/70 hover:text-espresso hover:bg-pearl-soft'}`} onClick={() => switchLang('en')}>EN</button>
        <button className={`px-2 py-1 rounded border border-pearl-soft text-xs ${locale==='ru' ? 'text-espresso bg-pearl-soft' : 'text-espresso/70 hover:text-espresso hover:bg-pearl-soft'}`} onClick={() => switchLang('ru')}>RU</button>
        {canInstall && (
          <button onClick={onInstallClick} className="ml-2 px-2 py-1 rounded border border-pearl-soft text-xs text-espresso/80 hover:text-espresso hover:bg-pearl-soft">
            {t.install}
          </button>
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
    <header className="w-full fixed top-0 inset-x-0 bg-pearl shadow-sm border-b border-pearl-soft z-40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-4">
        <a href="/" className="flex items-center shrink-0">
          {/* Brand text only - elegant and thin */}
          <span className="text-espresso text-xs sm:text-sm font-light tracking-wider whitespace-nowrap">
            AWAKENING BY KSENIA ⎮ PERSONAL SPACE FOR GROWTH
          </span>
        </a>
        {/* Horizontal scrollable nav that never wraps */}
        <div className="flex-1 overflow-x-auto">
          {nav}
        </div>
      </div>
    </header>
  )
}
