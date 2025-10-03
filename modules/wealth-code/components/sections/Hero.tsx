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
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-full sm:max-w-3xl mx-auto">
          
          {/* Wealth Code Card */}
          <div 
            className="rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 border-0"
            style={neumorphismStyles.card.main}
            {...createHoverHandlers(
              neumorphismStyles.card.main.boxShadow,
              neumorphismStyles.card.main.hover
            )}
          >
            {/* Icon */}
            <div className="flex justify-center mb-5 sm:mb-6">
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

            {/* Main Heading */}
            <h1 className="mb-3 sm:mb-4">
              גלו את קוד העושר שלכם
            </h1>

            {/* Subtitle */}
            <p className="mb-6 sm:mb-8 max-w-2xl mx-auto caption">
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
