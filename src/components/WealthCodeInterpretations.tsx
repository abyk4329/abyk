import Image from "next/image";
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Star, TrendingUp, Eye, Share2, Calculator } from "lucide-react";

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
    <div className="flex min-h-full flex-col p-4 sm:p-6 text-right" lang="he" dir="rtl">
          <div className="mx-auto max-w-4xl">
            {/* Title Section */}
            <div className="mb-10 space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-wide text-[#5E4934] sm:text-5xl">
                הפירוש המלא לקוד העושר שלך
              </h1>
              <div className="flex justify-center">
                <div className="brand-code-display text-5xl sm:text-6xl">
                  {wealthCode}
                </div>
              </div>
            </div>

            {/* Main Tabs System */}
            <Tabs defaultValue="structure" className="w-full" dir="rtl">
              <TabsList className="brand-tab-list mb-8 grid-cols-3">
                <TabsTrigger value="structure" className="brand-tab">
                  מבנה הקוד
                </TabsTrigger>

                <TabsTrigger value="numbers" className="brand-tab">
                  המספרים
                </TabsTrigger>

                <TabsTrigger value="daily" className="brand-tab">
                  יישום יומי
                </TabsTrigger>
              </TabsList>

              {/* Structure Tab - Code Structure */}
              <TabsContent value="structure" className="space-y-6">
                <Card className="brand-card p-6 sm:p-8" dir="rtl">
                  <div className="space-y-6">
                    {/* Code Type Badge */}
                    <div className="text-center">
                      <div className="brand-panel inline-flex items-center gap-2 px-5 py-3 text-[#5E4934]">
                        {structureKey === "master" && <Star className="h-5 w-5" />}
                        {structureKey === "repeated" && <TrendingUp className="h-5 w-5" />}
                        {structureKey === "diverse" && <Eye className="h-5 w-5" />}
                        <span className="font-['Assistant'] text-base font-semibold tracking-wide">
                          {structure.title}
                        </span>
                      </div>
                    </div>

                    {/* Code Explanation from centralized data */}
                    <div className="text-center text-[#5E4934]">
                      <h3 className="mb-2 font-['Assistant'] text-xl font-semibold tracking-wide">
                        {structure.title}
                      </h3>
                      <p className="whitespace-pre-line font-['Assistant'] text-base leading-relaxed text-[#5E4934]/90">
                        {structure.paragraph}
                      </p>
                    </div>

                    {/* Repeated Digits if any */}
                    {codeStructure.repeatedDigits.length > 0 && (
                      <div>
                        <h3 className="mb-4 text-center font-['Assistant'] text-lg font-semibold tracking-wide text-[#5E4934]">
                          ספרות מועצמות בקוד שלך
                        </h3>
                        <div className="flex justify-center gap-4">
                          {codeStructure.repeatedDigits.map(({ digit, count }) => (
                            <div key={digit} className="text-center">
                              <div
                                className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/50 font-['Assistant'] text-2xl font-bold text-[#5E4934] shadow-[0_12px_30px_-18px_rgba(94,73,52,0.4)]"
                              >
                                {digit}
                              </div>
                              <span className="font-['Assistant'] text-sm text-[#5E4934]/80">
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
                <Card className="brand-card p-6 sm:p-8" dir="rtl">
                  <Tabs defaultValue={primaryDigitTab} className="w-full text-right" dir="rtl">
                    <TabsList
                      className="brand-tab-list mb-6"
                      style={{ gridTemplateColumns: `repeat(${uniqueDigits.length}, 1fr)` }}
                      dir="rtl"
                    >
                      {uniqueDigits.map((digit) => (
                        <TabsTrigger key={digit} value={digit.toString()} className="brand-tab">
                          {digit}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {uniqueDigits.map((digit) => {
                      const numberDesc = getNumberDescription(digit);
                      if (!numberDesc) return null;

                      return (
                        <TabsContent key={digit} value={digit.toString()} className="space-y-6 text-right" dir="rtl">
                          <div className="space-y-3 text-center text-[#5E4934]">
                            <div className="mx-auto inline-flex min-h-[80px] min-w-[120px] items-center justify-center rounded-2xl border border-white/30 bg-white/80 px-6 py-4 text-5xl font-bold shadow-[0_24px_50px_-28px_rgba(94,73,52,0.45)]">
                              {digit}
                            </div>
                            <h3 className="font-['Assistant'] text-xl font-semibold tracking-wide">
                              {wealthCodeTexts[digit]?.title}
                            </h3>
                          </div>

                          <div className="space-y-4 text-[#5E4934]/90">
                            {numberDesc.content.map((section, index) => (
                              <div key={index} className="brand-panel px-5 py-6 text-right sm:px-7 sm:py-7">
                                <h4 className="mb-3 text-lg font-semibold text-[#5E4934]">
                                  {section.title}
                                </h4>

                                {section.text && (
                                  <p className="mb-4 whitespace-pre-line text-base leading-relaxed">
                                    {section.text}
                                  </p>
                                )}

                                {section.items && (
                                  <ul className="space-y-2 text-base leading-relaxed">
                                    {section.items.map((item, itemIndex) => (
                                      <li key={itemIndex} className="flex items-start gap-2">
                                        <span className="mt-2 text-[#5E4934]/50">•</span>
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
                <Card className="brand-card p-6 sm:p-8" dir="rtl">
                  <div className="space-y-6 text-[#5E4934]">
                    <section className="brand-panel px-6 py-6 text-right sm:px-8 sm:py-8">
                      <h3 className="mb-3 font-['Assistant'] text-xl font-semibold tracking-wide">
                        {codeApplication.title}
                      </h3>
                      <p className="whitespace-pre-line font-['Assistant'] text-base leading-relaxed text-[#5E4934]/90">
                        {codeApplication.description}
                      </p>
                    </section>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                onClick={handleShare}
                variant="subtle"
                className="w-full font-['Assistant'] text-lg sm:w-auto"
              >
                <Share2 className="ml-2 h-5 w-5" />
                שתף עם חברים
              </Button>

              <Button
                onClick={onCalculateNew}
                variant="brand"
                className="w-full font-['Assistant'] text-lg sm:w-auto"
              >
                <Calculator className="ml-2 h-5 w-5" />
                חישוב קוד חדש
              </Button>
            </div>
          </div>

          {/* Logo */}
      <div className="flex justify-center pb-6">
        <Image
          src={logoImage}
          alt="AWAKENING"
          className="h-16 w-auto opacity-90 drop-shadow-lg sm:h-20"
          priority
        />
      </div>
    </div>
  );
}