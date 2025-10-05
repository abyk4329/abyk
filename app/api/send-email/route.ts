export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { normalizeAttachments, sendEmail } from "@/lib/email/transport";
import { wealthEmailHtml } from "@/modules/wealth-code/email/WealthEmail";

const DEFAULT_SUBJECT = "הפירוש המלא לקוד האישי שלך";
const DEFAULT_SHARE_URL = "https://abyk.online/";
const TEST_EMAIL = process.env.TEST_EMAIL || "kseniachud@gmail.com";
const FORCE_TEST_MODE = process.env.MAIL_TEST_MODE === "1";

type Body = {
    to?: string;
    name?: string;
    shareUrl?: string;
    subject?: string;
    replyTo?: string;
    attachments?: Array<{ filename?: string; content?: string; contentType?: string }>;
    pdfBase64?: string;
    test?: boolean;
};

export async function POST(req: Request) {
    try {
        const body: Body = await req.json();
        const url = new URL(req.url);

        if (!body?.to) {
            return NextResponse.json({ ok: false, error: 'Missing "to"' }, { status: 400 });
        }

        const isProd = process.env.NODE_ENV === "production";
        const isHeaderTest = req.headers.get("x-mail-test") === "1";
        const isQueryTest = url.searchParams.get("test") === "1";
        const isTest = FORCE_TEST_MODE || !isProd || body.test === true || isHeaderTest || isQueryTest;
        const toEffective = isTest ? TEST_EMAIL : body.to;

        const subject = (body.subject ?? DEFAULT_SUBJECT).trim() || DEFAULT_SUBJECT;
        const shareUrl = (body.shareUrl ?? DEFAULT_SHARE_URL).trim() || DEFAULT_SHARE_URL;
        const html = wealthEmailHtml({ name: body.name ?? "", shareUrl });
        const attachments = normalizeAttachments({
            attachments: body.attachments,
            pdfBase64: body.pdfBase64,
        });

        const result = await sendEmail({
            to: toEffective,
            subject,
            html,
            replyTo: body.replyTo,
            attachments,
        });

        return NextResponse.json({
            ok: true,
            transport: result.transport,
            fallbackUsed: result.fallbackUsed,
            toEffective,
            wasTest: isTest,
            id: result.id,
            error: result.error,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
