# Neumorphic Design System - מערכת עיצוב נאומורפית

## סקירה כללית

מסמך זה מסביר את מערכת העיצוב הנאומורפית המשותפת לכל דפי האתר.

## קבצי סגנון

### `neumorphic.module.css`

קובץ זה מכיל את כל הסגנונות המשותפים שניתן להשתמש בהם בכל דפי האתר:

#### כפתורים (Buttons)

##### 1. כפתור CTA - `.ctaButton`

כפתור פעולה ראשי עם רקע זהב. משמש לפעולה המרכזית ביותר בדף.

```tsx
import sharedStyles from "@/app/components/shared/neumorphic.module.css";

<button className={sharedStyles.ctaButton}>מחשבון קוד העושר</button>;
```

**מאפיינים:**

- רקע: `var(--neu-accent)` (#a87f58)
- טקסט: #f5f5f5 (לבן)
- משקל גופן: 600 (semi-bold)
- צל: נאומורפי עם inset shadow רך
- border-radius: 20px

##### 2. כפתור ראשי - `.primaryButton`

כפתור עם רקע שקוף ומסגרת זהב. משמש לפעולות משניות חשובות.

```tsx
<button className={sharedStyles.primaryButton}>
  <Share2 className="h-5 w-5" />
  שתפו עם חברים
</button>
```

**מאפיינים:**

- רקע: `var(--neu-card)` (שקוף)
- מסגרת: 2px solid `var(--neu-accent)`
- טקסט: `var(--neu-accent)` (זהב)
- משקל גופן: 600 (semi-bold)
- צל: נאומורפי חיצוני
- border-radius: 20px

##### 3. כפתור משני - `.secondaryButton`

כפתור נאומורפי רגיל. משמש לפעולות פחות חשובות.

```tsx
<button className={sharedStyles.secondaryButton}>אישור</button>
```

**מאפיינים:**

- רקע: `var(--neu-card)`
- טקסט: `var(--neu-text-primary)`
- משקל גופן: 600 (semi-bold)
- צל: נאומורפי רגיל
- border-radius: 20px

##### 4. קישור משני - `.secondaryLink`

קישור טקסט עם קו תחתון. משמש לניווט משני.

```tsx
<Link href="/terms" className={sharedStyles.secondaryLink}>
  תנאי שימוש ומדיניות פרטיות
</Link>
```

**מאפיינים:**

- אין רקע או מסגרת
- טקסט: `var(--neu-text-primary)`
- משקל גופן: 500
- קו תחתון עם אפקט hover

#### כרטיסים (Cards)

##### כרטיס נאומורפי - `.neuCard`

```tsx
<div className={sharedStyles.neuCard}>{/* תוכן הכרטיס */}</div>
```

**מאפיינים:**

- רקע: `var(--neu-card)`
- צל: נאומורפי חיצוני גדול
- border-radius: 24px (1.5rem)
- padding: מותאם לנייד/דסקטופ

#### אייקונים (Icons)

##### 1. כפתור אייקון - `.iconButton`

כפתור עגול עם אייקון.

```tsx
<button className={sharedStyles.iconButton}>
  <Menu className="h-6 w-6" />
</button>
```

**מאפיינים:**

- צורה: עיגול מלא (50%)
- גודל: 56px × 56px
- צבע אייקון: `var(--neu-icon)`
- צל: נאומורפי חיצוני

##### 2. אייקון שקוע - `.iconInset`

אייקון עם אפקט שקוע.

```tsx
<div className={sharedStyles.iconInset}>
  <Calculator className="h-10 w-10" />
</div>
```

**מאפיינים:**

- border-radius: 20px
- גודל: 80px × 80px
- צבע: `var(--neu-accent)`
- צל: inset נאומורפי

##### 3. כפתור סושיאל - `.socialButton`

כפתור מרובע עם אייקון.

```tsx
<a href="..." className={sharedStyles.socialButton}>
  <Instagram className="h-6 w-6" />
</a>
```

**מאפיינים:**

- צורה: מרובע מעוגל
- border-radius: 20px
- גודל: 56px × 56px
- צבע: `var(--neu-accent)`

#### טיפוגרפיה (Typography)

##### 1. כותרת ראשית - `.headline`

```tsx
<h1 className={sharedStyles.headline}>קוד העושר שלך</h1>
```

**מאפיינים:**

- משקל גופן: 700 (bold)
- גודל: responsive (clamp)
- צבע: `var(--neu-text-primary)`
- letter-spacing: -0.03em

##### 2. טקסט מודגש - `.accentText`

```tsx
<span className={sharedStyles.accentText}>טקסט חשוב</span>
```

**מאפיינים:**

- צבע: `var(--neu-accent)`
- משקל גופן: 700 (bold)

##### 3. תיאור - `.description`

```tsx
<p className={sharedStyles.description}>טקסט הסבר</p>
```

**מאפיינים:**

- משקל גופן: 400 (regular)
- צבע: `var(--neu-text-tertiary)`
- letter-spacing: 0.13em

## משתני צבע ב-globals.css

```css
/* Light Mode */
--neu-base: #f5f5f5;
--neu-card: #f5f5f5;
--neu-accent: #a87f58;
--neu-icon: var(--neu-accent);
--neu-text-primary: #5e4934;
--neu-text-secondary: #473b31;
--neu-text-tertiary: #9f8572;

/* Dark Mode */
--neu-base: #2d3436;
--neu-card: #2d3436;
--neu-accent: #c9a882;
--neu-icon: var(--neu-accent);
--neu-text-primary: #e8dfd5;
--neu-text-secondary: #d5c9be;
--neu-text-tertiary: #b8a898;
```

## איך להשתמש במערכת

### 1. ייבוא הסטיילים

```tsx
import sharedStyles from "@/app/components/shared/neumorphic.module.css";
```

### 2. שימוש בכפתורים

```tsx
// כפתור CTA
<button className={sharedStyles.ctaButton}>
  התחל עכשיו
</button>

// כפתור ראשי
<button className={sharedStyles.primaryButton}>
  <Share2 className="h-5 w-5" />
  שתף
</button>

// כפתור משני
<button className={sharedStyles.secondaryButton}>
  אישור
</button>

// קישור משני
<Link href="/..." className={sharedStyles.secondaryLink}>
  קרא עוד
</Link>
```

### 3. שילוב עם Tailwind

```tsx
<button
  className={`${sharedStyles.ctaButton} transition-all duration-300 hover:scale-[1.03]`}
>
  כפתור עם אנימציה
</button>
```

### 4. כרטיסים

```tsx
<div className={sharedStyles.neuCard}>
  <div className={sharedStyles.iconInset}>
    <Calculator className="h-10 w-10" />
  </div>

  <h2 className={sharedStyles.headline}>כותרת</h2>

  <p className={sharedStyles.description}>תיאור</p>

  <button className={sharedStyles.ctaButton}>פעולה</button>
</div>
```

## הנחיות עיצוב

### היררכיית כפתורים

1. **CTA Button** - פעולה ראשית אחת בדף (למשל: "התחל עכשיו")
2. **Primary Button** - פעולות משניות חשובות (למשל: "שתף עם חברים")
3. **Secondary Button** - פעולות רגילות (למשל: "אישור", "ביטול")
4. **Secondary Link** - ניווט או מידע משני (למשל: "תנאי שימוש")

### מרווחים מומלצים

- בין כפתורים: `gap: 1.25rem` (20px)
- מתחת לכותרת: `mt: 1.5rem` (24px)
- בין אלמנטים גדולים: `gap: 2rem` (32px)

### נגישות

- כל הכפתורים כוללים `:focus-visible` עם outline בצבע accent
- offset של 3px למיקוד ברור
- כל האייקונים צריכים alt text או aria-label

## דוגמה מלאה

```tsx
import Link from "next/link";
import { Share2, Calculator } from "lucide-react";
import sharedStyles from "@/app/components/shared/neumorphic.module.css";

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

        {/* CTA Button */}
        <button
          className={`${sharedStyles.ctaButton} transition-all duration-300 hover:scale-[1.03]`}
        >
          התחל חישוב
        </button>

        {/* Primary Button */}
        <button
          className={`${sharedStyles.primaryButton} transition-all duration-300 hover:scale-[1.02]`}
        >
          <Share2 className="h-5 w-5" />
          שתף עם חברים
        </button>

        {/* Secondary Link */}
        <Link
          href="/terms"
          className={`${sharedStyles.secondaryLink} transition-all duration-300`}
        >
          תנאי שימוש
        </Link>
      </div>
    </div>
  );
}
```

## עדכונים עתידיים

כאשר צריך להוסיף סגנונות חדשים:

1. הוסף אותם ל-`neumorphic.module.css`
2. עדכן את המסמך הזה
3. שמור על עקביות עם משתני הצבע ב-`globals.css`
4. השתמש ב-naming convention עקבי (camelCase)

---

**תאריך עדכון אחרון:** דצמבר 2024
**גרסה:** 1.0.0
