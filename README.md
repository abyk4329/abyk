# 🌟 Awakening by Ksenia - קוד העושר

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/abyk4329/abyk)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/abyk4329/abyk)

אתר נומרולוגי מקצועי לחישוב וניתוח "קוד העושר" האישי - מערכת נומרולוגית המבוססת על תאריך לידה ומספקת תובנות עמוקות לצמיחה אישית והכרה עצמית.

## 📱 **עריכה מהטלפון**

> 📖 **[מדריך מהיר - לחץ כאן!](./QUICK_START_MOBILE.md)** | 📚 **[מדריך מפורט](./MOBILE_EDITING_GUIDE.md)**

### אפשרות 1: GitHub Codespaces (מומלץ! 🌟)
VS Code מלא בדפדפן עם כל הסביבה מוכנה:
1. לחץ על הכפתור "Open in GitHub Codespaces" למעלה
2. או: גש ל-[github.com/abyk4329/abyk](https://github.com/abyk4329/abyk)
3. לחץ על `Code` → `Codespaces` → `New codespace`
4. המתן שהסביבה תיבנה (דקה או שתיים)
5. הקלד `pnpm dev` בטרמינל
6. לחץ על הפורט שנפתח (3000) לראות preview

**חינם**: 60 שעות בחודש! 🎁

### אפשרות 2: github.dev (מהיר!)
1. גש ל-[github.com/abyk4329/abyk](https://github.com/abyk4329/abyk)
2. לחץ על `.` (נקודה) על המקלדת
3. העורך ייפתח מיד! ⚡
4. (אין אפשרות להריץ סרבר, רק לערוך קבצים)

### אפשרות 3: אפליקציות מובייל
- **GitHub Mobile** - עריכה בסיסית וניהול PR
- **Working Copy** (iOS) - Git client מקצועי
- **Spck Editor** (Android/iOS) - IDE מלא למובייל

## ✨ תכונות עיקריות

- 🧮 **מחשבון קוד עושר חינמי** - חישוב אוטומטי של קוד נומרולוגי אישי
- 📊 **ניתוח בסיסי** - הסבר ראשוני על משמעות הקוד
- 📖 **פירוש מפורט** - ניתוח עמיק של כל ספרה בקוד (בתשלום)
- 💳 **אינטגרציית תשלום** - Grow Payment למכירת הפירוש המלא
- 📧 **שליחת מייל אוטומטית** - הפירוש נשלח ישירות למייל הלקוח
- 📱 **PWA Support** - אפליקציה למסך הבית (iOS & Android)
- 🎨 **עיצוב Glassmorphism** - עיצוב מודרני ויוקרתי
- 🌐 **RTL Support** - תמיכה מלאה בעברית מימין לשמאל
- 📲 **Responsive Design** - עובד מעולה על כל המכשירים

## 🛠 טכנולוגיות

- **Next.js 14** - React framework עם App Router
- **TypeScript** - טיפוסים סטטיים
- **Tailwind CSS** - עיצוב
- **Framer Motion** - אנימציות
- **Lucide React** - אייקונים
- **Shadcn/ui** - קומפוננטות UI
- **html2canvas + jsPDF** - יצירת PDF

## 📦 התקנה

```bash
# Clone the repository
git clone https://github.com/your-username/ABYK.git

# Navigate to project directory
cd ABYK

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Run development server
pnpm dev
```

## 🔧 הגדרת Environment Variables

ערוך את קובץ `.env.local` והוסף את הפרטים שלך:

```env
# Email Configuration
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"

# Payment Link
NEXT_PUBLIC_GROW_PAYMENT_LINK="https://pay.grow.link/your-link"

# Domain
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### 📧 הגדרת Gmail SMTP

1. עבור ל-[Google Account Security](https://myaccount.google.com/security)
2. הפעל "2-Step Verification"
3. צור "App Password" עבור האפליקציה
4. השתמש ב-App Password ב-`EMAIL_PASSWORD`

## 🚀 Scripts

```bash
pnpm dev          # Run development server (localhost:3000)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 📁 מבנה הפרויקט

```
ABYK/
├── app/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Navigation
│   │   ├── sections/        # Page sections (Hero, Calculator, etc.)
│   │   ├── shared/          # Shared components (GlassButton)
│   │   └── ui/              # Shadcn UI components
│   ├── calculator/          # Calculator page
│   ├── result/              # Results page
│   ├── interpretations/     # Full interpretation page
│   ├── sales/               # Sales page
│   ├── thank-you/           # Thank you page
│   ├── terms/               # Terms & Privacy page
│   ├── design/              # Design showcase (dev only)
│   ├── nav/                 # Navigation page (dev only)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── data/
│   ├── digitInterpretations.ts  # Digit meanings (0-9)
│   ├── codeStructures.ts        # Code types
│   └── dailyApplication.ts      # Daily practices
├── lib/
│   └── utils.ts             # Utility functions
├── public/
│   ├── images/              # Images
│   └── fonts/               # Custom fonts
└── figmawebdesign/          # Original Figma export (reference)
```

## 🎯 זרימת המשתמש

```
1. Hero (דף הבית) → לחיצה על "מחשבון קוד העושר"
2. Calculator → הזנת תאריך לידה → חישוב הקוד
3. Result → הצגת הקוד + ניתוח ראשוני
4. Sales Page → הצגת הפירוש המלא + כפתור רכישה
5. Payment (Grow) → תשלום ₪34
6. Thank You → אישור + לינק לפירוש
7. Interpretations → הפירוש המלא + הורדת PDF
```

## 🎨 מערכת העיצוב

### פלטת צבעים
```css
--brown-dark: #473b31      /* טקסט כהה */
--brown-heading: #5e4934   /* כותרות H1 */
--brown-bronze: #87674F    /* כותרות H2-H4 */
--brown-neutral: #9f8572   /* Caption */
--beige: #d3c6bd           /* אלמנטים משניים */
--white-cream: #fdfcfb     /* רקע */
```

### טיפוגרפיה
- **פונט**: Assistant (Google Fonts)
- **כיוון**: RTL + מיושר למרכז
- **Responsive**: Mobile-first design

### Glassmorphism
```css
backdrop-blur-xl
bg-white/15
shadow-[...]
```

## 📱 PWA

האתר תומך בהתקנה למסך הבית:

### iOS
1. פתח ב-Safari
2. לחץ על כפתור שיתוף
3. בחר "Add to Home Screen"

### Android
1. פתח ב-Chrome
2. תפריט → "Add to Home screen"

## 🚀 Deploy ל-Vercel

```bash
# Connect to Vercel
vercel

# Deploy to production
vercel --prod
```

### הגדרות Vercel
1. הוסף את כל ה-Environment Variables מ-`.env.example`
2. הגדר את ה-Domain שלך
3. הפעל Automatic Deployments מ-GitHub

## 🔗 קישורים

- **Production**: https://abyk.online
- **Instagram**: [@awakening_byksenia](https://instagram.com/awakening_byksenia)
- **TikTok**: [@awakening_byksenia](https://tiktok.com/@awakening_byksenia)
- **WhatsApp**: [+972-52-560-6008](https://wa.me/972525606008)

## 📄 License

© 2025 Awakening by Ksenia. All rights reserved.

---

**Built with ❤️ using Next.js 14 & TypeScript**
