"use client";

import { useEffect } from "react";
import { GlassButton } from "@/app/components/shared/GlassButton";
import { Calculator } from "lucide-react";
import { CardStack, NeuroCard } from "@/modules/wealth-code/components/shared";
import { shareWithFriends } from "@/modules/wealth-code/utils";
import styles from "./Hero.module.css";

interface HeroProps {
  onNavigate: () => void;
}

export function Hero({ onNavigate }: HeroProps) {
  // Scroll locking now handled centrally in AppShell; this local effect removed.
  useEffect(() => {
    // Ensure we start at top when entering hero (safety net)
    window?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <section className={["hero-shell", styles.sectionWrapper].join(" ")}>
      <div className={"absolute inset-0 overflow-visible"} aria-hidden="true">
        <div className={styles.blurField} />
      </div>
    <div className={["relative z-10 w-full", styles.contentLayer].join(" ")}>
        <CardStack className={styles.cardStack}>
          <div className={["relative", styles.cardFrame].join(" ")}>
            <div
              className={["pointer-events-none absolute inset-x-4 -bottom-12 h-24 sm:inset-x-12 sm:-bottom-14 sm:h-28 lg:inset-x-16 lg:-bottom-16 lg:h-32", styles.shadow].join(" ")}
              aria-hidden="true"
            />
            <NeuroCard
              hero
              heroGroup="a"
              variant="main"
              className={["relative overflow-hidden border-0", styles.card].join(" ")}
            >
              <div className="absolute inset-x-10 top-10 hidden sm:block opacity-60 blur-2xl" aria-hidden="true">
                <div className="h-20 rounded-full bg-gradient-to-r from-amber-100/50 via-white/60 to-amber-100/50" />
              </div>

              <div className="relative space-y-4 sm:space-y-5 text-center">
                <div className="flex justify-center">
                  <div
                    className={["inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center", styles.iconInsetWrapper].join(" ")}
                  >
                    <Calculator strokeWidth={1} className={["h-7 w-7 sm:h-8 sm:w-8", styles.iconColor].join(" ")} />
                  </div>
                </div>

                <div className="mx-auto flex flex-col items-center gap-2 sm:gap-3">
                  <h1>גלו את קוד העושר שלכם</h1>
                  <p className="caption max-w-2xl">לחישוב וקבלת קוד אישי לפי תאריך לידה</p>
                </div>

                <div className={styles.heroActions}>
                  <GlassButton className={styles.calculatorButton} onClick={onNavigate}>
                    מחשבון קוד העושר
                  </GlassButton>
                </div>
              </div>
            </NeuroCard>
          </div>

        </CardStack>
        <div className={styles.shareBar}>
          <button type="button" onClick={shareWithFriends} className={styles.shareButton}>
            שתפו עם חברים
          </button>
        </div>
      </div>
    </section>
  );
}
