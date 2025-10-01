# תיקיית אייקונים

העתק לכאן את כל האייקונים המיוצאים מפיגמה בפורמט SVG.

## המלצות
- **פורמט**: SVG (וקטורי, קל ומדויק)
- **אופטימיזציה**: השתמש ב-SVGO או ייצוא "Clean SVG" מפיגמה
- **שמות**: שמות ברורים באנגלית (לדוגמה: `icon-search.svg`, `icon-menu.svg`)

## מבנה מומלץ
```
icons/
├── icon-search.svg
├── icon-menu.svg
├── icon-close.svg
├── icon-arrow-left.svg
└── icon-arrow-right.svg
```

## שימוש בקוד

### אופציה 1: כ-img
```tsx
<img src="/icons/icon-search.svg" alt="חיפוש" className="w-6 h-6" />
```

### אופציה 2: inline SVG (מומלץ לאייקונים קטנים)
```tsx
import SearchIcon from "@/public/icons/icon-search.svg";

<SearchIcon className="w-6 h-6 text-foreground" />
```

### אופציה 3: עם next/image
```tsx
import Image from "next/image";

<Image 
  src="/icons/icon-search.svg"
  alt="חיפוש"
  width={24}
  height={24}
/>
```
