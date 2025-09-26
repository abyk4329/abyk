"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ArrowLeft, Mail, Eye, Code, Download } from "lucide-react";
import { generateEmailHTML, generateEmailSubject, generateEmailText } from "./EmailTemplate";
import { computeCodeStructure } from "@/lib/codeStructure";
import { paths } from "@/lib/urls";

type RepeatedDigit = { digit: number; count: number };
type CodeStructureSummary = {
  digits: number[];
  repeatedDigits: RepeatedDigit[];
  allSame: boolean;
  allDifferent: boolean;
  hasRepeats: boolean;
  type: "master" | "repeated" | "diverse";
};

type EmailData = {
  wealthCode: number;
  viewUrl: string;
  downloadUrl: string;
  codeStructure: CodeStructureSummary;
};

interface EmailPreviewProps {
  wealthCode?: number;
  codeStructure?: CodeStructureSummary;
  fullData?: unknown; // שמרי אם צריך בעתיד
}

export function EmailPreview({
  wealthCode: initialWealthCode,
  codeStructure,
}: EmailPreviewProps) {
  const router = useRouter();
  const [wealthCode, setWealthCode] = useState<number>(initialWealthCode || 1234);
  const [viewMode, setViewMode] = useState<"html" | "text" | "data">("html");

  // SSR-safe origin
  const origin = useMemo(() => {
    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin;
    }
    return process.env.NEXT_PUBLIC_BASE_URL || "https://abyk.online";
  }, []);

  const structure = useMemo<CodeStructureSummary>(() => {
    if (codeStructure) return codeStructure;
    const codeStr = String(wealthCode);
    const key = computeCodeStructure(Number(codeStr)).type;
    const digits = codeStr.split("").map(Number);
    const counts = digits.reduce<Record<number, number>>((acc, d) => {
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    }, {});
    const repeated = Object.entries(counts)
      .filter(([, c]) => (c as number) > 1)
      .map(([digit, count]) => ({ digit: parseInt(digit, 10), count: count as number }));
    const setSize = new Set(digits).size;
    return {
      digits,
      repeatedDigits: repeated,
      allSame: setSize === 1,
      allDifferent: setSize === 4,
      hasRepeats: repeated.length > 0,
      type: key,
    };
  }, [codeStructure, wealthCode]);

  const emailData = useMemo<EmailData>(() => {
    const codeEnc = encodeURIComponent(String(wealthCode));
    return {
      wealthCode,
      viewUrl: `${origin}/interpretations?code=${codeEnc}&utm_source=email&utm_campaign=delivery`,
      downloadUrl: `${origin}/api/download-pdf?code=${codeEnc}`,
      codeStructure: structure,
    };
  }, [origin, structure, wealthCode]);

  const emailHTML = useMemo(() => generateEmailHTML(emailData), [emailData]);
  const emailText = useMemo(() => generateEmailText(emailData), [emailData]);
  const emailSubject = useMemo(
    () => generateEmailSubject(wealthCode),
    [wealthCode]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50" lang="he" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="subtle"
            size="lg"
            onClick={() => router.push(paths.home())}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            חזור
          </Button>
          <div>
            <h1 className="text-2xl font-medium text-[#5E4934] font-['Assistant']">
              תצוגה מקדימה של המייל ללקוח
            </h1>
            <p className="text-[#87674F] font-light font-['Assistant']">
              בדוק איך המייל שהלקוח מקבל נראה
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#87674F]/20">
              <h2 className="text-lg font-medium text-[#5E4934] mb-4 font-['Assistant']">
                הגדרות בדיקה
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#5E4934] mb-2 font-['Assistant']">
                    קוד עושר
                  </label>
                  <Input
                    type="number"
                    value={wealthCode}
                    onChange={(e) => {
                      const n = parseInt(e.target.value || "", 10);
                      if (Number.isNaN(n)) {
                        setWealthCode(1234);
                      } else {
                        // גבולות סבירים
                        const clamped = Math.max(1111, Math.min(9999, n));
                        setWealthCode(clamped);
                      }
                    }}
                    min={1111}
                    max={9999}
                    className="text-center font-['Assistant']"
                    inputMode="numeric"
                  />
                </div>

                {/** Intentionally no customer name control; template uses neutral greeting **/}

                <div>
                  <label className="block text-sm font-medium text-[#5E4934] mb-2 font-['Assistant']">
                    מצב תצוגה
                  </label>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={viewMode === "html" ? "brand" : "subtle"}
                      size="sm"
                      onClick={() => setViewMode("html")}
                      className="w-full justify-start font-['Assistant']"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      תצוגת HTML
                    </Button>
                    <Button
                      variant={viewMode === "text" ? "brand" : "subtle"}
                      size="sm"
                      onClick={() => setViewMode("text")}
                      className="w-full justify-start font-['Assistant']"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      תצוגת טקסט
                    </Button>
                    <Button
                      variant={viewMode === "data" ? "brand" : "subtle"}
                      size="sm"
                      onClick={() => setViewMode("data")}
                      className="w-full justify-start font-['Assistant']"
                    >
                      <Code className="w-4 h-4 mr-2" />
                      מבנה הנתונים
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#87674F]/10 rounded-lg">
                <h3 className="font-medium text-[#5E4934] mb-2 font-['Assistant']">
                  כותרת המייל:
                </h3>
                <p className="text-sm text-[#87674F] font-['Assistant']">{emailSubject}</p>
              </div>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-[#87674F]/20">
              <div className="p-4 border-b border-[#87674F]/20">
                <h2 className="text-lg font-medium text-[#5E4934] font-['Assistant']">
                  תצוגה מקדימה
                </h2>
              </div>

              <div className="p-6">
                {viewMode === "html" && (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <iframe
                      // srcDoc בטוח לדפדפן עבור preview פנימי
                      srcDoc={emailHTML}
                      className="w-full h-[800px] border-none"
                      title="Email Preview"
                      sandbox="allow-same-origin"
                    />
                  </div>
                )}

                {viewMode === "text" && (
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap max-h-[800px] overflow-y-auto">
                    {emailText}
                  </div>
                )}

                {viewMode === "data" && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-[#5E4934] mb-2 font-['Assistant']">
                        נתוני האימייל
                      </h3>
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {JSON.stringify(emailData, null, 2)}
                      </pre>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-[#5E4934] mb-2 font-['Assistant']">
                        לינקים במייל
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>צפייה באתר:</strong>
                          <br />
                          <a
                            href={emailData.viewUrl}
                            className="text-blue-600 hover:underline break-all"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {emailData.viewUrl}
                          </a>
                        </div>
                        <div>
                          <strong>הורדת PDF:</strong>
                          <br />
                          <span className="text-gray-600 break-all">
                            {emailData.downloadUrl}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-4">
          <Button
            onClick={() => {
              const blob = new Blob([emailHTML], { type: "text/html" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `email-preview-${wealthCode}.html`;
              document.body.appendChild(a);
              a.click();
              a.remove();
              URL.revokeObjectURL(url);
            }}
            className="bg-[#87674F] hover:bg-[#95705D] text-white font-['Assistant']"
          >
            <Download className="w-4 h-4 mr-2" />
            הורד HTML
          </Button>
        </div>
      </div>
    </div>
  );
}