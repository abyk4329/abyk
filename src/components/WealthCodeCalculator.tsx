import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { } from "lucide-react";
import { useState } from "react";
import { Footer } from "./Footer";
import Header from "./Header";
import { WealthCodeSalesPage } from "./WealthCodeSalesPage";
import { wealthCodeTexts } from "../data/wealthCodeTexts";

interface WealthCodeCalculatorProps {
  onBack: () => void;
  onShowThankYou?: (
    wealthCode: number,
    codeStructure: any,
  ) => void;
  onShowTerms?: () => void;
  onShowPrivacy?: () => void;
  onShowTermsAndPrivacy?: () => void;
}

export function WealthCodeCalculator({
  onBack,
  onShowThankYou,
  onShowTerms,
  onShowPrivacy,
  onShowTermsAndPrivacy,
}: WealthCodeCalculatorProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [showSalesPage, setShowSalesPage] = useState(false);
  const [result, setResult] = useState<{
    wealthCode: number;
    fullData: any;
    codeStructure: {
      digits: number[];
      digitCounts: Record<number, number>;
      repeatedDigits: { digit: number; count: number }[];
      allSame: boolean;
      allDifferent: boolean;
      hasRepeats: boolean;
  type: "master" | "repeated" | "diverse";
    };
  } | null>(null);

  const isValidDate = (
    day: string,
    month: string,
    year: string,
  ) => {
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (!dayNum || !monthNum || !yearNum) return false;
    if (dayNum < 1 || dayNum > 31) return false;
    if (monthNum < 1 || monthNum > 12) return false;
    if (yearNum < 1900 || yearNum > new Date().getFullYear())
      return false;

    // Check if date is valid
    const date = new Date(yearNum, monthNum - 1, dayNum);
    return (
      date.getDate() === dayNum &&
      date.getMonth() === monthNum - 1 &&
      date.getFullYear() === yearNum
    );
  };

  const calculateWealthCode = () => {
    if (!isValidDate(day, month, year)) return;

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Helper function to reduce number to single digit
    const reduceToSingleDigit = (num: number): number => {
      while (num > 9) {
        const digits = num.toString().split("").map(Number);
        num = digits.reduce((sum, digit) => sum + digit, 0);
      }
      return num;
    };

    // Calculate each digit of the wealth code
    // 1st digit: sum of day digits
    const daySum = dayNum
      .toString()
      .split("")
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0);
    const firstDigit = reduceToSingleDigit(daySum);

    // 2nd digit: sum of month digits
    const monthSum = monthNum
      .toString()
      .split("")
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0);
    const secondDigit = reduceToSingleDigit(monthSum);

    // 3rd digit: sum of year digits
    const yearSum = yearNum
      .toString()
      .split("")
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0);
    const thirdDigit = reduceToSingleDigit(yearSum);

    // 4th digit: sum of the three previous digits
    const fourthDigitSum =
      firstDigit + secondDigit + thirdDigit;
    const fourthDigit = reduceToSingleDigit(fourthDigitSum);

    // Combine into 4-digit code
    const wealthCodeString = `${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}`;
    const wealthCode = parseInt(wealthCodeString);

    // Analyze code structure
    const codeStructure = analyzeCodeStructure(wealthCode);

    // For now, show data for the first digit (main character)
    const fullData = wealthCodeTexts[firstDigit];

    setResult({
      wealthCode,
      fullData,
      codeStructure,
    });

    // Show sales page after calculation
    setShowSalesPage(true);

    // Don't automatically show thank you - let the sales page handle it
    // if (onShowThankYou) {
    //   onShowThankYou(wealthCode, codeStructure);
    // }
  };

  const analyzeCodeStructure = (code: number) => {
    const digits = code.toString().split("").map(Number);
    const digitCounts = digits.reduce(
      (acc, digit) => {
        acc[digit] = (acc[digit] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    const repeatedDigits = Object.entries(digitCounts)
      .filter(([_, count]) => count > 1)
      .map(([digit, count]) => ({
        digit: parseInt(digit),
        count,
      }));

    const allSame = new Set(digits).size === 1;
    const allDifferent = new Set(digits).size === 4;
    const hasRepeats = repeatedDigits.length > 0;

    return {
      digits,
      digitCounts,
      repeatedDigits,
      allSame,
      allDifferent,
      hasRepeats,
      // Map to the normalized tri-state structure type
      type: (allSame ? "master" : allDifferent ? "diverse" : "repeated") as "master" | "repeated" | "diverse",
    };
  };

  return (
    <>
      {showSalesPage && result ? (
        <WealthCodeSalesPage
          wealthCode={result.wealthCode}
          codeStructure={result.codeStructure}
          fullData={result.fullData}
          onBack={() => setShowSalesPage(false)}
          onShowThankYou={onShowThankYou}
          onCalculateNew={() => {
            setDay("");
            setMonth("");
            setYear("");
            setResult(null);
            setShowSalesPage(false);
          }}
        />
      ) : (
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
            <main className="flex-1 sm:px-6 sm:py-8 px-[24px] py-[43px]">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Input Card */}
                <div className="flex items-center justify-center min-h-[60vh] mt-[-91px] mr-[0px] mb-[0px] ml-[0px]">
                  <Card className="backdrop-blur-xl border shadow-2xl max-w-2xl w-full bg-[rgba(254,254,254,0.12)] border-[rgba(135,103,79,0.2)] sm:p-12 px-[32px] py-[61px] mt-[-15px] mr-[0px] mb-[-65px] ml-[0px]">
                    <div
                      className="text-center space-y-6 font-['Assistant']"
                      dir="rtl"
                    >
                      <div className="text-center mb-6">
                        <h1 className="font-normal drop-shadow-lg tracking-wide text-center text-[rgba(254,254,254,1)] font-['Assistant'] text-[32px] pt-[-14px] pr-[0px] pb-[0px] pl-[0px] mt-[-40px] mr-[0px] mb-[0px] ml-[0px]">
                          מחשבון קוד העושר
                        </h1>
                        <p className="text-[rgba(149,112,82,1)] font-light mb-6 leading-relaxed drop-shadow-md font-['Assistant'] tracking-wide text-center">
                          הכניסו את תאריך הלידה שלכם לחישוב הקוד
                        </p>
                      </div>

                      <div className="space-y-3">
                        {/* Date Input Section */}
                        <div className="space-y-3">
                          <div className="text-center"></div>
                          <div
                            className="flex items-center justify-center gap-3 max-w-sm mx-auto bg-[rgba(0,0,0,0)]"
                            dir="ltr"
                          >
                            <div className="flex flex-col items-center space-y-1">
                              <label className="text-[rgba(254,254,254,1)] font-['Assistant'] mb-2 block font-bold">
                                יום
                              </label>
                              <Input
                                data-testid="day-input"
                                type="text"
                                value={day}
                                onChange={(e) => {
                                  const value =
                                    e.target.value.replace(
                                      /\D/g,
                                      "",
                                    );
                                  if (value.length <= 2)
                                    setDay(value);
                                }}
                                placeholder=""
                                maxLength={2}
                                className="w-16 h-12 text-center px-2 py-2 font-semibold border backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md font-['Assistant'] tracking-wide text-lg bg-[rgba(254,254,254,0.2)] text-[rgba(149,112,82,1)] border-[rgba(135,103,79,0.3)] placeholder-[rgba(149,112,82,0.6)] text-[16px]"
                              />
                            </div>
                            <span className="text-[rgba(149,112,82,0.6)] text-xl font-bold mt-[30px] mr-[0px] mb-[0px] ml-[0px]">
                              /
                            </span>
                            <div className="flex flex-col items-center space-y-1">
                              <label className="text-[rgba(254,254,254,1)] font-['Assistant'] mb-2 block font-bold">
                                חודש
                              </label>
                              <Input
                                data-testid="month-input"
                                type="text"
                                value={month}
                                onChange={(e) => {
                                  const value =
                                    e.target.value.replace(
                                      /\D/g,
                                      "",
                                    );
                                  if (value.length <= 2)
                                    setMonth(value);
                                }}
                                placeholder=""
                                maxLength={2}
                                className="w-16 h-12 text-center px-2 py-2 hover:bg-white/30 font-semibold border backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md font-['Assistant'] tracking-wide text-lg bg-[rgba(254,254,254,0.2)] text-[rgba(149,112,82,1)] border-[rgba(135,103,79,0.3)] placeholder-[rgba(149,112,82,0.6)] text-[16px]"
                              />
                            </div>
                            <span className="text-[rgba(149,112,82,0.6)] text-xl font-bold mt-[30px] mr-[0px] mb-[0px] ml-[0px]">
                              /
                            </span>
                            <div className="flex flex-col items-center space-y-1">
                              <label className="text-[rgba(254,254,254,1)] font-['Assistant'] mb-2 block font-bold">
                                שנה
                              </label>
                              <Input
                                data-testid="year-input"
                                type="text"
                                value={year}
                                onChange={(e) => {
                                  const value =
                                    e.target.value.replace(
                                      /\D/g,
                                      "",
                                    );
                                  if (value.length <= 4)
                                    setYear(value);
                                }}
                                placeholder=""
                                maxLength={4}
                                className="w-20 h-12 text-center px-2 py-2 hover:bg-white/30 font-semibold border backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md font-['Assistant'] tracking-wide text-lg bg-[rgba(254,254,254,0.2)] text-[rgba(149,112,82,1)] border-[rgba(135,103,79,0.3)] placeholder-[rgba(149,112,82,0.6)] text-[16px]"
                              />
                            </div>
                          </div>

                          {/* Date Display */}
                          {(day || month || year) && (
                            <div className="text-center">
                              <p
                                className="font-semibold text-lg tracking-wide font-['Assistant']"
                                style={{ color: "#473B31" }}
                              >
                                {day && month && year
                                  ? `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`
                                  : "מלאו את כל השדות"}
                              </p>
                              {!isValidDate(day, month, year) &&
                                day &&
                                month &&
                                year && (
                                  <p className="text-[rgba(207,122,122,1)] font-semibold text-sm mt-1 font-['Assistant']">
                                    תאריך לא תקין
                                  </p>
                                )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-center gap-3 bg-[rgba(0,0,0,0)]">
                          <Button
                            size="default"
                            onClick={calculateWealthCode}
                            disabled={
                              !isValidDate(day, month, year)
                            }
                            className="w-full font-normal backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl text-base px-6 py-3 font-['Assistant'] tracking-wide bg-[rgba(149,112,82,0.4)] hover:bg-[rgba(149,112,82,0.6)] border-none text-[rgba(254,254,254,1)] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            אני רוצה לגלות את הקוד
                          </Button>

                          {(day || month || year) && (
                            <Button
                              onClick={() => {
                                setDay("");
                                setMonth("");
                                setYear("");
                              }}
                              variant="outline"
                              size="sm"
                              className="px-4 py-2 hover:bg-white/30 font-semibold border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl font-['Assistant'] tracking-wide bg-[rgba(254,254,254,0.2)] text-[rgba(71,59,49,1)] border-[rgba(135,103,79,0.3)]"
                            >
                              איפוס
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </main>

            {/* Logo - Small, above footer */}
            <div className="flex justify-center pr-[0px] pb-[60px] pl-[0px] mx-[0px] mt-[0px] mr-[0px] mb-[8px] ml-[0px] pt-[3px]">
              <img
                src={logoImage.src}
                alt="AWAKENING"
                className="h-40 sm:h-48 w-auto opacity-90 drop-shadow-lg m-[0px]"
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
      )}
    </>
  );
}