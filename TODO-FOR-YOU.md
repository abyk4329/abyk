# דברים שאת צריכה ליצור/לבדוק 📋

## ✅ כבר בוצע (על ידי)

- ✅ התקנת dependencies (html2canvas, jspdf)
- ✅ תיקון כל שגיאות TypeScript
- ✅ הוספת "use client" לכל הקומפוננטות
- ✅ יצירת GlassButton משותף
- ✅ יצירת neumorphism utilities
- ✅ יצירת Tabs primitives
- ✅ תיקון metadata ב-layout
- ✅ Build עובר בהצלחה
- ✅ Lint עובר בהצלחה
- ✅ השרת רץ ב-http://localhost:3000

---

## 🎯 מה את צריכה ליצור עכשיו

### 1. ⚠️ **קריטי - בחירת אסטרטגיית ניווט**

**הבעיה:** הקומפוננטות משתמשות ב-hash navigation (`window.location.hash = '#/sales'`) אבל `app/page.tsx` משתמש ב-state.

**פתרון A - Hash-based (הכי פשוט):**
```tsx
// app/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.slice(1)); // remove #
    };
    
    handleHashChange(); // initial
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Render based on currentHash
  if (currentHash === "/calculator") return <Calculator ... />;
  if (currentHash === "/result") return <Result ... />;
  // etc...
}
```

**פתרון B - Next.js Routes (מומלץ לטווח ארוך):**
צרי תיקיות:
```
app/
├── page.tsx                    (Hero)
├── calculator/page.tsx         (Calculator)
├── result/page.tsx             (Result)
├── sales/page.tsx              (SalesPage)
├── interpretations/page.tsx    (Interpretations)
└── thank-you/page.tsx          (ThankYou)
```

ושני את כל ה-`window.location.hash` ל-`router.push()` או `<Link href="...">`.

**מה לעשות:**
- [ ] בחרי באחת מהשיטות
- [ ] עדכני את כל הקומפוננטות בהתאם
- [ ] בדקי שהניווט עובד בכל הזרימה

---

### 2. 📧 **בדיקת Email Flow**

**קובץ שחסר:** תבנית המייל המלאה

נכון להיום יש לך:
- `app/lib/email/transport.ts` - הגדרת Resend
- `app/api/send-email/route.ts` - API endpoint
- `modules/wealth-code/email/template.ts` - תבנית בסיסית

**מה צריך:**
1. תבנית HTML מעוצבת לאימייל עם:
   - לוגו ABYK
   - קוד העושר
   - קישור לצפייה באתר
   - כפתור הורדת PDF
   - פרטי קשר

**דוגמה:**
```tsx
// modules/wealth-code/email/template.ts
export const wealthCodeEmailTemplate = (code: string, pdfUrl: string) => `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; background: #fdfcfb; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .code { font-size: 48px; color: #87674f; letter-spacing: 0.15em; }
    /* ... */
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://abyk.online/brand/logob.png" alt="ABYK" width="200">
      <h1>קוד העושר שלך: ${code}</h1>
    </div>
    
    <p>שלום,</p>
    <p>תודה על הרכישה! הפירוש המלא של קוד העושר שלך מצורף למייל זה.</p>
    
    <a href="${pdfUrl}" style="...">הורד את הפירוש המלא</a>
    
    <p>בברכה,<br>קסניה - Awakening by Ksenia</p>
  </div>
</body>
</html>
`;
```

**מה לעשות:**
- [ ] צרי תבנית HTML מעוצבת
- [ ] בדקי שהמייל נשלח (עם Resend API key ב-.env.local)
- [ ] בדקי שהמייל נראה טוב במובייל ובדסקטופ

---

### 3. 📄 **בדיקת PDF Generation**

**קובץ:** `modules/wealth-code/pdf/generate.ts`

נכון להיום הקוד נמצא בקומפוננטה `Interpretations.tsx` בתוך `handleDownload`.

**בעיה פוטנציאלית:** 
- הפונקציה מחכה ש-React re-render יסתיים בין כל טאב
- זה עלול להיות לא אמין

**פתרון מומלץ:**
העבירי את לוגיקת ה-PDF ל-API route בצד שרת:

