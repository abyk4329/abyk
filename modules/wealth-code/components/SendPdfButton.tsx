"use client";
import { useState } from "react";

export function SendPdfButton({
  to,
  fullName,
  email,
  wealthCode,
  notes,
}: {
  to: string;
  fullName?: string;
  email?: string;
  wealthCode?: string;
  notes?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/send-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, fullName, email, wealthCode, notes }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setOk(true);
      } else {
        setOk(false);
        setError(data.error || "Failed to send email");
      }
    } catch (err) {
      setOk(false);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        className="neuro-button rounded-2xl px-6 py-3 active-press disabled:opacity-50"
        onClick={handleSend}
        disabled={loading || !to}
      >
        {loading ? "שולחת..." : ok ? "נשלח ✓" : "שלחי PDF למייל"}
      </button>
      
      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}
      
      {ok && (
        <p className="text-sm text-green-600 text-center">
          המייל נשלח בהצלחה! בדקי את תיבת הדואר שלך.
        </p>
      )}
    </div>
  );
}
