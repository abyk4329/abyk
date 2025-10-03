export async function sendWealthEmail(params: {
    to: string;
    name?: string;
    code?: string;
    body?: string[];
    shareUrl?: string;
}) {
    const cleanedBody = params.body?.filter((line) => Boolean(line?.trim())) ?? [];

    const pdfResponse = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: "הפירוש המלא לקוד האישי שלך",
            code: params.code,
            body: cleanedBody,
        }),
    });

    const pdfJson = await pdfResponse.json();
    if (!pdfResponse.ok || !pdfJson.ok) {
        throw new Error(pdfJson.error || "PDF generation failed");
    }

    const sendResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            to: params.to,
            name: params.name,
            pdfBase64: pdfJson.pdfBase64,
            shareUrl: params.shareUrl,
        }),
    });

    const sendJson = await sendResponse.json();
    if (!sendResponse.ok || !sendJson.ok) {
        throw new Error(sendJson.error || "Email send failed");
    }

    return true;
}
