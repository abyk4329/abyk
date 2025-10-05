export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateWealthPdf } from "@/modules/wealth-code/pdf/generate";

type GeneratePdfPayload = {
    title?: unknown;
    code?: unknown;
    body?: unknown;
};

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export async function POST(req: Request) {
    try {
        const payload = (await req.json()) as GeneratePdfPayload;
        const title = typeof payload.title === "string" ? payload.title.trim() : "";
        const code = typeof payload.code === "string" ? payload.code.trim() : undefined;
        const body = payload.body;

        if (!title) {
            return NextResponse.json({ ok: false, error: "Missing title" }, { status: 400 });
        }

        if (code && code.length > 32) {
            return NextResponse.json({ ok: false, error: "Code is too long" }, { status: 400 });
        }

        if (body !== undefined && !isStringArray(body)) {
            return NextResponse.json({ ok: false, error: "Invalid body format" }, { status: 400 });
        }

        const pdfBase64 = await generateWealthPdf({
            title,
            code,
            body: body as string[] | undefined,
        });

        return NextResponse.json({ ok: true, pdfBase64 });
    } catch (error) {
        console.error("PDF generation failed:", error);
        const message = error instanceof Error ? error.message : "Failed to generate PDF";
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
