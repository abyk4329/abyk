import { renderToBuffer } from "@react-pdf/renderer";

import { registerHebrewFonts } from "@/lib/services/core";
import { WealthReport } from "./WealthReport";

export type GenerateWealthReportOptions = {
  code: string;
  userName?: string;
};

export async function generateWealthReportPdfBase64({
  code,
  userName,
}: GenerateWealthReportOptions): Promise<string> {
  const trimmedCode = code?.trim();

  if (!trimmedCode || !/^\d{4}$/.test(trimmedCode)) {
    throw new Error("Invalid code provided for PDF generation");
  }

  registerHebrewFonts();
  const documentElement = WealthReport({ code: trimmedCode, userName });
  const buffer = await renderToBuffer(documentElement as any);

  return buffer.toString("base64");
}
