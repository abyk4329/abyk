'use client'

import { useRouter } from 'next/navigation'
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import { Footer } from "./Footer";
import { useState } from 'react';
import { WealthCodeCalculator } from './WealthCodeCalculator';

export function HomePageRouter() {
  const router = useRouter();
  const [showCalculator, setShowCalculator] = useState(false);

  const handleShowCalculator = () => {
    setShowCalculator(true);
  };

  const handleShowTerms = () => {
    router.push('/terms');
  };

  const handleShowPrivacy = () => {
    router.push('/privacy');
  };

  const handleShowTermsAndPrivacy = () => {
    router.push('/terms-privacy');
  };

  const handleBackToHome = () => {
    setShowCalculator(false);
  };

  const handleShowThankYou = (wealthCode: number, codeStructure: any) => {
    router.push(`/thank-you?code=${wealthCode}`);
  };

  // If calculator is shown, render it
  if (showCalculator) {
    return (
      <WealthCodeCalculator
        onBack={handleBackToHome}
        onShowThankYou={handleShowThankYou}
        onShowTermsAndPrivacy={handleShowTermsAndPrivacy}
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
        <header className="backdrop-blur-lg border-b shadow-xl sm:backdrop-blur-md sm:border-white/25 bg-[rgba(254,254,254,0.12)] border-[rgba(135,103,79,0.3)]">
          <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex items-center justify-center">
              <span
                className="font-normal text-xs sm:text-sm md:text-lg tracking-[0.25em] drop-shadow-lg font-['Assistant'] text-center"
                style={{ color: "#473B31" }}
                dir="ltr"
              >
                YOUR PERSONAL SPACE FOR GROWTH
              </span>
            </div>
          </div>
        </header>

        {/* Hero */}
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
