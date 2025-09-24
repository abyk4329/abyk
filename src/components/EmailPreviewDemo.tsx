"use client";

import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, Download } from "lucide-react";
import { generateEmailHTML, generateEmailSubject } from "./EmailTemplate";
import { detectCodeStructure } from "@/lib/detectCodeStructure";

type RepeatedDigit = { digit: number; count: number };
type CodeStructureSummary = {
  digits: number[];
  repeatedDigits: RepeatedDigit[];
  allSame: boolean;
  allDifferent: boolean;
  hasRepeats: boolean;
  type: "master" | "repeated" | "diverse";
};

interface EmailPreviewDemoProps {
  onBack: () => void;
}

export function EmailPreviewDemo({ onBack }: EmailPreviewDemoProps) {
  const [wealthCode, setWealthCode] = useState<number>(1234);

  const origin = useMemo(() => {
    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin;
    }
    return process.env.NEXT_PUBLIC_BASE_URL || "https://abyk.online";
  }, []);

  const codeStructure: CodeStructureSummary = useMemo(() => {
    const codeStr = String(wealthCode);
    const key = detectCodeStructure(codeStr);
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
  }, [wealthCode]);

  const emailData = useMemo(() => {
    const codeEnc = encodeURIComponent(String(wealthCode));
    return {
      wealthCode,
      viewUrl: `${origin}/interpretations?code=${codeEnc}&utm_source=email&utm_campaign=delivery`,
      downloadUrl: `${origin}/api/download-pdf?code=${codeEnc}`,
      codeStructure,
    };
  }, [origin, wealthCode, codeStructure]);

  const emailHTML = useMemo(() => generateEmailHTML(emailData), [emailData]);
  const emailSubject = useMemo(
    () => generateEmailSubject(String(wealthCode)),
    [wealthCode]
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50"
      lang="he"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="lg"
            onClick={onBack}
            className="flex items-center gap-2 text-[#473B31] hover:text-[#87674F]"
          >
            <ArrowLeft className="w-5 h-5" />
            חזור
          </Button>
          <div>
            <h1 className="text-3xl font-medium text-[#473B31] font-['Assistant']">
              תצוגה מקדימה של המייל ללקוח
            </h1>
            <p className="text-[#87674F] font-light font-['Assistant']">
              כך נראה המייל שהלקוח מקבל לאחר הרכישה
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#87674F]/20">
              <h2 className="text-lg font-medium text-[#473B31] mb-4 font-['Assistant']">
                הגדרות דוגמה
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#473B31] mb-2 font-['Assistant']">
                    קוד עושר לדוגמה
                  </label>
                  <input
                    type="number"
                    value={wealthCode}
                    onChange={(e) => {
                      const n = parseInt(e.target.value || "", 10);
                      if (Number.isNaN(n)) {
                        setWealthCode(1234);
                      } else {
                        const clamped = Math.max(1111, Math.min(9999, n));
                        setWealthCode(clamped);
                      }
                    }}
                    min={1111}
                    max={9999}
                    className="w-full p-2 border border-gray-300 rounded text-center font-['Assistant']"
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#87674F]/10 rounded-lg">
                <h3 className="font-medium text-[#473B31] mb-2 font-['Assistant']">
                  כותרת המייל:
                </h3>
                <p className="text-sm text-[#87674F] font-['Assistant']">
                  {emailSubject}
                </p>
              </div>

              <Button
                onClick={() => {
                  const blob = new Blob([emailHTML], { type: "text/html" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `email-preview-${wealthCode}.html`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full mt-4 bg-[#87674F] hover:bg-[#95705D] text-white font-['Assistant']"
              >
                <Download className="w-4 h-4 mr-2" />
                הורד את המייל כקובץ HTML
              </Button>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-[#87674F]/20">
              <div className="p-4 border-b border-[#87674F]/20">
                <h2 className="text-lg font-medium text-[#473B31] font-['Assistant']">
                  תצוגה מקדימה של המייל
                </h2>
              </div>

              <div className="p-6">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg">
                  <iframe
                    srcDoc={emailHTML}
                    className="w-full h-[800px] border-none"
                    title="Email Preview"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
