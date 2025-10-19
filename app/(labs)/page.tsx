import Link from "next/link";
import styles from "./labs.module.css";

export default function LabsIndexPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>🧪 Labs - מעבדות עיצוב</h1>

        <div className={styles.grid}>
          <Link href="/design-system" className={styles.card}>
            <h2 className={styles.cardTitle}>🎨 Design System</h2>
            <p className={styles.cardDesc}>
              מערכת עיצוב מלאה: הצללות, צבעים, טיפוגרפיה, ריווחים ועוד
            </p>
            <div className={styles.tags}>
              <span className={styles.tag}>Shadows</span>
              <span className={styles.tag}>Typography</span>
              <span className={styles.tag}>Spacing</span>
            </div>
          </Link>

          <Link
            href="/"
            className="neu-raised-md neu-button-gold rounded-2xl px-8 py-4 text-center block text-lg font-semibold"
          >
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    </div>
  );
}
