import { stripBase64Prefix } from "@/lib/utils";

const DEFAULT_ATTACHMENT_NAME = "WealthCode.pdf";
const DEFAULT_FROM = "AWAKENING BY KSENIA <no-reply@abyk.online>";

export type AttachmentInput = {
    filename?: string;
    content?: string;
    contentType?: string;
};

export type NormalizeAttachmentsInput = {
    attachments?: AttachmentInput[];
    pdfBase64?: string;
};

export type NormalizedAttachment = {
    filename: string;
    base64: string;
    contentType?: string;
};

export type SendEmailPayload = {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
    from?: string;
    attachments?: NormalizedAttachment[];
};

export type SendEmailResult = {
    ok: true;
    transport: "resend" | "smtp";
    fallbackUsed: boolean;
    id?: string;
    error?: string;
};

function getFromAddress() {
    return process.env.EMAIL_FROM?.trim() || DEFAULT_FROM;
}

function normalizeFilename(name: string | undefined, index: number) {
    const baseName = name?.trim();
    if (baseName) {
        return baseName;
    }
    return `${DEFAULT_ATTACHMENT_NAME.replace(/\.pdf$/i, "")}-${index + 1}.pdf`;
}

export function normalizeAttachments(input: NormalizeAttachmentsInput = {}): NormalizedAttachment[] {
    const items: NormalizedAttachment[] = [];

    if (input.pdfBase64) {
        const base64 = stripBase64Prefix(input.pdfBase64.trim());
        if (base64) {
            items.push({
                filename: DEFAULT_ATTACHMENT_NAME,
                base64,
                contentType: "application/pdf",
            });
        }
    }

    input.attachments?.forEach((attachment, index) => {
        if (!attachment?.content) {
            return;
        }
        const base64 = stripBase64Prefix(attachment.content.trim());
        if (!base64) {
            return;
        }
        items.push({
            filename: normalizeFilename(attachment.filename, index),
            base64,
            contentType: attachment.contentType,
        });
    });

    return items;
}

export async function sendViaResend(payload: SendEmailPayload) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        throw new Error("Missing RESEND_API_KEY");
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const attachmentPayload = payload.attachments?.length
        ? payload.attachments.map((attachment) => ({
            filename: attachment.filename,
            content: attachment.base64,
            contentType: attachment.contentType,
        }))
        : undefined;

    const { data, error } = await resend.emails.send({
        from: payload.from ?? getFromAddress(),
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        replyTo: payload.replyTo,
        attachments: attachmentPayload,
    });

    if (error) {
        throw new Error(error.message ?? "Resend send failed");
    }

    return { id: data?.id };
}

export async function sendViaSMTP(payload: SendEmailPayload) {
    const host = process.env.SMTP_HOST?.trim();
    const port = Number(process.env.SMTP_PORT ?? "465");
    const user = process.env.EMAIL_USER?.trim();
    const pass = process.env.EMAIL_PASSWORD?.trim();

    if (!host || !port || !user || !pass) {
        throw new Error("Missing SMTP credentials");
    }

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
            user,
            pass,
        },
    });

    const attachments = payload.attachments?.length
        ? payload.attachments.map((attachment) => ({
            filename: attachment.filename,
            content: Buffer.from(attachment.base64, "base64"),
            contentType: attachment.contentType,
        }))
        : undefined;

    const info = await transporter.sendMail({
        from: payload.from ?? getFromAddress(),
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        replyTo: payload.replyTo,
        attachments,
    });

    return { id: info.messageId };
}

export async function sendEmail(payload: SendEmailPayload): Promise<SendEmailResult> {
    let resendError: unknown;

    if (process.env.RESEND_API_KEY) {
        try {
            const result = await sendViaResend(payload);
            return {
                ok: true,
                transport: "resend",
                fallbackUsed: false,
                id: result?.id,
            };
        } catch (error) {
            resendError = error;
        }
    }

    try {
        const result = await sendViaSMTP(payload);
        return {
            ok: true,
            transport: "smtp",
            fallbackUsed: Boolean(process.env.RESEND_API_KEY),
            id: result?.id,
            error: resendError instanceof Error ? resendError.message : undefined,
        };
    } catch (smtpError) {
        if (resendError) {
            const resendMessage = resendError instanceof Error ? resendError.message : String(resendError);
            const smtpMessage = smtpError instanceof Error ? smtpError.message : String(smtpError);
            throw new Error(`Resend failed (${resendMessage}); SMTP fallback failed (${smtpMessage})`);
        }
        throw smtpError instanceof Error ? smtpError : new Error(String(smtpError));
    }
}
