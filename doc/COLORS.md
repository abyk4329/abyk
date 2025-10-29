# מערכת צבעים - ABYK

> **מקור אמת יחיד לכל הצבעים באתר**  
> כל שינוי צבע חייב לעבור דרך קובץ זה ולהתעדכן ב-`src/styles/tokens.css`

תאריך עדכון: 28 אוקטובר 2025

---

## 🎨 פלטת צבעים ראשית

### Light Theme (בהיר)

| תפקיד          | RGB           | HEX       | שימוש                            |
| -------------- | ------------- | --------- | -------------------------------- |
| **Background** | `245 245 245` | `#F5F5F5` | רקע עמוד ראשי                    |
| **Surface**    | `245 245 245` | `#F5F5F5` | כרטיסים, פאנלים                  |
| **Text**       | `34 40 51`    | `#222833` | טקסט רגיל, פסקאות                |
| **Heading**    | `185 126 126` | `#B97E7E` | כותרות ראשיות                    |
| **Subheading** | `192 160 160` | `#C0A0A0` | תתי כותרות, LeadText             |
| **Brand**      | `123 83 56`   | `#7B5338` | חתימת מותג, אייקונים פוטר, תפריט |
| **Accent**     | `193 144 128` | `#C19080` | הדגשות בתוך טקסט                 |
| **Support**    | `124 162 145` | `#7CA291` | ספרות קוד העושר, מחירים          |
| **CTA**        | `206 161 161` | `#CEA1A1` | כפתורי CTA, הדגשות פעולה ראשיות  |
| **CTA Text**   | `26 31 40`    | `#1A1F28` | טקסט כפתור CTA (כהה על רקע ורוד) |
| **Primary**    | `124 162 145` | `#7CA291` | כפתורים ראשיים, מסגרת, פונט      |
| **Icon**       | `91 106 102`  | `#5B6A66` | אייקונים כלליים                  |
| **Error**      | `122 47 47`   | `#7A2F2F` | הודעות שגיאה                     |

### Dark Theme (כהה)

| תפקיד          | RGB           | HEX       | שימוש                             |
| -------------- | ------------- | --------- | --------------------------------- |
| **Background** | `34 40 51`    | `#222833` | רקע עמוד ראשי                     |
| **Surface**    | `34 40 51`    | `#222833` | כרטיסים, פאנלים, thumb            |
| **Text**       | `245 226 204` | `#F5E2CC` | טקסט רגיל                         |
| **Heading**    | `124 162 145` | `#7CA291` | כותרות ראשיות                     |
| **Subheading** | `192 160 160` | `#C0A0A0` | תתי כותרות                        |
| **Brand**      | `198 171 150` | `#C6AB96` | חתימת מותג                        |
| **Support**    | `206 161 161` | `#CEA1A1` | ספרות קוד העושר, מחירים, CTA      |
| **Primary**    | `246 226 203` | `#F6E2CB` | כפתורים ראשיים                    |
| **Icon**       | `168 132 105` | `#A88469` | אייקונים כלליים                   |
| **CTA**        | `206 161 161` | `#CEA1A1` | כפתור CTA רקע במצב כהה            |
| **CTA Text**   | `26 31 40`    | `#1A1F28` | טקסט כפתור CTA (כהה על רקע ורדרד) |

---

## 🎯 מיפוי צבעים לפי קומפוננטה

### פוטר קבוע (Footer)

| אלמנט       | Light                   | Dark                    |
| ----------- | ----------------------- | ----------------------- |
| רקע         | `--color-surface`       | `--color-surface`       |
| אייקונים    | `--color-brand` #875F45 | `--color-brand` #875F45 |
| כפתורים SVG | `--color-brand` #875F45 | `--color-brand` #875F45 |

### תפריט צד (Side Menu)

