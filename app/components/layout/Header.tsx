"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Image
            src="/brand/logob.png"
            alt="ABYK Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-brown-heading">
              AWAKENING BY KSENIA
            </span>
            <span className="text-xs text-brown-mid tracking-wide">
              YOUR PERSONAL SPACE FOR GROWTH
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-brown-dark hover:text-brown-heading transition-colors"
          >
            דף הבית
          </Link>
          <Link
            href="/calculator"
            className="text-sm font-medium text-brown-dark hover:text-brown-heading transition-colors"
          >
            מחשבון
          </Link>
          <Link
            href="/interpretations"
            className="text-sm font-medium text-brown-dark hover:text-brown-heading transition-colors"
          >
            פירושים
          </Link>
          <Link
            href="/sales"
            className="neuro-button rounded-xl px-5 py-2 text-sm font-semibold active-press"
          >
            רכישה
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-brown-dark hover:text-brown-heading transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
