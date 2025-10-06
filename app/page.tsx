"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PageLayout } from "@/app/components/layout/PageLayout";
import { NavigationButtons } from "@/app/components/layout/NavigationButtons";
import {
  Calculator,
  Hero,
  Result,
  SalesPage,
  Interpretations,
  ThankYou,
} from "@/modules/wealth-code/components";
import { SplashScreen } from "@/app/components/layout/SplashScreen";
import { NavigationProvider } from "@/app/lib/navigation";

type ViewType = "hero" | "calculator" | "result" | "sales" | "interpretations" | "thankyou";

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>("hero");
  const [wealthCode, setWealthCode] = useState<string>("");
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasSeenSplash = window.sessionStorage.getItem("abyk:splash-dismissed");
    if (hasSeenSplash === "true") {
      setIsSplashVisible(false);
    }
  }, []);

  const goTo = useCallback((view: ViewType) => {
    setCurrentView(view);
    
    // Scroll to top when changing views
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  const viewOrder = useMemo<ViewType[]>(
    () => ["hero", "calculator", "result", "sales", "thankyou", "interpretations"],
    []
  );

  const currentIndex = useMemo(() => viewOrder.indexOf(currentView), [currentView, viewOrder]);

  const goToIndex = useCallback(
    (index: number) => {
      const nextView = viewOrder[index];
      if (!nextView) {
        return;
      }

      if (nextView === "hero") {
        setWealthCode("");
      }

      goTo(nextView);
    },
    [goTo, viewOrder]
  );

  const handleSplashComplete = useCallback(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("abyk:splash-dismissed", "true");
    }

    setIsSplashVisible(false);
    goTo("hero");
  }, [goTo]);

  const handleCalculate = (code: string) => {
    setWealthCode(code);
    goTo("result");
  };

  const handleViewSales = () => {
    goTo("sales");
  };

  const handleMockPurchaseComplete = async () => {
    // First, generate PDF
    try {
      const pdfResponse = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: wealthCode,
          userName: "", // Add user name if available from form
          userEmail: "", // Add user email if available from form
        }),
      });

      if (!pdfResponse.ok) {
        console.error("Failed to generate PDF");
        goTo("thankyou");
        return;
      }

      const pdfData = await pdfResponse.json();
      
      if (!pdfData.ok || !pdfData.pdfBase64) {
        console.error("Invalid PDF response");
        goTo("thankyou");
        return;
      }

      // Then, send email with PDF attachment
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "", // Add recipient email from form
          code: wealthCode, // Required! Must be 4 digits
          subject: `הפירוש המלא שלך לקוד ${wealthCode}`,
          pdfBase64: pdfData.pdfBase64,
          test: true, // Change to false in production
        }),
      });

      if (!emailResponse.ok) {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error in purchase flow:", error);
    } finally {
      // Always navigate to thank you page
      goTo("thankyou");
    }
  };

  const handleViewInterpretations = () => {
    goTo("interpretations");
  };

  const handleResetFlow = () => {
    setWealthCode("");
    goTo("calculator");
  };

  const handleGoBack = useCallback(() => {
    if (currentIndex <= 0) {
      // Already at hero, no need to reset
      if (currentView === "hero") {
        return;
      }
      goTo("hero");
      setWealthCode("");
      return;
    }

    goToIndex(currentIndex - 1);
  }, [currentIndex, goTo, goToIndex]);

  const handleGoForward = useCallback(() => {
    if (currentIndex < 0 || currentIndex >= viewOrder.length - 1) {
      return;
    }

    if (currentView === "calculator" && !wealthCode) {
      return;
    }

    goToIndex(currentIndex + 1);
  }, [currentIndex, currentView, goToIndex, viewOrder, wealthCode]);

  const handleGoHome = useCallback(() => {
    setWealthCode("");
    goTo("hero");
  }, [goTo]);

  const canGoBack = currentIndex > 0;
  const canGoForward = useMemo(() => {
    if (currentIndex < 0 || currentIndex >= viewOrder.length - 1) {
      return false;
    }

    if (currentView === "calculator") {
      return Boolean(wealthCode);
    }

    return true;
  }, [currentIndex, currentView, viewOrder, wealthCode]);

  const navigationOverrides = useMemo(
    () => ({
      isVisible: currentView !== "hero",
      canGoBack,
      canGoForward,
      onGoBack: handleGoBack,
      onGoForward: handleGoForward,
      onGoHome: handleGoHome,
    }),
    [currentView, canGoBack, canGoForward, handleGoBack, handleGoForward, handleGoHome]
  );

  const renderView = () => {
    switch (currentView) {
      case "hero":
        return <Hero onNavigate={() => goTo("calculator")} />;
      
      case "calculator":
        return <Calculator onCalculate={handleCalculate} />;
      
      case "result":
        return (
          <Result
            code={wealthCode}
            onContinue={handleViewSales}
          />
        );
      
      case "sales":
        return (
          <SalesPage
            code={wealthCode}
            onMockPurchase={handleMockPurchaseComplete}
          />
        );
      
      case "interpretations":
        return (
          <Interpretations
            code={wealthCode}
            onCalculateAnother={handleResetFlow}
          />
        );
      
      case "thankyou":
        return (
          <ThankYou
            onViewInterpretations={handleViewInterpretations}
            onCalculateAnother={handleResetFlow}
          />
        );
      
      default:
        return <Hero onNavigate={() => goTo("calculator")} />;
    }
  };

  return (
    <NavigationProvider value={navigationOverrides}>
      <div className="relative w-full flex-1 overflow-hidden">
        {isSplashVisible && <SplashScreen onComplete={handleSplashComplete} />}
        <PageLayout className="space-y-12 pb-12 sm:pb-16 lg:pb-20" maxWidth="xl">
          {renderView()}
        </PageLayout>
        {navigationOverrides.isVisible && (
          <nav aria-label="ניווט משני" className="py-6 sm:py-8">
            <NavigationButtons
              onGoBack={handleGoBack}
              onGoForward={handleGoForward}
              onGoHome={handleGoHome}
              canGoBack={canGoBack}
              canGoForward={canGoForward}
            />
          </nav>
        )}
      </div>
    </NavigationProvider>
  );
}
