# הוראות שימוש בפונטים מותאמים אישית

## שלב 1: העתק את קבצי הפונטים
העתק את קבצי הפונטים שלך (`.woff2`, `.woff`, `.ttf`, או `.otf`) לתיקייה:
```
public/fonts/
```

## שלב 2: עדכן את app/fonts.ts
פתח את `app/fonts.ts` ועדכן את שמות הקבצים בהתאם לפונטים שלך:

```typescript
export const customFont = localFont({
  src: [
    {
      path: "../public/fonts/שם-הפונט-שלך-Regular.woff2",  // החלף כאן
      weight: "400",
      style: "normal"
    },
    {
      path: "../public/fonts/שם-הפונט-שלך-Bold.woff2",     // החלף כאן
      weight: "700",
      style: "normal"
    }
  ],
  variable: "--font-custom",
  display: "swap"
});
```

## שלב 3: חבר את הפונט ל-layout.tsx
הוסף את השורות הבאות ל-`app/layout.tsx`:

### בתחילת הקובץ:
```typescript
import { customFont } from "./fonts";
```

### ב-body tag:
```typescript
<body className={`${customFont.variable} flex min-h-screen flex-col`}>
```

## שלב 4: עדכן את globals.css
הוסף לקובץ `app/globals.css`:

```css
html {
  font-family: var(--font-custom), system-ui, sans-serif;
}
```

---

## אפשרות חלופית: שימוש בפונטים של Google Fonts
אם אין לך פונטים מותאמים אישית, תוכל להשתמש בפונטים עבריים מוכנים:

```typescript
// app/fonts.ts
import { Rubik } from "next/font/google";

export const hebrewFont = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-hebrew",
  display: "swap"
});
```

ואז להשתמש ב-`hebrewFont.variable` ב-layout.
