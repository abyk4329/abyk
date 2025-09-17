"use client";
import Image from "next/image";
import React, { Suspense, useEffect, useMemo, useState } from "react";
// Secure sanitization (library is required dependency)
import DOMPurify from "isomorphic-dompurify";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [htmlPreview, setHtmlPreview] = useState<string>("");
  const [sanitizedHtml, setSanitizedHtml] = useState<string>("");
  const [uniqueNumbers, setUniqueNumbers] = useState<number[]>([]);
  const [interpretationLoading, setInterpretationLoading] = useState(false);
  const [interpretationError, setInterpretationError] = useState<string | null>(
    null,
  );

  // Derive code from URL first, then fallback to localStorage
  const code = useMemo(() => {
    const safeParse = (val: string | null) => {
      if (val == null) return 0;
      const n = parseInt(val, 10);
      return Number.isFinite(n) && n > 0 ? n : 0;
    };

    const bd = safeParse(searchParams.get("bd"));
    const bm = safeParse(searchParams.get("bm"));
    const by = safeParse(searchParams.get("by"));
    const lp = safeParse(searchParams.get("lp"));

    const allValid = bd > 0 && bm > 0 && by > 0 && lp > 0;
    if (allValid) return { bd, bm, by, lp };

    // Fallback to localStorage only if URL set invalid or empty
    try {
      const raw = localStorage.getItem("abyk_money_code");
      if (raw) {
        const saved = JSON.parse(raw);
        const fbd = safeParse(String(saved?.bd ?? ""));
        const fbm = safeParse(String(saved?.bm ?? ""));
        const fby = safeParse(String(saved?.by ?? ""));
        const flp = safeParse(String(saved?.lp ?? ""));
        if (fbd > 0 && fbm > 0 && fby > 0 && flp > 0)
          return { bd: fbd, bm: fbm, by: fby, lp: flp };
      }
    } catch {
      // Ignore localStorage errors
    }
    return { bd: 0, bm: 0, by: 0, lp: 0 };
  }, [searchParams]);

  function fetchInterpretation() {
    if (!code.bd || !code.bm || !code.by || !code.lp) return;
    const url = `/api/interpretation?inline=1&source=1&bd=${code.bd}&bm=${code.bm}&by=${code.by}&lp=${code.lp}`;
    setInterpretationError(null);
    setInterpretationLoading(true);
    setHtmlPreview("");
    setSanitizedHtml("");
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (data?.html) setHtmlPreview(data.html);
        if (Array.isArray(data?.uniqueNumbers))
          setUniqueNumbers(data.uniqueNumbers);
      })
      .catch((err) => {
        console.error("[ThankYou] Interpretation fetch failed", err);
        setInterpretationError(
          "שגיאה בטעינת הפירוש. נסו שוב בעוד רגע או רעננו את העמוד.",
        );
      })
      .finally(() => setInterpretationLoading(false));
  }

  useEffect(() => {
    fetchInterpretation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  // Sanitize interpretation HTML safely with lifecycle guard
  useEffect(() => {
    let active = true;
    if (!htmlPreview) {
      setSanitizedHtml("");
      return () => {
        active = false;
      };
    }
    try {
      const clean = DOMPurify.sanitize(htmlPreview, {
        USE_PROFILES: { html: true },
      });
      if (active) setSanitizedHtml(clean);
    } catch {
      if (active) setSanitizedHtml("");
    }
    return () => {
      active = false;
    };
  }, [htmlPreview]);

  return (
    <main className="container flex flex-col items-center justify-center min-h-screen py-8">
      <div className="max-w-2xl space-y-8 text-center">
        {/* אייקון */}
        <div className="logo">
          <Image
            src="/newlogos/logo.png"
            alt="Awakening by Ksenia Logo"
            width={250}
            height={125}
            className="mx-auto"
          />
        </div>

        {/* הודעת תודה */}
        <div className="p-8 border bg-ivory/90 backdrop-blur-sm rounded-2xl shadow-warm-md border-beige-200">
          <div className="mb-6">
            <h1 className="mb-4 text-3xl font-bold text-cacao">
              תודה על הרכישה
            </h1>
          </div>
          <div className="space-y-6 text-lg">
            <p className="font-bold text-espresso">
              התשלום נקלט בהצלחה, והפירוש האישי שלכם כבר מוכן
            </p>
            <p className="text-text-secondary">
              אפשר לעיין בו מיד כאן בעמוד, ובסוף הטקסט יופיע קישור נוח להורדה.
              במקביל נשלח אליכם גם דוא״ל.
            </p>

            {/* קוד המספרים בפיל לבן */}
            {code.bd && code.bm && code.by && code.lp ? (
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "BD", value: code.bd },
                  { label: "BM", value: code.bm },
                  { label: "BY", value: code.by },
                  { label: "LP", value: code.lp },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-3 py-3 border shadow-sm rounded-xl bg-espresso border-espresso/30"
                  >
                    <div className="mb-1 text-xs text-pearl/80">
                      {item.label}
                    </div>
                    <div className="text-2xl font-extrabold leading-none text-white">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {/* הודעה מינימליסטית על המייל */}
            <div className="p-6 border bg-ivory border-beige-200 rounded-xl text-espresso shadow-warm-sm">
              <p className="mb-4 text-base leading-relaxed text-center">
                אם חלפו יותר מ־15 דקות והמייל עדיין לא התקבל,
                <span className="font-medium">
                  {" "}
                  ניתן לפנות אליי ואשמח לעזור
                </span>
                .
              </p>
              {/* כפתורי קשר עם אייקונים */}
              <div className="flex justify-center gap-6">
                <a
                  href="mailto:awakening.by.ksenia@gmail.com?subject=לא קיבלנו מייל עם הפירוש&body=שלום, הזמנו פירוש נומרולוגי אבל לא קיבלנו מייל. נשמח לעזרה."
                  className="transition-colors duration-200 text-smoky-brown hover:text-cacao"
                  aria-label="דוא״ל"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
                <a
                  href="https://wa.me/972524616121?text=שלום, הזמנו פירוש נומרולוגי אבל לא קיבלנו מייל. נשמח לעזרה"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 text-smoky-brown hover:text-cacao"
                  aria-label="וואטסאפ"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* תצוגה והורדה של הפירוש */}
        {(interpretationLoading || interpretationError || sanitizedHtml) && (
          <div className="w-full max-w-4xl">
            <div className="p-6 mb-6 border bg-ivory border-beige-200 rounded-xl shadow-warm-sm">
              <h2 className="mb-4 text-2xl font-medium text-center text-cacao assistant-light">
                הפירוש האישי שלכם
              </h2>
              <div className="mb-4 text-sm text-center text-espresso/60">
                <span className="assistant-light">
                  המספרים הייחודיים שלכם:{" "}
                </span>
                <span className="font-medium text-cacao">
                  {uniqueNumbers.length ? uniqueNumbers.join(", ") : "—"}
                </span>
              </div>
              {interpretationLoading && (
                <div className="p-3 text-sm text-center border rounded-lg bg-beige-100/40 border-beige-200 animate-pulse text-espresso">
                  טוען את הפירוש...
                </div>
              )}
              {interpretationError && !interpretationLoading && (
                <div className="p-4 text-sm text-center text-red-700 border border-red-200 rounded-lg bg-red-50">
                  <div className="mb-3">{interpretationError}</div>
                  <button
                    type="button"
                    onClick={fetchInterpretation}
                    className="px-4 py-2 text-xs font-medium text-red-700 transition-colors duration-200 border border-red-300 rounded-md bg-white/70 hover:bg-red-100"
                  >
                    נסה שוב
                  </button>
                </div>
              )}
            </div>
            {sanitizedHtml &&
              !interpretationLoading &&
              !interpretationError && (
                <div className="p-6 text-right border bg-ivory/95 backdrop-blur-sm rounded-xl border-beige-200 shadow-warm-sm">
                  <div className="prose prose-lg max-w-none" dir="rtl">
                    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
                  </div>
                  <div className="pt-6 mt-8 text-center border-t border-gold/20">
                    <a
                      className="underline transition-colors assistant-regular text-espresso/80 hover:text-espresso decoration-gold/50 hover:decoration-gold"
                      href={`/api/interpretation?bd=${code.bd}&bm=${code.bm}&by=${code.by}&lp=${code.lp}&download=1&source=1`}
                    >
                      הורדת הפירוש המלא
                    </a>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function ThankYou() {
  return (
    <Suspense
      fallback={
        <main className="container flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="mb-4 text-lg text-cacao">טוען...</div>
          </div>
        </main>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
