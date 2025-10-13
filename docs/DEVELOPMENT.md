# 🚀 מדריך פיתוח - ABYK Development Guide

## סביבת פיתוח

### דרישות מקדימות

- **Node.js**: 22.x (מומלץ 22.20.0)
- **pnpm**: >= 9.x (מומלץ 10.18.0)
- **Git**: >= 2.x

### התקנה ראשונית

```bash
# Clone the repository
git clone https://github.com/abyk4329/abyk.git
cd abyk

# Install Node.js 22 (using n)
sudo n 22

# Install pnpm
npm install -g pnpm@10.18.0

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# ערוך .env.local עם המפתחות שלך

# Run development server
pnpm dev
```

הפרויקט זמין ב: http://localhost:3000

---

## 🔄 אסטרטגיית ענפים (Branching Strategy)

ראה קובץ מפורט: [BRANCHING.md](./BRANCHING.md)

### סיכום מהיר

- **`main`** - קוד בפרודקשן, מוגן, דורש approval
- **`develop`** - ענף הפיתוח הראשי
- **`feature/*`** - פיצ'רים חדשים
- **`bugfix/*`** - תיקוני באגים
- **`hotfix/*`** - תיקונים דחופים לפרודקשן

---

## 📁 מבנה הפרויקט

```
abyk/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── generate-pdf/     # יצירת PDF
│   │   ├── send-email/       # שליחת מייל
│   │   └── webhooks/         # Webhooks (Grow payment)
│   ├── components/           # UI Components
│   │   ├── sections/         # קומפוננטות גדולות לפי עמוד
│   │   ├── shared/           # קומפוננטות משותפות (כפתורים, כרטיסים)
│   │   └── lib/              # Utilities (neumorphism styles)
│   ├── calculator/           # עמוד מחשבון
│   ├── result/               # עמוד תוצאות
│   ├── interpretations/      # עמוד פירושים
│   ├── sales/                # עמוד מכירות
│   ├── thank-you/            # עמוד תודה
│   ├── privacy/              # תנאי שימוש
│   ├── terms/                # מדיניות פרטיות
│   ├── design/               # 🎨 Design Showcase (DEV ONLY)
│   ├── globals.css           # סגנונות גלובליים
│   ├── layout.tsx            # Layout ראשי
│   └── page.tsx              # דף הבית
├── features/                 # מודולים עסקיים
│   └── wealth-code/          # המחשבון, ה-PDF והמיילים של Wealth Code
├── lib/                      # Utilities ותצורות ליבה (branding, email, pdf)
├── design-system/            # 🎨 ספריית עיצוב (DEV ONLY)
│   ├── components/           # קומפוננטות דמו
│   └── README.md             # מסמך הסבר
├── docs/                     # תיעוד
│   ├── archive/              # קבצים היסטוריים
│   └── guides/               # מדריכים
├── public/                   # קבצים סטטיים
│   ├── brand/                # לוגו ומיתוג
│   ├── og/                   # תמונות שיתוף
│   └── email/                # אסטים למייל
├── prisma/                   # Database schema (עתידי)
└── tests/                    # E2E tests (Playwright)
```

---

## 🛠 פקודות נפוצות

### פיתוח

```bash
pnpm dev          # הרצת development server
pnpm build        # בניית גרסת production
pnpm start        # הרצת production build
pnpm lint         # בדיקת lint
pnpm test:e2e     # הרצת Playwright tests
```

### Git Workflow

```bash
# יצירת ענף חדש לפיצ'ר
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication

# עבודה על הענף
git add .
git commit -m "feat: add user login form"
git push origin feature/user-authentication

# פתיחת PR ב-GitHub
# develop ← feature/user-authentication
```

---

## 🎨 Design Showcase (Development Only)

עמוד ה-design (`/design`) הוא כלי פיתוח בלבד ו**אינו מיועד לפרודקשן**.

### גישה לעמוד

- **Development**: `http://localhost:3000/design` ✅
- **Production**: חסום באמצעות environment variable ❌

### הגדרה

ב-`.env.local`:

```bash
NEXT_PUBLIC_SHOW_DESIGN=true    # development
```

ב-production (Vercel):

```bash
NEXT_PUBLIC_SHOW_DESIGN=false   # או לא להגדיר בכלל
```

