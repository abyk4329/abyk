import type { Interpretation, NumerologyCalculation } from "@/modules/wealth-code/utils";
import { WEALTH_CONTENT } from "@/modules/wealth-code/constants";
import { formatDateTime } from "@/lib/utils";

interface ResultProps {
  calculation: NumerologyCalculation;
  interpretation?: Interpretation;
  fullName?: string;
  email?: string;
  notes?: string;
  generatedAt?: Date;
}

export function Result({
  calculation,
  interpretation,
  fullName,
  email,
  notes,
  generatedAt,
}: ResultProps) {
  const copy = WEALTH_CONTENT.result;

  return (
    <section className="py-16">
      <div className="neuro-card-main mx-auto max-w-5xl rounded-[36px] bg-white/85 p-10 shadow-xl">
        <header className="mb-8 text-center">
          <span className="caption text-brown-mid">{copy.title}</span>
          <h2 className="mt-2 text-3xl text-brown-heading sm:text-4xl">
            קוד השפע שלך: {calculation.codeLabel}
          </h2>
          {generatedAt && (
            <p className="mt-2 text-sm text-brown-dark/70">
              הופק בתאריך {formatDateTime(generatedAt)}
            </p>
          )}
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-white/75 p-6 shadow-inner">
              <h3 className="text-xl font-semibold text-brown-heading">פירוט חישוב</h3>
              <ul className="mt-4 space-y-2 text-right text-brown-dark/80">
                {fullName && (
                  <li>
                    <strong>שם מלא:</strong> {fullName}
                  </li>
                )}
                {email && (
                  <li>
                    <strong>אימייל:</strong> {email}
                  </li>
                )}
                {notes && (
                  <li>
                    <strong>כוונה:</strong> {notes}
                  </li>
                )}
                {calculation.breakdown.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {interpretation && (
              <div className="rounded-3xl border border-border bg-white/75 p-6 shadow-inner">
                <h3 className="text-xl font-semibold text-brown-heading">
                  {interpretation.title}
                </h3>
                <p className="mt-3 text-brown-dark/80">{interpretation.description}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-white/60 p-4">
                    <p className="font-semibold text-brown-heading">חוזקות</p>
                    <ul className="mt-2 space-y-1 text-sm text-brown-dark/80">
                      {interpretation.strengths.map((strength) => (
                        <li key={strength}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-border bg-white/60 p-4">
                    <p className="font-semibold text-brown-heading">אתגרים</p>
                    <ul className="mt-2 space-y-1 text-sm text-brown-dark/80">
                      {interpretation.challenges.map((challenge) => (
                        <li key={challenge}>• {challenge}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-white/60 p-4 text-right">
                  <p className="font-semibold text-brown-heading">מנטרה יומית</p>
                  <p className="mt-2 text-lg text-brown-mid">“{interpretation.mantra}”</p>
                </div>

                <div className="mt-4 rounded-2xl border border-border bg-white/60 p-4">
                  <p className="font-semibold text-brown-heading">צעדים ליישום</p>
                  <ul className="mt-2 space-y-1 text-sm text-brown-dark/80">
                    {interpretation.recommendedActions.map((action) => (
                      <li key={action}>• {action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl border border-border bg-white/70 p-6 text-right">
              <h3 className="text-lg font-semibold text-brown-heading">ערכים מצומצמים</h3>
              <dl className="mt-4 space-y-2 text-sm text-brown-dark/80">
                <div className="flex items-center justify-between">
                  <dt>שם:</dt>
                  <dd className="font-semibold">{calculation.reducedName}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>תאריך לידה:</dt>
                  <dd className="font-semibold">{calculation.reducedBirth}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>סכום כולל:</dt>
                  <dd className="font-semibold">{calculation.total}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl border border-border bg-white/70 p-6 text-right text-sm text-brown-dark/80">
              <p className="font-semibold text-brown-heading">מה לעשות עכשיו?</p>
              <p className="mt-2">
                קחי נשימה עמוקה, העבירי את המנטרה בקול וכתבי ביומן תובנה אחת שעולה לך עכשיו.
              </p>
              <p className="mt-2">
                אם תרצי לשתף, שלחי הודעה ב-Instagram או WhatsApp ואשמח להרחיב על הפוטנציאל שלך.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
