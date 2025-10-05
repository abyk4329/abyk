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

  const handlePurchase = () => {
    window.open('https://pay.grow.link/b937d8523ea981c0137af77445265809-MjUyNjAyMQ', '_blank');
  };

  const handleMockPurchase = () => {
    onMockPurchase();
  };

  return (
    <div className="relative min-h-[calc(100vh-var(--header-height))] pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-4xl">
        
        {/* Card 1: Understanding the Code */}
        <section 
          className="neuro-card-main rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 mb-6 border-0 transition-all duration-500"
        >
          <h2 className="mb-6 text-center">
            להבין את הקוד – להבין את עצמך
          </h2>
          <p className="text-center">
            המספרים בקוד אינם צירוף מקרי. הם משקפים דפוסים עמוקים המניעים אותך לאורך חייך. כשאתה מזהה דפוסים אלה, אתה מתחיל לפעול ממקום של מודעות, ולא מתוך תגובתיות אוטומטית. זוהי נקודת המפנה שבה השליטה על חייך חוזרת לידיך.
          </p>
          <p className="text-center mt-4">
            מטרת העבודה עם הקוד היא לחיות חיים מודעים, שבהם כל פעולה הופכת מתגובה לא-מודעת לבחירה מכוונת. הבנה זו מבהירה שאין כוח חיצוני המעכב את התקדמותך, אלא תבניות פנימיות שאתה עצמך יוצר. מתוך תובנה זו, הכוח שב אליך: כל אתגר הופך להזדמנות ללמידה, וכל צעד – גם אם אינו מושלם – הופך לחלק ממסע צמיחה מודע ומשמעותי.
          </p>
        </section>

        {/* Card 2: Full Analysis */}
        <section 
          className="neuro-card-main rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 mb-6 border-0 transition-all duration-500"
        >
          <h2 className="mb-4 text-center">
            הפירוש המלא
            <br />
            כל מה שמחכה לכם בפנים
          </h2>
          <p className={["text-center mb-4", styles.boldIntro].join(" ")}>
            ניתוח מעמיק של {uniqueDigitsText} הכולל:
          </p>
          <div 
            className="neuro-card-secondary rounded-2xl p-4 sm:p-6 border-0"
          >
            <ul className="space-y-1 text-center">
              <li>•  מהות כל ספרה  •</li>
              <li>•  מתנות עיקריות  •</li>
              <li>•  חסימות ואתגרים  •</li>
              <li>•  נורות אזהרה לזיהוי חוסר איזון  •</li>
              <li>•  מוקדי צמיחה והתפתחות אישית  •</li>
              <li>•  תחומי קריירה מתאימים  •</li>
              <li>•  תרגול יומיומי מעשי  •</li>
            </ul>
          </div>
          <p className="text-center mt-4">
            בנוסף, תמצאו בו הסבר על משמעות הספרות החוזרות או השונות בקוד, לצד הדרכה ברורה כיצד לשלב את הקוד בחיי היומיום.
          </p>
        </section>

        {/* Card 3: Call to Action */}
        <section 
          className="neuro-card-main rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 border-0 transition-all duration-500"
        >
          <h2 className="mb-6 text-center">
            הגיע הזמן לגלות מה מספרים מספרים עליך
          </h2>
          <p className="text-center mb-6">
            הפירוש המלא של הקוד מעניק מפתח להבנת הדינמיקות הפנימיות המעצבות את חייך. באמצעותו ניתן לזהות את מקורות הדפוסים החוזרים, להבין כיצד להשתחרר ממעגלי סבל מתמשכים, ולפתח פרספקטיבה חדשה על האתגרים וההזדמנויות הפתוחות בפניך.
          </p>
          
          {/* Price */}
          <div className="text-center mb-6">
            <h3 className={["mb-2", styles.priceHeading].join(" ")}>
              עלות הפירוש המלא: ₪ 36.9 בלבד
            </h3>
            <p className="caption">
              לקבלת גישה מיידית לפירוש שלך
            </p>
          </div>

          {/* Purchase Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <GlassButton onClick={handlePurchase}>
              מעבר לרכישה
            </GlassButton>
            <GlassButton onClick={handleMockPurchase}>
              דמו תשלום (לבדיקה)
            </GlassButton>
          </div>

          {/* Security Notice */}
          <p className={["text-center", styles.securityNotice].join(" ")}>
            תשלום מובטח באמצעות ספק סליקה חיצוני Grow
          </p>
        </section>

      </div>
    </div>
  );
}