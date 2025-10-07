"use client";

import { GlassButton } from "@/app/components/shared/GlassButton";
import { CodeInset } from "../shared/CodeInset";
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
    <section className={styles.salesShell}>
      <div className={styles.content}>
        {/* Card 1: Context & Code */}
        <article className={["neuro-card-main", styles.card, styles.cardIntro].join(" ")}>
          <header className={styles.cardHeader}>
            <span className={styles.cardMeta}>Awakening by Ksenia</span>
            <h1 className={styles.pageTitle}>להבין את הקוד – להבין את עצמך</h1>
          </header>
          <div className={styles.cardBody}>
            <div className={styles.codeShowcase}>
              <CodeInset code={code} />
              <p className={styles.codeNote}>הספרות המרכזיות בקוד שלך: {uniqueDigitsText}</p>
            </div>
            <p className={styles.heroText}>
              המספרים בקוד אינם צירוף מקרי. הם משקפים דפוסים עמוקים המניעים אותך לאורך חייך. כשאתה מזהה דפוסים אלה, אתה מתחיל לפעול ממקום של מודעות, ולא מתוך תגובתיות אוטומטית. זוהי נקודת המפנה שבה השליטה על חייך חוזרת לידיך.
            </p>
            <p className={styles.heroText}>
              מטרת העבודה עם הקוד היא לחיות חיים מודעים, שבהם כל פעולה הופכת מתגובה לא-מודעת לבחירה מכוונת. הבנה זו מבהירה שאין כוח חיצוני המעכב את התקדמותך, אלא תבניות פנימיות שאתה עצמך יוצר. מתוך תובנה זו, הכוח שב אליך: כל אתגר הופך להזדמנות ללמידה, וכל צעד – גם אם אינו מושלם – הופך לחלק ממסע צמיחה מודע ומשמעותי.
            </p>
          </div>
        </article>

        {/* Card 2: Analysis Highlights */}
        <article className={["neuro-card-shell", styles.card, styles.cardAnalysis].join(" ")}>
          <header className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              מה מחכה לכם בפירוש המלא
            </h2>
            <p className={styles.cardSubtitle}>
              ניתוח מעמיק של {uniqueDigitsText} וההשלכות בחיי היום-יום
            </p>
          </header>
          <div className={styles.cardBody}>
            <div className={["neuro-card-inset-lite", styles.featurePanel].join(" ")}>
              <div className={styles.dividerList} role="list">
                {analysisHighlights.map((item) => (
                  <div role="listitem" key={item} className={styles.dividedItem}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <p className={styles.analysisNote}>
              בנוסף תמצאו הסבר ברור על ספרות שחוזרות או משתנות בקוד, יחד עם דרך יישומית לשלב את המסקנות בשגרה היומיומית.
            </p>
          </div>
        </article>

        {/* Card 3: Call to Action */}
        <article className={["neuro-card-cta", styles.card, styles.cardCta].join(" ")}>
          <header className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>הגיע הזמן לגלות מה מספרים מספרים עליך</h2>
            <p className={styles.cardSubtitle}>
              הכלים המדויקים להתחבר לעוצמות שלך ולהפסיק לחזור על אותם מעגלים
            </p>
          </header>
          <div className={styles.cardBody}>
            <p>
              הפירוש המלא מעניק הסבר עמוק לדינמיקות הפנימיות שמעצבות את חייך, ממפה את נקודות החסימה ומציע מסלול התקדמות ברור לשינוי אמיתי ומתמשך.
            </p>

            <div className={["neuro-card-inset-lite", styles.actionSurface].join(" ")}>
              <div className={styles.priceBlock}>
                <h3 className={styles.priceHeading}>עלות הפירוש המלא: ₪ 36.9</h3>
                <p className="caption">גישה מיידית לקובץ והפירוש האישי</p>
              </div>

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
              <p className={styles.securityNotice}>תשלום מאובטח באמצעות ספק הסליקה Grow</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}