# מערכת מרווחים מאוחדת | UNIFIED SPACING SYSTEM

**תאריך:** 31.10.2025  
**גרסה:** 2.1

---

## 🎯 עקרון יסוד - CONTAINER MANAGES SPACING

**כלל מס' 1: Container מנהל את כל המרווחים, אלמנטים פנימיים ללא margin**

❌ **לעולם אל תעשי:**

- margin על קלאסים טיפוגרפיים (`.BodyText`, `.Subtitle`, `.Title`)
- padding ישיר על אלמנטים פנימיים
- מספרים ידניים (`12px`, `1.5rem`)

✅ **תמיד עשי:**

- Container (div/section) עם `display: flex; flex-direction: column; gap: var(--משתנה)`
- אלמנטים פנימיים עם `margin: 0`
- משתמש **רק** במשתנים גלובליים

---

## 📐 הכלל החדש - Container Pattern

```css
/* ❌ WRONG - Elements manage their own spacing */
.BodyText {
  margin-bottom: 16px;
}

.Subtitle {
  margin-top: 24px;
  margin-bottom: 16px;
}

/* ✅ CORRECT - Container manages spacing */
.BodyText {
  margin: 0; /* אפס מרווחים */
}

.Subtitle {
  margin: 0; /* אפס מרווחים */
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: var(--card-content-gap); /* 16px בין כל האלמנטים */
}
```

## 🧱 Utility מוכן - `.card-stack`

```css
.card-stack {
  display: flex;
  flex-direction: column;
  gap: var(--card-content-gap); /* 16px ברירת מחדל לכל האלמנטים */
}

.card-stack > * {
  margin: 0;
}
```

**שימוש:** לעטוף תוכן של כרטיסייה או מודול ולוודא שהמרווחים הפנימיים זהים בכל העמודים.

---

## 📊 כל המשתנים במקום אחד

### Basic Spacing Tokens

```css
:root {
  --space-xs: 0.25rem; /* 4px */
  --space-sm: 0.5rem; /* 8px */
  --space-md: 1rem; /* 16px */
  --space-lg: 1.5rem; /* 24px */
  --space-xl: 2rem; /* 32px */
  --space-2xl: 3rem; /* 48px */
  --space-3xl: 4rem; /* 64px */
}
```

### Card Section Gaps (מרווחים בין sections)

```css
:root {
  --card-section-gap-small: 0.375rem; /* 6px - sections צמודים */
  --card-section-gap-large: 0.625rem; /* 10px - sections מרווחים */
}
```

### Button Spacing (מרווחים פנימיים בכפתורים)

```css
:root {
  --btn-padding-y: 0.75rem; /* 12px - padding עליון/תחתון */
  --btn-padding-x: 1rem; /* 16px - padding שמאל/ימין */
  --btn-gap: 0.5rem; /* 8px - מרווח בין אייקון לטקסט */
}
```

### Card Internal Spacing (מרווחים פנימיים בכרטיסיות)

```css
:root {
  --card-padding-mobile-y: 1.5rem; /* 24px - padding עליון/תחתון במובייל */
  --card-padding-mobile-x: 1.125rem; /* 18px - padding שמאל/ימין במובייל */
  --card-padding-desktop: 1.5rem; /* 24px - padding כל הצדדים בדסקטופ */
  --card-content-gap: 1rem; /* 16px - מרווח בין אלמנטים בתוך כרטיסייה */
  --card-element-gap: 0.5rem; /* 8px - מרווח קטן בין אלמנטים צמודים */
}
```

### Typography Spacing (מרווחים בטקסטים)

```css
:root {
  --heading-margin-bottom: 1.5rem; /* 24px - margin תחתון לכותרת ראשית */
  --subheading-margin-bottom: 1rem; /* 16px - margin תחתון לתת-כותרת */
  --paragraph-margin-bottom: 1em; /* 1em - margin תחתון לפסקה */
  --text-line-gap: 1.5rem; /* 24px - מרווח בין שורות טקסט נפרדות */
}
```

---

## 📋 טבלה מרכזית - מתי להשתמש במה

