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
        <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 sm:py-20">
          <div className="w-full max-w-4xl text-center">
            {/* Logo above the card, centered, on the background */}
            <div className="mb-12 mt-[-80px] sm:mb-16">
              <img
                src={logoImage.src}
                alt="AWAKENING"
                className="mx-auto h-40 w-auto opacity-95 drop-shadow-2xl sm:h-52"
              />
            </div>

            {/* Glass card with title, subtext, and button */}
            <div className="mx-auto max-w-md rounded-3xl border border-[rgba(135,103,79,0.2)] bg-[rgba(254,254,254,0.12)] p-8 shadow-2xl backdrop-blur-xl sm:p-12">
              <h1 className="mb-3 font-['Assistant'] text-2xl font-normal tracking-wide text-[#473B31] drop-shadow-lg sm:text-3xl lg:text-4xl">
                גלו את קוד העושר שלכם
              </h1>
              <p className="mb-8 font-['Assistant'] text-sm font-light leading-relaxed text-[#473B31] opacity-90 drop-shadow-md sm:text-base">
                לחישוב וקבלת קוד אישי על פי תאריך לידה
              </p>
              <Button
                size="lg"
                onClick={handleShowCalculator}
                className="w-full border-none bg-[#CDB49D] px-8 py-4 font-['Assistant'] text-lg font-normal tracking-wide text-[#473B31] shadow-lg transition-all duration-300 hover:bg-[#BFA58E] hover:shadow-xl sm:w-auto"
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
                    className="border-[rgba(149,112,82,0.3)] bg-[rgba(254,254,254,0.1)] px-4 py-2 font-['Assistant'] text-sm font-normal tracking-wide text-[rgba(149,112,82,1)] shadow transition-all duration-300 hover:bg-[rgba(254,254,254,0.2)] hover:shadow-md"
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
