export { ThankYou } from "./sections/ThankYou";
import Link from "next/link";
import { SOCIAL } from "@/lib/constants";
import { routes } from "@/lib/routes";

export function ThankYouSection() {
  return (
    <section className="py-16">
      <div className="neuro-card-main mx-auto max-w-3xl rounded-[32px] bg-white/85 p-10 text-center shadow-xl">
        <h2 className="text-3xl text-brown-heading sm:text-4xl">תודה שבחרת במסע שלך</h2>
        <p className="mt-4 text-brown-dark/80">
          המייל עם הדו&quot;ח האישי בדרך אלייך. אם אינך רואה אותו – בדקי גם בתיקיית הספאם
          או הקליקי כאן לשליחה מחדש.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href={routes.interpretations}
            className="neuro-button rounded-2xl px-8 py-3 text-lg font-semibold"
          >
            עייני בפירושים המלאים
          </Link>
          <Link
            href={routes.sales}
            className="neuro-button-secondary rounded-2xl px-8 py-3 text-lg font-semibold"
          >
            המשיכי למסלול הליווי
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <a
            href={SOCIAL.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border bg-white/70 p-4 text-brown-dark/80 hover:text-brown-heading"
          >
            <p className="font-semibold">Instagram</p>
            <p className="text-sm">{SOCIAL.instagram.handle}</p>
          </a>
          <a
            href={SOCIAL.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border bg-white/70 p-4 text-brown-dark/80 hover:text-brown-heading"
          >
            <p className="font-semibold">WhatsApp</p>
            <p className="text-sm">לשאלות נוספות</p>
          </a>
          <a
            href={SOCIAL.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border bg-white/70 p-4 text-brown-dark/80 hover:text-brown-heading"
          >
            <p className="font-semibold">TikTok</p>
            <p className="text-sm">השראה יומית</p>
          </a>
        </div>
      </div>
    </section>
  );
}
