import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generateWealthPdf(params: {
    title: string;
    code?: string;
    body?: string[];
}) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const { width, height } = page.getSize();
    const margin = 50;
    let y = height - margin;

    const drawText = (text: string, size = 16, color = rgb(0.29, 0.23, 0.19)) => {
        const safeText = text.replace(/\s+/g, " ").trim();
        if (!safeText) {
            y -= size + 6;
            return;
        }
        page.drawText(safeText, { x: margin, y, size, font, color });
        y -= size + 10;
    };

    drawText("AWAKENING BY KSENIA", 18);
    drawText("YOUR PERSONAL SPACE FOR GROWTH", 12, rgb(0.62, 0.52, 0.45));
    y -= 10;

    drawText(params.title, 22);
    if (params.code) {
        drawText(`קוד העושר: ${params.code}`, 18);
    }

    (params.body ?? []).forEach((line) => drawText(line, 14));

    const bytes = await pdfDoc.save();
    return Buffer.from(bytes).toString("base64");
}
