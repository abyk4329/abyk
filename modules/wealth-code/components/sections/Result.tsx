"use client";

import { useEffect } from "react";
import { GlassButton } from "@/app/components/shared/GlassButton";
import { CodeInset } from "../shared/CodeInset";
import styles from "./Result.module.css";

interface ResultProps {
  code: string;
  onContinue: () => void;
}

export function Result({ code, onContinue }: ResultProps) {
  // Central scroll lock now handled by AppShell.
  useEffect(() => {
    window?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  }, []);

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
    <section className="hero-shell">

      {/* Content */}
  <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Navigation removed – now provided globally under the header */}
        <div className="max-w-full sm:max-w-3xl mx-auto">
          
          {/* Neumorphic Card */}
          <div 
            data-hero-group="a"
            className="neuro-card-main hero-card rounded-[30px] border-0"
          >
            {/* Main Heading */}
            <h1 className={["mb-3 sm:mb-4 text-center", styles.mainHeading].join(" ")}>
              קוד העושר שלך
            </h1>

            {/* The Code - Large Inset Card */}
            <div className="mb-3 sm:mb-4 text-center">
              <CodeInset code={code} />
            </div>

            {/* Code Type */}
            <h2 className={["mb-2 sm:mb-2 text-center", styles.codeTypeHeading].join(" ")}>
              {codeInfo.type}
            </h2>

            {/* Description */}
            <p className="caption mb-4 sm:mb-5 max-w-lg mx-auto text-center leading-snug">
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
