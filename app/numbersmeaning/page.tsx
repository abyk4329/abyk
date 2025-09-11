"use client";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function NumbersMeaning() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const tryPaths = ["/numbersmeaninglast.html", "/numbersmeaning.html"];
    const abortController = new AbortController();

    (async () => {
      for (const p of tryPaths) {
        try {
          const r = await fetch(p, {
            cache: "no-store",
            signal: abortController.signal,
          });

          if (r.ok) {
            // Check Content-Type to ensure it's HTML (robust to charset / casing)
            const rawContentType = r.headers.get("content-type");
            const mediaType = rawContentType
              ? rawContentType.split(";")[0].trim().toLowerCase()
              : "";
            if (!mediaType.startsWith("text/html")) {
              if (process.env.NODE_ENV === "development") {
                console.warn(
                  `Skipping non-HTML response from ${p}. Content-Type: ${rawContentType}`,
                );
              }
              continue;
            }

            const text = await r.text();
            if (text && text.trim()) {
              // Sanitize HTML before setting it
              const sanitizedHtml = DOMPurify.sanitize(text);
              setHtml(sanitizedHtml);

              if (process.env.NODE_ENV === "development") {
                console.log(`Successfully loaded HTML from ${p}`);
              }
              break;
            }
          } else {
            if (process.env.NODE_ENV === "development") {
              console.warn(`Failed to fetch ${p}. Status: ${r.status}`);
            }
          }
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error(`Error fetching ${p}:`, error);
          }
        }
      }
    })();

    // Cleanup function to abort in-flight requests
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <main className="container mx-auto py-8">
      <div className="content text-right">
        <h1 className="text-gold-deep text-3xl font-bold mb-8">
          פירושי המספרים
        </h1>
        <div
          className="text-charcoal leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html || "<p>התוכן מתעדכן...</p>" }}
        />
        <div className="mt-10">
          <a
            href="/"
            className="inline-block ripple font-bold bg-charcoal hover:bg-gold-deep text-ivory px-6 py-3 rounded-lg transition-colors duration-300"
          >
            חזרה לעמוד הבית
          </a>
        </div>
      </div>
    </main>
  );
}
