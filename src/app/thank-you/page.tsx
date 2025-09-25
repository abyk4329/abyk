'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { ThankYouPage } from '@/components/ThankYouPage'
import { paths, isFourDigitCode } from '@/lib/urls'

interface CodeStructure {
  digits: number[];
  digitCounts: Record<number, number>;
  repeatedDigits: { digit: number; count: number }[];
  allSame: boolean;
  allDifferent: boolean;
  hasRepeats: boolean;
  // Canonical structure types used across the app
  type: "master" | "repeated" | "diverse";
}

function ThankYouContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [wealthCode, setWealthCode] = useState<number | null>(null)
  const [codeStructure, setCodeStructure] = useState<CodeStructure | null>(null)
  const [ready, setReady] = useState(false)

  // Generate code structure for URL-based access
  const generateCodeStructure = (code: number): CodeStructure => {
    const digits = code.toString().split("").map(Number);
    const digitCounts = digits.reduce(
      (acc, digit) => {
        acc[digit] = (acc[digit] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    const repeatedDigits = Object.entries(digitCounts)
      .filter(([, count]) => count > 1)
      .map(([digit, count]) => ({
        digit: parseInt(digit),
        count,
      }));

    const allSame = new Set(digits).size === 1;
    const allDifferent = new Set(digits).size === 4;
    const hasRepeats = repeatedDigits.length > 0;

    return {
      digits,
      digitCounts,
      repeatedDigits,
      allSame,
      allDifferent,
      hasRepeats,
      // Map to the normalized tri-state structure type
      type: allSame ? "master" : allDifferent ? "diverse" : "repeated",
    };
  };

  useEffect(() => {
    // Accept multiple possible param keys from payment provider
    const possibleKeys = [
      'code',
      'transaction_id',
      'transactionId',
      'order_id',
      'orderId',
      'payment_id',
      'paymentId',
      'reference',
      'ref',
      'id',
    ] as const

    let raw: string | null = null
    for (const key of possibleKeys) {
      const v = searchParams.get(key as string)
      if (v) {
        raw = v
        break
      }
    }

    let parsed: number | null = null
    if (raw) {
      const p = parseInt(raw)
      if (!isNaN(p) && p >= 1111 && p <= 9999) {
        parsed = p
      }
    }

    // Fallback: try localStorage (was saved on sales page before redirect)
    if (!parsed && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('lastWealthCode')
        if (stored) {
          const p2 = parseInt(stored, 10)
          if (!isNaN(p2) && p2 >= 1111 && p2 <= 9999) {
            parsed = p2
          }
        }
      } catch {}
    }

    if (parsed) {
      setWealthCode(parsed)
      setCodeStructure(generateCodeStructure(parsed))
    }

    // Always render a thank-you screen even if code is absent/invalid
    setReady(true)
  }, [searchParams])

  const handleBack = () => {
  router.push(paths.home())
  }

  const handleShowInterpretations = (code: number) => {
    if (isFourDigitCode(code)) {
      router.push(paths.interpretations(code))
    } else {
      router.push(paths.thankYou())
    }
  }

  const handleCalculateNew = () => {
    router.push(paths.home())
  }

  const handleShowTerms = () => router.push(paths.termsPrivacy())
  const handleShowPrivacy = () => router.push(paths.termsPrivacy())
  const handleShowTermsAndPrivacy = () => router.push(paths.termsPrivacy())

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>טוען...</p>
        </div>
      </div>
    )
  }

  return (
    <ThankYouPage
      wealthCode={wealthCode ?? undefined}
      codeStructure={codeStructure ?? undefined}
      onBack={handleBack}
      onShowInterpretations={handleShowInterpretations}
      onCalculateNew={handleCalculateNew}
  onShowTerms={handleShowTerms}
  onShowPrivacy={handleShowPrivacy}
  onShowTermsAndPrivacy={handleShowTermsAndPrivacy}
    />
  )
}

export default function ThankYouPageRoute() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>טוען...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
