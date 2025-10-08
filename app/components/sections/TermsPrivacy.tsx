"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

import styles from "./TermsPrivacy.module.css";
import { NavigationProvider } from "@/app/lib/navigation";
import { routes } from "@/lib/routes";
import { createHoverHandlers } from "@/app/components/lib/neomorphism-styles";

const INTRO_CARD_BASE_SHADOW =
  "30px 30px 90px rgba(159,133,114,0.18), -30px -30px 90px rgba(255,255,255,0.95), inset 2px 2px 6px rgba(255,255,255,0.85), inset -2px -2px 6px rgba(211,198,189,0.08)";
const INTRO_CARD_HOVER_SHADOW =
  "34px 34px 100px rgba(159,133,114,0.24), -34px -34px 100px rgba(255,255,255,0.97), inset 2px 2px 7px rgba(255,255,255,0.9), inset -2px -2px 7px rgba(211,198,189,0.12)";

const OUTER_CARD_BASE_SHADOW =
  "20px 24px 72px rgba(159,133,114,0.16), -20px -24px 72px rgba(255,255,255,0.94), inset 1px 1px 2px rgba(255,255,255,0.65)";
const OUTER_CARD_HOVER_SHADOW =
  "24px 28px 82px rgba(159,133,114,0.2), -24px -28px 82px rgba(255,255,255,0.97), inset 1px 1px 3px rgba(255,255,255,0.72)";

type Paragraph = {
  content: string;
  isCaption?: boolean;
  isLead?: boolean;
};

type Section = {
  heading: string;
  paragraphs: Paragraph[];
};

const TERMS_INTRO_PARAGRAPHS: Paragraph[] = [
  {
    content:
      "האתר Awakening by Ksenia (\"האתר\") מופעל על ידי צ׳ודנובסקי קסניה אוריה (\"המפעילה\"). שימוש באתר, לרבות רכישת מוצרים דיגיטליים, מהווה הסכמה מלאה ומפורשת לתנאי שימוש אלה.",
    isLead: true,
  },
  {
    content: "אם אינך מסכים/ה לתנאים אלו, אינך רשאי/ת להשתמש באתר.",
    isLead: true,
  },
];

const TERMS_SUBSECTIONS: Section[] = [
  {
    heading: "אופי השירות",
    paragraphs: [
      {
        content: "האתר מציע מוצרים דיגיטליים ייחודיים, לרבות פירוש אישי לקוד העושר.",
      },
      {
        content: "התכנים והשירותים באתר נועדו לספק הכוונה, השראה וכלים להתפתחות אישית ורוחנית.",
      },
      {
        content: "התכנים אינם מהווים תחליף לייעוץ רפואי, משפטי או פיננסי מוסמך.",
      },
    ],
  },
  {
    heading: "רכישה ואספקה",
    paragraphs: [
      {
        content:
          "לאחר השלמת התשלום, תיפתח למשתמש/ת גישה מיידית להורדה, והעותק יישלח לכתובת הדוא\"ל שנמסרה בעת ההזמנה.",
      },
      {
        content: "מאחר שמדובר במוצר דיגיטלי הנמסר באופן מיידי, לא ניתן לבטל את העסקה ולא יינתן החזר כספי.",
      },
    ],
  },
  {
    heading: "זכויות יוצרים",
    paragraphs: [
      {
        content: "כל הזכויות בתכנים, בקבצים, בעיצוב ובמיתוג – שייכות ל-Awakening by Ksenia.",
      },
      {
        content:
          "השימוש בתכנים הוא אישי בלבד, אינו מסחרי ואינו ניתן להעברה או לשימוש חוזר ללא אישור מראש ובכתב מהמפעילה.",
      },
    ],
  },
  {
    heading: "אחריות מוגבלת",
    paragraphs: [
      {
        content: "המוצרים נמסרים \"As Is\".",
      },
      {
        content: "האחריות המלאה על אופן היישום והשימוש בתכנים מוטלת על המשתמש/ת בלבד.",
      },
      {
        content:
          "המפעילה לא תישא באחריות לנזקים ישירים או עקיפים שייגרמו עקב שימוש באתר או בתכנים.",
      },
    ],
  },
  {
    heading: "דין וסמכות שיפוט",
    paragraphs: [
      {
        content: "תנאי שימוש אלה כפופים לדין הישראלי בלבד.",
      },
      {
        content: "במקרה של מחלוקת, הסמכות הבלעדית תהיה נתונה לבתי המשפט המוסמכים בישראל.",
      },
    ],
  },
  {
    heading: "יצירת קשר",
    paragraphs: [
      {
        content: "לשאלות או פניות ניתן ליצור קשר בדוא\"ל:",
      },
      {
        content: "awakening.by.ksenia@gmail.com",
        isCaption: true,
      },
    ],
  },
];

