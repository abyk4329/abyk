'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Home } from "lucide-react";

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

  const updateNavigationState = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const historyState = window.history.state as { idx?: number } | null;
    const currentIndex = historyState?.idx ?? 0;
    const totalEntries = window.history.length ?? 1;

    setNavigationState({
      canGoBack: currentIndex > 0,
      canGoForward: currentIndex < totalEntries - 1,
    });
  }, []);

  useEffect(() => {
    updateNavigationState();

    window.addEventListener("popstate", updateNavigationState);
    return () => window.removeEventListener("popstate", updateNavigationState);
  }, [updateNavigationState]);

  useEffect(() => {
    updateNavigationState();
  }, [pathname, updateNavigationState]);

  const effectiveCanGoBack = canGoBack ?? navigationState.canGoBack;
  const effectiveCanGoForward = canGoForward ?? navigationState.canGoForward;

  const handleGoBack = useCallback(() => {
    if (!effectiveCanGoBack) {
      return;
    }

    if (onGoBack) {
      onGoBack();
      return;
    }

    router.back();
    window.setTimeout(updateNavigationState, 300);
  }, [effectiveCanGoBack, onGoBack, router, updateNavigationState]);

  const handleGoForward = useCallback(() => {
    if (!effectiveCanGoForward) {
      return;
    }

    if (onGoForward) {
      onGoForward();
      return;
    }

    router.forward();
    window.setTimeout(updateNavigationState, 300);
  }, [effectiveCanGoForward, onGoForward, router, updateNavigationState]);

  const handleGoHome = useCallback(() => {
    if (onGoHome) {
      onGoHome();
      return;
    }

    router.push("/");
    window.setTimeout(updateNavigationState, 300);
  }, [onGoHome, router, updateNavigationState]);

  const containerClassName = useMemo(() => {
    return ["w-full mb-4 sm:mb-6", className].filter(Boolean).join(" ");
  }, [className]);

  const buttonStyle = {
    background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(248, 244, 240))',
    boxShadow: `
      8px 8px 16px rgba(159, 133, 114, 0.2),
      -8px -8px 16px rgba(255, 255, 255, 0.9),
      inset 1px 1px 3px rgba(255, 255, 255, 0.7)
    `
  };

  const hoverShadow = `
    10px 10px 20px rgba(159, 133, 114, 0.25),
    -10px -10px 20px rgba(255, 255, 255, 1),
    inset 1px 1px 3px rgba(255, 255, 255, 0.8)
  `;

  const pressedShadow = `
    inset 4px 4px 8px rgba(159, 133, 114, 0.18),
    inset -4px -4px 8px rgba(255, 255, 255, 0.8),
    1px 1px 3px rgba(159, 133, 114, 0.1)
  `;

  const normalShadow = `
    8px 8px 16px rgba(159, 133, 114, 0.2),
    -8px -8px 16px rgba(255, 255, 255, 0.9),
    inset 1px 1px 3px rgba(255, 255, 255, 0.7)
  `;

  return (
    <div 
      className={containerClassName}
      style={{
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Forward Button - חץ ימינה (קדימה) - בצד שמאל */}
          <button
            type="button"
            onClick={handleGoForward}
            disabled={!effectiveCanGoForward}
            className={`
              group relative
              p-3 sm:p-3.5
              rounded-full
              transition-all duration-400
              touch-manipulation
              border-0
              ${!effectiveCanGoForward ? 'opacity-40 cursor-not-allowed' : ''}
            `}
            style={buttonStyle}
            onMouseEnter={(e) => {
              if (effectiveCanGoForward) {
                e.currentTarget.style.boxShadow = hoverShadow;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseDown={(e) => {
              if (effectiveCanGoForward) {
                e.currentTarget.style.boxShadow = pressedShadow;
                e.currentTarget.style.transform = 'scale(0.95) translateY(1px)';
              }
            }}
            onMouseUp={(e) => {
              if (effectiveCanGoForward) {
                e.currentTarget.style.boxShadow = hoverShadow;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = normalShadow;
              e.currentTarget.style.transform = '';
            }}
            aria-label="קדימה לדף הבא"
          >
            <ArrowRight 
              className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:translate-x-1" 
              style={{ color: 'rgb(135, 103, 79)' }}
            />
          </button>

          {/* Home Button - באמצע */}
          <button
            type="button"
            onClick={handleGoHome}
            className="
              group relative
              p-3 sm:p-3.5
              rounded-full
              transition-all duration-400
              touch-manipulation
              border-0
            "
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = hoverShadow;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = pressedShadow;
              e.currentTarget.style.transform = 'scale(0.95) translateY(1px)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = hoverShadow;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = normalShadow;
              e.currentTarget.style.transform = '';
            }}
            aria-label="חזרה לדף הבית"
          >
            <Home 
              className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110" 
              style={{ color: 'rgb(135, 103, 79)' }}
            />
          </button>

          {/* Back Button - חץ שמאלה (אחורה) - בצד ימין */}
          <button
            type="button"
            onClick={handleGoBack}
            disabled={!effectiveCanGoBack}
            className={`
              group relative
              p-3 sm:p-3.5
              rounded-full
              transition-all duration-400
              touch-manipulation
              border-0
              ${!effectiveCanGoBack ? 'opacity-40 cursor-not-allowed' : ''}
            `}
            style={buttonStyle}
            onMouseEnter={(e) => {
              if (effectiveCanGoBack) {
                e.currentTarget.style.boxShadow = hoverShadow;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseDown={(e) => {
              if (effectiveCanGoBack) {
                e.currentTarget.style.boxShadow = pressedShadow;
                e.currentTarget.style.transform = 'scale(0.95) translateY(1px)';
              }
            }}
            onMouseUp={(e) => {
              if (effectiveCanGoBack) {
                e.currentTarget.style.boxShadow = hoverShadow;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = normalShadow;
              e.currentTarget.style.transform = '';
            }}
            aria-label="חזרה לדף הקודם"
          >
            <ArrowLeft 
              className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:-translate-x-1" 
              style={{ color: 'rgb(135, 103, 79)' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
