"use client"
export default function Footer() {
  return (
    <footer className="mt-1 bg-ivory-soft/80 backdrop-blur-sm border-t border-sand-100/60">
      <div className="grid items-center gap-2 px-4 py-2 mx-auto text-center max-w-6xl">
        {/* Share button centered */}
        <div className="flex justify-center w-full">
          <button
            className="px-3 py-1.5 text-xs font-medium transition-all duration-300 border rounded-lg text-espresso bg-sand-100/50 hover:bg-sand-100 border-sand-100/80 hover:shadow-sm"
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
        <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
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
      <div className="py-1 mt-1 text-xs text-center text-text-secondary">
        2025 © Awakening by Ksenia
      </div>
    </footer>
  )
}
