import { useEffect, useState } from 'react';
import ShareButton from './ShareButton';

interface ThankYouActionsProps {
  code?: string;
}

export default function ThankYouActions({
  code: initialCode,
}: ThankYouActionsProps) {
  const [code, setCode] = useState(initialCode || '');
  const [interpretationsHref, setInterpretationsHref] = useState(
    '/tools/wealth-code/interpretations'
  );

  useEffect(() => {
    // Resolve code from prop or sessionStorage (client only)
    let resolvedCode = initialCode || '';
    if (!resolvedCode && typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('abyk:last-code');
      if (saved) {
        resolvedCode = saved;
      }
    }

    if (resolvedCode) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('abyk:last-code', resolvedCode);
      }
      console.log('ThankYou: resolved code =', resolvedCode);
      setCode(resolvedCode);
      if (/^\d{4}$/.test(resolvedCode)) {
        setInterpretationsHref(
          `/tools/wealth-code/interpretations?code=${resolvedCode}`
        );
        console.log(
          'ThankYou: interpretations link =',
          `/tools/wealth-code/interpretations?code=${resolvedCode}`
        );
      } else {
        setInterpretationsHref('/tools/wealth-code/interpretations');
        console.log(
          'ThankYou: interpretations link = /tools/wealth-code/interpretations'
        );
      }
    } else {
      setCode('');
      setInterpretationsHref('/tools/wealth-code/interpretations');
      console.log('ThankYou: no code, resetting link');
    }
  }, [initialCode]);

  const whatsappUrl = `https://wa.me/972524616121?text=${encodeURIComponent(
    'שלום, רכשתי את הפירוש של קוד העושר ואשמח לייעוץ אישי'
  )}`;

  return (
    <div className="space-y-6" dir="rtl">
      <style>{`
        .card-title-compact {
          margin-bottom: 0.25rem !important;
        }
        .no-margin {
          margin-bottom: 0 !important;
        }
        .page-title-compact {
          margin-bottom: 1rem !important;
        }
      `}</style>

      <div className="neu-raised-min rounded-lg card-mobile-padding text-center">
        <h2 className="PageTitle page-title-compact">תודה על הרכישה!</h2>

        <p className="LeadText">הפירוש המלא נשלח אליך במייל</p>

        <div className="mt-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              console.log(
                'ThankYou button click -> navigating to',
                interpretationsHref
              );
              window.location.href = interpretationsHref;
            }}
            className="btn btn-cta justify-center ButtonPrimaryText"
          >
            צפייה באתר
          </a>
        </div>
      </div>

      <div className="neu-raised-min rounded-lg card-mobile-padding text-center">
        <ShareButton
          title="גילינו את קוד העושר!"
          text={`גילינו את קוד העושר עם Awakening by Ksenia${
            code ? ` - ${code}` : ''
          }`}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <a
          href="/tools/wealth-code/calculator"
          className="neu-raised-min rounded-lg card-mobile-padding text-center hover:shadow-neu-inset transition-shadow"
        >
          <h3 className="CardTitle card-title-compact">חשבו קוד נוסף</h3>
          <p className="SmallNote">לחבר, בן/בת זוג או משפחה</p>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="neu-raised-min rounded-lg card-mobile-padding text-center hover:shadow-neu-inset transition-shadow"
        >
          <h3 className="CardTitle card-title-compact">ייעוץ אישי</h3>
          <p className="SmallNote">מעבר לקביעת ייעוץ</p>
        </a>

        <div className="neu-raised-min rounded-lg card-mobile-padding text-center">
          <h3 className="CardTitle card-title-compact">הצטרפו אלי</h3>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <a
              href="https://www.instagram.com/awakening.by.ksenia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:underline LabelText"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@awakening.by.ksenia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:underline LabelText"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
              TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
