import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  ArrowLeft,
  Download,
  Star,
  TrendingUp,
  Eye,
  Share2,
  Calculator,
} from "lucide-react";
import { Footer } from "./Footer";
import Header from "./Header";
import { WealthCodePDFGenerator } from "./PDFGenerator";
import { useState } from "react";
import { wealthCodeTexts, sectionTitles } from "../data/wealthCodeTexts";
import { codeStructures, codeApplication } from "@/data/codeStructures";
import { paths, isFourDigitCode } from "@/lib/urls";
import { detectCodeStructure } from "@/lib/detectCodeStructure";

// ===== Shared types =====
interface CodeStructure {
  digits: number[];
  digitCounts: Record<number, number>;
  repeatedDigits: { digit: number; count: number }[];
  allSame: boolean;
  allDifferent: boolean;
  hasRepeats: boolean;
  type: "master" | "repeated" | "diverse"; // <-- תוקן
}

interface WealthCodeInterpretationsProps {
  wealthCode: number;
  codeStructure: CodeStructure;
  fullData?: any;
  onBack: () => void;
  onCalculateNew: () => void;
}

// ===== Central content now comes from src/data/* files =====

// Get comprehensive number descriptions for individual digit tabs
const getNumberDescription = (digit: number) => {
  const meaning = wealthCodeTexts[digit];
  if (!meaning) return null;

  return {
    title: `ספרה ${digit} - ${meaning.title}`,
    description: `מדריך מפורט לאנרגיה והכוחות של ספרה ${digit}`,
    content: [
      {
        title: sectionTitles.essence,
        text: meaning.essence,
      },
      {
        title: sectionTitles.gifts,
        items: meaning.gifts,
      },
      {
        title: sectionTitles.challenges,
        items: meaning.challenges,
      },
      {
        title: sectionTitles.imbalanceSigns,
        items: meaning.imbalanceSigns,
      },
      {
        title: sectionTitles.growthAreas,
        items: meaning.growthAreas,
      },
      {
        title: sectionTitles.careerPaths,
        items: meaning.careerPaths,
      },
      {
        title: sectionTitles.dailyPractice,
        text: meaning.dailyPractice,
      },
      {
        title: sectionTitles.bottomLine,
        text: meaning.bottomLine,
      },
    ],
  };
};

