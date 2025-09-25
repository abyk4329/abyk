'use client'

import { WealthCodeCalculator } from '@/components/WealthCodeCalculator'
import { paths } from '@/lib/urls'

export default function CalculatorPage() {
  const handleBack = () => {
    window.location.href = paths.home()
  }

  return <WealthCodeCalculator onBack={handleBack} />
}
