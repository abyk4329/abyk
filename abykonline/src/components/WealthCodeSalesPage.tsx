"use client";

import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { CodeStructure } from "@/lib/codeStructure";
import { paths } from "@/lib/urls";

interface WealthCodeSalesPageProps {
  wealthCode: number;
  codeStructure: CodeStructure;
}

export function WealthCodeSalesPage({
  wealthCode,
  codeStructure,
}: WealthCodeSalesPageProps) {
  const router = useRouter();
  const uniqueDigits = useMemo(() => codeStructure.uniqueAsc, [codeStructure.uniqueAsc]);
  const uniqueDigitsLabel = useMemo(() => {
    if (uniqueDigits.length === 1) {
      return `${uniqueDigits[0]}`;
    }
    if (uniqueDigits.length === 2) {
      return `${uniqueDigits[0]} ו-${uniqueDigits[1]}`;
    }
    if (uniqueDigits.length === 3) {
      return `${uniqueDigits[0]}, ${uniqueDigits[1]} ו-${uniqueDigits[2]}`;
    }
    if (uniqueDigits.length > 0) {
      const allButLast = uniqueDigits.slice(0, -1).join(", ");
      const last = uniqueDigits.at(-1);
      return `${allButLast} ו-${last}`;
    }
    return "";
  }, [uniqueDigits]);

  // Shared function to save wealth code to storage
  const saveWealthCode = useCallback(() => {
    if (!wealthCode || !Number.isFinite(wealthCode)) return;

    try {
      localStorage.setItem('lastWealthCode', String(wealthCode));
    } catch (storageError) {
      console.warn('Unable to cache lastWealthCode in localStorage:', storageError);
    }

    try {
      sessionStorage.setItem('lastWealthCode', String(wealthCode));
    } catch (storageError) {
      console.warn('Unable to cache lastWealthCode in sessionStorage:', storageError);
    }
  }, [wealthCode]);

  // Persist the last calculated wealth code for post-payment return flows
  useEffect(() => {
    saveWealthCode();
  }, [saveWealthCode]);
  
  const handlePurchase = async () => {
    // שמירת הקוד כגיבוי לפני ניווט החוצה ל-Grow
  saveWealthCode();
  const url = process.env.NEXT_PUBLIC_GROW_PAY_URL ?? "https://pay.grow.link/b937d8523ea981c0137af77445265809-MjUyNjAyMQ";
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (w) w.opener = null;
  };

  const handleSimulatePayment = () => {
    // מדמה הצלחת תשלום ומנווט לעמוד תודה בתוך האפליקציה
    saveWealthCode();
    const target = paths.thankYou(wealthCode);
    router.push(target);
  };

  return (
    <div className="relative min-h-screen" lang="he" dir="rtl">
      {/* Overlays over global body background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20"></div>
        <div className="backdrop-saturate-110 backdrop-contrast-102 backdrop-brightness-102 absolute inset-0"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col">

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div
            className="mx-auto max-w-4xl space-y-8 font-['Assistant']"
            dir="rtl"
          >
            {/* Main Code Display */}
            <div className="text-center">
              <Card className="brand-card mx-auto max-w-2xl p-8 sm:p-12">
                <div className="space-y-6">
                  <h1 className="text-center font-['Assistant'] text-3xl font-bold tracking-wide text-[#5E4934] sm:text-[32px]">
                    קוד העושר האישי שלך הוא
                  </h1>
                  <div className="brand-code-display">
                    {wealthCode}
                  </div>
                </div>
              </Card>
            </div>

            {/* Deep Meaning Card */}
            <div className="text-center">
              <Card className="brand-card p-6 sm:p-8">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-wide text-[#5E4934] sm:text-[30px]">
                    המשמעות העמוקה של קוד העושר
                  </h2>

                  <div className="brand-panel px-6 py-8 text-right sm:px-10 sm:py-10">
                    <div className="space-y-4 text-base leading-relaxed text-[#5E4934]">
                      <p>
                        בחרתי במונח &quot;קוד העושר&quot; ולא &quot;קוד הכסף&quot;
                        מתוך הבנה עמוקה שכסף הוא רק מרכיב אחד
                        במארג השלם של חיים מלאים. עושר אמיתי
                        מורכב מתחושת ערך עצמי איתנה, יציבות
                        רגשית, מערכות יחסים מעשירות, מימוש מלא
                        של הפוטנציאל האישי שלך, ויכולת להגשים את
                        מה שבאמת משמעותי עבורך.
                      </p>
                      <p>
                        הקוד האישי שלך פועל כמצפן פנימי רב-עוצמה
                        – הוא חושף את הכישרונות והחוזקות המולדים
                        שלך, מאיר את החסמים החוזרים שמעכבים את
                        התקדמותך, ומצביע על נתיבי פריצת דרך
                        אפשריים בכל תחומי החיים, לא רק במישור
                        הכלכלי.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Understanding The Code Card */}
            <div className="text-center">
              <Card className="brand-card p-6 sm:p-8">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-wide text-[#5E4934] sm:text-[30px]">
                    להבין את הקוד – להבין את עצמך
                  </h2>

                  <div className="brand-panel px-6 py-8 text-right sm:px-10 sm:py-10">
                    <div className="space-y-4 text-base leading-relaxed text-[#5E4934]">
                      <p>
                        המספרים בקוד אינם צירוף מקרי. הם משקפים
                        דפוסים עמוקים המניעים אותך לאורך חייך.
                        כשאתה מזהה דפוסים אלה, אתה מתחיל לפעול
                        ממקום של מודעות, ולא מתוך תגובתיות
                        אוטומטית. זוהי נקודת המפנה שבה השליטה על
                        חייך חוזרת לידיך.
                      </p>
                      <p>
                        מטרת העבודה עם הקוד היא לחיות חיים
                        מודעים, שבהם כל פעולה הופכת מתגובה
                        לא-מודעת לבחירה מכוונת. הבנה זו מבהירה
                        שאין כוח חיצוני המעכב את התקדמותך, אלא
                        תבניות פנימיות שאתה עצמך יוצר. מתוך
                        תובנה זו, הכוח שב אליך: כל אתגר הופך
                        להזדמנות ללמידה, וכל צעד – גם אם אינו
                        מושלם – הופך לחלק ממסע צמיחה מודע
                        ומשמעותי.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* What's Included */}
            <div className="text-center">
              <Card className="brand-card p-6 sm:p-8">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-wide text-[#5E4934] sm:text-[30px]">
                    הפירוש המלא – כל מה שמחכה לכם בפנים
                  </h2>

                  <div className="brand-panel px-6 py-8 text-right sm:px-10 sm:py-10">
                    <div className="space-y-4 text-base leading-relaxed text-[#5E4934]">
                      <p>
                        ניתוח מעמיק של הספרות {uniqueDigitsLabel} הכולל: מהות כל ספרה,
                        חסימות ואתגרים, נורות אזהרה לזיהוי חוסר
                        איזון, מוקדי צמיחה והתפתחות אישית, תחומי
                        קריירה מתאימים ותרגול יומיומי מעשי.
                        בנוסף, תמצאו בו הסבר על משמעות הספרות
                        החוזרות או השונות בקוד שלכם, לצד הדרכה
                        ברורה כיצד לשלב את הקוד בחיי היומיום.
                      </p>
                    </div>
                  </div>

                  {/* Additional Benefits */}
                </div>
              </Card>
            </div>

            {/* Sharing and Additional Services Card */}
            <div className="text-center"></div>

            {/* Time to Discover Card */}
            <div className="text-center">
              <Card className="brand-card p-6 sm:p-8">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-wide text-[#5E4934] sm:text-[30px]">
                    הגיע הזמן לגלות את המשמעות האמיתית של הקוד
                    האישי שלך
                  </h2>

                  <div className="brand-panel px-6 py-8 text-right sm:px-10 sm:py-10">
                    <div className="space-y-6 text-base leading-relaxed text-[#5E4934]">
                      <p>
                        הפירוש המלא של הקוד מעניק מפתח להבנת
                        הדינמיקות הפנימיות המעצבות את חייך, לצד
                        אבחנה מדויקת של החסמים המעכבים אותך
                        מהתקדמות. באמצעותו ניתן לזהות את מקורות
                        הדפוסים החוזרים, להבין כיצד להשתחרר
                        ממעגלי סבל מתמשכים, ולפתח פרספקטיבה חדשה
                        על האתגרים וההזדמנויות הפתוחות בפניך.
                      </p>

                      <div className="space-y-6 pt-4 text-center">
                        <h3 className="text-xl font-semibold text-[#5E4934]">
                          עלות הפירוש המלא: ₪36.90 בלבד
                        </h3>

                        <Button
                          size="lg"
                          className="w-full font-['Assistant'] sm:w-auto"
                          onClick={handlePurchase}
                          aria-label="לרכישת פירוש קוד העושר האישי"
                        >
                          אני רוצה להכיר את עצמי
                        </Button>

                        {(process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SHOW_SIMULATE === '1') && (
                          <div className="flex justify-center">
                            <Button
                              size="sm"
                              variant="subtle"
                              onClick={handleSimulatePayment}
                              className="font-['Assistant']"
                              aria-label="סימולציית תשלום"
                            >
                              סימולציית תשלום (בדיקה)
                            </Button>
                          </div>
                        )}

                        <p className="text-xs font-light tracking-wide text-[#5E4934]/70">
                          תשלום מובטח באמצעות ספק סליקה חיצוני Grow
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>

        {/* Logo - Small, above footer */}
        <div className="flex justify-center pb-6">
          <Image
            src={logoImage}
            alt="AWAKENING"
            className="h-20 w-auto opacity-90 sm:h-24"
          />
        </div>

      </div>
    </div>
  );
}