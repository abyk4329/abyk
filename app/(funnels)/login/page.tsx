import type { Metadata } from "next";

import styles from "./LoginPage.module.css";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "התחברות | Awakening by Ksenia",
  description: "התחברות או יצירת חשבון כדי לשמור את התקדמות המסע האישי שלך.",
};

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>ברוכה הבאה</h1>
          <p className={styles.subtitle}>
            התחברי או צרי חשבון חדש כדי לשמור פירושים, רכישות ותוצרים מותאמים
            אישית.
          </p>
        </header>
        <LoginForm />
      </section>
    </main>
  );
}
