import { useState } from 'react';
import ThemeToggle from '../ThemeToggle';
import {
  NeuAlert,
  NeuBadge,
  NeuButton,
  NeuCard,
  NeuInput,
  NeuProgress,
  NeuTabs,
  NeuTextarea,
} from './index';

export default function UIShowcase() {
  const [toggleState, setToggleState] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">
          ספריית קומפוננטים ניאומורפיים
        </h1>
        <p className="text-text/70">כל הקומפוננטים שלנו במקום אחד</p>
      </div>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-bold mb-4">כפתורים</h2>
        <NeuCard>
          <div className="flex flex-wrap gap-4">
            <NeuButton variant="primary">כפתור ראשי</NeuButton>
            <NeuButton variant="secondary">כפתור משני</NeuButton>
            <NeuButton variant="accent">כפתור מודגש</NeuButton>
            <NeuButton disabled>כפתור לא פעיל</NeuButton>
          </div>
        </NeuCard>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="text-2xl font-bold mb-4">שדות קלט</h2>
        <NeuCard>
          <div className="space-y-6">
            <NeuInput label="שם מלא" type="text" required />
            <NeuInput label="אימייל" type="email" required />
            <NeuInput label="סיסמה" type="password" required />
            <NeuTextarea label="הודעה" required />
          </div>
        </NeuCard>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-2xl font-bold mb-4">תגיות</h2>
        <NeuCard>
          <div className="flex flex-wrap gap-3">
            <NeuBadge variant="default">ברירת מחדל</NeuBadge>
            <NeuBadge variant="accent">מודגש</NeuBadge>
            <NeuBadge variant="success">הצלחה</NeuBadge>
            <NeuBadge variant="warning">אזהרה</NeuBadge>
          </div>
        </NeuCard>
      </section>

      {/* Toggle */}
      <section>
        <h2 className="text-2xl font-bold mb-4">מתגים</h2>
        <NeuCard>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">מתג רגיל</h3>
              <button
                type="button"
                onClick={() => setToggleState((prev) => !prev)}
                className={`relative inline-flex h-11 w-24 items-center overflow-hidden rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                  toggleState
                    ? 'border-transparent bg-accent/90 shadow-[0_14px_32px_rgba(0,0,0,0.25)]'
                    : 'border-text/15 bg-surface/90 shadow-[0_8px_18px_rgba(0,0,0,0.12)]'
                }`}
              >
                <span className="sr-only">הפעל התראות</span>
                <span
                  aria-hidden="true"
                  className={`absolute top-1 left-1 h-9 w-9 rounded-full bg-white shadow-[0_6px_12px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out ${
                    toggleState
                      ? 'translate-x-12 bg-accent/95'
                      : 'translate-x-0'
                  }`}
                ></span>
                <span
                  className={`ml-auto pr-4 text-sm font-semibold transition-colors ${
                    toggleState ? 'text-white' : 'text-text/70'
                  }`}
                >
                  {toggleState ? 'מופעל' : 'כבוי'}
                </span>
              </button>
              <p className="text-sm text-text/70">
                המתג כרגע: {toggleState ? 'מופעל ✓' : 'כבוי ✗'}
              </p>
            </div>
            <div className="border-t border-text/10 pt-6">
              <h3 className="font-semibold mb-4">מתג מצב כהה</h3>
              <div className="flex flex-col items-center gap-3">
                <ThemeToggle />
                <p className="text-sm text-text/70 text-center max-w-xs">
                  שינוי המצב משפיע על האתר כולו ושומר את הבחירה האחרונה של
                  המשתמשים.
                </p>
              </div>
            </div>
          </div>
        </NeuCard>
      </section>

      {/* Progress */}
      <section>
        <h2 className="text-2xl font-bold mb-4">פס התקדמות</h2>
        <NeuCard>
          <div className="space-y-6">
            <NeuProgress value={25} label="התקדמות נמוכה" />
            <NeuProgress value={50} label="חצי דרך" />
            <NeuProgress value={75} label="כמעט שם" />
            <NeuProgress value={100} label="הושלם!" />
          </div>
        </NeuCard>
      </section>

      {/* Alerts */}
      <section>
        <h2 className="text-2xl font-bold mb-4">התראות</h2>
        <div className="space-y-4">
          <NeuAlert type="info" onClose={() => setShowAlert(false)}>
            זוהי התראת מידע. לחצי על ה-X כדי לסגור.
          </NeuAlert>
          <NeuAlert type="success">הפעולה בוצעה בהצלחה! 🎉</NeuAlert>
          <NeuAlert type="warning">שימי לב: זוהי הודעת אזהרה</NeuAlert>
          <NeuAlert type="error">אירעה שגיאה. אנא נסי שוב.</NeuAlert>
        </div>
      </section>

      {/* Tabs */}
      <section>
        <h2 className="text-2xl font-bold mb-4">טאבים</h2>
        <NeuTabs
          tabs={[
            {
              label: 'מידע כללי',
              content: (
                <div>
                  <h3 className="font-bold mb-2">מידע כללי</h3>
                  <p className="text-text/70">
                    זהו תוכן הטאב הראשון עם מידע כללי על המערכת.
                  </p>
                </div>
              ),
            },
            {
              label: 'הגדרות',
              content: (
                <div>
                  <h3 className="font-bold mb-2">הגדרות</h3>
                  <div className="space-y-4">
                    <ThemeToggle />
                    <button
                      type="button"
                      className="relative inline-flex h-11 w-24 items-center overflow-hidden rounded-full border border-text/15 bg-surface/90 shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    >
                      <span className="sr-only">קבל עדכונים באימייל</span>
                      <span
                        aria-hidden="true"
                        className="absolute top-1 left-1 h-9 w-9 rounded-full bg-accent/95 shadow-[0_6px_12px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out translate-x-12"
                      />
                      <span className="ml-auto pr-4 text-sm font-semibold text-white">
                        מופעל
                      </span>
                    </button>
                  </div>
                </div>
              ),
            },
            {
              label: 'אודות',
              content: (
                <div>
                  <h3 className="font-bold mb-2">אודות</h3>
                  <p className="text-text/70">
                    ספריית קומפוננטים ניאומורפיים בעברית לפרויקט Astro + React
                  </p>
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-2xl font-bold mb-4">כרטיסיות</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <NeuCard>
            <h3 className="font-bold text-lg mb-2">כרטיסייה רגילה</h3>
            <p className="text-text/70 text-sm">כרטיסייה עם אפקט hover</p>
          </NeuCard>
          <NeuCard hover={false}>
            <h3 className="font-bold text-lg mb-2">כרטיסייה סטטית</h3>
            <p className="text-text/70 text-sm">כרטיסייה ללא אפקט hover</p>
          </NeuCard>
          <NeuCard variant="styled" width="190px" height="254px" />
        </div>
      </section>
    </div>
  );
}
