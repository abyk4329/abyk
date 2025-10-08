import "./globals.css";
import type { Metadata, Viewport } from "next";
import { assistant } from "./fonts";
import { AppShell } from "@/app/components/layout";
import { NavigationRoot } from "@/app/lib/navigation";
import { BRAND, SOCIAL, SURFACE } from "@/lib/constants";
import { publicEnv } from "@/lib/env";

const metadataBase = publicEnv.appUrl ? new URL(publicEnv.appUrl) : undefined;

export const metadata: Metadata = {
  title: BRAND.name,
  description: BRAND.taglineHe,
  metadataBase,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/אייקון.png",
    shortcut: "/אייקון.png",
    apple: "/אייקון.png",
  },
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

// Next.js 15: themeColor must be defined in a separate viewport export.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: SURFACE.header },
    { media: "(prefers-color-scheme: dark)", color: SURFACE.headerDark },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={[assistant.variable, "scroll-smooth"].join(" ")}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Fullscreen & Safe-Area immersion */}
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ABYK" />
  {/* iOS notch safe-area background color */}
        <meta name="background-color" content={SURFACE.header} />
      </head>
      <body className={[assistant.className, "page-bg text-foreground antialiased"].join(" ")}>
        <NavigationRoot>
          <AppShell>{children}</AppShell>
        </NavigationRoot>
      </body>
    </html>
  );
}
