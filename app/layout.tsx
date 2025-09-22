import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import "@/legacy/styles/index.css";

export const metadata: Metadata = {
  title: "Awakening by Ksenia",
  description: "מרחב דיגיטלי להתעוררות, הבנה והתרחבות.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen font-sans text-gray-900">
        <div className="relative min-h-screen">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/bg.jpg"
              alt="Awakening background"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
