"use client"
export default function Footer() {
  return (
    <footer className="mt-2 bg-footer/80 backdrop-blur-sm md:border-t md:border-gold/20">
      <div className="grid items-center gap-3 px-4 py-3 mx-auto text-center max-w-6xl">
        {/* Share button centered */}
        <div className="flex justify-center w-full">
          <button
            className="px-3 py-1.5 text-xs font-medium transition-all duration-300 border rounded-lg text-espresso bg-pearl hover:bg-pearl-soft border-pearl-soft hover:shadow-sm"
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
            שיתוף עם חברים
          </button>
        </div>
        
        {/* Social and Policy links in a single row for smaller screens */}
        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
          <div className="sm:justify-self-start">
            <h3 className="mb-1 font-semibold text-cacao">רשתות חברתיות</h3>
            <div className="flex justify-center gap-3 sm:justify-start">
              <a className="hover:text-gold-deep text-espresso" href="https://www.instagram.com/awakening.by.ksenia?igsh=MTZwOWljN2dsOXZzbQ%3D%3D&utm_source=qr" target="_blank" rel="noreferrer">Instagram</a>
              <a className="hover:text-gold-deep text-espresso" href="https://www.tiktok.com/@awakening.by.ksenia" target="_blank" rel="noreferrer">TikTok</a>
            </div>
          </div>
          <div className="sm:justify-self-end">
            <h3 className="mb-1 font-semibold text-cacao">מדיניות</h3>
            <div className="flex justify-center gap-3 sm:justify-end">
              <a className="hover:text-gold-deep text-espresso" href="/privacy">מדיניות פרטיות</a>
              <a className="hover:text-gold-deep text-espresso" href="/terms">תנאי שימוש</a>
            </div>
          </div>
        </div>
      </div>
      <div className="py-1.5 mt-2 text-xs text-center text-text-secondary md:border-t md:border-gold/10">
        2025 © Awakening by Ksenia
      </div>
    </footer>
  )
}
