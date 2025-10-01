"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { GlassButton } from "../shared/GlassButton";
const backgroundImage = "/images/61a287a191cbe6aa8bcb3bd084132926dd86fada.png";

interface SalesPageProps {
  code: string;
}

const PURCHASE_URL =
  (process.env.NEXT_PUBLIC_GROW_PAYMENT_LINK ?? "https://pay.grow.link/b937d8523ea981c0137af77445265809-MjUyNjAyMQ") as string;

export function SalesPage({ code }: SalesPageProps) {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [isTouched, setIsTouched] = useState(false);

  const validateEmail = (value: string) => {
    if (!value.trim()) return "אנא הזינו כתובת מייל";
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(value.trim())) {
      return "כתובת המייל אינה תקינה";
    }
    return "";
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedEmail = localStorage.getItem("customerEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const emailError = useMemo(() => {
    if (!isTouched) return "";
    return validateEmail(email);
  }, [email, isTouched]);

  const persistCheckoutContext = (customerEmail: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("customerEmail", customerEmail.trim());
    localStorage.setItem("wealthCode", code);
  };

  // Function to get unique digits in ascending order
  const getUniqueDigits = (codeStr: string): string => {
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
    const validationMessage = validateEmail(email);
    setIsTouched(true);
    if (validationMessage) return;
    persistCheckoutContext(email);
    window.open(PURCHASE_URL, '_blank', 'noopener,noreferrer');
  };

  const handleMockPurchase = () => {
    const validationMessage = validateEmail(email);
    setIsTouched(true);
    if (validationMessage) return;
    persistCheckoutContext(email);
    router.push(`/thank-you?code=${code}&email=${encodeURIComponent(email)}`);
  };

  const handleViewAfterPurchase = () => {
    const validationMessage = validateEmail(email);
    if (validationMessage) {
      setIsTouched(true);
      return;
    }
    persistCheckoutContext(email);
    router.push(`/thank-you?code=${code}&email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="relative min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-8 fullscreen-bg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          top: `calc(-1 * env(safe-area-inset-top))`,
          left: `calc(-1 * env(safe-area-inset-left))`,
          right: `calc(-1 * env(safe-area-inset-right))`,
          bottom: `calc(-1 * env(safe-area-inset-bottom))`,
          width: 'calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))',
          height: 'calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))'
        }}
      />

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50 -z-10"
        style={{
          top: `calc(-1 * env(safe-area-inset-top))`,
          left: `calc(-1 * env(safe-area-inset-left))`,
          right: `calc(-1 * env(safe-area-inset-right))`,
          bottom: `calc(-1 * env(safe-area-inset-bottom))`,
          width: 'calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))',
          height: 'calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-4xl">
        
        {/* Card 1: Understanding the Code */}
        <section className="glass-card-main rounded-2xl p-6 sm:p-8 mb-6 transition-all duration-500 hover:shadow-[0_8px_32px_0_rgba(94,73,52,0.2)]">
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
        <section className="glass-card-main rounded-2xl p-6 sm:p-8 mb-6 transition-all duration-500 hover:shadow-[0_8px_32px_0_rgba(94,73,52,0.2)]">
          <h2 className="mb-4 text-center" style={{ color: '#5e4934', textShadow: '0 1px 2px rgba(0, 0, 0, 0.07)' }}>
            הפירוש המלא
            <br />
            כל מה שמחכה לכם בפנים
          </h2>
          <p className="text-center mb-4" style={{ fontWeight: 'bold', color: '#87674F' }}>
            ניתוח מעמיק של {uniqueDigitsText} הכולל:
          </p>
          <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.15),0_2px_8px_0_rgba(94,73,52,0.08)]">
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
        <section className="glass-card-main rounded-3xl p-8 sm:p-12 transition-all duration-500 hover:shadow-[0_12px_40px_0_rgba(94,73,52,0.25)]">
          <h2 className="mb-6 text-center">
            הגיע הזמן לגלות מה מספרים מספרים עליך
          </h2>
          <p className="text-center mb-6">
            הפירוש המלא של הקוד מעניק מפתח להבנת הדינמיקות הפנימיות המעצבות את חייך. באמצעותו ניתן לזהות את מקורות הדפוסים החוזרים, להבין כיצד להשתחרר ממעגלי סבל מתמשכים, ולפתח פרספקטיבה חדשה על האתגרים וההזדמנויות הפתוחות בפניך.
          </p>

          {/* Email Capture */}
          <div className="max-w-md mx-auto mb-6">
            <label htmlFor="customer-email" className="block text-right mb-2 text-sm" style={{ color: '#87674F' }}>
              להזנת כתובת המייל לקבלת הפירוש במייל מיד לאחר הרכישה
            </label>
            <input
              id="customer-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              onBlur={() => setIsTouched(true)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 backdrop-blur-xl bg-white/20 rounded-2xl text-right transition-all duration-300 shadow-[0_4px_16px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#87674F]/30 focus:bg-white/30 focus:shadow-[0_6px_20px_0_rgba(94,73,52,0.15),inset_0_2px_4px_0_rgba(255,255,255,0.4)] hover:bg-white/25 hover:shadow-[0_6px_20px_0_rgba(94,73,52,0.12)] active:scale-[0.99]"
              style={{ color: '#5e4934' }}
              autoComplete="email"
              inputMode="email"
              dir="ltr"
            />
            {emailError && (
              <p className="mt-2 text-sm" style={{ color: '#c2410c', textAlign: 'right' }}>
                {emailError}
              </p>
            )}
          </div>
          
          {/* Price */}
          <div className="text-center mb-6">
            <h3 className="mb-2" style={{ color: '#5e4934', textShadow: '0 1px 2px rgba(0, 0, 0, 0.06)' }}>
              עלות הפירוש המלא: ₪36.90 בלבד
            </h3>
            <p className="caption">
              לקבלת גישה מיידית לפירוש שלך
            </p>
          </div>

          {/* Purchase Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <GlassButton
              onClick={handlePurchase}
              disabled={!email.trim() || Boolean(emailError)}
            >
              מעבר לרכישה
            </GlassButton>
            <GlassButton
              onClick={handleMockPurchase}
              disabled={!email.trim() || Boolean(emailError)}
            >
              דמו תשלום (לבדיקה)
            </GlassButton>
          </div>

          <div className="flex justify-center mb-6">
            <GlassButton
              onClick={handleViewAfterPurchase}
              className="w-full sm:w-auto"
              disabled={!email.trim() || Boolean(emailError)}
              variant="secondary"
            >
              כבר רכשתם? מעבר לפירוש ותודה
            </GlassButton>
          </div>

          {/* Security Notice */}
          <p className="text-center" style={{ 
            fontSize: '12px',
            color: '#9f8572',
            lineHeight: '1.1'
          }}>
            תשלום מובטח באמצעות ספק סליקה חיצוני Grow
          </p>
        </section>

      </div>
    </div>
  );
}