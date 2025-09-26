import Image from "next/image";
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Eye, MessageCircle, Share2, Calculator } from "lucide-react";
import { isFourDigitCode } from "@/lib/urls";
import type { CodeStructure } from "@/lib/codeStructure";

interface ThankYouPageProps {
  wealthCode?: number;
  codeStructure?: CodeStructure | null;
  onBack: () => void;
  onShowInterpretations?: (code: number) => void;
  onCalculateNew: () => void;
}

export function ThankYouPage({
  wealthCode,
  codeStructure: _codeStructure,
  onBack,
  onShowInterpretations,
  onCalculateNew,
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
        } catch (storageError) {
          console.warn('Unable to read lastWealthCode from localStorage:', storageError);
        }
        try {
          candidates.push(sessionStorage.getItem('lastWealthCode'));
        } catch (storageError) {
          console.warn('Unable to read lastWealthCode from sessionStorage:', storageError);
        }

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
        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-4xl space-y-8 font-['Assistant']" dir="rtl">
            {/* First Card - Thank You and Main Actions */}
            <Card className="brand-card p-6 sm:p-8 text-center text-[#87674F]" data-has-code={Boolean(_codeStructure && wealthCode)}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-wide sm:text-4xl">
                  תודה על הרכישה!
                </h2>

                <div className="brand-panel space-y-6 px-6 py-6 text-[#87674F]/90 sm:px-8 sm:py-8">
                  <p className="text-base leading-relaxed sm:text-lg">
                    הפירוש המלא שלך מוכן עבורך – זה הזמן לגלות את המשמעות העמוקה שמסתתרת מאחורי הקוד האישי שלך.
                  </p>

                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                      onClick={handleViewInterpretation}
                      variant="brand"
                      className="w-full text-lg sm:w-auto"
                    >
                      <Eye className="ml-2 h-5 w-5" />
                      צפייה באתר
                    </Button>

                    <Button
                      onClick={handleShareCalculator}
                      variant="subtle"
                      className="w-full text-lg sm:w-auto"
                    >
                      <Share2 className="ml-2 h-5 w-5" />
                      שתפו את המחשבון
                    </Button>
                  </div>

                </div>
              </div>
            </Card>

            {/* Second Card - Additional Services and Actions */}
            <Card className="brand-card p-6 sm:p-8 text-center text-[#87674F]">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold sm:text-3xl">
                    רוצה להעמיק יותר?
                  </h2>
                </div>

                <div className="brand-panel space-y-4 px-6 py-6 sm:px-8 sm:py-8">
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                      onClick={() =>
                        window.open(
                          "https://wa.me/message/PUSKMULYLLD7F1",
                          "_blank",
                        )
                      }
                      variant="brand"
                      className="w-full text-lg sm:w-auto"
                    >
                      <MessageCircle className="ml-2 h-5 w-5" />
                      לתיאום ייעוץ אישי
                    </Button>

                    <Button
                      onClick={onCalculateNew}
                      variant="subtle"
                      className="w-full text-lg sm:w-auto"
                    >
                      <Calculator className="ml-2 h-5 w-5" />
                      לחישוב קוד נוסף
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
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

      </div>
    </div>
  );
}