| אלמנט             | Light                   | Dark                    |
| ----------------- | ----------------------- | ----------------------- |
| רקע               | `--color-surface`       | `--color-surface`       |
| כותרת (AWAKENING) | `--color-brand` #875F45 | `--color-brand` #875F45 |
| טקסט קישורים      | `--color-brand` #875F45 | `--color-brand` #875F45 |
| אייקונים          | `--color-brand` #875F45 | `--color-brand` #875F45 |
| כפתור סגירה       | `--color-brand` #875F45 | `--color-brand` #875F45 |
| כפתור PWA         | `--color-brand` #875F45 | `--color-brand` #875F45 |

### מחשבון קוד העושר - עמוד תוצאה

| אלמנט        | Light                     | Dark                      |
| ------------ | ------------------------- | ------------------------- |
| ספרות הקוד   | `--color-support` #7CA291 | `--color-support` #CEA1A1 |
| כרטיסי ספרות | `--color-surface`         | `--color-surface`         |

### מתג Light/Dark (PullToggle)

| אלמנט      | Light          | Dark              |
| ---------- | -------------- | ----------------- |
| רקע Track  | gradient brand | gradient beige    |
| Thumb רקע  | gradient white | `--color-surface` |
| אייקון     | 🌙 ירח         | ☀️ שמש            |
| אייקון צבע | inherit        | inherit           |

---

## 📐 משתני CSS

### קובץ: `src/styles/tokens.css`

```css
:root {
  /* Light theme */
  --color-bg-light: 245 245 245;
  --color-surface-light: 245 245 245;
  --color-text-light: 90 63 53;
  --color-heading-light: 143 100 84;
  --color-subheading-light: 172 129 114;
  --color-brand-gold: 135 95 69;
  --color-accent: 170 133 124;
  --color-support: 189 124 70;
  --color-primary-light: 70 83 75;
  --color-icon-light: 84 107 103;
  --color-error: 132 64 64;

  /* Dark theme */
  --color-bg-dark: 34 40 51;
  --color-surface-dark: 34 40 51;
  --color-text-dark: 245 226 204;
  --color-heading-dark: 245 226 204;
  --color-subheading-dark: 189 170 149;
  --color-primary-dark: 152 118 91;
  --color-icon-dark: 152 118 91;
}

/* Theme selection */
:root,
[data-theme='light'] {
  --color-bg: var(--color-bg-light);
  --color-surface: var(--color-surface-light);
  --color-text: var(--color-text-light);
  --color-heading: var(--color-heading-light);
  --color-subheading: var(--color-subheading-light);
  --color-brand: var(--color-brand-gold);
  --color-primary: var(--color-primary-light);
  --color-icon: var(--color-icon-light);
}

[data-theme='dark'] {
  --color-bg: var(--color-bg-dark);
  --color-surface: var(--color-surface-dark);
  --color-text: var(--color-text-dark);
  --color-heading: var(--color-heading-dark);
  --color-subheading: var(--color-subheading-dark);
  --color-primary: var(--color-primary-dark);
  --color-icon: var(--color-icon-dark);
  --color-support: 189 170 149;
}
```

---

## 🎯 שימוש נכון

### בקוד CSS

```css
/* ✅ נכון - שימוש במשתנים */
.button {
  background: rgb(var(--color-accent));
  color: rgb(var(--color-bg));
}

.heading {
  color: rgb(var(--color-heading));
}

/* ❌ לא נכון - ערכים מוחלטים */
.button {
  background: #aa857c;
  color: #f5f5f5;
}
```

### עם שקיפות (opacity)

```css
/* ✅ נכון */
.overlay {
  background: rgb(var(--color-text) / 0.5);
}

.shadow {
  box-shadow: 0 4px 12px rgb(var(--color-accent) / 0.3);
}
```

---

## � היסטוריית שינויים

### 26 אוקטובר 2025

**שינויים במערכת הצבעים:**

