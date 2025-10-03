export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { ENV, requireEnv } from "@/lib/env";
import { wealthEmailHtml } from "@/modules/wealth-code/email/template";

type SendEmailPayload = {
    to?: string;
    name?: string;
    pdfBase64?: string;
    shareUrl?: string;
};

const SUBJECT = "הפירוש המלא לקוד האישי שלך";

export async function POST(req: Request) {
    try {
        const { to, name, pdfBase64, shareUrl }: SendEmailPayload = await req.json();

        if (!to) {
            return NextResponse.json({ ok: false, error: 'Missing "to"' }, { status: 400 });
        }

        const html = wealthEmailHtml({ name, shareUrl });
        const attachment = pdfBase64
            ? [{ filename: "wealth-code.pdf", content: Buffer.from(pdfBase64, "base64") }]
            : undefined;

        if (ENV.RESEND_API_KEY) {
            const { Resend } = await import("resend");
            const resend = new Resend(requireEnv("RESEND_API_KEY"));
            const { error } = await resend.emails.send({
                from: requireEnv("EMAIL_FROM"),
                to,
                subject: SUBJECT,
                html,
                attachments: attachment,
            });

            if (error) {
                throw error;
            }
        } else {
            const hasSmtpConfig = ENV.SMTP_HOST && ENV.EMAIL_USER && ENV.EMAIL_PASSWORD;
            if (!hasSmtpConfig) {
                throw new Error("Missing env var: SMTP credentials");
            }

            const nodemailer = await import("nodemailer");
            const smtpHost = requireEnv("SMTP_HOST");
            const smtpPort = requireEnv("SMTP_PORT");
            const smtpUser = requireEnv("EMAIL_USER");
            const smtpPass = requireEnv("EMAIL_PASSWORD");
            const emailFrom = requireEnv("EMAIL_FROM");
            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465,
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                },
            });

            await transporter.sendMail({
                from: emailFrom,
                to,
                subject: SUBJECT,
                html,
                attachments: attachment,
            });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
