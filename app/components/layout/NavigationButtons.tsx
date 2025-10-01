"use client";

import { ArrowRight, ArrowLeft, Home } from "lucide-react";

interface NavigationButtonsProps {
  onGoBack: () => void;
  onGoForward: () => void;
  onGoHome: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

export function NavigationButtons({ onGoBack, onGoForward, onGoHome, canGoBack, canGoForward }: NavigationButtonsProps) {
  return (
    <div 
      className="fixed left-0 right-0 z-40 pointer-events-none"
      style={{
        top: 'calc(var(--header-height, 56px) + env(safe-area-inset-top))',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Forward Button - חץ ימינה (קדימה) - בצד שמאל */}
          <button
            onClick={onGoForward}
            disabled={!canGoForward}
            className={`
              group relative
              p-2 sm:p-2.5
              backdrop-blur-xl
              bg-white/15
              rounded-full
              transition-all duration-300
              shadow-[0_4px_16px_0_rgba(94,73,52,0.15),inset_0_1px_2px_0_rgba(255,255,255,0.3)]
              hover:shadow-[0_8px_24px_0_rgba(94,73,52,0.25),inset_0_2px_4px_0_rgba(255,255,255,0.4)]
              hover:scale-110
              hover:bg-white/25
              active:scale-95
              touch-manipulation
              ${!canGoForward ? 'opacity-40 cursor-not-allowed' : ''}
            `}
            aria-label="קדימה לדף הבא"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#87674F] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#5e4934]" />
          </button>

          {/* Home Button - באמצע */}
          <button
            onClick={onGoHome}
            className="
              group relative
              p-2 sm:p-2.5
              backdrop-blur-xl
              bg-white/15
              rounded-full
              transition-all duration-300
              shadow-[0_4px_16px_0_rgba(94,73,52,0.15),inset_0_1px_2px_0_rgba(255,255,255,0.3)]
              hover:shadow-[0_8px_24px_0_rgba(94,73,52,0.25),inset_0_2px_4px_0_rgba(255,255,255,0.4)]
              hover:scale-110
              hover:bg-white/25
              active:scale-95
              touch-manipulation
            "
            aria-label="חזרה לדף הבית"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-[#87674F] transition-all duration-300 group-hover:scale-110 group-hover:text-[#5e4934]" />
          </button>

          {/* Back Button - חץ שמאלה (אחורה) - בצד ימין */}
          <button
            onClick={onGoBack}
            disabled={!canGoBack}
            className={`
              group relative
              p-2 sm:p-2.5
              backdrop-blur-xl
              bg-white/15
              rounded-full
              transition-all duration-300
              shadow-[0_4px_16px_0_rgba(94,73,52,0.15),inset_0_1px_2px_0_rgba(255,255,255,0.3)]
              hover:shadow-[0_8px_24px_0_rgba(94,73,52,0.25),inset_0_2px_4px_0_rgba(255,255,255,0.4)]
              hover:scale-110
              hover:bg-white/25
              active:scale-95
              touch-manipulation
              ${!canGoBack ? 'opacity-40 cursor-not-allowed' : ''}
            `}
            aria-label="חזרה לדף הקודם"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#87674F] transition-all duration-300 group-hover:-translate-x-1 group-hover:text-[#5e4934]" />
          </button>
        </div>
      </div>
    </div>
  );
}