"use client";

import { GlassButton } from "@/app/components/shared/GlassButton";
import { Calculator } from "lucide-react";
import styles from "./Hero.module.css";

interface HeroProps {
  onNavigate: () => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
  <section className={["relative flex w-full items-center justify-center overflow-visible pt-6 pb-20 sm:pt-8 sm:pb-24 lg:pt-10 lg:pb-28", styles.sectionWrapper].join(" ")}> 
      <div className={["relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center", styles.contentLayer].join(" ")}>
        <div className="relative mx-auto max-w-full sm:max-w-3xl">
          <div
            className={["pointer-events-none absolute inset-x-4 -bottom-12 h-24 sm:inset-x-12 sm:-bottom-14 sm:h-28 lg:inset-x-16 lg:-bottom-16 lg:h-32", styles.shadow].join(" ")}
            aria-hidden="true"
          />
          <div
            className={["neuro-card-main relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12 transition-all duration-500 border-0", styles.card].join(" ")}
          >
            <div className="absolute inset-x-10 top-10 hidden sm:block opacity-60 blur-2xl" aria-hidden="true">
              <div className="h-20 rounded-full bg-gradient-to-r from-amber-100/50 via-white/60 to-amber-100/50" />
            </div>

            <div className="relative space-y-4 sm:space-y-5">
              <div className="flex justify-center">
                <div
                  className={["inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center", styles.iconInsetWrapper].join(" ")}
                >
                  <Calculator strokeWidth={1} className={["h-7 w-7 sm:h-8 sm:w-8", styles.iconColor].join(" ")} />
                </div>
              </div>

              <div className="mx-auto flex flex-col items-center gap-2 text-center sm:gap-3">
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
