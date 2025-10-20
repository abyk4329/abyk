import type { Metadata } from 'next';

import { LoginForm } from './LoginForm';
import styles from './LoginPage.module.css';

export const metadata: Metadata = {
  title: 'התחברות | Awakening by Ksenia',
  description: 'התחברות או יצירת חשבון כדי לשמור את התקדמות המסע האישי שלך.',
};

export default function LoginPage() {
  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <header className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>ברוכה הבאה</h1>
          <p className={styles.loginSubtitle}>
            התחברי או צרי חשבון חדש כדי לשמור פירושים, רכישות ותוצרים מותאמים
            אישית.
          </p>
        </header>
        <LoginForm />
      </section>
    </main>
  );
}
