import Link from "next/link";
import { PAYMENT, BRAND, SOCIAL } from "@/lib/constants";

export function SalesPageSection() {
  return (
    <section className="py-16">
      <div className="neuro-card-main mx-auto max-w-4xl rounded-[36px] bg-white/80 p-10 shadow-xl">
        <header className="text-center">
          <span className="caption text-brown-mid">תוכנית השפע המלאה</span>
          <h2 className="mt-2 text-3xl text-brown-heading sm:text-4xl">
            הצטרפי למסע AWAKENING
          </h2>
          <p className="mt-4 text-brown-dark/80">
            אחרי שגילית את קוד השפע שלך, הגיע הזמן להכניס אותו לפעולה עם ליווי, תרגילים והכוונה.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-border bg-white/70 p-6 shadow-inner">
            <h3 className="text-xl font-semibold text-brown-heading">מה מקבלים?</h3>
            <ul className="space-y-3 text-right text-sm text-brown-dark/80">
              <li>• דו&quot;ח PDF אישי עם פירוש מלא</li>
              <li>• תרגילים שבועיים ליישום אנרגיית הקוד</li>
              <li>• מדיטציית אודיו מותאמת לאנרגיה שלך</li>
              <li>• הזמנה לקהילה סגורה ב-WhatsApp</li>
              <li>• מעקב ובדיקת תוצאות לאחר 30 יום</li>
            </ul>

            <div className="rounded-2xl border border-border bg-white/80 p-4 text-right">
              <p className="text-sm text-brown-mid">השקה מיוחדת</p>
              <p className="text-3xl font-bold text-brown-heading">{PAYMENT.price}</p>
              <p className="text-xs text-brown-dark/60">כולל מע&quot;מ ומייל לווי</p>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-border bg-white/70 p-6 text-right">
            <p className="text-brown-dark/80">
              {BRAND.description}. הקוד שגילית הוא הרבה מעבר למספר — הוא מצפן לחיים
              עם יותר בהירות, הכנסות מדויקות ויחסים מלאי אהבה.
            </p>
            <p className="text-brown-dark/80">
              אני קסניה, מייסדת {BRAND.name}. מלווה נשים להגשמת הפוטנציאל שלהן
              דרך נומרולוגיה, תודעה ופעולות ממוקדות.
            </p>
            <div className="space-y-3 text-sm text-brown-dark/70">
              <p>• נגיש מכל מכשיר</p>
              <p>• מתאים גם אם זו הפעם הראשונה שלך עם נומרולוגיה</p>
              <p>• ליווי אישי בהודעות לאורך המסע</p>
            </div>
            <Link
              href={PAYMENT.growLink}
              target="_blank"
              className="neuro-button active-press block rounded-2xl px-8 py-3 text-center text-lg font-semibold"
            >
              מעבר לתשלום מאובטח
            </Link>
            <div className="text-sm text-brown-mid">
              <p>שאלות? דברי איתי ב-WhatsApp: {SOCIAL.whatsapp.url.replace("https://wa.me/", "+")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
