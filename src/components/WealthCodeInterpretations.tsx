import Image from "next/image";
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, Star, TrendingUp, Eye, Share2, Calculator } from "lucide-react";
import { Footer } from "./Footer";
import Header from "./Header";
import {
  wealthCodeTexts,
  sectionTitles,
  type DigitBlock,
} from "../data/wealthCodeTexts";
import { codeApplication, STRUCTURE_COPY } from "@/data/codeStructures";
import { computeCodeStructure } from "@/lib/codeStructure";
import type { CodeStructure } from "@/lib/codeStructure";

interface WealthCodeInterpretationsProps {
  wealthCode: number;
  codeStructure: CodeStructure;
  fullData?: DigitBlock | null;
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

  // ייחודי + ממויין עולה (למשל 5513 -> 1,3,5)
  const uniqueDigits = [...new Set(codeStructure.digits)].sort((a, b) => a - b);
  const primaryDigitTab = fullData?.digit ?? uniqueDigits[0]?.toString() ?? "0";

  // Detect the structure key from the 4-digit code (string)
  const structureKey = computeCodeStructure(Number(wealthCode)).type;
  const structure = STRUCTURE_COPY[structureKey];



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

  return (
  <div className="relative min-h-screen text-right" lang="he" dir="rtl">
      {/* Overlays over global body background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20"></div>
        <div className="backdrop-saturate-110 backdrop-contrast-102 backdrop-brightness-102 absolute inset-0"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <Header />

        {/* Main Content - Tab System */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-4xl">
            {/* Title Section */}
            <div className="mb-8 text-center">
              <h1
                className="mb-4 text-center font-['Assistant'] font-normal tracking-wide drop-shadow-lg"
                style={{ color: "#FEFEFE" }}
              >
                הפירוש המלא לקוד העושר שלך
              </h1>
              <div
                className="mb-4 text-center font-['Assistant'] text-6xl tracking-wider drop-shadow-2xl sm:text-8xl"
                style={{ color: "#473B31" }}
              >
                {wealthCode}
              </div>
            </div>

            {/* Main Tabs System */}
            <Tabs defaultValue="structure" className="w-full" dir="rtl">
              <TabsList className="mb-8 grid w-full grid-cols-3 gap-1 border border-white/20 bg-[rgba(254,254,254,0.15)] p-1 backdrop-blur-md">
                <TabsTrigger
                  value="structure"
                  className="text-center font-['Assistant'] text-sm text-[rgba(149,112,82,1)] data-[state=active]:bg-[rgba(149,112,82,0.4)] data-[state=active]:text-white sm:text-base"
                >
                  מבנה הקוד
                </TabsTrigger>

                <TabsTrigger
                  value="numbers"
                  className="text-center font-['Assistant'] text-sm text-[rgba(149,112,82,1)] data-[state=active]:bg-[rgba(149,112,82,0.4)] data-[state=active]:text-white sm:text-base"
                >
                  המספרים
                </TabsTrigger>

                <TabsTrigger
                  value="daily"
                  className="text-center font-['Assistant'] text-sm text-[rgba(149,112,82,1)] data-[state=active]:bg-[rgba(149,112,82,0.4)] data-[state=active]:text-white sm:text-base"
                >
                  יישום יומי
                </TabsTrigger>
              </TabsList>

              {/* Structure Tab - Code Structure */}
              <TabsContent value="structure" className="space-y-6">
                <Card className="border-[rgba(135,103,79,0.2)] bg-[rgba(254,254,254,0.12)] p-6 backdrop-blur-xl" dir="rtl">
                  <div className="space-y-6">
                    {/* Code Type Badge */}
                    <div className="text-center">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(149,112,82,0.5)] px-4 py-2">
                        {structureKey === "master" && <Star className="h-5 w-5 text-[rgba(149,112,82,1)]" />}
                        {structureKey === "repeated" && <TrendingUp className="h-5 w-5 text-[rgba(149,112,82,1)]" />}
                        {structureKey === "diverse" && <Eye className="h-5 w-5 text-[rgba(149,112,82,1)]" />}
                        <span className="text-center font-['Assistant'] text-[rgba(254,254,254,1)]">
                          {structure.title}
                        </span>
                      </div>
                    </div>

                    {/* Code Explanation from centralized data */}
                    <div className="text-center">
                      <h3 className="mb-2 font-['Assistant'] font-normal tracking-wide" style={{ color: "#473B31" }}>
                        {structure.title}
                      </h3>
                      <p className="whitespace-pre-line text-center font-['Assistant'] font-light leading-relaxed text-[rgba(71,59,49,1)]">
                        {structure.paragraph}
                      </p>
                    </div>

                    {/* Repeated Digits if any */}
                    {codeStructure.repeatedDigits.length > 0 && (
                      <div>
                        <h3
                          className="mb-4 text-center font-['Assistant'] font-normal tracking-wide"
                          style={{ color: "#473B31" }}
                        >
                          ספרות מועצמות בקוד שלך
                        </h3>
                        <div className="flex justify-center gap-4">
                          {codeStructure.repeatedDigits.map(({ digit, count }) => (
                            <div key={digit} className="text-center">
                              <div
                                className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(149,112,82,0.3)] font-['Assistant'] text-2xl font-bold"
                                style={{ color: "#473B31" }}
                              >
                                {digit}
                              </div>
                              <span className="font-['Assistant'] text-sm text-[rgba(149,112,82,1)]">
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
    <Card className="border-[rgba(135,103,79,0.2)] bg-[rgba(254,254,254,0.12)] p-6 backdrop-blur-xl" dir="rtl">
    <Tabs defaultValue={primaryDigitTab} className="w-full text-right" dir="rtl">
                    <TabsList
            className="mb-6 grid w-full border border-white/20 bg-[rgba(254,254,254,0.15)] p-1 text-right backdrop-blur-md"
                      style={{ gridTemplateColumns: `repeat(${uniqueDigits.length}, 1fr)` }}
                      dir="rtl"
                    >
                      {uniqueDigits.map((digit) => (
                        <TabsTrigger
                          key={digit}
                          value={digit.toString()}
                          className="text-right font-['Assistant'] text-[rgba(149,112,82,1)] data-[state=active]:bg-[rgba(149,112,82,0.4)] data-[state=active]:text-white"
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
                          <div className="mb-6 text-center">
                            <div className="mb-2 font-['Assistant'] text-5xl font-bold" style={{ color: "#473B31" }}>
                              {digit}
                            </div>
                            <h3 className="font-['Assistant'] font-normal tracking-wide" style={{ color: "#473B31" }}>
                              {wealthCodeTexts[digit]?.title}
                            </h3>
                          </div>

                          <div className="space-y-6">
                            {numberDesc.content.map((section, index) => (
                              <div key={index} className="border-r-4 border-[rgba(149,112,82,0.4)] pr-4 text-right">
                                <h4
                                  className="mb-3 text-right font-['Assistant'] font-normal tracking-wide"
                                  style={{ color: "#473B31" }}
                                >
                                  {section.title}
                                </h4>

                                {section.text && (
                                  <p className="mb-4 whitespace-pre-line text-right font-['Assistant'] font-light leading-relaxed text-[rgba(149,112,82,1)]">
                                    {section.text}
                                  </p>
                                )}

                                {section.items && (
                                  <ul className="space-y-2">
                                    {section.items.map((item, itemIndex) => (
                                      <li
                                        key={itemIndex}
                                        className="flex items-start gap-2 text-right font-['Assistant'] font-light leading-relaxed text-[rgba(149,112,82,1)]"
                                      >
                                        <span className="mt-2 text-[rgba(149,112,82,0.6)]">•</span>
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
                <Card className="border-[rgba(135,103,79,0.2)] bg-[rgba(254,254,254,0.1)] p-6 backdrop-blur-xl" dir="rtl">
                  <div className="space-y-6">
                    <section className="border-r-4 border-[rgba(149,112,82,0.4)] pr-4 text-right">
                      <h3
                        className="mb-3 text-right font-['Assistant'] font-normal tracking-wide"
                        style={{ color: "#473B31" }}
                      >
                        {codeApplication.title}
                      </h3>
                      <p className="whitespace-pre-line text-right font-['Assistant'] font-light leading-relaxed text-[rgba(71,59,49,1)]">
                        {codeApplication.description}
                      </p>
                    </section>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                onClick={onBack}
                variant="outline"
                className="border border-[rgba(149,112,82,0.3)] bg-[rgba(254,254,254,0.1)] px-8 py-4 font-['Assistant'] text-lg font-normal tracking-wide text-[rgba(149,112,82,1)] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[rgba(254,254,254,0.2)] hover:shadow-xl"
              >
                <ArrowLeft className="ml-2 h-5 w-5" />
                חזרה לעמוד תודה
              </Button>

              <Button
                onClick={handleShare}
                variant="outline"
                className="border border-[rgba(149,112,82,0.3)] bg-[rgba(254,254,254,0.1)] px-8 py-4 font-['Assistant'] text-lg font-normal tracking-wide text-[rgba(149,112,82,1)] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[rgba(254,254,254,0.2)] hover:shadow-xl"
              >
                <Share2 className="ml-2 h-5 w-5" />
                שתף עם חברים
              </Button>

              <Button
                onClick={onCalculateNew}
                variant="outline"
                className="border border-[rgba(149,112,82,0.3)] bg-[rgba(254,254,254,0.1)] px-8 py-4 font-['Assistant'] text-lg font-normal tracking-wide text-[rgba(149,112,82,1)] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[rgba(254,254,254,0.2)] hover:shadow-xl"
              >
                <Calculator className="ml-2 h-5 w-5" />
                חישוב קוד חדש
              </Button>
            </div>
          </div>
        </main>

        {/* Logo */}
        <div className="flex justify-center pb-6">
          <Image
            src={logoImage}
            alt="AWAKENING"
            className="h-16 w-auto opacity-90 drop-shadow-lg sm:h-20"
            priority
          />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}