# 📧 Email & PDF Infrastructure - ABYK

תשתית מלאה לשליחת מיילים מעוצבים בעברית עם קבצי PDF מצורפים, מותאמת למותג **Awakening by Ksenia**.

---

## 🎨 עיצוב ומיתוג

### לוגו ואייקונים
הפרויקט כולל את הקבצים הבאים:
- **`logob.png`** - לוגו ראשי (ABYK)
- **`abyk-icon-192.png`** - אייקון 192x192 (PWA, favicon)
- **`abyk-icon-512.png`** - אייקון 512x512 (PWA, app icon)
- **`abyk-icon-1024.png`** - אייקון 1024x1024 (high-res)
- **`share 1080x1080.png`** - תמונת שיתוף לאינסטגרם
- **`share 1200x630.png`** - תמונת שיתוף לפייסבוק/LinkedIn (Open Graph)

### פלטת צבעים (Neumorphic)
```css
--brown-dark: #473B31      /* טקסט ראשי */
--brown-heading: #5e4934   /* כותרות */
--brown-mid: #87674F       /* טקסט משני */
--brown-light: #9f8572     /* טקסט עמום */
--cream: #FDFCFB           /* רקע כרטיסיות */
--beige: #F5F1ED           /* רקע עמוד */
--border: #D3C6BD          /* גבולות */
```

---

## 📦 מבנה הקבצים

```
app/
├── lib/
│   ├── pdf/
│   │   └── WealthReport.tsx          # תבנית PDF מעוצבת בעברית
│   └── email/
│       ├── transport.ts              # שליחה חכמה (Resend/SMTP)
│       └── templates/
│           └── WealthEmail.ts        # תבניות HTML + טקסט
├── api/
│   ├── pdf/
│   │   └── route.ts                  # GET/POST - יצירת והורדת PDF
│   └── send-pdf/
│       └── route.ts                  # POST - שליחת מייל + PDF
└── components/
    └── SendPdfButton.tsx             # רכיב UI לדוגמה
```

---

## ⚙️ התקנה ותצורה

### 1. משתני סביבה (.env.local)

```bash
# --- Email Provider (בחירה אוטומטית) ---
# אם RESEND_API_KEY מוגדר - משתמש ב-Resend
RESEND_API_KEY=""

# Fallback: Gmail SMTP (אם אין Resend)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
EMAIL_USER="awakening.by.ksenia@gmail.com"
EMAIL_PASSWORD="your_gmail_app_password"

# --- Email Identity ---
EMAIL_FROM="AWAKENING BY KSENIA <awakening.by.ksenia@gmail.com>"

# --- Public Metadata ---
NEXT_PUBLIC_APP_NAME="Awakening by Ksenia"
NEXT_PUBLIC_APP_URL="https://abyk.online"

# --- Social Media ---
NEXT_PUBLIC_INSTAGRAM_HANDLE="@awakening.by.ksenia"
NEXT_PUBLIC_WHATSAPP_NUMBER="972524616121"
NEXT_PUBLIC_TIKTOK_HANDLE="@awakening.by.ksenia"
NEXT_PUBLIC_TIKTOK_PIXEL_ID="D3C3JDBC77UEJB9H374G"

# --- Payment ---
NEXT_PUBLIC_PRODUCT_PRICE="36.9 ש״ח"
NEXT_PUBLIC_GROW_PAYMENT_LINK="https://pay.grow.link/b937d8523ea981c0137af77445265809-MjUyNjAyMQ"
```

### 2. התקנת תלויות

החבילות כבר מותקנות:
```bash
pnpm install
# או
pnpm add resend nodemailer @react-pdf/renderer
pnpm add -D @types/nodemailer
```

---

## 🚀 שימוש

### API Endpoints

#### 1. יצירת והורדת PDF
**GET** `/api/pdf`

**Query Parameters:**
- `fullName` - שם מלא (אופציונלי)
- `email` - כתובת מייל (אופציונלי)
- `wealthCode` - קוד העושר (אופציונלי)
- `notes` - הערות נוספות (אופציונלי)

**דוגמה:**
```bash
curl "http://localhost:3000/api/pdf?fullName=קסניה&email=test@example.com&wealthCode=A7" \
  --output report.pdf
```

**POST** `/api/pdf`

**Body:**
```json
{
  "fullName": "קסניה חודנובסקאיה",
  "email": "ksenia@example.com",
  "wealthCode": "A7",
  "notes": "הערות נוספות"
}
```

---

#### 2. שליחת מייל עם PDF
**POST** `/api/send-pdf`

**Body:**
```json
{
  "to": "customer@example.com",
  "fullName": "שם מלא",
  "email": "customer@example.com",
  "wealthCode": "A7",
  "notes": "הערות אישיות"
}
```

**Response:**
```json
{
  "ok": true,
  "id": "email-id-from-provider"
}
```

**דוגמה:**
```bash
curl -X POST http://localhost:3000/api/send-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your.email@example.com",
    "fullName": "קסניה",
    "email": "your.email@example.com",
    "wealthCode": "A7"
  }'
```

---

