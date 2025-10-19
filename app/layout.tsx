import "./globals.css";
import type { Metadata, Viewport } from "next";
import { assistant } from "./fonts";
import {
  AppShell,
  DrawerProvider,
  HeaderBar,
  SideMenu,
} from "@/app/components/layout";
import { AuthProvider, NavigationRoot } from "@/app/components/providers";
import { BRAND, SOCIAL, SURFACE } from "@/lib/constants";
import { publicEnv } from "@/lib/env";

const metadataBase = publicEnv.appUrl ? new URL(publicEnv.appUrl) : undefined;

export const metadata: Metadata = {
  title: BRAND.name,
  description: BRAND.taglineHe,
  metadataBase,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/ABYKICON.png",
    shortcut: "/ABYKICON.png",
    apple: "/ABYKICON.png",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        {/* Prevent iOS from auto-detecting and formatting phone numbers, emails, etc. to avoid hydration mismatches */}
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="ABYK" />
        {/* 
          Note: Safe-area background colors are handled via:
          1. The themeColor in viewport export (for status bar)
          2. CSS environment variables in globals.css (for safe areas)
          The non-standard "background-color" meta tag has been removed.
        */}
      </head>
      <body
        className={[
          assistant.className,
          "page-bg text-foreground antialiased",
        ].join(" ")}
      >
        <AuthProvider>
          <DrawerProvider>
            <HeaderBar />
            <SideMenu />
            <NavigationRoot>
              <AppShell>{children}</AppShell>
            </NavigationRoot>
          </DrawerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
