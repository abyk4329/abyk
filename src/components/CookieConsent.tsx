import { useEffect, useState } from 'react';

const CONSENT_STORAGE_KEY = 'cookie-consent';

type ConsentState = 'accepted' | 'dismissed' | null;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const descriptionId = 'cookie-consent-description';

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(
      CONSENT_STORAGE_KEY
    ) as ConsentState;
    if (!stored) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleAccept();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [visible]);

  const handleAccept = () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-live="polite"
      aria-label="הודעת שימוש בקוקיז"
      aria-describedby={descriptionId}
    >
      <div className="cookie-consent__container" dir="rtl">
        <div className="cookie-consent__content">
          <h2 className="cookie-consent__title">שימוש בקוקיז</h2>
          <p id={descriptionId} className="cookie-consent__description">
            אני משתמשת בקוקיז כדי לשפר את חוויית הגלישה שלכם. המשך הגלישה באתר
            מהווה הסכמה לשימוש בקוקיז.
          </p>
        </div>
        <button
          type="button"
          className="cookie-consent__button"
          onClick={handleAccept}
        >
          הבנתי
        </button>
        <a className="cookie-consent__link" href="/legal">
          תנאי שימוש ומדיניות פרטיות
        </a>
      </div>
    </div>
  );
}
