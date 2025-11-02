import { useEffect, useState } from 'react';
import './Footer.css';
import InstallPWA from './InstallPWA';

export default function Footer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [themeReady, setThemeReady] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    const initialTheme =
      savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : prefersDark
        ? 'dark'
        : 'light';

    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    setThemeReady(true);
  }, []);

  const toggleThemeMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  return (
    <>
      {/* Side Menu Overlay */}
      {menuOpen && (
        <div className="menu-overlay" onClick={closeMenu}>
          <nav className="side-menu" onClick={(e) => e.stopPropagation()}>
            <div className="menu-header-actions">
              <button
                type="button"
                className="menu-action-button close-button"
                onClick={closeMenu}
                aria-label="סגור תפריט"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {themeReady && (
                <button
                  type="button"
                  className={`menu-action-button theme-toggle-button ${
                    theme === 'dark' ? 'is-dark' : 'is-light'
                  }`}
                  onClick={toggleThemeMode}
                  aria-label={
                    theme === 'light' ? 'החליפו למצב כהה' : 'החליפו למצב בהיר'
                  }
                  aria-pressed={theme === 'dark' ? 'true' : 'false'}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={
                      theme === 'dark'
                        ? 'rgb(var(--color-icon))'
                        : 'currentColor'
                    }
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18h6"></path>
                    <path d="M10 22h4"></path>
                    <path d="M12 2a7 7 0 0 0-4 12.74V16a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1.26A7 7 0 0 0 12 2z"></path>
                  </svg>
                </button>
              )}
            </div>

            <div className="menu-content">
              <h2 className="menu-title">AWAKENING BY KSENIA</h2>

              <ul className="menu-links">
                <li>
                  <a href="/" onClick={closeMenu}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span className="BigNote">דף הבית</span>
                  </a>
                </li>
                <li>
                  <a href="/tools/wealth-code/calculator" onClick={closeMenu}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="9" x2="19" y2="9"></line>
                      <line x1="5" y1="15" x2="19" y2="15"></line>
                      <line x1="9" y1="5" x2="9" y2="19"></line>
                      <line x1="15" y1="5" x2="15" y2="19"></line>
                    </svg>
                    <span className="BigNote">מחשבון קוד העושר</span>
                  </a>
                </li>
                <li>
                  <a href="/contact" onClick={closeMenu}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22 6 12 13 2 6"></polyline>
                    </svg>
                    <span className="BigNote">יצירת קשר</span>
                  </a>
                </li>
                <li>
                  <a href="/login" onClick={closeMenu}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    <span className="BigNote">כניסה לאיזור אישי</span>
                  </a>
                </li>
                <li>
                  <a href="/legal" onClick={closeMenu}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                    <span className="BigNote">תנאים משפטיים</span>
                  </a>
                </li>
                <li>
                  <InstallPWA />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}

      {/* Fixed Footer Navigation */}
      <footer className="fixed-footer">
        <button
          className="footer-button"
          onClick={toggleMenu}
          aria-label="תפריט"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <a href="/" className="footer-button" aria-label="דף הבית">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </a>

        <a href="/contact" className="footer-button" aria-label="יצירת קשר">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22 6 12 13 2 6"></polyline>
          </svg>
        </a>

        <a href="/login" className="footer-button" aria-label="התחברות">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </a>
      </footer>
    </>
  );
}
