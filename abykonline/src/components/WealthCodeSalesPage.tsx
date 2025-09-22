import backgroundImage from "figma:asset/9a42d447acea050bf24d319ab01daa6b6ac13c0c.png";
import logoImage from "figma:asset/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  ArrowLeft,
  Star,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Footer } from "./Footer";
import { sendWealthCodeEmail } from "./EmailService";
import { useState } from "react";

interface WealthCodeSalesPageProps {
  wealthCode: number;
  codeStructure: {
    digits: number[];
    digitCounts: Record<number, number>;
    repeatedDigits: { digit: number; count: number }[];
    allSame: boolean;
    allDifferent: boolean;
    hasRepeats: boolean;
    type: "master" | "diverse" | "focused" | "balanced";
  };
  fullData?: any; // Add fullData
  onBack: () => void;
  onCalculateNew: () => void;
  onShowThankYou?: (
    wealthCode: number,
    codeStructure: any,
    fullData?: any,
  ) => void;
}

export function WealthCodeSalesPage({
  wealthCode,
  codeStructure,
  fullData,
  onBack,
  onCalculateNew,
  onShowThankYou,
}: WealthCodeSalesPageProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handlePurchase = async () => {
    if (!customerEmail) {
      setShowEmailForm(true);
      return;
    }

    setIsLoading(true);

    try {
      // Send email with the wealth code interpretation
      const result = await sendWealthCodeEmail({
        wealthCode,
        customerName: customerName || undefined,
        customerEmail,
        codeStructure,
      });

      if (result.success) {
        setEmailSent(true);
        onShowThankYou(); // Navigate to thank you page
      } else {
        alert(`שגיאה: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("שגיאה בעיבוד ההזמנה. נסה שוב מאוחר יותר.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerEmail) {
      setShowEmailForm(false);
      handlePurchase();
    }
  };

  return (
    <div className="min-h-screen relative" lang="he">
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          imageRendering: "high-quality",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          willChange: "transform",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20"></div>
        <div className="absolute inset-0 backdrop-saturate-110 backdrop-contrast-102 backdrop-brightness-102"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="backdrop-blur-lg bg-white/15 border-b border-white/30 shadow-xl sm:backdrop-blur-md sm:bg-white/12 sm:border-white/25 bg-[rgba(244,241,234,0.12)]">
          <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between bg-[rgba(254,254,254,0)]">
              {/* Spacer for balance */}
              <div className="w-16">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-[rgba(254,254,254,1)] font-normal hover:text-white/90 hover:bg-white/15 border-0 font-['Assistant'] tracking-wide p-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Centered tagline */}
              <span
                className="font-normal text-xs sm:text-sm md:text-lg tracking-[0.25em] drop-shadow-lg font-['Assistant'] text-center"
                style={{ color: "#473B31" }}
                dir="ltr"
              >
                YOUR PERSONAL SPACE FOR GROWTH
              </span>
              
              {/* Spacer for balance */}
              <div className="w-16"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div
            className="max-w-4xl mx-auto space-y-8 font-['Assistant']"
            dir="rtl"
          >
            {/* Main Code Display */}
            <div className="text-center">
              <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-8 sm:p-12 shadow-2xl shadow-orange-200/40 max-w-2xl mx-auto bg-[rgba(254,254,254,0.12)] bg-[rgba(254,254,254,0.1)]">
                <div className="space-y-6 bg-[rgba(135,103,79,0)]">
                  <h1 className="font-normal drop-shadow-lg tracking-wide text-center text-[rgba(254,254,254,1)] font-['Assistant'] text-[28px] font-bold">
                    קוד העושר האישי שלך הוא
                  </h1>
                  <div className="inline-flex items-center justify-center w-48 h-36 rounded-xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border border-white/25 shadow-2xl text-[rgba(255,255,255,0)]">
                    <span
                      className="text-5xl font-bold tracking-wider text-center"
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
              <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
                <div className="text-center space-y-6">
                  <h2
                    className="font-bold mb-4 drop-shadow-lg tracking-wide font-['Assistant']"
                    style={{
                      color: "#FEFEFE",
                      fontSize: "28px",
                    }}
                  >
                    המשמעות העמוקה של קוד העושר
                  </h2>

                  <div className="bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 bg-[rgba(254,254,254,0.1)] mt-[1px] mr-[0px] mb-[18px] ml-[0px] py-[68px] px-[24px] pt-[30px] pr-[24px] pb-[6px] pl-[24px]">
                    <div className="space-y-4 text-center pt-[0px] pr-[0px] pb-[7px] pl-[0px] mx-[0px] mt-[-13px] mr-[0px] mb-[1px] ml-[0px]">
                      <p className="text-[rgba(71,59,49,1)] font-light text-[15px] leading-relaxed">
                        בחרתי במונח "קוד העושר" ולא "קוד הכסף"
                        מתוך הבנה עמוקה שכסף הוא רק מרכיב אחד
                        במארג השלם של חיים מלאים. עושר אמיתי
                        מורכב מתחושת ערך עצמי איתנה, יציבות
                        רגשית, מערכות יחסים מעשירות, מימוש מלא
                        של הפוטנציאל האישי שלך, ויכולת להגשים את
                        מה שבאמת משמעותי עבורך.
                      </p>
                      <p className="text-[rgba(71,59,49,1)] font-light text-[15px] leading-relaxed">
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
              <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
                <div className="text-center space-y-6">
                  <h2
                    className="font-bold mb-4 drop-shadow-lg tracking-wide font-['Assistant']"
                    style={{
                      color: "#FEFEFE",
                      fontSize: "28px",
                    }}
                  >
                    להבין את הקוד – להבין את עצמך
                  </h2>

                  <div className="bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 bg-[rgba(254,254,254,0.1)] mt-[1px] mr-[0px] mb-[18px] ml-[0px] py-[68px] px-[24px] pt-[30px] pr-[24px] pb-[6px] pl-[24px]">
                    <div className="space-y-4 text-center pt-[0px] pr-[0px] pb-[7px] pl-[0px] mx-[0px] mt-[-13px] mr-[0px] mb-[1px] ml-[0px]">
                      <p className="text-[rgba(71,59,49,1)] font-light text-[15px] leading-relaxed">
                        המספרים בקוד אינם צירוף מקרי. הם משקפים
                        דפוסים עמוקים המניעים אותך לאורך חייך.
                        כשאתה מזהה דפוסים אלה, אתה מתחיל לפעול
                        ממקום של מודעות, ולא מתוך תגובתיות
                        אוטומטית. זוהי נקודת המפנה שבה השליטה על
                        חייך חוזרת לידיך.
                      </p>
                      <p className="text-[rgba(71,59,49,1)] font-light text-[15px] leading-relaxed">
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
              <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
                <div className="text-center space-y-6">
                  <h2
                    className="font-bold mb-4 drop-shadow-lg tracking-wide font-['Assistant']"
                    style={{
                      color: "#FEFEFE",
                      fontSize: "28px",
                    }}
                  >
                    הפירוש המלא – כל מה שמחכה לכם בפנים
                  </h2>

                  <div className="bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 bg-[rgba(254,254,254,0.1)] mt-[1px] mr-[0px] mb-[18px] ml-[0px] py-[68px] px-[24px] pt-[30px] pr-[24px] pb-[6px] pl-[24px]">
                    <div className="space-y-4 text-center pt-[0px] pr-[0px] pb-[7px] pl-[0px] mx-[0px] mt-[-13px] mr-[0px] mb-[1px] ml-[0px]">
                      <p className="text-[rgba(71,59,49,1)] font-light text-[15px] leading-relaxed">
                        ניתוח מעמיק של הספרות{" "}
                        {(() => {
                          const uniqueDigits = [
                            ...new Set(codeStructure.digits),
                          ].sort();
                          if (uniqueDigits.length === 1) {
                            return uniqueDigits[0];
                          } else if (
                            uniqueDigits.length === 2
                          ) {
                            return `${uniqueDigits[0]} ו-${uniqueDigits[1]}`;
                          } else if (
                            uniqueDigits.length === 3
                          ) {
                            return `${uniqueDigits[0]}, ${uniqueDigits[1]} ו-${uniqueDigits[2]}`;
                          } else {
                            return `${uniqueDigits.slice(0, -1).join(", ")} ו-${uniqueDigits[uniqueDigits.length - 1]}`;
                          }
                        })()}{" "}
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
              <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
                <div className="text-center space-y-6">
                  <h2
                    className="font-bold mb-4 drop-shadow-lg tracking-wide font-['Assistant']"
                    style={{
                      color: "#FEFEFE",
                      fontSize: "28px",
                    }}
                  >
                    הגיע הזמן לגלות את המשמעות האמיתית של הקוד
                    האישי שלך
                  </h2>

                  <div className="bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 p-6 sm:p-8">
                    <div className="space-y-6 text-center">
                      <p className="text-[rgba(71,59,49,1)] font-light text-[15px] leading-relaxed">
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
                        <h3 className="text-[rgba(71,59,49,1)] font-normal text-[18px] tracking-wide">
                          עלות הפירוש המלא: ₪36.90 בלבד
                        </h3>

                        <Button
                          size="lg"
                          className="font-normal border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-4 font-['Assistant'] tracking-wide bg-[rgba(149,112,82,0.5)] hover:bg-[rgba(149,112,82,0.7)] border-none text-[rgba(254,254,254,1)] w-full sm:w-auto"
                          onClick={handlePurchase}
                          disabled={isLoading || emailSent}
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              שולח...
                            </>
                          ) : emailSent ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              נשלח בהצלחה!
                            </>
                          ) : (
                            "אני רוצה להכיר את עצמי"
                          )}
                        </Button>

                        <p className="text-[rgba(149,112,82,0.7)] font-light text-[12px] tracking-wide">
                          תשלום מובטח באמצעות ספק סליקה חיצוני
                          Grow
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Email Form */}
            {showEmailForm && (
              <div className="text-center">
                <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-8 sm:p-12 shadow-2xl shadow-orange-200/40 max-w-4xl mx-auto bg-[rgba(254,254,254,0.1)]">
                  <div className="space-y-6">
                    <h2 className="font-bold drop-shadow-lg tracking-wide text-center text-[rgba(254,254,254,1)] font-['Assistant'] text-[28px]">
                      הכנס את פרטייך
                    </h2>
                    <div className="space-y-4 text-center">
                      <p
                        className="font-light leading-relaxed drop-shadow-md tracking-wide text-[16px]"
                        style={{ color: "#473B31" }}
                      >
                        כדי לקבל את הפירוש המלא של קוד העושר
                        האישי שלך, נא הכנס את פרטייך.
                      </p>
                      <form onSubmit={handleEmailFormSubmit}>
                        <div className="space-y-3">
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="שם"
                            value={customerName}
                            onChange={(e) =>
                              setCustomerName(e.target.value)
                            }
                          />
                          <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="כתובת אימייל"
                            value={customerEmail}
                            onChange={(e) =>
                              setCustomerEmail(e.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                          <Button
                            size="lg"
                            className="bg-white/90 hover:bg-white text-[#473B31] font-normal border border-white/30 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-lg py-4 px-8 font-['Assistant'] tracking-wide text-[rgba(254,254,254,1)] bg-[rgba(149,112,82,0.5)] px-[10px] py-[16px] text-[16px]"
                            onClick={handlePurchase}
                          >
                            המשך
                          </Button>


                        </div>
                      </form>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </main>

        {/* Logo - Small, above footer */}
        <div className="flex justify-center pb-6">
          <img
            src={logoImage}
            alt="AWAKENING"
            className="h-20 sm:h-24 w-auto opacity-90 drop-shadow-lg"
          />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}