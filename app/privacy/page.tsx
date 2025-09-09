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
        <h1 className="text-gold-deep text-3xl font-bold mb-8">מדיניות ופרטיות</h1>
        
        {/* מדיניות פרטיות */}
        <section className="mb-12">
          <h2 className="text-cacao text-2xl font-semibold mb-6">מדיניות פרטיות</h2>
          <div 
            className="text-charcoal leading-relaxed"
            dangerouslySetInnerHTML={{ __html: privacyContent }}
          />
        </section>

        {/* תנאי שימוש */}
        <section className="mb-12">
          <h2 className="text-cacao text-2xl font-semibold mb-6">תנאי שימוש</h2>
          <div className="text-charcoal leading-relaxed space-y-4">
            <p>השימוש באתר ובשירותי Awakening by Ksenia כפוף לתנאים הבאים:</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3">1. אופי השירות</h3>
            <p>השירותים הניתנים באתר הם לצרכי הדרכה, השראה ופיתוח אישי בלבד. אין בהם כדי להוות יעוץ רפואי, פסיכולוגי או משפטי.</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3">2. דיוק המידע</h3>
            <p>אנו עושות מאמצים לספק מידע מדויק ועדכני, אך איננו יכולות להבטיח את דיוקו המלא. המשתמש נושא באחריות לשימוש במידע.</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3">3. זכויות יוצרים</h3>
            <p>כל התוכן באתר, כולל טקסטים, עיצובים וקוד, הוא רכושם הרוחני של Awakening by Ksenia ומוגן בזכויות יוצרים.</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3">4. אחריות</h3>
            <p>Awakening by Ksenia לא תישא באחריות לכל נזק ישיר או עקיף הנובע משימוש באתר או בשירותים.</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3">5. שינויים בתנאים</h3>
            <p>אנו שומרות את הזכות לשנות תנאים אלה מעת לעת. המשך השימוש באתר מהווה הסכמה לתנאים המעודכנים.</p>
          </div>
        </section>
        
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
