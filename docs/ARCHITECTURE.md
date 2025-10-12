# 🏗 Architecture Overview - סקירת ארכיטקטורה

## סקירה כללית

ABYK הוא אפליקציית Next.js מודרנית לחישוב נומרולוגי עם מערכת מייל ו-PDF מלאה.

---

## 🎨 Stack טכנולוגי

### Frontend
- **Next.js 15.5.4** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Tailwind CSS v4** - Utility-first CSS
- **Framer Motion** - Animations

### Backend/API
- **Next.js API Routes** - Serverless functions
- **Resend** - Email delivery service
- **Nodemailer** - SMTP fallback
- **@react-pdf/renderer** - PDF generation

### Dev Tools
- **ESLint 9** - Code linting
- **Playwright** - E2E testing
- **pnpm** - Package manager

---

## 📁 מבנה מודולרי

```
app/                     # Next.js App Router
├── api/                 # API endpoints
├── components/          # UI components
├── [routes]/           # Page routes
└── lib/                # Utilities

lib/                    # Shared utilities
├── constants.ts        # Config & content
├── routes.ts           # Route helpers
└── utils/              # Helper functions

modules/                # Business logic
└── wealth-code/        # Wealth code calculator
    ├── email/          # Email templates
    └── utils/          # Calculations

design-system/          # Dev-only design tools
public/                 # Static assets
docs/                   # Documentation
```

---

## 🔄 Data Flow

### 1. חישוב Wealth Code

```
User Input (Birthday)
    ↓
Calculator Component
    ↓
Wealth Code Algorithm (modules/wealth-code)
    ↓
Result Page (display code)
    ↓
Sales Page
    ↓
Payment (Grow.link)
    ↓
Webhook → Generate PDF + Send Email
    ↓
Thank You Page
```

### 2. Email + PDF Flow

```
Payment Complete (Grow webhook)
    ↓
/api/webhooks/grow
    ↓
Generate PDF (/api/generate-pdf)
    ↓
Send Email (/api/send-email)
    ├─ Try Resend
    └─ Fallback: Gmail SMTP
    ↓
User receives email with PDF
```

---

## 🎨 Design System

### עיצוב Neumorphic

הפרויקט משתמש בעיצוב **Neumorphic** - גישה מודרנית לעיצוב 3D רך.

**עקרונות:**
- צללים כפולים (בהיר + כהה)
- צבעים חמים וטבעיים
- רקעים בגוון בז'/קרם
- אלמנטים "צפים" מעל הרקע

**קבצים:**
- `app/components/lib/neomorphism-styles.ts` - סגנונות מרכזיים
- `app/globals.css` - CSS variables
- `design-system/` - ספרייה לפיתוח

### פלטת צבעים

```css
--color-text: #473B31          /* חום כהה - טקסט ראשי */
--color-heading: #5e4934       /* חום - כותרות */
--color-secondary: #87674F     /* חום בהיר - טקסט משני */
--color-accent: #D4A574        /* זהב חם - הדגשות */
--color-bg-card: #FDFCFB       /* קרם - רקע כרטיסים */
--color-bg-page: #F5F1ED       /* בז' - רקע עמודים */
```

### Typography

- **פונט**: Assistant (Google Fonts)
- **משקלים**: 200-800
- **תמיכה**: Latin, Hebrew (RTL)

---

## 🔌 API Endpoints

### 1. POST `/api/generate-pdf`

**תפקיד:** יצירת PDF מותאם אישית

**Request:**
```json
{
  "code": "1234",
  "name": "קסניה",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "pdfBase64": "JVBERi0xLjQK..." // no data URI prefix
}
```

---

### 2. POST `/api/send-email`

**תפקיד:** שליחת מייל עם צירוף PDF

**Request:**
```json
{
  "to": "user@example.com",
  "name": "קסניה",
  "shareUrl": "https://abyk.online/result?code=1234",
  "replyTo": "support@abyk.online",
  "attachments": [
    {
      "filename": "wealth-code.pdf",
      "contentType": "application/pdf",
      "content": "base64-string-without-prefix"
    }
  ]
}
```

**תהליך:**
1. ניסיון שליחה דרך Resend
2. אם נכשל → fallback ל-Gmail SMTP
3. במצב development → שליחה ל-TEST_EMAIL

---

### 3. POST `/api/webhooks/grow`

**תפקיד:** קבלת אירועי תשלום מ-Grow

**Headers:**
```
x-grow-secret: your-webhook-secret
```

**Request:**
```json
{
  "event": "order.paid",
  "data": {
    "id": "order_123",
    "status": "paid",
    "customer": {
      "email": "client@example.com",
      "name": "לקוחה"
    },
    "metadata": {
      "code": "1234"
    }
  }
}
```

**תהליך:**
1. אימות secret
2. וידוא status = "paid"
3. יצירת PDF עם הקוד
4. שליחת מייל ללקוח

