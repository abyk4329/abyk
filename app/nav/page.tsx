"use client";

import Link from "next/link";

export default function NavigationPage() {
  const pages = [
    { name: "דף הבית", path: "/" },
    { name: "מחשבון קוד העושר", path: "/calculator" },
    { name: "תוצאות", path: "/result" },
    { name: "פרשנויות מפורטות", path: "/interpretations" },
    { name: "דף מכירות", path: "/sales" },
    { name: "תודה על הרכישה", path: "/thank-you" },
    { name: "תנאים ופרטיות", path: "/terms" },
    { name: "דוגמאות עיצוב", path: "/design" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige via-white to-beige p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-brown-heading mb-8 text-center">
          ניווט בין עמודים
        </h1>
        
        <div className="glass-card p-8 space-y-4">
          {pages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className="block p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300 text-brown-dark hover:shadow-lg"
            >
              <span className="text-lg">{page.name}</span>
              <span className="text-sm text-gray-500 mr-2">({page.path})</span>
            </Link>
          ))}
        </div>
        
        <p className="text-center mt-8 text-sm text-gray-600">
          * עמוד זה מיועד לפיתוח בלבד
        </p>
      </div>
    </div>
  );
}
