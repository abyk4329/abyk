"use client";
import { useEffect, useRef, useState } from "react";

// Minimal cross-browser event path polyfill (for legacy browsers lacking composedPath / path)
function getEventPath(evt: Event): EventTarget[] {
  const path: EventTarget[] = [];
  let node: any = evt.target as Node | null;
  while (node) {
    path.push(node);
    if (node === document) {
      path.push(window);
      break;
    }
    node = node.parentNode;
  }
  return path;
}

export default function Header() {
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  // סגירת תפריטים בלחיצה מחוץ או ESC
  useEffect(() => {
    const onDocClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      // Prevent closing mobile menu if click is on hamburger button
      if (hamburgerRef.current) {
        // Use composedPath for shadow DOM safety
        const path: EventTarget[] = (e as any).composedPath
          ? (e as any).composedPath()
          : (e as any).path
            ? (e as any).path
            : getEventPath(e as Event);
        if (
          hamburgerRef.current.contains(target) ||
          path.includes(hamburgerRef.current)
        ) {
          return;
        }
      }
      if (contactRef.current && !contactRef.current.contains(target)) {
        setContactOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setContactOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <header className="shadow-warm-sm fixed inset-x-0 top-0 z-40 w-full border-b border-gold-primary/30 bg-ivory/95 shadow-sm backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3 md:py-4">
          {/* כפתור המבורגר למובייל */}
          <button
            ref={hamburgerRef}
            className="flex items-center text-espresso transition-colors duration-200 hover:text-cacao md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="תפריט"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* ניווט לדסקטופ */}
          <nav className="hidden flex-row items-center gap-6 text-espresso md:flex">
            <a
              href="/"
              className="hover:text-cta-dark assistant-light text-sm text-espresso transition-colors duration-200"
            >
              בית
            </a>

            <a
              href="/money-code"
              className="hover:text-cta-dark assistant-light text-sm text-espresso transition-colors duration-200"
            >
              מחשבון קוד העושר
            </a>

            {/* יצירת קשר עם תפריט נפתח */}
            <div className="relative" ref={contactRef}>
              <button
                className="hover:text-cta-dark assistant-light flex items-center gap-1 text-sm text-espresso transition-colors duration-200"
                onClick={() => setContactOpen(!contactOpen)}
                aria-expanded={contactOpen}
              >
                יצירת קשר
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${contactOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* תפריט יצירת קשר */}
              {contactOpen && (
                <div className="absolute right-0 z-50 mt-2 min-w-[160px] rounded-lg border border-beige-200 bg-ivory py-2 shadow-lg">
                  <a
                    href="https://wa.me/972524616121"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cta-dark flex items-center gap-2 px-3 py-2 text-smoky-brown transition-colors duration-200 hover:bg-beige-100/50"
                    onClick={() => setContactOpen(false)}
                  >
                    <svg
                      className="h-4 w-4 text-smoky-brown"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="assistant-light text-sm">WhatsApp</span>
                  </a>

                  <a
                    href="mailto:awakening.by.ksenia@gmail.com"
                    className="hover:text-cta-dark flex items-center gap-2 px-3 py-2 text-smoky-brown transition-colors duration-200 hover:bg-beige-100/50"
                    onClick={() => setContactOpen(false)}
                  >
                    <svg
                      className="h-4 w-4 text-smoky-brown"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
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
              <div className="assistant-light text-[11px] uppercase tracking-[0.3em] text-espresso md:text-xs md:tracking-[0.32em]">
                YOUR PERSONAL SPACE FOR GROWTH
              </div>
            </div>
          </div>
        </div>
        {/* thin gold divider for emphasis */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-gold-primary/50 to-transparent" />
      </header>

      {/* תפריט צדדי למובייל */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            ref={mobileMenuRef}
            className="fixed right-0 top-0 h-full w-80 transform border-l border-beige-200/70 bg-ivory shadow-xl transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* כותרת התפריט */}
            <div className="flex items-center justify-between border-b border-sand-100 p-4">
              <div className="assistant-light text-[11px] uppercase tracking-[0.3em] text-cacao md:text-xs md:tracking-[0.32em]">
                YOUR PERSONAL SPACE FOR GROWTH
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-espresso transition-colors duration-200 hover:text-cacao"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* פריטי תפריט */}
            <div className="space-y-4 p-4">
              <a
                href="/"
                className="assistant-regular block border-b border-sand-100/50 py-3 text-right text-lg text-espresso transition-colors duration-200 hover:text-cacao"
                onClick={() => setMobileMenuOpen(false)}
              >
                בית
              </a>

              <a
                href="/money-code"
                className="assistant-regular block border-b border-sand-100/50 py-3 text-right text-lg text-espresso transition-colors duration-200 hover:text-cacao"
                onClick={() => setMobileMenuOpen(false)}
              >
                מחשבון קוד העושר
              </a>

              {/* יצירת קשר במובייל */}
              <div className="border-b border-sand-100/50 py-3">
                <div className="assistant-regular mb-3 text-right text-lg text-espresso">
                  יצירת קשר
                </div>

                <div className="space-y-1 text-right">
                  <div>
                    <a
                      href="https://wa.me/972524616121"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="assistant-light block py-2 text-right text-lg text-smoky-brown transition-colors duration-200 hover:text-cacao"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      WhatsApp
                    </a>
                  </div>

                  <div>
                    <a
                      href="mailto:awakening.by.ksenia@gmail.com"
                      className="assistant-light block py-2 text-right text-lg text-smoky-brown transition-colors duration-200 hover:text-cacao"
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
  );
}
