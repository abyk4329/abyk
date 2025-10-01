"use client";
/* eslint-disable react/no-unescaped-entities */

const backgroundImage = "/images/61a287a191cbe6aa8bcb3bd084132926dd86fada.png";

export function TermsPrivacy() {
  return (
    <div className="relative min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50 -z-10" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-4xl">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-[0_4px_24px_0_rgba(94,73,52,0.12),inset_0_1px_3px_0_rgba(255,255,255,0.4)] p-8 sm:p-12 mb-8">
          <h1 className="mb-4 text-center" style={{ lineHeight: '1' }}>
            תנאי שימוש ומדיניות פרטיות
          </h1>
          <p className="caption text-center mb-2" style={{ lineHeight: '1' }}>
            Awakening by Ksenia
          </p>
          <p className="caption text-center" style={{ lineHeight: '1' }}>
            תאריך עדכון אחרון: 01.10.2025
          </p>
          <p className="caption text-center" style={{ lineHeight: '1' }}>
            נכנסו לתוקף בתאריך: 26.09.2025
          </p>
        </div>

        {/* Terms of Service */}
        <section className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-[0_4px_24px_0_rgba(94,73,52,0.12),inset_0_1px_3px_0_rgba(255,255,255,0.4)] p-6 sm:p-8 mb-6">
          <h2 className="mb-6 text-center" style={{ color: '#5e4934', lineHeight: '1', textShadow: '0 1px 2px rgba(0, 0, 0, 0.07)' }}>
            תנאי שימוש
          </h2>
          
          <div className="space-y-6">
            <div className="text-right">
              <p className="mb-4" style={{ lineHeight: '1' }}>
                האתר Awakening by Ksenia ("האתר") מופעל על ידי צ׳ודנובסקי קסניה אוריה ("המפעילה"). שימוש באתר, לרבות רכישת מוצרים דיגיטליים, מהווה הסכמה מלאה ומפורשת לתנאי שימוש אלה. אם אינך מסכים/ה לתנאים, הימנע/י משימוש באתר.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                1. אופי השירות
              </h3>
              <div className="space-y-2 text-right" style={{ lineHeight: '1' }}>
                <p>האתר מציע מוצרים דיגיטליים ייחודיים, לרבות פירוש אישי לקוד העושר.</p>
                <p>התכנים והשירותים באתר נועדו לספק הכוונה, השראה וכלים להתפתחות אישית ורוחנית.</p>
                <p>התכנים אינם מהווים תחליף לייעוץ רפואי, משפטי או פיננסי מוסמך.</p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                2. רכישה ואספקה
              </h3>
              <div className="space-y-2 text-right" style={{ lineHeight: '1' }}>
                <p>לאחר השלמת התשלום, תיפתח למשתמש/ת גישה מיידית להורדה, והעותק יישלח לכתובת הדוא"ל שנמסרה בעת ההזמנה.</p>
                <p>מאחר שמדובר במוצר דיגיטלי הנמסר באופן מיידי, לא ניתן לבטל את העסקה ולא יינתן החזר כספי.</p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                3. זכויות יוצרים
              </h3>
              <div className="space-y-2 text-right" style={{ lineHeight: '1' }}>
                <p>כל הזכויות בתכנים, בקבצים, בעיצוב ובמיתוג – שייכות ל-Awakening by Ksenia.</p>
                <p>השימוש בתכנים הוא אישי בלבד, אינו מסחרי ואינו ניתן להעברה או לשימוש חוזר ללא אישור מראש ובכתב מהמפעילה.</p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                4. אחריות מוגבלת
              </h3>
              <div className="space-y-2 text-right" style={{ lineHeight: '1' }}>
                <p>המוצרים נמסרים "As Is".</p>
                <p>האחריות המלאה על אופן היישום והשימוש בתכנים מוטלת על המשתמש/ת בלבד.</p>
                <p>המפעילה לא תישא באחריות לנזקים ישירים או עקיפים שייגרמו עקב שימוש באתר או בתכנים.</p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                5. דין וסמכות שיפוט
              </h3>
              <div className="space-y-2 text-right" style={{ lineHeight: '1' }}>
                <p>תנאי שימוש אלה כפופים לדין הישראלי בלבד.</p>
                <p>במקרה של מחלוקת, הסמכות הבלעדית תהיה נתונה לבתי המשפט המוסמכים בישראל.</p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                6. יצירת קשר
              </h3>
              <p className="text-right" style={{ lineHeight: '1' }}>
                לשאלות או פניות ניתן ליצור קשר בדוא"ל:
              </p>
              <p className="caption text-right mt-2" style={{ lineHeight: '1' }}>
                awakening.by.ksenia@gmail.com
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-[0_4px_24px_0_rgba(94,73,52,0.12),inset_0_1px_3px_0_rgba(255,255,255,0.4)] p-6 sm:p-8 mb-6">
          <h2 className="mb-6 text-center" style={{ color: '#5e4934', lineHeight: '1', textShadow: '0 1px 2px rgba(0, 0, 0, 0.07)' }}>
            מדיניות פרטיות
          </h2>
          
          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                1. זהות האחראית על המידע
              </h3>
              <p className="text-right mb-2" style={{ lineHeight: '1' }}>
                המפעילה: צ׳ודנובסקי קסניה אוריה.
              </p>
              <p className="text-right" style={{ lineHeight: '1' }}>
                דוא"ל לפניות בנושא פרטיות:
              </p>
              <p className="caption text-right mt-2" style={{ lineHeight: '1' }}>
                awakening.by.ksenia@gmail.com
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                2. סוגי המידע הנאסף
              </h3>
              <div className="space-y-2 text-right" style={{ lineHeight: '1' }}>
                <p>פרטים שנמסרו על ידי המשתמש/ת: שם, כתובת דוא"ל, פרטי הזמנה ותשלום (המעובדים על ידי ספק הסליקה החיצוני).</p>
                <p>פרטים טכניים בסיסיים: כתובת IP, סוג דפדפן ועוגיות חיוניות להפעלת האתר.</p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                3. מטרות השימוש במידע
              </h3>
              <div className="space-y-2 text-right" style={{ lineHeight: '1' }}>
                <p>אספקת המוצרים הדיגיטליים ושירות לקוחות.</p>
                <p>שליחת הפירוש או הקובץ לכתובת הדוא"ל.</p>
                <p>שיפור חוויית השימוש ואבטחת האתר.</p>
                <p>שליחת עדכונים או דיוור – רק בהסכמה מפורשת של המשתמש/ת, עם אפשרות הסרה בכל עת.</p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                4. שימוש בעוגיות (Cookies)
              </h3>
              <div className="space-y-2 text-right" style={{ lineHeight: '1' }}>
                <p>נעשה שימוש בעוגיות חיוניות בלבד לצורך תפעול האתר.</p>
                <p>עוגיות שיווקיות או סטטיסטיות יופעלו רק לאחר קבלת הסכמה מפורשת מהמשתמש/ת.</p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                5. פיקסל TikTok
              </h3>
              <div className="space-y-2 text-right" style={{ lineHeight: '1' }}>
                <p>האתר עשוי להשתמש בפיקסל של TikTok למטרות מדידה ושיווק.</p>
                <p>הפיקסל אוסף נתונים אנונימיים על התנהגות משתמשים באתר לצורך שיפור מסעות פרסום.</p>
                <p>השימוש בפיקסל כפוף למדיניות הפרטיות של TikTok.</p>
                <p>ניתן לבטל את הסכמתך לשימוש בפיקסל דרך הגדרות העוגיות באתר.</p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                6. שיתוף מידע עם צדדים שלישיים
              </h3>
              <div className="space-y-2 text-right" style={{ lineHeight: '1' }}>
                <p>המידע יועבר לצדדים שלישיים רק ככל שנדרש לצורך אספקת השירות (כגון: ספק סליקה, שירותי דיוור ואחסון בענן).</p>
                <p>המידע עלול להימסר אם קיימת חובה חוקית או דרישה של רשות מוסמכת.</p>
                <p>המידע עשוי להימסר לצורך הגנה על זכויות משפטיות, אם יתעורר צורך בכך.</p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                7. אבטחת מידע
              </h3>
              <p className="text-right" style={{ lineHeight: '1' }}>
                האתר עושה שימוש באמצעי אבטחה סבירים ומקובלים להגנה על המידע האישי מפני גישה בלתי מורשית, שימוש לרעה או חשיפה.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                8. תקופת שמירת מידע
              </h3>
              <p className="text-right" style={{ lineHeight: '1' }}>
                המידע נשמר רק ככל שנדרש למימוש מטרות המדיניות או בהתאם לחובות שמטיל הדין החל.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4 sm:p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
              <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
                9. זכויות המשתמש/ת
              </h3>
              <div className="space-y-2 text-right mb-4" style={{ lineHeight: '1' }}>
                <p>למשתמש/ת הזכות לעיין במידע שנאסף אודותיו/ה.</p>
                <p>ניתן לבקש את תיקון המידע או מחיקתו.</p>
                <p>ניתן לבקש הסרה מרשימות הדיוור בכל עת.</p>
              </div>
              <p className="text-right" style={{ lineHeight: '1' }}>
                לפניות בנושא זכויות משתמש/ת:
              </p>
              <p className="caption text-right mt-2" style={{ lineHeight: '1' }}>
                awakening.by.ksenia@gmail.com
              </p>
            </div>
          </div>
        </section>

        {/* Updates Notice */}
        <section className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-[0_4px_24px_0_rgba(94,73,52,0.12),inset_0_1px_3px_0_rgba(255,255,255,0.4)] p-6 sm:p-8">
          <h3 className="mb-3 text-right" style={{ lineHeight: '1' }}>
            עדכוני מדיניות
          </h3>
          <p className="text-right" style={{ lineHeight: '1' }}>
            מסמך זה עשוי להתעדכן מעת לעת. תאריך העדכון האחרון יופיע בראש העמוד.
          </p>
        </section>

      </div>
    </div>
  );
}