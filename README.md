# ABYK - Awakening by Ksenia

Next.js 15 + React 19 + Tailwind v4 מערכת מקצועית למחשבון נומרולוגיה עם תשתית מייל ו-PDF מלאה.

## 🎨 מותג ועיצוב

**Awakening by Ksenia** - YOUR PERSONAL SPACE FOR GROWTH

### לוגו ואייקונים
- `logob.png` - לוגו ראשי ABYK
- `abyk-icon-*.png` - אייקונים (192, 512, 1024)
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
- **ESLint 9.36.0** - Flat Config
- **pnpm 9.11.0** - Package manager

### תשתית מייל ו-PDF
- **Resend** - Modern email API
- **Nodemailer** - SMTP fallback (Gmail)
- **@react-pdf/renderer** - PDF generation
- Hebrew support + RTL + Assistant font

## 📦 התקנה מהירה

### דרישות מוקדמות

- Node.js >= 20 < 23
- pnpm >= 9

### התקנה

```bash
# Clone the repository
git clone https://github.com/abyk4329/abyk.git
cd abyk

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
RESEND_API_KEY=""  # או השתמש ב-Gmail SMTP למטה
EMAIL_FROM="AWAKENING BY KSENIA <awakening.by.ksenia@gmail.com>"

# Gmail SMTP (Fallback)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
EMAIL_USER="awakening.by.ksenia@gmail.com"
EMAIL_PASSWORD="your_gmail_app_password"

# Public Metadata
NEXT_PUBLIC_APP_NAME="Awakening by Ksenia"
NEXT_PUBLIC_APP_URL="https://abyk.online"
NEXT_PUBLIC_INSTAGRAM_HANDLE="@awakening.by.ksenia"
NEXT_PUBLIC_WHATSAPP_NUMBER="972524616121"
NEXT_PUBLIC_TIKTOK_HANDLE="@awakening.by.ksenia"
NEXT_PUBLIC_PRODUCT_PRICE="36.9 ש״ח"
```

## 📂 מבנה הפרויקט

```text
app/
├── globals.css              # עיצוב Neumorphic + Tailwind v4
├── layout.tsx               # Root layout (RTL)
├── page.tsx                 # Home page
├── lib/
│   ├── pdf/
│   │   └── WealthReport.tsx       # PDF template
│   └── email/
│       ├── transport.ts           # Email provider
│       └── templates/
│           └── WealthEmail.ts     # Email HTML/text
├── api/
│   ├── pdf/route.ts               # PDF generation
│   └── send-pdf/route.ts          # Email sending
└── components/
    └── SendPdfButton.tsx          # Email button component
```

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

מסמך מפורט: [EMAIL-PDF-README.md](./EMAIL-PDF-README.md)

### Endpoints

**POST** `/api/generate-pdf` - יצירת PDF והחזרה כ-base64 (ללא data prefix)
**POST** `/api/send-email` - שליחת מייל עם "הפירוש המלא לקוד האישי שלך" + צירוף PDF

דוגמה:
```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com","name":"קסניה","pdfBase64":"..."}'
```

## 🧪 Scripts

```bash
pnpm dev          # Development server (port 3000)
pnpm build        # Production build
pnpm start        # Production server
pnpm lint         # ESLint check
```

## 🔐 אבטחה

- ⚠️ אל תעלה `.env.local` ל-Git
- ⚠️ השתמש ב-App Password ל-Gmail (לא סיסמה רגילה)
- ⚠️ שמור API Keys בסודות CI/CD

## 🌐 Deployment

### Vercel (מומלץ)
```bash
vercel --prod
```

הוסף את משתני הסביבה ב-Vercel Dashboard.

### Docker
```bash
docker build -t abyk .
docker run -p 3000:3000 abyk
```

## 📱 Social Media

- 🌐 Website: [abyk.online](https://abyk.online)
- 📸 Instagram: [@awakening.by.ksenia](https://instagram.com/awakening.by.ksenia)
- 🎵 TikTok: [@awakening.by.ksenia](https://tiktok.com/@awakening.by.ksenia)
- 💬 WhatsApp: [+972524616121](https://wa.me/972524616121)

## 📄 License

© 2025 Awakening by Ksenia. All rights reserved.

---

**Built with ❤️ by Awakening by Ksenia**
