import { useEffect, useState } from 'react';
import './PullToggle.css';

export default function PullToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) return null;

  return (
    <button
      className="elegant-theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'עבור למצב כהה' : 'עבור למצב בהיר'}
      type="button"
    >
      <div className="elegant-theme-toggle__track">
        <div
          className={`elegant-theme-toggle__thumb ${
            theme === 'dark' ? 'dark' : 'light'
          }`}
        >
          <div className="elegant-theme-toggle__icon">
            {theme === 'dark' ? (
              // Light bulb ON (for dark mode)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18h6"></path>
                <path d="M10 22h4"></path>
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.36.5 2.6 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path>
                <line x1="12" y1="2" x2="12" y2="4"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              // Light bulb OFF (for light mode)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18h6"></path>
                <path d="M10 22h4"></path>
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.36.5 2.6 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path>
              </svg>
            )}
          </div>
        </div>
        <div className="elegant-theme-toggle__stars">
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
        </div>
      </div>
    </button>
  );
}
