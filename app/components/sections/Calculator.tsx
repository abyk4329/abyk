"use client";

import Image from "next/image";
import { useState } from "react";
const backgroundImage = "/images/61a287a191cbe6aa8bcb3bd084132926dd86fada.png";
const logo = "/images/bdac5cb81d27fdfd2e671bace0444b5b16c8c60c.png";
import { GlassButton } from "../shared/GlassButton";

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
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
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

    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900 || yearNum > 2100) {
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
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pb-4 sm:pb-6 fullscreen-bg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          top: `calc(-1 * env(safe-area-inset-top))`,
          left: `calc(-1 * env(safe-area-inset-left))`,
          right: `calc(-1 * env(safe-area-inset-right))`,
          bottom: `calc(-1 * env(safe-area-inset-bottom))`,
          width: 'calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))',
          height: 'calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))'
        }}
      />

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50"
        style={{
          top: `calc(-1 * env(safe-area-inset-top))`,
          left: `calc(-1 * env(safe-area-inset-left))`,
          right: `calc(-1 * env(safe-area-inset-right))`,
          bottom: `calc(-1 * env(safe-area-inset-bottom))`,
          width: 'calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))',
          height: 'calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-24 lg:pt-28 mb-4 sm:mb-6">
        <div className="max-w-full sm:max-w-3xl mx-auto">
          
          {/* Glassmorphic Card */}
          <div className="glass-card-main rounded-3xl p-8 sm:p-12 lg:p-14 transition-all duration-500 hover:shadow-[0_12px_40px_0_rgba(94,73,52,0.25)]">
            {/* Main Heading */}
            <h1 className="mb-4 sm:mb-6 text-center">
              מחשבון קוד העושר
            </h1>

            {/* Subtitle */}
            <p 
              className="mb-8 sm:mb-10 lg:mb-12 max-w-xl mx-auto text-center"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '1.1',
                letterSpacing: '0.13em',
                color: '#9f8572',
                textShadow: '0 1px 1px rgba(0, 0, 0, 0.05)'
              }}
            >
              הכניסו את תאריך הלידה שלכם לחישוב הקוד
            </p>

            {/* Date Input Fields - LTR Direction */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 sm:mb-10 max-w-md mx-auto" dir="ltr">
              {/* Day */}
              <div className="w-full sm:w-auto flex-1">
                <input
                  id="day"
                  type="number"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="DD"
                  className="
                    w-full px-4 py-3 
                    backdrop-blur-xl
                    bg-white/15
                    rounded-2xl 
                    text-center 
                    transition-all duration-300
                    shadow-[0_4px_16px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.3)]
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-[#87674F]/30
                    focus:bg-white/25
                    focus:shadow-[0_6px_20px_0_rgba(94,73,52,0.15),inset_0_2px_4px_0_rgba(255,255,255,0.4)]
                    hover:bg-white/20
                    hover:shadow-[0_5px_18px_0_rgba(94,73,52,0.12)]
                    active:scale-[0.98]
                    touch-manipulation
                  "
                  style={{
                    color: '#5e4934'
                  }}
                />
              </div>

              {/* Month */}
              <div className="w-full sm:w-auto flex-1">
                <input
                  id="month"
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="MM"
                  className="
                    w-full px-4 py-3 
                    backdrop-blur-xl
                    bg-white/15
                    rounded-2xl 
                    text-center 
                    transition-all duration-300
                    shadow-[0_4px_16px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.3)]
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-[#87674F]/30
                    focus:bg-white/25
                    focus:shadow-[0_6px_20px_0_rgba(94,73,52,0.15),inset_0_2px_4px_0_rgba(255,255,255,0.4)]
                    hover:bg-white/20
                    hover:shadow-[0_5px_18px_0_rgba(94,73,52,0.12)]
                    active:scale-[0.98]
                    touch-manipulation
                  "
                  style={{
                    color: '#5e4934'
                  }}
                />
              </div>

              {/* Year */}
              <div className="w-full sm:w-auto flex-1">
                <input
                  id="year"
                  type="number"
                  min="1900"
                  max="2100"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="YYYY"
                  className="
                    w-full px-4 py-3 
                    backdrop-blur-xl
                    bg-white/15
                    rounded-2xl 
                    text-center 
                    transition-all duration-300
                    shadow-[0_4px_16px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.3)]
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-[#87674F]/30
                    focus:bg-white/25
                    focus:shadow-[0_6px_20px_0_rgba(94,73,52,0.15),inset_0_2px_4px_0_rgba(255,255,255,0.4)]
                    hover:bg-white/20
                    hover:shadow-[0_5px_18px_0_rgba(94,73,52,0.12)]
                    active:scale-[0.98]
                    touch-manipulation
                  "
                  style={{
                    color: '#5e4934'
                  }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <GlassButton onClick={calculateWealthCode}>
                לחשב
              </GlassButton>

              <GlassButton onClick={handleReset} variant="secondary">
                איפוס
              </GlassButton>
            </div>
          </div>

          {/* Logo - Below Card */}
          <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
            <Image
              src={logo}
              alt="Awakening by Ksenia"
              width={360}
              height={360}
              className="h-24 sm:h-32 lg:h-40 w-auto max-w-full object-contain drop-shadow-2xl mt-[3px] mr-[0px] mb-[-30px] ml-[0px]"
              sizes="(max-width: 640px) 9rem, (max-width: 1024px) 12rem, 16rem"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
