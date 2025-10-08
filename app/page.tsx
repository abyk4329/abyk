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
import { sendDemoAccessEmail } from "@/modules/wealth-code/utils";
import { SplashScreen } from "@/app/components/layout/SplashScreen";
import { NavigationProvider } from "@/app/lib/navigation";

type ViewType = "hero" | "calculator" | "result" | "sales" | "interpretations" | "thankyou";

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>("hero");
  const [wealthCode, setWealthCode] = useState<string>("");
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);

  // Views that should be full screen (no vertical scrolling)
  const fullScreenViews = useMemo(
    () => new Set<ViewType>(["hero", "calculator", "result", "thankyou"]),
    []
  );
  
  // Views that should have minimal layout (no header/footer, only bottom navigation)
  const minimalViews = useMemo(() => new Set<ViewType>(["sales", "interpretations", "thankyou"]), []);

  const isFullScreenView = fullScreenViews.has(currentView);
  const isMinimalView = minimalViews.has(currentView);

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
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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

  const handleMockPurchase = useCallback(() => {
    const normalizedCode = wealthCode.trim();

    if (normalizedCode && /^\d{4}$/.test(normalizedCode)) {
      void sendDemoAccessEmail({ code: normalizedCode, to: "kseniachud@gmail.com" }).catch(
        (error) => {
          console.error("Failed to send demo email:", error);
        }
      );
    } else {
      console.warn("Skipping demo email send due to missing or invalid code", wealthCode);
    }

    goTo("thankyou");
  }, [goTo, wealthCode]);

  

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
  }, [currentIndex, currentView, goTo, goToIndex]);

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
      showHeader: !isMinimalView,
      showFooter: !isMinimalView,
      lockScroll: isFullScreenView,
    }),
    [
      currentView,
      canGoBack,
      canGoForward,
      handleGoBack,
      handleGoForward,
      handleGoHome,
      isMinimalView,
      isFullScreenView,
    ]
  );

  const isInterpretationsView = currentView === "interpretations";

  const layoutClassName = isFullScreenView
    ? "flex-1 min-h-[calc(100dvh-var(--header-height)-env(safe-area-inset-top)-env(safe-area-inset-bottom))] justify-center items-center gap-0 py-0"
    : "space-y-12 pb-12 sm:pb-16 lg:pb-20";

  const layoutMaxWidth = isFullScreenView || isInterpretationsView ? "full" : "xl";
  const layoutPadded = isFullScreenView ? false : !isInterpretationsView;

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
          <SalesPage code={wealthCode} onMockPurchase={handleMockPurchase} />
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
        <PageLayout
          className={layoutClassName}
          maxWidth={layoutMaxWidth}
          padded={layoutPadded}
        >
          {renderView()}
        </PageLayout>
      </div>
    </NavigationProvider>
  );
}