הקוד בעמוד הזה אינו מומלץ לשימוש בפרודקשן ומסומן בהערות `DEV-ONLY`.

---

## 📧 מערכת מייל

### Providers

1. **Resend** (ראשי) - Modern email API
2. **Gmail SMTP** (גיבוי) - Nodemailer fallback

### Configuration

```bash
# .env.local
RESEND_API_KEY="re_..."
EMAIL_FROM="AWAKENING BY KSENIA <no-reply@abyk.online>"

# Gmail fallback
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
EMAIL_USER="awakening.by.ksenia@gmail.com"
EMAIL_PASSWORD="your_app_password"

# Testing
TEST_EMAIL="your-test@email.com"
MAIL_TEST_MODE="0"  # 1 = force test mode
```

### API Endpoints

- `POST /api/send-email` - שליחת מייל עם PDF
- `POST /api/generate-pdf` - יצירת PDF
- `POST /api/webhooks/grow` - webhook לתשלומי Grow

---

## 🧪 Testing

### E2E Tests (Playwright)

```bash
pnpm test:e2e           # הרצת כל הבדיקות
pnpm test:e2e --ui      # UI mode
pnpm test:e2e --headed  # עם דפדפן גלוי
```

### Manual Testing Checklist

- [ ] Calculator flow: תאריך → קוד
- [ ] Result page: תצוגת קוד וניווט
- [ ] Sales page: כפתורי תשלום
- [ ] Thank you: PDF download + שיתוף
- [ ] Mobile: iOS + Android
- [ ] Email: קבלת מייל עם PDF

---

## 🔒 אבטחה

### Environment Variables

- ⚠️ **אף פעם** אל תעלה `.env.local` ל-Git
- ⚠️ השתמש ב-App Password ל-Gmail (לא סיסמה רגילה)
- ⚠️ שמור API Keys ב-Vercel Environment Variables

#### משתנים חשובים

- `RESEND_API_KEY`, `EMAIL_FROM` — שליחת מיילים דרך Resend.
- `SMTP_*` — גיבוי לשליחת מיילים דרך Gmail.
- `GROW_WEBHOOK_SECRET` — אבטחת ה-webhook מתשלומי Grow.
- `TEST_EMAIL`, `MAIL_TEST_MODE` — בדיקות לוקאליות.
- `SENTRY_DSN` — הפעלת ניטור Sentry (אם ריק, הניטור יכבה אוטומטית).
- `SENTRY_TRACES_SAMPLE_RATE`, `SENTRY_PROFILES_SAMPLE_RATE` — כיוונון עומס Sentry (ברירת מחדל: 1.0 בדב, 0.1 בפרודקשן).

### Sensitive Data

כל המידע הרגיש נמצא ב:

- `.env.local` (מקומי)
- Vercel Dashboard → Project Settings → Environment Variables (פרודקשן)

---

## 📱 PWA (Progressive Web App)

הפרויקט כולל manifest.json והגדרות PWA:

- אייקונים: `public/ABYKICON.png`
- Manifest: auto-generated by Next.js
- תמיכה ב-"Add to Home Screen"

---

## 🚀 Deployment

### Vercel (מומלץ)

1. Push לענף `main`
2. Vercel מזהה אוטומטית ומפרסם
3. וודא שכל Environment Variables מוגדרים

### Manual Deploy

```bash
vercel --prod
```

---

## 🐛 Troubleshooting

### Build fails with "ENOTFOUND fonts.googleapis.com"

זו בעיה של חיבור רשת. הפונט Assistant נמשך מ-Google Fonts.
אם אתה מאחורי חומת אש או בסביבה מוגבלת, שקול להוריד את הפונט לוקאלית.

### "pnpm: command not found"

```bash
npm install -g pnpm@10.18.0
```

### Node version incompatible

```bash
sudo n 22
node --version  # should show v22.x
```

---

## 📚 משאבים נוספים

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React 19 Documentation](https://react.dev)
- [Resend API](https://resend.com/docs)
- [Playwright Testing](https://playwright.dev)

---

## 👥 צוות

- **Developer**: Awakening by Ksenia Team
- **Email**: [awakening.by.ksenia@gmail.com](mailto:awakening.by.ksenia@gmail.com)
- **Website**: [abyk.online](https://abyk.online)

---

**עודכן לאחרונה**: אוקטובר 2025
