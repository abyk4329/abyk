"use client";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gold/25 bg-footer/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Left side (visual in Hebrew layout): social icons */}
        <div className="flex items-center gap-6 text-espresso/80">
          <a
            href="https://www.tiktok.com/@awakening.by.ksenia"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="hover:text-gold-deep transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M16 3c.2 1.8 1.2 5 5 5" strokeLinecap="round" />
              <path
                d="M16 3v11.5a4.5 4.5 0 1 1-4.5-4.5c.5 0 .9.1 1.3.2"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/awakening.by.ksenia?igsh=MTZwOWljN2dsOXZzbQ%3D%3D&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hover:text-gold-deep transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
              <circle cx="12" cy="12" r="3.5" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>
        </div>

        {/* Center: copyright */}
        <div className="text-text-secondary text-sm">
          Awakening by Ksenia © 2025
        </div>

        {/* Left: combined terms/privacy link */}
        <a
          href="/privacy"
          className="text-text-secondary hover:text-gold-deep transition-colors"
        >
          תנאי שימוש ומדיניות פרטיות
        </a>
      </div>
    </footer>
  );
}
