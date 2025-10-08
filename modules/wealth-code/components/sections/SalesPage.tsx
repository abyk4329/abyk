"use client";

import { useMemo } from "react";
import { GlassButton } from "@/app/components/shared/GlassButton";
import { createHoverHandlers } from "@/app/components/lib/neomorphism-styles";
import styles from "./SalesPage.module.css";

interface SalesPageProps {
  code: string;
  onMockPurchase: () => void;
}

const SALES_CARD_BASE_SHADOW =
  "20px 24px 72px rgba(159,133,114,0.16), -20px -24px 72px rgba(255,255,255,0.94), inset 1px 1px 2px rgba(255,255,255,0.65)";
const SALES_CARD_HOVER_SHADOW =
  "24px 28px 82px rgba(159,133,114,0.2), -24px -28px 82px rgba(255,255,255,0.97), inset 1px 1px 3px rgba(255,255,255,0.72)";
const CTA_CARD_BASE_SHADOW =
  "20px 24px 72px rgba(159,133,114,0.18), -20px -24px 72px rgba(255,255,255,0.95), inset 2px 2px 12px rgba(255,255,255,0.82), inset -2px -2px 9px rgba(211,198,189,0.09)";
const CTA_CARD_HOVER_SHADOW =
  "24px 28px 82px rgba(159,133,114,0.22), -24px -28px 82px rgba(255,255,255,0.98), inset 2px 2px 14px rgba(255,255,255,0.88), inset -2px -2px 10px rgba(211,198,189,0.12)";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export function SalesPage({ code, onMockPurchase }: SalesPageProps) {
  const digitsDescription = useMemo(() => {
    if (!code || !/^\d+$/.test(code)) {
      return "הספרות בקוד";
    }

    const digits = Array.from(new Set(code.split("").map(Number))).sort((a, b) => a - b);

    if (digits.length === 0) {
      return "הספרות בקוד";
    }

    const label = digits.length === 1 ? "הספרה" : "הספרות";
    if (digits.length === 1) {
      return `${label} ${digits[0]}`;
    }

    const lastDigit = digits[digits.length - 1];
    const otherDigits = digits.slice(0, -1).join(", ");
    return `${label} ${otherDigits} ו-${lastDigit}`;
  }, [code]);

  const handlePurchase = () => {
    window.open(
      "https://pay.grow.link/b937d8523ea981c0137af77445265809-MjUyNjAyMQ",
      "_blank"
    );
  };

  return (
    <section className={cn("hero-shell", styles.salesShell)}>
      <div className={styles.contentWrap}>
        <div className={styles.cardsStack}>
          <article
            className={cn(styles.salesCard, "transition-all", "duration-500")}
            {...createHoverHandlers(SALES_CARD_BASE_SHADOW, SALES_CARD_HOVER_SHADOW)}
          >
            <header className={styles.cardHeader}>
              <h2 className={styles.sectionHeading}>להבין את הקוד – להבין את עצמך</h2>
            </header>
            <div className={styles.cardBody}>
              <p className={styles.bodyText}>
                המספרים בקוד אינם צירוף מקרי. הם משקפים דפוסים עמוקים המניעים אותך לאורך חייך. כשאתה מזהה דפוסים אלה, אתה מתחיל לפעול ממקום של מודעות, ולא מתוך תגובתיות אוטומטית. זוהי נקודת המפנה שבה השליטה על חייך חוזרת לידיך.
              </p>
              <p className={styles.bodyText}>
                מטרת העבודה עם הקוד היא לחיות חיים מודעים, שבהם כל פעולה הופכת מתגובה לא-מודעת לבחירה מכוונת. הבנה זו מבהירה שאין כוח חיצוני המעכב את התקדמותך, אלא תבניות פנימיות שאתה עצמך יוצר. מתוך תובנה זו, הכוח שב אליך: כל אתגר הופך להזדמנות ללמידה, וכל צעד – גם אם אינו מושלם – הופך לחלק ממסע צמיחה מודע ומשמעותי.
              </p>
            </div>
          </article>

          <article
            className={cn(styles.salesCard, "transition-all", "duration-500")}
            {...createHoverHandlers(SALES_CARD_BASE_SHADOW, SALES_CARD_HOVER_SHADOW)}
          >
            <header className={styles.cardHeader}>
              <h2 className={styles.sectionHeading}>הפירוש המלא – כל מה שמחכה לכם בפנים</h2>
            </header>
            <div className={styles.cardBody}>
              <p className={styles.bodyText}>
                ניתוח מעמיק של {digitsDescription} הכולל: מהות כל ספרה, חסימות ואתגרים, נורות אזהרה לזיהוי חוסר איזון, מוקדי צמיחה והתפתחות אישית, תחומי קריירה מתאימים ותרגול יומיומי מעשי. בנוסף, תמצאו בו הסבר על משמעות הספרות החוזרות או השונות בקוד, לצד הדרכה ברורה כיצד לשלב את הקוד בחיי היומיום.
              </p>
            </div>
          </article>

          <article
            className={cn(styles.salesCard, styles.ctaCard, "transition-all", "duration-500")}
            {...createHoverHandlers(CTA_CARD_BASE_SHADOW, CTA_CARD_HOVER_SHADOW)}
          >
            <header className={styles.cardHeader}>
              <h2 className={styles.sectionHeading}>הגיע הזמן לגלות מה מספרים מספרים עליך</h2>
            </header>
            <div className={styles.cardBody}>
              <p className={styles.bodyText}>
                הפירוש המלא של הקוד מעניק מפתח להבנת הדינמיקות הפנימיות המעצבות את חייך. באמצעותו ניתן לזהות את מקורות הדפוסים החוזרים, להבין כיצד להשתחרר ממעגלי סבל מתמשכים, ולפתח פרספקטיבה חדשה על האתגרים וההזדמנויות הפתוחות בפניך.
              </p>
              <div className={styles.ctaPanel}>
                <p className={styles.priceHeading}>עלות הפירוש המלא: ₪36.90 בלבד</p>
                <p className={styles.captionText}>לקבלת גישה מיידית לפירוש שלך (caption)</p>
                <div className={styles.actions}>
                  <GlassButton className={styles.actionButton} onClick={handlePurchase}>
                    מעבר לרכישה
                  </GlassButton>
                  <GlassButton
                    className={styles.actionButton}
                    variant="secondary"
                    onClick={onMockPurchase}
                  >
                    דמו
                  </GlassButton>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}