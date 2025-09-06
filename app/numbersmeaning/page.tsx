'use client'

import { useEffect, useState } from 'react'

export default function NumbersMeaning() {
  const [numbersContent, setNumbersContent] = useState<string>('')

  useEffect(() => {
    fetch('/numbersmeaning.html')
      .then(response => response.text())
      .then(data => setNumbersContent(data))
      .catch(error => console.error('Error loading numbers meaning content:', error))
  }, [])

  return (
    <main className="container mx-auto py-8">
      <div className="content">
    <h1 className="text-gold-deep text-3xl font-bold mb-8">פירושי המספרים</h1>
        <div 
          className="text-charcoal leading-relaxed"
          dangerouslySetInnerHTML={{ __html: numbersContent }}
        />
        <div className="mt-10">
          <a
            href="/"
            className="inline-block ripple font-bold bg-charcoal hover:bg-gold-deep text-ivory px-6 py-3 rounded-lg transition-colors duration-300"
          >
            חזרה לעמוד הבית
          </a>
        </div>
      </div>
    </main>
  )
}
