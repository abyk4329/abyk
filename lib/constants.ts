/**
 * ============================================
 * Global Constants - Awakening by Ksenia
 * ============================================
 *
 * קובץ מרכזי לכל הקבועים באפליקציה:
 * - פרטי קשר ורשתות חברתיות
 * - תוכן טקסטים לכל עמוד
 * - צבעים וטיפוגרפיה
 * - Layout ו-Spacing
 * - URLs ומסלולים (App Router, ללא Hash)
 * - הגדרות PWA
 * - הודעות (שגיאות/הצלחות)
 *
 * 📄 העמודים באתר (לפי סדר הזרימה):
 * 
 * 1. Hero.tsx           - דף הבית
 *    • כותרת: "גלו את קוד העושר שלכם"
 *    • תת-כותרת: "לחישוב וקבלת קוד אישי לפי תאריך לידה"
 *    • כפתור: "מחשבון קוד העושר"
 * 
 * 2. Calculator.tsx     - מחשבון תאריך לידה
 *    • כותרת: "מחשבון קוד העושר"
 *    • 3 שדות: DD/MM/YYYY (LTR בלבד)
 *    • כפתורים: "חשב קוד" + "אפס"
 * 
 * 3. Result.tsx         - הצגת הקוד
 *    • כותרת: "קוד העושר שלך"
 *    • הצגת קוד בן 4 ספרות
 *    • זיהוי סוג: מאסטר/חוזר/מגוון
 *    • כפתור: "גלו את המשמעות המלאה"
 * 
 * 4. SalesPage.tsx      - 3 כרטיסים + רכישה
 *    • כרטיס 1: "להבין את הקוד – להבין את עצמך"
 *    • כרטיס 2: "הפירוש המלא" + רשימת תכנים (7 פריטים)
 *    • כרטיס 3: מחיר ₪36.9 + כפתורים: "מעבר לרכישה" + "דמו תשלום"
 * 
 * 5. ThankYou.tsx       - תודה + שיתוף
 *    • כותרת: "תודה על הרכישה!"
 *    • 3 כפתורים: "לצפייה באתר", "לחישוב קוד נוסף", "לתיאום יעוץ אישי"
 *    • כפתור שיתוף: "שתפו עם חברים" (Web Share API)
 *    • 4 קישורי רשתות: WhatsApp, Instagram, TikTok, Email
 * 
 * 6. Interpretations.tsx - פירושים מלאים
 *    • כותרת: "קוד העושר שלך"
 *    • לשוניות: ספרות הקוד + "יישום יומי"
 *    • תוכן: מהות, מתנות, חסימות, נורות אדומות, צמיחה, קריירה, תרגול
 *    • כפתורים: הורדה, שיתוף, יעוץ אישי, חישוב קוד נוסף
 * 
 * 7. TermsPrivacy.tsx   - תנאים ופרטיות
 *    • כותרת: "תנאי שימוש ומדיניות פרטיות"
 *    • עדכון אחרון: 3 באוקטובר 2025
 * 
 * 8. DesignShowcase.tsx - ספר עיצוב (dev)
 *    • 7 קטגוריות: כרטיסים, כפתורים, שדות קלט, אייקונים, לייאאוטים, טיפוגרפיה, אינטראקציות
 */

/**
 * ============================================
 * Brand & Contact Information
 * ============================================
 */
const WHATSAPP_LOCAL_NUMBER = "0524616121" as const;
const WHATSAPP_INTERNATIONAL_NUMBER = "972524616121" as const;

export const BRAND = {
    name: "AWAKENING BY KSENIA",
    tagline: "YOUR PERSONAL SPACE FOR GROWTH",
    taglineHe: "מרחב אישי שמעניק לך כלים פשוטים לחיים מודעים",
    owner: "קסניה אוריה צודנובסקי",
    email: "awakening.by.ksenia@gmail.com",
    phone: WHATSAPP_LOCAL_NUMBER,
    phoneDisplay: "052-461-6121",
    // לוגו לאתר ולאימיילים (תחת public/)
    logo: "/brand/logo-brown.png",
    emailLogo: "/email/logo-email.png",
} as const;

/**
 * ============================================
 * Social Media Links
 * ============================================
 */
