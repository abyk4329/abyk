import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { codeStructures } from "@/app/data/codeStructures";
import { digitInterpretations } from "@/app/data/digitInterpretations";
import { dailyApplication } from "@/app/data/dailyApplication";

const TITLE_COLOR = "#5e4934";
const TEXT_COLOR = "#2f2115";
const SECTION_SPACING = 18;

type PDFDocumentInstance = InstanceType<typeof PDFDocument>;

function registerFonts(doc: PDFDocumentInstance) {
    // Try multiple paths for font files (development vs production)
    const possiblePaths = [
        path.join(process.cwd(), "public", "fonts", "Assistant", "static"),
        path.join(process.cwd(), ".next", "server", "public", "fonts", "Assistant", "static"),
        path.join(process.cwd(), ".vercel", "output", "static", "fonts", "Assistant", "static"),
    ];

    const findFont = (fileName: string): string => {
        for (const dir of possiblePaths) {
            const fontPath = path.join(dir, fileName);
            if (fs.existsSync(fontPath)) {
                return fontPath;
            }
        }
        throw new Error(`Font file ${fileName} not found in any of the expected locations`);
    };

    try {
        doc.registerFont("Assistant-Regular", findFont("Assistant-Regular.ttf"));
        doc.registerFont("Assistant-Bold", findFont("Assistant-Bold.ttf"));
    } catch (error) {
        console.error("Font registration failed, using default fonts", error);
        // Fallback to built-in fonts if custom fonts are not available
        // PDFKit will use Helvetica as default
    }
}

function determineCodeType(code: string): "master" | "repeating" | "diverse" {
    const digits = code.split("");
    const uniqueCount = new Set(digits).size;

    if (uniqueCount === 1) return "master";
    if (uniqueCount === 4) return "diverse";
    return "repeating";
}

function writeHeading(doc: PDFDocumentInstance, text: string, size = 16) {
    doc
        .font("Assistant-Bold")
        .fontSize(size)
        .fillColor(TITLE_COLOR)
        .text(text, {
            align: "right",
            lineGap: 4,
        })
        .moveDown(0.5);
}

function writeParagraph(doc: PDFDocumentInstance, text: string, size = 12) {
    doc
        .font("Assistant-Regular")
        .fontSize(size)
        .fillColor(TEXT_COLOR)
        .text(text, {
            align: "right",
            lineGap: 6,
        })
        .moveDown(0.5);
}

function writeList(doc: PDFDocumentInstance, items: string[]) {
    if (!items.length) return;
    doc.font("Assistant-Regular").fontSize(12).fillColor(TEXT_COLOR);
    items.forEach((item) => {
        doc.text(`• ${item}`, {
            align: "right",
            lineGap: 4,
        });
    });
    doc.moveDown(0.5);
}

export async function generateWealthCodePdf(code: string): Promise<Buffer> {
    const sanitizedCode = code.trim();
    if (!/^\d{4}$/.test(sanitizedCode)) {
        throw new Error("קוד לא תקין ליצירת PDF");
    }

    const uniqueDigits = Array.from(new Set(sanitizedCode.split("")))
        .map(Number)
        .sort((a, b) => a - b);

    const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        info: {
            Title: `קוד העושר ${sanitizedCode}`,
            Author: "Awakening by Ksenia",
            Subject: "פירוש קוד העושר האישי",
        },
    });

    registerFonts(doc);

    const chunks: Buffer[] = [];

    return await new Promise<Buffer>((resolve, reject) => {
        doc.on("data", (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.on("error", (error: Error) => reject(error));

        doc.font("Assistant-Bold").fontSize(24).fillColor(TITLE_COLOR).text("Awakening by Ksenia", {
            align: "right",
        });
        doc
            .font("Assistant-Regular")
            .fontSize(16)
            .fillColor(TEXT_COLOR)
            .text("הפירוש המלא לקוד העושר האישי שלך", {
                align: "right",
            })
            .moveDown();

        writeHeading(doc, "קוד העושר שלך", 20);
        doc
            .font("Assistant-Regular")
            .fontSize(26)
            .fillColor(TITLE_COLOR)
            .text(sanitizedCode, {
                align: "right",
                characterSpacing: 1,
            })
            .moveDown();

        writeParagraph(doc, codeStructures.intro, 12);

        const codeType = determineCodeType(sanitizedCode);
        let typeHeading = "קוד עם ספרות חוזרות";
        if (codeType === "master") typeHeading = "קוד מאסטר - כל הספרות זהות";
        if (codeType === "diverse") typeHeading = "קוד מגוון - כל הספרות שונות";

        writeHeading(doc, typeHeading);
        writeParagraph(doc, codeStructures[codeType], 12);

        doc.moveDown();

        uniqueDigits.forEach((digit, index) => {
            const interpretation = digitInterpretations[digit];
            doc.addPage({ margin: 50 });

            writeHeading(doc, `ספרה ${digit}`, 18);
            writeParagraph(doc, interpretation.title, 13);

            writeHeading(doc, "מהות הספרה", 14);
            writeParagraph(doc, interpretation.essence, 12);

            writeHeading(doc, "מתנות מרכזיות", 14);
            writeList(doc, interpretation.gifts);

            writeHeading(doc, "חסימות ואתגרים עיקריים", 14);
            writeList(doc, interpretation.blocks);

            writeHeading(doc, "נורות אדומות – סימנים לחוסר איזון", 14);
            writeList(doc, interpretation.redFlags);

            writeHeading(doc, "מוקדי צמיחה והתפתחות", 14);
            writeList(doc, interpretation.growth);

            writeHeading(doc, "תחומים מתאימים לקריירה ולשליחות", 14);
            writeList(doc, interpretation.careers);

            writeHeading(doc, "דוגמה יומית לתרגול", 14);
            writeParagraph(doc, interpretation.dailyPractice, 12);

            writeHeading(doc, "בשורה התחתונה", 14);
            writeParagraph(doc, interpretation.bottomLine, 12);

            if (index < uniqueDigits.length - 1) {
                doc.moveDown(SECTION_SPACING / 10);
            }
        });

        doc.addPage({ margin: 50 });
        writeHeading(doc, dailyApplication.title, 18);
        writeParagraph(doc, dailyApplication.content, 12);

        doc
            .moveDown(1.5)
            .font("Assistant-Regular")
            .fontSize(11)
            .fillColor("#6b4f33")
            .text("© 2025 Awakening by Ksenia – כל הזכויות שמורות.", {
                align: "center",
            });

        doc.end();
    });
}
