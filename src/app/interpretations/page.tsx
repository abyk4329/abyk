'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState, useRef } from 'react'
import { WealthCodeInterpretations } from '@/components/WealthCodeInterpretations'
import { paths, isFourDigitCode } from '@/lib/urls'

interface CodeStructure {
  digits: number[]
  digitCounts: Record<number, number>
  repeatedDigits: { digit: number; count: number }[]
  allSame: boolean
  allDifferent: boolean
  hasRepeats: boolean
  // Canonical structure types used across the app
  type: 'master' | 'repeated' | 'diverse'
}

function InterpretationsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [wealthCode, setWealthCode] = useState<number | null>(null)
  const [codeStructure, setCodeStructure] = useState<CodeStructure | null>(null)
  const [ready, setReady] = useState(false)
  const autoDownloadedRef = useRef(false)

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
      // Map to the normalized tri-state structure type
      type: allSame ? 'master' : allDifferent ? 'diverse' : 'repeated',
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

    if (raw && isFourDigitCode(raw)) {
      const parsed = parseInt(raw)
      setWealthCode(parsed)
      setCodeStructure(generateCodeStructure(parsed))
    }

    setReady(true)
  }, [searchParams])

  // Trigger a one-time server PDF download if requested via query
  useEffect(() => {
  if (!ready || !wealthCode || !isFourDigitCode(wealthCode) || autoDownloadedRef.current) return

    const dl = searchParams.get('download') ?? searchParams.get('autoDownload')
    if (dl === '1' || dl === 'true') {
      autoDownloadedRef.current = true
  const url = paths.downloadPdf(wealthCode)
      // Create an invisible link to prompt browser download
      const a = document.createElement('a')
      a.href = url
      a.download = ''
      a.rel = 'noopener'
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
  }, [ready, wealthCode, searchParams])

  const handleBack = () => {
    if (wealthCode) {
      router.push(paths.thankYou(wealthCode))
    } else {
      router.push(paths.thankYou())
    }
  }

  const handleCalculateNew = () => {
  router.push(paths.home())
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
  router.replace(paths.thankYouNoCode())
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
