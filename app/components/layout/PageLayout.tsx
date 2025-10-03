import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-none",
};

export function PageLayout({ children, className = "", maxWidth = "lg" }: PageLayoutProps) {
  return (
    <div className={`min-h-[calc(100vh-4rem)] flex flex-col ${className}`}>
      <div className={`container mx-auto px-4 py-8 flex-1 ${maxWidthClasses[maxWidth]}`}>
        {children}
      </div>
    </div>
  );
}