export const SOCIAL = {
    whatsapp: {
        number: WHATSAPP_LOCAL_NUMBER,
        internationalNumber: WHATSAPP_INTERNATIONAL_NUMBER,
        url: `https://wa.me/${WHATSAPP_INTERNATIONAL_NUMBER}`,
        messageDefault: "היי, אשמח לתיאום יעוץ אישי",
        getUrl: (message?: string) =>
            `https://wa.me/${WHATSAPP_INTERNATIONAL_NUMBER}?text=${encodeURIComponent(message || SOCIAL.whatsapp.messageDefault)}`,
    },
    instagram: {
        handle: "@awakening.by.ksenia",
        url: "https://www.instagram.com/awakening.by.ksenia/",
    },
    tiktok: {
        handle: "@awakening.by.ksenia",
        url: "https://www.tiktok.com/@awakening.by.ksenia",
    },
    email: {
        address: "awakening.by.ksenia@gmail.com",
        url: "mailto:awakening.by.ksenia@gmail.com",
    },
} as const;

/**
 * ============================================
 * Payment & Pricing - מערכת תשלומים
 * ============================================
 */
export const PAYMENT = {
    grow: {
        url: "https://pay.grow.link/b937d8523ea981c0137af77445265809-MjUyNjAyMQ",
        price: 36.9,            // מחיר נומרי
        currency: "₪",          // שקל
        priceDisplay: "₪ 36.9", // תצוגה
    },
} as const;

/**
 * ============================================
 * Color Palette - Neumorphism Design System
 * ============================================
 */
export const COLORS = {
    // Brown Tones - גווני חום
    brown: {
        dark: "#473b31",      // טקסט ראשי
        heading: "#5e4934",   // כותרות H1
        bronze: "#87674f",    // כותרות H2-H4 + אייקונים
        neutral: "#9f8572",   // Caption ותיאורים
    },

    // Sand/Beige Tones - גווני בז'/חול
    sand: {
        light: "#d3c6bd",     // גבולות
        lighter: "#ddcec0",   // רקעים בהירים
        lightest: "#eae0d8",  // רקעים בהירים מאוד
    },

    // White/Cream - לבן/קרם
    white: {
        cream: "#fdfcfb",     // רקע עיקרי
        pure: "#ffffff",      // לבן טהור
    },

    // Background Gradients - גרדיאנטים לרקעים
    gradients: {
        main: "linear-gradient(135deg, rgb(253, 252, 251) 0%, rgb(245, 241, 237) 100%)", // רקע עמוד
        card: "linear-gradient(145deg, rgb(255, 255, 255), rgb(242, 238, 234))",         // כרטיס ראשי
        cardSecondary: "linear-gradient(145deg, rgb(255, 255, 255), rgb(245, 241, 237))", // כרטיס משני
        cardFloating: "linear-gradient(145deg, rgb(255, 255, 255), rgb(248, 244, 240))",  // כרטיס צף (לוגו)
    },
} as const;

/**
 * Surface colors used for structural UI elements like the header/status bar.
 */
export const SURFACE = {
    header: "#F8F6F2",
    headerDark: "#1C1814",
} as const;

/**
 * ============================================
 * Typography Settings
 * ============================================
 */
export const TYPOGRAPHY = {
    fontFamily: "Assistant, sans-serif",

    // Font Sizes (responsive)
    sizes: {
        mobile: {
            h1: "30px",
            h2: "24px",
            h3: "22px",
            h4: "20px",
            h5: "18px",
            p: "16px",
            caption: "14px",
        },
        tablet: {
            h1: "36px",
            h2: "30px",
            h3: "26px",
            h4: "24px",
            h5: "20px",
            p: "16px",
            caption: "16px",
        },
        desktop: {
            h1: "48px",
            h2: "36px",
            h3: "32px",
            h4: "28px",
            h5: "24px",
            p: "18px",
            caption: "18px",
        },
    },

    // Font Weights
    weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },
} as const;

/**
 * ============================================
 * Layout & Spacing
 * ============================================
 */
