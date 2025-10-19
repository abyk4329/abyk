# 🎨 מערכת העיצוב החדשה - מדריך מהיר

## סקירה מהירה

מערכת עיצוב נאומורפית מרכזית לכל האתר, המספקת קומפוננטים עקביים וקלים לשימוש.

---

## 🚀 שימוש מהיר

### 1. ייבוא הסגנונות

```tsx
import sharedStyles from "@/app/components/shared/neumorphic.module.css";
```

### 2. שימוש בכפתורים

#### דרך 1: עם CSS Modules (למי שצריך שליטה מלאה)

```tsx
<button className={sharedStyles.ctaButton}>כפתור CTA</button>
```

#### דרך 2: עם קומפוננט GlassButton (מומלץ)

```tsx
import { GlassButton } from '@/app/components/shared/GlassButton';

// CTA - פעולה ראשית
<GlassButton variant="cta" onClick={handleClick}>
  התחל עכשיו
</GlassButton>

// Primary - פעולה משנית חשובה
<GlassButton variant="primary" onClick={handleShare}>
  שתף עם חברים
</GlassButton>

// Secondary - פעולה רגילה
<GlassButton variant="secondary" onClick={handleReset}>
  איפוס
</GlassButton>
```

---

## 📚 היררכיית כפתורים

### 🥇 CTA Button

**מתי להשתמש:** הפעולה הראשית והחשובה ביותר בדף

**דוגמאות:**

- "התחל חישוב"
- "מעבר לרכישה"
- "גלו את המשמעות המלאה"

**מראה:** רקע זהב (#a87f58), טקסט לבן

```tsx
<GlassButton variant="cta">התחל עכשיו</GlassButton>
```

### 🥈 Primary Button

**מתי להשתמש:** פעולות משניות חשובות

**דוגמאות:**

- "שתף עם חברים"
- "הורד PDF"
- "שלח מייל"

**מראה:** שקוף עם מסגרת זהב, טקסט זהב

```tsx
<GlassButton variant="primary">שתף</GlassButton>
```

### 🥉 Secondary Button

**מתי להשתמש:** פעולות רגילות, פחות קריטיות

**דוגמאות:**

- "איפוס שדות"
- "ביטול"
- "חזור"

**מראה:** נאומורפי רגיל, טקסט כהה

```tsx
<GlassButton variant="secondary">איפוס</GlassButton>
```

### 🔗 Secondary Link

**מתי להשתמש:** ניווט או מידע משני

**דוגמאות:**

- "תנאי שימוש"
- "קרא עוד"
- "מדיניות פרטיות"

**מראה:** טקסט עם קו תחתון

```tsx
import Link from "next/link";

<Link href="/terms" className={sharedStyles.secondaryLink}>
  תנאי שימוש
</Link>;
```

---

## 🎴 כרטיסים

```tsx
<div className={sharedStyles.neuCard}>
  <div className={sharedStyles.iconInset}>
    <Calculator className="h-10 w-10" />
  </div>

  <h1 className={sharedStyles.headline}>
    קוד <span className={sharedStyles.accentText}>העושר</span> שלך
  </h1>

  <p className={sharedStyles.description}>גלה את המספרים המיוחדים שלך</p>

  <GlassButton variant="cta">התחל</GlassButton>
</div>
```

---

## 🎨 צבעים

### Light Mode

```css
--neu-base: #f5f5f5          /* רקע */
--neu-accent: #a87f58         /* זהב */
--neu-icon: var(--neu-accent) /* אייקונים */
--neu-text-primary: #5e4934   /* טקסט ראשי */
```

### Dark Mode

```css
--neu-base: #2d3436           /* רקע */
--neu-accent: #c9a882          /* זהב */
--neu-icon: var(--neu-accent)  /* אייקונים */
--neu-text-primary: #e8dfd5    /* טקסט ראשי */
```

---

## 📏 מרווחים מומלצים

```tsx
// בין כפתורים
<div className="flex gap-5">
  <GlassButton variant="cta">אישור</GlassButton>
  <GlassButton variant="secondary">ביטול</GlassButton>
</div>

// מתחת לכותרת
<h1 className={`${sharedStyles.headline} mb-6`}>
  כותרת
</h1>

// כפתורים מתחת לתוכן
<div className="mt-9">
  <GlassButton variant="cta">המשך</GlassButton>
</div>
```

---

## 🔧 שילוב עם Tailwind

```tsx
// הוספת אנימציות
<GlassButton
  variant="cta"
  className="transition-all duration-300 hover:scale-[1.03]"
>
  כפתור עם הגדלה
</GlassButton>

// התאמת רוחב
<GlassButton
  variant="primary"
  className="w-full"
>
  כפתור ברוחב מלא
</GlassButton>

// שילוב עם grid
<div className="grid grid-cols-2 gap-4">
  <GlassButton variant="cta">אישור</GlassButton>
  <GlassButton variant="secondary">ביטול</GlassButton>
</div>
```

---

## 📖 תיעוד מלא

לתיעוד מפורט, ראה:

- [מערכת העיצוב המלאה](./app/components/shared/README.md)
- [מדריך מעבר](./docs/DESIGN-SYSTEM-MIGRATION.md)
- [התקדמות המעבר](./docs/MIGRATION-PROGRESS.md)

---

## ✅ דוגמה מלאה

```tsx
import { GlassButton } from "@/app/components/shared/GlassButton";
import sharedStyles from "@/app/components/shared/neumorphic.module.css";
import { Calculator, Share2 } from "lucide-react";

export default function ExamplePage() {
  return (
    <div className="min-h-screen p-6">
      <div className={sharedStyles.neuCard}>
        {/* Icon */}
        <div className={sharedStyles.iconInset}>
          <Calculator className="h-10 w-10" />
        </div>

        {/* Headline */}
        <h1 className={sharedStyles.headline}>
          קוד <span className={sharedStyles.accentText}>העושר</span> שלך
        </h1>

        {/* Description */}
        <p className={sharedStyles.description}>גלה את המספרים המיוחדים שלך</p>

        {/* Buttons */}
        <div className="flex flex-col gap-5 mt-9">
          <GlassButton variant="cta">התחל חישוב</GlassButton>

          <GlassButton variant="primary">
            <Share2 className="h-5 w-5" />
            שתף עם חברים
          </GlassButton>

          <GlassButton variant="secondary">איפוס</GlassButton>
        </div>
      </div>
    </div>
  );
}
```

---

## 💡 טיפים

### 1. כפתור אחד CTA לדף

כל דף צריך כפתור CTA אחד בלבד - הפעולה הכי חשובה.

### 2. שמור על היררכיה

CTA → Primary → Secondary → Link

### 3. השתמש באייקונים

```tsx
<GlassButton variant="primary">
  <Share2 className="h-5 w-5" />
  שתף
</GlassButton>
```

### 4. נגישות

כל הכפתורים כוללים focus states אוטומטיים.

### 5. RTL Support

המערכת תומכת מלאה ב-RTL (עברית).

---

**גרסה:** 1.0.0  
**עדכון אחרון:** דצמבר 2024  
**מצב:** ✅ ייצור
