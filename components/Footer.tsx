"use client"
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const hideShare = pathname === '/thank-you'
  return (
  <footer className="mt-1 bg-ivory/90 backdrop-blur-sm border-t border-beige-200">
      <div className="grid items-center gap-2 px-4 py-2 mx-auto text-center max-w-6xl">
        {/* Share button centered (hidden on thank-you) */}
        {!hideShare && (
          <div className="flex justify-center w-full">
            <button
              className="px-5 py-2 text-sm font-medium transition-all duration-300 border-2 rounded-lg text-accent-choco bg-gold-primary/15 hover:bg-gold-primary/25 border-gold-primary/50 shadow-warm-sm hover:shadow-warm-md flex items-center gap-1.5"
              onClick={async () => {
                  const data = { title: 'Awakening by Ksenia', text: 'Your personal space for growth — Unlock the light within you', url: typeof window !== 'undefined' ? window.location.href : '/' }
                if (navigator.share) {
                  await navigator.share(data).catch(()=>{})
                } else {
                  await navigator.clipboard.writeText(data.url)
                  alert('הקישור הועתק')
                }
              }}
            >
              <span>אהבתם? שתפו עם חברים</span>
            </button>
          </div>
        )}
        
        {/* Social and Policy links in a single row for smaller screens */}
  <div className="flex items-center justify-between w-full text-sm text-espresso">
          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/awakening.by.ksenia?igsh=MTZwOWljN2dsOXZzbQ%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noreferrer"
              className="text-text-secondary hover:text-espresso transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            
            <a 
              href="https://www.tiktok.com/@awakening.by.ksenia" 
              target="_blank" 
              rel="noreferrer"
              className="text-text-secondary hover:text-espresso transition-colors duration-200"
              aria-label="TikTok"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
          </div>

          {/* Policy Link */}
      <div className="flex justify-center">
            <a 
        className="hover:text-espresso text-text-secondary assistant-light transition-colors duration-200 text-sm md:text-base" 
              href="/privacy"
            >
        תנאי שימוש ומדיניות פרטיות
            </a>
          </div>
        </div>
      </div>
      <div className="py-2 mt-1 text-sm md:text-base text-center text-text-secondary">
        Awakening by Ksenia © 2025
      </div>
    </footer>
  )
}
