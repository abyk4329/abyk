import Image from "next/image";
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Eye, Download, MessageCircle, Share2, Calculator } from "lucide-react";
import { Footer } from "./Footer";
import Header from "./Header";
import { isFourDigitCode } from "@/lib/urls";
import { useState } from "react";
import { wealthCodeTexts, type DigitBlock } from "@/data/wealthCodeTexts";
import type { CodeStructure } from "@/lib/codeStructure";

const createFallbackDigitBlock = (digit: number): DigitBlock => ({
  digit: String(digit),
  title: `ספרה ${digit}`,
  essence: `מהות הספרה ${digit}`,
  gifts: [`מתנה 1 של ספרה ${digit}`, `מתנה 2 של ספרה ${digit}`],
  challenges: [`אתגר 1 של ספרה ${digit}`, `אתגר 2 של ספרה ${digit}`],
  imbalanceSigns: [`סימן חוסר איזון של ספרה ${digit}`],
  growthAreas: [`תחום צמיחה של ספרה ${digit}`],
  careerPaths: [`נתיב קריירה של ספרה ${digit}`],
  dailyPractice: `תרגול יומי לספרה ${digit}`,
  bottomLine: `מסקנת ספרה ${digit}`,
});

interface ThankYouPageProps {
  wealthCode?: number;
  codeStructure?: CodeStructure | null;
  fullData?: DigitBlock | null;
  onBack: () => void;
  onShowInterpretations?: (code: number) => void;
  onCalculateNew: () => void;
  onShowTerms?: () => void;
  onShowPrivacy?: () => void;
  onShowTermsAndPrivacy?: () => void;
}

