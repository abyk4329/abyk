'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { TermsAndPrivacy } from '@/components/TermsAndPrivacy'

function TermsPrivacyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') === 'privacy' ? 'privacy' : 'terms'

  const handleBack = () => {
    router.back()
  }

  return (
    <TermsAndPrivacy 
      onBack={handleBack} 
      initialTab={initialTab}
    />
  )
}

export default function TermsPrivacyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>טוען...</p>
        </div>
      </div>
    }>
      <TermsPrivacyContent />
    </Suspense>
  )
}
