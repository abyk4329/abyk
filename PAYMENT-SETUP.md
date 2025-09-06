# הגדרת מערכת התשלומים - Awakening by Ksenia

## סקירה כללית
המערכת מאפשרת למשתמשים לרכוש פירוש נומרולוגי מלא ולקבל אותו במייל תוך דקות ספורות.

## התהליך המלא

### 1. חישוב הקוד (בעמוד /money-code)
- משתמש מזין תאריך לידה
- המערכת מחשבת 4 מספרים: BD, BM, BY, LP
- הצגת התוצאות עם כפתור לתשלום

### 2. תשלום (דרך קישור חיצוני)
- העברה לקישור: https://mrng.to/NzYedNr0Ku
- הפרמטרים נשלחים בURL:
  - bd, bm, by, lp (המספרים)
  - birthDate (תאריך המקורי)

### 3. Webhook לאחר תשלום
- מערכת התשלומים שולחת webhook ל: `/api/payment-webhook`
- המערכת יוצרת פירוש אישי בHTML
- שליחת המייל ללקוח

## הגדרות נדרשות

### משתני סביבה (.env.local)
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
WEBHOOK_SECRET=your-webhook-secret
```

### הגדרת Gmail App Password
1. עבור לאשפר Google Account
2. אבטחה → Verify בדו-שלבי
3. App Passwords → צור סיסמת יישום
4. השתמש בסיסמה זו ב-EMAIL_PASSWORD

### הגדרת Webhook במערכת התשלומים
- URL: `https://your-domain.vercel.app/api/payment-webhook`
- Method: POST
- Expected payload:
```json
{
  "customerEmail": "customer@example.com",
  "paymentStatus": "completed",
  "customData": {
    "bd": "3",
    "bm": "7",
    "by": "9",
    "lp": "1"
  }
}
```

## מבנה הפירוש שנשלח במייל

הקובץ HTML כולל:
- עיצוב מותאם לברנד (צבעי זהב ושנהב)
- הצגת 4 המספרים בכרטיסיות יפות
- פירוש מלא לכל מספר מקובץ numbersmeaning.html
- עיצוב רספונסיבי לקריאה במובייל ובדסקטופ

## בדיקה ופיתוח

### בדיקה מקומית
```bash
# הרצת השרת
npm run dev

# בדיקת API endpoint
curl -X POST http://localhost:3001/api/payment-webhook \
  -H "Content-Type: application/json" \
  -d '{"customerEmail":"test@example.com","paymentStatus":"completed","customData":{"bd":"3","bm":"7","by":"9","lp":"1"}}'
```

### פריסה לפרודקציה
1. פרוס לVercel: `vercel --prod`
2. הגדר משתני סביבה בVercel Dashboard
3. בדוק שה-webhook endpoint פעיל

## אבטחה

- הפירושים נשלחים רק לאחר אישור תשלום
- שימוש ב-WEBHOOK_SECRET לוודא שהבקשה מגיעה מהמערכת הנכונה
- אין שמירת פרטי אשראי במערכת

## תמיכה

אם יש בעיות:
1. בדוק לוגים ב-Vercel Functions
2. ודא שמשתני הסביבה מוגדרים נכון
3. בדוק שקובץ numbersmeaning.html קריא ותקין
4. בדוק הגדרות SMTP של Gmail
