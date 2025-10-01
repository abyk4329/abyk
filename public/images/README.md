# תיקיית תמונות

העתק לכאן את כל התמונות המיוצאות מפיגמה.

## המלצות
- **פורמט**: WebP (הכי קל) או PNG
- **גודל**: ייצא ב-2x לצגים ברזולוציה גבוהה
- **שמות**: השתמש בשמות ברורים באנגלית (לדוגמה: `hero-background.webp`, `product-1.png`)

## מבנה מומלץ
```
images/
├── hero/
│   ├── hero-bg.webp
│   └── hero-illustration.webp
├── products/
│   ├── product-1.webp
│   └── product-2.webp
└── team/
    ├── member-1.webp
    └── member-2.webp
```

## שימוש בקוד
```tsx
import Image from "next/image";

<Image 
  src="/images/hero/hero-bg.webp"
  alt="תיאור התמונה"
  width={1920}
  height={1080}
  priority
/>
```
