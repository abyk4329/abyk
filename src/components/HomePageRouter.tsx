'use client'

import { useRouter } from 'next/navigation'
import backgroundImage from "@/assets/bea9d96a238e2baf538ec6f451608eacb2724c58.png";
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
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          willChange: "transform",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
        }}
      >
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

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
          <div className="w-full max-w-md">
            <div className="backdrop-blur-xl rounded-3xl border shadow-2xl max-w-md mx-auto bg-[rgba(254,254,254,0.12)] border-[rgba(135,103,79,0.2)] p-8 sm:p-12">
              <div className="text-center space-y-8">
                <img
                  src={logoImage.src}
                  alt="AWAKENING"
                  className="mx-auto h-40 sm:h-52 w-auto opacity-95 drop-shadow-2xl"
                />
                
                <div className="space-y-6">
                  <h1 className="font-normal drop-shadow-lg tracking-wide text-center text-[rgba(254,254,254,1)] font-['Assistant'] text-[28px] sm:text-[36px]">
                    גלו את קוד העושר האישי שלכם
                  </h1>
                  
                  <Button
                    size="lg"
                    onClick={handleShowCalculator}
                    className="font-normal border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto text-lg px-8 py-4 font-['Assistant'] tracking-wide bg-[rgba(149,112,82,0.3)] hover:bg-[rgba(149,112,82,0.5)] border-none text-[rgba(254,254,254,1)] mb-4"
                  >
                    התחילו עכשיו
                  </Button>
                </div>
              </div>
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
