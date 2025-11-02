import { useEffect, useState } from 'react';
import '../styles/theme-toggle.css';

export default function ThemeToggle() {
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
      className={`theme-switch ${theme === 'dark' ? 'is-dark' : 'is-light'}`}
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'עבור למצב כהה' : 'עבור למצב בהיר'}
      aria-checked={theme === 'dark' ? 'true' : 'false'}
      role="switch"
      type="button"
    >
      <span className="theme-switch__track" aria-hidden="true">
        <span className="theme-switch__spark theme-switch__spark--one"></span>
        <span className="theme-switch__spark theme-switch__spark--two"></span>
        <span className="theme-switch__spark theme-switch__spark--three"></span>

        <span className="theme-switch__icon-slot theme-switch__icon-slot--sun">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="12" y1="3" x2="12" y2="1"></line>
            <line x1="12" y1="23" x2="12" y2="21"></line>
            <line x1="4.22" y1="4.22" x2="2.81" y2="2.81"></line>
            <line x1="21.19" y1="21.19" x2="19.78" y2="19.78"></line>
            <line x1="3" y1="12" x2="1" y2="12"></line>
            <line x1="23" y1="12" x2="21" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="2.81" y2="21.19"></line>
            <line x1="21.19" y1="2.81" x2="19.78" y2="4.22"></line>
          </svg>
        </span>

        <span className="theme-switch__icon-slot theme-switch__icon-slot--moon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z"></path>
            <circle cx="17" cy="5" r="1"></circle>
            <circle cx="19" cy="9" r="1"></circle>
          </svg>
        </span>

        <span className="theme-switch__thumb">
          <span className="theme-switch__thumb-glow"></span>
          <span className="theme-switch__thumb-inner"></span>
          <svg
            className="theme-switch__thumb-icon theme-switch__thumb-icon--sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="12" y1="5" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="19" y2="12"></line>
          </svg>
          <svg
            className="theme-switch__thumb-icon theme-switch__thumb-icon--moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M20 14.5A6.5 6.5 0 0 1 9.5 4 5 5 0 1 0 20 14.5Z"></path>
          </svg>
        </span>
      </span>
    </button>
  );
}
