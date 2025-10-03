'use client';

import { ArrowRight, ArrowLeft, Home } from "lucide-react";

interface NavigationButtonsProps {
  onGoBack: () => void;
  onGoForward: () => void;
  onGoHome: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

export function NavigationButtons({ onGoBack, onGoForward, onGoHome, canGoBack, canGoForward }: NavigationButtonsProps) {
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
      className="w-full mb-4 sm:mb-6"
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
            onClick={onGoForward}
            disabled={!canGoForward}
            className={`
              group relative
              p-3 sm:p-3.5
              rounded-full
              transition-all duration-400
              touch-manipulation
              border-0
              ${!canGoForward ? 'opacity-40 cursor-not-allowed' : ''}
            `}
            style={buttonStyle}
            onMouseEnter={(e) => {
              if (canGoForward) {
                e.currentTarget.style.boxShadow = hoverShadow;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseDown={(e) => {
              if (canGoForward) {
                e.currentTarget.style.boxShadow = pressedShadow;
                e.currentTarget.style.transform = 'scale(0.95) translateY(1px)';
              }
            }}
            onMouseUp={(e) => {
              if (canGoForward) {
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
            onClick={onGoHome}
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
            onClick={onGoBack}
            disabled={!canGoBack}
            className={`
              group relative
              p-3 sm:p-3.5
              rounded-full
              transition-all duration-400
              touch-manipulation
              border-0
              ${!canGoBack ? 'opacity-40 cursor-not-allowed' : ''}
            `}
            style={buttonStyle}
            onMouseEnter={(e) => {
              if (canGoBack) {
                e.currentTarget.style.boxShadow = hoverShadow;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseDown={(e) => {
              if (canGoBack) {
                e.currentTarget.style.boxShadow = pressedShadow;
                e.currentTarget.style.transform = 'scale(0.95) translateY(1px)';
              }
            }}
            onMouseUp={(e) => {
              if (canGoBack) {
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
