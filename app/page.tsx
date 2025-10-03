"use client";

import { useCallback, useEffect, useState } from "react";
import { PageLayout } from "@/app/components/layout/PageLayout";
import {
  Calculator,
  Hero,
  Result,
  SalesPage,
  Interpretations,
  ThankYou,
} from "@/modules/wealth-code/components";
import { SplashScreen } from "@/app/components/layout/SplashScreen";

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
  }, []);

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

  const handleMockPurchaseComplete = () => {
    goTo("thankyou");
  };

  const handleViewInterpretations = () => {
    goTo("interpretations");
  };

  const handleResetFlow = () => {
    setWealthCode("");
    goTo("calculator");
  };

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
    <div className="relative w-full flex-1 overflow-hidden">
      {isSplashVisible && <SplashScreen onComplete={handleSplashComplete} />}
      <PageLayout className="space-y-12 pb-12 sm:pb-16 lg:pb-20" maxWidth="xl">
        {renderView()}
      </PageLayout>
    </div>
  );
}
