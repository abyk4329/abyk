import { Mail, Download, Heart, Settings, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/neu";
import styles from "./buttons.module.css";

export default function ButtonsShowcasePage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Buttons - כפתורים</h1>
          <p className={styles.subtitle}>
            מערכת כפתורים Neumorphic עם אפקטים אינטראקטיביים
          </p>
        </header>

        {/* Variants Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>סוגי כפתורים (Variants)</h2>

          <div className={styles.variantsGrid}>
            {/* Primary */}
            <div className={styles.variantCard}>
              <h3 className={styles.variantTitle}>Primary - כפתור ראשי</h3>
              <p className={styles.variantDesc}>
                כפתור ראשי עם הצללה בולטת. משמש לפעולות עיקריות בממשק.
              </p>
              <div className={styles.demoArea}>
                <Button variant="primary">כפתור ראשי</Button>
              </div>
              <code className={styles.code}>
                {`<Button variant="primary">כפתור ראשי</Button>`}
              </code>
            </div>

            {/* Secondary */}
            <div className={styles.variantCard}>
              <h3 className={styles.variantTitle}>Secondary - כפתור משני</h3>
              <p className={styles.variantDesc}>
                כפתור משני עדין יותר. משמש לפעולות משניות או ביטול.
              </p>
              <div className={styles.demoArea}>
                <Button variant="secondary">כפתור משני</Button>
              </div>
              <code className={styles.code}>
                {`<Button variant="secondary">כפתור משני</Button>`}
              </code>
            </div>

            {/* Gold (CTA) */}
            <div className={styles.variantCard}>
              <h3 className={styles.variantTitle}>Gold - קריאה לפעולה</h3>
              <p className={styles.variantDesc}>
                כפתור זהב עם gradient. משמש לקריאות לפעולה (CTA) חשובות.
              </p>
              <div className={styles.demoArea}>
                <Button variant="gold">מחשבון קוד העושר</Button>
              </div>
              <code className={styles.code}>
                {`<Button variant="gold">מחשבון קוד העושר</Button>`}
              </code>
            </div>
          </div>
        </section>

        {/* Sizes Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>גדלים (Sizes)</h2>

          <div className={styles.sizesGrid}>
            {/* Small */}
            <div className={styles.sizeDemo}>
              <h3 className={styles.sizeTitle}>Small (sm)</h3>
              <Button size="sm">כפתור קטן</Button>
              <code className={styles.sizeCode}>size=&quot;sm&quot;</code>
            </div>

            {/* Medium */}
            <div className={styles.sizeDemo}>
              <h3 className={styles.sizeTitle}>Medium (md) - Default</h3>
              <Button size="md">כפתור בינוני</Button>
              <code className={styles.sizeCode}>size=&quot;md&quot;</code>
            </div>

            {/* Large */}
            <div className={styles.sizeDemo}>
              <h3 className={styles.sizeTitle}>Large (lg)</h3>
              <Button size="lg">כפתור גדול</Button>
              <code className={styles.sizeCode}>size=&quot;lg&quot;</code>
            </div>
          </div>
        </section>

        {/* With Icons Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>כפתורים עם איקונים</h2>

          <div className={styles.iconsGrid}>
            <Button variant="primary" icon={<Mail />}>
              שלח מייל
            </Button>

            <Button variant="secondary" icon={<Download />}>
              הורדה
            </Button>

            <Button variant="gold" icon={<Heart />}>
              אהבתי
            </Button>

            <Button variant="primary" size="sm" icon={<Settings />}>
              הגדרות
            </Button>

            <Button variant="secondary" size="lg" icon={<Plus />}>
              הוסף חדש
            </Button>
          </div>

          <div className={styles.codeBlock}>
            <code className={styles.blockCode}>
              {`<Button variant="primary" icon={<Mail />}>
  שלח מייל
</Button>

<Button variant="gold" icon={<Heart />}>
  אהבתי
</Button>`}
            </code>
          </div>
        </section>

        {/* States Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>מצבים (States)</h2>

          <div className={styles.statesGrid}>
            {/* Normal */}
            <div className={styles.stateDemo}>
              <h3 className={styles.stateTitle}>רגיל (Normal)</h3>
              <Button variant="primary">לחץ כאן</Button>
            </div>

            {/* Hover */}
            <div className={styles.stateDemo}>
              <h3 className={styles.stateTitle}>Hover - העבר עכבר</h3>
              <p className={styles.stateDesc}>scale(1.02)</p>
            </div>

            {/* Pressed */}
            <div className={styles.stateDemo}>
              <h3 className={styles.stateTitle}>Pressed - לחוץ</h3>
              <p className={styles.stateDesc}>scale(0.98) + shadow inset</p>
            </div>

            {/* Disabled */}
            <div className={styles.stateDemo}>
              <h3 className={styles.stateTitle}>מבוטל (Disabled)</h3>
              <Button variant="primary" disabled>
                כפתור מבוטל
              </Button>
            </div>
          </div>
        </section>

        {/* Full Width Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>רוחב מלא (Full Width)</h2>

          <div className={styles.fullWidthDemo}>
            <Button variant="primary" fullWidth>
              כפתור ראשי - רוחב מלא
            </Button>

            <Button variant="gold" fullWidth icon={<Mail />}>
              כפתור זהב - רוחב מלא עם איקון
            </Button>

            <Button variant="secondary" fullWidth>
              כפתור משני - רוחב מלא
            </Button>
          </div>

          <code className={styles.code}>
            {`<Button variant="primary" fullWidth>כפתור רוחב מלא</Button>`}
          </code>
        </section>

        {/* All Combinations */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>כל הצירופים</h2>

          <div className={styles.allGrid}>
            {/* Primary - All Sizes */}
            <div className={styles.comboGroup}>
              <h3 className={styles.comboTitle}>Primary</h3>
              <div className={styles.comboButtons}>
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Medium
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
              </div>
            </div>

            {/* Secondary - All Sizes */}
            <div className={styles.comboGroup}>
              <h3 className={styles.comboTitle}>Secondary</h3>
              <div className={styles.comboButtons}>
                <Button variant="secondary" size="sm">
                  Small
                </Button>
                <Button variant="secondary" size="md">
                  Medium
                </Button>
                <Button variant="secondary" size="lg">
                  Large
                </Button>
              </div>
            </div>

            {/* Gold - All Sizes */}
            <div className={styles.comboGroup}>
              <h3 className={styles.comboTitle}>Gold</h3>
              <div className={styles.comboButtons}>
                <Button variant="gold" size="sm">
                  Small
                </Button>
                <Button variant="gold" size="md">
                  Medium
                </Button>
                <Button variant="gold" size="lg">
                  Large
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Actions Example */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>דוגמאות שימוש</h2>

          <div className={styles.examplesGrid}>
            {/* Form Buttons */}
            <div className={styles.exampleCard}>
              <h3 className={styles.exampleTitle}>כפתורי טופס</h3>
              <div className={styles.exampleButtons}>
                <Button variant="gold">שלח</Button>
                <Button variant="secondary">ביטול</Button>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.exampleCard}>
              <h3 className={styles.exampleTitle}>פעולות</h3>
              <div className={styles.exampleButtons}>
                <Button variant="primary" icon={<Download />}>
                  הורדה
                </Button>
                <Button variant="secondary" icon={<Trash2 />}>
                  מחיקה
                </Button>
              </div>
            </div>

            {/* CTAs */}
            <div className={styles.exampleCard}>
              <h3 className={styles.exampleTitle}>קריאות לפעולה</h3>
              <div className={styles.exampleButtons}>
                <Button variant="gold" size="lg">
                  התחל עכשיו
                </Button>
                <Button variant="secondary" size="lg">
                  למד עוד
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Code Reference */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>מדריך שימוש מהיר</h2>

          <div className={styles.referenceBox}>
            <h3 className={styles.referenceTitle}>Props זמינים</h3>
            <ul className={styles.referenceList}>
              <li>
                <code>variant</code>: &quot;primary&quot; |
                &quot;secondary&quot; | &quot;gold&quot;
              </li>
              <li>
                <code>size</code>: &quot;sm&quot; | &quot;md&quot; |
                &quot;lg&quot;
              </li>
              <li>
                <code>icon</code>: ReactNode (אופציונלי)
              </li>
              <li>
                <code>fullWidth</code>: boolean
              </li>
              <li>
                <code>disabled</code>: boolean
              </li>
              <li>
                <code>onClick</code>: (event) =&gt; void
              </li>
              <li>
                <code>type</code>: &quot;button&quot; | &quot;submit&quot; |
                &quot;reset&quot;
              </li>
            </ul>
          </div>
        </section>

        {/* Back Link */}
        <div className={styles.backLink}>
          <Link href="/">
            <Button variant="gold" size="lg">
              חזרה לדף הבית
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
