"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Footer } from "./Footer";
import Header from "./Header";
import { computeCodeStructure } from "@/lib/codeStructure";
import { paths } from "@/lib/urls";

export function WealthCodeCalculator() {
  const router = useRouter();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Shared function to save wealth code to storage
  const saveWealthCode = useCallback((code: number) => {
    if (!code || !Number.isFinite(code)) return;
    
    try {
      localStorage.setItem('lastWealthCode', String(code));
    } catch {
      // Ignore localStorage errors (e.g., in private mode)
    }
    
    try {
      sessionStorage.setItem('lastWealthCode', String(code));
    } catch {
      // Ignore sessionStorage errors
    }
  }, []);

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

    try {
      computeCodeStructure(wealthCode);
    } catch (error) {
      console.error("Invalid wealth code computed", error);
      return;
    }

    // Save the wealth code using the shared function
    saveWealthCode(wealthCode);

    setDay("");
    setMonth("");
    setYear("");

    router.push(paths.sales(wealthCode));
  };

  return (
    <div className="relative min-h-screen" lang="he">
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
            <main className="flex-1 px-[24px] py-[43px] sm:px-6 sm:py-8">
              <div className="mx-auto max-w-4xl space-y-8">
                {/* Input Card */}
                <div className="mt-[-91px] flex min-h-[60vh] items-center justify-center">
                  <Card className="mb-[-65px] mt-[-15px] w-full max-w-2xl border border-[rgba(135,103,79,0.2)] bg-[rgba(254,254,254,0.12)] px-8 py-16 shadow-2xl backdrop-blur-xl sm:p-12">
                    <div
                      className="space-y-6 text-center font-['Assistant']"
                      dir="rtl"
                    >
                      <div className="mb-6 text-center">
                        <h1 className="mt-[-40px] text-center font-['Assistant'] text-[32px] font-normal tracking-wide text-white drop-shadow-lg">
                          מחשבון קוד העושר
                        </h1>
                        <p className="mb-6 text-center font-['Assistant'] font-light leading-relaxed tracking-wide text-[rgba(149,112,82,1)] drop-shadow-md">
                          הכניסו את תאריך הלידה שלכם לחישוב הקוד
                        </p>
                      </div>

                      <div className="space-y-3">
                        {/* Date Input Section */}
                        <div className="space-y-3">
                          <div className="text-center"></div>
                          <div
                            className="mx-auto flex max-w-sm items-center justify-center gap-3 bg-[rgba(0,0,0,0)]"
                            dir="ltr"
                          >
                            <div className="flex flex-col items-center space-y-1">
                              <label className="mb-2 block font-['Assistant'] font-bold text-[rgba(254,254,254,1)]">
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
                                className="h-12 w-16 border border-[rgba(135,103,79,0.3)] bg-[rgba(254,254,254,0.2)] px-2 py-2 text-center font-['Assistant'] text-[16px] text-lg font-semibold tracking-wide text-[rgba(149,112,82,1)] placeholder-[rgba(149,112,82,0.6)] shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                              />
                            </div>
                            <span className="mb-[0px] ml-[0px] mr-[0px] mt-[30px] text-xl font-bold text-[rgba(149,112,82,0.6)]">
                              /
                            </span>
                            <div className="flex flex-col items-center space-y-1">
                              <label className="mb-2 block font-['Assistant'] font-bold text-[rgba(254,254,254,1)]">
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
                                className="h-12 w-16 border border-[rgba(135,103,79,0.3)] bg-[rgba(254,254,254,0.2)] px-2 py-2 text-center font-['Assistant'] text-[16px] text-lg font-semibold tracking-wide text-[rgba(149,112,82,1)] placeholder-[rgba(149,112,82,0.6)] shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:shadow-md"
                              />
                            </div>
                            <span className="mb-[0px] ml-[0px] mr-[0px] mt-[30px] text-xl font-bold text-[rgba(149,112,82,0.6)]">
                              /
                            </span>
                            <div className="flex flex-col items-center space-y-1">
                              <label className="mb-2 block font-['Assistant'] font-bold text-[rgba(254,254,254,1)]">
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
                                className="h-12 w-20 border border-[rgba(135,103,79,0.3)] bg-[rgba(254,254,254,0.2)] px-2 py-2 text-center font-['Assistant'] text-[16px] text-lg font-semibold tracking-wide text-[rgba(149,112,82,1)] placeholder-[rgba(149,112,82,0.6)] shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:shadow-md"
                              />
                            </div>
                          </div>

                          {/* Date Display */}
                          {(day || month || year) && (
                            <div className="text-center">
                              <p
                                className="font-['Assistant'] text-lg font-semibold tracking-wide"
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
                                  <p className="mt-1 font-['Assistant'] text-sm font-semibold text-[rgba(207,122,122,1)]">
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
                            className="w-full border-none bg-[rgba(149,112,82,0.4)] px-6 py-3 font-['Assistant'] text-base font-normal tracking-wide text-[rgba(254,254,254,1)] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[rgba(149,112,82,0.6)] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
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
                              className="border border-[rgba(135,103,79,0.3)] bg-[rgba(254,254,254,0.2)] px-4 py-2 font-['Assistant'] font-semibold tracking-wide text-[rgba(71,59,49,1)] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:shadow-xl"
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
            <div className="mb-2 flex justify-center pb-16 pt-1">
              <Image
                src={logoImage}
                alt="AWAKENING"
                className="h-40 w-auto opacity-90 drop-shadow-lg sm:h-48"
                priority
              />
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </div>
  );
}