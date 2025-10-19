import Link from "next/link";
import styles from "./design-system.module.css";

export default function DesignSystemPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>Design System - מערכת עיצוב</h1>
        <p className={styles.subtitle}>Neumorphic Design System לפרויקט ABYK</p>
      </header>

      <div className={styles.container}>
        {/* Border Radius */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>גדלי עיגולים</h2>

          <div className={styles.radiusGrid}>
            <div className={styles.radiusItem}>
              <div className="neu-raised-md neu-bg rounded-lg p-8 flex items-center justify-center">
                <span className={styles.label}>8px</span>
              </div>
              <div className={styles.radiusLabel}>
                <span className={styles.radiusName}>Small</span>
                <code className={styles.code}>rounded-lg</code>
              </div>
            </div>

            <div className={styles.radiusItem}>
              <div className="neu-raised-md neu-bg rounded-xl p-8 flex items-center justify-center">
                <span className={styles.label}>12px</span>
              </div>
              <div className={styles.radiusLabel}>
                <span className={styles.radiusName}>Medium</span>
                <code className={styles.code}>rounded-xl</code>
              </div>
            </div>

            <div className={styles.radiusItem}>
              <div className="neu-raised-md neu-bg rounded-2xl p-8 flex items-center justify-center">
                <span className={styles.label}>16px</span>
              </div>
              <div className={styles.radiusLabel}>
                <span className={styles.radiusName}>Large</span>
                <code className={styles.code}>rounded-2xl</code>
              </div>
            </div>

            <div className={styles.radiusItem}>
              <div className="neu-raised-md neu-bg rounded-3xl p-8 flex items-center justify-center">
                <span className={styles.label}>24px</span>
              </div>
              <div className={styles.radiusLabel}>
                <span className={styles.radiusName}>Extra Large</span>
                <code className={styles.code}>rounded-3xl</code>
              </div>
            </div>
          </div>

          <div className={styles.usageBox}>
            <h3 className={styles.usageTitle}>מדריך שימוש</h3>
            <ul className={styles.usageList}>
              <li>
                <strong>rounded-lg (8px)</strong> - לכפתורים קטנים, תגיות,
                אינפוטים קטנים
              </li>
              <li>
                <strong>rounded-xl (12px)</strong> - לכפתורים רגילים, כרטיסים
                קטנים, שדות קלט
              </li>
              <li>
                <strong>rounded-2xl (16px)</strong> - לכרטיסים בינוניים,
                קונטיינרים
              </li>
              <li>
                <strong>rounded-3xl (24px)</strong> - לאלמנטים מרכזיים, אלמנטים
                מודגשים
              </li>
            </ul>
          </div>
        </section>

        {/* Shadow Types */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>סוגי הצללות</h2>

          <div className={styles.shadowsGrid}>
            {/* Raised (Extruded) */}
            <div className={styles.shadowCard}>
              <h3 className={styles.shadowTitle}>Raised (בולט)</h3>
              <p className={styles.shadowDesc}>אלמנט בולט מעל פני השטח</p>

              <div className="neu-bg rounded-2xl p-8 flex items-center justify-center shadow-[5px_5px_10px_var(--neu-shadow-dark),-5px_-5px_10px_var(--neu-shadow-light)]">
                <span className={styles.demoText}>דוגמה</span>
              </div>

              <code className={styles.shadowCode}>
                shadow-[5px_5px_10px_var(--neu-shadow-dark),-5px_-5px_10px_var(--neu-shadow-light)]
              </code>
            </div>

            {/* Inset (Pressed) */}
            <div className={styles.shadowCard}>
              <h3 className={styles.shadowTitle}>Inset (שקוע)</h3>
              <p className={styles.shadowDesc}>אלמנט שקוע פנימה</p>

              <div className="neu-bg rounded-2xl p-8 flex items-center justify-center shadow-[inset_5px_5px_10px_var(--neu-shadow-dark),inset_-5px_-5px_10px_var(--neu-shadow-light)]">
                <span className={styles.demoText}>דוגמה</span>
              </div>

              <code className={styles.shadowCode}>
                shadow-[inset_5px_5px_10px_var(--neu-shadow-dark),inset_-5px_-5px_10px_var(--neu-shadow-light)]
              </code>
            </div>

            {/* Flat (Subtle) */}
            <div className={styles.shadowCard}>
              <h3 className={styles.shadowTitle}>Flat (שטוח)</h3>
              <p className={styles.shadowDesc}>אלמנט כמעט שטוח</p>

              <div className="neu-bg rounded-2xl p-8 flex items-center justify-center shadow-[2px_2px_4px_var(--neu-shadow-dark),-2px_-2px_4px_var(--neu-shadow-light)]">
                <span className={styles.demoText}>דוגמה</span>
              </div>

              <code className={styles.shadowCode}>
                shadow-[2px_2px_4px_var(--neu-shadow-dark),-2px_-2px_4px_var(--neu-shadow-light)]
              </code>
            </div>

            {/* Pressed (Deep Inset) */}
            <div className={styles.shadowCard}>
              <h3 className={styles.shadowTitle}>Pressed (לחוץ)</h3>
              <p className={styles.shadowDesc}>שקוע קל - אפקט לחיצה</p>

              <div className="neu-bg rounded-2xl p-8 flex items-center justify-center shadow-[inset_3px_3px_6px_var(--neu-shadow-dark),inset_-3px_-3px_6px_var(--neu-shadow-light)]">
                <span className={styles.demoText}>דוגמה</span>
              </div>

              <code className={styles.shadowCode}>
                shadow-[inset_3px_3px_6px_var(--neu-shadow-dark),inset_-3px_-3px_6px_var(--neu-shadow-light)]
              </code>
            </div>
          </div>
        </section>

        {/* Shadow Sizes */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>גדלי הצללות</h2>

          <div className={styles.sizesGrid}>
            <div className={styles.sizeCard}>
              <h3 className={styles.sizeTitle}>Small</h3>
              <div className="neu-bg rounded-2xl p-6 flex items-center justify-center shadow-[3px_3px_6px_var(--neu-shadow-dark),-3px_-3px_6px_var(--neu-shadow-light)]">
                <span className={styles.sizeLabel}>קטן</span>
              </div>
              <code className={styles.sizeCode}>3px_3px_6px</code>
            </div>

            <div className={styles.sizeCard}>
              <h3 className={styles.sizeTitle}>Medium</h3>
              <div className="neu-bg rounded-2xl p-6 flex items-center justify-center shadow-[5px_5px_10px_var(--neu-shadow-dark),-5px_-5px_10px_var(--neu-shadow-light)]">
                <span className={styles.sizeLabel}>בינוני</span>
              </div>
              <code className={styles.sizeCode}>5px_5px_10px</code>
            </div>

            <div className={styles.sizeCard}>
              <h3 className={styles.sizeTitle}>Large</h3>
              <div className="neu-bg rounded-2xl p-6 flex items-center justify-center shadow-[8px_8px_16px_var(--neu-shadow-dark),-8px_-8px_16px_var(--neu-shadow-light)]">
                <span className={styles.sizeLabel}>גדול</span>
              </div>
              <code className={styles.sizeCode}>8px_8px_16px</code>
            </div>
          </div>
        </section>

        {/* Font Weights */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>משקלי גופן</h2>

          <div className={styles.weightsGrid}>
            <div className="neu-flat-raised-md neu-bg rounded-2xl p-6">
              <div className={styles.weightNumber}>200</div>
              <div className="font-extralight text-xl mb-2">Extra Light</div>
              <p className={styles.weightDesc}>טקסט קטן מאוד, רימוס עדינים</p>
            </div>

            <div className="neu-flat-raised-md neu-bg rounded-2xl p-6">
              <div className={styles.weightNumber}>300</div>
              <div className="font-light text-xl mb-2">Light</div>
              <p className={styles.weightDesc}>טקסט משני, תיאורים</p>
            </div>

            <div className="neu-flat-raised-md neu-bg rounded-2xl p-6">
              <div className={styles.weightNumber}>400</div>
              <div className="font-normal text-xl mb-2">Regular</div>
              <p className={styles.weightDesc}>טקסט רגיל, פסקאות</p>
            </div>

            <div className="neu-flat-raised-md neu-bg rounded-2xl p-6">
              <div className={styles.weightNumber}>500</div>
              <div className="font-medium text-xl mb-2">Medium</div>
              <p className={styles.weightDesc}>כפתורים, תוויות</p>
            </div>

            <div className="neu-flat-raised-md neu-bg rounded-2xl p-6">
              <div className={styles.weightNumber}>600</div>
              <div className="font-semibold text-xl mb-2">Semi Bold</div>
              <p className={styles.weightDesc}>כותרות משנה, דגשים</p>
            </div>

            <div className="neu-flat-raised-md neu-bg rounded-2xl p-6">
              <div className={styles.weightNumber}>700</div>
              <div className="font-bold text-xl mb-2">Bold</div>
              <p className={styles.weightDesc}>כותרות, אלמנטים מודגשים</p>
            </div>

            <div className="neu-flat-raised-md neu-bg rounded-2xl p-6">
              <div className={styles.weightNumber}>800</div>
              <div className="font-extrabold text-xl mb-2">Extra Bold</div>
              <p className={styles.weightDesc}>כותרות ראשיות, מספרים גדולים</p>
            </div>
          </div>
        </section>

        {/* Typography Scale */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>גדלי טקסט (Responsive)</h2>

          <div className={styles.typoGrid}>
            <div className="neu-flat-raised-md neu-bg rounded-2xl p-6">
              <h1 className="mb-4">כותרת ראשית H1</h1>
              <code className={styles.typoCode}>
                clamp(2rem, 6vw, 3rem) • 32-48px
              </code>
            </div>

            <div className="neu-flat-raised-md neu-bg rounded-2xl p-6">
              <h2 className="mb-4">כותרת משנה H2</h2>
              <code className={styles.typoCode}>
                clamp(1.5rem, 5vw, 2rem) • 24-32px
              </code>
            </div>

            <div className="neu-flat-raised-md neu-bg rounded-2xl p-6">
              <h3 className="mb-4">כותרת שלישונית H3</h3>
              <code className={styles.typoCode}>
                clamp(1.125rem, 4vw, 1.5rem) • 18-24px
              </code>
            </div>

            <div className="neu-flat-raised-md neu-bg rounded-2xl p-6">
              <p className="mb-4">טקסט רגיל - זהו טקסט לדוגמה במשקל Regular</p>
              <code className={styles.typoCode}>
                clamp(0.875rem, 2.5vw, 1rem) • 14-16px
              </code>
            </div>

            <div className="neu-flat-raised-md neu-bg rounded-2xl p-6">
              <p className="text-sm mb-4">טקסט קטן - לעדכד משני ורימוס</p>
              <code className={styles.typoCode}>
                clamp(0.75rem, 2vw, 0.8125rem) • 12-13px
              </code>
            </div>
          </div>
        </section>

        {/* Spacing Scale */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>מקלת ריווחים (Spacing Scale)</h2>

          <div className={styles.spacingList}>
            <div className={styles.spacingItem}>
              <div className={`${styles.spacingBar} ${styles.spacingBar8}`} />
              <div className={styles.spacingInfo}>
                <span className={styles.spacingName}>0.5 (8px)</span>
                <span className={styles.spacingDesc}>
                  ריווח זעיר בין אלמנטים צמודים
                </span>
              </div>
            </div>

            <div className={styles.spacingItem}>
              <div className={`${styles.spacingBar} ${styles.spacingBar12}`} />
              <div className={styles.spacingInfo}>
                <span className={styles.spacingName}>1 (12px)</span>
                <span className={styles.spacingDesc}>
                  ריווח קטן בין אלמנטים קרובים
                </span>
              </div>
            </div>

            <div className={styles.spacingItem}>
              <div className={`${styles.spacingBar} ${styles.spacingBar16}`} />
              <div className={styles.spacingInfo}>
                <span className={styles.spacingName}>2 (16px)</span>
                <span className={styles.spacingDesc}>
                  ריווח בסיסי, היכי (נפוץ)
                </span>
              </div>
            </div>

            <div className={styles.spacingItem}>
              <div className={`${styles.spacingBar} ${styles.spacingBar24}`} />
              <div className={styles.spacingInfo}>
                <span className={styles.spacingName}>3 (24px)</span>
                <span className={styles.spacingDesc}>
                  ריווח בינוני בין סעקשנים
                </span>
              </div>
            </div>

            <div className={styles.spacingItem}>
              <div className={`${styles.spacingBar} ${styles.spacingBar32}`} />
              <div className={styles.spacingInfo}>
                <span className={styles.spacingName}>4 (32px)</span>
                <span className={styles.spacingDesc}>
                  ריווח גדול בין סעקשנים
                </span>
              </div>
            </div>

            <div className={styles.spacingItem}>
              <div className={`${styles.spacingBar} ${styles.spacingBar48}`} />
              <div className={styles.spacingInfo}>
                <span className={styles.spacingName}>6 (48px)</span>
                <span className={styles.spacingDesc}>ריווח גדול מאוד</span>
              </div>
            </div>

            <div className={styles.spacingItem}>
              <div className={`${styles.spacingBar} ${styles.spacingBar64}`} />
              <div className={styles.spacingInfo}>
                <span className={styles.spacingName}>8 (64px)</span>
                <span className={styles.spacingDesc}>ריווח ענק בין אזורים</span>
              </div>
            </div>
          </div>
        </section>

        {/* Padding Sizes */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>ריווח פנימי - Padding</h2>

          <div className={styles.paddingGrid}>
            <div className={styles.paddingCard}>
              <div className="neu-raised-md neu-bg rounded-2xl p-4">
                <div className={styles.paddingInner}>16px</div>
              </div>
              <div className={styles.paddingLabel}>
                <span className={styles.paddingName}>Small (sm)</span>
                <code className={styles.code}>כפתורים קטנים, תוויות</code>
              </div>
            </div>

            <div className={styles.paddingCard}>
              <div className="neu-raised-md neu-bg rounded-2xl p-6">
                <div className={styles.paddingInner}>24px</div>
              </div>
              <div className={styles.paddingLabel}>
                <span className={styles.paddingName}>Medium (md)</span>
                <code className={styles.code}>כרטיסים רגילים, שדות קלט</code>
              </div>
            </div>

            <div className={styles.paddingCard}>
              <div className="neu-raised-md neu-bg rounded-2xl p-8">
                <div className={styles.paddingInner}>32px</div>
              </div>
              <div className={styles.paddingLabel}>
                <span className={styles.paddingName}>Large (lg)</span>
                <code className={styles.code}>כרטיסים גדולים, סעקשנים</code>
              </div>
            </div>

            <div className={styles.paddingCard}>
              <div className="neu-raised-md neu-bg rounded-2xl p-12">
                <div className={styles.paddingInner}>48px</div>
              </div>
              <div className={styles.paddingLabel}>
                <span className={styles.paddingName}>Extra Large (xl)</span>
                <code className={styles.code}>כרטיסים מרכזיים, הירואים</code>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <div className={styles.backLink}>
          <Link
            href="/"
            className="neu-raised-md neu-button-gold rounded-2xl px-8 py-4 inline-block"
          >
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    </div>
  );
}
