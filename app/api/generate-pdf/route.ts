export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { WealthReport } from "@/modules/wealth-code/pdf/WealthReport";
import { registerHebrewFonts } from "@/modules/core";

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

        if (!code || code.length !== 4) {
            return NextResponse.json({ ok: false, error: "Invalid code" }, { status: 400 });
        }

        // Generate PDF using React PDF
        // Ensure fonts attempted (idempotent). If none found, report warning in response meta.
        registerHebrewFonts();
        const documentElement = WealthReport({ code, userName });
        // Cast to any to satisfy renderer typings expecting a Document ReactElement
        const buffer = await renderToBuffer(documentElement as any);

        const pdfBase64 = buffer.toString("base64");

        return NextResponse.json({ ok: true, pdfBase64 });
    } catch (error) {
        console.error("PDF generation failed:", error);
        const message = error instanceof Error ? error.message : "Failed to generate PDF";
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