1. **פוטר ותפריט צד:**

   - כל האלמנטים עברו לצבע `--color-brand` (#875F45) במצב בהיר
   - אחידות מלאה בין הפוטר הקבוע לתפריט הצד
   - כולל: אייקונים, טקסטים, כותרת AWAKENING, כפתור סגירה

2. **עמוד תוצאה - קוד העושר:**

   - ספרות הקוד מוצגות בצבע `--color-support` (#EEEADF במצב בהיר, #BDAA95 במצב כהה)
   - כל ספרה בכרטיסיה נפרדת עם font-weight: 200
   - גודל פונט: clamp(3rem, 10vw, 4.5rem)
   - טקסט סוג קוד ("קוד עם ספרות חוזרות") בצבע `--color-heading`

3. **מתג Light/Dark:**
   - הפיכת אייקונים: במצב כהה מוצגת שמש ☀️, במצב בהיר מוצג ירח 🌙
   - Thumb במצב כהה משתמש ב-`--color-surface` במקום גרדיאנט
   - אחידות עם רקע העמוד

**עיקרון מנחה:**
`--color-brand` (#875F45) הוא הצבע המזהה של האתר ומשמש לכל האייקונים והאלמנטים אינטראקטיביים במצב בהיר.

---

## �🔄 תהליך שינוי צבע

### שלב 1: עדכן את tokens.css

```css
/* ב-src/styles/tokens.css */
:root {
  --color-new: 100 100 100; /* הוסף צבע חדש */
}
```

### שלב 2: הוסף ל-COLORS.md

עדכן את הטבלה למעלה עם הצבע החדש.

### שלב 3: השתמש בקוד

```css
.new-element {
  color: rgb(var(--color-new));
}
```

---

## 📊 מערכת הצללים (Shadows)

### Light Theme

```css
/* Raised (מוגבה) */
--shadow-raised-min-light: 2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(255, 255, 255, 1);

/* Inset (שקוע) */
--shadow-inset-min-light: inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px
    4px rgba(255, 255, 255, 0.7);
```

### Dark Theme

```css
/* Raised (מוגבה) */
--shadow-raised-min-dark: 2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.05);

/* Inset (שקוע) */
--shadow-inset-min-dark: inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px
    4px rgba(255, 255, 255, 0.05);
```

---

## ✅ Checklist - לפני שימוש בצבע

- [ ] הצבע מוגדר ב-`tokens.css`?
- [ ] הצבע מתועד ב-`COLORS.md`?
- [ ] משתמש ב-`rgb(var(--color-name))`?
- [ ] בדקתי ניגודיות WCAG AA?
- [ ] הצבע עובד גם ב-light וגם ב-dark?

---

## 🚫 אסור

❌ להשתמש בצבעים מוחלטים (HEX/RGB ישירות)
❌ ליצור צבעים חדשים בלי לעדכן tokens.css
❌ להשתמש בצבעים שאינם מתועדים
❌ לשנות צבעים ללא בדיקת ניגודיות

---

## 🎨 דוגמאות שימוש

### כפתור ראשי

```css
.btn-primary {
  background: linear-gradient(
    135deg,
    rgb(var(--color-accent)),
    rgb(var(--color-support))
  );
  color: rgb(var(--color-bg));
}
```

### כרטיס

```css
.card {
  background: rgb(var(--color-surface));
  box-shadow: var(--shadow-raised-min);
}
```

### טקסט עם שקיפות

```css
.subtitle {
  color: rgb(var(--color-text) / 0.8);
}
```

---

## 📱 נגישות - ניגודיות

### WCAG 2.1 Level AA

| שילוב                         | יחס ניגודיות | תקין? |
| ----------------------------- | ------------ | ----- |
| Text (light) על Background    | 4.8:1        | ✅    |
| Heading (light) על Background | 5.2:1        | ✅    |
| Icon (light) על Background    | 4.9:1        | ✅    |
| Text (dark) על Background     | 12.5:1       | ✅    |

**מינימום נדרש:**

- טקסט רגיל: 4.5:1
- טקסט גדול/כפתורים: 3:1

---

## 🔧 כלים לבדיקה

**מומלץ:**

- WebAIM Contrast Checker
- Chrome DevTools Accessibility
- Stark (Figma plugin)

---

תאריך עדכון אחרון: 26.10.2025
