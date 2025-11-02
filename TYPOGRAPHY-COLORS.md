# מדריך טיפוגרפיה - Awakening by Ksenia

> **מקור אמת יחיד לסגנונות טיפוגרפיים**

תאריך עדכון: 31 אוקטובר 2025

---

## 🧱 יסודות טיפוגרפיה

- פונטים: `Assistant`, עם גיבוי מערכת (`-apple-system`, `BlinkMacSystemFont`, `sans-serif`).
- יישור: כל המחלקות הטיפוגרפיות מיושרות למרכז (`text-align: center`).
- משקל בסיסי: פסקאות (`BodyText`) ב-`font-weight: 500`; כפתורים ב-`font-weight: 600`; כותרות ב-`font-weight: 700`.
- כל הצבעים נמשכים מהטוקנים הגלובליים שמוגדרים ב-`doc/COLORS.md` וב-`src/styles/tokens.css`.

---

## 🗂️ טבלת סגנונות רשמית

| מחלקה (Class)         | גודל טיפוסי                                          | משקל | Line-height | צבע ברירת מחדל                             | שימוש והערות                                           |
| --------------------- | ---------------------------------------------------- | ---- | ----------- | ------------------------------------------ | ------------------------------------------------------ |
| `Title`               | `clamp(1.625rem, 1.5rem + 0.625vw, 2rem)` (≈26–32px) | 700  | 0.95        | `rgb(var(--color-heading))`                | כותרת ראשית.                                           |
| `PageTitle`           | כמו `Title`                                          | 700  | 0.95        | `rgb(var(--color-heading))`                | Alias ל-Title בעמודים רגילים.                          |
| `SectionTitle`        | כמו `Title`                                          | 700  | 0.95        | `rgb(var(--color-heading))`                | כותרת מקטע פנימי.                                      |
| `CardTitle`           | כמו `Title`                                          | 700  | 0.95        | `rgb(var(--color-heading))`                | כותרת כרטיס.                                           |
| `LongTitle`           | כמו `Title`                                          | 700  | 0.95        | `rgb(var(--color-heading))`                | לטקסט ארוך במיוחד.                                     |
| `CardTitleLong`       | כמו `Title`                                          | 700  | 0.95        | `rgb(var(--color-heading))`                | Alias לכרטיסים עם שורות ארוכות.                        |
| `Subtitle`            | `var(--text-lg-xl)` (≈20–24px)                       | 700  | 1.2         | `rgb(var(--color-subheading))`             | תת-כותרת ראשית.                                        |
| `PageTitleCompact`    | כמו `Subtitle`                                       | 700  | 1.2         | `rgb(var(--color-subheading))`             | Alias לכותרות קומפקטיות.                               |
| `CardSubtitle`        | כמו `Subtitle`                                       | 700  | 1.2         | `rgb(var(--color-subheading))`             | תת-כותרת בכרטיס.                                       |
| `LongSubtitle`        | כמו `Subtitle`                                       | 700  | 1.2         | `rgb(var(--color-subheading))`             | לטקסט משנה ארוך.                                       |
| `LeadText`            | `var(--text-lg)` (≈18–20px)                          | 600  | 1.2         | `rgb(var(--color-lead-text))`              | טקסט פתיחה או הסבר ראשוני.                             |
| `BodyText`            | 18px                                                 | 500  | 1.4         | `rgb(var(--color-text))`                   | טקסט גוף ופסקאות.                                      |
| `FocusText`           | `var(--text-lg)`                                     | 500  | 1.4         | `rgb(var(--color-text))`                   | טקסט מודגש בתוך כרטיסים.                               |
| `FocusTextLabel`      | `var(--text-lg)`                                     | 500  | 1.4         | `rgb(var(--color-text))`                   | תווית מעל טקסט ממוקד.                                  |
| `BigNote`             | `var(--text-lg)`                                     | 500  | 1.4         | `rgb(var(--color-text))`                   | הערות חשובות/סיכומים.                                  |
| `SmallNote`           | `var(--text-sm)` (≈14–16px)                          | 500  | 1.4         | `rgb(var(--color-text))` עם `opacity: 0.7` | הערות קטנות ואזהרות.                                   |
| `LegalNote`           | `var(--text-sm)`                                     | 500  | 1.4         | `rgb(var(--color-text))` עם `opacity: 0.7` | טקסט משפטי ותנאים.                                     |
| `LabelText`           | `var(--text-sm)`                                     | 500  | 1.4         | `rgb(var(--color-text))` עם `opacity: 0.7` | תוויות לטפסים.                                         |
| `NumberTitle`         | `var(--text-4xl)` (≈40–56px)                         | 700  | 1           | `rgb(var(--color-support))`                | ספרות קוד העושר ונתונים מספריים.                       |
| `Price`               | `var(--text-4xl)`                                    | 400  | 1           | `rgb(var(--color-support))`                | הצגת מחירים.                                           |
| `BrandName`           | `var(--text-lg)`                                     | 300  | 1           | `rgb(var(--color-english))`                | שם המותג באנגלית, אותיות גדולות, letter-spacing 0.1em. |
| `ButtonPrimaryText`   | 18px                                                 | 500  | 1.1         | `var(--btn-primary-text)`                  | נשלט ע"י מערכת הכפתורים (CTA color).                   |
| `ButtonSecondaryText` | 18px                                                 | 500  | 1.1         | `var(--btn-secondary-text)`                | נשלט ע"י מערכת הכפתורים (CTA color).                   |
| `.btn-cta` (טקסט)     | 18px                                                 | 500  | 1.1         | `var(--btn-cta-text)`                      | טקסט כפתור CTA במצב בהיר וכהה.                         |

---

## 🎯 הנחיות יישום

- אל תשנו צבעים ידנית; השתמשו ב-`rgb(var(--token))` בלבד.
- לשמירה על היררכיה, אל תוסיפו מרווחים חיצוניים למחלקות הטיפוגרפיות עצמן – ההפרדות מנוהלות ע"י ה-container.
- טקסט באנגלית (כגון `BrandName`) משתמש ב-`--color-english` וממשיך לשמור על יישור מרכזי.
- במצב כהה הערכים מתעדכנים אוטומטית באמצעות אותם טוקנים – אין צורך ב-override ידני.

---

## ✨ בדיקות לפני העלאה

- [ ] אימתתם שהמחלקה הנבחרת קיימת ב-`src/styles/typography-system.css`?
- [ ] הצבע מגיע מטוקן מעודכן (`doc/COLORS.md`)?
- [ ] יישור למרכז והמשקל תואמים לטבלה לעיל?
- [ ] לא הוספתם inline-style שמשנה צבע או משקל?
