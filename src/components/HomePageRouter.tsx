'use client'

import { useRouter } from 'next/navigation'
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Footer } from "./Footer";
import Header from "./Header";
import { paths } from "@/lib/urls";
import { useState } from 'react';
import { WealthCodeCalculator } from './WealthCodeCalculator';

export function HomePageRouter() {
  const router = useRouter();
  const [showCalculator, setShowCalculator] = useState(false);

  const handleShowCalculator = () => {
    setShowCalculator(true);
  };

  const handleShowTerms = () => {
  router.push(paths.termsPrivacy());
  };

  const handleShowPrivacy = () => {
  router.push(paths.termsPrivacy());
  };

  const handleShowTermsAndPrivacy = () => {
  router.push(paths.termsPrivacy());
  };

  const handleBackToHome = () => {
    setShowCalculator(false);
  };

  const handleShowThankYou = (wealthCode: number, codeStructure: any) => {
  router.push(paths.thankYou(wealthCode));
  };

  // If calculator is shown, render it
  if (showCalculator) {
    return (
      <WealthCodeCalculator
        onBack={handleBackToHome}
      />
    );
  }

  return (
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
        <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 sm:py-20">
          <div className="text-center w-full max-w-4xl">
            {/* Logo above the card, centered, on the background */}
            <div className="sm:mb-16 mt-[-80px] mb-12">
              <img
                src={logoImage.src}
                alt="AWAKENING"
                className="mx-auto h-40 sm:h-52 w-auto opacity-95 drop-shadow-2xl"
              />
            </div>

            {/* Glass card with title, subtext, and button */}
            <div className="backdrop-blur-xl rounded-3xl border shadow-2xl max-w-md mx-auto bg-[rgba(254,254,254,0.12)] border-[rgba(135,103,79,0.2)] p-8 sm:p-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-3 font-normal tracking-wide drop-shadow-lg font-['Assistant'] text-[#473B31]">
                גלו את קוד העושר שלכם
              </h1>
              <p className="text-sm sm:text-base font-light mb-8 leading-relaxed drop-shadow-md font-['Assistant'] text-[#473B31] opacity-90">
                לחישוב וקבלת קוד אישי על פי תאריך לידה
              </p>
              <Button
                size="lg"
                onClick={handleShowCalculator}
                className="font-normal border-none transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto text-lg px-8 py-4 font-['Assistant'] tracking-wide bg-[#CDB49D] hover:bg-[#BFA58E] text-[#473B31]"
              >
                מחשבון קוד העושר
              </Button>

              {/* סימולציה מהירה: מעבר לעמוד תודה עם קוד בדיקה - מוסתרת בפרודקשן, אלא אם הוגדר NEXT_PUBLIC_SHOW_SIMULATE=1 */}
              {(process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SHOW_SIMULATE === '1') && (
                <div className="mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push(paths.thankYou(7335))}
                    className="font-normal transition-all duration-300 shadow hover:shadow-md text-sm px-4 py-2 font-['Assistant'] tracking-wide bg-[rgba(254,254,254,0.1)] hover:bg-[rgba(254,254,254,0.2)] border-[rgba(149,112,82,0.3)] text-[rgba(149,112,82,1)]"
                  >
                    סימולציית תשלום (בדיקה)
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer
          onShowTerms={handleShowTerms}
          onShowPrivacy={handleShowPrivacy}
        />
      </div>
    </div>
  );
}
