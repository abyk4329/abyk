import type { Metadata } from 'next';

import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'התחברות | Awakening by Ksenia',
  description: 'התחברות או יצירת חשבון כדי לשמור את התקדמות המסע האישי שלך.',
};

export default function LoginPage() {
  return (
    <main className="loginPage">
      <section className="loginCard">
        <header className="loginHeader">
          <h1 className="loginTitle">ברוכה הבאה</h1>
          <p className="loginSubtitle">
            התחברי או צרי חשבון חדש כדי לשמור פירושים, רכישות ותוצרים מותאמים
            אישית.
          </p>
        </header>
        <LoginForm />
      </section>
    </main>
  );
}
