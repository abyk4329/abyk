'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { WealthCodeInterpretations } from '@/components/WealthCodeInterpretations'

interface CodeStructure {
  digits: number[]
  digitCounts: Record<number, number>
  repeatedDigits: { digit: number; count: number }[]
  allSame: boolean
  allDifferent: boolean
  hasRepeats: boolean
  type: 'master' | 'diverse' | 'focused' | 'balanced'
}

function InterpretationsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [wealthCode, setWealthCode] = useState<number | null>(null)
  const [codeStructure, setCodeStructure] = useState<CodeStructure | null>(null)
  const [ready, setReady] = useState(false)

  const generateCodeStructure = (code: number): CodeStructure => {
    const digits = code.toString().split('').map(Number)
    const digitCounts = digits.reduce((acc, digit) => {
      acc[digit] = (acc[digit] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    const repeatedDigits = Object.entries(digitCounts)
      .filter(([, count]) => count > 1)
      .map(([digit, count]) => ({ digit: parseInt(digit), count: count as number }))

    const allSame = new Set(digits).size === 1
    const allDifferent = new Set(digits).size === 4
    const hasRepeats = repeatedDigits.length > 0

    return {
      digits,
      digitCounts,
      repeatedDigits,
      allSame,
      allDifferent,
      hasRepeats,
      type: allSame ? 'master' : allDifferent ? 'diverse' : hasRepeats ? 'focused' : 'balanced',
    }
  }

  useEffect(() => {
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

    setReady(true)
  }, [searchParams])

  const handleBack = () => {
    if (wealthCode) {
      router.push(`/thank-you?code=${wealthCode}`)
    } else {
      router.push('/thank-you')
    }
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

  if (!wealthCode || !codeStructure) {
    // If no valid code, send to Thank You to keep flow consistent
    router.replace('/thank-you')
    return null
  }

  return (
    <WealthCodeInterpretations
      wealthCode={wealthCode}
      codeStructure={codeStructure}
      fullData={{}}
      onBack={handleBack}
      onCalculateNew={handleCalculateNew}
    />
  )
}

export default function InterpretationsRoute() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p>טוען...</p>
          </div>
        </div>
      }
    >
      <InterpretationsContent />
    </Suspense>
  )
}
