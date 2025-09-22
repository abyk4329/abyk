import backgroundImage from "@/assets/9a42d447acea050bf24d319ab01daa6b6ac13c0c.png";
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  CheckCircle,
  Eye,
  Download,
  MessageCircle,
  Instagram,
  ArrowLeft,
  AlertTriangle,
  Mail,
  Share2,
  Calculator,
} from "lucide-react";
import { Footer } from "./Footer";
import { SimplePDFGenerator } from "./SimplePDFGenerator";
import { useState, useEffect } from "react";

interface ThankYouPageProps {
  wealthCode?: number;
  codeStructure?: any;
  fullData?: any;
  onBack: () => void;
  onShowInterpretations?: (code: number) => void;
  onCalculateNew: () => void;
}

export function ThankYouPage({
  wealthCode,
  codeStructure,
  fullData,
  onBack,
  onShowInterpretations,
  onCalculateNew,
}: ThankYouPageProps) {
  const handleViewInterpretation = () => {
    if (wealthCode && onShowInterpretations) {
      onShowInterpretations(wealthCode);
    }
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!wealthCode || !codeStructure) return;

    setIsDownloading(true);
    try {
      // Prepare digit data for PDF (simplified version)
      const uniqueDigits = [...new Set(codeStructure.digits)];
      const digitData = uniqueDigits.map((digit) => ({
        title: `ספרה ${digit}`,
        essence: `מהות הספרה ${digit}`,
        gifts: [
          `מתנה 1 של ספרה ${digit}`,
          `מתנה 2 של ספרה ${digit}`,
        ],
        challenges: [
          `אתגר 1 של ספרה ${digit}`,
          `אתגר 2 של ספרה ${digit}`,
        ],
        imbalanceSigns: [`סימן חוסר איזון של ספרה ${digit}`],
        growthAreas: [`תחום צמיחה של ספרה ${digit}`],
        careerPaths: [`נתיב קריירה של ספרה ${digit}`],
        dailyPractice: `תרגול יומי לספרה ${digit}`,
        bottomLine: `מסקנת ספרה ${digit}`,
      }));

      // Use the simple PDF generator
      await SimplePDFGenerator.downloadHTML(
        wealthCode,
        codeStructure,
        digitData,
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("שגיאה ביצירת הקובץ. נסה שוב.");
    } finally {
      setIsDownloading(false);
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
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
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
        <header className="backdrop-blur-lg bg-white/15 border-b border-white/30 shadow-xl sm:backdrop-blur-md sm:bg-white/12 sm:border-white/25 bg-[rgba(254,254,254,0.12)]">
          <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-[rgba(254,254,254,1)] font-normal hover:text-white/90 hover:bg-white/15 border-0 font-['Assistant'] tracking-wide"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <span
                className="font-normal text-xs sm:text-sm md:text-lg tracking-[0.25em] drop-shadow-lg font-['Assistant'] text-center"
                style={{ color: "#473B31" }}
                dir="ltr"
              >
                YOUR PERSONAL SPACE FOR GROWTH
              </span>
              <div className="w-8"></div> {/* Spacer for balance */}
            </div>
          </div>
        </header>

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
                          disabled={isDownloading}
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
          <img
            src={logoImage.src}
            alt="AWAKENING"
            className="h-32 sm:h-40 w-auto opacity-90 drop-shadow-lg"
          />
        </div>

        {/* Footer */}
        <Footer
          onShowTerms={() => {}}
          onShowPrivacy={() => {}}
          onShowTermsAndPrivacy={() => {}}
        />
      </div>
    </div>
  );
}