const PRIVACY_SUBSECTIONS: Section[] = [
  {
    heading: "זהות האחראית על המידע",
    paragraphs: [
      { content: "המפעילה: צ׳ודנובסקי קסניה אוריה." },
      { content: "דוא\"ל לפניות בנושא פרטיות:" },
      { content: "awakening.by.ksenia@gmail.com", isCaption: true },
    ],
  },
  {
    heading: "סוגי המידע הנאסף",
    paragraphs: [
      {
        content:
          "פרטים שנמסרו על ידי המשתמש/ת: שם, כתובת דוא\"ל, פרטי הזמנה ותשלום (המעובדים על ידי ספק הסליקה החיצוני).",
      },
      {
        content:
          "פרטים טכניים בסיסיים: כתובת IP, סוג דפדפן ועוגיות חיוניות להפעלת האתר.",
      },
    ],
  },
  {
    heading: "מטרות השימוש במידע",
    paragraphs: [
      { content: "אספקת המוצרים הדיגיטליים ושירות לקוחות." },
      { content: "שליחת הפירוש או הקובץ לכתובת הדוא\"ל." },
      { content: "שיפור חוויית השימוש ואבטחת האתר." },
      {
        content:
          "שליחת עדכונים או דיוור – רק בהסכמה מפורשת של המשתמש/ת, עם אפשרות הסרה בכל עת.",
      },
    ],
  },
  {
    heading: "שימוש בעוגיות (Cookies)",
    paragraphs: [
      {
        content:
          "האתר משתמש בקובצי קוקיז לצורך שיפור החוויה, איסוף מידע סטטיסטי ומטרות שיווק.",
      },
      {
        content:
          "השימוש בקוקיז כולל גם שימוש בפיקסל של TikTok למדידה ושיווק.",
      },
      {
        content:
          "המשתמש/ת יכול/ה לאשר או לסרב לשימוש בקוקיז דרך ההודעה שמופיעה בעת כניסה לאתר.",
      },
      {
        content:
          "אישור הקוקיז נשמר במכשיר וההודעה לא תופיע שוב עד שהמשתמש/ת ימחק/תמחק את נתוני הדפדפן.",
      },
    ],
  },
  {
    heading: "פיקסל TikTok",
    paragraphs: [
      { content: "האתר עשוי להשתמש בפיקסל של TikTok למטרות מדידה ושיווק." },
      {
        content:
          "הפיקסל אוסף נתונים אנונימיים על התנהגות משתמשים באתר לצורך שיפור מסעות פרסום.",
      },
      { content: "השימוש בפיקסל כפוף למדיניות הפרטיות של TikTok." },
      { content: "ניתן לבטל את הסכמתך לשימוש בפיקסל דרך הגדרות העוגיות באתר." },
    ],
  },
  {
    heading: "שיתוף מידע עם צדדים שלישיים",
    paragraphs: [
      {
        content:
          "המידע יועבר לצדדים שלישיים רק ככל שנדרש לצורך אספקת השירות (כגון: ספק סליקה, שירותי דיוור ואחסון בענן).",
      },
      {
        content:
          "המידע עלול להימסר אם קיימת חובה חוקית או דרישה של רשות מוסמכת.",
      },
      {
        content: "המידע עשוי להימסר לצורך הגנה על זכויות משפטיות, אם יתעורר צורך בכך.",
      },
    ],
  },
  {
    heading: "אבטחת מידע",
    paragraphs: [
      {
        content:
          "האתר עושה שימוש באמצעי אבטחה סבירים ומקובלים להגנה על המידע האישי מפני גישה בלתי מורשית, שימוש לרעה או חשיפה.",
      },
    ],
  },
  {
    heading: "תקופת שמירת מידע",
    paragraphs: [
      {
        content: "המידע נשמר רק ככל שנדרש למימוש מטרות המדיניות או בהתאם לחובות שמטיל הדין החל.",
      },
    ],
  },
  {
    heading: "זכויות המשתמש/ת",
    paragraphs: [
      { content: "למשתמש/ת הזכות לעיין במידע שנאסף אודותיו/ה." },
      { content: "ניתן לבקש את תיקון המידע או מחיקתו." },
      { content: "ניתן לבקש הסרה מרשימות הדיוור בכל עת." },
      { content: "לפניות בנושא זכויות משתמש/ת:" },
      { content: "awakening.by.ksenia@gmail.com", isCaption: true },
    ],
  },
];

