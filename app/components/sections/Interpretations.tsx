import { getAllInterpretations } from "@/lib/utils";

export function InterpretationsSection() {
  const interpretations = getAllInterpretations();

  return (
    <section className="py-16" id="interpretations">
      <div className="container mx-auto max-w-6xl px-4">
        <header className="text-center">
          <span className="caption text-brown-mid">ספריית הפירושים</span>
          <h2 className="mt-2 text-3xl text-brown-heading sm:text-4xl">
            מה המשמעות של כל קוד?
          </h2>
          <p className="mt-4 text-brown-dark/80">
            בחרי במספר שלך כדי להבין את ה-DNA האנרגטי שלו. כל קוד מגיע עם משימות, חוזקות ואתגרים אופייניים.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {interpretations.map((interpretation) => (
            <article
              key={interpretation.code}
              className="neuro-card-secondary flex h-full flex-col rounded-[28px] border border-border bg-white/75 p-6 text-right shadow-lg"
            >
              <div className="flex items-center justify-between">
                <p className="text-4xl font-black text-brown-heading">{interpretation.code}</p>
                <span className="rounded-full bg-white/80 px-4 py-1 text-sm text-brown-mid shadow-sm">
                  תדר {interpretation.code}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-brown-heading">
                {interpretation.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-brown-dark/80">
                {interpretation.description}
              </p>

              <div className="mt-5 space-y-3 text-sm text-brown-dark/80">
                <div>
                  <p className="font-semibold text-brown-heading">חוזקות:
                    <span className="block text-brown-dark/80">
                      {interpretation.strengths.join(", ")}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brown-heading">אתגרים:
                    <span className="block text-brown-dark/80">
                      {interpretation.challenges.join(", ")}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-brown-heading">מנטרה:
                    <span className="block text-brown-mid">“{interpretation.mantra}”</span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
