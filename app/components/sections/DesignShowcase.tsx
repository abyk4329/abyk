import { BRAND, COLORS } from "@/lib/constants";

const COLOR_ENTRIES = [
  { name: "Brown Dark", token: "--brown-dark", value: COLORS.brownDark },
  { name: "Brown Heading", token: "--brown-heading", value: COLORS.brownHeading },
  { name: "Brown Mid", token: "--brown-mid", value: COLORS.brownMid },
  { name: "Brown Light", token: "--brown-light", value: COLORS.brownLight },
  { name: "Cream", token: "--cream", value: COLORS.cream },
  { name: "Beige", token: "--beige", value: COLORS.beige },
  { name: "Border", token: "--border", value: COLORS.border },
];

export function DesignShowcaseSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <header className="text-center">
          <span className="caption text-brown-mid">Design System</span>
          <h2 className="mt-2 text-3xl text-brown-heading sm:text-4xl">
            עקרונות עיצוב של {BRAND.name}
          </h2>
          <p className="mt-4 text-brown-dark/80">
            ניאו-מורפיזם רך, טיפוגרפיית Assistant וצללים שקטים ליצירת חוויה מלטפת אך ממוקדת.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr,1.2fr]">
          <div className="space-y-6 rounded-[32px] border border-border bg-white/80 p-6 shadow-inner">
            <h3 className="text-xl font-semibold text-brown-heading">עמודי תווך</h3>
            <ul className="space-y-3 text-right text-sm text-brown-dark/80">
              <li>• עומק עדין עם שימוש ב-shadow כפול (inner + outer)</li>
              <li>• פלטת צבעים מוגבלת לגווני חום-בז׳ כדי להעצים את הדמות המרכזית</li>
              <li>• ריווח נדיב ואלמנטים עגולים המשדרים רכות וביטחון</li>
              <li>• טיפוגרפיה ברורה עם היררכיה חדה וכותרות עוצמתיות</li>
            </ul>
            <div className="rounded-3xl border border-border bg-white/70 p-5 text-right text-sm text-brown-dark/70">
              <p className="font-semibold text-brown-heading">טיפ:</p>
              <p className="mt-2">
                השתמשי במחלקות .neuro-card-main ו-.neuro-button כדי לשמור על עקביות חזותית לאורך האתר כולו.
              </p>
            </div>
          </div>

          <div className="rounded-[32px] border border-border bg-white/80 p-6 shadow-inner">
            <h3 className="text-xl font-semibold text-brown-heading">פלטת הצבעים</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {COLOR_ENTRIES.map((color) => (
                <div key={color.token} className="flex items-center gap-4 rounded-3xl border border-border bg-white/70 p-4">
                  <div
                    className="h-14 w-14 rounded-2xl shadow-inner"
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="text-right text-sm text-brown-dark/80">
                    <p className="font-semibold text-brown-heading">{color.name}</p>
                    <p>{color.value}</p>
                    <p className="text-xs text-brown-mid">{color.token}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-border bg-white/70 p-6 text-right text-sm text-brown-dark/80">
              <p className="font-semibold text-brown-heading">רכיבי ליבה</p>
              <ul className="mt-3 space-y-2">
                <li>• כפתור <span className="font-semibold">neuro-button</span> לפעולות ראשיות</li>
                <li>• כפתור <span className="font-semibold">neuro-button-secondary</span> לפעולות משניות</li>
                <li>• כרטיס <span className="font-semibold">neuro-card-main</span> להצגת מידע ממוקד</li>
                <li>• כרטיס <span className="font-semibold">neuro-card-secondary</span> למשני ומדגיש</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
