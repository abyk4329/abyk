import styles from './TermsPrivacy.module.css';
import { NavigationProvider } from "@/app/lib/navigation";

export function TermsPrivacy() {
  return (
    <NavigationProvider value={{ showHeader: false, showFooter: false }}>
  <div className="relative min-h-[calc(100vh-var(--header-height))] pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-5xl">
          {/* Header */}
          <div className="neuro-card-shell mb-10">
            <h1 className={["mb-4", "text-center", styles.tightLineHeight].join(" ")}>תנאי שימוש ומדיניות פרטיות</h1>
            <p className={["caption", "text-center", "mb-2", styles.tightLineHeight].join(" ")}>Awakening by Ksenia</p>
            <p className={["caption", "text-center", styles.tightLineHeight].join(" ")}>תאריך עדכון אחרון: 01.10.2025</p>
            <p className={["caption", "text-center", styles.tightLineHeight].join(" ")}>נכנסו לתוקף בתאריך: 26.09.2025</p>
          </div>

          {/* Terms of Service */}
          <section className="neuro-card-shell mb-8">
            <h2 className={["mb-6", "text-center", styles.sectionHeading].join(" ")}>תנאי שימוש</h2>
            <div className="space-y-6">
              <div className="text-right">
                <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
                  האתר Awakening by Ksenia (&quot;האתר&quot;) מופעל על ידי צ׳ודנובסקי קסניה אוריה (&quot;המפעילה&quot;). שימוש באתר, לרבות רכישת מוצרים דיגיטליים, מהווה הסכמה מלאה ומפורשת לתנאי שימוש אלה. אם אינך מסכים/ה לתנאים אלו, אינך רשאי/ת להשתמש באתר.
                </p>
              </div>

              <div className="neuro-card-inset-lite !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>1. אופי השירות</h3>
                <div className={["space-y-2", "text-right", styles.tightLineHeight].join(" ")}> 
                  <p>האתר מציע מוצרים דיגיטליים ייחודיים, לרבות פירוש אישי לקוד העושר.</p>
                  <p>התכנים והשירותים באתר נועדו לספק הכוונה, השראה וכלים להתפתחות אישית ורוחנית.</p>
                  <p>התכנים אינם מהווים תחליף לייעוץ רפואי, משפטי או פיננסי מוסמך.</p>
                </div>
              </div>

              <div className="neuro-card-inset-lite !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>2. רכישה ואספקה</h3>
                <div className={["space-y-2", "text-right", styles.tightLineHeight].join(" ")}> 
                  <p>לאחר השלמת התשלום, תיפתח למשתמש/ת גישה מיידית להורדה, והעותק יישלח לכתובת הדוא&quot;ל שנמסרה בעת ההזמנה.</p>
                  <p>מאחר שמדובר במוצר דיגיטלי הנמסר באופן מיידי, לא ניתן לבטל את העסקה ולא יינתן החזר כספי.</p>
                </div>
              </div>

              <div className="neuro-card-inset-lite !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>3. זכויות יוצרים</h3>
                <div className={["space-y-2", "text-right", styles.tightLineHeight].join(" ")}> 
                  <p>כל הזכויות בתכנים, בקבצים, בעיצוב ובמיתוג – שייכות ל-Awakening by Ksenia.</p>
                  <p>השימוש בתכנים הוא אישי בלבד, אינו מסחרי ואינו ניתן להעברה או לשימוש חוזר ללא אישור מראש ובכתב מהמפעילה.</p>
                </div>
              </div>

              <div className="neuro-card-inset-lite !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>4. אחריות מוגבלת</h3>
                <div className={["space-y-2", "text-right", styles.tightLineHeight].join(" ")}> 
                  <p>המוצרים נמסרים &quot;As Is&quot;.</p>
                  <p>האחריות המלאה על אופן היישום והשימוש בתכנים מוטלת על המשתמש/ת בלבד.</p>
                  <p>המפעילה לא תישא באחריות לנזקים ישירים או עקיפים שייגרמו עקב שימוש באתר או בתכנים.</p>
                </div>
              </div>

              <div className="neuro-card-inset-lite !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>5. דין וסמכות שיפוט</h3>
                <div className={["space-y-2", "text-right", styles.tightLineHeight].join(" ")}> 
                  <p>תנאי שימוש אלה כפופים לדין הישראלי בלבד.</p>
                  <p>במקרה של מחלוקת, הסמכות הבלעדית תהיה נתונה לבתי המשפט המוסמכים בישראל.</p>
                </div>
              </div>

              <div className="neuro-card-inset-lite !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>6. יצירת קשר</h3>
                <p className={["text-right", styles.tightLineHeight].join(" ")}>לשאלות או פניות ניתן ליצור קשר בדוא&quot;ל:</p>
                <p className={["caption", "text-right", "mt-2", styles.tightLineHeight].join(" ")}>awakening.by.ksenia@gmail.com</p>
              </div>
            </div>
          </section>

          {/* Privacy Policy */}
          <section className="neuro-card-shell mb-8">
            <h2 className={["mb-6", "text-center", styles.sectionHeading].join(" ")}>מדיניות פרטיות</h2>
            <div className="space-y-6">
              <div className="neuro-card-inset-lite !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>1. זהות האחראית על המידע</h3>
                <p className={["text-right", "mb-2", styles.tightLineHeight].join(" ")}>המפעילה: צ׳ודנובסקי קסניה אוריה.</p>
                <p className={["text-right", styles.tightLineHeight].join(" ")}>דוא&quot;ל לפניות בנושא פרטיות:</p>
                <p className={["caption", "text-right", "mt-2", styles.tightLineHeight].join(" ")}>awakening.by.ksenia@gmail.com</p>
              </div>

              <div className="neuro-card-inset-lite !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>2. סוגי המידע הנאסף</h3>
                <div className={["space-y-2", "text-right", styles.tightLineHeight].join(" ")}> 
                  <p>פרטים שנמסרו על ידי המשתמש/ת: שם, כתובת דוא&quot;ל, פרטי הזמנה ותשלום (המעובדים על ידי ספק הסליקה החיצוני).</p>
                  <p>פרטים טכניים בסיסיים: כתובת IP, סוג דפדפן ועוגיות חיוניות להפעלת האתר.</p>
                </div>
              </div>

              <div className="neuro-card-inset-lite !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>3. מטרות השימוש במידע</h3>
                <div className={["space-y-2", "text-right", styles.tightLineHeight].join(" ")}> 
                  <p>אספקת המוצרים הדיגיטליים ושירות לקוחות.</p>
                  <p>שליחת הפירוש או הקובץ לכתובת הדוא&quot;ל.</p>
                  <p>שיפור חוויית השימוש ואבטחת האתר.</p>
                  <p>שליחת עדכונים או דיוור – רק בהסכמה מפורשת של המשתמש/ת, עם אפשרות הסרה בכל עת.</p>
                </div>
              </div>

              <div className="neuro-card-inset-lite !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>4. שימוש בעוגיות (Cookies)</h3>
                <div className={["space-y-2", "text-right", styles.tightLineHeight].join(" ")}> 
                  <p>האתר משתמש בקובצי קוקיז לצורך שיפור החוויה, איסוף מידע סטטיסטי ומטרות שיווק.</p>
                  <p>השימוש בקוקיז כולל גם שימוש בפיקסל של TikTok למדידה ושיווק.</p>
                  <p>המשתמש/ת יכול/ה לאשר או לסרב לשימוש בקוקיז דרך ההודעה שמופיעה בעת כניסה לאתר.</p>
                  <p>אישור הקוקיז נשמר במכשיר וההודעה לא תופיע שוב עד שהמשתמש/ת ימחק/תמחק את נתוני הדפדפן.</p>
                </div>
              </div>

              <div className="neuro-card-inset-lite !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>5. פיקסל TikTok</h3>
                <div className={["space-y-2", "text-right", styles.tightLineHeight].join(" ")}> 
                  <p>האתר עשוי להשתמש בפיקסל של TikTok למטרות מדידה ושיווק.</p>
                  <p>הפיקסל אוסף נתונים אנונימיים על התנהגות משתמשים באתר לצורך שיפור מסעות פרסום.</p>
                  <p>השימוש בפיקסל כפוף למדיניות הפרטיות של TikTok.</p>
                  <p>ניתן לבטל את הסכמתך לשימוש בפיקסל דרך הגדרות העוגיות באתר.</p>
                </div>
              </div>

              <div className="neuro-card-inset-lite !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>6. שיתוף מידע עם צדדים שלישיים</h3>
                <div className={["space-y-2", "text-right", styles.tightLineHeight].join(" ")}> 
                  <p>המידע יועבר לצדדים שלישיים רק ככל שנדרש לצורך אספקת השירות (כגון: ספק סליקה, שירותי דיוור ואחסון בענן).</p>
                  <p>המידע עלול להימסר אם קיימת חובה חוקית או דרישה של רשות מוסמכת.</p>
                  <p>המידע עשוי להימסר לצורך הגנה על זכויות משפטיות, אם יתעורר צורך בכך.</p>
                </div>
              </div>

              <div className="neuro-card-inset-lite !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>7. אבטחת מידע</h3>
                <p className={["text-right", styles.tightLineHeight].join(" ")}>האתר עושה שימוש באמצעי אבטחה סבירים ומקובלים להגנה על המידע האישי מפני גישה בלתי מורשית, שימוש לרעה או חשיפה.</p>
              </div>

              <div className="neuro-card-inset !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>8. תקופת שמירת מידע</h3>
                <p className={["text-right", styles.tightLineHeight].join(" ")}>המידע נשמר רק ככל שנדרש למימוש מטרות המדיניות או בהתאם לחובות שמטיל הדין החל.</p>
              </div>

              <div className="neuro-card-inset !p-5 sm:!p-6 rounded-2xl">
                <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>9. זכויות המשתמש/ת</h3>
                <div className={["space-y-2", "text-right", "mb-4", styles.tightLineHeight].join(" ")}> 
                  <p>למשתמש/ת הזכות לעיין במידע שנאסף אודותיו/ה.</p>
                  <p>ניתן לבקש את תיקון המידע או מחיקתו.</p>
                  <p>ניתן לבקש הסרה מרשימות הדיוור בכל עת.</p>
                </div>
                <p className={["text-right", styles.tightLineHeight].join(" ")}>לפניות בנושא זכויות משתמש/ת:</p>
                <p className={["caption", "text-right", "mt-2", styles.tightLineHeight].join(" ")}>awakening.by.ksenia@gmail.com</p>
              </div>
            </div>
          </section>

          {/* Updates Notice */}
          <section className="neuro-card-shell">
            <h3 className={["mb-3", "text-right", styles.subheading].join(" ")}>עדכוני מדיניות</h3>
            <p className={["text-right", styles.tightLineHeight].join(" ")}>מסמך זה עשוי להתעדכן מעת לעת. תאריך העדכון האחרון יופיע בראש העמוד.</p>
          </section>
        </div>
      </div>
    </NavigationProvider>
  );
}