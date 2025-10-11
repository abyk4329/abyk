export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateWealthReportPdfBase64 } from "@/modules/wealth-code/pdf/generate";

type GeneratePdfPayload = {
    code?: string;
    userName?: string;
    userEmail?: string;
};

export async function POST(req: Request) {
    try {
        let payload: GeneratePdfPayload = {};
        try {
            payload = (await req.json()) as GeneratePdfPayload;
        } catch {
            return NextResponse.json({ ok: false, error: "Missing or invalid JSON body" }, { status: 400 });
        }
        const code = typeof payload.code === "string" ? payload.code.trim() : undefined;
        const userName = typeof payload.userName === "string" ? payload.userName.trim() : "";

        if (!code || code.length !== 4 || !/^\d{4}$/.test(code)) {
            return NextResponse.json({ ok: false, error: "Invalid code" }, { status: 400 });
        }

        const pdfBase64 = await generateWealthReportPdfBase64({ code, userName });

        return NextResponse.json({ ok: true, pdfBase64 });
    } catch (error) {
        console.error("PDF generation failed:", error);
        const message = error instanceof Error ? error.message : "Failed to generate PDF";
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
