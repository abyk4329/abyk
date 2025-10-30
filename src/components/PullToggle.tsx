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
      className="mystical-theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'עבור למצב כהה' : 'עבור למצב בהיר'}
      type="button"
    >
      <div className="mystical-scene">
        {/* Sky Background */}
        <div className={`sky-bg ${theme}`}>
          {/* Clouds for day mode */}
          <div className={`clouds ${theme}`}>
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
          </div>
        </div>
        
        {/* Sun for light mode */}
        <div className={`sun ${theme}`}>
          <div className="sun-core"></div>
          <div className="sun-rays"></div>
        </div>

        {/* Moon for dark mode */}
        <div className={`moon ${theme}`}>
          <div className="moon-shape">
            <div className="crater crater-1"></div>
            <div className="crater crater-2"></div>
            <div className="crater crater-3"></div>
          </div>
        </div>

        {/* Stars for dark mode */}
        <div className={`stars-container ${theme}`}>
          <span className="star star-1"></span>
          <span className="star star-2"></span>
          <span className="star star-3"></span>
          <span className="star star-4"></span>
          <span className="star star-5"></span>
          <span className="star star-6"></span>
          <span className="star star-7"></span>
          <span className="star star-8"></span>
          <span className="star star-9"></span>
          <span className="star star-10"></span>
        </div>
      </div>
    </button>
  );
}
