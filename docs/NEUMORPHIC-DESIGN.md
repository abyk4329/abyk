# מערכת עיצוב ניומורפית – כרטיסיות, הצללות וכפתורים

## תוכן עניינים

1. [עקרונות עיצוב ניומורפי](#עקרונות-עיצוב-ניומורפי)
2. [מערכת הצללות](#מערכת-הצללות)
3. [כרטיסיות (Cards)](#כרטיסיות-cards)
4. [כפתורים (Buttons)](#כפתורים-buttons)
5. [צבעים ומשתנים](#צבעים-ומשתנים)
6. [דוגמאות שימוש](#דוגמאות-שימוש)
7. [עקרונות טיפוגרפיה](#עקרונות-טיפוגרפיה)
8. [אייקונים](#אייקונים)
9. [אנימציות ומעברים](#אנימציות-ומעברים)
10. [פונקציות עזר](#פונקציות-עזר)
11. [מצב כהה](#מצב-כהה)
12. [נגישות](#נגישות-accessibility)
13. [סיכום](#סיכום)
14. [משאבים נוספים](#משאבים-נוספים)

---

## עקרונות עיצוב ניומורפי

### מהו ניומורפיזם?

**Neumorphism** (New + Skeuomorphism) הוא סטייל עיצוב שמדמה אלמנטים פיזיים שצפים או שקועים במשטח אחד רציף.

### עקרונות מרכזיים באפליקציה שלנו

1. **רקע אחיד** – כל האלמנטים על אותו רקע (`#f5f5f5` בהיר / `#2d3436` כהה).
2. **עומק דרך הצללות בלבד** – לא משנים צבעים, רק הצללות.
3. **סימטריה מושלמת** – כל הצללה היא ±X ±X (זהה בשני הצדדים).
4. **הצללות כפולות** – תמיד שילוב של הצללה כהה ובהירה.
5. **מעברים חלקים** – אנימציות של 150‎–300ms.

---

## מערכת הצללות

### מבנה הצללה ניומורפית

כל הצללה מורכבת משני חלקים:

```css
box-shadow:
  /* חלק 1: הצללה כהה (למטה-ימין) */ 8px 8px 16px var(--neu-shadow-dark), /* חלק 2: הצללה בהירה (למעלה-שמאל) */ -8px -8px
    16px var(--neu-shadow-light);
```

זה יוצר אשליה של עומק – כאילו האור מגיע מהפינה השמאלית העליונה.

### משתני הצללה (CSS Variables)

#### מצב בהיר (Light Mode)

```css
:root {
  --neu-shadow-light: rgba(255, 255, 255, 1);
  --neu-shadow-dark: rgba(160, 160, 160, 0.5);
}
```

#### מצב כהה (Dark Mode)

```css
.dark {
  --neu-shadow-light: rgba(55, 65, 70, 0.7);
  --neu-shadow-dark: rgba(12, 16, 18, 0.8);
}
```

### גדלי הצללות

המערכת משתמשת בשלושה גדלים:

#### Small (`sm`)

```css
/* מצב בהיר */
box-shadow: 9px 9px 18px var(--neu-shadow-dark), -9px -9px 18px var(--neu-shadow-light);

/* מצב כהה */
box-shadow: 6px 6px 12px var(--neu-shadow-dark), -6px -6px 12px var(--neu-shadow-light);
```

שימוש: כפתורים משניים, כפתורי אייקון קטנים ותגיות.

#### Medium (`md`)

```css
/* מצב בהיר */
box-shadow: 12px 12px 26px var(--neu-shadow-dark), -10px -10px 24px var(--neu-shadow-light);

/* מצב כהה */
box-shadow: 9px 9px 18px var(--neu-shadow-dark), -7px -7px 16px var(--neu-shadow-light);
```

שימוש: כפתורי CTA ו-Primary, קפסולות תפריט ותיבות Toast.

#### Large (`lg`)

```css
/* מצב בהיר */
box-shadow: 14px 14px 34px var(--neu-shadow-dark), -12px -12px 30px var(--neu-shadow-light);

/* מצב כהה */
box-shadow: 12px 12px 28px var(--neu-shadow-dark), -10px -10px 24px var(--neu-shadow-light);
```

שימוש: כרטיסיות גדולות, מודאלים ומעטפת תפריט צד.

### הצללות שקועות (Inset)

להצללות שקועות (כשהאלמנט "נלחץ" פנימה) מוסיפים `inset`:

```css
/* Medium Inset – מצב בהיר */
box-shadow: inset 9px 9px 18px var(--neu-shadow-dark), inset -3px -3px 8px
    color-mix(in srgb, var(--neu-shadow-light) 65%, transparent);

/* Medium Inset – מצב כהה */
box-shadow: inset 7px 7px 14px var(--neu-shadow-dark), inset -3px -3px 8px
    color-mix(in srgb, var(--neu-shadow-light) 55%, transparent);
```

שימוש: כפתורים בזמן לחיצה וכרטיסיות במצב פעיל.

### טבלת סיכום – גדלי הצללות

| גודל         | Light Mode                                         | Dark Mode                            | שימוש                       |
| ------------ | -------------------------------------------------- | ------------------------------------ | --------------------------- |
| Small        | `9px 9px 18px`                                     | `6px 6px 12px`                       | כפתורים משניים ואייקונים    |
| Medium       | `12px 12px 26px`                                   | `9px 9px 18px`                       | כפתורי CTA/Primary          |
| Large        | `14px 14px 34px`                                   | `12px 12px 28px`                     | כרטיסיות ומודאלים           |
| Small Inset  | `inset 7px 7px 14px`                               | `inset 5px 5px 10px`                 | שדות קלט                    |
| Medium Inset | `inset 9px 9px 18px` + highlight mix               | `inset 7px 7px 14px` + highlight mix | כפתורים לחוצים              |
| Large Inset  | `inset 12px 12px 24px` + עדכון highlight לפי הצורך | `inset 10px 10px 20px`               | מעטפת פעילה / אזורים שקועים |

---

## כרטיסיות (Cards)

### עיצוב בסיסי

כרטיסיה ניומורפית נראית כמו אלמנט שצף מעל הרקע.

```tsx
<NeuCard size="lg" isDark={isDark}>
  {/* תוכן הכרטיסייה */}
</NeuCard>
```

### מאפיינים

#### גדלים

```tsx
size = "sm"; // rounded-[1.5rem] + padding: 1.5rem (24px)
size = "md"; // rounded-[2rem] + padding: 2rem (32px)
size = "lg"; // rounded-[2.5rem] + padding: 2.5rem-3rem (40-48px)
```

#### סטייל

```tsx
{
  backgroundColor: "var(--neu-card)",
  boxShadow: getNeuShadow("lg", "elevated", isDark),
  transition: "all 500ms ease-out",
}
```

#### דוגמה מלאה

```tsx
<div
  className="rounded-[2.5rem] p-10 md:p-12 transition-all duration-500"
  style={{
    backgroundColor: "var(--neu-card)",
    boxShadow: isDark
      ? "12px 12px 28px var(--neu-shadow-dark), -10px -10px 24px var(--neu-shadow-light)"
      : "14px 14px 34px var(--neu-shadow-dark), -12px -12px 30px var(--neu-shadow-light)",
  }}
>
  <h1>כותרת</h1>
  <p>תוכן הכרטיסייה</p>
</div>
```

#### פינות מעוגלות

```text
┌─────────────────────────────┐
│ Small: 1.5rem (24px)       │
│ Medium: 2rem (32px)        │
│ Large: 2.5rem (40px)       │
└─────────────────────────────┘
```

ככל שהכרטיסייה גדולה יותר, הפינות מעוגלות יותר.

---

## כפתורים (Buttons)

### סוגי כפתורים

באפליקציה קיימים שלושה סוגים עיקריים.

#### 1. כפתור CTA (Call To Action)

```tsx
<NeuButton variant="cta" size="lg" isDark={isDark}>
  מחשבון קוד העושר
</NeuButton>
```

מאפיינים: רקע זהב `var(--neu-accent)`, טקסט בהיר, הצללה בגודל Medium, משקל פונט 600 ואפקט inset (הצללה שקועה בצבע `#8a6b4f` + scale 0.98) בעת לחיצה.

#### 2. כפתור Primary

```tsx
<NeuButton variant="primary" size="md" isDark={isDark}>
  חשב את הקוד
</NeuButton>
```

מאפיינים: רקע זהה לרקע הכללי, טקסט ומסגרת זהב, הצללה Medium, משקל 500 ואפקט inset בלחיצה.

#### 3. כפתור Secondary

```tsx
<NeuButton variant="secondary" size="md" isDark={isDark}>
  תנאי שימוש
</NeuButton>
```

מאפיינים: רקע נייטרלי, טקסט ראשי, הצללה Small וללא אפקט inset.

### גדלי כפתורים

```tsx
size = "sm"; // py-3 px-6
size = "md"; // py-4 px-7
size = "lg"; // py-5 px-7
```

### גדלי פונט בעזרת `clamp()`

```tsx
sm: "clamp(0.9375rem, 2.5vw, 1rem)";
md: "clamp(1rem, 2.5vw, 1.125rem)";
lg: "clamp(1.0625rem, 2.5vw, 1.1875rem)";
```

### התנהגות בזמן לחיצה

```tsx
// מצב רגיל
{
  boxShadow: "12px 12px 26px ..., -10px -10px 24px ...",
  transform: "scale(1)",
}

// בזמן לחיצה
{
  boxShadow: "inset 9px 9px 18px ..., inset -3px -3px 8px ...",
  transform: "scale(0.98)",
}
```

### טבלת השוואה – סוגי כפתורים

| מאפיין     | CTA         | Primary     | Secondary |
| ---------- | ----------- | ----------- | --------- |
| רקע        | זהב         | שקוף        | שקוף      |
| טקסט       | לבן         | זהב         | טקסט רגיל |
| מסגרת      | אין         | זהב 2px     | אין       |
| הצללה      | Medium      | Medium      | Small     |
| משקל פונט  | 600         | 500         | 500       |
| אפקט לחיצה | ✓           | ✓           | ✗         |
| שימוש      | פעולה ראשית | פעולה משנית | קישורים   |

---

## כפתורי אייקונים (Icon Buttons)

```tsx
<NeuIconButton size="md" isDark={isDark} icon={<Menu strokeWidth={1} />} />
```

גדלים נפוצים: `48px`, `56px`, `64px`. הצללה בגודל Medium Plus, `hover:scale-105` ו-`active:scale-95`. ברירת המחדל היא `strokeWidth={1}`, למעט האייקונים הדקורטיביים שמרחפים מעל כותרות בכרטיסיות הגדולות (שם משתמשים ב-`strokeWidth={0.5}`).

---

## צבעים ומשתנים

### מצב בהיר

```css
:root {
  --neu-base: #f5f5f5;
  --neu-card: #f5f5f5;
  --neu-accent: #a87f58;
  --neu-text-primary: #5e4934;
  --neu-text-secondary: #473b31;
}
```

### מצב כהה (Dark Palette)

```css
.dark {
  --neu-base: #2d3436;
  --neu-card: #2d3436;
  --neu-accent: #c9a882;
  --neu-text-primary: #f5f0eb;
  --neu-text-secondary: #d4c9be;
}
```

אותו צבע לרקע ולכרטיסיות הוא תנאי בסיסי לניומורפיזם; ההצללות יוצרות את העומק.

---

## דוגמאות שימוש

### כרטיסייה עם כפתור CTA

```tsx
<NeuCard size="lg" isDark={isDark}>
  <h1
    style={{
      color: "var(--neu-text-primary)",
      fontSize: "clamp(2rem, 6vw, 3rem)",
      fontWeight: 700,
    }}
  >
    כותרת ראשית
  </h1>
  <p
    style={{
      color: "var(--neu-text-secondary)",
      fontSize: "clamp(0.875rem, 2.5vw, 1.0625rem)",
      lineHeight: 1.6,
    }}
  >
    תיאור קצר
  </p>
  <NeuButton variant="cta" size="lg" isDark={isDark}>
    לחץ כאן
  </NeuButton>
</NeuCard>
```

### שדה קלט ניומורפי

```tsx
<NeuInput
  isDark={isDark}
  label="אימייל"
  type="email"
  placeholder="example@email.com"
/>
```

```tsx
{
  backgroundColor: "var(--neu-card)",
  boxShadow: getNeuShadow("sm", "inset", isDark),
  color: "var(--neu-text-primary)",
}
```

### רשת כפתורים

```tsx
<div className="flex gap-4">
  <NeuButton variant="cta" isDark={isDark}>
    שמור
  </NeuButton>
  <NeuButton variant="primary" isDark={isDark}>
    ביטול
  </NeuButton>
  <NeuButton variant="secondary" isDark={isDark}>
    עזרה
  </NeuButton>
</div>
```

---

## עקרונות טיפוגרפיה

1. אין שימוש בכיתות Tailwind לפונט – רק inline styles או utilities ייעודיים.
2. פונט יחיד: **Assistant** במשקלים 300‎–700.
3. כפתורים וכותרות מוגדרים עם `white-space: nowrap`.
4. `letter-spacing: 0.13em` לכפתורים ולטקסטים מוטי מותג.
5. גודל מינימלי: 16px לכפתורים, 14px לטקסטים קטנים.

### משקלי פונט

```text
300 – Light
400 – Regular
500 – Medium
600 – Semi Bold
700 – Bold
```

### גדלים רספונסיביים

```tsx
// כותרת גדולה
fontSize: "clamp(2rem, 6vw, 3rem)";

// כותרת בינונית
fontSize: "clamp(1.5rem, 4vw, 2rem)";

// כפתור גדול
fontSize: "clamp(1.0625rem, 2.5vw, 1.1875rem)";

// כפתור רגיל
fontSize: "clamp(1rem, 2.5vw, 1.125rem)";

// טקסט רגיל
fontSize: "clamp(0.875rem, 2.5vw, 1.0625rem)";
```

---

## אייקונים

ברירת המחדל היא `strokeWidth={1}` לקבלת מראה חד וברור על רקע הניומורפיזם. החריגה היחידה: אייקונים דקורטיביים שמופיעים מעל כותרות בכרטיסיות גדולות (Hero, מחשבון, תנאים) משתמשים ב-`strokeWidth={0.5}` כדי לשמור על תחושה קלילה.

```tsx
<Menu strokeWidth={1} className="w-5 h-5" />
<Moon strokeWidth={1} className="w-5 h-5" />
<LogIn strokeWidth={1} className="w-5 h-5" />
<TikTokStrokeIcon className="w-5 h-5" />
```

> טיפ: `TikTokStrokeIcon` בקובץ `app/components/shared/icons.tsx` מצייר את הסמל עם גבעול מודגש וראש תו מעוגל, כך שהוא שומר על אותו משקל קו אבל נראה מזוהה יותר עם המותג.

גדלים נפוצים: `16px`, `20px`, `24px`, `40px` לכרטיסיות.

---

## אנימציות ומעברים

### משכי אנימציה סטנדרטיים

```text
duration-150 // אינטראקציות מהירות
duration-300 // hover
duration-500 // שינויי מצב
```

### Easing

```css
transition: all 150ms ease-out;
transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
```

### אפקטי Scale

```text
hover:scale-[1.02]
hover:scale-105
active:scale-[0.98]
active:scale-95
```

---

## פונקציות עזר

### `getNeuShadow()`

```tsx
import { getNeuShadow } from "@/lib/neu-styles";

const shadow = getNeuShadow("md", "elevated", isDark);
```

### `neuTypography`

```tsx
import { neuTypography } from "@/lib/neu-styles";

<button
  style={{
    ...neuTypography.buttonCta,
    fontSize: "clamp(1.0625rem, 2.5vw, 1.1875rem)",
  }}
>
  לחץ כאן
</button>;
```

---

## מצב כהה

התהליך:

1. לחיצה על כפתור השמש/ירח.
2. `toggleTheme()` משנה את `isDark`.
3. `document.documentElement.classList.toggle("dark")` מעדכן את ה-`class`.
4. משתני CSS מחליפים ערכים בין מצב בהיר לכהה.
5. קומפוננטות מקבלות את `isDark` כדי לחשב הצללות וצבעים.

### הבדלים עיקריים

| מאפיין | Light     | Dark      |
| ------ | --------- | --------- |
| רקע    | `#f5f5f5` | `#2d3436` |
| זהב    | `#a87f58` | `#c9a882` |
| טקסט   | `#5e4934` | `#f5f0eb` |
| הצללות | חזקות     | עדינות    |

---

## נגישות (Accessibility)

- כל הצבעים עומדים ב-WCAG AA.
- כפתורי אייקונים כוללים `aria-label`.
- מצבי focus מוגדרים גלובלית באמצעות `outline` מותאם.

---

## סיכום

### Do's

- שימוש עקבי ב-`getNeuShadow()`.
- אפקט לחיצה לכל CTA/Primary.
- `strokeWidth={1}` לאייקונים.
- `letter-spacing: 0.13em` לכפתורים.
- אותו צבע לרקע ולכרטיסיות.
- הצללות סימטריות בלבד.

### Don'ts

- אין כיתות Tailwind לפונט.
- אין שינויי צבע לצורך עומק.
- אין הצללות לא סימטריות.
- לא לשכוח את `isDark`.
- אין ערבוב פונטים אחרים.
- אין כפתור CTA ללא אפקט לחיצה.

---

## משאבים נוספים

- `lib/neu-styles.ts`
- `components/neu/`
- `app/globals.css`
- `components/pages/HomePage.tsx`

---

**עודכן לאחרונה:** אוקטובר 2025  
**גרסה:** 1.0  
**עיצוב:** Neumorphic Design System
