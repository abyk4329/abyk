"use client";

import { GlassButton } from "@/app/components/shared/GlassButton";
import { Sparkles } from "lucide-react";
import styles from "./Hero.module.css";

interface HeroProps {
  onNavigate: () => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-var(--header-height))] w-full items-center justify-center overflow-visible py-10 sm:py-12 lg:py-16">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative mx-auto max-w-full sm:max-w-3xl">
          <div
            className={["pointer-events-none absolute inset-x-4 -bottom-12 h-24 sm:inset-x-12 sm:-bottom-14 sm:h-28 lg:inset-x-16 lg:-bottom-16 lg:h-32", styles.shadow].join(" ")}
            aria-hidden="true"
          />
          <div
            className={["neuro-card-main relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16 transition-all duration-500 border-0", styles.card].join(" ")}
          >
            <div className="absolute inset-x-10 top-10 hidden sm:block opacity-60 blur-2xl" aria-hidden="true">
              <div className="h-20 rounded-full bg-gradient-to-r from-amber-100/50 via-white/60 to-amber-100/50" />
            </div>

            <div className="relative space-y-6 sm:space-y-8">
              <div className="flex justify-center">
                <div
                  className="neuro-icon-default inline-flex h-16 w-16 items-center justify-center rounded-full border-0 transition-all duration-500 sm:h-20 sm:w-20"
                >
                  <Sparkles className={["h-8 w-8 sm:h-10 sm:w-10", styles.iconColor].join(" ")} />
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