export function ThankYouPage({
  wealthCode,
  codeStructure,
  fullData,
  onBack,
  onShowInterpretations,
  onCalculateNew,
  onShowTerms,
  onShowPrivacy,
  onShowTermsAndPrivacy,
}: ThankYouPageProps) {
  const handleViewInterpretation = () => {
    // ניסיון ראשון: להשתמש בקוד שהועבר לפרופס
    if (onShowInterpretations && isFourDigitCode(wealthCode)) {
      onShowInterpretations(Number(wealthCode));
      return;
    }

    // נפילה אחורית: ננסה לקרוא מה-URL עם כל האפשרויות
    try {
      const params = new URLSearchParams(window.location.search);
      const possibleKeys = [
        'code',
        'transaction_id',
        'transactionId',
        'order_id',
        'orderId',
        'payment_id',
        'paymentId',
        'reference',
        'ref',
        'id',
      ];

      let foundCode: number | null = null;
      for (const key of possibleKeys) {
        const paramValue = params.get(key);
        if (paramValue) {
          const parsed = parseInt(paramValue, 10);
          if (!isNaN(parsed) && parsed >= 1111 && parsed <= 9999) {
            foundCode = parsed;
            break;
          }
        }
      }

      if (foundCode && onShowInterpretations) {
        onShowInterpretations(foundCode);
        return;
      }
    } catch (error) {
      console.error('Error parsing URL parameters:', error);
    }

    // נסיון נוסף: לבדוק localStorage / sessionStorage כגיבוי
    try {
      if (typeof window !== 'undefined') {
        const candidates: Array<string | null> = [];
        try {
          candidates.push(localStorage.getItem('lastWealthCode'));
        } catch {}
        try {
          candidates.push(sessionStorage.getItem('lastWealthCode'));
        } catch {}

        for (const value of candidates) {
          if (!value) continue;
          const parsed = parseInt(value, 10);
          if (!isNaN(parsed) && parsed >= 1111 && parsed <= 9999) {
            if (onShowInterpretations) {
              onShowInterpretations(parsed);
              return;
            }
          }
        }
      }
    } catch (e) {
      console.warn('Storage fallback failed:', e);
    }

    // אם אין קוד – נבדוק אם יש לפחות קוד חלקי ב-URL או נציג הודעה
    console.log('No valid code found in props or URL parameters');
    alert("לא נמצא קוד עושר תקין. במידה ובוצעה רכישה, אנא וודאו שהקישור מכיל את הקוד או בצעו חישוב חדש.");
    if (onCalculateNew) {
      onCalculateNew();
    }
  };
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    alert("הורדת PDF זמנית לא זמינה");
  };

  const handleShareCalculator = () => {
    // Navigate to home page for sharing
    onBack();

    // Try to use native sharing if available
    if (navigator.share) {
      navigator
        .share({
          title: "מחשבון קוד העושר - AWAKENING",
          text: "גלו את קוד העושר האישי שלכם עם המחשבון שלנו",
          url: window.location.origin,
        })
        .catch(console.error);
    } else {
      // Fallback to copying URL
      navigator.clipboard
        .writeText(window.location.origin)
        .then(() => {
          alert("הקישור הועתק ללוח. שתפו עם חברים ומשפחה!");
        })
        .catch(() => {
          alert(`שתפו את הקישור: ${window.location.origin}`);
        });
    }
  };

  return (
    <div className="min-h-screen relative" lang="he">
      {/* Overlays over global body background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20"></div>
        <div className="absolute inset-0 backdrop-saturate-110 backdrop-contrast-102 backdrop-brightness-102"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
  {/* Header */}
  <Header />

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div
            className="max-w-4xl mx-auto space-y-8 font-['Assistant']"
            dir="rtl"
          >
            {/* First Card - Thank You and Main Actions */}
            <div className="text-center">
              <Card className="backdrop-blur-xl bg-white/12 border border-white/20 p-6 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)]">
                <div className="text-center space-y-6">
                  {/* Main Title */}
                  <h2
                    className="font-bold mb-4 drop-shadow-lg tracking-wide font-['Assistant']"
                    style={{
                      color: "#FEFEFE",
                      fontSize: "28px",
                    }}
                  >
                    תודה על הרכישה!
                  </h2>

                  <div className="bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 p-6 sm:p-8">
                    <div className="space-y-6 text-center">
                      {/* Main Text */}
                      <p className="text-[rgba(71,59,49,1)] font-light text-[15px] sm:text-[16px] leading-relaxed">
                        הפירוש המלא שלך מוכן עבורך – זה הזמן
                        לגלות את המשמעות העמוקה שמסתתרת מאחורי
                        הקוד האישי שלך.
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                          size="lg"
                          onClick={handleViewInterpretation}
                          className="font-normal border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-4 font-['Assistant'] tracking-wide bg-[rgba(149,112,82,0.5)] hover:bg-[rgba(149,112,82,0.7)] border-none text-[rgba(254,254,254,1)] w-full sm:w-auto"
                        >
                          <Eye className="w-5 h-5 ml-2" />
                          צפייה באתר
                        </Button>

                        <Button
                          size="lg"
                          onClick={handleDownloadPDF}
                          disabled={isDownloading || !codeStructure}
                          className="font-normal border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-4 font-['Assistant'] tracking-wide bg-[rgba(135,103,79,0.4)] hover:bg-[rgba(135,103,79,0.6)] border-none text-[rgba(254,254,254,1)] w-full sm:w-auto"
                        >
                          {isDownloading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              יוצר קובץ...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 ml-2" />
                              הורדת הפירוש
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Secondary Text */}
                      <p className="text-[rgba(71,59,49,1)] font-light text-[13px] sm:text-[14px] leading-relaxed">
                        כדי ליהנות מחוויית קריאה מיטבית, מומלץ
                        להתחיל בצפייה באתר.
                        <br />
                        בנוסף, הפירוש נשלח גם אל כתובת המייל שלך
                        – לשמירה נוחה ולגישה בכל עת.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Second Card - Additional Services and Actions */}
            <div className="text-center">
              <Card className="backdrop-blur-xl bg-white/12 border border-white/20 sm:p-8 shadow-2xl shadow-orange-200/40 bg-[rgba(254,254,254,0.1)] pt-[24px] pr-[24px] pb-[23px] pl-[24px] m-[0px]">
                {/* Sharing Section */}
                <div className="text-center space-y-6 mb-8">
                  <h2
                    className="font-bold drop-shadow-lg tracking-wide font-['Assistant']"
                    style={{
                      color: "#FEFEFE",
                      fontSize: "28px",
                    }}
                  >
                    מה שהאיר לך, יכול להאיר גם לאחרים
                  </h2>

                  <div className="bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 p-6 sm:p-8">
                    <div className="space-y-6 text-center">
                      <p className="text-[rgba(71,59,49,1)] font-light text-[15px] sm:text-[16px] leading-relaxed">
                        שתפו את המחשבון עם חברים ומשפחה ותאפשרו
                        להם לגלות את הפוטנציאל שלהם
                      </p>

                      <Button
                        size="lg"
                        onClick={handleShareCalculator}
                        className="font-normal border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-4 font-['Assistant'] tracking-wide bg-[rgba(135,103,79,0.4)] hover:bg-[rgba(135,103,79,0.6)] border-none text-[rgba(254,254,254,1)] w-full sm:w-auto"
                      >
                        <Share2 className="w-5 h-5 ml-2" />
                        שתפו את המחשבון
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Want to Deepen Section */}
                <div className="text-center space-y-6">
                  <h3
                    className="font-bold drop-shadow-lg tracking-wide font-['Assistant']"
                    style={{
                      color: "#FEFEFE",
                      fontSize: "24px",
                    }}
                  >
                    רוצה להעמיק יותר?
                  </h3>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                      size="lg"
                      onClick={() =>
                        window.open(
                          "https://wa.me/message/PUSKMULYLLD7F1",
                          "_blank",
                        )
                      }
                      className="font-normal border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-4 font-['Assistant'] tracking-wide bg-[rgba(149,112,82,0.5)] hover:bg-[rgba(149,112,82,0.7)] border-none text-[rgba(254,254,254,1)] w-full sm:w-auto"
                    >
                      <MessageCircle className="w-5 h-5 ml-2" />
                      לתיאום ייעוץ אישי
                    </Button>

                    <Button
                      size="lg"
                      onClick={onCalculateNew}
                      className="font-normal border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-4 font-['Assistant'] tracking-wide bg-[rgba(149,112,82,0.3)] hover:bg-[rgba(149,112,82,0.5)] border-none text-[rgba(254,254,254,1)] w-full sm:w-auto"
                    >
                      <Calculator className="w-5 h-5 ml-2" />
                      לחישוב קוד נוסף
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>

        {/* Logo */}
        <div className="flex justify-center pb-6">
          <Image
            src={logoImage}
            alt="AWAKENING"
            className="h-32 sm:h-40 w-auto opacity-90 drop-shadow-lg"
            priority
          />
        </div>

        {/* Footer */}
        <Footer
          onShowTerms={onShowTerms}
          onShowPrivacy={onShowPrivacy}
          onShowTermsAndPrivacy={onShowTermsAndPrivacy}
        />
      </div>
    </div>
  );
}