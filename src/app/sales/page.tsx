"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WealthCodeSalesPage } from "@/components/WealthCodeSalesPage";
import { computeCodeStructure, type CodeStructure } from "@/lib/codeStructure";
import { isFourDigitCode, paths } from "@/lib/urls";

function readStoredCode(): number | null {
  const STORAGE_KEY = "lastWealthCode";
  const readers: Array<() => string | null> = [
    () => {
      try {
        return sessionStorage.getItem(STORAGE_KEY);
      } catch (error) {
        console.warn("Failed to read lastWealthCode from sessionStorage", error);
        return null;
      }
    },
    () => {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch (error) {
        console.warn("Failed to read lastWealthCode from localStorage", error);
        return null;
      }
    },
  ];

  for (const read of readers) {
    const value = read();
    if (isFourDigitCode(value)) {
      return Number(value);
    }
  }

  return null;
}

function SalesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resolvedCode, setResolvedCode] = useState<number | null>(null);
  const [structure, setStructure] = useState<CodeStructure | null>(null);

  useEffect(() => {
    const codeParam = searchParams.get("code");

    if (isFourDigitCode(codeParam)) {
      const numeric = Number(codeParam);
      setResolvedCode((prev) => (prev === numeric ? prev : numeric));
      return;
    }

    const stored = readStoredCode();
    if (stored) {
      setResolvedCode(stored);
      router.replace(paths.sales(stored));
      return;
    }

    router.replace(paths.calculator());
  }, [router, searchParams]);

  useEffect(() => {
    if (resolvedCode == null) {
      setStructure(null);
      return;
    }

    try {
      const computed = computeCodeStructure(resolvedCode);
      setStructure(computed);
    } catch (error) {
      console.warn("Failed to compute code structure for sales page", error);
      setStructure(null);
      router.replace(paths.calculator());
    }
  }, [resolvedCode, router]);

  if (resolvedCode == null || structure == null) {
    return null;
  }

  return <WealthCodeSalesPage wealthCode={resolvedCode} codeStructure={structure} />;
}

export default function SalesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SalesContent />
    </Suspense>
  );
}
