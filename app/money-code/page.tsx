"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function MoneyCode() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{
    bd: number;
    bm: number;
    by: number;
    lp: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Warning specifically for non-critical persistence issues (e.g. localStorage blocked)
  const [storageWarning, setStorageWarning] = useState<string | null>(null);
  // Track configuration error for missing payment URL
  const [configError, setConfigError] = useState<string | null>(null);

  const paymentBase = process.env.NEXT_PUBLIC_PAYMENT_URL;

  useEffect(() => {
    if (!paymentBase) {
      const msg =
        "שגיאת תצורה: משתנה הסביבה NEXT_PUBLIC_PAYMENT_URL לא הוגדר. לא ניתן לבצע תשלום עד להגדרה.";
      console.warn(
        "[MoneyCode] Missing NEXT_PUBLIC_PAYMENT_URL environment variable",
      );
      setConfigError(msg);
    } else {
      // Clear any existing config error if payment URL is now available
      setConfigError(null);
    }
  }, [paymentBase]);

  const parseISODate = (iso: string) => {
    const m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(iso);
    if (!m) throw new Error("Invalid date format. Use YYYY-MM-DD");
    const y = m[1];
    const mo = m[2];
    const d = m[3];
    const year = Number(y);
    const month = Number(mo);
    const day = Number(d);
    const dt = new Date(Date.UTC(year, month - 1, day));
    const valid =
      dt.getUTCFullYear() === year &&
      dt.getUTCMonth() === month - 1 &&
      dt.getUTCDate() === day;
    if (!valid) throw new Error("Invalid date values");
    return { year, month, day };
  };

  const reduceToSingleDigit = (num: number): number => {
    num = Math.abs(num);
    while (num >= 10) {
      num = num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    }
    return num;
  };

  const calculateMoneyCode = () => {
    if (!birthDate) return;

    setIsLoading(true);
    setError(null);

    let year = 0;
    let month = 0;
    let day = 0;
    try {
      const d = parseISODate(birthDate);
      year = d.year;
      month = d.month;
      day = d.day;
    } catch {
      setIsLoading(false);
      setError("תאריך לא תקין. פורמט נדרש YYYY-MM-DD");
      return;
    }

    const bd = reduceToSingleDigit(day);
    const bm = reduceToSingleDigit(month);
    const by = reduceToSingleDigit(year);
    const lp = reduceToSingleDigit(bd + bm + by);

    const isValid = (...vals: number[]) =>
      vals.every((v) => Number.isInteger(v) && v >= 1 && v <= 9);
    if (!isValid(bd, bm, by, lp)) {
      setIsLoading(false);
      setError("רק מספרים 1–9 מותרים. אנא בדקו את התאריך שהוזן.");
      return;
    }

    setTimeout(() => {
      setResult({ bd, bm, by, lp });
      setIsLoading(false);
    }, 1000);
  };

  const clearData = () => {
    setBirthDate("");
    setResult(null);
    setError(null);
  };

  const handlePayment = () => {
    if (!result || !birthDate) return;
    if (!paymentBase) {
      setError(
        "לא ניתן לפתוח תשלום: כתובת יעד לתשלום לא הוגדרה (NEXT_PUBLIC_PAYMENT_URL).",
      );
      return;
    }

    try {
      setStorageWarning(null);
      localStorage.setItem(
        "abyk_money_code",
        JSON.stringify({
          ...result,
          birthDate,
          ts: Date.now(),
        }),
      );
    } catch (err) {
      // Log detailed context for debugging; avoid throwing to keep flow
      console.error(
        "[MoneyCode] Failed to persist money code to localStorage",
        {
          error: err,
          attempted: { ...result, birthDate },
        },
      );
      setStorageWarning(
        "שמירה מקומית נכשלה – ניתן להמשיך, אך ייתכן שהמידע לא יישמר בדפדפן.",
      );
    }

    const params = new URLSearchParams({
      bd: result.bd.toString(),
      bm: result.bm.toString(),
      by: result.by.toString(),
      lp: result.lp.toString(),
      birthDate: birthDate,
      return_url: `${window.location.origin}/thank-you?bd=${result.bd}&bm=${result.bm}&by=${result.by}&lp=${result.lp}`,
      business_name: "Awakening by Ksenia",
      business_tagline:
        "Your personal space for growth. Unlock the light within you.",
      logo_url: `${window.location.origin}/newlogos/favicon.png`,
    });
    {/* prettier-ignore */}
    window.open(`${paymentBase}?${params.toString()}`, "_blank");
  };

  return (
    <main className="container min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8 text-center">
        <div className="logo">
          <Image
            src="/newlogos/logo.png"
            alt="Awakening by Ksenia Logo"
            width={250}
            height={125}
            className="mx-auto"
            priority
          />
        </div>

        <div className="mt-8 mb-8 animate-gleam-fade-in">
          <Image
            src="/newlogos/welthcodeline copy.png"
            alt="Wealth Code Calculator Title"
            width={700}
            height={175}
            className="mx-auto drop-shadow-[0_3px_10px_rgba(167,131,90,0.15)]"
          />
        </div>

        <div className="max-w-md p-8 mx-auto border-2 shadow-warm-sm bg-ivory/95 backdrop-blur-sm rounded-2xl border-beige-200">
          <div className="space-y-6">
            <div>
              <label className="block mb-3 text-lg font-medium text-center text-cacao">
                הכניסו תאריך לידה
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 font-normal text-center transition-all border-2 rounded-lg shadow-sm border-beige-200/70 bg-ivory text-espresso focus:outline-none focus:ring-2 focus:ring-gold-primary/40 focus:border-gold-primary [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:brightness-[0.8] [&::-webkit-calendar-picker-indicator]:sepia-[1] [&::-webkit-calendar-picker-indicator]:saturate-[3] [&::-webkit-calendar-picker-indicator]:hue-rotate-[15deg]"
                dir="ltr"
                aria-label="תאריך לידה"
              />
            </div>

            {(error || configError) && (
              <div className="p-3 text-sm text-center text-red-700 border border-red-200 rounded-lg bg-red-50">
                {configError || error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={calculateMoneyCode}
                disabled={!birthDate || isLoading}
                className="flex-1 px-6 py-3 text-white transition-all duration-300 rounded-lg bg-gold-primary hover:bg-gold-deep disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="text-sm">מחשבים...</div>
                ) : (
                  "אני רוצה לדעת מה הקוד שלי"
                )}
              </button>
              <button
                onClick={clearData}
                className="px-4 py-2 text-sm border transition-all duration-300 rounded-lg border-beige-300 text-espresso hover:bg-beige-100"
              >
                נקה
              </button>
            </div>
          </div>
        </div>
        {result && (
          <div className="max-w-lg p-6 mx-auto border-2 shadow-warm-sm bg-ivory/95 backdrop-blur-sm rounded-xl border-beige-200 animate-fade-in">
            <h2 className="text-title text-depth-medium emphasis-strong animate-gleam-fade-in">
              קוד העושר האישי שלכם
            </h2>

            <div className="p-5 mb-6 text-center border-2 rounded-lg shadow-warm-sm bg-ivory backdrop-blur-sm border-beige-200 animate-slide-up">
              <div
                dir="ltr"
                className="font-mono text-6xl font-light tracking-[0.2em] text-cacao select-all"
              >
                {`${result.bd}${result.bm}${result.by}${result.lp}`}
              </div>
            </div>
            {storageWarning && (
              <div className="p-3 mt-4 text-xs text-center border rounded-lg text-amber-900 border-amber-300 bg-amber-50">
                {storageWarning}
              </div>
            )}

            <div
              className="p-6 mb-8 border rounded-lg shadow-sm bg-ivory backdrop-blur-sm border-beige-200/80 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="mb-4 space-y-2 text-sm leading-relaxed text-center text-text-secondary">
                <p>הקוד שגיליתם הוא מפתח אנרגטי שמלווה אתכם מלידה.</p>
                {/* prettier-ignore */}
                <p>
                  אפשר לשאת אותו כקמע אישי, להשתמש בו כקוד סמוי לכרטיסים או
                  מכשירים, לכתוב אותו בארנק כמגנט לשפע – או לחזור עליו
                  במדיטציה יומית כמנטרה שמחזקת מיקוד ועוצמה פנימית.
                </p>
              </div>
              <div className="mb-4 text-center">
                <span className="text-sm text-gold-warm">⸻</span>
              </div>
              <h4 className="mb-3 text-sm font-medium text-center text-cacao">
                גלו את עצמכם דרך הקוד האישי
              </h4>
              <div className="max-w-xl mx-auto space-y-2 text-sm leading-relaxed text-text-secondary">
                <p className="text-center">
                  כשאתם מבינים מה מסתתר מאחורי כל ספרה – נפתחת בפניכם מפה ברורה:
                </p>
                <ul className="pr-2 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-gold-warm">•</span>
                    <span>
                      אילו כוחות טבעיים וחוזקות מולדים קיימים בכם ואיך להעצים
                      אותם.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-warm">•</span>
                    <span>מהם המחסומים שמעכבים אתכם ואיך לפרוץ אותם.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-warm">•</span>
                    <span>
                      על מה חשוב לשים לב במיוחד כדי להפסיק לחזור על אותם דפוסים
                      שוב ושוב.
                    </span>
                  </li>
                </ul>
                <p className="mt-2">
                  הקוד מעניק לכם מפתח לשפע, הצלחה והגשמה – אישית וכלכלית.
                </p>
                {/* prettier-ignore-start */}
                {/* prettier-ignore */}
                <p>
                  ברגע שתראו אילו תכונות נטבעו בכם מלידה, תבינו שזה לא
                  &ldquo;אשמתכם&rdquo;, ותוכלו להפסיק להילחם בעצמכם. במקום להסתיר חולשות –
                  תדעו איך להפוך אותן למנוף לצמיחה ולפרוץ סוף סוף קדימה.
                </p>
                {/* prettier-ignore */}
                <p>
                  זה הזמן לצאת עם עצמכם ל&ldquo;דייט ראשון&rdquo; אמיתי – להכיר מי אתם
                  באמת. והכול מתחיל כאן.
                </p>
                {/* prettier-ignore-end */}
              </div>
              <div className="mt-4 text-center">
                <p className="mb-3 text-cacao">
                  ✨ גלו מה המספרים מספרים עליכם – רק ב־36.9 ₪
                </p>
                <button
                  onClick={handlePayment}
                  disabled={!!configError}
                  className="px-8 py-3 text-base font-medium transition-all duration-300 border-2 shadow-md bg-gold-primary/20 hover:bg-gold-primary/30 text-espresso border-gold-primary/50 hover:scale-[1.02] rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="אנחנו בפנים"
                >
                  {configError ? "שגיאת תצורה" : "אנחנו בפנים"}
                </button>
              </div>
              <div className="mt-6 text-center">
                <span className="text-sm text-gold-warm">⸻</span>
              </div>
              <div className="mt-4 space-y-1 text-sm text-center text-text-secondary">
                <div className="font-medium text-cacao">
                  מה קורה אחרי התשלום?
                </div>
                <p>תוך דקות ספורות תקבלו למייל מפת דרכים אישית לשפע והצלחה.</p>
                <p>
                  בנוסף – תוכלו לצפות בפירוש ישירות באתר, כולל אפשרות להורדה.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
