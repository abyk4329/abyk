"use client";

import { GlassButton } from "@/app/components/shared/GlassButton";
import { neumorphismStyles, createHoverHandlers } from "@/app/components/lib/neomorphism-styles";
import { Sparkles } from "lucide-react";

interface HeroProps {
  onNavigate: () => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden pb-8 sm:pb-10 lg:pb-12">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-full sm:max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex justify-center">
            <div
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-0 transition-all duration-500"
              style={neumorphismStyles.icon.default}
              {...createHoverHandlers(
                neumorphismStyles.icon.default.boxShadow,
                neumorphismStyles.icon.default.hover
              )}
            >
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#87674F' }} />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <h1>גלו את קוד העושר שלכם</h1>
            <p className="max-w-2xl mx-auto caption">לחישוב וקבלת קוד אישי לפי תאריך לידה</p>
          </div>

          <div className="flex justify-center">
            <GlassButton onClick={onNavigate}>מחשבון קוד העושר</GlassButton>
          </div>
        </div>
      </div>
    </section>
  );
}
