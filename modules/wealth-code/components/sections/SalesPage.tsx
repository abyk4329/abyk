"use client";

import { GlassButton } from "@/app/components/shared/GlassButton";
import styles from "./SalesPage.module.css";

interface SalesPageProps {
  code: string;
  onMockPurchase: () => void;
}

export function SalesPage({ code, onMockPurchase }: SalesPageProps) {
  // Function to get unique digits in ascending order
  const getUniqueDigits = (codeStr: string): string => {
    // Validate input contains only digits
    if (!/^\d+$/.test(codeStr)) {
      console.warn('Invalid code format:', codeStr);
      return 'הספרות בקוד';
    }

    const digits = codeStr.split('').map(Number);
    const uniqueDigits = Array.from(new Set(digits)).sort((a, b) => a - b);
    
    if (uniqueDigits.length === 1) {
      return `הספרה ${uniqueDigits[0]}`;
    } else if (uniqueDigits.length === 2) {
      return `הספרות ${uniqueDigits[0]} ו-${uniqueDigits[1]}`;
    } else {
      const lastDigit = uniqueDigits[uniqueDigits.length - 1];
      const otherDigits = uniqueDigits.slice(0, -1).join(', ');
      return `הספרות ${otherDigits} ו-${lastDigit}`;
    }
  };

  const uniqueDigitsText = getUniqueDigits(code);

  const analysisHighlights = [
    "מהות כל ספרה",
    "מתנות עיקריות",
    "חסימות ואתגרים",
    "נורות אזהרה לזיהוי חוסר איזון",
    "מוקדי צמיחה והתפתחות אישית",
    "תחומי קריירה מתאימים",
    "תרגול יומיומי מעשי",
  ];

  const handlePurchase = () => {
    window.open('https://pay.grow.link/b937d8523ea981c0137af77445265809-MjUyNjAyMQ', '_blank');
  };

  const handleMockPurchase = () => {
    onMockPurchase();
  };

  return (
    <div className={["relative min-h-[calc(100vh-var(--header-height))] pb-8", styles.salesShell].join(" ")}>
      <div className={styles.backgroundGlow} aria-hidden="true" />
  <div className={["mx-auto px-3 sm:px-6 lg:px-8 w-full", styles.content].join(" ")}>
        
        {/* Card 1: Understanding the Code */}
        <section
          className={[
            "neuro-card-shell transition-all duration-500",
            styles.card,
            styles.cardIntro,
          ].join(" ")}
        >
          <header className={styles.cardHeader}>
            <h2 className={["text-center", styles.cardTitle].join(" ")}>
            להבין את הקוד – להבין את עצמך
            </h2>
          </header>
          <div className={styles.cardBody}>
            <p>
              המספרים בקוד אינם צירוף מקרי. הם משקפים דפוסים עמוקים המניעים אותך לאורך חייך. כשאתה מזהה דפוסים אלה, אתה מתחיל לפעול ממקום של מודעות, ולא מתוך תגובתיות אוטומטית. זוהי נקודת המפנה שבה השליטה על חייך חוזרת לידיך.
            </p>
            <p>
              מטרת העבודה עם הקוד היא לחיות חיים מודעים, שבהם כל פעולה הופכת מתגובה לא-מודעת לבחירה מכוונת. הבנה זו מבהירה שאין כוח חיצוני המעכב את התקדמותך, אלא תבניות פנימיות שאתה עצמך יוצר. מתוך תובנה זו, הכוח שב אליך: כל אתגר הופך להזדמנות ללמידה, וכל צעד – גם אם אינו מושלם – הופך לחלק ממסע צמיחה מודע ומשמעותי.
            </p>
          </div>
        </section>

        {/* Card 2: Full Analysis */}
        <section
          className={[
            "neuro-card-shell transition-all duration-500",
            styles.card,
            styles.cardAnalysis,
          ].join(" ")}
        >
          <header className={styles.cardHeader}>
            <h2 className={["text-center", styles.cardTitle].join(" ")}>
              הפירוש המלא
              <br />
              כל מה שמחכה לכם בפנים
            </h2>
          </header>
          <div className={styles.cardBody}>
            <p className={styles.boldIntro}>
              ניתוח מעמיק של {uniqueDigitsText} הכולל:
            </p>
            <div className={["neuro-card-inset-lite border-0", styles.featurePanel].join(" ")}>
              <ul className={styles.featureList}>
                {analysisHighlights.map((item) => (
                  <li key={item}>
                    <span className={styles.featureBullet} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p>
              בנוסף, תמצאו בו הסבר על משמעות הספרות החוזרות או השונות בקוד, לצד הדרכה ברורה כיצד לשלב את הקוד בחיי היומיום.
            </p>
          </div>
        </section>

        {/* Card 3: Call to Action */}
        <section
          className={[
            "neuro-card-cta transition-all duration-500",
            styles.card,
            styles.cardCta,
          ].join(" ")}
        >
          <header className={styles.cardHeader}>
            <h2 className={["text-center", styles.cardTitle].join(" ")}>
              הגיע הזמן לגלות מה מספרים מספרים עליך
            </h2>
          </header>
          <div className={styles.cardBody}>
            <p>
              הפירוש המלא של הקוד מעניק מפתח להבנת הדינמיקות הפנימיות המעצבות את חייך. באמצעותו ניתן לזהות את מקורות הדפוסים החוזרים, להבין כיצד להשתחרר ממעגלי סבל מתמשכים, ולפתח פרספקטיבה חדשה על האתגרים וההזדמנויות הפתוחות בפניך.
            </p>
          
          {/* Price */}
          <div className={styles.priceBlock}>
            <h3 className={styles.priceHeading}>
              עלות הפירוש המלא: ₪ 36.9 בלבד
            </h3>
            <p className="caption">
              לקבלת גישה מיידית לפירוש שלך
            </p>
          </div>

          {/* Purchase Buttons */}
          <div className={styles.actions}>
            <GlassButton className={styles.actionButton} onClick={handlePurchase}>
              מעבר לרכישה
            </GlassButton>
            <GlassButton
              className={styles.actionButton}
              variant="secondary"
              onClick={handleMockPurchase}
            >
              דמו תשלום (לבדיקה)
            </GlassButton>
          </div>

          {/* Security Notice */}
          <p className={styles.securityNotice}>
            תשלום מובטח באמצעות ספק סליקה חיצוני Grow
          </p>
          </div>
        </section>

      </div>
    </div>
  );
}