---

## 🔒 Environment Variables

### קריטיים

```bash
# Email - Resend (primary)
RESEND_API_KEY="re_..."
EMAIL_FROM="AWAKENING BY KSENIA <no-reply@abyk.online>"

# Email - Gmail SMTP (fallback)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
EMAIL_USER="awakening.by.ksenia@gmail.com"
EMAIL_PASSWORD="gmail_app_password"

# Grow Webhook
GROW_WEBHOOK_SECRET="your-secret"

# Testing
TEST_EMAIL="test@example.com"
MAIL_TEST_MODE="0"  # 1 = force test mode in all environments
```

### אופציונליים

```bash
# Public metadata
NEXT_PUBLIC_APP_NAME="Awakening by Ksenia"
NEXT_PUBLIC_APP_URL="https://abyk.online"
NEXT_PUBLIC_SHOW_DESIGN="false"  # true in dev only
```

---

## 🎯 Component Architecture

### Shared Components

**`app/components/shared/GlassButton.tsx`**
כפתור מעוצב עם אפקטים neumorphic.

```tsx
<GlassButton variant="primary" size="lg" onClick={handleClick}>
  לחצו כאן
</GlassButton>
```

**Variants:**
- `primary` - כפתור ראשי (זהב)
- `secondary` - כפתור משני (קרם)

---

### Section Components

**`app/components/sections/`**
קומפוננטות גדולות המייצגות חלקים עיקריים באפליקציה:

- `Hero.tsx` - דף הבית
- `Calculator.tsx` - מחשבון
- `Result.tsx` - תוצאות
- `SalesPage.tsx` - עמוד מכירות
- `ThankYou.tsx` - תודה
- `Interpretations.tsx` - פירושים

---

## 📦 Modules

### `modules/wealth-code/`

**תפקיד:** לוגיקה עסקית לחישוב Wealth Code

**קבצים:**
- `email/WealthEmail.tsx` - תבנית HTML למייל
- `utils/email.ts` - helper functions
- (עתידי) `calculations.ts` - אלגוריתמים

---

## 🎨 Design System (Dev Only)

### מטרה
ספרייה פנימית לפיתוח ועיצוב - **לא לפרודקשן!**

### מיקום
```
design-system/
├── components/
│   └── DesignShowcase.tsx
└── README.md
```

### גישה
- Development: `/design` ✅
- Production: חסום ❌

**שליטה:**
```bash
NEXT_PUBLIC_SHOW_DESIGN=false  # block in production
```

---

## 🔄 State Management

### אסטרטגיה
- **Local State**: React useState/useReducer
- **URL State**: Next.js routing (query params)
- **Server State**: API routes (no external state manager)

### דוגמה - Wealth Code State

```tsx
// URL-based state
const router = useRouter();
const { code } = router.query;

// Display based on URL
<Result wealthCode={code as string} />
```

---

## 🚀 Performance

### Optimizations

1. **Next.js App Router**
   - Server Components by default
   - Client Components רק כשצריך

2. **Image Optimization**
   - Next.js Image component
   - WebP format
   - Lazy loading

3. **Code Splitting**
   - Automatic by Next.js
   - Dynamic imports לקומפוננטות כבדות

4. **Caching**
   - Static assets cached on Vercel Edge
   - API responses can be cached (future)

---

## 🧪 Testing Strategy

### E2E Tests (Playwright)

```bash
tests/
└── e2e/
    ├── calculator.spec.ts
    ├── payment.spec.ts
    └── email.spec.ts
```

### Test Coverage
- ✅ Calculator flow
- ✅ Payment flow
- ⏳ Email delivery (manual testing)
- ⏳ PDF generation (manual testing)

---

## 🌐 Deployment

### Vercel (Production)

**Branch → Environment:**
- `main` → Production (abyk.online)
- `develop` → Preview (develop.abyk.vercel.app)
- `feature/*` → Auto Preview URLs

**Build Command:**
```bash
pnpm build
```

**Environment Variables:**
כל המשתנים מוגדרים ב-Vercel Dashboard.

---

## 🔮 עתיד - Roadmap

### Short-term
- [ ] User authentication
- [ ] User dashboard
- [ ] Payment history
- [ ] Multiple PDF templates

### Long-term
- [ ] Admin panel
- [ ] Analytics dashboard
- [ ] Mobile app (React Native?)
- [ ] Multi-language support

---

## 📚 קבצי תיעוד נוספים

- [DEVELOPMENT.md](./DEVELOPMENT.md) - מדריך פיתוח
- [BRANCHING.md](./BRANCHING.md) - אסטרטגיית ענפים
- [guides/EMAIL-PDF-README.md](./guides/EMAIL-PDF-README.md) - מערכת מייל ו-PDF

---

**עודכן**: אוקטובר 2025  
**גרסה**: 1.0.0
