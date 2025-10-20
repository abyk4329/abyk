'use client';

import { useCallback, useMemo } from 'react';

import { PageShell } from '@/app/components/layout';
import { Stack } from '@/app/components/shared';
import { Button, Card } from '@/components/neu';
import { PAYMENT } from '@/lib/constants';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';

import styles from './SalesPage.module.css';

interface SalesPageProps {
  code: string;
}

const DETAIL_HIGHLIGHTS = [
  'מהות כל ספרה',
  'חסימות ואתגרים',
  'נורות אזהרה לזיהוי חוסר איזון',
  'מוקדי צמיחה והתפתחות אישית',
  'תחומי קריירה מתאימים',
  'תרגול יומיומי מעשי',
];

const LAST_CODE_STORAGE_KEY = 'abyk:last-code';

const CALLBACK_PARAM_PRIORITY = [
  'callback',
  'success',
  'success_url',
  'return',
  'return_url',
];

export function SalesPage({ code }: SalesPageProps) {
  const sanitizedCode = useMemo(() => {
    if (!code) {
      return '';
    }
    const trimmed = code.trim();
    return /^\d{4}$/.test(trimmed) ? trimmed : '';
  }, [code]);

  const digitsDescription = useMemo(() => {
    if (!code || !/^\d+$/.test(code)) {
      return 'הספרות בקוד';
    }

    const digits = Array.from(new Set(code.split('').map(Number))).sort(
      (a, b) => a - b
    );

    if (digits.length === 0) {
      return 'הספרות בקוד';
    }

    const label = digits.length === 1 ? 'הספרה' : 'הספרות';
    if (digits.length === 1) {
      return `${label} ${digits[0]}`;
    }

    const lastDigit = digits[digits.length - 1];
    const otherDigits = digits.slice(0, -1).join(', ');
    return `${label} ${otherDigits} ו-${lastDigit}`;
  }, [code]);

  const handlePurchase = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const checkoutUrl = PAYMENT.grow.url;

    if (sanitizedCode) {
      try {
        window.sessionStorage.setItem(LAST_CODE_STORAGE_KEY, sanitizedCode);
      } catch (error) {
        console.warn('Failed to persist code in sessionStorage', error);
      }
    }

    try {
      const origin = window.location.origin;
      const thankYouUrl = new URL(routes.thankYou, origin);
      if (sanitizedCode) {
        thankYouUrl.searchParams.set('code', sanitizedCode);
      }

      const targetUrl = new URL(checkoutUrl);
      let applied = false;
      for (const param of CALLBACK_PARAM_PRIORITY) {
        if (!targetUrl.searchParams.has(param)) {
          targetUrl.searchParams.set(param, thankYouUrl.toString());
          applied = true;
          break;
        }
      }

      if (!applied) {
        targetUrl.searchParams.set('callback', thankYouUrl.toString());
      }

      window.location.assign(targetUrl.toString());
    } catch (error) {
      console.error('Failed to redirect to Grow checkout', error);
      window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
    }
  }, [sanitizedCode]);

  return (
    <PageShell
      heading="הפירוש"
      accent="המלא"
      subtitle="להבין לעומק את קוד העושר האישי שלך"
      maxWidth="lg"
      contentSpacing="tight"
    >
      <Stack className={styles.salesPageStack}>
        <Card className={styles.salesPanel}>
          <Stack tight className={styles.salesPanelStack}>
            <h2 className={styles.salesPanelTitle}>
              להבין את הקוד – להבין את עצמך
            </h2>
            <p className={styles.salesPanelText}>
              המספרים בקוד אינם צירוף מקרי. הם משקפים דפוסים עמוקים המניעים אותך
              לאורך חייך. כשאתה מזהה דפוסים אלה, אתה מתחיל לפעול ממקום של
              מודעות, ולא מתוך תגובתיות אוטומטית. זוהי נקודת המפנה שבה השליטה על
              חייך חוזרת לידיך.
            </p>
            <p className={styles.salesPanelText}>
              מטרת העבודה עם הקוד היא לחיות חיים מודעים, שבהם כל פעולה הופכת
              מתגובה לא-מודעת לבחירה מכוונת. הבנה זו מבהירה שאין כוח חיצוני
              המעכב את התקדמותך, אלא תבניות פנימיות שאתה עצמך יוצר. מתוך תובנה
              זו, הכוח שב אליך: כל אתגר הופך להזדמנות ללמידה, וכל צעד – גם אם
              אינו מושלם – הופך לחלק ממסע צמיחה מודע ומשמעותי.
            </p>
          </Stack>
        </Card>

        <Card className={styles.salesPanel}>
          <Stack tight className={styles.salesPanelStack}>
            <h2 className={styles.salesPanelTitle}>
              הפירוש המלא – כל מה שמחכה לכם בפנים
            </h2>
            <p className={styles.salesPanelText}>
              ניתוח מעמיק של {digitsDescription} הכולל:
            </p>
            <ul className={styles.detailList}>
              {DETAIL_HIGHLIGHTS.map((item) => (
                <li key={item} className={styles.detailItem}>
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.salesPanelText}>
              בנוסף, תמצאו בו הסבר על משמעות הספרות החוזרות או השונות בקוד, לצד
              הדרכה ברורה כיצד לשלב את הקוד בחיי היומיום.
            </p>
          </Stack>
        </Card>

        <Card className={cn(styles.salesPanel, styles.ctaPanel)}>
          <Stack tight className={styles.salesPanelStack}>
            <h2 className={styles.salesPanelTitle}>
              הגיע הזמן לגלות מה מספרים מספרים עליך
            </h2>
            <p className={styles.salesPanelText}>
              הפירוש המלא של הקוד מעניק מפתח להבנת הדינמיקות הפנימיות המעצבות את
              חייך. באמצעותו ניתן לזהות את מקורות הדפוסים החוזרים, להבין כיצד
              להשתחרר ממעגלי סבל מתמשכים, ולפתח פרספקטיבה חדשה על האתגרים
              וההזדמנויות הפתוחות בפניך.
            </p>
            <div className={styles.purchasePanel}>
              <p className={styles.price}>עלות הפירוש המלא: ₪36.90</p>
              <p className={styles.caption}>קבלו גישה מיידית לפירוש שלכם</p>
              <Button onClick={handlePurchase} className={styles.ctaButton}>
                מעבר לרכישה
              </Button>
            </div>
          </Stack>
        </Card>
      </Stack>
    </PageShell>
  );
}
