"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function BottomLogo() {
  const pathname = usePathname();
  if (pathname === "/") return null; // hide on homepage

  return (
    <div className="pointer-events-none select-none w-full flex items-center justify-center mt-8 mb-6 md:mb-8">
      <Image
        src="/newlogos/logobase.png"
        alt="Awakening by Ksenia Logo"
        width={220}
        height={100}
        className="contrast-105 saturate-105 drop-shadow-[0_6px_24px_rgba(167,131,90,0.25)]"
        priority={false}
      />
    </div>
  );
}
