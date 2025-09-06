"use client"
import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const [open, setOpen] = useState(false)

  const nav = (
    <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-charcoal">
      <a href="/" className="hover:text-gold-deep font-medium">בית</a>
      <a href="/money-code" className="hover:text-gold-deep font-medium">מחשבון קוד הכסף</a>
      <div className="font-medium text-text-secondary">בקרוב</div>
      <a className="text-text-secondary font-normal cursor-default">מצפן פנג שאוי</a>
      <a className="text-text-secondary font-normal cursor-default">אנרגיה של היום</a>
      <a href="mailto:awakening.by.ksenia@gmail.com" className="hover:text-gold-deep font-medium">צור קשר</a>
      <a href="https://wa.me/972524616121" target="_blank" className="hover:text-gold-deep font-medium" rel="noreferrer">וואטסאפ</a>
      <div className="flex items-center gap-2">
        <a className="px-2 py-1 rounded border border-gold/50 text-sm hover:bg-gold/10" href="#" onClick={(e)=>e.preventDefault()}>HE</a>
        <a className="px-2 py-1 rounded border border-gold/50 text-sm hover:bg-gold/10" href="#" onClick={(e)=>e.preventDefault()}>EN</a>
        <a className="px-2 py-1 rounded border border-gold/50 text-sm hover:bg-gold/10" href="#" onClick={(e)=>e.preventDefault()}>RU</a>
      </div>
    </nav>
  )

  return (
    <header className="w-full fixed top-0 inset-x-0 bg-ivory/85 backdrop-blur border-b border-gold/20 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button aria-label="תפריט" className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <a href="/" className="flex items-center gap-3">
          <Image src="/iconvector.svg" alt="ABYK" width={28} height={28} />
          <span className="text-gold-deep font-bold">Awakening by Ksenia</span>
        </a>
        <div className="hidden md:block">{nav}</div>
      </div>

      {open && (
        <div className="md:hidden bg-ivory border-t border-gold/20 px-4 py-4">
          {nav}
        </div>
      )}
    </header>
  )
}
