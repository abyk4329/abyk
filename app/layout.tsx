import type { Metadata } from "next";
import { ReactNode } from "react";
import { RootLayoutClient } from "./components/RootLayoutClient";

import "./globals.css";

export const metadata: Metadata = {
  title: "Awakening by Ksenia | קוד העושר",
  description: "גלו את קוד העושר האישי שלכם - מערכת נומרולוגית לצמיחה אישית והכרה עצמית."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
