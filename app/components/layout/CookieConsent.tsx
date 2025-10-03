"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassButton } from "@/app/components/shared/GlassButton";

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
  };

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch (error) {
      console.warn("Failed to persist cookie consent status", error);
    }

    setStatus("dismissed");
  };

  if (!isMounted || status === "accepted") {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4 sm:px-6"
      style={{ pointerEvents: "none" }}
      aria-live="polite"
    >
      <div
        className="w-full max-w-xl rounded-[28px] border-0 px-6 py-5 text-center text-sm sm:text-base"
        style={{
          pointerEvents: "auto",
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 244, 240, 0.88))",
          boxShadow:
            "0 20px 45px rgba(159, 133, 114, 0.18), 0 2px 6px rgba(255, 255, 255, 0.9), inset 2px 2px 6px rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(22px)",
        }}
      >
        <h2
          className="mb-3 text-base font-semibold sm:text-lg"
          style={{ color: "#87674f" }}
        >
          אנחנו משתמשים בעוגיות (Cookies)
        </h2>
        <p className="mx-auto mb-4 max-w-[32ch] text-xs leading-snug text-[#473b31] sm:text-sm">
          אנו משתמשים בעוגיות כדי להעניק לך חוויה מותאמת אישית ולמדוד ביצועים. ניתן לעיין במדיניות שלנו כדי ללמוד עוד.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <GlassButton onClick={handleAccept} className="w-full sm:w-auto">
            אני מאשר/ת
          </GlassButton>
          <button
            type="button"
            onClick={handleDismiss}
            className="w-full rounded-full border-0 px-4 py-2 text-[#87674f] transition-all duration-200 sm:w-auto"
            style={{
              background:
                "linear-gradient(145deg, rgba(253, 252, 251, 0.6), rgba(245, 241, 237, 0.6))",
              boxShadow:
                "inset 4px 4px 8px rgba(159, 133, 114, 0.15), inset -4px -4px 8px rgba(255, 255, 255, 0.85)",
            }}
          >
            אולי אחר כך
          </button>
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
