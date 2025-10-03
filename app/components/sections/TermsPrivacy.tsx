type TermsPrivacyVariant = "terms" | "privacy" | "combined";

interface TermsPrivacySectionProps {
  variant?: TermsPrivacyVariant;
}

const TERMS_POINTS = [
  `השימוש במחשבון ובדו"ח הינו אישי בלבד ואינו מהווה ייעוץ פיננסי או רפואי.`,
  `המידע באתר ובדו"ח מבוסס על ממצאים נומרולוגיים ותודעתיים ומהווה מקור השראה בלבד.`,
  "אין להעתיק, לשכפל או להפיץ תכנים ללא אישור בכתב מאת Awakening by Ksenia.",
  "הרכישה של מוצרי הליווי כפופה למדיניות ביטולים על פי חוק הגנת הצרכן.",
];

const PRIVACY_POINTS = [
  `אנחנו שומרים את פרטייך האישיים (שם, אימייל ותאריך לידה) לצורך הפקת הדו"ח בלבד.`,
  "הנתונים לא יועברו לצד ג' ללא הסכמה מפורשת מראש.",
  "ניתן לבקש מחיקה מלאה של המידע בכל עת דרך שליחת מייל לכתובת התמיכה.",
  "השימוש בעוגיות נעשה למדידת אנליטיקות בסיסיות ושיפור החוויה באתר.",
];

export function TermsPrivacySection({ variant = "combined" }: TermsPrivacySectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="neuro-card-main rounded-[36px] bg-white/85 p-8 shadow-xl">
          {variant !== "privacy" && (
            <article className="mb-10 text-right">
              <span className="caption text-brown-mid">תנאי שימוש</span>
              <h2 className="mt-2 text-3xl text-brown-heading">תנאי שימוש באתר ובמוצרים</h2>
              <ul className="mt-4 space-y-3 text-sm text-brown-dark/80">
                {TERMS_POINTS.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </article>
          )}

          {variant !== "terms" && (
            <article className="text-right">
              <span className="caption text-brown-mid">מדיניות פרטיות</span>
              <h2 className="mt-2 text-3xl text-brown-heading">שמירה על פרטיותך</h2>
              <ul className="mt-4 space-y-3 text-sm text-brown-dark/80">
                {PRIVACY_POINTS.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-brown-dark/60">
                העדכון האחרון של מסמך זה בוצע ב-{new Date().getFullYear()}.
              </p>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
