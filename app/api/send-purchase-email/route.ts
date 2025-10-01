import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generatePurchaseEmail } from "@/app/components/sections/EmailTemplate";
import { generateWealthCodePdf } from "@/lib/wealthCodePdf";

const resendApiKey = process.env.RESEND_API_KEY;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

if (!resendApiKey) {
    console.warn("RESEND_API_KEY is not set. Email sending will fail until configured.");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => null);
        const code = body?.code ? String(body.code).trim() : "";
        const email = body?.email ? String(body.email).trim() : "";

        if (!code || !/^\d{4}$/.test(code)) {
            return NextResponse.json({ message: "קוד לא תקין" }, { status: 400 });
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ message: "כתובת מייל לא תקינה" }, { status: 400 });
        }

        if (!resend) {
            return NextResponse.json({ message: "שירות המייל לא זמין. נא לפנות לתמיכה." }, { status: 503 });
        }

        const html = generatePurchaseEmail(code);
        const pdfBuffer = await generateWealthCodePdf(code);

        const response = await resend.emails.send({
            from: "Awakening by Ksenia <notifications@abyk.online>",
            to: email,
            subject: `הפירוש המלא לקוד ${code}`,
            html,
            attachments: [
                {
                    filename: `wealth-code-${code}.pdf`,
                    content: pdfBuffer.toString("base64"),
                },
            ],
        });

        if (response.error) {
            console.error("Resend send error", response.error);
            return NextResponse.json({ message: "שליחת המייל נכשלה" }, { status: 502 });
        }

        return NextResponse.json({ message: "הפירוש נשלח בהצלחה" }, { status: 200 });
    } catch (error) {
        console.error("send-purchase-email error", error);
        return NextResponse.json({ message: "אירעה שגיאה בלתי צפויה" }, { status: 500 });
    }
}
