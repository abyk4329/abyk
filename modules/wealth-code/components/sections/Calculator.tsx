"use client";

import { useState } from "react";
import { GlassButton } from "@/app/components/shared/GlassButton";
import styles from "./Calculator.module.css";

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

    // Validate date using Date API (months are 0-indexed)
    const date = new Date(yearNum, monthNum - 1, dayNum);
    if (
      date.getDate() !== dayNum ||
      date.getMonth() !== monthNum - 1 ||
      date.getFullYear() !== yearNum ||
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
    <section className="relative w-full flex flex-1 items-center justify-center overflow-visible py-6 sm:py-8 lg:py-10">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-full sm:max-w-3xl mx-auto">
          {/* Neumorphic Card */}
          <div
            className="neuro-card-main rounded-[28px] p-5 sm:p-7 lg:p-10 transition-all duration-500 border-0"
          >
            {/* Main Heading */}
            <h1 className="mb-2 sm:mb-3 text-center">
              מחשבון קוד העושר
            </h1>

            {/* Subtitle */}
            <p
              className={["mb-3 sm:mb-4 max-w-md mx-auto text-center leading-snug", styles.subtitle].join(" ")}
            >
              הזינו את תאריך הלידה שלכם וגלו את הקוד האישי
            </p>

            {/* Date Inputs Grid - LTR Format (DD/MM/YYYY) */}
            <div
              className={["grid grid-cols-3 gap-2 sm:gap-4 lg:gap-5 mb-4 sm:mb-6", styles.inputGrid].join(" ")}
              dir="ltr"
            >
              {/* Day - First (Left) */}
              <div dir="ltr">
                <label
                  className={["block mb-2 caption text-center", styles.label].join(" ")}
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
                  className={["w-full", styles.inputField].join(" ")}
                />
              </div>

              {/* Month - Middle */}
              <div dir="ltr">
                <label
                  className={["block mb-2 caption text-center", styles.label].join(" ")}
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
                  className={["w-full", styles.inputField].join(" ")}
                />
              </div>

              {/* YEAR - Last (Right) */}
              <div dir="ltr">
                <label
                  className={["block mb-2 caption text-center", styles.label].join(" ")}
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
                  className={["w-full", styles.inputField].join(" ")}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className={["flex flex-col sm:flex-row gap-3 sm:gap-5 max-w-sm mx-auto mt-1", styles.buttonGroup].join(" ")}>
              <button
                type="button"
                onClick={calculateWealthCode}
                className={["w-full sm:flex-1", styles.primaryButton].join(" ")}
              >
                חשב קוד
              </button>

              <button
                type="button"
                onClick={handleReset}
                className={["w-full sm:flex-1", styles.secondaryButton].join(" ")}
              >
                אפס
              </button>
            </div>
          </div>

          {/* Info Card */}
        </div>
      </div>

    </section>
  );
}