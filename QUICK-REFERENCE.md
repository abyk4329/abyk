# 🚀 Quick Reference - כרטיס עזר מהיר

**עבור**: ABYK Development  
**עודכן**: אוקטובר 2025

---

## ⚡️ פקודות נפוצות

### התקנה ראשונית
```bash
git clone https://github.com/abyk4329/abyk.git
cd abyk
sudo n 22                          # Node 22
npm install -g pnpm@10.18.0        # pnpm
pnpm install                       # Dependencies
cp .env.example .env.local         # Environment
pnpm dev                           # Start dev server
```

### פיתוח יומיומי
```bash
pnpm dev                           # Development server (port 3000)
pnpm build                         # Production build
pnpm lint                          # ESLint check
pnpm test:e2e                      # Playwright tests
```

---

## 🌿 Git Workflow

### צור ענף חדש
```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
```

### עבוד ועשה commit
```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/my-feature
# פתח PR ב-GitHub: feature/my-feature → develop
```

### עדכן מdevelop
```bash
git checkout develop
git pull origin develop
git checkout feature/my-feature
git merge develop
```

---

## 📝 Commit Messages

```bash
feat:      # פיצ'ר חדש
fix:       # תיקון באג
docs:      # תיעוד
style:     # עיצוב (CSS, formatting)
refactor:  # שינוי קוד ללא תיקון/פיצ'ר
test:      # בדיקות
chore:     # תחזוקה
```

**דוגמאות:**
```bash
git commit -m "feat(auth): add login form"
git commit -m "fix(calculator): correct date validation"
git commit -m "docs: update README"
```

---

## 🔍 בדיקות

### Lint
```bash
pnpm lint                          # בדוק errors
pnpm lint -- --fix                 # תקן אוטומטית
```

### Build
```bash
pnpm build                         # בדוק שהבנייה עובדת
```

### E2E Tests
```bash
pnpm test:e2e                      # הרץ בדיקות
pnpm test:e2e --ui                 # עם UI
pnpm test:e2e --headed             # דפדפן גלוי
```

---

## 📁 קבצים חשובים

| קובץ | תיאור |
|------|-------|
| `.env.local` | משתני סביבה מקומיים (לא בGit) |
| `lib/constants.ts` | כל הטקסטים והגדרות |
| `lib/routes.ts` | ניהול נתיבים |
| `app/globals.css` | סגנונות גלובליים |
| `docs/` | כל התיעוד |

---

## 🎨 עיצוב

### פלטת צבעים
```css
--color-text: #473B31              /* חום כהה */
--color-heading: #5e4934           /* חום */
--color-secondary: #87674F         /* חום בהיר */
--color-accent: #D4A574            /* זהב */
--color-bg-card: #FDFCFB           /* קרם */
--color-bg-page: #F5F1ED           /* בז' */
```

### Neumorphic Styles
```typescript
import { neumorphismStyles } from '@/app/components/lib/neomorphism-styles';

<div style={neumorphismStyles.card.primary}>
  ...
</div>
```

---

## 🔌 API Endpoints

### Generate PDF
```bash
POST /api/generate-pdf
{
  "code": "1234",
  "name": "קסניה",
  "email": "user@example.com"
}
```

### Send Email
```bash
POST /api/send-email
{
  "to": "user@example.com",
  "name": "קסניה",
  "attachments": [...]
}
```

### Grow Webhook
```bash
POST /api/webhooks/grow
Headers: x-grow-secret: xxx
{
  "event": "order.paid",
  "data": {...}
}
```

---

## 🌐 URLs

| סביבה | URL |
|-------|-----|
| Development | http://localhost:3000 |
| Production | https://abyk.online |
| Staging (develop) | https://develop.abyk.vercel.app |
| Design Showcase | http://localhost:3000/design (dev only) |

---

## 🔑 Environment Variables

### חובה
```bash
RESEND_API_KEY=                    # Resend API
EMAIL_FROM=                        # שולח המייל
SMTP_HOST=smtp.gmail.com           # Gmail backup
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
```

### אופציונלי
```bash
NEXT_PUBLIC_SHOW_DESIGN=false     # Design showcase
TEST_EMAIL=                        # מייל לבדיקות
MAIL_TEST_MODE=0                   # 0=normal, 1=test
GROW_WEBHOOK_SECRET=               # Grow webhook
```

---

## 📚 תיעוד

| מסמך | מתי לקרוא |
|------|-----------|
| [README.md](./README.md) | סקירה כללית |
| [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) | התקנה ופיתוח |
| [docs/BRANCHING.md](./docs/BRANCHING.md) | Git workflow |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | מבנה המערכת |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | תהליך תרומה |
| [OWNER-GUIDE.md](./OWNER-GUIDE.md) | מדריך לבעלים |

---

## 🆘 Troubleshooting

### "pnpm: command not found"
```bash
npm install -g pnpm@10.18.0
```

### "Node version incompatible"
```bash
sudo n 22
node --version  # verify v22.x
```

### "Build fails with fonts error"
```bash
# זו בעיית רשת - הבילד יעבוד בVercel
# לוקאלית: בדוק חיבור אינטרנט
```

### "Port 3000 already in use"
```bash
lsof -ti:3000 | xargs kill -9
# או
pnpm dev --port 3001
```

---

## 🔒 אבטחה

⚠️ **אף פעם לא:**
- תעלה `.env.local` לGit
- תשתף API keys בפומבי
- תעשה commit של secrets
- תעשה push ישיר ל-`main`

✅ **תמיד:**
- השתמש ב-`.env.local` למקומי
- הגדר משתנים בVercel לproduction
- השתמש ב-App Password לGmail
- עבוד דרך PRs

---

## 🎯 מסלולים מהירים

### רוצה להוסיף פיצ'ר?
1. קרא [CONTRIBUTING.md](./CONTRIBUTING.md)
2. צור ענף `feature/xxx`
3. פתח PR ל-`develop`

### מצאת באג?
1. פתח issue ב-GitHub
2. צור ענף `bugfix/xxx`
3. תקן ופתח PR

### צריך לעדכן תיעוד?
1. ערוך קבצים ב-`docs/`
2. commit עם `docs: ...`
3. פתח PR

---

## 📞 עזרה

- **Issues**: https://github.com/abyk4329/abyk/issues
- **Email**: awakening.by.ksenia@gmail.com
- **WhatsApp**: 052-461-6121

---

**הדפס אותי! 🖨**