const POLICY_UPDATE_PARAGRAPHS: Paragraph[] = [
  {
    content: "מסמך זה עשוי להתעדכן מעת לעת. תאריך העדכון האחרון יופיע בראש העמוד.",
  },
];

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export function TermsPrivacy() {
  const router = useRouter();

  const navigationOverrides = useMemo(
    () => ({
      isVisible: true,
      showHeader: false,
      showFooter: false,
      lockScroll: false,
      canGoBack: true,
      onGoBack: () => router.push(routes.home),
      onGoHome: () => router.push(routes.home),
      canGoForward: false,
    }),
    [router]
  );

  return (
    <NavigationProvider value={navigationOverrides}>
      <section className={cn("hero-shell", styles.termsShell)}>
        <div className={styles.contentWrap}>
          <article
            data-hero-group="b"
            className={cn(
              styles.introCard,
              "p-6",
              "sm:p-8",
              "lg:p-10",
              "transition-all",
              "duration-500"
            )}
            {...createHoverHandlers(
              INTRO_CARD_BASE_SHADOW,
              INTRO_CARD_HOVER_SHADOW
            )}
          >
            <header className="flex flex-col items-center gap-2 text-center">
              <div className={styles.iconWrapper}>
                <FileText strokeWidth={1} className={styles.docIcon} />
              </div>
              <h1
                className={cn(
                  styles.tightLineHeight,
                  "font-extrabold",
                  "text-3xl",
                  "sm:text-4xl",
                  "lg:text-5xl",
                  "text-[#5e4934]",
                  "tracking-tight"
                )}
              >
                תנאי שימוש ומדיניות פרטיות
              </h1>
              <p
                className={cn(
                  "caption",
                  styles.tightLineHeight,
                  styles.introMeta
                )}
              >
                Awakening by Ksenia
              </p>
              <p
                className={cn(
                  "caption",
                  styles.tightLineHeight,
                  styles.introMeta
                )}
              >
                תאריך עדכון אחרון: 01.10.2025
              </p>
              <p
                className={cn(
                  "caption",
                  styles.tightLineHeight,
                  styles.introMeta
                )}
              >
                נכנסו לתוקף בתאריך: 26.09.2025
              </p>
            </header>

            {/* Intro card now holds metadata only; lead paragraphs live in the first outer card */}
          </article>

          <div className={styles.cardsStack}>
            <section
              className={cn(
                styles.outerCard,
                "py-6",
                "sm:py-8",
                "lg:py-10",
                "px-[4px]",
                "sm:px-4",
                "lg:px-5",
                "transition-all",
                "duration-500"
              )}
              {...createHoverHandlers(
                OUTER_CARD_BASE_SHADOW,
                OUTER_CARD_HOVER_SHADOW
              )}
            >
              <h2
                className={cn(
                  "mb-4",
                  "text-center",
                  styles.sectionHeading
                )}
              >
                תנאי שימוש
              </h2>
              <div className="flex flex-col space-y-6">
                <div
                  className={cn(
                    styles.innerCard,
                    "p-5",
                    "sm:p-6",
                    "transition-all",
                    "duration-500"
                  )}
                >
                  <div
                    className={cn(
                      "space-y-3",
                      "text-center",
                      styles.tightLineHeight
                    )}
                  >
                    {TERMS_INTRO_PARAGRAPHS.map((paragraph) => (
                      <p
                        key={`lead-${paragraph.content}`}
                        className={cn(
                          paragraph.isLead && styles.leadParagraph,
                          styles.tightLineHeight,
                          "text-center"
                        )}
                      >
                        {paragraph.content}
                      </p>
                    ))}
                  </div>
                </div>

                {TERMS_SUBSECTIONS.map((section) => (
                  <div
                    key={section.heading}
                    className={cn(
                      styles.innerCard,
                      "p-5",
                      "sm:p-6",
                      "transition-all",
                      "duration-500"
                    )}
                  >
                    <h3
                      className={cn(
                        "mb-3",
                        "text-center",
                        styles.subheading
                      )}
                    >
                      {section.heading}
                    </h3>
                    <div
                      className={cn(
                        "space-y-3",
                        "text-center",
                        styles.tightLineHeight
                      )}
                    >
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.content}
                          className={cn(
                            paragraph.isCaption && "caption",
                            paragraph.isLead && styles.leadParagraph,
                            styles.tightLineHeight,
                            "text-center"
                          )}
                        >
                          {paragraph.content}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section
              className={cn(
                styles.outerCard,
                "py-6",
                "sm:py-8",
                "lg:py-10",
                "px-[4px]",
                "sm:px-4",
                "lg:px-5",
                "transition-all",
                "duration-500"
              )}
              {...createHoverHandlers(
                OUTER_CARD_BASE_SHADOW,
                OUTER_CARD_HOVER_SHADOW
              )}
            >
              <h2
                className={cn(
                  "mb-4",
                  "text-center",
                  styles.sectionHeading
                )}
              >
                מדיניות פרטיות
              </h2>
              <div className="flex flex-col space-y-6">
                {PRIVACY_SUBSECTIONS.map((section) => (
                  <div
                    key={section.heading}
                    className={cn(
                      styles.innerCard,
                      "p-5",
                      "sm:p-6",
                      "transition-all",
                      "duration-500"
                    )}
                  >
                    <h3
                      className={cn(
                        "mb-3",
                        "text-center",
                        styles.subheading
                      )}
                    >
                      {section.heading}
                    </h3>
                    <div
                      className={cn(
                        "space-y-3",
                        "text-center",
                        styles.tightLineHeight
                      )}
                    >
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.content}
                          className={cn(
                            paragraph.isCaption && "caption",
                            paragraph.isLead && styles.leadParagraph,
                            styles.tightLineHeight,
                            "text-center"
                          )}
                        >
                          {paragraph.content}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section
              className={cn(
                styles.outerCard,
                "py-6",
                "sm:py-8",
                "lg:py-10",
                "px-[4px]",
                "sm:px-4",
                "lg:px-5",
                "transition-all",
                "duration-500"
              )}
              {...createHoverHandlers(
                OUTER_CARD_BASE_SHADOW,
                OUTER_CARD_HOVER_SHADOW
              )}
            >
              <h2
                className={cn(
                  "mb-4",
                  "text-center",
                  styles.sectionHeading
                )}
              >
                עדכוני מדיניות
              </h2>
              <div
                className={cn(
                  styles.innerCard,
                  "p-5",
                  "sm:p-6",
                  "transition-all",
                  "duration-500"
                )}
              >
                <div
                  className={cn(
                    "space-y-3",
                    "text-center",
                    styles.tightLineHeight
                  )}
                >
                  {POLICY_UPDATE_PARAGRAPHS.map((paragraph) => (
                    <p key={paragraph.content}>{paragraph.content}</p>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </NavigationProvider>
  );
}
