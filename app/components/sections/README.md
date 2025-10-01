# תיקיית Section Components

תיקייה זו מיועדת לחלקים גדולים בעמוד המיוצאים מפיגמה:

## קומפוננטים מומלצים
- `Hero.tsx` - קטע פתיחה ראשי
- `Features.tsx` - תכונות / יתרונות
- `Testimonials.tsx` - המלצות לקוחות
- `Pricing.tsx` - מחירים
- `Contact.tsx` - יצירת קשר / טופס
- `Gallery.tsx` - גלריית תמונות
- `Team.tsx` - צוות

## דוגמת שימוש
```tsx
import { Hero } from "@/app/components/sections/Hero";

<Hero 
  title="ברוכים הבאים"
  subtitle="תיאור קצר"
  ctaText="התחל עכשיו"
/>
```
