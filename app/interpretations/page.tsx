"use client";

import { Interpretations } from "../components/sections/Interpretations";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function InterpretationsPage() {
  const [code, setCode] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeParam = searchParams.get('code');
  
  useEffect(() => {
    // קריאת הקוד מ-localStorage
    if (typeof window !== 'undefined') {
      if (codeParam && codeParam.length > 0) {
        setCode(codeParam);
        localStorage.setItem('wealthCode', codeParam);
        return;
      }

      const savedCode = localStorage.getItem('wealthCode');
      if (savedCode && savedCode.length > 0) {
        setCode(savedCode);
        return;
      }

      // אם אין קוד, חזרה למחשבון
      router.push('/calculator');
    }
  }, [router, codeParam]);
  
  if (!code) return null;
  
  return <Interpretations code={code} />;
}
