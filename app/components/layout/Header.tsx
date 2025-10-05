'use client';

import type { CSSProperties } from "react";

import { neumorphismStyles } from "@/app/components/lib/neomorphism-styles";

interface HeaderProps {
  isHomePage?: boolean;
}

export function Header({ isHomePage = true }: HeaderProps) {
  const { hover: _hover, ...floatingCardStyles } = neumorphismStyles.card.floating;

  const background = isHomePage
    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(245, 241, 237, 0.78))"
    : "linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(245, 241, 237, 0.9))";

  const boxShadow = isHomePage
    ? "0 18px 40px rgba(159, 133, 114, 0.18), 0 6px 18px rgba(255, 255, 255, 0.92), inset 0 -1px 2px rgba(255, 255, 255, 0.85)"
    : "0 22px 48px rgba(159, 133, 114, 0.22), 0 8px 24px rgba(255, 255, 255, 0.94), inset 0 -1px 3px rgba(255, 255, 255, 0.9)";

  const headerStyle: CSSProperties = {
    ...floatingCardStyles,
    background,
    boxShadow,
    paddingTop: "env(safe-area-inset-top)",
    paddingLeft: "env(safe-area-inset-left)",
    paddingRight: "env(safe-area-inset-right)",
    height: "calc(var(--header-height) + env(safe-area-inset-top))",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    borderRadius: 0,
    borderBottom: "1px solid rgba(211, 198, 189, 0.4)",
  };

  const containerStyle: CSSProperties = {
    color: "#5e4934",
  };

  const taglineStyle: CSSProperties = {
    color: "#87674f",
    fontSize: "clamp(0.8rem, 2.3vw, 1.05rem)",
    fontWeight: 300,
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-0 transition-all duration-500"
      style={headerStyle}
    >
      <div className="relative mx-auto flex h-full w-full max-w-screen-xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center" style={containerStyle}>
          <p className="whitespace-nowrap" style={taglineStyle}>
            Your Personal Space for Growth
          </p>
        </div>
      </div>
    </header>
  );
}