```tsx
// app/api/generate-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateWealthCodePDF } from "@/modules/wealth-code/pdf/generate";

export async function POST(request: NextRequest) {
  const { code, email } = await request.json();
  
  try {
    const pdfBuffer = await generateWealthCodePDF(code);
    
    // Option 1: Return PDF directly
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="קוד-עושר-${code}.pdf"`,
      },
    });
    
    // Option 2: Save to storage and return URL
    // const url = await uploadToS3(pdfBuffer);
    // return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
```

**מה לעשות:**
- [ ] בדקי ש-`handleDownload` ב-Interpretations עובד
- [ ] תבדקי על מכשירים שונים (desktop/mobile)
- [ ] שקלי להעביר ל-server-side אם יש בעיות ביצועים

---

### 4. 💳 **אינטגרציה עם Grow**

**קובץ:** `modules/wealth-code/components/sections/SalesPage.tsx`

נכון להיום:
```tsx
const handlePurchase = () => {
  window.open('https://pay.grow.link/...', '_blank');
};

const handleMockPurchase = () => {
  window.location.hash = '#/thankyou';
};
```

**מה חסר:**
1. **Callback URL** - איפה Grow מחזיר את המשתמש אחרי תשלום מוצלח?
2. **Webhook** - איך אתם יודעים שהתשלום עבר?
3. **העברת הקוד** - איך ThankYou יודע איזה קוד להציג?

**פתרון מומלץ:**
```tsx
const handlePurchase = () => {
  // Save code to sessionStorage before redirect
  sessionStorage.setItem("wealthCode", code);
  
  // Redirect to Grow with callback
  const callbackUrl = encodeURIComponent("https://abyk.online/thank-you");
  window.location.href = `https://pay.grow.link/...?callback=${callbackUrl}`;
};
```

וב-ThankYou:
```tsx
useEffect(() => {
  const savedCode = sessionStorage.getItem("wealthCode");
  if (savedCode) {
    setCode(savedCode);
    // Send email with PDF
    fetch("/api/send-email", { ... });
  }
}, []);
```

**מה לעשות:**
- [ ] בדקי את ה-callback URL של Grow
- [ ] הגדירי webhook אם צריך
- [ ] בדקי את הזרימה: תשלום → callback → thank-you → שליחת מייל

---

### 5. 🌍 **Environment Variables**

**קובץ:** `.env.local`

וודאי שקיימים:
```env
# Resend (for emails)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# App URL (for OG images, callbacks, etc.)
NEXT_PUBLIC_APP_URL=https://abyk.online

# או בפיתוח:
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Grow (if needed)
GROW_WEBHOOK_SECRET=xxxxx
```

**מה לעשות:**
- [ ] וודאי ש-.env.local קיים ומכיל את כל המפתחות
- [ ] אל תעלי אותו ל-git (.gitignore אמור לכסות אותו)
- [ ] בהעלאה לייצור, הגדירי ב-Vercel/Netlify Environment Variables

---

### 6. 📱 **בדיקות Mobile**

**מה לבדוק:**
- [ ] כל הטפסים פועלים (Calculator inputs)
- [ ] כפתורים לחיצים (GlassButton)
- [ ] Tabs ב-Interpretations
- [ ] הורדת PDF עובדת
- [ ] שיתוף ב-WhatsApp (Web Share API)
- [ ] קישורי Social Media (Instagram, TikTok)

**דפדפנים לבדוק:**
- Safari (iOS)
- Chrome (Android)
- Samsung Internet

---

### 7. 🎨 **עיצוב ותוכן**

**קבצים שאולי צריכים עדכון:**

#### A. תמונות רקע
נכון להיום משתמשים ב-`/og/share-square.png` בכל מקום.
אם יש לך תמונות רקע נוספות, עדכני:
- SalesPage
- ThankYou  
- Interpretations

#### B. טקסטים
כל הטקסטים נמצאים ב-`lib/constants.ts` תחת `CONTENT`.
בדקי שהכל מדויק ומתאים.

#### C. לוגו
נכון להיום: `/brand/logob.png`
וודאי שהקובץ קיים תחת `public/brand/`.

---

### 8. 🔍 **SEO & Metadata**

**קבצים לעדכן:**

#### `app/layout.tsx`
```tsx
export const metadata: Metadata = {
  title: BRAND.name,
  description: BRAND.taglineHe, // ✅ תוקן
  // ... rest
};
```

#### כל `page.tsx` (אם תעברי ל-Next.js routes):
```tsx
// app/calculator/page.tsx
export const metadata: Metadata = {
  title: "מחשבון קוד העושר",
  description: "הזינו את תאריך הלידה שלכם וגלו את הקוד האישי",
};
```

#### `public/robots.txt` (אם לא קיים):
```txt
User-agent: *
Allow: /

