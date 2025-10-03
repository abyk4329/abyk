import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import React from "react";
import { WealthReport } from "@/app/lib/pdf/WealthReport";
import { sendEmail } from "@/app/lib/email/transport";
import { wealthEmailHtml, wealthEmailText } from "@/app/lib/email/templates/WealthEmail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const { to, fullName, email, wealthCode, notes } = await req.json();

        if (!to) {
            return NextResponse.json({ ok: false, error: "Missing 'to' email address" }, { status: 400 });
        }

        const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://abyk.online";
        const appName = process.env.NEXT_PUBLIC_APP_NAME || "Awakening by Ksenia";
        const shareUrl = APP_URL; // קישור ברירת מחדל לשיתוף – תמיד דף הבית
        const interpretationsUrl = `${APP_URL}/#/interpretations${wealthCode ? `?code=${encodeURIComponent(wealthCode)}` : ""}`;
        const downloadUrl = `${APP_URL}/api/pdf?fullName=${encodeURIComponent(fullName || "")}&email=${encodeURIComponent(email || "")}&wealthCode=${encodeURIComponent(wealthCode || "")}${notes ? `&notes=${encodeURIComponent(notes)}` : ""}`;

        // 1) לבנות PDF בזיכרון
        const doc = React.createElement(WealthReport, { fullName, email, wealthCode, notes });
        // @ts-expect-error - Type mismatch but functionally correct
        const stream = await renderToStream(doc);

        // Convert stream to buffer
        const chunks: Buffer[] = [];
        for await (const chunk of stream as any) {
            chunks.push(Buffer.from(chunk));
        }
        const buffer = Buffer.concat(chunks);
        const fileName = `wealth-report-${Date.now()}.pdf`;

        // 2) להכין HTML + טקסט
        const vars = {
            fullName,
            wealthCode,
            appUrl: APP_URL,
            interpretationsUrl,
            downloadUrl,
            shareUrl,
            instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE,
            whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
            tiktok: process.env.NEXT_PUBLIC_TIKTOK_HANDLE,
            price: process.env.NEXT_PUBLIC_PRODUCT_PRICE,
            appName,
        };

        const subject = "הפירוש המלא לקוד האישי שלך";
        const html = wealthEmailHtml(vars);
        const text = wealthEmailText(vars);

        // 3) לשלוח
        const res = await sendEmail({
            to,
            subject,
            html,
            text,
            attachments: [{ filename: fileName, content: buffer, contentType: "application/pdf" }],
        });

        return NextResponse.json({ ok: true, id: res.id });
    } catch (err: any) {
        console.error("send-pdf error:", err);
        return NextResponse.json({ ok: false, error: "Failed to send email", details: err.message }, { status: 500 });
    }
}
