import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { WEALTH_PAYMENT, WEALTH_ROUTES } from "@/modules/wealth-code/constants";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden py-20">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div
          className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#f5f1ed] blur-3xl"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#d3c6bd] blur-3xl"
          aria-hidden
        />
      </div>

      <div className="container mx-auto flex flex-col-reverse gap-12 px-4 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6 text-right">
          <span className="caption inline-block rounded-full bg-white/70 px-4 py-2 text-sm text-brown-mid shadow-sm backdrop-blur">
            {BRAND.tagline}
          </span>
          <h1 className="text-brown-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
            לגילוי קוד השפע האישי שלך
          </h1>
          <p className="max-w-xl text-lg text-brown-dark/80">
            מחשבון נומרולוגיה מודרני שמחבר בין שם, תאריך לידה ותדר אישי. תוך דקות תגלי את המספר שמפעיל את שער השפע שלך ותקבלי PDF אישי במייל.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
            <Link
              href={WEALTH_ROUTES.calculator}
              className="neuro-button active-press rounded-2xl px-8 py-3 text-lg font-semibold"
            >
              התחילי את החישוב
            </Link>
            <Link
              href={WEALTH_ROUTES.sales}
              className="neuro-button-secondary rounded-2xl px-8 py-3 text-lg font-semibold"
            >
              חבילת השפע · {WEALTH_PAYMENT.grow.priceDisplay}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm text-brown-mid sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white/70 p-4 shadow-sm backdrop-blur">
              <p className="font-semibold text-brown-heading">PDF אישי במייל</p>
              <p>כולל הסבר מפורט על הקוד שלך והמלצות ליישום.</p>
            </div>
            <div className="rounded-2xl border border-border bg-white/70 p-4 shadow-sm backdrop-blur">
              <p className="font-semibold text-brown-heading">תהליך תוך דקות</p>
              <p>הזיני פרטים, קבלי את המספר והתחילי לפעול מהלב.</p>
            </div>
            <div className="rounded-2xl border border-border bg-white/70 p-4 shadow-sm backdrop-blur">
              <p className="font-semibold text-brown-heading">מבוסס אנרגיה עתיקה</p>
              <p>נומרולוגיה חכמה מותאמת לעידן הדיגיטלי.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 justify-center">
          <div className="neuro-card-floating relative flex h-[360px] w-[360px] items-center justify-center rounded-full p-12">
            <Image
              src={BRAND.logo}
              alt={`${BRAND.name} Logo`}
              fill
              sizes="360px"
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