Sitemap: https://abyk.online/sitemap.xml
```

#### `app/sitemap.ts` (אם לא קיים):
```tsx
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://abyk.online', lastModified: new Date() },
    { url: 'https://abyk.online/calculator', lastModified: new Date() },
    { url: 'https://abyk.online/terms', lastModified: new Date() },
    // ...
  ];
}
```

**מה לעשות:**
- [ ] עדכני metadata בכל עמוד
- [ ] צרי robots.txt
- [ ] צרי sitemap.ts
- [ ] בדקי OG images (`/og/share-square.png`)

---

### 9. 🧪 **Testing Flow**

**זרימה מלאה לבדיקה:**

1. **Hero → Calculator:**
   - [ ] לחצי על "מחשבון קוד העושר"
   - [ ] וודאי שהניווט עובד

2. **Calculator → Result:**
   - [ ] מלאי תאריך (DD/MM/YYYY)
   - [ ] לחצי "חשב קוד"
   - [ ] וודאי שהקוד מוצג נכון
   - [ ] בדקי את זיהוי סוג הקוד (מאסטר/חוזר/מגוון)

3. **Result → Sales:**
   - [ ] לחצי "גלו את המשמעות המלאה"
   - [ ] וודאי שהקוד מוצג בכרטיס 2

4. **Sales → Payment:**
   - [ ] "דמו תשלום" → ThankYou (ללא תשלום אמיתי)
   - [ ] "מעבר לרכישה" → Grow → Callback → ThankYou

5. **ThankYou:**
   - [ ] וודאי שהמייל נשלח
   - [ ] בדקי קישורים למדיה חברתית
   - [ ] "שתפו עם חברים" - Web Share API

6. **Interpretations:**
   - [ ] לחצי "לצפייה באתר" מ-ThankYou
   - [ ] בדקי Tabs (כל ספרה + יישום יומי)
   - [ ] "הורדה כ-PDF" - וודאי שה-PDF נוצר
   - [ ] "שיתוף" - WhatsApp
   - [ ] "יעוץ אישי" - WhatsApp
   - [ ] "חישוב קוד נוסף" - חזרה ל-Calculator

---

### 10. 🚀 **Deployment**

**כשהכל עובד locally:**

#### A. Build בדיקה אחרונה
```bash
pnpm build
pnpm start
```
גלשי ל-http://localhost:3000 ובדקי שהכל עובד ב-production mode.

#### B. העלאה ל-Vercel/Netlify
```bash
# Vercel
vercel --prod

# או Netlify
netlify deploy --prod
```

#### C. Environment Variables בייצור
הגדירי ב-Dashboard:
- `RESEND_API_KEY`
- `NEXT_PUBLIC_APP_URL` (https://abyk.online)
- `GROW_WEBHOOK_SECRET` (אם צריך)

#### D. Custom Domain
אם יש לך דומיין:
- הפני DNS records
- הגדירי SSL (אוטומטי ב-Vercel/Netlify)

---

## 📋 Checklist סופי

### קריטי
- [ ] בחרתי באסטרטגיית ניווט ועדכנתי את הקוד
- [ ] המייל נשלח בהצלחה עם PDF
- [ ] התשלום ב-Grow עובד + callback
- [ ] Environment variables מוגדרים

### חשוב
- [ ] בדקתי את כל הזרימה מתחילה לסוף
- [ ] בדקתי mobile (iOS + Android)
- [ ] בדקתי PDF download
- [ ] בדקתי שיתוף ב-WhatsApp

### Nice to have
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] SEO metadata בכל עמוד
- [ ] Analytics (Google/Plausible)
- [ ] Error boundaries
- [ ] Loading states

---

## 💡 טיפים

1. **Git Commits:** עשי commit אחרי כל שינוי קטן
   ```bash
   git add .
   git commit -m "Fix: navigation flow"
   git push
   ```

2. **Testing:** בדקי על מכשיר אמיתי (לא רק דפדפן)

3. **Backups:** שמרי גיבויים של `.env.local` במקום בטוח

4. **Documentation:** עדכני את README.md עם הוראות הפעלה

---

**בהצלחה! 🎉**

אם יש שאלות או בעיות, פשוט תגידי לי ואני אעזור.