### שימוש מהקוד (React Component)

```tsx
import { SendPdfButton } from "@/app/components/SendPdfButton";

export default function ResultPage() {
  return (
    <div>
      <h1>התוצאות שלך</h1>
      
      <SendPdfButton
        to="customer@example.com"
        fullName="שם הלקוח"
        email="customer@example.com"
        wealthCode="A7"
        notes="הערות אישיות"
      />
    </div>
  );
}
```

---

### שימוש מכל מקום בקוד

```tsx
// שליחת מייל ישירות
const response = await fetch('/api/send-pdf', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'customer@example.com',
    fullName: 'קסניה',
    email: 'customer@example.com',
    wealthCode: 'A7',
    notes: 'הערות'
  })
});

const result = await response.json();
console.log(result); // { ok: true, id: "..." }
```

---

## 📧 תבנית המייל

המייל כולל:
- ✅ **לוגו ABYK** בראש המייל
- ✅ **כותרת מותאמת אישית** עם קוד העושר
- ✅ **2 כפתורי פעולה:**
  - צפייה באתר (קישור לדף פירושים)
  - הורדת PDF ישירה
- ✅ **כפתור שיתוף** לחברים
- ✅ **קובץ PDF מצורף** אוטומטית
- ✅ **Footer עם קישורים:**
  - אתר
  - Instagram
  - WhatsApp
  - TikTok
  - מחיר המוצר

### עיצוב
- RTL מלא (עברית)
- Inline CSS (תואם כל קליינטי מייל)
- Responsive (640px width)
- Neumorphic design matching brand
- Assistant font

---

## 📄 תבנית ה-PDF

המסמך כולל:
- ✅ **Header:** דוח אישי + תובנות ומסקנות
- ✅ **כרטיס מידע אישי:** שם, מייל, קוד שפע, הערות
- ✅ **2 כרטיסי תוכן:**
  - אבחנות (3 נקודות)
  - צעדי פעולה (3 נקודות)
- ✅ **Footer:** זכויות יוצרים + שנה נוכחית

### עיצוב PDF
- A4 size
- RTL support (עברית)
- Assistant font מ-Google Fonts
- Neumorphic cards
- Brand colors

---

## 🔧 בחירת ספק מייל אוטומטית

המערכת בוחרת אוטומטית:

1. **Resend** (מועדף) - אם `RESEND_API_KEY` מוגדר
2. **Gmail SMTP** (fallback) - אם אין Resend אבל יש הגדרות SMTP

### הגדרת Resend (מומלץ)

1. היכנס ל-https://resend.com
2. צור חשבון והשג API Key
3. הוסף ל-`.env.local`:
   ```bash
   RESEND_API_KEY="re_your_api_key_here"
   ```

### הגדרת Gmail SMTP

1. צור **App Password** ב-Google Account:
   - Settings → Security → 2-Step Verification
   - App Passwords → Generate
2. הוסף ל-`.env.local`:
   ```bash
   EMAIL_USER="your.email@gmail.com"
   EMAIL_PASSWORD="your_app_password_here"
   ```

---

## 🧪 בדיקות

### הרצת dev server
```bash
pnpm dev
```

### build production
```bash
pnpm build
```

### בדיקת PDF (localhost)
פתח בדפדפן:
```
http://localhost:3000/api/pdf?fullName=קסניה&wealthCode=A7
```

### בדיקת שליחת מייל (curl)
```bash
curl -X POST http://localhost:3000/api/send-pdf \
  -H "Content-Type: application/json" \
  -d '{"to":"your.test@email.com","fullName":"Test","wealthCode":"A7"}'
```

---

## 🎯 המלצות

### אבטחה
- ⚠️ **לעולם אל תעלה `.env.local` ל-Git**
- ⚠️ השתמש ב-**App Password** לא בסיסמה רגילה ל-Gmail
- ⚠️ שמור API Keys ב-**סודות CI/CD** בהעלאה לפרודקשן

### ביצועים
- ✅ שילוב CDN לתמונות (logob.png)
- ✅ שימוש ב-Resend לפרודקשן (מהיר יותר מ-SMTP)
- ✅ Caching של PDF אם אותו תוכן

### חוויית משתמש
- ✅ הוסף loading states ברכיב `SendPdfButton`
- ✅ הצג הודעות שגיאה ברורות למשתמש
- ✅ שלח מייל אישור לאחר תשלום

---

## 📚 טכנולוגיות

- **Next.js 15.5.4** - Framework
- **React 19.2.0** - UI Library
- **@react-pdf/renderer** - PDF Generation
- **Resend** - Email API (modern)
- **Nodemailer** - SMTP Fallback
- **TypeScript** - Type Safety
- **Tailwind v4** - Styling

---

## 🙋‍♀️ תמיכה

לשאלות או בעיות:
- 📧 Email: awakening.by.ksenia@gmail.com
- 📱 WhatsApp: +972524616121
- 📸 Instagram: @awakening.by.ksenia
- 🎵 TikTok: @awakening.by.ksenia

---

**Built with ❤️ by Awakening by Ksenia**
