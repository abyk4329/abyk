export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { normalizeAttachments, sendEmail } from "@/lib/email/transport";
import {
    wealthEmailHtml,
    buildWealthEmailSubject,
} from "@/modules/wealth-code/email/template";

const DEFAULT_SUBJECT = "הפירוש המלא לקוד האישי שלך";
const DEFAULT_SHARE_URL = "https://abyk.online/";
const TEST_EMAIL = process.env.TEST_EMAIL?.trim() || "kseniachud@gmail.com";
const FORCE_TEST_MODE = process.env.MAIL_TEST_MODE === "1";

type Body = {
    to?: string;
    name?: string;
    code?: string;
    shareUrl?: string;
    subject?: string;
    replyTo?: string;
    attachments?: Array<{ filename?: string; content?: string; contentType?: string }>;
    pdfBase64?: string;
    test?: boolean;
};

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeRecipient(raw: string | undefined) {
    return raw?.trim() ?? "";
}

export async function POST(req: Request) {
    try {
        const body: Body = await req.json();
        const url = new URL(req.url);

        const isProd = process.env.NODE_ENV === "production";
        const isHeaderTest = req.headers.get("x-mail-test") === "1";
        const isQueryTest = url.searchParams.get("test") === "1";
        const isTest = FORCE_TEST_MODE || body.test === true || !isProd || isHeaderTest || isQueryTest;

        const intendedRecipient = normalizeRecipient(body.to);

        if (!intendedRecipient && !isTest) {
            return NextResponse.json({ ok: false, error: 'Missing "to"' }, { status: 400 });
        }

        const toEffective = isTest ? TEST_EMAIL : intendedRecipient;

        if (!toEffective || !isValidEmail(toEffective)) {
            return NextResponse.json({ ok: false, error: "Invalid recipient address" }, { status: 400 });
        }

        // Validate code - must be provided and be 4 digits
        const code = body.code?.trim();
        if (!code || !/^\d{4}$/.test(code)) {
            return NextResponse.json(
                { ok: false, error: 'Invalid or missing "code" - must be exactly 4 digits' },
                { status: 400 }
            );
        }

        // Build subject dynamically with the code, or use provided subject
        const subject = body.subject?.trim() || buildWealthEmailSubject(code);
        const shareUrl = (body.shareUrl ?? DEFAULT_SHARE_URL).trim() || DEFAULT_SHARE_URL;

        const html = wealthEmailHtml({
            name: body.name ?? "",
            code,
            shareUrl
        });
        const attachments = normalizeAttachments({
            attachments: body.attachments,
            pdfBase64: body.pdfBase64,
        });

        const result = await sendEmail({
            to: toEffective,
            subject,
            html,
            replyTo: body.replyTo?.trim() || undefined,
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
            originalRecipient: intendedRecipient || null,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Send email failed:", error);
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