export const LAYOUT = {
    // Header Heights
    header: {
        mobile: "56px",
        tablet: "64px",
        desktop: "64px",
    },

    // Max Widths לכל עמוד
    maxWidth: {
        sm: "640px",    // max-w-sm
        md: "768px",    // max-w-md
        lg: "896px",    // max-w-lg
        xl: "1024px",   // max-w-xl
        "2xl": "1280px",
        "3xl": "1536px",
        // Pages specific widths:
        hero: "1024px",
        calculator: "768px",
        result: "768px",
        sales: "896px",
        thankYou: "768px",
        interpretations: "1024px",
        terms: "896px",
    },

    // Spacing Scale
    spacing: {
        xs: "0.25rem", // 4px
        sm: "0.5rem", // 8px
        md: "1rem", // 16px
        lg: "1.5rem", // 24px
        xl: "2rem", // 32px
        "2xl": "3rem", // 48px
        "3xl": "4rem", // 64px
        "4xl": "6rem", // 96px
    },

    // Border Radius
    radius: {
        sm: "0.5rem", // 8px
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1.5rem", // 24px
        "2xl": "2rem", // 32px
        "3xl": "2.5rem", // 40px
        full: "9999px",
    },
} as const;

/**
 * ============================================
 * Animation & Transition Settings
 * ============================================
 */
export const ANIMATION = {
    // Durations
    duration: {
        fast: "300ms",
        normal: "500ms",
        slow: "700ms",
    },

    // Easing
    easing: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
    },

    // Splash Screen
    splash: {
        logoDelay: 0.3,
        logoDuration: 1.4,
        fadeOutDelay: 4.6,
        fadeOutDuration: 1.2,
        totalDuration: 6000, // ms
    },
} as const;

/**
 * ============================================
 * Content - Page Texts (מדויק לפי הקומפוננטות)
 * ============================================
 */
