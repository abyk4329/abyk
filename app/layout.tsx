import "../styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Assistant } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const assistant = Assistant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Awakening by Ksenia",
  description: "Your Personal Space For Growth — Unlock Your Inner Light",
  icons: {
    icon: "/newlogos/favicon.png",
    shortcut: "/newlogos/favicon.png",
    apple: "/newlogos/favicon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head />
      <body
        className={`${assistant.className} bg-ivory text-charcoal`}
        suppressHydrationWarning
      >
        <div
          className="relative min-h-screen bg-bokeh"
          style={{ backgroundColor: "var(--ivory)" }}
        >
          <Header />
          <div className="pt-20">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
