import "../styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Assistant } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const assistant = Assistant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Awakening by Ksenia",
  description: "Your Personal Space For Growth — Unlock Your Inner Light",
  manifest: "/manifest.json",
  icons: {
    icon: "/newlogos/Favicon.png",
    shortcut: "/newlogos/Favicon.png",
    apple: "/newlogos/Favicon.png",
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
          className="relative min-h-screen bg-bokeh flex flex-col"
          style={{ backgroundColor: "var(--ivory)" }}
        >
          <Header />
          <main className="flex-1 pt-20 pb-28 md:pb-24">{children}</main>
          <ThemeSwitcher />
          <Footer />
        </div>
      </body>
    </html>
  );
}