| סוג מרווח                   | משתנה CSS                    | Tailwind              | ערך  | מתי להשתמש               |
| --------------------------- | ---------------------------- | --------------------- | ---- | ------------------------ |
| **Layout - בין כרטיסיות**   | `--layout-section-gap`       | `space-y-1.5`         | 6px  | מרווח בין cards בעמוד    |
| **Layout - בין אלמנטים**    | `--layout-content-gap`       | `space-y-4` / `gap-4` | 16px | מרווח בתוך card          |
| **Layout - בין פסקאות**     | `--layout-text-gap`          | `space-y-6`           | 24px | מרווח בין פסקאות טקסט    |
| **Layout - רשימה**          | `--layout-list-gap`          | `space-y-3` / `gap-3` | 12px | פריטי רשימה              |
| **Button - padding אנכי**   | `--btn-padding-y`            | `py-3`                | 12px | למעלה/למטה בכפתור        |
| **Button - padding אופקי**  | `--btn-padding-x`            | `px-4`                | 16px | שמאל/ימין בכפתור         |
| **Button - gap פנימי**      | `--btn-gap`                  | `gap-2`               | 8px  | בין אייקון לטקסט         |
| **Card - padding מובייל Y** | `--card-padding-mobile-y`    | -                     | 24px | למעלה/למטה במובייל       |
| **Card - padding מובייל X** | `--card-padding-mobile-x`    | -                     | 18px | שמאל/ימין במובייל        |
| **Card - padding דסקטופ**   | `--card-padding-desktop`     | -                     | 24px | כל הצדדים בדסקטופ        |
| **Card - gap תוכן**         | `--card-content-gap`         | `space-y-4` / `gap-4` | 16px | בין אלמנטים בכרטיסייה    |
| **Card - gap אלמנטים**      | `--card-element-gap`         | `gap-2`               | 8px  | בין אלמנטים צמודים       |
| **Typography - כותרת**      | `--heading-margin-bottom`    | `mb-6`                | 24px | margin תחתון כותרת ראשית |
| **Typography - תת-כותרת**   | `--subheading-margin-bottom` | `mb-4`                | 16px | margin תחתון תת-כותרת    |
| **Typography - פסקה**       | `--paragraph-margin-bottom`  | -                     | 1em  | margin תחתון פסקה (יחסי) |
| **Typography - שורות**      | `--text-line-gap`            | `space-y-6`           | 24px | בין שורות טקסט נפרדות    |

---

## 💡 דוגמאות שימוש

### 1. Interpretations Section - הדוגמה המושלמת

```css
/* ✅ Container מנהל הכל */
.interpretations-section {
  border-top: 1px solid rgb(var(--color-primary) / 0.55);
  padding-top: var(--space-sm); /* 8px מהקו לכותרת */
  margin-top: var(--card-section-gap-large); /* 10px בין sections */
  display: flex;
  flex-direction: column;
  gap: var(--card-content-gap); /* 16px בין כל האלמנטים */
  text-align: center;
}

/* אלמנטים פנימיים ללא margin */
.interpretations-section .Subtitle {
  margin: 0; /* Container מנהל */
}

.interpretations-section .BodyText {
  margin: 0; /* Container מנהל */
}

.interpretations-list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--card-element-gap); /* 8px בין items */
}

.interpretations-list-item {
  margin: 0; /* Container מנהל */
  padding: var(--space-xs) 0; /* רק padding פנימי */
}
```

```html
<!-- דוגמה HTML -->
<div class="interpretations-section">
  <h3 class="Subtitle">מתנות מרכזיות</h3>
  <ul class="interpretations-list">
    <li class="BodyText interpretations-list-item">מנהיגות טבעית...</li>
    <li class="BodyText interpretations-list-item">אומץ לפרוץ קדימה...</li>
  </ul>
</div>
```

**למה זה עובד:**

- ✅ `gap: var(--card-content-gap)` מנהל מרווח אחיד בין כותרת לרשימה
- ✅ כל האלמנטים עם `margin: 0` - אין התנגשויות
- ✅ שינוי אחד ב-gap משפיע על הכל
- ✅ עקבי ב-100% מהמקרים
- ✅ קווי ההפרדה נמשכים מצבע ה-CTA (`--color-primary`) ולכן משתלבים עם כפתורי הפעולה

---

### 2. כפתור - Padding פנימי

```css
/* ❌ לא נכון */
.btn {
  padding: 12px 16px;
}

/* ✅ נכון */
.btn {
  padding: var(--btn-padding-y) var(--btn-padding-x); /* 12px × 16px */
  gap: var(--btn-gap); /* 8px בין אייקון לטקסט */
}
```

```html
<!-- דוגמה HTML -->
<button class="btn btn-cta">
  <svg>...</svg>
  <span>לחץ כאן</span>
</button>
```

---

### 2. כרטיסייה - Padding רספונסיבי

```css
/* ❌ לא נכון */
.card {
  padding: 24px 18px;
}

@media (min-width: 768px) {
  .card {
    padding: 24px;
  }
}

/* ✅ נכון */
.card-mobile-padding {
  padding: var(--card-padding-mobile-y) var(--card-padding-mobile-x); /* 24px × 18px */
}

@media (min-width: 768px) {
  .card-mobile-padding {
    padding: var(--card-padding-desktop); /* 24px all sides */
  }
}
```

```html
<!-- דוגמה HTML -->
<div class="neu-raised-min rounded-lg card-mobile-padding">
  <h2 class="CardTitle">כותרת</h2>
  <p class="BodyText">תוכן...</p>
</div>
```

---

### 3. תוכן בכרטיסייה - Gap בין אלמנטים

```css
/* ❌ לא נכון */
.card-content > * + * {
  margin-top: 16px;
}

/* ✅ נכון */
.card-content {
  display: flex;
  flex-direction: column;
  gap: var(--card-content-gap); /* 16px */
}
```

