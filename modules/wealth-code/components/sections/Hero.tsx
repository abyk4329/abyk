"use client";

import { GlassButton } from "@/app/components/shared/GlassButton";
import { neumorphismStyles, createHoverHandlers } from "@/app/components/lib/neomorphism-styles";
import type { CSSProperties } from "react";
import { Sparkles } from "lucide-react";

interface HeroProps {
  onNavigate: () => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { hover: cardHoverShadow, ...cardBaseStyles } = neumorphismStyles.card.main;

  const cardStyle: CSSProperties = {
    ...cardBaseStyles,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRadius: "32px",
  };

  const shadowStyle: CSSProperties = {
    background: "radial-gradient(circle at 50% 50%, rgba(159,133,114,0.22), rgba(159,133,114,0.14) 45%, rgba(159,133,114,0.08) 65%, rgba(255,255,255,0) 82%)",
    filter: "blur(36px)",
    opacity: 0.95,
    transform: "scaleX(1.1) translateY(6px)",
  };

  return (
    <section className="relative flex min-h-[calc(100vh-var(--header-height))] w-full items-center justify-center overflow-visible py-10 sm:py-12 lg:py-16">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative mx-auto max-w-full sm:max-w-3xl">
          <div
            className="pointer-events-none absolute inset-x-4 -bottom-12 h-24 sm:inset-x-12 sm:-bottom-14 sm:h-28 lg:inset-x-16 lg:-bottom-16 lg:h-32"
            style={shadowStyle}
            aria-hidden="true"
          />
          <div
            className="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16 transition-all duration-500 border-0"
            style={cardStyle}
            {...createHoverHandlers(cardBaseStyles.boxShadow, cardHoverShadow)}
          >
            <div className="absolute inset-x-10 top-10 hidden sm:block opacity-60 blur-2xl" aria-hidden="true">
              <div className="h-20 rounded-full bg-gradient-to-r from-amber-100/50 via-white/60 to-amber-100/50" />
            </div>

            <div className="relative space-y-6 sm:space-y-8">
              <div className="flex justify-center">
                <div
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full border-0 transition-all duration-500 sm:h-20 sm:w-20"
                  style={neumorphismStyles.icon.default}
                  {...createHoverHandlers(
                    neumorphismStyles.icon.default.boxShadow,
                    neumorphismStyles.icon.default.hover
                  )}
                >
                  <Sparkles className="h-8 w-8 sm:h-10 sm:w-10" style={{ color: "#87674F" }} />
                </div>
              </div>

              <div className="mx-auto flex flex-col items-center gap-3 text-center sm:gap-4">
                <h1>גלו את קוד העושר שלכם</h1>
                <p className="caption max-w-2xl">לחישוב וקבלת קוד אישי לפי תאריך לידה</p>
              </div>

              <div className="flex justify-center">
                <GlassButton onClick={onNavigate}>מחשבון קוד העושר</GlassButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
