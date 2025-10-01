"use client";

import Image from "next/image";
import { GlassButton } from "../shared/GlassButton";

const backgroundImage = "/images/61a287a191cbe6aa8bcb3bd084132926dd86fada.png";
const logo = "/images/bdac5cb81d27fdfd2e671bace0444b5b16c8c60c.png";

interface HeroProps {
  onNavigate?: () => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative h-[calc(100vh-env(safe-area-inset-top)-env(safe-area-inset-bottom))] sm:min-h-screen w-full flex items-center justify-center overflow-hidden pb-2 sm:pb-6 fullscreen-bg">
      {/* Background Image - extends to screen edges including status bar */}
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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 sm:pt-24 lg:pt-32 pb-2 sm:mb-4">
        <div className="max-w-full sm:max-w-4xl mx-auto">
          {/* Logo - Above Card */}
          <div className="sm:mb-8 lg:mb-10 flex justify-center m-[0px] px-[0px] p-[0px]">
            <Image
              src={logo}
              alt="Awakening by Ksenia"
              width={400}
              height={400}
              priority
              className="h-32 sm:h-48 lg:h-56 w-auto max-w-full object-contain drop-shadow-2xl px-[0px] py-[-25px] mt-[28px] mr-[0px] mb-[40px] ml-[0px]"
              sizes="(max-width: 640px) 8rem, (max-width: 1024px) 12rem, 14rem"
            />
          </div>

          {/* Glassmorphic Card */}
          <div className="glass-card-main rounded-2xl sm:rounded-3xl p-5 sm:p-12 lg:p-16 transition-all duration-500 hover:shadow-[0_12px_40px_0_rgba(94,73,52,0.25)]">
            {/* Main Heading */}
            <h1 className="mb-3 sm:mb-8">
              גלו את קוד העושר שלכם
            </h1>

            {/* Subtitle */}
            <p className="mb-5 sm:mb-10 lg:mb-12 max-w-2xl mx-auto caption">
              לחישוב וקבלת קוד אישי לפי תאריך לידה
            </p>

            {/* CTA Button */}
            <div className="flex justify-center items-center">
              <GlassButton onClick={onNavigate}>
                מחשבון קוד העושר
              </GlassButton>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}