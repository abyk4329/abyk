# ABYK - Awakening by Ksenia

Next.js 15 + React 19 + Tailwind v4 מערכת מקצועית למחשבון נומרולוגיה עם תשתית מייל ו-PDF מלאה.

> 📚 **תיעוד מלא**: ראה תיקיית [docs/](./docs/) למדריכים מפורטים (כולל [PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md) כמקור אמת למבנה)

## 🎨 מותג ועיצוב

**Awakening by Ksenia** - YOUR PERSONAL SPACE FOR GROWTH

### לוגו ואייקונים

- `logob.png` - לוגו ראשי ABYK
- `ABYKICON.png` - אייקון ראשי / Favicon
- תמונות שיתוף (1080x1080, 1200x630)

### עיצוב Neumorphic

פלטת צבעים חמה ונעימה:

- `#473B31` - טקסט ראשי (חום כהה)
- `#5e4934` - כותרות
- `#87674F` - טקסט משני
- `#FDFCFB` - רקע כרטיסיות (קרם)
- `#F5F1ED` - רקע עמוד (בז')

## 🚀 טכנולוגיות

- **Next.js 15.5.4** - App Router + Server Components
- **React 19.2.0** - Latest version
- **Tailwind CSS v4.1.14** - @tailwindcss/postcss
- **TypeScript 5.9.3** - Type safety
- **Resend + Nodemailer** - Email delivery
- **@react-pdf/renderer** - PDF generation with Hebrew support

## 📦 התקנה מהירה

### דרישות מוקדמות

- **Node.js 22** (חובה)
- **pnpm >= 9**

### התקנה

```bash
# Clone the repository
git clone https://github.com/abyk4329/abyk.git
cd abyk

# Install Node.js 22
sudo n 22

# Install pnpm
npm install -g pnpm@10.18.0

# Install dependencies
pnpm install

# Create .env.local file (see Configuration below)
cp .env.example .env.local

# Run development server
pnpm dev
```

פתח [http://localhost:3000](http://localhost:3000) בדפדפן.

## ⚙️ תצורה

צור קובץ `.env.local`:

```bash
# Email Provider
RESEND_API_KEY="re_************************"
EMAIL_FROM="AWAKENING BY KSENIA <no-reply@abyk.online>"

# Gmail SMTP (Fallback)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
EMAIL_USER="awakening.by.ksenia@gmail.com"
EMAIL_PASSWORD="your_gmail_app_password"

# Test overrides
TEST_EMAIL="kseniachud@gmail.com"
MAIL_TEST_MODE="0"   # הגדר ל-1 כדי לאכוף שליחת מבחן בכל מצב

# Public Metadata
NEXT_PUBLIC_APP_NAME="Awakening by Ksenia"
NEXT_PUBLIC_APP_URL="https://abyk.online"
NEXT_PUBLIC_INSTAGRAM_HANDLE="@awakening.by.ksenia"
NEXT_PUBLIC_WHATSAPP_NUMBER="972524616121"
NEXT_PUBLIC_TIKTOK_HANDLE="@awakening.by.ksenia"
NEXT_PUBLIC_PRODUCT_PRICE="36.9 ש״ח"

# Observability (Sentry)
SENTRY_DSN="https://examplePublicKey@o0.ingest.sentry.io/0"
SENTRY_TRACES_SAMPLE_RATE="0.1"
SENTRY_PROFILES_SAMPLE_RATE="0.0"
```

## 📂 מבנה הפרויקט

```text
app/                      # Next.js App Router (UI + API routes)
├── (marketing)/          # Landing pages וקמפיינים
├── (funnels)/            # מסע המחשבון (calculator → thank-you)
├── (legal)/              # מדיניות פרטיות ותנאים
├── (labs)/               # ניסויים וכלי dev בלבד
├── api/                  # API Routes (generate-pdf, send-email, webhooks)
├── components/           # קומפוננטות משותפות ו-layouts
└── globals.css           # Tailwind + Neumorphism

features/                 # מודולים עסקיים
└── wealth-code/          # כל הלוגיקה וה-UI של מחשבון העושר

lib/                      # Utilities, קונפיגורציות מותג, שליחת מיילים, פד"פים

docs/                     # תיעוד רשמי (ראה README בתוך התיקייה)

design/                   # קבצי handoff מ-Figma

public/                   # נכסים סטטיים (brand, email, fonts, og)

styles/                   # קבצי CSS ייעודיים (כמו neumorphism.css)

tests/                    # Playwright E2E
```

> 🏗 **ארכיטקטורה מפורטת**: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## 🎯 תכונות עיקריות

### ✉️ מערכת מייל מלאה

- שליחת מיילים מעוצבים בעברית (RTL)
- בחירה אוטומטית: Resend או Gmail SMTP
- תבניות HTML מקצועיות
- כפתורי פעולה + לוגו + footer עם קישורים
- צרוף PDF אוטומטי

### 📄 יצירת PDF

- מסמכים מעוצבים בעברית
- פונט Assistant מותאם
- עיצוב Neumorphic
- תוכן דינמי מותאם אישית

### 🎨 עיצוב מתקדם

- Tailwind v4 עם @import syntax
- CSS Variables לעיצוב Neumorphic
- תמיכה מלאה ב-RTL
- Responsive design
- Dark mode ready

## 📖 API Documentation

מסמך מפורט: [docs/guides/EMAIL-PDF-README.md](./docs/guides/EMAIL-PDF-README.md)

### Endpoints Summary

- **POST** `/api/generate-pdf` - יצירת PDF והחזרה כ-base64
- **POST** `/api/send-email` - שליחת מייל עם צירוף PDF
- **POST** `/api/webhooks/grow` - Webhook לתשלומי Grow

> 🔌 **API מפורט**: [docs/ARCHITECTURE.md#api-endpoints](./docs/ARCHITECTURE.md#-api-endpoints)

## 🧪 Scripts

```bash
pnpm dev          # Development server (port 3000)
pnpm build        # Production build
pnpm start        # Production server
pnpm lint         # ESLint check
pnpm test:e2e     # Playwright E2E tests
```

> 🔧 **פיתוח מתקדם**: [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)

## 🔐 אבטחה

- ⚠️ אל תעלה `.env.local` ל-Git
- ⚠️ השתמש ב-App Password ל-Gmail (לא סיסמה רגילה)
- ⚠️ שמור API Keys בסודות CI/CD

## 🚀 Deployment

### Vercel (מומלץ)

```bash
vercel --prod
```

הוסף את משתני הסביבה ב-Vercel Dashboard.

> 🌿 **Git Workflow**: [docs/BRANCHING.md](./docs/BRANCHING.md) - אסטרטגיית ענפים מפורטת

### Branch Strategy

- **`main`** - Production (מוגן, דורש approval)
- **`develop`** - Staging/Integration
- **`feature/*`** - פיצ'רים חדשים

**האתר הפעיל לא ישתנה ללא אישור מפורש!**

## 📱 Social Media

- 🌐 Website: [abyk.online](https://abyk.online)
- 📸 Instagram: [@awakening.by.ksenia](https://instagram.com/awakening.by.ksenia)
- 🎵 TikTok: [@awakening.by.ksenia](https://tiktok.com/@awakening.by.ksenia)
- 💬 WhatsApp: [052-461-6121](https://wa.me/972524616121)

## 📄 License

© 2025 Awakening by Ksenia. All rights reserved.

---

## 📚 תיעוד מלא

- 📘 [מדריך פיתוח](./docs/DEVELOPMENT.md) - התקנה, הרצה, ו-troubleshooting
- 🌿 [אסטרטגיית ענפים](./docs/BRANCHING.md) - Git workflow ושמירה על production
- 🏗 [ארכיטקטורה](./docs/ARCHITECTURE.md) - מבנה המערכת וזרימת נתונים
- 📧 [Email & PDF Guide](./docs/guides/EMAIL-PDF-README.md) - מערכת מייל מפורטת

---

### Built with ❤️ by Awakening by Ksenia
