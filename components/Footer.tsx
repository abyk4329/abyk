"use client"
export default function Footer() {
  return (
    <footer className="mt-4 border-t border-gold/20 bg-footer/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 grid gap-4 items-center text-center">
        {/* Share button centered */}
        <div className="w-full flex justify-center">
          <button
            className="btn ripple"
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
            <span className="sr-only">שתף עם חבר</span>
            שיתוף
          </button>
        </div>
        
        {/* Social and Policy links in a single row for smaller screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="sm:justify-self-start">
            <h3 className="text-cacao font-semibold mb-1">רשתות חברתיות</h3>
            <div className="flex gap-3 justify-center sm:justify-start">
              <a className="hover:text-gold-deep text-espresso" href="https://www.instagram.com/awakening.by.ksenia?igsh=MTZwOWljN2dsOXZzbQ%3D%3D&utm_source=qr" target="_blank" rel="noreferrer">Instagram</a>
              <a className="hover:text-gold-deep text-espresso" href="https://www.tiktok.com/@awakening.by.ksenia" target="_blank" rel="noreferrer">TikTok</a>
            </div>
          </div>
          <div className="sm:justify-self-end">
            <h3 className="text-cacao font-semibold mb-1">מדיניות</h3>
            <div className="flex gap-3 justify-center sm:justify-end">
              <a className="hover:text-gold-deep text-espresso" href="/privacy">מדיניות פרטיות</a>
              <a className="hover:text-gold-deep text-espresso" href="/terms">תנאי שימוש</a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-text-secondary text-xs py-2 text-center border-t border-gold/10 mt-3">
        2025 © Awakening by Ksenia
      </div>
    </footer>
  )
}
