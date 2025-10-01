import { NextResponse } from "next/server";
import { generateWealthCodePdf } from "@/lib/wealthCodePdf";

const PDF_CACHE = new Map<string, Buffer>();

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const code = (searchParams.get("code") ?? "").trim();

        if (!code) {
            return NextResponse.json({ message: "קוד חובה" }, { status: 400 });
        }

        if (!/^\d{4}$/.test(code)) {
            return NextResponse.json({ message: "קוד לא תקין" }, { status: 400 });
        }

        if (PDF_CACHE.has(code)) {
            const cachedBuffer = PDF_CACHE.get(code)!;
            return new NextResponse(new Uint8Array(cachedBuffer), {
                status: 200,
                headers: {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": `attachment; filename="wealth-code-${code}.pdf"`,
                    "Cache-Control": "public, max-age=3600, must-revalidate",
                },
            });
        }

        const pdf = await generateWealthCodePdf(code);
        PDF_CACHE.set(code, pdf);

        return new NextResponse(new Uint8Array(pdf), {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="wealth-code-${code}.pdf"`,
                "Cache-Control": "public, max-age=3600, must-revalidate",
            },
        });
    } catch (error) {
        console.error("PDF generation failed", error);
        return NextResponse.json({ message: "שגיאה ביצירת הקובץ" }, { status: 500 });
    }
}