export const CONTENT = {
    // Hero Page - דף הבית (Hero.tsx)
    hero: {
        title: "גלו את קוד העושר שלכם",
        subtitle: "לחישוב וקבלת קוד אישי לפי תאריך לידה",
        button: "מחשבון קוד העושר",
    },

    // Calculator - עמוד חישוב (Calculator.tsx)
    calculator: {
        title: "מחשבון קוד העושר",
        subtitle: "הזינו את תאריך הלידה שלכם וגלו את הקוד האישי",
        placeholders: {
            day: "DD",
            month: "MM",
            year: "YYYY",
        },
        labels: {
            day: "יום",
            month: "חודש",
            year: "שנה",
        },
        buttons: {
            calculate: "חשב קוד",
            reset: "אפס",
        },
        alerts: {
            fillAll: "אנא מלא את כל השדות",
            invalidDate: "אנא הזן תאריך תקין",
        },
    },

    // Result - הצגת הקוד (Result.tsx)
    result: {
        title: "קוד העושר שלך",
        codeTypes: {
            master: {
                type: "קוד מאסטר",
                description: "כל הספרות זהות - אנרגיה מרוכזת ועוצמתית במיוחד",
            },
            repeating: {
                type: "קוד עם ספרות חוזרות",
                description: "אנרגיות מועצמות של ספרות מסוימות",
            },
            diverse: {
                type: "קוד מגוון",
                description: "כל הספרות שונות - איזון ומגוון אנרגטי",
            },
        },
        button: "גלו את המשמעות המלאה",
    },

    // Sales Page - 3 כרטיסים (SalesPage.tsx)
    sales: {
        card1: {
            title: "להבין את הקוד – להבין את עצמך",
            paragraphs: [
                "המספרים בקוד אינם צירוף מקרי. הם משקפים דפוסים עמוקים המניעים אותך לאורך חייך. כשאתה מזהה דפוסים אלה, אתה מתחיל לפעול ממקום של מודעות, ולא מתוך תגובתיות אוטומטית. זוהי נקודת המפנה שבה השליטה על חייך חוזרת לידיך.",
                "מטרת העבודה עם הקוד היא לחיות חיים מודעים, שבהם כל פעולה הופכת מתגובה לא-מודעת לבחירה מכוונת. הבנה זו מבהירה שאין כוח חיצוני המעכב את התקדמותך, אלא תבניות פנימיות שאתה עצמך יוצר. מתוך תובנה זו, הכוח שב אליך: כל אתגר הופך להזדמנות ללמידה, וכל צעד – גם אם אינו מושלם – הופך לחלק ממסע צמיחה מודע ומשמעותי.",
            ],
        },
        card2: {
            title: "הפירוש המלא",
            subtitle: "כל מה שמחכה לכם בפנים",
            analysisText: "ניתוח מעמיק של {digits} הכולל:",
            features: [
                "•  מהות כל ספרה  •",
                "•  מתנות עיקריות  •",
                "•  חסימות ואתגרים  •",
                "•  נורות אזהרה לזיהוי חוסר איזון  •",
                "•  מוקדי צמיחה והתפתחות אישית  •",
                "•  תחומי קריירה מתאימים  •",
                "•  תרגול יומיומי מעשי  •",
            ],
            additionalText: "בנוסף, תמצאו בו הסבר על משמעות הספרות החוזרות או השונות בקוד, לצד הדרכה ברורה כיצד לשלב את הקוד בחיי היומיום.",
        },
        card3: {
            title: "הגיע הזמן לגלות מה מספרים מספרים עליך",
            description: "הפירוש המלא של הקוד מעניק מפתח להבנת הדינמיקות הפנימיות המעצבות את חייך. באמצעותו ניתן לזהות את מקורות הדפוסים החוזרים, להבין כיצד להשתחרר ממעגלי סבל מתמשכים, ולפתח פרספקטיבה חדשה על האתגרים וההזדמנויות הפתוחות בפניך.",
            priceTitle: "עלות הפירוש המלא: ₪ 36.9 בלבד",
            priceSubtitle: "לקבלת גישה מיידית לפירוש שלך",
            buttons: {
                purchase: "מעבר לרכישה",
                demo: "דמו תשלום (לבדיקה)",
            },
            securityNotice: "תשלום מובטח באמצעות ספק סליקה חיצוני Grow",
        },
    },

    // Thank You - תודה + שיתוף (ThankYou.tsx)
    thankYou: {
        title: "תודה על הרכישה!",
        message: "הפירוש המלא לקוד האישי שלך נשלח במייל וממתין לך לצפייה ולהורדה.",
        buttons: {
            viewInterpretation: "לצפייה באתר",
            calculateAnother: "לחישוב קוד נוסף",
            consultation: "לתיאום יעוץ אישי",
            share: "שתפו עם חברים",
        },
        socialLinks: {
            whatsapp: "WhatsApp",
            instagram: "Instagram",
            tiktok: "TikTok",
            email: "Email",
        },
    },

    // Interpretations - פירושים מלאים (Interpretations.tsx)
    interpretations: {
        title: "קוד העושר שלך",
        tabDaily: "יישום יומי",
        codeStructureLabels: {
            master: "קוד מאסטר - כל הספרות זהות",
            repeating: " קוד עם ספרות חוזרות",
            diverse: "קוד מגוון - כל הספרות שונות",
        },
        buttons: {
            download: "הורדה",
            share: "שיתוף",
            consultation: "יעוץ אישי",
            calculateAnother: "חישוב קוד נוסף",
        },
        sections: {
            essence: "מהות הספרה",
            gifts: "מתנות עיקריות",
            blocks: "חסימות ואתגרים",
            redFlags: "נורות אדומות",
            growth: "מוקדי צמיחה",
            career: "קריירה",
            practice: "תרגול יומיומי",
        },
    },

    // Terms & Privacy - תנאים (TermsPrivacy.tsx)
    terms: {
        title: "תנאי שימוש ומדיניות פרטיות",
        lastUpdated: "עדכון אחרון: 3 באוקטובר 2025",
    },

    // Footer - כל העמודים
    footer: {
        termsLink: "תנאי שימוש ומדיניות פרטיות",
        copyright: "Awakening by Ksenia © 2025",
    },
} as const;

/**
 * ============================================
 * Validation Rules
 * ============================================
 */
export const VALIDATION = {
    date: {
        minYear: 1900,
        maxYear: new Date().getFullYear(),
        minDay: 1,
        maxDay: 31,
        minMonth: 1,
        maxMonth: 12,
    },

    code: {
        length: 4,                  // קוד תמיד בן 4 ספרות
        digitRange: [1, 9] as const // כל ספרה בין 1-9
    },
} as const;

/**
 * ============================================
 * User Flow - זרימת המשתמש המלאה
 * ============================================
 */
export const USER_FLOW = {
    main: [
        "SplashScreen → Hero",
        "Hero → Calculator",
        "Calculator → Result",
        "Result → SalesPage",
        "SalesPage → Grow Payment → ThankYou",
        "ThankYou → Interpretations / Calculator / WhatsApp",
    ],
} as const;

