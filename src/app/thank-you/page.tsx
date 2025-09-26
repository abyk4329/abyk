'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { ThankYouPage } from '@/components/ThankYouPage'
import { paths, isFourDigitCode } from '@/lib/urls'
import { computeCodeStructure, type CodeStructure } from '@/lib/codeStructure'

function ThankYouContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [wealthCode, setWealthCode] = useState<number | null>(null)
  const [codeStructure, setCodeStructure] = useState<CodeStructure | null>(null)
  const [ready, setReady] = useState(false)



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
      } catch (error) {
        console.warn('Failed to read lastWealthCode from localStorage', error)
      }
    }

    if (parsed) {
      setWealthCode(parsed)
      setCodeStructure(computeCodeStructure(parsed))
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
