import { ReactNode } from "react";
import { PageLayout } from "@/app/components/layout/PageLayout";

interface PageWrapperProps {
  title: string;
  subtitle?: string;
  description?: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function PageWrapper({
  title,
  subtitle,
  description,
  children,
  maxWidth = "lg",
}: PageWrapperProps) {
  return (
    <PageLayout maxWidth={maxWidth} className="gap-12">
      <header className="text-center">
        {subtitle && <span className="caption text-brown-mid">{subtitle}</span>}
        <h1 className="mt-2 text-4xl text-brown-heading sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 text-brown-dark/80">{description}</p>}
      </header>
      <div className="space-y-10">{children}</div>
    </PageLayout>
  );
}
