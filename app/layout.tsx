import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Awakening by Ksenia",
  description: "Neumorphic UI • Assistant font • RTL",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="flex flex-col min-h-screen bg-background text-foreground">
        <main className="flex-1 no-bottom-gap">{children}</main>
        {/* אם תרצי להכניס כאן Header/Footer גלובליים, אפשר, אבל מומלץ להשאירם כרכיבים בעמודים/פריסות פנימיות */}
      </body>
    </html>
  );
}
