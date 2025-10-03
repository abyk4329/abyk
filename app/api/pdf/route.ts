import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import React from "react";
import { WealthReport } from "@/app/lib/pdf/WealthReport";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function extractParams(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  return {
    fullName: searchParams.get("fullName") || undefined,
    email: searchParams.get("email") || undefined,
    wealthCode: searchParams.get("wealthCode") || undefined,
    notes: searchParams.get("notes") || undefined,
  };
}

export async function GET(req: NextRequest) {
  try {
    const params = extractParams(req);
    const doc = React.createElement(WealthReport, params);
    // @ts-expect-error - Type mismatch but functionally correct
    const stream = await renderToStream(doc);
    
    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of stream as any) {
      chunks.push(Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);
    const fileName = `wealth-report-${Date.now()}.pdf`;
    
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    console.error("PDF generation error:", e);
    return NextResponse.json({ error: "Failed to generate PDF", details: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const doc = React.createElement(WealthReport, body);
    // @ts-expect-error - Type mismatch but functionally correct
    const stream = await renderToStream(doc);
    
    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of stream as any) {
      chunks.push(Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);
    const fileName = `wealth-report-${Date.now()}.pdf`;
    
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    console.error("PDF generation error:", e);
    return NextResponse.json({ error: "Failed to generate PDF", details: String(e) }, { status: 500 });
  }
}
