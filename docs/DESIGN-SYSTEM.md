# 🎨 מערכת העיצוב - Awakening by Ksenia

## תוכן עניינים

1. [פלטת צבעים](#פלטת-צבעים)
2. [טיפוגרפיה](#טיפוגרפיה)
3. [קומפוננטים](#קומפוננטים)
4. [אנימציות ומעברים](#אנימציות-ומעברים)
5. [ריווח ומבנה](#ריווח-ומבנה)

---

## פלטת צבעים

### מצב בהיר (Light Mode) - ברירת מחדל

```css
--neu-base: #f5f5f5; /* רקע עיקרי */
--neu-card: #f5f5f5; /* כרטיסיה */
--neu-text-primary: #5e4934; /* טקסט ראשי - חום כהה */
--neu-text-secondary: #473b31; /* טקסט משני - חום */
--neu-text-tertiary: #9f8572; /* טקסט שלישוני - חום בהיר */
--neu-accent: #a87f58; /* צבע מבטא - ברונזה */
--neu-accent-light: #dbb896; /* מבטא בהיר - זהב */
--neu-accent-bright: #d4a574; /* זהב עיקרי */
```

### מצב כהה (Dark Mode)

```css
[data-theme='dark'] {
  --neu-base: #2d3436; /* רקע כהה */
  --neu-card: #2d3436; /* כרטיסיה כהה */
  --neu-text-primary: #e8dfd5; /* כיתוב בהיר */
  --neu-text-secondary: #e8dfd5; /* כיתוב בהיר */
  --neu-text-tertiary: #b8a89a; /* כיתוב משני */
  --neu-accent: #d4a574; /* זהב */
  --neu-accent-bright: #e5b885; /* זהב בהיר */
  --neu-shadow-light: rgba(58, 63, 65, 1); /* צל בהיר */
  --neu-shadow-dark: rgba(20, 22, 23, 0.8); /* צל כהה */
}
```

### צללים נאומורפיים

```css
/* Light Mode */
--neu-shadow-light: rgba(255, 255, 255, 1); /* צל בהיר */
--neu-shadow-dark: rgba(160, 160, 160, 0.5); /* צל כהה */

/* Dark Mode - מוגדר אוטומטית ב-[data-theme="dark"] */
```

### שימוש בצבעים

- **רקע עמוד**: `var(--neu-base)` - משתנה לפי מצב
- **כרטיסיה**: `var(--neu-card)` - **רוחב משתנה לפי גודל מסך, אורך לפי תוכן**
- **טקסט כותרות**: `var(--neu-text-primary)`
- **טקסט רגיל**: `var(--neu-text-secondary)`
- **טקסט משני/תוויות**: `var(--neu-text-tertiary)`
- **כפתורים ראשיים**: `var(--neu-accent)`
- **הדגשות זהב**: `#D4A574`

---

## טיפוגרפיה

### פונט

```css
--font-family: 'Assistant', sans-serif;
--font-size: 16px; /* בסיס */
```

### היררכיית כותרות

```css
h1 {
  font-size: clamp(1.75rem, 5vw, 2.5rem); /* 28-40px */
  font-weight: 700;
  line-height: 1.2;
  color: var(--neu-text-primary);
}

h2 {
  font-size: clamp(1.5rem, 4vw, 2rem); /* 24-32px */
  font-weight: 600;
  line-height: 1.3;
}

h3 {
  font-size: clamp(1.25rem, 3vw, 1.5rem); /* 20-24px */
  font-weight: 600;
  line-height: 1.4;
}

/* Paragraph */
p,
.body-text {
  font-size: clamp(0.875rem, 2vw, 1rem); /* 14-16px */
  font-weight: 400;
  line-height: 1.6;
  color: var(--neu-text-secondary);
}

/* Caption/Small */
.caption {
  font-size: clamp(0.75rem, 1.5vw, 0.875rem); /* 12-14px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--neu-text-tertiary);
}
```

### משקלי פונט

- **Bold (700)**: כותרות ראשיות, טקסט מודגש
- **Semi-Bold (600)**: כותרות משניות, כפתורים
- **Medium (500)**: תוויות, טקסט חשוב
- **Regular (400)**: טקסט רגיל, פסקאות

---

## קומפוננטים

### 1. כפתורים - 3 סוגים בלבד

#### כפתור ראשי (Primary Button)

```tsx
<button className="btn-primary">מחשבון קוד העושר</button>
```

```css
.btn-primary {
  background: linear-gradient(145deg, #d4a574, #b8906d);
  color: #fdfcfb;
  padding: 1rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 6px 6px 12px var(--neu-shadow-dark), -6px -6px 12px var(--neu-shadow-light);
  font-weight: 600;
  font-size: 1.05rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Dark Mode */
[data-theme='dark'] .btn-primary {
  background: linear-gradient(145deg, #d4a574, #c29868);
  color: #2d3436;
}
```

#### כפתור משני (Secondary Button)

```tsx
<button className="btn-secondary">איפוס שדות</button>
```

```css
.btn-secondary {
  background: linear-gradient(
    145deg,
    var(--neu-card),
    rgba(248, 244, 240, 0.8)
  );
  color: var(--neu-text-primary);
  box-shadow: 4px 4px 8px var(--neu-shadow-dark), -4px -4px 8px var(--neu-shadow-light);
  padding: 1rem 2rem;
  border-radius: 1.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
```

#### לינק (Link Button)

```tsx
<a href="/path" className="btn-link">
  קרא עוד
</a>
```

```css
.btn-link {
  color: var(--neu-accent-bright);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-link:hover {
  color: var(--neu-accent);
  text-decoration: underline;
}
```

#### אנימציות כפתורים

```css
/* Hover */
.btn-primary:hover,
.btn-secondary:hover {
  transform: scale(1.02);
}

/* Active/Press */
.btn-primary:active,
.btn-secondary:active {
  transform: scale(0.98);
  box-shadow: inset 2px 2px 5px var(--neu-shadow-dark);
}
```

---

### 2. כרטיסיה - עיצוב אחיד בסיסי

**⭐ עיקרון חשוב:** יש כרטיסיה אחת בסיסית שמשתמשים בה בכל מקום!

- **רוחב**: משתנה אוטומטית לפי גודל מסך (responsive)
- **אורך**: משתנה לפי תוכן (dynamic height)
- **עיצוב**: זהה בכל העמודים

#### כרטיסיה בסיסית (Base Card)

```css
.card {
  background: linear-gradient(
    145deg,
    var(--neu-card),
    rgba(248, 244, 240, 0.95)
  );
  border-radius: 1.75rem; /* 28px */
  padding: clamp(1.5rem, 4vw, 2.5rem);
  box-shadow: 8px 8px 16px var(--neu-shadow-dark), -8px -8px 16px var(--neu-shadow-light);

  /* רוחב אוטומטי - משתנה לפי מסך */
  width: 100%;
  max-width: min(90vw, 480px);

  /* אורך אוטומטי - לפי תוכן */
  height: auto;
  min-height: fit-content;
}

/* Tablet+ */
@media (min-width: 768px) {
  .card {
    max-width: min(85vw, 600px);
    padding: 2.5rem 3rem;
    border-radius: 2rem; /* 32px */
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .card {
    max-width: 720px;
  }
}

/* Hover Effect (אופציונלי) */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 10px 10px 20px var(--neu-shadow-dark), -10px -10px 20px var(--neu-shadow-light);
}
```

#### Dark Mode

```css
[data-theme='dark'] .card {
  background: linear-gradient(145deg, #2d3436, rgba(40, 45, 47, 0.95));
  color: #e8dfd5;
}
```

---

### 3. שדות קלט (Inputs)

```css
.inputField {
  height: 3.5rem; /* 56px */
  border-radius: 1.375rem; /* 22px */
  padding: 0 1rem;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.95),
    rgba(248, 244, 240, 0.88)
  );
  box-shadow: inset 4px 4px 8px rgba(159, 133, 114, 0.16), inset -4px -4px 8px
      rgba(255, 255, 255, 0.92);
  color: #473b31;
  font-weight: 600;
  text-align: center;
  border: none;
}

/* Focus */
.inputField:focus {
  outline: 2px solid rgba(135, 103, 79, 0.35);
  outline-offset: 3px;
  box-shadow: inset 5px 5px 10px rgba(159, 133, 114, 0.2), inset -5px -5px 10px
      rgba(255, 255, 255, 0.95);
}

/* Placeholder */
.inputField::placeholder {
  color: rgba(135, 103, 79, 0.6);
  text-transform: uppercase;
}
```

---

### 4. אייקונים

#### Icon Container - מיכל אייקון

```css
.iconContainer {
  width: 4.5rem; /* 72px */
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.5rem; /* 24px */
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.95),
    rgba(248, 244, 240, 0.88)
  );
  box-shadow: 8px 8px 16px rgba(159, 133, 114, 0.18), -8px -8px 16px rgba(255, 255, 255, 0.95);
}

.icon {
  width: 1.75rem; /* 28px */
  height: 1.75rem;
  color: #b8906d; /* זהב-ברונזה */
  stroke-width: 1.6;
}
```

#### Icon Button - כפתור אייקון עגול

```css
.iconButton {
  width: 3rem; /* 48px */
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(145deg, #ffffff, #f8f4f0);
  box-shadow: 4px 4px 8px rgba(160, 160, 160, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5e4934;
}
```

---

### 5. לינקים

```css
/* Primary Link */
.primaryLink {
  color: var(--neu-accent);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.primaryLink:hover {
  color: var(--neu-accent-bright);
}

/* Secondary Link */
.secondaryLink {
  color: var(--neu-text-tertiary);
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: text-decoration-color 0.3s ease, color 0.3s ease;
}

.secondaryLink:hover {
  color: var(--neu-text-secondary);
  text-decoration-color: currentColor;
}
```

---

### 6. תפריט צד (Side Menu) - אותו דבר בכל העמודים

**⭐ עיקרון חשוב:** התפריט צד זהה לחלוטין בכל העמודים!

```css
.sideMenu {
  background: linear-gradient(
    145deg,
    var(--neu-card),
    rgba(248, 244, 240, 0.98)
  );
  box-shadow: 20px 20px 40px var(--neu-shadow-dark), -20px -20px 40px var(--neu-shadow-light);
  border-radius: 0; /* ללא פינות מעוגלות בצד */
  max-width: min(85vw, 420px);
  width: 100%;
  padding: 2.5rem 2rem;
  height: 100vh;
  overflow-y: auto;
}

/* Dark Mode */
[data-theme='dark'] .sideMenu {
  background: linear-gradient(145deg, #2d3436, rgba(40, 45, 47, 0.98));
  color: #e8dfd5;
}
```

#### כפתורי תפריט (Menu Buttons)

```css
/* רגיל */
.menuButton {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-radius: 1.25rem;
  background: linear-gradient(
    145deg,
    var(--neu-card),
    rgba(248, 244, 240, 0.6)
  );
  box-shadow: 3px 3px 6px var(--neu-shadow-dark), -3px -3px 6px var(--neu-shadow-light);
  color: var(--neu-text-secondary);
  transition: all 0.3s ease;
  border: none;
  width: 100%;
  cursor: pointer;
  text-align: right;
  font-size: 1rem;
  font-weight: 500;
}

.menuButton:hover {
  transform: scale(1.02);
}

/* מודגש/פעיל */
.menuButtonActive {
  background: linear-gradient(145deg, #d4a574, #c29868);
  color: #fdfcfb;
  box-shadow: 6px 6px 12px var(--neu-shadow-dark), -6px -6px 12px var(--neu-shadow-light);
}

/* Dark Mode */
[data-theme='dark'] .menuButtonActive {
  color: #2d3436;
}
```

---

### 7. Toast / Notification

```css
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 1.5rem;
  border-radius: 1.25rem;
  background: linear-gradient(145deg, #a87f58, #b8906d);
  color: #fdfcfb;
  box-shadow: 8px 8px 16px rgba(160, 160, 160, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.95);
  font-weight: 500;
  animation: slideUp 0.3s ease;
  z-index: 1000;
}
```

---

## אנימציות ומעברים

### מעברים סטנדרטיים

```css
/* Fast - אינטראקציות מיידיות */
transition: all 0.2s ease;

/* Standard - רוב האלמנטים */
transition: all 0.3s ease;

/* Slow - שינויי מצב */
transition: all 0.5s ease;
```

### אפקטים נפוצים

**Hover Scale**

```css
.element:hover {
  transform: scale(1.02);
}
```

**Active Press**

```css
.element:active {
  transform: scale(0.98);
}
```

**Lift on Hover**

```css
.card:hover {
  transform: translateY(-2px);
}
```

**Float Animation**

```css
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.element {
  animation: float 3s ease-in-out infinite;
}
```

---

## ריווח ומבנה

### Scale ריווח

```css
--space-1: 0.5rem; /* 8px */
--space-1-5: 0.75rem; /* 12px */
--space-2: 1rem; /* 16px */
--space-3: 1.5rem; /* 24px */
--space-4: 2rem; /* 32px */
--space-5: 2.5rem; /* 40px */
--space-6: 3rem; /* 48px */
```

### Layout Sections

**Hero Shell - מיכל דף מלא**

```css
.hero-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block-start: calc(var(--header-height) + clamp(0.75rem, 2.5vw, 2rem));
  padding-block-end: clamp(1.5rem, 5vh, 4rem);
  padding-inline: clamp(1rem, 4vw, 2.5rem);
}
```

**Section Wrapper**

```css
.section {
  padding-block: clamp(2rem, 8vh, 4rem);
  padding-inline: clamp(1rem, 4vw, 2.5rem);
  max-width: 1200px;
  margin: 0 auto;
}
```

**Card Container**

```css
.cardContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
}
```

---

## Responsive Breakpoints

```css
/* Mobile First */
/* 0-639px: Mobile */

/* Tablet */
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}

/* Desktop */
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
@media (min-width: 1536px) {
  /* 2xl */
}
```

---

## רשימת קומפוננטים לשימוש חוזר

### ✅ קומפוננטים קיימים

1. **כרטיסיה בסיסית (Card)** - סטייל גלובלי ב-`globals.css`

   - `.card` - **עיצוב אחיד בסיסי לכל העמודים**
   - רוחב אוטומטי (responsive)
   - אורך דינמי (לפי תוכן)
   - כולל Dark Mode

2. **כפתורים (3 סוגים בלבד)**

   - `.btn-primary` - כפתור ראשי
   - `.btn-secondary` - כפתור משני
   - `.btn-link` - לינק
   - כולל hover/active states וגם Dark Mode

3. **כפתורי תפריט (Menu Buttons)**

   - `.menuButton` - רגיל
   - `.menuButtonActive` - מודגש/פעיל
   - כולל Dark Mode

### כפתורי Header צפים

- הכפתורים הקבועים (תפריט ו-Theme Toggle) ממוקמים באמצעות המחלקות הגלובליות `.header-floating-button`, יחד עם modifiers של ימין/שמאל.
- מיקום: `position: fixed; top: calc(env(safe-area-inset-top) + 2rem);` עם `right|left: calc(env(safe-area-inset-*) + 2rem);` (Tailwind שקול: `fixed top-8 right-8`).
- שכבה: `z-index: 40` – מעל התוכן, מתחת ל-Sidebar (`z-50`) ולמודלים (`z-60`).
- הכפתורים עצמם עושים שימוש ב-`iconButton` (ניומורפי) מ-`design/themes/components/icon-button.css` ובמחלקות העיטוף של `design/themes/layout-header.css`.
- לוגיקה: כפתור התפריט מופיע בכל מצב; Theme Toggle מוסתר בזמן שתפריט הצד פתוח (`!isMenuOpen`).
- קבצים עיקריים: `app/page.tsx`, `app/components/layout/StandardPageLayout.tsx`, ו-`app/globals.css` (הגדרות המחלקות).
- עיצוב ניומורפי מלא: ראו `docs/NEUMORPHIC-DESIGN.md` עבור מערכת הצללות וכפתורים מפורטת.

1. **תפריט צד (Side Menu)** - `.sideMenu`

   - **אותו דבר בכל העמודים**
   - כולל Dark Mode
   - Full height עם scroll

1. **Icon Container** - ב-CSS modules של Calculator

   - `.iconContainer`
   - תומך ב-Dark Mode

1. **Input Field** - ב-CSS modules של Calculator
   - `.inputField`
   - כולל focus states וגם Dark Mode

### 📋 קומפוננטים שצריך ליצור

1. **PricingCard** - כרטיס תמחור
2. **TestimonialCard** - כרטיס המלצה
3. **FeatureSection** - סקשן עם תמונה + טקסט
4. **ThemeToggle** - כפתור מעבר בין מצב בהיר/כהה (נושא כהה)
5. **Toast** - התראה זמנית (קיים ב-home page, צריך Dark Mode)

---

## הנחיות שימוש

### כתיבת CSS חדש

1. השתמש ב-CSS Variables מ-`:root`
2. השתמש ב-`clamp()` לריספונסיביות
3. הוסף `transition` לכל אלמנט אינטראקטיבי
4. השתמש ב-gradient backgrounds לכרטיסים
5. הוסף shadows מרובים לעומק

### עקרונות נאומורפיזם

1. רקע בצבע בסיס אחיד
2. גרדיאנטים עדינים (#ffffff → #f8f4f0)
3. צללים כפולים (בהיר + כהה)
4. פינות מעוגלות (1rem - 2rem)
5. אלמנטים "מוטבעים" או "בולטים"

### נגישות

1. ניגודיות טקסט: לפחות 4.5:1
2. גודל מינימלי: 14px
3. מרווחי לחיצה: לפחות 44x44px
4. Focus states ברורים
5. תמיכה בקורא מסך

---

## עדכונים ושינויים

### גרסה נוכחית: 1.0

- ✅ מערכת צבעים מלאה
- ✅ טיפוגרפיה responsive
- ✅ כפתורים (2 variants)
- ✅ כרטיסים נאומורפיים
- ✅ שדות קלט
- ✅ אייקונים
- ✅ תפריט נפתח
- ✅ toast notifications

### רשימת משימות לביצוע

- [ ] ליצור `ThemeToggle` component (כפתור נושא כהה)
- [ ] להוסיף Dark Mode variables ל-`globals.css`
- [ ] ליצור `PricingCard` component עם Dark Mode
- [ ] ליצור `TestimonialCard` component עם Dark Mode
- [ ] ליצור `FeatureSection` component עם Dark Mode
- [ ] לעדכן דף Result עם הכרטיסיה הבסיסית
- [ ] לעדכן דף Sales עם הכרטיסיה הבסיסית
- [ ] לעדכן דף Thank You עם הכרטיסיה הבסיסית
- [ ] לעדכן דף Interpretations עם הכרטיסיה הבסיסית
- [ ] לוודא שהתפריט צד זהה בכל העמודים

---

**עודכן לאחרונה:** אוקטובר 2025  
**מתוחזק על ידי:** צוות פיתוח ABYK
