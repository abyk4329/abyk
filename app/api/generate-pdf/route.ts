export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateWealthPdf } from "@/modules/wealth-code/pdf/generate";

export async function POST(req: Request) {
    try {
        // TODO: Add authentication check
        // const session = await getSession(req);
        // if (!session) {
    } catch (error) {
        // Log the actual error for debugging
        console.error('PDF generation failed:', error);
        return NextResponse.json({ ok: false, error: "Failed to generate PDF" }, { status: 500 });
    }

    // Validate inputs
    if (code && typeof code !== 'string') {
        return NextResponse.json({ ok: false, error: "Invalid code format" }, { status: 400 });
    }
    if (!Array.isArray(body)) {
        return NextResponse.json({ ok: false, error: "Invalid body format" }, { status: 400 });
    }

    const pdfBase64 = await generateWealthPdf({ title, code, body });
    return NextResponse.json({ ok: true, pdfBase64 });
} catch (error) {
    // existing error handling...
}
}
    } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
}
}
