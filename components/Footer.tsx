"use client"
export default function Footer() {
  return (
    <footer className="mt-10 md:mt-12 border-t border-gold/25 bg-footer/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-10 grid gap-6 md:grid-cols-3 items-start text-center md:text-right">
        <div>
          <h3 className="text-cacao font-semibold mb-3">שתף עם חבר</h3>
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
          >שיתוף</button>
        </div>
  <div className="md:justify-self-center">
          <h3 className="text-cacao font-semibold mb-3">רשתות חברתיות</h3>
          <div className="flex gap-4 justify-center md:justify-end">
            <a className="hover:text-gold-deep text-espresso" href="https://www.instagram.com/awakening.by.ksenia?igsh=MTZwOWljN2dsOXZzbQ%3D%3D&utm_source=qr" target="_blank" rel="noreferrer">Instagram</a>
            <a className="hover:text-gold-deep text-espresso" href="https://www.tiktok.com/@awakening.by.ksenia" target="_blank" rel="noreferrer">TikTok</a>
          </div>
        </div>
        <div className="md:justify-self-end">
          <h3 className="text-cacao font-semibold mb-3">מדיניות</h3>
          <div className="flex gap-4 justify-center md:justify-end">
            <a className="hover:text-gold-deep text-espresso" href="/privacy">מדיניות פרטיות</a>
            <a className="hover:text-gold-deep text-espresso" href="/terms">תנאי שימוש</a>
          </div>
        </div>
      </div>
  <div className="text-text-secondary text-sm py-3 text-center">2025 © Awakening by Ksenia</div>
    </footer>
  )
}
