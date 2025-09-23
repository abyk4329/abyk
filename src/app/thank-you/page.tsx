'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { ThankYouPage } from '@/components/ThankYouPage'

interface CodeStructure {
  digits: number[];
  digitCounts: Record<number, number>;
  repeatedDigits: { digit: number; count: number }[];
  allSame: boolean;
  allDifferent: boolean;
  hasRepeats: boolean;
  type: "master" | "diverse" | "focused" | "balanced";
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
      type: allSame
        ? "master"
        : allDifferent
          ? "diverse"
          : hasRepeats
            ? "focused"
            : "balanced",
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

    if (raw) {
      const parsed = parseInt(raw)
      if (!isNaN(parsed) && parsed >= 1111 && parsed <= 9999) {
        setWealthCode(parsed)
        setCodeStructure(generateCodeStructure(parsed))
      }
    }

    // Always render a thank-you screen even if code is absent/invalid
    setReady(true)
  }, [searchParams])

  const handleBack = () => {
    router.push('/')
  }

  const handleShowInterpretations = (code: number) => {
    router.push(`/interpretations?code=${code}`)
  }

  const handleCalculateNew = () => {
    router.push('/')
  }

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
