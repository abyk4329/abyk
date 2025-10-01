"use client";

import { Hero } from "./components/sections/Hero";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const handleNavigate = () => {
    router.push('/calculator');
  };
  
  return (
    <div className="flex w-full flex-col items-center">
      <Hero onNavigate={handleNavigate} />
      {/* תוכן נוסף של דף הבית יבוא כאן */}
    </div>
  );
}