```html
<!-- דוגמה HTML -->
<div class="neu-raised-min card-mobile-padding">
  <div class="flex flex-col" style="gap: var(--card-content-gap)">
    <h2 class="CardTitle">כותרת</h2>
    <p class="BodyText">פסקה 1</p>
    <p class="BodyText">פסקה 2</p>
  </div>
</div>

<!-- או עם Tailwind -->
<div class="neu-raised-min card-mobile-padding">
  <div class="space-y-4">
    <h2 class="CardTitle">כותרת</h2>
    <p class="BodyText">פסקה 1</p>
    <p class="BodyText">פסקה 2</p>
  </div>
</div>
```

---

### 4. עמוד עם כרטיסיות - Gap בין כרטיסיות

```css
/* ❌ לא נכון */
.page-cards > * + * {
  margin-top: 24px;
}

/* ✅ נכון */
.page-cards {
  display: flex;
  flex-direction: column;
  gap: var(--layout-section-gap); /* 24px */
}
```

```html
<!-- דוגמה HTML -->
<div class="space-y-6">
  <div class="neu-raised-min card-mobile-padding">כרטיסייה 1</div>
  <div class="neu-raised-min card-mobile-padding">כרטיסייה 2</div>
  <div class="neu-raised-min card-mobile-padding">כרטיסייה 3</div>
</div>
```

---

### 5. טיפוגרפיה - Margin תחתון לכותרות

```css
/* ❌ לא נכון */
.PageTitle {
  margin-bottom: 24px;
}

.CardSubtitle {
  margin-bottom: 16px;
}

/* ✅ נכון */
.PageTitle {
  margin-bottom: var(--heading-margin-bottom); /* 24px */
}

.CardSubtitle {
  margin-bottom: var(--subheading-margin-bottom); /* 16px */
}
```

```html
<!-- דוגמה HTML -->
<h1 class="PageTitle">כותרת ראשית</h1>
<h2 class="CardSubtitle">תת-כותרת</h2>
<p class="BodyText">פסקה עם margin-bottom: var(--paragraph-margin-bottom)</p>
```

---

### 6. רשימה - Gap בין פריטים

```css
/* ❌ לא נכון */
ul li + li {
  margin-top: 12px;
}

/* ✅ נכון */
ul {
  display: flex;
  flex-direction: column;
  gap: var(--layout-list-gap); /* 12px */
}
```

```html
<!-- דוגמה HTML -->
<ul class="space-y-3">
  <li>פריט 1</li>
  <li>פריט 2</li>
  <li>פריט 3</li>
</ul>
```

---

## 🔧 Migration Guide - איך לתקן קוד ישן

### תהליך תיקון

1. **מצא** את כל המרווחים הידניים:

   ```bash
   grep -r "padding:\|margin:\|gap:" src/
   ```

2. **בדוק** אם המספר תואם למשתנה קיים:

   - 12px → `var(--btn-padding-y)` או `var(--layout-list-gap)`
   - 16px → `var(--btn-padding-x)` או `var(--card-content-gap)`
   - 18px → `var(--card-padding-mobile-x)`
   - 24px → `var(--layout-section-gap)` או `var(--card-padding-mobile-y)`

3. **החלף** בהתאם לקונטקסט:

```css
/* לפני */
.my-button {
  padding: 12px 16px;
}

.my-card {
  padding: 24px 18px;
}

.my-list {
  gap: 12px;
}

/* אחרי */
.my-button {
  padding: var(--btn-padding-y) var(--btn-padding-x);
}

.my-card {
  padding: var(--card-padding-mobile-y) var(--card-padding-mobile-x);
}

.my-list {
  gap: var(--layout-list-gap);
}
```

---

## ✅ Checklist - לפני Commit

- [ ] כל ה-padding בכפתורים משתמש ב-`--btn-padding-y/x`?
- [ ] כל ה-padding בכרטיסיות משתמש ב-`--card-padding-*`?
- [ ] כל ה-gap בין כרטיסיות משתמש ב-`--layout-section-gap`?
- [ ] כל ה-gap בתוך כרטיסיות משתמש ב-`--card-content-gap`?
- [ ] כל ה-margin בכותרות משתמש ב-`--heading-margin-bottom` או `--subheading-margin-bottom`?
- [ ] אין מספרים ידניים (12px, 16px, 24px) בקוד?
- [ ] כל המרווחים עקביים בכל העמודים?

---

## 🎯 סיכום

**מקור האמת:** `src/styles/tokens.css`

**5 קבוצות משתנים:**

1. **Basic Spacing** - `--space-*` (xs/sm/md/lg/xl/2xl/3xl)
2. **Layout Spacing** - `--layout-*` (section/content/text/list)
3. **Button Spacing** - `--btn-*` (padding-y/x, gap)
4. **Card Spacing** - `--card-*` (padding mobile/desktop, content-gap, element-gap)
5. **Typography Spacing** - `--heading/subheading/paragraph-margin-bottom`, `--text-line-gap`

**כלל זהב:** שינוי אחד במשתנה → כל האתר מתעדכן
