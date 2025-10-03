export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateWealthPdf } from "@/modules/wealth-code/pdf/generate";

export async function POST(req: Request) {
    try {
        const { title = "הפירוש המלא לקוד האישי שלך", code, body = [] } = await req.json();
        const pdfBase64 = await generateWealthPdf({ title, code, body });
        return NextResponse.json({ ok: true, pdfBase64 });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
