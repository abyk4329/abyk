# Core Email Module

מודול מרכזי לניהול עיצוב ותבניות אימייל עבור כל הכלים באפליקציה.

## מבנה

```text
lib/core/email/
├── styles.ts              # כל הסטיילים הכלליים והמשותפים
├── BaseEmailTemplate.ts   # תבנית בסיס עם header + footer
├── index.ts              # ייצוא מרכזי
└── README.md             # המסמך הזה
```

## שימוש

### יצירת מייל חדש לכלי חדש

כאשר את מוסיפה כלי חדש (למשל: טארוט, אסטרולוגיה, וכו'):

1. **צור תיקייה למודול החדש:**

```text
features/my-new-tool/
└── email/
    ├── MyToolEmail.ts
    └── template.ts
```

1. **השתמש בתבנית הבסיסית:**

```typescript
// features/my-new-tool/email/MyToolEmail.ts
import { BRAND, generateBaseEmail } from "@/lib/core";

export interface MyToolEmailData {
  userName?: string;
  result: string;
  shareUrl?: string;
}

// סטיילים ספציפיים לכלי שלך בלבד
const MY_TOOL_STYLES = `
  .my-tool-result {
    font-size: 24px;
    color: #5e4934;
    padding: 20px;
  }
`;

// תוכן ספציפי לכלי שלך
function generateMyToolContent(data: MyToolEmailData): string {
  return `
    <h1 class="main-title">תודה ${data.userName}!</h1>
    <div class="my-tool-result">${data.result}</div>
    <!-- תוכן נוסף כאן -->
  `;
}

// פונקציה ראשית
export function myToolEmailHtml(data: MyToolEmailData): string {
  return generateBaseEmail({
    title: `התוצאות שלך - ${BRAND.appName}`,
    customStyles: MY_TOOL_STYLES,
    content: generateMyToolContent(data),
    preheader: "התוצאות שלך ממתינות",
  });
}
```

1. **שלב ב-API endpoint:**

```typescript
// app/api/send-my-tool-email/route.ts
import { myToolEmailHtml } from "@/features/my-new-tool/email/MyToolEmail";

export async function POST(req: Request) {
  const body = await req.json();
  const html = myToolEmailHtml({
    userName: body.name,
    result: body.result,
    shareUrl: body.shareUrl,
  });
  // שלח מייל...
}
```

## מה כלול בתבנית הבסיסית

### Header

- לוגו המותג (BRAND.appName)
- סלוגן "YOUR PERSONAL SPACE FOR GROWTH"
- עיצוב neumorphism מלא

### Footer

- קישור לתנאי שימוש ופרטיות
- כתובת אימייל ליצירת קשר (BRAND.ownerEmail)
- זכויות יוצרים (BRAND.copyrightHolder)

### כפתורים מעוצבים

- `.button` - כפתור בסיסי
- `.button-primary` - כפתור ראשי
- `.button-secondary` - כפתור משני

### קישורים חברתיים

- WhatsApp
- Instagram
- TikTok
- Email

## התאמה אישית

### שינוי קישורים חברתיים

```typescript
import { generateBaseEmail, SocialLink } from "@/lib/core";

const customSocialLinks: SocialLink[] = [
  {
    href: "https://example.com",
    title: "דוגמה",
    icon: `<svg>...</svg>`,
  },
];

generateBaseEmail({
  title: "כותרת",
  content: "תוכן",
  socialLinks: customSocialLinks, // קישורים מותאמים
});
```

### הוספת סטיילים מותאמים

```typescript
const CUSTOM_STYLES = `
  .my-custom-class {
    color: red;
  }
`;

generateBaseEmail({
  title: "כותרת",
  content: "תוכן",
  customStyles: CUSTOM_STYLES,
});
```

## דוגמה: מחשבון העושר

ראי את `features/wealth-code/email/WealthEmail.ts` לדוגמה מלאה של שימוש במודול הזה.

## עיצוב תואם PDF

העיצוב במיילים תואם לעיצוב ב-PDF:

- פונט: Assistant (200-800)
- צבעים: מוגדרים ב-`lib/core/pdfConfig.ts`
- מותג: מוגדר ב-`lib/core/branding.ts`

## תחזוקה

כל שינוי בעיצוב הכללי צריך להיעשות ב:

- `lib/core/email/styles.ts` - לשינויי סגנון
- `lib/core/email/BaseEmailTemplate.ts` - לשינויי מבנה
- `lib/core/branding.ts` - לשינויי מותג

שינויים אלו ישפיעו על **כל המיילים** באפליקציה אוטומטית.
