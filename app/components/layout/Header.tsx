'use client';

import styles from "./Header.module.css";

interface HeaderProps {
  isHomePage?: boolean;
}

export function Header({ isHomePage = true }: HeaderProps) {
  const variantClass = isHomePage ? styles.headerHome : styles.headerSecondary;
  const headerClassName = [
    "fixed top-0 left-0 right-0 z-50 border-0 transition-all duration-500",
    styles.header,
    variantClass,
  ].join(" ");

  return (
    <header className={headerClassName}>
      <div className={["relative mx-auto flex h-full w-full max-w-screen-xl items-center justify-center px-4 sm:px-6 lg:px-8", styles.inner].join(" ")}>
        <div className={["flex flex-col items-center", styles.container].join(" ")}>
          <p className={["whitespace-nowrap", styles.tagline].join(" ")}>
            Your Personal Space for Growth
          </p>
        </div>
      </div>
    </header>
  );
}
