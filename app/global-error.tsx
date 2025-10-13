"use client";

import "./globals.css";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { assistant } from "./fonts";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="he" dir="rtl" className={assistant.variable}>
      <body
        className={[
          assistant.className,
          "page-bg text-foreground antialiased",
        ].join(" ")}
      >
        <div className="flex min-h-screen items-center justify-center px-6 py-12">
          <div className="max-w-md space-y-6 rounded-3xl bg-white/80 p-8 text-center shadow-lg backdrop-blur">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
                משהו השתבש
              </p>
              <h1 className="text-3xl font-semibold">קרה שינוי לא צפוי</h1>
              <p className="text-sm text-stone-600">
                אנחנו קיבלנו דיווח אוטומטי ונבחן מה קרה. בינתיים תוכלי לרענן את
                הדף או לחזור לעמוד הבית.
              </p>
            </div>
            {error.digest && (
              <p className="text-xs font-mono text-stone-400">
                קוד שגיאה: {error.digest}
              </p>
            )}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={reset}
                className="neuro-button rounded-2xl px-5 py-3 text-sm font-medium"
              >
                נסי שוב
              </button>
              <Link
                href="/"
                className="neuro-button rounded-2xl bg-stone-900 px-5 py-3 text-sm font-medium text-white"
              >
                חזרה לדף הבית
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
