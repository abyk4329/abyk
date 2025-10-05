"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassButton } from "@/app/components/shared/GlassButton";

import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "abyk-cookie-consent";

type ConsentStatus = "accepted" | "dismissed" | null;

export function CookieConsent() {
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState<ConsentStatus>(null);

  useEffect(() => {
    setIsMounted(true);

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as ConsentStatus;
      if (stored === "accepted" || stored === "dismissed") {
        setStatus(stored);
      }
    } catch (error) {
      console.warn("Failed to read cookie consent status", error);
    }
  }, []);

  const handleAccept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch (error) {
      console.warn("Failed to persist cookie consent status", error);
    }

    setStatus("accepted");
    
    // Trigger TikTok Pixel initialization after consent
    if (typeof window !== "undefined" && window.ttq) {
      window.ttq.page();
    }
  };

  if (!isMounted || status === "accepted") {
    return null;
  }

  return (
    <div
      className={["fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4 sm:px-6", styles.outer].join(" ")}
      aria-live="polite"
    >
      <div
        className={["w-full max-w-xl rounded-[28px] border-0 px-6 py-5 text-center text-sm sm:text-base", styles.card].join(" ")}
      >
        <h2
          className={["mb-3 text-base font-semibold sm:text-lg", styles.title].join(" ")}
        >
          האתר שלי משתמש בקובצי קוקיז
        </h2>
        <p className="mx-auto mb-4 max-w-[38ch] text-xs leading-snug text-[#473b31] sm:text-sm">
          האתר שלי משתמש בקובצי קוקיז כדי לשפר את החוויה שלך, לאסוף מידע סטטיסטי ולמטרות שיווק (כולל TikTok Pixel). 
          לחיצה על &quot;אני מאשר&quot; מהווה הסכמה לשימוש בקוקיז.
        </p>
        <div className="flex flex-col items-center justify-center gap-3">
          <GlassButton onClick={handleAccept} className="w-full sm:w-auto">
            אני מאשר
          </GlassButton>
        </div>
        <div className="mt-3 text-xs text-[#9f8572]">
          <Link href="/terms" className="underline underline-offset-2">
            קראו על תנאי שימוש ומדיניות פרטיות
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