/**
 * ============================================
 * API Endpoints
 * ============================================
 */
export const API = {
    sendEmail: "/api/send-email",
    generatePDF: "/api/generate-pdf",
    health: "/api/health",
} as const;

/**
 * ============================================
 * PWA Settings - Progressive Web App
 * ============================================
 */
export const PWA = {
    name: "Awakening by Ksenia",
    shortName: "ABYK",
    description: "מרחב אישי שמעניק לך כלים פשוטים לחיים מודעים",
    themeColor: SURFACE.header,     // צבע תואם הדר עבור immersive status bar
    backgroundColor: SURFACE.header,
    display: "standalone",        // מסתיר את הדפדפן
    orientation: "portrait",      // מצב אנכי בלבד
    icons: {
        favicon: "/icon.png",
        apple: "/apple-icon.png",
        manifest192: "/icons/manifest-icon-192.png",
        manifest512: "/icons/manifest-icon-512.png",
    },
} as const;

/**
 * ============================================
 * Share Configuration - שיתוף והפצה
 * ============================================
 */
export const SHARE = {
    // Web Share API - תוכן השיתוף (ThankYou.tsx)
    webShare: {
        title: "Awakening by Ksenia",
        text: "מרחב אישי שמעניק לך כלים פשוטים לחיים מודעים",
        url: "https://abyk.online/",
    },
} as const;

/**
 * ============================================
 * Error Messages
 * ============================================
 */
export const ERRORS = {
    network: "שגיאת תקשורת. אנא בדוק את החיבור לאינטרנט.",
    server: "שגיאת שרת. אנא נסה שוב מאוחר יותר.",
    validation: "הנתונים שהוזנו אינם תקינים.",
    unknown: "אירעה שגיאה לא צפויה.",
    emailSend: "שליחת המייל נכשלה. אנא נסה שוב.",
    pdfGenerate: "יצירת ה-PDF נכשלה. אנא נסה שוב.",
} as const;

/**
 * ============================================
 * Success Messages
 * ============================================
 */
export const SUCCESS = {
    emailSent: "המייל נשלח בהצלחה!",
    pdfDownloaded: "ה-PDF הורד בהצלחה!",
    copied: "הועתק ללוח!",
    shared: "שותף בהצלחה!",
} as const;

/**
 * ============================================
 * Page Routes & URLs (App Router, ללא Hash)
 * ============================================
 *
 * ⚙️ אם תרצי שמסלולי "קוד העושר" יהיו תחת prefix קבוע (למשל: /wealth-code),
 * פשוט שימי את WEALTH_BASE ל-"/wealth-code" והמסלולים יתעדכנו אוטומטית.
 */
export const WEALTH_BASE = ""; // אפשר לשנות ל-"/wealth-code"

const withWealthBase = (path: `/${string}`) =>
    (WEALTH_BASE ? `${WEALTH_BASE}${path}` : path);

export const ROUTES = {
    home: "/",
    calculator: withWealthBase("/calculator"),
    result: withWealthBase("/result"),
    sales: withWealthBase("/sales"),
    thankYou: withWealthBase("/thankyou"),
    interpretations: withWealthBase("/interpretations"),
    terms: withWealthBase("/terms-privacy"),
    showcase: withWealthBase("/showcase"),
} as const;

/**
 * ============================================
 * Type Exports
 * ============================================
 */
export type PageType =
    | "home"        // Hero - דף הבית
    | "calculator"  // Calculator
    | "result"      // Result
    | "sales"       // SalesPage
    | "thankyou"    // ThankYou
    | "interpretations" // Interpretations
    | "terms"       // TermsPrivacy
    | "showcase";   // DesignShowcase

export type CodeType = "master" | "repeating" | "diverse";

/**
 * ============================================
 * Helper Functions
 * ============================================
 */
export const getColorValue = (colorPath: string): string => {
    const keys = colorPath.split(".");
    let value: any = COLORS;

    for (const key of keys) {
        value = value?.[key];
        if (!value) return "#473b31"; // fallback
    }

    return String(value);
};

export const getContentText = (path: string): string => {
    const keys = path.split(".");
    let value: any = CONTENT;

    for (const key of keys) {
        value = value?.[key];
        if (value === undefined || value === null) return "";
    }

    return typeof value === "string" ? value : "";
};
