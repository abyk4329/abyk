'use client'

import { useRouter } from 'next/navigation'
import { TermsOfService } from '@/components/TermsOfService'

export default function TermsPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <TermsOfService onBack={handleBack} />
  )
}
