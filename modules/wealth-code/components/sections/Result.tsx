"use client";

import { GlassButton } from "@/app/components/shared/GlassButton";
import styles from "./Result.module.css";

interface ResultProps {
  code: string;
  onContinue: () => void;
}

export function Result({ code, onContinue }: ResultProps) {
  // זיהוי סוג הקוד
  const getCodeType = (code: string) => {
    const digits = code.split('');
    const uniqueDigits = new Set(digits);
    
    // קוד מאסטר - כל הספרות זהות
    if (uniqueDigits.size === 1) {
      return {
        type: "קוד מאסטר",
        description: "כל הספרות זהות - אנרגיה מרוכזת ועוצמתית במיוחד"
      };
    }
    
    // בדיקת ספרות חוזרות
    const digitCount: { [key: string]: number } = {};
    digits.forEach(digit => {
      digitCount[digit] = (digitCount[digit] || 0) + 1;
    });
    
    const hasRepeating = Object.values(digitCount).some(count => count > 1);
    
    if (hasRepeating) {
      return {
        type: "קוד עם ספרות חוזרות",
        description: "אנרגיות מועצמות של ספרות מסוימות"
      };
    }
    
    // קוד מגוון - כל הספרות שונות
    return {
      type: "קוד מגוון",
      description: "כל הספרות שונות - איזון ומגוון אנרגטי"
    };
  };

  const codeInfo = getCodeType(code);

  return (
    <section 
      className="relative min-h-[calc(100vh-var(--header-height))] w-full flex items-center justify-center overflow-visible py-6 sm:py-8 lg:py-12"
    >

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-full sm:max-w-3xl mx-auto">
          
          {/* Neumorphic Card */}
          <div 
            className="neuro-card-main rounded-[32px] p-8 sm:p-12 lg:p-14 transition-all duration-500 border-0"
          >
            {/* Main Heading */}
            <h1 className={["mb-8 sm:mb-10 lg:mb-12 text-center", styles.mainHeading].join(" ")}>
              קוד העושר שלך
            </h1>

            {/* The Code - Large Display */}
            <div className="mb-6 sm:mb-8 text-center bg-[rgba(0,0,0,0)]">
              <div className={["inline-block px-12 py-6 rounded-3xl border-0", styles.codeDisplay].join(" ")}>
                <div className={styles.codeNumber}>
                  {code}
                </div>
              </div>
            </div>

            {/* Code Type */}
            <h2 className={["mb-3 sm:mb-4 text-center", styles.codeTypeHeading].join(" ")}>
              {codeInfo.type}
            </h2>

            {/* Description */}
            <p className="caption mb-8 sm:mb-10 max-w-xl mx-auto text-center">
              {codeInfo.description}
            </p>

            {/* CTA Button */}
            <div className="flex justify-center items-center">
              <GlassButton onClick={onContinue}>
                גלו את המשמעות המלאה
              </GlassButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
