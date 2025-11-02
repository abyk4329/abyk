import { useEffect, useState } from 'react';

interface SalesPanelsProps {
  code?: string;
}

const GROW_CHECKOUT_URL =
  'https://pay.grow.link/b937d8523ea981c0137af77445265809-MjUyNjAyMQ';

export default function SalesPanels({ code }: SalesPanelsProps) {
  const [currentCode, setCurrentCode] = useState(code || '');
  const [savedCodeForDisplay, setSavedCodeForDisplay] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Save code to sessionStorage only if provided
    if (code) {
      sessionStorage.setItem('abyk:last-code', code);
      setCurrentCode(code);
      setSavedCodeForDisplay(code);
    } else {
      // בכרטיסיה השלישית - מושכים את הקוד מ-sessionStorage
      const saved = sessionStorage.getItem('abyk:last-code');
      if (saved) {
        setSavedCodeForDisplay(saved);
      }
    }
    // לא מושכים קוד מ-sessionStorage אם לא הועבר - עמוד מכירה כללי
  }, [code]);

  // Get unique digits from code in ascending order
  const getUniqueDigits = (codeString: string): string => {
    if (!codeString) return '';
    const uniqueDigits = Array.from(new Set(codeString.split('')))
      .sort()
      .join(' ו');
    return uniqueDigits;
  };

  // Format digits with commas and 'ו' before last digit
  const formatDigitsWithCommas = (codeString: string): JSX.Element => {
    if (!codeString) return <></>;
    const uniqueDigits = Array.from(new Set(codeString.split(''))).sort();

    if (uniqueDigits.length === 1) {
      return (
        <span className="text-support font-semibold text-xl">
          {uniqueDigits[0]}
        </span>
      );
    }

    return (
      <>
        {uniqueDigits.map((digit, index) => {
          if (index === uniqueDigits.length - 1) {
            return (
              <span key={digit}>
                ו
                <span className="text-support font-semibold text-xl">
                  {digit}
                </span>
              </span>
            );
          } else if (index === uniqueDigits.length - 2) {
            return (
              <span key={digit}>
                <span className="text-support font-semibold text-xl">
                  {digit}
                </span>{' '}
              </span>
            );
          } else {
            return (
              <span key={digit}>
                <span className="text-support font-semibold text-xl">
                  {digit}
                </span>
                ,{' '}
              </span>
            );
          }
        })}
      </>
    );
  };

  const handlePurchase = () => {
    const storedCode =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('abyk:last-code')
        : null;
    const resolvedCode = currentCode || storedCode || '';
    const callbackUrl = `${window.location.origin}/tools/wealth-code/thank-you${
      resolvedCode ? `?code=${resolvedCode}` : ''
    }`;
    const checkoutUrl = `${GROW_CHECKOUT_URL}?callback=${encodeURIComponent(
      callbackUrl
    )}`;

    try {
      window.location.href = checkoutUrl;
    } catch (err) {
      window.open(checkoutUrl, '_blank');
    }
  };

  return (
    <div className="sales-panels" dir="rtl">
      {/* Main Pricing Card - Neumorphic Style */}
      <div className="card-surface sales-card text-center">
        <h2 className="Title">הפירוש המלא של קוד העושר</h2>

        <p className="LeadText">
          קבלו גישה מיידית לפירוש מקיף ומעמיק שיעזור להבין את עצמכם טוב יותר
          ולממש את הפוטנציאל המלא
        </p>

        <div className="sales-price">
          <div className="Price">₪36.90</div>
          <p className="BigNote">תשלום חד-פעמי • גישה מיידית</p>
        </div>

        <div className="sales-card-actions">
          <button
            type="button"
            onClick={handlePurchase}
            className="btn btn-cta ButtonPrimaryText"
          >
            מעבר לרכישה מאובטחת
          </button>
        </div>

        <p className="SmallNote">תשלום מאובטח 100% דרך Grow</p>
      </div>

      {/* Main Content Section */}
      <div className="card-surface sales-card">
        <div className="text-center">
          <h2 className="LongTitle">
            להבין את הקוד
            <br />
            להבין את עצמך
          </h2>
        </div>

        <div className="sales-card-content text-center">
          <p className="BodyText">
            הפירוש המלא של הקוד מעניק מפתח להבנת הדינמיקות הפנימיות המעצבות את
            חייכם. באמצעותו ניתן לזהות את מקורות הדפוסים החוזרים, להבין כיצד
            להשתחרר ממעגלי סבל מתמשכים, ולפתח פרספקטיבה חדשה על האתגרים
            וההזדמנויות הפתוחות בפניכם.
          </p>

          {isExpanded && (
            <>
              <p className="BodyText">
                המספרים בקוד אינם צירוף מקרים. הם משקפים דפוסים עמוקים המניעים
                אתכם לאורך חייכם. כשאתם מזהים דפוסים אלה, אתם מתחילים לפעול
                ממקום של מודעות, ולא מתוך תגובתיות אוטומטית. זוהי נקודת המפנה
                שבה השליטה על חייכם חוזרת לידיכם.
              </p>

              <p className="BodyText">
                מטרת העבודה עם הקוד היא לחיות חיים מודעים, שבהם כל פעולה הופכת
                מתגובה לא-מודעת לבחירה מכוונת. הבנה זו מבהירה שאין כוח חיצוני
                המעכב את ההתקדמות שלכם, אלא תבניות פנימיות שאתם עצמכם יוצרים.
                מתוך תובנה זו, הכוח שבכם; כל אתגר הופך להזדמנות ללמידה, וכל צעד
                – גם אם אינו מושלם – הופך לחלק ממסע צמיחה מודע ומשמעותי.
              </p>
            </>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-secondary ButtonSecondaryText inline-flex items-center gap-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={
                isExpanded
                  ? 'rotate-180 transition-transform duration-300'
                  : 'transition-transform duration-300'
              }
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <span>{isExpanded ? 'הסתר' : 'קראו עוד'}</span>
          </button>
        </div>
      </div>

      {/* What's Included Section */}
      <div className="card-surface sales-card">
        <div className="text-center">
          <h2 className="LongTitle">
            הפירוש המלא
            <br />
            כל מה שמחכה לך בפנים
          </h2>
        </div>

        <div className="sales-card-content sales-card-content--compact">
          {savedCodeForDisplay ? (
            <p className="FocusText mb-4">
              ניתוח מעמיק של{' '}
              {getUniqueDigits(savedCodeForDisplay).includes('ו')
                ? 'הספרות'
                : 'הספרה'}{' '}
              {formatDigitsWithCommas(savedCodeForDisplay)} הכולל:
            </p>
          ) : (
            <p className="FocusText mb-4">ניתוח מעמיק של הספרות בקוד הכולל:</p>
          )}

          <ul className="sales-list">
            <li className="card-surface sales-list-item">
              <span className="FocusTextLabel font-normal">
                הסבר כיצד לשלב את הקוד בחיי היומיום
              </span>
            </li>
            <li className="card-surface sales-list-item">
              <span className="FocusTextLabel font-normal">
                תחומים מתאימים לקריירה ולשליחות
              </span>
            </li>
            <li className="card-surface sales-list-item">
              <span className="FocusTextLabel font-normal">
                המתנות והכישורים הייחודיים שלך
              </span>
            </li>
            <li className="card-surface sales-list-item">
              <span className="FocusTextLabel font-normal">
                החסמים והאתגרים שחשוב להכיר
              </span>
            </li>
            <li className="card-surface sales-list-item">
              <span className="FocusTextLabel font-normal">
                מהות כל ספרה והמשמעות שלה
              </span>
            </li>
            <li className="card-surface sales-list-item">
              <span className="FocusTextLabel font-normal">
                נורות אזהרה לזיהוי חוסר איזון
              </span>
            </li>
            <li className="card-surface sales-list-item">
              <span className="FocusTextLabel font-normal">
                דוגמה יומית לתרגול והטמעה
              </span>
            </li>
            <li className="card-surface sales-list-item">
              <span className="FocusTextLabel font-normal">
                מוקדי צמיחה והתפתחות
              </span>
            </li>
          </ul>

          <div className="sales-card-content">
            <div className="sales-card-actions">
              <button
                type="button"
                onClick={handlePurchase}
                className="btn btn-cta ButtonPrimaryText"
              >
                קבלו את הפירוש המלא עכשיו
              </button>
            </div>
            <p className="SmallNote">גישה מיידית לאחר התשלום</p>
          </div>
        </div>
      </div>
    </div>
  );
}
