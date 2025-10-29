import { useEffect, useId, useState } from 'react';

const STORAGE_KEY = 'theme';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps = {}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const toggleId = useId();
  const statusId = `${toggleId}-status`;

  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | null;
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      root.setAttribute('data-theme', saved);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      root.setAttribute('data-theme', initial);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemPreference = (event: MediaQueryListEvent) => {
      const saved = localStorage.getItem(STORAGE_KEY) as
        | 'light'
        | 'dark'
        | null;
      if (saved === 'light' || saved === 'dark') {
        return;
      }
      setTheme(event.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', handleSystemPreference);
    return () => media.removeEventListener('change', handleSystemPreference);
  }, []);

  const isDark = theme === 'dark';

  if (!mounted) {
    return <div className="h-[48px] w-[92px]"></div>;
  }

  const handleToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const actionLabel = isDark ? 'הפעילו מצב בהיר' : 'הפעילו מצב כהה';
  const statusMessage = isDark ? 'מצב כהה פעיל' : 'מצב בהיר פעיל';

  const wrapperClass = className
    ? `theme-toggle__wrapper ${className}`
    : 'theme-toggle__wrapper';

  return (
    <div className={wrapperClass}>
      <input
        id={toggleId}
        type="checkbox"
        className="theme-toggle__input"
        checked={isDark}
        onChange={handleToggle}
        aria-label={actionLabel}
        aria-describedby={statusId}
      />
      <label
        htmlFor={toggleId}
        className={`theme-toggle ${
          isDark ? 'theme-toggle--dark' : 'theme-toggle--light'
        }`}
      >
        <span className="theme-toggle__track" aria-hidden="true">
          <span className="theme-toggle__beam" />
          <span className="theme-toggle__indicator">
            <span className="theme-toggle__lamp theme-toggle__lamp--on">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <path
                  className="theme-toggle__lamp-shade"
                  d="M6.75 5.25h10.5l1.35 4.5a3.25 3.25 0 0 1-3.1 4.3H8.5a3.25 3.25 0 0 1-3.1-4.3Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14.5h4v2.5h-4z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 18h6"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <path
                  d="M10.5 20h3"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <line
                  x1="12"
                  y1="3"
                  x2="12"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <line
                  x1="14.5"
                  y1="3.5"
                  x2="13.5"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <line
                  x1="9.5"
                  y1="3.5"
                  x2="10.5"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="theme-toggle__lamp theme-toggle__lamp--off">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <path
                  className="theme-toggle__lamp-shade"
                  d="M6.75 5.25h10.5l1.35 4.5a3.25 3.25 0 0 1-3.1 4.3H8.5a3.25 3.25 0 0 1-3.1-4.3Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14.5h4v2.5h-4z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 18h6"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <path
                  d="M10.5 20h3"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <line
                  x1="12"
                  y1="3"
                  x2="12"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <line
                  x1="14.5"
                  y1="3.5"
                  x2="13.5"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <line
                  x1="9.5"
                  y1="3.5"
                  x2="10.5"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <line
                  x1="16.5"
                  y1="13"
                  x2="19"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </span>
        <span
          id={statusId}
          className="theme-toggle__sr-only"
          aria-live="polite"
        >
          {statusMessage}
        </span>
      </label>
    </div>
  );
}
