"use client";

import { SalesPage } from "../components/sections/SalesPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Sales() {
  const [code, setCode] = useState<string>('');
  const router = useRouter();
  
  useEffect(() => {
    // קריאת הקוד מ-localStorage
    if (typeof window !== 'undefined') {
      const savedCode = localStorage.getItem('wealthCode');
      if (savedCode) {
        setCode(savedCode);
      } else {
        // אם אין קוד, חזרה למחשבון
        router.push('/calculator');
      }
    }
  }, [router]);
  
  if (!code) return null;
  
  return <SalesPage code={code} />;
}
