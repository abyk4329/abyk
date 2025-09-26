'use client'

import { useRouter } from 'next/navigation'
import { TermsAndPrivacy } from '@/components/TermsAndPrivacy'

export default function PrivacyPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <TermsAndPrivacy onBack={handleBack} initialTab="privacy" />
  )
}
