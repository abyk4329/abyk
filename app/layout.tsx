import "./globals.css";
import type { Metadata } from "next";
import { AppShell } from "@/app/components/layout";
import { BRAND, SOCIAL } from "@/lib/constants";
import { publicEnv } from "@/lib/env";

const metadataBase = publicEnv.appUrl ? new URL(publicEnv.appUrl) : undefined;

export const metadata: Metadata = {
  title: {
    default: BRAND.name,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.taglineHe,
  metadataBase,
  manifest: "/manifest.webmanifest",
  authors: [{ name: "Ksenia Chudnovskaya" }],
  keywords: [
    "נומרולוגיה",
    "Numerology",
    "Awakening by Ksenia",
    "קוד שפע",
    "התפתחות אישית",
  ],
  openGraph: {
    title: BRAND.name,
    description: BRAND.taglineHe,
    url: metadataBase,
    siteName: BRAND.name,
    images: [
      {
        url: "/og/share.png",
        width: 1200,
        height: 630,
        alt: `${BRAND.name} Share Image`,
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    description: BRAND.taglineHe,
    images: ["/og/share-square.png"],
  },
  alternates: {
    canonical: metadataBase?.href ?? undefined,
  },
  category: "personal development",
  creator: BRAND.name,
  other: {
    instagram: SOCIAL.instagram.url,
    whatsapp: SOCIAL.whatsapp.url,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <body className="page-bg text-foreground antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
