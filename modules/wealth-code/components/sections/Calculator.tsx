"use client";

import { useState } from "react";
import { GlassButton } from "@/app/components/shared/GlassButton";
import { neumorphismStyles, getBoxShadow } from "@/app/components/lib/neomorphism-styles";

interface CalculatorProps {
  onCalculate: (code: string) => void;
}

export function Calculator({ onCalculate }: CalculatorProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // פונקציה לחישוב ספרה בודדת מספר
  const reduceToSingleDigit = (num: number): number => {
    while (num > 9) {
      num = num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  // פונקציה לחישוב קוד העושר
  const calculateWealthCode = () => {
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // בדיקת תקינות
    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
      alert("אנא מלא את כל השדות");
      return;
    }

    if (
      dayNum < 1 ||
      dayNum > 31 ||
      monthNum < 1 ||
      monthNum > 12 ||
      yearNum < 1900 ||
      yearNum > 2100
    ) {
      alert("אנא הזן תאריך תקין");
      return;
    }

    // חישוב ספרות בודדות
    const dayDigit = reduceToSingleDigit(dayNum);
    const monthDigit = reduceToSingleDigit(monthNum);
    const yearDigit = reduceToSingleDigit(yearNum);

    // חיבור לקוד בן 4 ספרות
    const code = `${dayDigit}${monthDigit}${yearDigit}${reduceToSingleDigit(dayDigit + monthDigit + yearDigit)}`;

    onCalculate(code);
  };

  // פונקציה לאיפוס
  const handleReset = () => {
    setDay("");
    setMonth("");
    setYear("");
  };

  return (
    <section className="relative min-h-[calc(100vh-var(--header-height))] w-full flex items-center justify-center overflow-visible py-6 sm:py-8 lg:py-12">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-full sm:max-w-3xl mx-auto">
          {/* Neumorphic Card */}
          <div
            className="rounded-[32px] p-8 sm:p-12 lg:p-14 transition-all duration-500 border-0"
            style={neumorphismStyles.card.main}
          >
            {/* Main Heading */}
            <h1 className="mb-4 sm:mb-6 text-center">
              מחשבון קוד העושר
            </h1>

            {/* Subtitle */}
            <p
              className="mb-4 sm:mb-6 max-w-xl mx-auto text-center"
              style={{ color: "#9f8572", lineHeight: "1.6" }}
            >
              הזינו את תאריך הלידה שלכם וגלו את הקוד האישי
            </p>

            {/* Date Inputs Grid - LTR Format (DD/MM/YYYY) */}
            <div
              className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-8 sm:mb-10"
              dir="ltr"
            >
              {/* Day - First (Left) */}
              <div dir="ltr">
                <label
                  className="block mb-3 caption text-center"
                  style={{ color: "#9f8572" }}
                >
                  יום
                </label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="DD"
                  dir="ltr"
                  className="w-full rounded-2xl px-4 py-4 sm:py-5 transition-all duration-300 focus:outline-none border-0"
                  style={{
                    color: "#473b31",
                    direction: "ltr",
                    textAlign: "left",
                    ...neumorphismStyles.input.default,
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = getBoxShadow(
                      neumorphismStyles.input.default.focus
                    );
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = getBoxShadow(
                      neumorphismStyles.input.default.boxShadow
                    );
                  }}
                />
              </div>

              {/* Month - Middle */}
              <div dir="ltr">
                <label
                  className="block mb-3 caption text-center"
                  style={{ color: "#9f8572" }}
                >
                  חודש
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="MM"
                  dir="ltr"
                  className="w-full rounded-2xl px-4 py-4 sm:py-5 transition-all duration-300 focus:outline-none border-0"
                  style={{
                    color: "#473b31",
                    direction: "ltr",
                    textAlign: "left",
                    ...neumorphismStyles.input.default,
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = getBoxShadow(
                      neumorphismStyles.input.default.focus
                    );
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = getBoxShadow(
                      neumorphismStyles.input.default.boxShadow
                    );
                  }}
                />
              </div>

              {/* YEAR - Last (Right) */}
              <div dir="ltr">
                <label
                  className="block mb-3 caption text-center"
                  style={{ color: "#9f8572" }}
                >
                  שנה
                </label>
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="YYYY"
                  dir="ltr"
                  className="w-full rounded-2xl px-4 py-4 sm:py-5 transition-all duration-300 focus:outline-none border-0"
                  style={{
                    color: "#473b31",
                    direction: "ltr",
                    textAlign: "left",
                    ...neumorphismStyles.input.default,
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = getBoxShadow(
                      neumorphismStyles.input.default.focus
                    );
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = getBoxShadow(
                      neumorphismStyles.input.default.boxShadow
                    );
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 max-w-md mx-auto">
              <GlassButton
                onClick={calculateWealthCode}
                className="w-full sm:flex-1"
              >
                חשב קוד
              </GlassButton>

              <GlassButton
                onClick={handleReset}
                variant="secondary"
                className="w-full sm:flex-1"
              >
                אפס
              </GlassButton>
            </div>
          </div>

          {/* Info Card */}
        </div>
      </div>
    </section>
  );
}