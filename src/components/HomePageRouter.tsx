'use client'

import { useRouter } from 'next/navigation'
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";
import Image from "next/image";
import { paths } from "@/lib/urls";

export function HomePageRouter() {
  const router = useRouter();

  const handleShowCalculator = () => {
    router.push(paths.calculator());
  };



  return (
    <div className="relative min-h-screen" lang="he">
      {/* Overlays over global body background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20"></div>
        <div className="backdrop-saturate-110 backdrop-contrast-102 backdrop-brightness-102 absolute inset-0"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 sm:py-20">
          <div className="w-full max-w-4xl text-center">
            {/* Logo above the card, centered, on the background */}
            <div className="mb-12 mt-4 sm:mb-16">
              <Image
                src={logoImage}
                alt="AWAKENING"
                className="mx-auto h-40 w-auto opacity-95 drop-shadow-2xl sm:h-52"
                priority
              />
            </div>

            {/* Glass card with title, subtext, and button */}
            <div className="brand-card mx-auto max-w-md p-8 sm:p-12">
              <h1 className="mb-3 font-['Assistant'] text-2xl font-normal tracking-wide text-[#87674F] drop-shadow-lg sm:text-3xl lg:text-4xl">
                גלו את קוד העושר שלכם
              </h1>
              <p className="mb-8 font-['Assistant'] text-sm font-light leading-relaxed text-[#87674F] opacity-90 drop-shadow-md sm:text-base">
                לחישוב וקבלת קוד אישי על פי תאריך לידה
              </p>
              <Button
                size="lg"
                onClick={handleShowCalculator}
                className="w-full font-['Assistant'] sm:w-auto"
              >
                מחשבון קוד העושר
              </Button>

              {/* סימולציה מהירה: מעבר לעמוד תודה עם קוד בדיקה - מוסתרת בפרודקשן, אלא אם הוגדר NEXT_PUBLIC_SHOW_SIMULATE=1 */}
              {(process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SHOW_SIMULATE === '1') && (
                <div className="mt-3">
                  <Button
                    size="sm"
                    variant="subtle"
                    onClick={() => router.push(paths.thankYou(7335))}
                    className="px-5 font-['Assistant']"
                  >
                    סימולציית תשלום (בדיקה)
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
