export const runtime = "nodejs";

import { NextResponse } from "next/server";

import { dispatchWealthEmail, WealthEmailError } from "@/lib/email/wealth";

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

export async function POST(req: Request) {
    try {
        const body: Body = await req.json();
        const response = await dispatchWealthEmail({
            ...body,
            code: body.code ?? "",
        }, req);

        return NextResponse.json(response);
    } catch (error) {
        const status = error instanceof WealthEmailError ? error.status : 500;
        const message = error instanceof Error ? error.message : String(error);
        if (status >= 500) {
            console.error("Send email failed:", error);
        }
        return NextResponse.json({ ok: false, error: message }, { status });
    }
}
