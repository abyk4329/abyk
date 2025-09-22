import backgroundImage from "@/assets/9a42d447acea050bf24d319ab01daa6b6ac13c0c.png";
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./components/ui/button";
import { Calculator } from "lucide-react";
import { useState, useEffect } from "react";
import { WealthCodeCalculator } from "./components/WealthCodeCalculator";
import { TermsOfService } from "./components/TermsOfService";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsAndPrivacy } from "./components/TermsAndPrivacy";
import { ThankYouPage } from "./components/ThankYouPage";
import { WealthCodeInterpretations } from "./components/WealthCodeInterpretations";
import { EmailPreview } from "./components/EmailPreview";

import { Footer } from "./components/Footer";

export default function App() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTermsAndPrivacy, setShowTermsAndPrivacy] =
    useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showInterpretations, setShowInterpretations] =
    useState(false);
  const [showEmailPreview, setShowEmailPreview] =
    useState(false);

  const [currentWealthCode, setCurrentWealthCode] = useState<
    number | null
  >(null);
  const [currentCodeStructure, setCurrentCodeStructure] =
    useState<any>(null);
  const [currentFullData, setCurrentFullData] =
    useState<any>(null);

  // Check URL parameters on load
  useEffect(() => {
    const urlParams = new URLSearchParams(
      window.location.search,
    );
    const page = urlParams.get("page");
    const code = urlParams.get("code");

    if (page === "thank-you" && code) {
      const wealthCode = parseInt(code);
      if (
        !isNaN(wealthCode) &&
        wealthCode >= 1111 &&
        wealthCode <= 9999
      ) {
        // Generate code structure for the given wealth code
        const codeStructure = generateCodeStructure(wealthCode);
        setCurrentWealthCode(wealthCode);
        setCurrentCodeStructure(codeStructure);
        setShowThankYou(true);
      }
    } else if (page === "terms") {
      setShowTerms(true);
    } else if (page === "privacy") {
      setShowPrivacy(true);
    } else if (page === "terms-privacy") {
      setShowTermsAndPrivacy(true);
    } else if (page === "email-preview") {
      // Allow email preview for any code for testing
      const wealthCode = parseInt(code || "1234");
      if (
        !isNaN(wealthCode) &&
        wealthCode >= 1111 &&
        wealthCode <= 9999
      ) {
        const codeStructure = generateCodeStructure(wealthCode);
        setCurrentWealthCode(wealthCode);
        setCurrentCodeStructure(codeStructure);
        setShowEmailPreview(true);
      }
    }
  }, []);

  // Generate code structure for URL-based access
  const generateCodeStructure = (code: number) => {
    const digits = code.toString().split("").map(Number);
    const digitCounts = digits.reduce(
      (acc, digit) => {
        acc[digit] = (acc[digit] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    const repeatedDigits = Object.entries(digitCounts)
      .filter(([_, count]) => count > 1)
      .map(([digit, count]) => ({
        digit: parseInt(digit),
        count,
      }));

    const allSame = new Set(digits).size === 1;
    const allDifferent = new Set(digits).size === 4;
    const hasRepeats = repeatedDigits.length > 0;

    return {
      digits,
      digitCounts,
      repeatedDigits,
      allSame,
      allDifferent,
      hasRepeats,
      type: allSame
        ? "master"
        : allDifferent
          ? "diverse"
          : hasRepeats
            ? "focused"
            : "balanced",
    };
  };

  // Handle showing thank you page after purchase
  const handleShowThankYou = (
    wealthCode: number,
    codeStructure: any,
    fullData?: any,
  ) => {
    setCurrentWealthCode(wealthCode);
    setCurrentCodeStructure(codeStructure);
    setCurrentFullData(fullData);
    setShowCalculator(false); // Important: close calculator first
    setShowThankYou(true);
  };

  // Handle showing interpretations page
  const handleShowInterpretations = (wealthCode: number) => {
    if (currentCodeStructure) {
      setShowInterpretations(true);
      setShowThankYou(false); // Close thank you page when opening interpretations
    }
  };

  // Reset to home
  const resetToHome = () => {
    setShowCalculator(false);
    setShowTerms(false);
    setShowPrivacy(false);
    setShowTermsAndPrivacy(false);
    setShowThankYou(false);
    setShowInterpretations(false);
    setShowEmailPreview(false);

    setCurrentWealthCode(null);
    setCurrentCodeStructure(null);
    setCurrentFullData(null);
    // Clear URL parameters
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname,
    );
  };

  if (showCalculator) {
    return (
      <WealthCodeCalculator
        onBack={resetToHome}
        onShowThankYou={handleShowThankYou}
        onShowTerms={() => setShowTerms(true)}
        onShowPrivacy={() => setShowPrivacy(true)}
        onShowTermsAndPrivacy={() => setShowTermsAndPrivacy(true)}
      />
    );
  }

  if (showTerms) {
    return <TermsOfService onBack={resetToHome} />;
  }

  if (showPrivacy) {
    return <PrivacyPolicy onBack={resetToHome} />;
  }

  if (showTermsAndPrivacy) {
    return <TermsAndPrivacy onBack={resetToHome} />;
  }

  if (showThankYou && currentWealthCode) {
    return (
      <ThankYouPage
        wealthCode={currentWealthCode}
        codeStructure={currentCodeStructure}
        fullData={currentFullData}
        onBack={resetToHome}
        onShowInterpretations={handleShowInterpretations}
        onCalculateNew={() => setShowCalculator(true)}
      />
    );
  }

  if (
    showInterpretations &&
    currentWealthCode &&
    currentCodeStructure
  ) {
    return (
      <WealthCodeInterpretations
        wealthCode={currentWealthCode}
        codeStructure={currentCodeStructure}
        fullData={currentFullData}
        onBack={() => setShowThankYou(true)}
        onCalculateNew={() => {
          resetToHome();
          setShowCalculator(true);
        }}
      />
    );
  }

  if (showEmailPreview) {
    return (
      <EmailPreview
        onBack={resetToHome}
        wealthCode={currentWealthCode || undefined}
        codeStructure={currentCodeStructure}
        fullData={currentFullData}
      />
    );
  }



  return (
    <div className="min-h-screen relative" lang="he">
      {/* Background Image with Overlay - Enhanced for better quality and mobile optimization */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          imageRendering: "high-quality",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          willChange: "transform",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Enhanced overlay with soft tones for new fabric background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20"></div>
        {/* Additional quality enhancement overlay */}
        <div className="absolute inset-0 backdrop-saturate-110 backdrop-contrast-102 backdrop-brightness-102"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="backdrop-blur-lg border-b shadow-xl sm:backdrop-blur-md sm:border-white/25 bg-[rgba(254,254,254,0.12)] border-[rgba(135,103,79,0.3)]">
          <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex items-center justify-center">
              {/* Tagline - Always centered */}
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

        {/* Main Content - Logo and Calculator Button */}
        <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 sm:py-20">
          <div className="text-center max-w-4xl w-full">
            {/* Logo */}
            <div className="sm:mb-16 mt-[-80px] mr-[0px] mb-[48px] ml-[0px]">
              <img
                src={logoImage.src}
                alt="AWAKENING"
                className="mx-auto h-40 sm:h-52 w-auto opacity-95 drop-shadow-2xl"
              />
            </div>

            {/* Calculator Button */}
            <div className="backdrop-blur-xl rounded-3xl border shadow-2xl max-w-md mx-auto bg-[rgba(254,254,254,0.12)] border-[rgba(135,103,79,0.2)] p-8 sm:p-12">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl mb-6 font-normal tracking-wide drop-shadow-lg font-['Assistant']"
                style={{ color: "#473B31" }}
              >
                גלו את קוד העושר שלכם
              </h2>
              <p className="text-[rgba(149,112,82,1)] font-light mb-8 leading-relaxed drop-shadow-md font-['Assistant'] tracking-wide text-[14px]">
                לחישוב וקבלת קוד האישי על פי תאריך לידה
              </p>
              <Button
                size="lg"
                onClick={() => setShowCalculator(true)}
                className="font-normal border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto text-lg px-8 py-4 font-['Assistant'] tracking-wide bg-[rgba(149,112,82,0.3)] hover:bg-[rgba(149,112,82,0.5)] border-none text-[rgba(254,254,254,1)] mb-4"
              >
                מחשבון קוד העושר
              </Button>


            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer
          onShowTerms={() => setShowTerms(true)}
          onShowPrivacy={() => setShowPrivacy(true)}
          onShowTermsAndPrivacy={() =>
            setShowTermsAndPrivacy(true)
          }
        />
      </div>
    </div>
  );
}