# ABYK - Awakening by Ksenia

Next.js 15 + React 19 + Tailwind v4 מערכת מקצועית למחשבון נומרולוגיה עם תשתית מייל ו-PDF מלאה.

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

## 💻 VS Code Setup

הפרויקט מוגדר במיוחד עבור Visual Studio Code עם GitHub Copilot:

### התקנת Extensions מומלצים

1. פתח את הפרויקט ב-VS Code
2. לחץ על הודעת "Install Recommended Extensions" שתופיע
3. או: Ctrl+Shift+P → "Extensions: Show Recommended Extensions"

### GitHub Copilot

**דרישות:**
- מנוי פעיל ל-GitHub Copilot ([הרשמה](https://github.com/settings/copilot))
- התקנת ההרחבות: `GitHub.copilot` + `GitHub.copilot-chat`

**בדיקת תקינות:**
1. פתח קובץ TypeScript כלשהו
2. התחל להקליד - אמור להופיע טקסט אפור עם הצעות
3. לחץ Tab לקבלת הצעה
4. Ctrl+Enter (Cmd+Enter ב-Mac) לראות את כל ההצעות

**פתרון בעיות:**
- בדוק את אייקון Copilot בפינה הימנית התחתונה
- ודא שאתה מחובר עם חשבון GitHub שלך
- ראה [.vscode/README.md](.vscode/README.md) למדריך מלא

### הגדרות נוספות

כל ההגדרות נשמרות ב-[.vscode/settings.json](.vscode/settings.json):
- ✅ פורמט אוטומטי בשמירה (Prettier)
- ✅ תיקון ESLint אוטומטי
- ✅ תמיכה בעברית ו-RTL
- ✅ Tailwind CSS IntelliSense
- ✅ TypeScript IntelliSense משופר

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
```

## 📂 מבנה הפרויקט

```text
app/
├── api/
│   ├── generate-pdf/
│   │   └── route.ts           # יצירת PDF
│   └── send-email/
│       └── route.ts           # שליחת מייל (Resend → SMTP fallback)
├── components/…              # UI sections וכפתורים
├── globals.css               # עיצוב Neumorphic + Tailwind v4
└── page.tsx                  # דף הבית

lib/
├── email/
│   └── transport.ts          # sendViaResend / sendViaSMTP / sendEmail
└── utils/
  └── base64.ts             # stripBase64Prefix + blobToBase64

modules/
└── wealth-code/
  ├── email/
  │   ├── WealthEmail.ts    # תבנית HTML ראשית
  │   └── template.ts       # re-export עבור תאימות
  └── utils/
    └── email.ts          # sendWealthEmail client helper
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
**POST** `/api/webhooks/grow` - Webhook מאובטח שמקבל אירועי Grow על תשלום שהושלם, מייצר PDF, ושולח את המייל האוטומטי

דוגמה:

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "name": "קסניה",
    "shareUrl": "https://abyk.online/result/123",
    "replyTo": "support@abyk.online",
    "attachments": [
      {
        "filename": "wealth-code.pdf",
        "contentType": "application/pdf",
        "content": "... base64 without data prefix ..."
      }
    ]
  }'
```

> טיפ: אם יש לך רק מחרוזת Base64 אחת, אפשר לשלוח את השדה `pdfBase64` במקום מערך `attachments`. ה-API יסיר אוטומטית prefix מסוג `data:*;base64,` במידת הצורך.

Webhook Grow – דוגמה לאירוע:

```bash
curl -X POST http://localhost:3000/api/webhooks/grow \
  -H "Content-Type: application/json" \
  -H "x-grow-secret: $GROW_WEBHOOK_SECRET" \
  -d '{
    "event": "order.paid",
    "data": {
      "id": "order_123",
      "status": "paid",
      "customer": { "email": "client@example.com", "name": "לקוחה שמחה" },
      "metadata": { "code": "1234" }
    }
  }'
```

> ⚙️ ה-Webhook מחפש את הקוד בשדות `metadata.code` או `custom_fields` ויוודא שהסטטוס הוא `paid`. על Grow לשלוח את ה-secret בכותרת `x-grow-secret` (אפשר גם Bearer token).

### 🔬 בדיקות שליחת מייל

#### Local DEV (always routes to TEST_EMAIL)

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "ignored@example.com",
    "name": "קסניה",
    "shareUrl": "https://abyk.online/",
    "subject": "הפירוש המלא לקוד האישי שלך",
    "test": true
  }'
```

#### Production test via query

```bash
curl -X POST "https://abyk.online/api/send-email?test=1" \
  -H "Content-Type: application/json" \
  -d '{"to":"ignored@example.com","name":"קסניה","shareUrl":"https://abyk.online/"}'
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
- 💬 WhatsApp: [052-461-6121](https://wa.me/972524616121)

## 📄 License

© 2025 Awakening by Ksenia. All rights reserved.

---

### Built with ❤️ by Awakening by Ksenia
