# 🎨 מדריך ייבוא עיצוב מפיגמה

מדריך שלב אחר שלב לייבוא עיצוב מפיגמה לפרויקט Next.js + Tailwind + RTL.

---

## 📋 שלב 1: הכנה בפיגמה

### ✅ לפני הייצוא, ודאי ש:
- [ ] כל השכבות עם שמות ברורים באנגלית
- [ ] השתמשת ב-**Auto Layout** על כל הקונטיינרים
- [ ] הגדרת **Styles** לצבעים וטקסטים חוזרים
- [ ] הגדרת **Variables** לצבעים, מרווחים, רדיוסים
- [ ] הפכת אלמנטים חוזרים ל-**Components**
- [ ] סימנת תמונות לייצוא (Export)

### 🎯 שמות פונטים
ודאי ששמות הפונטים בפיגמה תואמים לקבצים ב-`public/fonts/`

---

## 📦 שלב 2: ייצוא מפיגמה

### אפשרות א': Figma Dev Mode (ידני)
1. לחץ על `</> Dev Mode` בפיגמה
2. בחר אלמנט
3. העתק CSS/Tailwind
4. המר ידנית ל-JSX בקומפוננטים

### אפשרות ב': Locofy Lightning (מומלץ)
1. פתח את ה-Plugin: `Resources` → חפש **"Locofy Lightning"**
2. בחר את הפריים לייצוא
3. בחר **Next.js + Tailwind CSS**
4. לחץ על **Export Code**
5. הורד את הקובץ ZIP

### אפשרות ג': Anima
1. פתח את ה-Plugin: `Resources` → חפש **"Anima"**
2. בחר את הפריים
3. בחר **React + Tailwind**
4. ייצא והורד

---

## 📂 שלב 3: העתקת קבצים

### 1️⃣ **קומפוננטים**
קבצי `.tsx` / `.jsx` מהייצוא:

```
app/components/
├── ui/           ← כפתורים, inputs, cards
├── layout/       ← Header, Footer, Navigation
└── sections/     ← Hero, Features, Contact
```

### 2️⃣ **תמונות**
העתק תמונות (`.webp`, `.png`, `.jpg`) ל:
```
public/images/
```

### 3️⃣ **אייקונים**
העתק SVG ל:
```
public/icons/
```

### 4️⃣ **פונטים**
כבר מוכן! הפונטים שלך ב-`public/fonts/`

---

## 🔧 שלב 4: התאמות קוד

### א. עדכון נתיבי import
החלף בכל הקבצים המיוצאים:

```tsx
// ❌ לפני (מהייצוא)
import Button from "../components/Button";

// ✅ אחרי
import { Button } from "@/app/components/ui/Button";
```

### ב. עדכון נתיבי תמונות
```tsx
// ❌ לפני
<img src="assets/hero.png" />

// ✅ אחרי
import Image from "next/image";

<Image 
  src="/images/hero.webp"
  alt="תיאור"
  width={1920}
  height={1080}
/>
```

### ג. שימוש בפונקציית cn()
```tsx
// ❌ לפני
<div className={`base-class ${isActive ? "active-class" : ""}`}>

// ✅ אחרי
import { cn } from "@/lib/utils";

<div className={cn("base-class", isActive && "active-class")}>
```

### ד. חיבור פונטים
אם עדכנת את `app/fonts.ts`, הוסף ל-`app/layout.tsx`:

```tsx
import { customFont } from "./fonts";

<body className={cn(customFont.variable, "...")}>
```

---

## 🎨 שלב 5: עדכון משתני Tailwind

### פתח את `tailwind.config.ts` והוסף צבעים מפיגמה:

```typescript
colors: {
  // צבעי Brand
  primary: "#3B82F6",      // כחול ראשי
  secondary: "#10B981",    // ירוק משני
  accent: "#F59E0B",       // צהוב הדגשה
  
  // צבעי טקסט
  foreground: "hsl(var(--foreground))",
  muted: "#6B7280",
  
  // רקעים
  background: "hsl(var(--background))",
  card: "hsl(var(--card))",
}
```

---

## ✅ שלב 6: בדיקה ותיקונים

### בדוק:
- [ ] כל התמונות נטענות
- [ ] הפונטים מוצגים נכון
- [ ] RTL עובד (טקסט עברי מימין לשמאל)
- [ ] צבעים תואמים לפיגמה
- [ ] מרווחים ורדיוסים תואמים
- [ ] אין שגיאות TypeScript
- [ ] העיצוב responsive (נייד + דסקטופ)

### הרץ בדיקה:
```bash
pnpm dev
```
פתח http://localhost:3000

---

## 🐛 פתרון בעיות נפוצות

### בעיה: "Cannot find module '@/...'"
**פתרון**: ודא ש-`tsconfig.json` מכיל:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### בעיה: תמונות לא נטענות
**פתרון**: ודא שהנתיב מתחיל ב-`/` (לדוגמה: `/images/hero.webp`)

### בעיה: פונטים לא עובדים
**פתרון**: 
1. בדוק ש-`app/fonts.ts` מכיל נתיבים נכונים
2. בדוק שהפונט מחובר ב-`app/layout.tsx`
3. בדוק ש-`globals.css` מכיל: `font-family: var(--font-custom)`

### בעיה: RTL לא עובד
**פתרון**: ודא ש-`<html dir="rtl">` ב-`app/layout.tsx`

---

## 🎯 סיכום - קובץ מעקב

```markdown
☐ ייצוא מפיגמה (Locofy/Anima/ידני)
☐ העתקת קומפוננטים ל-app/components/
☐ העתקת תמונות ל-public/images/
☐ העתקת אייקונים ל-public/icons/
☐ עדכון נתיבי import בקומפוננטים
☐ עדכון נתיבי תמונות
☐ שימוש בפונקציית cn()
☐ חיבור פונטים ב-layout
☐ עדכון צבעים ב-tailwind.config.ts
☐ בדיקת תצוגה ב-localhost:3000
☐ תיקון בעיות RTL (אם יש)
☐ בדיקת responsive (נייד + דסקטופ)
```

---

**זקוק לעזרה?** פתח issue או שאל בצ'אט! 🚀
