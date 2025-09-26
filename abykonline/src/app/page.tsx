"use client"

import Image from "next/image";
import Link from "next/link";

import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { paths } from "@/lib/urls";

export default function HomePage() {
  return (
    <div className="relative min-h-screen" lang="he">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20" />
        <div className="absolute inset-0 backdrop-saturate-110 backdrop-contrast-102 backdrop-brightness-102" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 sm:py-20">
          <div className="w-full max-w-4xl text-center">
            <div className="mt-[-80px] mb-[48px] sm:mb-16">
              <Image
                src={logoImage}
                alt="AWAKENING"
                className="mx-auto h-40 w-auto opacity-95 drop-shadow-2xl sm:h-52"
                priority
              />
            </div>

            <div className="mx-auto max-w-md rounded-3xl border border-[rgba(135,103,79,0.2)] bg-[rgba(254,254,254,0.12)] p-8 shadow-2xl backdrop-blur-xl sm:p-12">
              <h2
                className="text-2xl font-normal tracking-wide drop-shadow-lg font-['Assistant'] sm:text-3xl lg:text-4xl"
                style={{ color: "#473B31" }}
              >
                גלו את קוד העושר שלכם
              </h2>
              <p className="mb-8 font-['Assistant'] text-[14px] font-light tracking-wide text-[rgba(149,112,82,1)] drop-shadow-md">
                לחישוב וקבלת קוד האישי על פי תאריך לידה
              </p>
              <div>
                <Button
                  size="lg"
                  className="mb-4 w-full border-none bg-[rgba(149,112,82,0.3)] px-8 py-4 font-['Assistant'] text-lg font-normal tracking-wide text-[rgba(254,254,254,1)] backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-[rgba(149,112,82,0.5)] hover:shadow-xl sm:w-auto"
                  asChild
                >
                  <Link href={paths.calculator()}>מחשבון קוד העושר</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
