"use client"

import Image from "next/image";
import Link from "next/link";

import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "@/components/ui/button";
import { paths } from "@/lib/urls";

export default function HomePage() {
  return (
    <div className="flex min-h-full items-start justify-center px-4 pt-4 pb-8 sm:px-6 sm:pt-8 sm:pb-12" lang="he">
      <div className="w-full max-w-4xl text-center">
        <div className="mt-[-20px] mb-6 sm:mb-8">
          <Image
            src={logoImage}
            alt="AWAKENING"
            className="mx-auto h-32 w-auto opacity-95 drop-shadow-2xl sm:h-40"
            priority
          />
        </div>

        <div className="mx-auto max-w-md rounded-3xl border border-[rgba(135,103,79,0.2)] bg-[rgba(254,254,254,0.12)] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <h2
            className="text-2xl font-normal tracking-wide drop-shadow-lg font-['Assistant'] sm:text-3xl lg:text-4xl"
            style={{ color: "#87674F" }}
          >
            גלו את קוד העושר שלכם
          </h2>
          <p className="mb-6 font-['Assistant'] text-[14px] font-light tracking-wide text-[rgba(149,112,82,1)] drop-shadow-md">
            לחישוב וקבלת קוד האישי על פי תאריך לידה
          </p>
          <div>
            <Button
              size="lg"
              className="w-full border-none bg-[rgba(149,112,82,0.3)] px-8 py-4 font-['Assistant'] text-lg font-normal tracking-wide text-[rgba(254,254,254,1)] backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-[rgba(149,112,82,0.5)] hover:shadow-xl sm:w-auto"
              asChild
            >
              <Link href={paths.calculator()}>מחשבון קוד העושר</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
