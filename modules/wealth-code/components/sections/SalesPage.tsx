import Link from "next/link";
import { WEALTH_CONTENT, WEALTH_PAYMENT } from "@/modules/wealth-code/constants";

export function SalesPage() {
  const copy = WEALTH_CONTENT.sales;

  return (
    <section className="py-16">
      <div className="neuro-card-main mx-auto max-w-4xl rounded-[36px] bg-white/80 p-10 shadow-xl">
        <header className="text-center">
          <span className="caption text-brown-mid">תוכנית השפע המלאה</span>
          <h2 className="mt-2 text-3xl text-brown-heading sm:text-4xl">
            {copy.card3.title}
          </h2>
          <p className="mt-4 text-brown-dark/80">{copy.card3.description}</p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-border bg-white/70 p-6 shadow-inner">
            <h3 className="text-xl font-semibold text-brown-heading">{copy.card1.title}</h3>
            <ul className="space-y-3 text-right text-sm text-brown-dark/80">
              {copy.card1.paragraphs.map((paragraph) => (
                <li key={paragraph}>{paragraph}</li>
              ))}
            </ul>

            <div className="rounded-2xl border border-border bg-white/80 p-4 text-right">
              <p className="text-sm text-brown-mid">{copy.card3.priceSubtitle}</p>
              <p className="text-3xl font-bold text-brown-heading">{WEALTH_PAYMENT.grow.priceDisplay}</p>
              <p className="text-xs text-brown-dark/60">כולל מע״מ ומייל ליווי</p>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-border bg-white/70 p-6 text-right">
            <p className="text-brown-dark/80">{copy.brandStory.intro}</p>
            <p className="text-brown-dark/80">{copy.brandStory.mission}</p>
            <div className="space-y-3 text-sm text-brown-dark/70">
              {copy.brandStory.bullets.map((bullet) => (
                <p key={bullet}>{bullet}</p>
              ))}
            </div>
            <Link
              href={WEALTH_PAYMENT.grow.url}
              target="_blank"
              className="neuro-button active-press block rounded-2xl px-8 py-3 text-center text-lg font-semibold"
            >
              {copy.card3.buttons.purchase}
            </Link>
            <div className="text-sm text-brown-mid">
              <p>{copy.card3.securityNotice}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
