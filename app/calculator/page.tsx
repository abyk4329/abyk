"use client";

import { Calculator } from "../components/sections/Calculator";
import { useRouter } from "next/navigation";

export default function CalculatorPage() {
  const router = useRouter();
  
  const handleCalculate = (code: string) => {
    // שמירת הקוד ב-localStorage ומעבר לעמוד התוצאות
    if (typeof window !== 'undefined') {
      localStorage.setItem('wealthCode', code);
      router.push(`/result?code=${code}`);
    }
  };
  
  return <Calculator onCalculate={handleCalculate} />;
}
