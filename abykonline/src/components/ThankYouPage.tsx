"use client";

import Image from "next/image";
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Eye, MessageCircle, Share2, Calculator } from "lucide-react";
import { isFourDigitCode } from "@/lib/urls";
import type { CodeStructure } from "@/lib/codeStructure";

interface ThankYouPageProps {
  wealthCode?: number | null;
  codeStructure?: CodeStructure | null;
  onBack?: () => void;
  onShowInterpretations?: (code: number) => void;
  onCalculateNew?: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  wealthCode,
  codeStructure: _codeStructure,
  onBack,
  onShowInterpretations,
  onCalculateNew,
}) => {
  const handleViewInterpretation = () => {
    if (onShowInterpretations && isFourDigitCode(wealthCode)) {
      onShowInterpretations(Number(wealthCode));
      return;
    }

    try {
      const params = new URLSearchParams(window.location.search);
      const possibleKeys = [
        "code",
        "transaction_id",
        "transactionId",
        "order_id",
        "orderId",
        "payment_id",
        "paymentId",
        "reference",
        "ref",
        "id",
      ];

      for (const key of possibleKeys) {
        const value = params.get(key);
        if (!value) continue;

        const parsed = parseInt(value, 10);
        if (!isNaN(parsed) && parsed >= 1111 && parsed <= 9999) {
          if (onShowInterpretations) {
            onShowInterpretations(parsed);
          }
          return;
        }
      }
    } catch (error) {
      console.error("Error parsing URL parameters:", error);
    }

    alert("לא נמצא קוד עושר תקין. נסי לבצע חישוב חדש או בדקי את הקישור שהתקבל במייל.");
    onCalculateNew?.();
  };

  const handleShareCalculator = () => {
    onBack?.();

    if (navigator.share) {
      navigator
        .share({
          title: "מחשבון קוד העושר",
          text: "גלי את קוד העושר האישי שלך ושתפי את מי שאת אוהבת",
          url: window.location.origin,
        })
        .catch(() => alert(`שתפי את הקישור: ${window.location.origin}`));
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(window.location.origin)
        .then(() => alert("הקישור הועתק ללוח. שתפי עם חברים ומשפחה!"))
        .catch(() => alert(`שתפי את הקישור: ${window.location.origin}`));
    } else {
      alert(`שתפי את הקישור: ${window.location.origin}`);
    }
  };

  return (
    <div className="relative min-h-screen" lang="he">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20" />
        <div className="absolute inset-0 backdrop-brightness-[1.02] backdrop-contrast-[1.02] backdrop-saturate-[1.1]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-4xl space-y-8 font-['Assistant']" dir="rtl">
            <Card className="brand-card p-6 sm:p-8 text-center text-[#87674F]" data-has-code={Boolean(_codeStructure && wealthCode)}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-wide sm:text-4xl">
                  תודה על הרכישה!
                </h2>

                <div className="brand-panel space-y-6 px-6 py-6 text-[#87674F]/90 sm:px-8 sm:py-8">
                  <p className="text-base leading-relaxed sm:text-lg">
                    הפירוש המלא שלך מוכן וממתין לך. זה הזמן לחקור את המשמעות מאחורי הקוד האישי שלך.
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
                        window.open("https://wa.me/message/PUSKMULYLLD7F1", "_blank")
                      }
                      variant="brand"
                      className="w-full text-lg sm:w-auto"
                    >
                      <MessageCircle className="ml-2 h-5 w-5" />
                      לתיאום ייעוץ אישי
                    </Button>

                    <Button
                      onClick={() => onCalculateNew?.()}
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

        <div className="flex justify-center pb-6">
          <Image
            src={logoImage}
            alt="AWAKENING"
            className="h-20 w-auto opacity-90 drop-shadow-lg sm:h-24"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;