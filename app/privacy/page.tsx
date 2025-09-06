'use client'

import { useEffect, useState } from 'react'

export default function Privacy() {
  const [privacyContent, setPrivacyContent] = useState<string>('')

  useEffect(() => {
    fetch('/privacytext.html')
      .then(response => response.text())
      .then(data => setPrivacyContent(data))
      .catch(error => console.error('Error loading privacy content:', error))
  }, [])

  return (
    <main className="container mx-auto py-8">
      <div className="content">
        <h1 className="text-gold-deep text-3xl font-bold mb-8">מדיניות פרטיות</h1>
        <div 
          className="text-charcoal leading-relaxed"
          dangerouslySetInnerHTML={{ __html: privacyContent }}
        />
      </div>
    </main>
  )
}
