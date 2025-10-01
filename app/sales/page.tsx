"use client";

import { SalesPage } from "../components/sections/SalesPage";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Sales() {
  const [code, setCode] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeParam = searchParams.get('code');
  
  useEffect(() => {
    // קריאת הקוד מ-localStorage
    if (typeof window !== 'undefined') {
      if (codeParam && /^\d{4}$/.test(codeParam)) {
        setCode(codeParam);
        localStorage.setItem('wealthCode', codeParam);
        return;
      }

      const savedCode = localStorage.getItem('wealthCode');
      if (savedCode && /^\d{4}$/.test(savedCode)) {
        setCode(savedCode);
        return;
      }

      // אם אין קוד, חזרה למחשבון
      router.push('/calculator');
    }
  }, [router, codeParam]);
  
  if (!code) return null;
  
  return <SalesPage code={code} />;
}
