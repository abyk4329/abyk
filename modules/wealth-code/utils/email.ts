import { stripBase64Prefix } from "@/lib/utils";

type SendWealthEmailParams = {
    to: string;
    name?: string;
    code?: string;
    body?: string[];
    shareUrl?: string;
    replyTo?: string;
    subject?: string;
    test?: boolean;
};

type SendWealthEmailSuccess = {
    ok: true;
    transport: "resend" | "smtp";
    fallbackUsed: boolean;
    toEffective: string;
    wasTest: boolean;
    id?: string;
    error?: string;
};

export async function sendWealthEmail(params: SendWealthEmailParams): Promise<SendWealthEmailSuccess> {
    const cleanedBody = params.body?.filter((line) => Boolean(line?.trim())) ?? [];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const pdfResponse = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
            title: "הפירוש המלא לקוד האישי שלך",
            code: params.code,
            body: cleanedBody,
        }),
    });

    clearTimeout(timeoutId);

    const pdfJson = await pdfResponse.json();
    if (!pdfResponse.ok || !pdfJson.ok) {
        throw new Error(pdfJson.error || "PDF generation failed");
    }

    const pdfBase64 = typeof pdfJson.pdfBase64 === "string" ? stripBase64Prefix(pdfJson.pdfBase64) : "";
    const shareUrl = params.shareUrl ?? "https://abyk.online/";
    const attachments = pdfBase64
        ? [
            {
                filename: "WealthCode.pdf",
                content: pdfBase64,
                contentType: "application/pdf",
            },
        ]
        : undefined;

    const sendResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            to: params.to,
            name: params.name,
            shareUrl,
            replyTo: params.replyTo,
            subject: params.subject,
            test: params.test,
            attachments,
        }),
    });

    const sendJson = await sendResponse.json();
    if (!sendResponse.ok || !sendJson.ok) {
        throw new Error(sendJson.error || "Email send failed");
    }

    return sendJson;
}
