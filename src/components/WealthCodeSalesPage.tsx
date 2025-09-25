import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Footer } from "./Footer";
import Header from "./Header";
import { useEffect, useMemo } from "react";
import type { CodeStructure } from "@/lib/codeStructure";

interface WealthCodeSalesPageProps {
  wealthCode: number;
  codeStructure: CodeStructure;
  onBack: () => void;
  onCalculateNew: () => void;
  onShowThankYou?: (wealthCode: number, codeStructure: CodeStructure) => void;
}

export function WealthCodeSalesPage({
  wealthCode,
  codeStructure,
  onBack,
  onCalculateNew,
  onShowThankYou,
}: WealthCodeSalesPageProps) {
  const uniqueDigits = useMemo(() => codeStructure.uniqueAsc, [codeStructure.uniqueAsc]);

  // Persist the last calculated wealth code for post-payment return flows
  useEffect(() => {
    try {
      if (wealthCode && Number.isFinite(wealthCode)) {
        localStorage.setItem('lastWealthCode', String(wealthCode));
      }
    } catch {}
  }, [wealthCode]);
  const handlePurchase = async () => {
    // שמירת הקוד כגיבוי לפני ניווט החוצה ל-Grow
    try {
      if (wealthCode && Number.isFinite(wealthCode)) {
        try { localStorage.setItem('lastWealthCode', String(wealthCode)); } catch {}
        try { sessionStorage.setItem('lastWealthCode', String(wealthCode)); } catch {}
      }
    } catch {}
    const url = process.env.NEXT_PUBLIC_GROW_PAY_URL ?? "https://pay.grow.link/7ec8e239e21b225640340c6821c3d7a5-MjQ2MDA0Nw";
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (w) w.opener = null;
  };

  const handleSimulatePayment = () => {
    // מדמה הצלחת תשלום ומנווט לעמוד תודה בתוך האפליקציה
    try {
      if (wealthCode && Number.isFinite(wealthCode)) {
        try { localStorage.setItem('lastWealthCode', String(wealthCode)); } catch {}
        try { sessionStorage.setItem('lastWealthCode', String(wealthCode)); } catch {}
      }
    } catch {}
    if (onShowThankYou) {
      onShowThankYou(wealthCode, codeStructure);
    } else {
      // נפילה אחורית: ניווט ישיר לעמוד תודה עם הקוד בURL
      const thankYouUrl = `/thank-you?code=${wealthCode}`;
      window.location.href = thankYouUrl;
    }
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
        {/* Header */}
    <Header />

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div
            className="mx-auto max-w-4xl space-y-8 font-['Assistant']"
            dir="rtl"
          >
            {/* Main Code Display */}
            <div className="text-center">
              <Card className="mx-auto max-w-2xl border border-white/20 bg-[rgba(254,254,254,0.12)] p-8 sm:p-12">
                <div className="space-y-6 bg-[rgba(135,103,79,0)]">
                  <h1 className="text-center font-['Assistant'] text-[28px] font-bold tracking-wide text-[rgba(254,254,254,1)]">
                    קוד העושר האישי שלך הוא
                  </h1>
                  <div className="inline-flex h-36 w-48 items-center justify-center rounded-xl border border-white/25 bg-gradient-to-br from-white/30 to-white/10 text-[rgba(255,255,255,0)] backdrop-blur-sm">
                    <span
                      className="text-center text-5xl font-bold tracking-wider"
                      style={{ color: "#473B31" }}
                    >
                      {wealthCode}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Deep Meaning Card */}
            <div className="text-center">
              <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 sm:p-8">
                <div className="space-y-6 text-center">
                  <h2
                    className="mb-4 font-['Assistant'] font-bold tracking-wide"
                    style={{
                      color: "#FEFEFE",
                      fontSize: "28px",
                    }}
                  >
                    המשמעות העמוקה של קוד העושר
                  </h2>

                  <div className="mb-[18px] ml-[0px] mr-[0px] mt-[1px] rounded-lg border border-white/20 bg-white/10 px-[24px] py-[68px] pb-[6px] pl-[24px] pr-[24px] pt-[30px] backdrop-blur-sm">
                    <div className="mx-[0px] mb-[1px] ml-[0px] mr-[0px] mt-[-13px] space-y-4 pb-[7px] pl-[0px] pr-[0px] pt-[0px] text-center">
                      <p className="text-[15px] font-light leading-relaxed text-[rgba(71,59,49,1)]">
                        בחרתי במונח "קוד העושר" ולא "קוד הכסף"
                        מתוך הבנה עמוקה שכסף הוא רק מרכיב אחד
                        במארג השלם של חיים מלאים. עושר אמיתי
                        מורכב מתחושת ערך עצמי איתנה, יציבות
                        רגשית, מערכות יחסים מעשירות, מימוש מלא
                        של הפוטנציאל האישי שלך, ויכולת להגשים את
                        מה שבאמת משמעותי עבורך.
                      </p>
                      <p className="text-[15px] font-light leading-relaxed text-[rgba(71,59,49,1)]">
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
              <Card className="border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 sm:p-8">
                <div className="space-y-6 text-center">
                  <h2
                    className="mb-4 font-['Assistant'] font-bold tracking-wide"
                    style={{
                      color: "#FEFEFE",
                      fontSize: "28px",
                    }}
                  >
                    להבין את הקוד – להבין את עצמך
                  </h2>

                  <div className="mb-[18px] ml-[0px] mr-[0px] mt-[1px] rounded-lg border border-white/20 bg-white/10 px-[24px] py-[68px] pb-[6px] pl-[24px] pr-[24px] pt-[30px] backdrop-blur-sm">
                    <div className="mx-[0px] mb-[1px] ml-[0px] mr-[0px] mt-[-13px] space-y-4 pb-[7px] pl-[0px] pr-[0px] pt-[0px] text-center">
                      <p className="text-[15px] font-light leading-relaxed text-[rgba(71,59,49,1)]">
                        המספרים בקוד אינם צירוף מקרי. הם משקפים
                        דפוסים עמוקים המניעים אותך לאורך חייך.
                        כשאתה מזהה דפוסים אלה, אתה מתחיל לפעול
                        ממקום של מודעות, ולא מתוך תגובתיות
                        אוטומטית. זוהי נקודת המפנה שבה השליטה על
                        חייך חוזרת לידיך.
                      </p>
                      <p className="text-[15px] font-light leading-relaxed text-[rgba(71,59,49,1)]">
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
              <Card className="border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 sm:p-8">
                <div className="space-y-6 text-center">
                  <h2
                    className="mb-4 font-['Assistant'] font-bold tracking-wide"
                    style={{
                      color: "#FEFEFE",
                      fontSize: "28px",
                    }}
                  >
                    הפירוש המלא – כל מה שמחכה לכם בפנים
                  </h2>

                  <div className="mb-[18px] ml-[0px] mr-[0px] mt-[1px] rounded-lg border border-white/20 bg-white/10 px-[24px] py-[68px] pb-[6px] pl-[24px] pr-[24px] pt-[30px] backdrop-blur-sm">
                    <div className="mx-[0px] mb-[1px] ml-[0px] mr-[0px] mt-[-13px] space-y-4 pb-[7px] pl-[0px] pr-[0px] pt-[0px] text-center">
                      <p className="text-[15px] font-light leading-relaxed text-[rgba(71,59,49,1)]">
                        ניתוח מעמיק של הספרות{" "}
                        {uniqueDigits.length === 1
                          ? uniqueDigits[0]
                          : uniqueDigits.length === 2
                            ? `${uniqueDigits[0]} ו-${uniqueDigits[1]}`
                            : uniqueDigits.length === 3
                              ? `${uniqueDigits[0]}, ${uniqueDigits[1]} ו-${uniqueDigits[2]}`
                              : `${uniqueDigits.slice(0, -1).join(", ")} ו-${uniqueDigits.at(-1)}`}{" "}
                        הכולל: מהות כל ספרה, מתנות מרכזיות,
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
              <Card className="bg-white/12 border border-white/20 bg-[rgba(254,254,254,0.1)] p-6 sm:p-8">
                <div className="space-y-6 text-center">
                  <h2
                    className="mb-4 font-['Assistant'] font-bold tracking-wide"
                    style={{
                      color: "#FEFEFE",
                      fontSize: "28px",
                    }}
                  >
                    הגיע הזמן לגלות את המשמעות האמיתית של הקוד
                    האישי שלך
                  </h2>

                  <div className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm sm:p-8">
                    <div className="space-y-6 text-center">
                      <p className="text-[15px] font-light leading-relaxed text-[rgba(71,59,49,1)]">
                        הפירוש המלא של הקוד מעניק מפתח להבנת
                        הדינמיקות הפנימיות המעצבות את חייך, לצד
                        אבחנה מדויקת של החסמים המעכבים אותך
                        מהתקדמות. באמצעותו ניתן לזהות את מקורות
                        הדפוסים החוזרים, להבין כיצד להשתחרר
                        ממעגלי סבל מתמשכים, ולפתח פרספקטיבה חדשה
                        על האתגרים וההזדמנויות הפתוחות בפניך.
                      </p>

                      {/* Price and Purchase Section */}
                      <div className="mt-8 space-y-6">
                        <h3 className="text-[18px] font-normal tracking-wide text-[rgba(71,59,49,1)]">
                          עלות הפירוש המלא: ₪36.90 בלבד
                        </h3>

                        <Button
                          size="lg"
                          className="w-full border border-none bg-[rgba(149,112,82,0.5)] px-8 py-4 font-['Assistant'] text-lg font-normal tracking-wide text-[rgba(254,254,254,1)] backdrop-blur-sm transition-all duration-300 hover:bg-[rgba(149,112,82,0.7)] sm:w-auto"
                          onClick={handlePurchase}
                        >
                          אני רוצה להכיר את עצמי
                        </Button>

                        {/* כפתור סימולציה לתשלום לצורכי בדיקה מהירה - מוסתר בפרודקשן, אלא אם הוגדר NEXT_PUBLIC_SHOW_SIMULATE=1 */}
                        {(process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SHOW_SIMULATE === '1') && (
                          <div className="flex justify-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleSimulatePayment}
                              className="mt-2 border border-[rgba(149,112,82,0.3)] bg-[rgba(254,254,254,0.1)] px-4 py-2 font-['Assistant'] text-sm font-normal tracking-wide text-[rgba(149,112,82,1)] backdrop-blur-sm transition-all duration-300 hover:bg-[rgba(254,254,254,0.2)]"
                              aria-label="סימולציית תשלום"
                            >
                              סימולציית תשלום (בדיקה)
                            </Button>
                          </div>
                        )}

                        <p className="text-[12px] font-light tracking-wide text-[rgba(149,112,82,0.7)]">
                          תשלום מובטח באמצעות ספק סליקה חיצוני
                          Grow
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
          <img
            src={logoImage.src}
            alt="AWAKENING"
            className="h-20 w-auto opacity-90 sm:h-24"
          />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}