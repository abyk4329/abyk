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
      <div
        className={[
          "relative mx-auto flex h-full w-full max-w-[min(1440px,100%)] items-center justify-center px-1 sm:px-2 lg:px-4 xl:px-5",
          styles.inner,
        ].join(" ")}
      >
        <div className={["flex flex-col items-center px-1", styles.container].join(" ")}>
          <p className={[styles.tagline].join(" ")}>
            Your Personal Space for Growth
          </p>
        </div>
      </div>
    </header>
  );
}
