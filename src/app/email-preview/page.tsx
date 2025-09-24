'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { EmailPreview } from '@/components/EmailPreview'

function EmailPreviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [wealthCode, setWealthCode] = useState<number | null>(null)

  useEffect(() => {
    const code = searchParams.get('code')
    const parsedCode = parseInt(code || "1234")
    
    if (!isNaN(parsedCode) && parsedCode >= 1111 && parsedCode <= 9999) {
      setWealthCode(parsedCode)
    } else {
      // Invalid code, redirect to home
      router.push('/')
    }
  }, [searchParams, router])

  const handleBack = () => {
    router.push('/')
  }

  if (!wealthCode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>טוען...</p>
        </div>
      </div>
    )
  }

  return (
    <EmailPreview
      wealthCode={wealthCode}
      onBack={handleBack}
    />
  )
}

export default function EmailPreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>טוען...</p>
        </div>
      </div>
    }>
      <EmailPreviewContent />
    </Suspense>
  )
}
