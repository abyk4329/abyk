"use client";
/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function Privacy() {
  const [privacyContent, setPrivacyContent] = useState<string>("");
  const [sanitized, setSanitized] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/privacytext.html", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const ct = response.headers.get("content-type") || "";
        if (!ct.includes("html")) throw new Error("Unexpected content-type");
        return response.text();
      })
      .then((data) => {
        if (!active) return;
        setPrivacyContent(data);
        try {
          const clean = DOMPurify.sanitize(data, {
            ALLOWED_TAGS: [
              "a",
              "p",
              "strong",
              "em",
              "ul",
              "ol",
              "li",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "br",
              "span",
            ],
            ALLOWED_ATTR: [
              "href",
              "title",
              "target",
              "rel",
              "dir",
              "lang",
              "class",
            ],
          });
          setSanitized(clean);
        } catch (e) {
          console.error("Sanitization failed", e);
          setSanitized("<p>שגיאה בעיבוד התוכן.</p>");
        }
      })
      .catch((err) => {
        if (!active) return;
        console.error("Error loading privacy content:", err);
        setError("שגיאה בטעינת התוכן. נסו לרענן את העמוד.");
        setSanitized("<p>שגיאה בטעינת התוכן.</p>");
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="container py-8 mx-auto">
      <div className="content">
  <h1 className="mb-8 font-bold text-gold-deep">מדיניות פרטיות</h1>
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
            {error}
          </div>
        )}
        <div
          className="leading-relaxed text-charcoal"
          // The HTML here has been sanitized using DOMPurify with a strict allowlist
          dangerouslySetInnerHTML={{
            __html:
              sanitized ||
              (privacyContent ? "<p>מעבד תוכן…</p>" : "<p>טוען תוכן…</p>"),
          }}
        />
        <div className="mt-10">
          <a
            href="/"
            className="inline-block px-6 py-3 transition-colors duration-300 rounded-lg ripple assistant-bold bg-charcoal hover:bg-gold-deep text-ivory text-ms-0"
          >
            חזרה לעמוד הבית
          </a>
        </div>
      </div>
    </main>
  );
}
