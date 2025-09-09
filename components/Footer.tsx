"use client"
export default function Footer() {
  return (
    <footer className="mt-1 bg-ivory-soft/80 backdrop-blur-sm border-t border-sand-100/60">
      <div className="grid items-center gap-2 px-4 py-2 mx-auto text-center max-w-6xl">
        {/* Share button centered */}
        <div className="flex justify-center w-full">
          <button
            className="px-4 py-1.5 text-xs font-medium transition-all duration-300 border rounded-lg text-espresso bg-sand-100/50 hover:bg-sand-100 border-sand-100/80 hover:shadow-sm flex items-center gap-1"
            onClick={async () => {
              const data = { title: 'Awakening by Ksenia', text: 'Personal Space for Growth – Unlock Your Inner Light', url: typeof window !== 'undefined' ? window.location.href : '/' }
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
        
        {/* Social and Policy links in a single row for smaller screens */}
        <div className="flex items-center justify-between w-full text-xs">
          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/awakening.by.ksenia?igsh=MTZwOWljN2dsOXZzbQ%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noreferrer"
              className="text-smoky-brown hover:text-cacao transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            
            <a 
              href="https://www.tiktok.com/@awakening.by.ksenia" 
              target="_blank" 
              rel="noreferrer"
              className="text-smoky-brown hover:text-cacao transition-colors duration-200"
              aria-label="TikTok"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>
          </div>

          {/* Policy Link */}
          <div className="flex justify-center">
            <a 
              className="hover:text-cacao text-smoky-brown assistant-light transition-colors duration-200" 
              href="/privacy"
            >
              מדיניות ופרטיות
            </a>
          </div>
        </div>
      </div>
      <div className="py-1 mt-1 text-xs text-center text-text-secondary">
        2025 © Awakening by Ksenia
      </div>
    </footer>
  )
}
