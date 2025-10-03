"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateWealthCode,
  formatCodeLabel,
  getInterpretation,
  type NumerologyCalculation,
} from "@/modules/wealth-code/utils";
import { WEALTH_CONTENT, WEALTH_ROUTES } from "@/modules/wealth-code/constants";
import { SendEmailButton } from "../SendEmailButton";

type CalculatorVariant = "compact" | "full";

interface CalculatorProps {
  variant?: CalculatorVariant;
}

type FormState = {
  fullName: string;
  birthDate: string;
  email: string;
  notes: string;
};

const INITIAL_STATE: FormState = {
  fullName: "",
  birthDate: "",
  email: "",
  notes: "",
};

const LABEL_CLASSES = "block text-sm font-semibold text-brown-heading mb-2";
const INPUT_CLASSES =
  "w-full rounded-2xl border border-border bg-white/70 px-4 py-3 text-right text-brown-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-brown-light";

export function Calculator({ variant = "compact" }: CalculatorProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [result, setResult] = useState<NumerologyCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculatorCopy = WEALTH_CONTENT.calculator;
  const sectionTitle = calculatorCopy.variantTitles?.[variant] ?? calculatorCopy.title;

  const interpretation = useMemo(() => {
    if (!result) return undefined;
    return getInterpretation(result.code);
  }, [result]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!form.fullName || !form.birthDate) {
      setError(calculatorCopy.alerts.fillAll);
      return;
    }

    try {
      const calculation = calculateWealthCode({
        fullName: form.fullName,
        birthDate: form.birthDate,
      });
      setResult(calculation);
    } catch (err) {
      console.error(err);
      setError(calculatorCopy.alerts.calculationError);
    }
  };

  const resetForm = () => {
    setForm(INITIAL_STATE);
    setResult(null);
    setError(null);
    setShowBreakdown(false);
  };

  const pdfBody = useMemo(() => {
    if (!result) return [] as string[];

    const lines: string[] = [
      `שם מלא: ${form.fullName}`,
      `תאריך לידה: ${form.birthDate}`,
      `קוד שפע: ${formatCodeLabel(result.code)}`,
      "",
    ];

    if (interpretation) {
      lines.push(`מהות הקוד: ${interpretation.title}`);
      lines.push(interpretation.description);
      lines.push("");
      lines.push("חוזקות עיקריות:");
      interpretation.strengths.forEach((strength) => lines.push(`• ${strength}`));
      lines.push("");
      lines.push("אתגרים אפשריים:");
      interpretation.challenges.forEach((challenge) => lines.push(`• ${challenge}`));
      lines.push("");
      lines.push("צעדים מומלצים:");
      interpretation.recommendedActions.forEach((action) => lines.push(`• ${action}`));
      lines.push("");
      lines.push(`מנטרה: ${interpretation.mantra}`);
    }

    if (form.notes) {
      lines.push("", `כוונה לשנה הקרובה: ${form.notes}`);
    }

    if (showBreakdown) {
      lines.push("", "פירוט מלא:");
      result.breakdown.forEach((item) => lines.push(item));
    }

    return lines;
  }, [form.fullName, form.birthDate, form.notes, interpretation, result, showBreakdown]);

  return (
    <section id="calculator" className="py-16">
      <div className="neuro-card-main mx-auto max-w-4xl rounded-[36px] bg-white/80 p-8 shadow-xl">
        <div className="mb-10 text-center">
          <span className="caption inline-block text-brown-mid">{sectionTitle}</span>
          <h2 className="mt-2 text-3xl text-brown-heading sm:text-4xl">{calculatorCopy.title}</h2>
          <p className="mt-4 text-brown-dark/80">{calculatorCopy.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="flex flex-col text-right">
              <span className={LABEL_CLASSES}>{calculatorCopy.labels.fullName}</span>
              <input
                type="text"
                value={form.fullName}
                onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                placeholder={calculatorCopy.placeholders.fullName}
                className={INPUT_CLASSES}
                required
              />
            </label>

            <label className="flex flex-col text-right">
              <span className={LABEL_CLASSES}>{calculatorCopy.labels.birthDate}</span>
              <input
                type="date"
                value={form.birthDate}
                onChange={(event) => setForm((prev) => ({ ...prev, birthDate: event.target.value }))}
                className={INPUT_CLASSES}
                required
              />
            </label>

            <label className="flex flex-col text-right">
              <span className={LABEL_CLASSES}>{calculatorCopy.labels.email}</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder={calculatorCopy.placeholders.email}
                className={INPUT_CLASSES}
              />
            </label>

            <label className="flex flex-col text-right">
              <span className={LABEL_CLASSES}>{calculatorCopy.labels.notes}</span>
              <input
                type="text"
                value={form.notes}
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                placeholder={calculatorCopy.placeholders.notes}
                className={INPUT_CLASSES}
              />
            </label>
          </div>

          {error && (
            <p className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 text-rose-800">{error}</p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button type="submit" className="neuro-button rounded-2xl px-8 py-3 font-semibold">
              {calculatorCopy.buttons.calculate}
            </button>
            {result && (
              <button
                type="button"
                onClick={resetForm}
                className="neuro-button-secondary rounded-2xl px-8 py-3 font-semibold"
              >
                {calculatorCopy.buttons.reset}
              </button>
            )}
          </div>
        </form>

        {result && (
          <div className="mt-10 space-y-6 rounded-[30px] border border-border bg-white/80 p-8 shadow-inner">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="text-center sm:text-right">
                <p className="caption text-brown-mid">{calculatorCopy.result.caption}</p>
                <p className="text-6xl font-black text-brown-heading">{formatCodeLabel(result.code)}</p>
              </div>

              <div className="text-right text-sm text-brown-dark/80">
                <p>
                  {calculatorCopy.result.reducedNameLabel}: {result.reducedName}
                </p>
                <p>
                  {calculatorCopy.result.reducedBirthLabel}: {result.reducedBirth}
                </p>
                <button
                  onClick={() => setShowBreakdown((prev) => !prev)}
                  className="mt-2 text-sm font-semibold text-brown-heading underline"
                >
                  {showBreakdown
                    ? calculatorCopy.result.hideBreakdown
                    : calculatorCopy.result.showBreakdown}
                </button>
              </div>
            </div>

            {showBreakdown && (
              <ul className="list-disc space-y-2 pr-5 text-right text-sm text-brown-dark/80">
                {result.breakdown.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {interpretation && (
              <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                <div className="rounded-3xl border border-border bg-white/70 p-6 shadow-sm">
                  <h3 className="text-2xl font-bold text-brown-heading">{interpretation.title}</h3>
                  <p className="mt-3 text-brown-dark/80">{interpretation.description}</p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-white/60 p-4">
                      <p className="font-semibold text-brown-heading">
                        {calculatorCopy.result.strengthsLabel}
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-brown-dark/80">
                        {interpretation.strengths.map((strength) => (
                          <li key={strength}>• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-border bg-white/60 p-4">
                      <p className="font-semibold text-brown-heading">
                        {calculatorCopy.result.challengesLabel}
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-brown-dark/80">
                        {interpretation.challenges.map((challenge) => (
                          <li key={challenge}>• {challenge}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-3xl border border-border bg-white/70 p-6 text-right text-sm text-brown-dark/80">
                  <p className="font-semibold text-brown-heading">
                    {calculatorCopy.result.mantraLabel}
                  </p>
                  <p className="text-lg text-brown-mid">“{interpretation.mantra}”</p>

                  <div>
                    <p className="font-semibold text-brown-heading">
                      {calculatorCopy.result.actionsLabel}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {interpretation.recommendedActions.map((action) => (
                        <li key={action}>• {action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {form.email && (
              <div className="rounded-3xl border border-border bg-white/80 p-6 text-right">
                <h4 className="text-xl font-semibold text-brown-heading">
                  {calculatorCopy.result.emailTitle}
                </h4>
                <p className="mt-2 text-sm text-brown-dark/70">
                  {calculatorCopy.result.emailDescription}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-end gap-4">
                  <SendEmailButton
                    to={form.email}
                    name={form.fullName}
                    code={result.code.toString()}
                    body={pdfBody}
                    shareUrl={WEALTH_ROUTES.interpretations}
                    label="שלחי PDF למייל"
                  />
                  <Link
                    href={WEALTH_ROUTES.interpretations}
                    className="text-sm font-semibold text-brown-heading underline"
                  >
                    {calculatorCopy.result.viewInterpretations}
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