export function WealthCodeInterpretations({
  wealthCode,
  codeStructure,
  fullData,
  onBack,
  onCalculateNew,
}: WealthCodeInterpretationsProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  // ייחודי + ממויין עולה (למשל 5513 -> 1,3,5)
  const uniqueDigits = [...new Set(codeStructure.digits)].sort((a, b) => a - b);

  // Detect the structure key from the 4-digit code (string)
  const structureKey = detectCodeStructure(String(wealthCode).padStart(4, "0"));
  const structure = codeStructures[structureKey];

  const generatePDF = () => {
    try {
      const pdfGenerator = new WealthCodePDFGenerator();
      const digitData = uniqueDigits.map((digit) => {
        const meaning = wealthCodeTexts[digit];
        return {
          title: `${meaning.digit} – ${meaning.title}`,
          essence: meaning.essence,
          gifts: meaning.gifts,
          challenges: meaning.challenges,
          imbalanceSigns: meaning.imbalanceSigns,
          growthAreas: meaning.growthAreas,
          careerPaths: meaning.careerPaths,
          dailyPractice: meaning.dailyPractice,
          bottomLine: meaning.bottomLine,
        };
      });

      const pdfData = pdfGenerator.generatePDF(wealthCode, codeStructure, digitData);
      return pdfData;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return null;
    }
  };

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const pdfData = generatePDF();

      if (pdfData) {
        // Create and download PDF blob
        const blob = new Blob([new Uint8Array(pdfData)], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `קוד-עושר-${wealthCode}-פירוש-מלא.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        throw new Error("PDF generation failed");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Fallback to text download
      const interpretation = generateFormattedInterpretation();
      const blob = new Blob([interpretation], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `פירוש-קוד-עושר-${wealthCode}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}?page=calculator`;
    const shareText = `גלה את קוד העושר שלך! מחשבון קוד העושר על פי תאריך לידה`;

    if (navigator.share) {
      navigator
        .share({
          title: shareText,
          url: shareUrl,
        })
        .catch(() => {
          // Fallback if native share fails
          navigator.clipboard.writeText(shareUrl);
          alert("הקישור הועתק ללוח! שתף עם מי שחשוב לך");
        });
    } else {
      // Fallback for browsers without native share
      navigator.clipboard.writeText(shareUrl);
      alert("הקישור הועתק ללוח! שתף עם מי שחשוב לך");
    }
  };

  const generateFormattedInterpretation = () => {
    let text = `פירוש מלא לקוד העושר ${wealthCode}\n`;
    text += `=================================\n\n`;

    uniqueDigits.forEach((digit) => {
      const meaning = wealthCodeTexts[digit];
      text += `ספרה ${digit}: ${meaning.title}\n`;
      text += `------------------------\n`;
      text += `${sectionTitles.essence}:\n${meaning.essence}\n\n`;
      text += `${sectionTitles.gifts}:\n${meaning.gifts.map((gift) => `• ${gift}`).join("\n")}\n\n`;
      text += `${sectionTitles.challenges}:\n${meaning.challenges.map((challenge) => `• ${challenge}`).join("\n")}\n\n`;
      text += `${sectionTitles.imbalanceSigns}:\n${meaning.imbalanceSigns.map((sign) => `• ${sign}`).join("\n")}\n\n`;
      text += `${sectionTitles.growthAreas}:\n${meaning.growthAreas.map((area) => `• ${area}`).join("\n")}\n\n`;
      text += `${sectionTitles.careerPaths}:\n${meaning.careerPaths.map((path) => `• ${path}`).join("\n")}\n\n`;
      text += `${sectionTitles.dailyPractice}:\n${meaning.dailyPractice}\n\n`;
      if (meaning.bottomLine) {
        text += `${sectionTitles.bottomLine}:\n${meaning.bottomLine}\n\n`;
      }
      text += `================================\n\n`;
    });

  // Add pattern explanation from centralized data
  text += `מבנה הקוד:\n`;
    text += `${structure.title}\n`;
    text += `${structure.description}\n\n`;

    return text;
  };

  return (
  <div className="min-h-screen relative text-right" lang="he" dir="rtl">
      {/* Overlays over global body background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20"></div>
        <div className="absolute inset-0 backdrop-saturate-110 backdrop-contrast-102 backdrop-brightness-102"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content - Tab System */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-8">
              <h1
                className="mb-4 font-normal tracking-wide drop-shadow-lg font-['Assistant'] text-center"
                style={{ color: "#FEFEFE" }}
              >
                הפירוש המלא לקוד העושר שלך
              </h1>
              <div
                className="text-6xl sm:text-8xl mb-4 tracking-wider drop-shadow-2xl font-['Assistant'] text-center"
                style={{ color: "#473B31" }}
              >
                {wealthCode}
              </div>
            </div>

            {/* Main Tabs System */}
            <Tabs defaultValue="structure" className="w-full" dir="rtl">
              <TabsList className="grid w-full bg-[rgba(254,254,254,0.15)] backdrop-blur-md border border-white/20 grid-cols-3 gap-1 p-1 mb-8">
                <TabsTrigger
                  value="structure"
                  className="data-[state=active]:bg-[rgba(149,112,82,0.4)] data-[state=active]:text-white text-[rgba(149,112,82,1)] font-['Assistant'] text-sm sm:text-base text-center"
                >
                  מבנה הקוד
                </TabsTrigger>

                <TabsTrigger
                  value="numbers"
                  className="data-[state=active]:bg-[rgba(149,112,82,0.4)] data-[state=active]:text-white text-[rgba(149,112,82,1)] font-['Assistant'] text-sm sm:text-base text-center"
                >
                  המספרים
                </TabsTrigger>

                <TabsTrigger
                  value="daily"
                  className="data-[state=active]:bg-[rgba(149,112,82,0.4)] data-[state=active]:text-white text-[rgba(149,112,82,1)] font-['Assistant'] text-sm sm:text-base text-center"
                >
                  יישום יומי
                </TabsTrigger>
              </TabsList>

              {/* Structure Tab - Code Structure */}
              <TabsContent value="structure" className="space-y-6">
                <Card className="backdrop-blur-xl bg-[rgba(254,254,254,0.12)] border-[rgba(135,103,79,0.2)] p-6" dir="rtl">
                  <div className="space-y-6">
                    {/* Code Type Badge */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(149,112,82,0.5)] mb-4">
                        {structureKey === "master" && <Star className="w-5 h-5 text-[rgba(149,112,82,1)]" />}
                        {structureKey === "repeated" && <TrendingUp className="w-5 h-5 text-[rgba(149,112,82,1)]" />}
                        {structureKey === "diverse" && <Eye className="w-5 h-5 text-[rgba(149,112,82,1)]" />}
                        <span className="text-[rgba(254,254,254,1)] font-['Assistant'] text-center">
                          {structure.title}
                        </span>
                      </div>
                    </div>

                    {/* Code Explanation from centralized data */}
                    <div className="text-center">
                      <h3 className="font-normal tracking-wide font-['Assistant'] mb-2" style={{ color: "#473B31" }}>
                        {structure.title}
                      </h3>
                      <p className="whitespace-pre-line text-[rgba(71,59,49,1)] font-light leading-relaxed font-['Assistant'] text-center">
                        {structure.description}
                      </p>
                    </div>

                    {/* Repeated Digits if any */}
                    {codeStructure.repeatedDigits.length > 0 && (
                      <div>
                        <h3
                          className="text-center mb-4 font-normal tracking-wide font-['Assistant']"
                          style={{ color: "#473B31" }}
                        >
                          ספרות מועצמות בקוד שלך
                        </h3>
                        <div className="flex justify-center gap-4">
                          {codeStructure.repeatedDigits.map(({ digit, count }) => (
                            <div key={digit} className="text-center">
                              <div
                                className="text-2xl font-bold w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(149,112,82,0.3)] mb-2 font-['Assistant']"
                                style={{ color: "#473B31" }}
                              >
                                {digit}
                              </div>
                              <span className="text-sm text-[rgba(149,112,82,1)] font-['Assistant']">
                                מופיע {count} פעמים
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>

              {/* Numbers Tab - Individual Number Details */}
        <TabsContent value="numbers" className="space-y-6 text-right">
                <Card className="backdrop-blur-xl bg-[rgba(254,254,254,0.12)] border-[rgba(135,103,79,0.2)] p-6" dir="rtl">
          <Tabs defaultValue={uniqueDigits[0]?.toString()} className="w-full text-right" dir="rtl">
                    <TabsList
            className="grid w-full bg-[rgba(254,254,254,0.15)] backdrop-blur-md border border-white/20 p-1 mb-6 text-right"
                      style={{ gridTemplateColumns: `repeat(${uniqueDigits.length}, 1fr)` }}
                      dir="rtl"
                    >
                      {uniqueDigits.map((digit) => (
                        <TabsTrigger
                          key={digit}
                          value={digit.toString()}
                          className="data-[state=active]:bg-[rgba(149,112,82,0.4)] data-[state=active]:text-white text-[rgba(149,112,82,1)] font-['Assistant'] text-right"
                        >
                          {digit}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {uniqueDigits.map((digit) => {
                      const numberDesc = getNumberDescription(digit);
                      if (!numberDesc) return null;

                      return (
                        <TabsContent key={digit} value={digit.toString()} className="space-y-6 text-right" dir="rtl">
                          <div className="text-center mb-6">
                            <div className="text-5xl font-bold mb-2 font-['Assistant']" style={{ color: "#473B31" }}>
                              {digit}
                            </div>
                            <h3 className="font-normal tracking-wide font-['Assistant']" style={{ color: "#473B31" }}>
                              {wealthCodeTexts[digit]?.title}
                            </h3>
                          </div>

                          <div className="space-y-6">
                            {numberDesc.content.map((section, index) => (
                              <div key={index} className="border-r-4 border-[rgba(149,112,82,0.4)] pr-4 text-right">
                                <h4
                                  className="mb-3 font-normal tracking-wide font-['Assistant'] text-right"
                                  style={{ color: "#473B31" }}
                                >
                                  {section.title}
                                </h4>

                                {section.text && (
                                  <p className="whitespace-pre-line text-[rgba(149,112,82,1)] font-light leading-relaxed font-['Assistant'] mb-4 text-right">
                                    {section.text}
                                  </p>
                                )}

                                {section.items && (
                                  <ul className="space-y-2">
                                    {section.items.map((item, itemIndex) => (
                                      <li
                                        key={itemIndex}
                                        className="text-[rgba(149,112,82,1)] font-light leading-relaxed font-['Assistant'] flex items-start gap-2 text-right"
                                      >
                                        <span className="text-[rgba(149,112,82,0.6)] mt-2">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      );
                    })}
                  </Tabs>
                </Card>
              </TabsContent>

              {/* Daily Application Tab */}
              <TabsContent value="daily" className="space-y-6" dir="rtl">
                <Card className="backdrop-blur-xl bg-[rgba(254,254,254,0.1)] border-[rgba(135,103,79,0.2)] p-6" dir="rtl">
                  <div className="space-y-6">
                    <section className="border-r-4 border-[rgba(149,112,82,0.4)] pr-4 text-right">
                      <h3
                        className="mb-3 font-normal tracking-wide font-['Assistant'] text-right"
                        style={{ color: "#473B31" }}
                      >
                        {codeApplication.title}
                      </h3>
                      <p className="whitespace-pre-line font-light leading-relaxed font-['Assistant'] text-right text-[rgba(71,59,49,1)]">
                        {codeApplication.description}
                      </p>
                    </section>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="font-normal border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-4 font-['Assistant'] tracking-wide bg-[rgba(149,112,82,0.3)] hover:bg-[rgba(149,112,82,0.5)] border-none text-[rgba(254,254,254,1)]"
              >
                <Download className="ml-2 w-5 h-5" />
                {isDownloading ? "מכין PDF..." : "הורד PDF מלא"}
              </Button>

              {/* Server PDF quick download */}
              <a
                href={`/api/download-pdf?code=${wealthCode}`}
                className="inline-flex items-center justify-center font-normal border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-4 font-['Assistant'] tracking-wide bg-[rgba(254,254,254,0.1)] hover:bg-[rgba(254,254,254,0.2)] border-[rgba(149,112,82,0.3)] text-[rgba(149,112,82,1)] rounded-md"
                rel="noopener"
              >
                <Download className="ml-2 w-5 h-5" />
                הורדה מהירה (שרת)
              </a>

              <Button
                onClick={handleShare}
                variant="outline"
                className="font-normal border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-4 font-['Assistant'] tracking-wide bg-[rgba(254,254,254,0.1)] hover:bg-[rgba(254,254,254,0.2)] border-[rgba(149,112,82,0.3)] text-[rgba(149,112,82,1)]"
              >
                <Share2 className="ml-2 w-5 h-5" />
                שתף עם חברים
              </Button>

              <Button
                onClick={onCalculateNew}
                variant="outline"
                className="font-normal border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-4 font-['Assistant'] tracking-wide bg-[rgba(254,254,254,0.1)] hover:bg-[rgba(254,254,254,0.2)] border-[rgba(149,112,82,0.3)] text-[rgba(149,112,82,1)]"
              >
                <Calculator className="ml-2 w-5 h-5" />
                חישוב קוד חדש
              </Button>
            </div>
          </div>
        </main>

        {/* Logo */}
        <div className="flex justify-center pb-6">
          <img
            src={logoImage.src}
            alt="AWAKENING"
            className="h-16 sm:h-20 w-auto opacity-90 drop-shadow-lg"
          />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}