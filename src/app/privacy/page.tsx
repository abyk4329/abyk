'use client'

import { useRouter } from 'next/navigation'
import { PrivacyPolicy } from '@/components/PrivacyPolicy'

export default function PrivacyPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <PrivacyPolicy onBack={handleBack} />
  )
}
