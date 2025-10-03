import { Resend } from "resend";
import nodemailer from "nodemailer";

export type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: { filename: string; content: Buffer | string; contentType?: string }[];
};

export async function sendEmail(opts: SendEmailOptions) {
  const {
    RESEND_API_KEY, EMAIL_FROM, EMAIL_USER, EMAIL_PASSWORD, SMTP_HOST, SMTP_PORT
  } = process.env;

  // 1) Resend (אם מוגדר API Key)
  if (RESEND_API_KEY) {
    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM!,
      to: Array.isArray(opts.to) ? opts.to : [opts.to],
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      attachments: opts.attachments,
    });
    if (error) throw error;
    return { id: data?.id || "resend" };
  }

  // 2) SMTP (Gmail)
  if (EMAIL_USER && EMAIL_PASSWORD && SMTP_HOST && SMTP_PORT) {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
    });

    await transporter.verify();
    const info = await transporter.sendMail({
      from: EMAIL_FROM!,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      attachments: opts.attachments,
    });
    return { id: info.messageId || "smtp" };
  }

  throw new Error("No email provider configured (RESEND_API_KEY or SMTP creds required)");
}
