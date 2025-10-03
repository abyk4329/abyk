"use client";

import { useCallback, useState } from "react";
import { PageLayout } from "@/app/components/layout/PageLayout";
import {
  Calculator,
  Hero,
  Result,
  SalesPage,
  Interpretations,
  ThankYou,
} from "@/modules/wealth-code/components";

type ViewType = "hero" | "calculator" | "result" | "sales" | "interpretations" | "thankyou";

const BACKGROUND_IMAGE = "/og/share-square.png";

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>("hero");
  const [wealthCode, setWealthCode] = useState<string>("");

  const goTo = useCallback((view: ViewType) => {
    setCurrentView(view);
  }, []);

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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGE})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "min(1200px, 90vw)",
          top: `calc(-1 * env(safe-area-inset-top))`,
          left: `calc(-1 * env(safe-area-inset-left))`,
          right: `calc(-1 * env(safe-area-inset-right))`,
          bottom: `calc(-1 * env(safe-area-inset-bottom))`,
          width: "calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))",
          height: "calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))",
        }}
      />

      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, rgba(253,252,251,0.88) 0%, rgba(248,244,240,0.82) 50%, rgba(253,252,251,0.92) 100%)",
          top: `calc(-1 * env(safe-area-inset-top))`,
          left: `calc(-1 * env(safe-area-inset-left))`,
          right: `calc(-1 * env(safe-area-inset-right))`,
          bottom: `calc(-1 * env(safe-area-inset-bottom))`,
          width: "calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))",
          height: "calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))",
        }}
      />

      <PageLayout
        className="space-y-12 pt-[calc(var(--header-height)+2.75rem)] pb-12 sm:pb-16 lg:pb-20"
        maxWidth="xl"
      >
        {renderView()}
      </PageLayout>
    </div>
  );
}
