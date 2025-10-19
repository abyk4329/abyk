import "@/app/components/neu/neumorphic-shadows.css";
import styles from "./shadows.module.css";

export default function ShadowsShowcasePage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>מערכת הצללות Neumorphic</h1>
          <p className={styles.subtitle}>
            4 סוגי הצללות עיקריים × 3 גדלים (sm, md, lg)
          </p>
        </header>

        {/* 1. RAISED - בולט */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--neu-accent)" }}
            >
              1. Raised (בולט) - אלמנט שצף מעל המשטח
            </h2>
            <p style={{ color: "var(--neu-text-tertiary)" }}>
              שימוש: כפתורים, כרטיסים, אלמנטים אינטראקטיביים
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Small */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                Small (sm)
              </h3>
              <div className="neu-raised-sm neu-bg rounded-2xl p-6 text-center cursor-pointer">
                <div className="text-4xl mb-2">🎯</div>
                <p style={{ color: "var(--neu-text-primary)" }}>כפתור קטן</p>
                <code
                  className="text-xs block mt-2"
                  style={{ color: "var(--neu-text-tertiary)" }}
                >
                  .neu-raised-sm
                </code>
              </div>
            </div>

            {/* Medium */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                Medium (md)
              </h3>
              <div className="neu-raised-md neu-bg rounded-2xl p-8 text-center cursor-pointer">
                <div className="text-5xl mb-3">🎨</div>
                <p style={{ color: "var(--neu-text-primary)" }}>כרטיס בינוני</p>
                <code
                  className="text-xs block mt-2"
                  style={{ color: "var(--neu-text-tertiary)" }}
                >
                  .neu-raised-md
                </code>
              </div>
            </div>

            {/* Large */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                Large (lg)
              </h3>
              <div className="neu-raised-lg neu-bg rounded-2xl p-10 text-center cursor-pointer">
                <div className="text-6xl mb-4">🚀</div>
                <p style={{ color: "var(--neu-text-primary)" }}>כרטיס גדול</p>
                <code
                  className="text-xs block mt-3"
                  style={{ color: "var(--neu-text-tertiary)" }}
                >
                  .neu-raised-lg
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FLAT RAISED - בולט שטוח */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--neu-accent)" }}
            >
              2. Flat Raised (בולט שטוח) - בולט עדין יותר
            </h2>
            <p style={{ color: "var(--neu-text-tertiary)" }}>
              שימוש: אלמנטים משניים, כרטיסי מידע, תגיות
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Small */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                Small (sm)
              </h3>
              <div className="neu-flat-raised-sm neu-bg rounded-2xl p-6 text-center cursor-pointer">
                <div className="text-4xl mb-2">📌</div>
                <p style={{ color: "var(--neu-text-primary)" }}>תגית קטנה</p>
                <code
                  className="text-xs block mt-2"
                  style={{ color: "var(--neu-text-tertiary)" }}
                >
                  .neu-flat-raised-sm
                </code>
              </div>
            </div>

            {/* Medium */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                Medium (md)
              </h3>
              <div className="neu-flat-raised-md neu-bg rounded-2xl p-8 text-center cursor-pointer">
                <div className="text-5xl mb-3">📋</div>
                <p style={{ color: "var(--neu-text-primary)" }}>כרטיס מידע</p>
                <code
                  className="text-xs block mt-2"
                  style={{ color: "var(--neu-text-tertiary)" }}
                >
                  .neu-flat-raised-md
                </code>
              </div>
            </div>

            {/* Large */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                Large (lg)
              </h3>
              <div className="neu-flat-raised-lg neu-bg rounded-2xl p-10 text-center cursor-pointer">
                <div className="text-6xl mb-4">📊</div>
                <p style={{ color: "var(--neu-text-primary)" }}>פאנל גדול</p>
                <code
                  className="text-xs block mt-3"
                  style={{ color: "var(--neu-text-tertiary)" }}
                >
                  .neu-flat-raised-lg
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* 3. INSET - שקוע */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--neu-accent)" }}
            >
              3. Inset (שקוע) - אלמנט שקוע לתוך המשטח
            </h2>
            <p style={{ color: "var(--neu-text-tertiary)" }}>
              שימוש: שדות טקסט, אזורי תוכן, תיבות חיפוש
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Small */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                Small (sm)
              </h3>
              <div className="neu-inset-sm neu-bg rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">🔍</div>
                <p style={{ color: "var(--neu-text-primary)" }}>חיפוש קטן</p>
                <code
                  className="text-xs block mt-2"
                  style={{ color: "var(--neu-text-tertiary)" }}
                >
                  .neu-inset-sm
                </code>
              </div>
            </div>

            {/* Medium */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                Medium (md)
              </h3>
              <div className="neu-inset-md neu-bg rounded-2xl p-8 text-center">
                <div className="text-5xl mb-3">📝</div>
                <p style={{ color: "var(--neu-text-primary)" }}>שדה טקסט</p>
                <code
                  className="text-xs block mt-2"
                  style={{ color: "var(--neu-text-tertiary)" }}
                >
                  .neu-inset-md
                </code>
              </div>
            </div>

            {/* Large */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                Large (lg)
              </h3>
              <div className="neu-inset-lg neu-bg rounded-2xl p-10 text-center">
                <div className="text-6xl mb-4">📄</div>
                <p style={{ color: "var(--neu-text-primary)" }}>אזור תוכן</p>
                <code
                  className="text-xs block mt-3"
                  style={{ color: "var(--neu-text-tertiary)" }}
                >
                  .neu-inset-lg
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FLAT INSET - שקוע שטוח */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--neu-accent)" }}
            >
              4. Flat Inset (שקוע שטוח) - שקוע עדין יותר
            </h2>
            <p style={{ color: "var(--neu-text-tertiary)" }}>
              שימוש: רקעים עדינים, אזורי קבוצה, containers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Small */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                Small (sm)
              </h3>
              <div className="neu-flat-inset-sm neu-bg rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">🏷️</div>
                <p style={{ color: "var(--neu-text-primary)" }}>רקע עדין</p>
                <code
                  className="text-xs block mt-2"
                  style={{ color: "var(--neu-text-tertiary)" }}
                >
                  .neu-flat-inset-sm
                </code>
              </div>
            </div>

            {/* Medium */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                Medium (md)
              </h3>
              <div className="neu-flat-inset-md neu-bg rounded-2xl p-8 text-center">
                <div className="text-5xl mb-3">📦</div>
                <p style={{ color: "var(--neu-text-primary)" }}>קבוצת פריטים</p>
                <code
                  className="text-xs block mt-2"
                  style={{ color: "var(--neu-text-tertiary)" }}
                >
                  .neu-flat-inset-md
                </code>
              </div>
            </div>

            {/* Large */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                Large (lg)
              </h3>
              <div className="neu-flat-inset-lg neu-bg rounded-2xl p-10 text-center">
                <div className="text-6xl mb-4">🎁</div>
                <p style={{ color: "var(--neu-text-primary)" }}>
                  Container גדול
                </p>
                <code
                  className="text-xs block mt-3"
                  style={{ color: "var(--neu-text-tertiary)" }}
                >
                  .neu-flat-inset-lg
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* דוגמאות מיוחדות */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--neu-accent)" }}
            >
              דוגמאות שימוש מיוחדות
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* כפתור זהב */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                כפתור זהב (CTA)
              </h3>
              <button className="neu-raised-md neu-button-gold rounded-3xl px-12 py-4 w-full text-lg font-semibold cursor-pointer">
                מחשבון קוד העושר
              </button>
              <code
                className="text-xs block"
                style={{ color: "var(--neu-text-tertiary)" }}
              >
                .neu-raised-md .neu-button-gold
              </code>
            </div>

            {/* איקון עגול */}
            <div className="space-y-4">
              <h3
                className="font-semibold"
                style={{ color: "var(--neu-text-secondary)" }}
              >
                איקון עגול
              </h3>
              <div className="flex justify-center">
                <div
                  className="neu-raised-lg neu-bg neu-icon-circle cursor-pointer"
                  style={{ width: "120px", height: "120px" }}
                >
                  <span className="text-6xl">🧮</span>
                </div>
              </div>
              <code
                className="text-xs block text-center"
                style={{ color: "var(--neu-text-tertiary)" }}
              >
                .neu-raised-lg .neu-icon-circle
              </code>
            </div>
          </div>
        </section>

        {/* איקונים חברתיים */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--neu-accent)" }}
            >
              איקוני רשתות חברתיות
            </h2>
          </div>

          <div className="flex justify-center gap-6">
            {[
              { icon: "📷", name: "Instagram" },
              { icon: "🎵", name: "TikTok" },
              { icon: "📧", name: "Email" },
              { icon: "💬", name: "WhatsApp" },
            ].map((social) => (
              <div key={social.name} className="space-y-2 text-center">
                <div
                  className="neu-raised-sm neu-bg neu-icon-circle cursor-pointer hover:scale-110 transition-transform"
                  style={{ width: "64px", height: "64px" }}
                >
                  <span className="text-3xl">{social.icon}</span>
                </div>
                <p
                  className="text-xs"
                  style={{ color: "var(--neu-text-tertiary)" }}
                >
                  {social.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* הנחיות שימוש */}
        <section className="neu-flat-inset-md neu-bg rounded-3xl p-8 space-y-4">
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--neu-accent)" }}
          >
            💡 הנחיות שימוש
          </h2>
          <ul
            className="space-y-3 text-right"
            style={{ color: "var(--neu-text-primary)" }}
          >
            <li>
              <strong>Raised</strong> - לאלמנטים אינטראקטיביים שצריכים לבלוט
              (כפתורים, כרטיסים)
            </li>
            <li>
              <strong>Flat Raised</strong> - לאלמנטים משניים שצריכים נוכחות
              עדינה יותר
            </li>
            <li>
              <strong>Inset</strong> - לשדות קלט ואזורים שצריכים להרגיש שקועים
            </li>
            <li>
              <strong>Flat Inset</strong> - לרקעים ו-containers עדינים
            </li>
            <li>
              השתמש ב-<code>sm</code> לאלמנטים קטנים, <code>md</code> לרגילים,{" "}
              <code>lg</code> לבולטים
            </li>
            <li>
              כל ההצללות משתמשות בצבעים הקיימים מ-
              <code>--neu-shadow-light</code> ו-<code>--neu-shadow-dark</code>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
