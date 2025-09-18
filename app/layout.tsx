import "../styles/globals.css";
import type { Metadata, Viewport } from "next";
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
    icon: [
      { url: "/newlogos/Favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/newlogos/Favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/newlogos/Favicon.png", sizes: "192x192", type: "image/png" },
      { url: "/newlogos/Favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/newlogos/Favicon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/newlogos/Favicon.png",
  },
  appleWebApp: {
    capable: true,
    title: "Awakening by Ksenia",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#fdfcfa",
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
