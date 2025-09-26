'use client'

import { useRouter } from 'next/navigation'
import { TermsAndPrivacy } from '@/components/TermsAndPrivacy'

export default function TermsPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <TermsAndPrivacy onBack={handleBack} initialTab="terms" />
  )
}
