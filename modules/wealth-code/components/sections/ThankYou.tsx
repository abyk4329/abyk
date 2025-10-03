"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { WEALTH_CONTENT, WEALTH_ROUTES, WEALTH_SHARE } from "@/modules/wealth-code/constants";
import { SOCIAL } from "@/lib/constants";
import { SendEmailButton } from "../SendEmailButton";
import { sendWealthEmail } from "@/modules/wealth-code/utils";

export function ThankYou() {
  const copy = WEALTH_CONTENT.thankYou;
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const nameParam = searchParams.get("name") || "";
  const codeParam = searchParams.get("code") || "";
  const [autoStatus, setAutoStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const hasAttemptedRef = useRef(false);

  const pdfBody = useMemo(() => {
    if (!emailParam) return [] as string[];
    const lines: string[] = [];
  if (nameParam) lines.push(`שם: ${nameParam}`);
  if (codeParam) lines.push(`קוד השפע שלך: ${codeParam}`);
  lines.push(`תודה על הרכישה! הדו"ח האישי שלך מצורף וממתין לך לצפייה ולהורדה.`);
    lines.push("לצפייה באתר: https://abyk.online/");
    return lines;
  }, [codeParam, emailParam, nameParam]);

  useEffect(() => {
    if (!emailParam || hasAttemptedRef.current) {
      return;
    }
    hasAttemptedRef.current = true;
    setAutoStatus("sending");

    sendWealthEmail({
      to: emailParam,
      name: nameParam,
      code: codeParam,
      body: pdfBody,
      shareUrl: WEALTH_ROUTES.interpretations,
    })
      .then(() => setAutoStatus("success"))
      .catch(() => setAutoStatus("error"));
  }, [codeParam, emailParam, nameParam, pdfBody]);

  return (
    <section className="py-16">
      <div className="neuro-card-main mx-auto max-w-4xl rounded-[36px] bg-white/80 p-10 text-right shadow-xl">
        <header className="mb-8 text-center">
          <span className="caption text-brown-mid">AWAKENING CODE</span>
          <h2 className="mt-2 text-3xl text-brown-heading sm:text-4xl">{copy.title}</h2>
          <p className="mt-4 text-brown-dark/80">{copy.message}</p>
        </header>

        <div className="space-y-6">
          <div className="flex flex-wrap justify-end gap-4">
            <SendEmailButton
              to={emailParam}
              name={nameParam}
              code={codeParam}
              body={pdfBody}
              shareUrl={WEALTH_ROUTES.interpretations}
              label={copy.buttons.resend}
            />
            <Link
              href={WEALTH_ROUTES.interpretations}
              className="neuro-button rounded-2xl px-6 py-3 font-semibold"
            >
              {copy.buttons.viewInterpretation}
            </Link>
            <Link
              href={WEALTH_ROUTES.calculator}
              className="neuro-button-secondary rounded-2xl px-6 py-3 font-semibold"
            >
              {copy.buttons.calculateAnother}
            </Link>
            <a
              href={SOCIAL.whatsapp.url}
              target="_blank"
              rel="noreferrer"
              className="neuro-button-secondary rounded-2xl px-6 py-3 font-semibold"
            >
              {copy.buttons.consultation}
            </a>
          </div>

          <button
            type="button"
            className="neuro-button-outline rounded-2xl px-6 py-3 font-semibold"
            onClick={() => {
              if (navigator.share) {
                navigator.share(WEALTH_SHARE.webShare);
              }
            }}
          >
            {copy.buttons.share}
          </button>

          {autoStatus === "error" && (
            <p className="text-sm text-rose-600">
              לא הצלחנו לשלוח את המייל באופן אוטומטי. ניתן לנסות שוב באמצעות הכפתור למעלה.
            </p>
          )}

          {autoStatus === "success" && (
            <p className="text-sm text-emerald-600">
              שלחנו את הפירוש המלא למייל שסופק ברכישה.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={SOCIAL.whatsapp.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-border bg-white/70 p-4"
            >
              <p className="font-semibold text-brown-heading">{copy.socialLinks.whatsapp}</p>
              <p className="text-sm text-brown-dark/80">{SOCIAL.whatsapp.number}</p>
            </a>
            <a
              href={SOCIAL.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-border bg-white/70 p-4"
            >
              <p className="font-semibold text-brown-heading">{copy.socialLinks.instagram}</p>
              <p className="text-sm text-brown-dark/80">{SOCIAL.instagram.handle}</p>
            </a>
            <a
              href={SOCIAL.tiktok.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-border bg-white/70 p-4"
            >
              <p className="font-semibold text-brown-heading">{copy.socialLinks.tiktok}</p>
              <p className="text-sm text-brown-dark/80">{SOCIAL.tiktok.handle}</p>
            </a>
            <a
              href={SOCIAL.email.url}
              className="rounded-2xl border border-border bg-white/70 p-4"
            >
              <p className="font-semibold text-brown-heading">{copy.socialLinks.email}</p>
              <p className="text-sm text-brown-dark/80">{SOCIAL.email.address}</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
