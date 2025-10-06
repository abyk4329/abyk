'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Home } from "lucide-react";

import styles from "./NavigationButtons.module.css";

import { routes } from "@/lib/routes";

interface NavigationButtonsProps {
  onGoBack?: () => void;
  onGoForward?: () => void;
  onGoHome?: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  className?: string;
}

interface NavigationState {
  canGoBack: boolean;
  canGoForward: boolean;
}

export function NavigationButtons({
  onGoBack,
  onGoForward,
  onGoHome,
  canGoBack,
  canGoForward,
  className,
}: NavigationButtonsProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const [navigationState, setNavigationState] = useState<NavigationState>({
    canGoBack: false,
    canGoForward: false,
  });

  const orderedRoutes = useMemo(
    () => [
      routes.calculator,
      routes.result,
      routes.sales,
      routes.thankYou,
      routes.interpretations,
    ],
    []
  );

  const stageLabels = useMemo<Record<string, string>>(
    () => ({
      [routes.calculator]: "מחשבון",
      [routes.result]: "תוצאה",
      [routes.sales]: "דף מכירה",
      [routes.thankYou]: "דף תודה",
      [routes.interpretations]: "פירושים",
      [routes.terms]: "תנאים",
      [routes.home]: "בית",
    }),
    []
  );

  const getSequenceIndex = useCallback(
    (path: string | undefined) => {
      if (!path) {
        return -1;
      }

      return orderedRoutes.findIndex(
        (routePath) => path === routePath || path.startsWith(`${routePath}/`)
      );
    },
    [orderedRoutes]
  );

  const updateNavigationState = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const historyState = window.history.state as { idx?: number } | null;
    const historyLength = window.history.length;
    const currentIndex = typeof historyState?.idx === "number" ? historyState.idx : null;

    const canGoBack = currentIndex != null ? currentIndex > 0 : historyLength > 1;
    const canGoForward = currentIndex != null ? currentIndex < historyLength - 1 : false;

    setNavigationState((prev) => {
      if (prev.canGoBack === canGoBack && prev.canGoForward === canGoForward) {
        return prev;
      }
      return { canGoBack, canGoForward };
    });
  }, []);

  useEffect(() => {
    updateNavigationState();
  }, [updateNavigationState]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handlePopState = () => {
      window.requestAnimationFrame(updateNavigationState);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [updateNavigationState]);

  useEffect(() => {
    updateNavigationState();
  }, [pathname, updateNavigationState]);

  const sequenceIndex = useMemo(() => getSequenceIndex(pathname), [getSequenceIndex, pathname]);
  const hasSequenceMatch = sequenceIndex >= 0;
  const directStageMatch = pathname && stageLabels[pathname] ? pathname : undefined;
  const currentStageKey = directStageMatch ?? (hasSequenceMatch ? orderedRoutes[sequenceIndex] : undefined);
  const isHomeRoute = pathname === routes.home;
  const currentStageLabel = useMemo(() => {
    if (isHomeRoute) {
      return stageLabels[routes.home];
    }

    if (currentStageKey) {
      return stageLabels[currentStageKey] ?? stageLabels[routes.home];
    }

    return stageLabels[routes.home];
  }, [currentStageKey, isHomeRoute, stageLabels]);
  const effectiveCanGoBack =
    canGoBack ?? (hasSequenceMatch ? sequenceIndex > 0 : navigationState.canGoBack);
  const effectiveCanGoForward =
    canGoForward ??
    (hasSequenceMatch ? sequenceIndex < orderedRoutes.length - 1 : navigationState.canGoForward);

  const hasHistoryBack = navigationState.canGoBack;

  const handleGoBack = useCallback(() => {
    if (!effectiveCanGoBack) {
      return;
    }

    if (onGoBack) {
      onGoBack();
      return;
    }

    if (hasSequenceMatch && sequenceIndex > 0) {
      router.push(orderedRoutes[sequenceIndex - 1]);
      window.setTimeout(updateNavigationState, 300);
      return;
    }

    if (hasHistoryBack) {
      router.back();
      window.setTimeout(updateNavigationState, 300);
      return;
    }

    router.push(routes.home);
    window.setTimeout(updateNavigationState, 300);
  }, [effectiveCanGoBack, onGoBack, router, updateNavigationState, hasSequenceMatch, sequenceIndex, orderedRoutes, hasHistoryBack]);

  const handleGoForward = useCallback(() => {
    if (!effectiveCanGoForward) {
      return;
    }

    if (onGoForward) {
      onGoForward();
      return;
    }

    if (hasSequenceMatch && sequenceIndex < orderedRoutes.length - 1) {
      router.push(orderedRoutes[sequenceIndex + 1]);
      window.setTimeout(updateNavigationState, 300);
      return;
    }

    router.forward();
    window.setTimeout(updateNavigationState, 300);
  }, [effectiveCanGoForward, onGoForward, router, updateNavigationState, hasSequenceMatch, sequenceIndex, orderedRoutes]);

  const handleGoHome = useCallback(() => {
    if (onGoHome) {
      onGoHome();
      return;
    }

    router.push("/");
    window.setTimeout(updateNavigationState, 300);
  }, [onGoHome, router, updateNavigationState]);

  const containerClassName = useMemo(() => {
    return ["w-full", className].filter(Boolean).join(" ");
  }, [className]);

  const homeAriaLabel = isHomeRoute
    ? "אתם נמצאים בדף הבית"
    : `חזרה לדף הבית · שלב נוכחי: ${currentStageLabel}`;
  const centerButtonActive = isHomeRoute || Boolean(currentStageKey);

  return (
    <div
      className={[containerClassName, styles.shell].join(" ")}
      data-stage={currentStageKey ?? (isHomeRoute ? routes.home : "other")}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Forward Button - חץ ימינה (קדימה) - בצד שמאל */}
          <button
            type="button"
            onClick={handleGoForward}
            disabled={!effectiveCanGoForward}
            className={[
              "group relative",
              "p-3 sm:p-3.5",
              "rounded-full",
              "transition-all duration-400",
              "touch-manipulation",
              "border-0",
              !effectiveCanGoForward ? "opacity-40 cursor-not-allowed" : "",
              styles.button,
            ].filter(Boolean).join(" ")}
            aria-label="קדימה לדף הבא"
          >
            <ArrowRight 
              className={[
                "w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300",
                styles.icon,
                styles.iconForward,
              ].join(" ")}
            />
          </button>

          {/* Home Button - באמצע */}
          <button
            type="button"
            onClick={handleGoHome}
            className={[
              "group relative",
              "p-3 sm:p-3.5",
              "rounded-full",
              "transition-all duration-400",
              "touch-manipulation",
              "border-0",
              styles.button,
              styles.centerButton,
            ].join(" ")}
            data-active={centerButtonActive ? "true" : "false"}
            aria-label={homeAriaLabel}
            aria-current={isHomeRoute ? "page" : undefined}
          >
            <Home
              className={[
                "w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300",
                styles.icon,
                styles.iconHome,
              ].join(" ")}
            />
            <span className={styles.label} aria-live="polite">
              {currentStageLabel}
            </span>
          </button>

          {/* Back Button - חץ שמאלה (אחורה) - בצד ימין */}
          <button
            type="button"
            onClick={handleGoBack}
            disabled={!effectiveCanGoBack}
            className={[
              "group relative",
              "p-3 sm:p-3.5",
              "rounded-full",
              "transition-all duration-400",
              "touch-manipulation",
              "border-0",
              !effectiveCanGoBack ? "opacity-40 cursor-not-allowed" : "",
              styles.button,
            ].filter(Boolean).join(" ")}
            aria-label="חזרה לדף הקודם"
          >
            <ArrowLeft 
              className={[
                "w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300",
                styles.icon,
                styles.iconBack,
              ].join(" ")}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
