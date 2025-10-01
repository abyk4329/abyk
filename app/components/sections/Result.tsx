"use client";

const backgroundImage = "/images/61a287a191cbe6aa8bcb3bd084132926dd86fada.png";
const logo = "/images/bdac5cb81d27fdfd2e671bace0444b5b16c8c60c.png";
import { GlassButton } from "../shared/GlassButton";

interface ResultProps {
  code: string;
}

export function Result({ code }: ResultProps) {
  // זיהוי סוג הקוד
  const getCodeType = (code: string) => {
    const digits = code.split('');
    const uniqueDigits = new Set(digits);
    
    // קוד מאסטר - כל הספרות זהות
    if (uniqueDigits.size === 1) {
      return {
        type: "קוד מאסטר",
        description: "כל הספרות זהות - אנרגיה מרוכזת ועוצמתית במיוחד"
      };
    }
    
    // בדיקת ספרות חוזרות
    const digitCount: { [key: string]: number } = {};
    digits.forEach(digit => {
      digitCount[digit] = (digitCount[digit] || 0) + 1;
    });
    
    const hasRepeating = Object.values(digitCount).some(count => count > 1);
    
    if (hasRepeating) {
      return {
        type: "קוד עם ספרות חוזרות",
        description: "אנרגיות מועצמות של ספרות מסוימות"
      };
    }
    
    // קוד מגוון - כל הספרות שונות
    return {
      type: "קוד מגוון",
      description: "כל הספרות שונות - איזון ומגוון אנרגטי"
    };
  };

  const codeInfo = getCodeType(code);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pb-4 sm:pb-6 fullscreen-bg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          top: `calc(-1 * env(safe-area-inset-top))`,
          left: `calc(-1 * env(safe-area-inset-left))`,
          right: `calc(-1 * env(safe-area-inset-right))`,
          bottom: `calc(-1 * env(safe-area-inset-bottom))`,
          width: 'calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))',
          height: 'calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))'
        }}
      />

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50"
        style={{
          top: `calc(-1 * env(safe-area-inset-top))`,
          left: `calc(-1 * env(safe-area-inset-left))`,
          right: `calc(-1 * env(safe-area-inset-right))`,
          bottom: `calc(-1 * env(safe-area-inset-bottom))`,
          width: 'calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))',
          height: 'calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-24 lg:pt-28 mb-4 sm:mb-6">
        <div className="max-w-full sm:max-w-3xl mx-auto">
          
          {/* Glassmorphic Card */}
          <div className="glass-card-main rounded-3xl p-8 sm:p-12 lg:p-14 transition-all duration-500 hover:shadow-[0_12px_40px_0_rgba(94,73,52,0.25)]">
            {/* Main Heading */}
            <h1 className="mb-4 sm:mb-6 text-center" style={{ color: '#9f8572', textShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' }}>
              קוד העושר שלך
            </h1>

            {/* The Code - Large Display */}
            <div className="mb-6 sm:mb-8 text-center">
              <div 
                className="inline-block px-12 py-6 backdrop-blur-xl bg-white/20 rounded-3xl shadow-[0_6px_24px_0_rgba(94,73,52,0.15),inset_0_2px_4px_0_rgba(255,255,255,0.4)]"
              >
                <div 
                  style={{
                    fontSize: 'clamp(4rem, 10vw, 7rem)',
                    fontWeight: '300',
                    color: '#5e4934',
                    letterSpacing: '0.15em',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                  }}
                >
                  {code}
                </div>
              </div>
            </div>

            {/* Code Type */}
            <h2 className="mb-3 sm:mb-4 text-center" style={{ color: '#87674F', textShadow: '0 1px 2px rgba(0, 0, 0, 0.07)' }}>
              {codeInfo.type}
            </h2>

            {/* Description */}
            <p className="caption mb-8 sm:mb-10 max-w-xl mx-auto text-center">
              {codeInfo.description}
            </p>

            {/* CTA Button */}
            <div className="flex justify-center items-center">
              <GlassButton onClick={() => window.location.hash = '#/sales'}>
                גלו את המשמעות המלאה
              </GlassButton>
            </div>
          </div>

          {/* Logo - Below Card */}
          <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(94,73,52,0.2),inset_0_1px_2px_0_rgba(255,255,255,0.3)] mb-[-30px]">
              <img 
                src={logo} 
                alt="Awakening by Ksenia" 
                className="h-20 sm:h-28 lg:h-36 w-auto max-w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
