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
      className={`elegant-theme-toggle ${
        theme === 'light' ? 'theme-light' : 'theme-dark'
      }`}
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'עבור למצב כהה' : 'עבור למצב בהיר'}
      type="button"
    >
      <svg
        className={`bulb-icon ${
          theme === 'light' ? 'theme-light' : 'theme-dark'
        }`}
        viewBox="0 0 32 32"
        role="presentation"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="bulb-outline"
          d="M16 4.5c-3.9 0-7 2.96-7 6.64 0 2.26 1.05 4.32 2.73 5.7.78.63 1.19 1.53 1.19 2.47v.93c0 .58.47 1.05 1.05 1.05h4.05c.58 0 1.05-.47 1.05-1.05v-.93c0-.94.41-1.84 1.19-2.47 1.68-1.38 2.73-3.44 2.73-5.7C23 7.46 19.9 4.5 16 4.5Z"
        />
        <circle className="bulb-core" cx="16" cy="12.25" r="3.15" />
        <rect
          className="bulb-base"
          x="12.35"
          y="20.6"
          width="7.3"
          height="3.8"
          rx="1.4"
        />
        <line className="bulb-thread" x1="13.4" y1="22" x2="18.6" y2="22" />
        <line
          className="bulb-thread"
          x1="13.9"
          y1="23.45"
          x2="18.1"
          y2="23.45"
        />
        <line className="bulb-thread" x1="14.6" y1="24.9" x2="17.4" y2="24.9" />
        <line className="bulb-ray" x1="16" y1="2.8" x2="16" y2="5.2" />
        <line className="bulb-ray" x1="10.2" y1="4.1" x2="11.8" y2="5.6" />
        <line className="bulb-ray" x1="21.8" y1="5.6" x2="23.4" y2="4.1" />
        <line className="bulb-ray" x1="8" y1="11.1" x2="10.4" y2="11.1" />
        <line className="bulb-ray" x1="24" y1="11.1" x2="21.6" y2="11.1" />
        <line className="bulb-ray" x1="11.2" y1="2.4" x2="12.6" y2="3.6" />
        <line className="bulb-ray" x1="19.4" y1="3.6" x2="20.8" y2="2.4" />
      </svg>
    </button>
  );
}
