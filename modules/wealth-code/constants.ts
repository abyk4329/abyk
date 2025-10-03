/**
 * Wealth Code Feature Constants
 * --------------------------------
 * Dedicated configuration for the numerology / wealth-code experience.
 */

export const WEALTH_BASE_PATH = "/wealth-code" as const;

const withWealthBase = (path: `/${string}`) => `${WEALTH_BASE_PATH}${path}` as const;

export const WEALTH_ROUTES = {
    calculator: withWealthBase("/calculator"),
    result: withWealthBase("/result"),
    sales: withWealthBase("/sales"),
    thankYou: withWealthBase("/thank-you"),
    interpretations: withWealthBase("/interpretations"),
} as const;

export type WealthRouteKey = keyof typeof WEALTH_ROUTES;

export const WEALTH_PAYMENT = {
    grow: {
        url: "https://pay.grow.link/b937d8523ea981c0137af77445265809-MjUyNjAyMQ",
        price: 36.9,
        currency: "₪",
        priceDisplay: "₪ 36.9",
    },
} as const;

export const WEALTH_VALIDATION = {
    date: {
        minYear: 1900,
        maxYear: new Date().getFullYear(),
        minDay: 1,
        maxDay: 31,
        minMonth: 1,
        maxMonth: 12,
    },
    code: {
        length: 4,
        digitRange: [1, 9] as const,
    },
} as const;

export const WEALTH_API = {
    sendEmail: "/api/send-email",
    generatePDF: "/api/generate-pdf",
} as const;

export const WEALTH_CONTENT = {
    calculator: {
        title: "חשבי את קוד השפע שלך",
        subtitle:
            "הזיני שם מלא (בעברית או באנגלית) ותאריך לידה. המערכת תחשב עבורך את הקוד הראשוני, ותוכלי לקבל PDF מפורט ישירות למייל.",
        variantTitles: {
            compact: "מחשבון מהיר",
            full: "המחשבון השלם",
        },
        placeholders: {
            fullName: "למשל: קסניה צ'ודנובסקיה",
            birthDate: "YYYY-MM-DD",
            email: "example@email.com",
            notes: "מה היית רוצה לממש בתקופה הקרובה?",
        },
        labels: {
            fullName: "שם מלא",
            birthDate: "תאריך לידה",
            email: "אימייל (לא חובה)",
            notes: "כוונה או מטרה לשנה הקרובה",
        },
        buttons: {
            calculate: "חשבי עכשיו",
            reset: "ניקוי טופס",
        },
        alerts: {
            fillAll: "נא להזין שם מלא ותאריך לידה לחישוב מדויק",
            calculationError: "אירעה שגיאה בתהליך החישוב. נסי שוב.",
        },
        result: {
            caption: "קוד השפע האישי שלך",
            reducedNameLabel: "ערך השם המצומצם",
            reducedBirthLabel: "ערך תאריך הלידה המצומצם",
            showBreakdown: "הצג פירוט מלא",
            hideBreakdown: "הסתר פירוט",
            strengthsLabel: "חוזקות",
            challengesLabel: "אתגרים אפשריים",
            mantraLabel: "מנטרה ליישום",
            actionsLabel: "צעדים מומלצים",
            emailTitle: "שליחת דו\"ח מפורט למייל",
            emailDescription:
                "הכניסי את כתובת המייל והדו\"ח השלם יישלח אלייך עם PDF מפורט על הקוד שלך.",
            viewInterpretations: "לגלריית הפירושים המלאה",
        },
    },
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
    sales: {
        card1: {
            title: "להבין את הקוד – להבין את עצמך",
            paragraphs: [
                "המספרים בקוד אינם צירוף מקרי. הם משקפים דפוסים עמוקים המניעים אותך לאורך חייך. כשאתה מזהה דפוסים אלה, אתה מתחיל לפעול ממקום של מודעות, ולא מתוך תגובתיות אוטומטית. זוהי נקודת המפנה שבה השליטה על חייך חוזרת לידיך.",
                "מטרת העבודה עם הקוד היא לחיות חיים מודעים, שבהם כל פעולה הופכת מתגובה לא-מודעת לבחירה מכוונת. הבנה זו מבהירה שאין כוח חיצוני המעכב את התקדמותך, אלא תבניות פנימיות שאתה עצמך יוצר. מתוך תובנה זו, הכוח שב אליך: כל אתגר הופך להזדמנות ללמידה, וכל צעד – גם אם אינו מושלם – הופך לחלק ממסע צמיחה מודע ומשמעותי.",
            ],
        },
        brandStory: {
            intro:
                "הקוד שגילית הוא הרבה מעבר למספר — הוא מצפן לחיים עם יותר בהירות, הכנסות מדויקות ויחסים מלאי אהבה.",
            mission:
                "אני קסניה, מייסדת Awakening by Ksenia. מלווה נשים להגשמת הפוטנציאל שלהן דרך נומרולוגיה, תודעה ופעולות ממוקדות.",
            bullets: [
                "• נגיש מכל מכשיר",
                "• מתאים גם אם זו הפעם הראשונה שלך עם נומרולוגיה",
                "• ליווי אישי בהודעות לאורך המסע",
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
            additionalText:
                "בנוסף, תמצאו בו הסבר על משמעות הספרות החוזרות או השונות בקוד, לצד הדרכה ברורה כיצד לשלב את הקוד בחיי היומיום.",
        },
        card3: {
            title: "הגיע הזמן לגלות מה מספרים מספרים עליך",
            description:
                "הפירוש המלא של הקוד מעניק מפתח להבנת הדינמיקות הפנימיות המעצבות את חייך. באמצעותו ניתן לזהות את מקורות הדפוסים החוזרים, להבין כיצד להשתחרר ממעגלי סבל מתמשכים, ולפתח פרספקטיבה חדשה על האתגרים וההזדמנויות הפתוחות בפניך.",
            priceTitle: "עלות הפירוש המלא: ₪ 36.9 בלבד",
            priceSubtitle: "לקבלת גישה מיידית לפירוש שלך",
            buttons: {
                purchase: "מעבר לרכישה",
                demo: "דמו תשלום (לבדיקה)",
            },
            securityNotice: "תשלום מובטח באמצעות ספק סליקה חיצוני Grow",
        },
    },
    thankYou: {
        title: "תודה על הרכישה!",
        message: "הפירוש המלא לקוד האישי שלך נשלח במייל וממתין לך לצפייה ולהורדה.",
        buttons: {
            viewInterpretation: "לצפייה באתר",
            calculateAnother: "לחישוב קוד נוסף",
            consultation: "לתיאום יעוץ אישי",
            share: "שתפו עם חברים",
            resend: "שלח מייל שוב",
        },
        socialLinks: {
            whatsapp: "WhatsApp",
            instagram: "Instagram",
            tiktok: "TikTok",
            email: "Email",
        },
    },
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
} as const;

export type WealthCodeType = "master" | "repeating" | "diverse";

export const WEALTH_SHARE = {
    webShare: {
        title: "Awakening by Ksenia",
        text: "מרחב אישי שמעניק לך כלים פשוטים לחיים מודעים",
        url: "https://abyk.online/",
    },
} as const;

export const WEALTH_USER_FLOW = {
    main: [
        "SplashScreen → Hero",
        "Hero → Calculator",
        "Calculator → Result",
        "Result → SalesPage",
        "SalesPage → Grow Payment → ThankYou",
        "ThankYou → Interpretations / Calculator / WhatsApp",
    ],
} as const;
