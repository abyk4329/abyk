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
    <main className="container mx-auto py-8 assistant-regular">
      <div className="content max-w-4xl mx-auto">
        <h1 className="text-gold-deep text-3xl font-bold mb-8 text-center assistant-bold">מדיניות ופרטיות</h1>
        
        {/* מדיניות פרטיות */}
        <section className="mb-12">
          <h2 className="text-cacao text-2xl font-semibold mb-6 text-center assistant-semibold">מדיניות פרטיות</h2>
          <div 
            className="text-charcoal leading-relaxed assistant-regular"
            dangerouslySetInnerHTML={{ __html: privacyContent }}
          />
        </section>

        {/* תנאי שימוש */}
        <section className="mb-12">
          <h2 className="text-cacao text-2xl font-semibold mb-6 text-center assistant-semibold">תנאי שימוש</h2>
          <div className="text-charcoal leading-relaxed space-y-4 assistant-regular">
            <p>השימוש באתר ובשירותי Awakening by Ksenia כפוף לתנאים הבאים:</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3 assistant-semibold">1. אופי השירות</h3>
            <p>השירותים הניתנים באתר הם לצרכי הדרכה, השראה ופיתוח אישי בלבד. אין בהם כדי להוות יעוץ רפואי, פסיכולוגי או משפטי.</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3 assistant-semibold">2. דיוק המידע</h3>
            <p>אנו עושות מאמצים לספק מידע מדויק ועדכני, אך איננו יכולות להבטיח את דיוקו המלא. המשתמש נושא באחריות לשימוש במידע.</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3 assistant-semibold">3. זכויות יוצרים</h3>
            <p>כל התוכן באתר, כולל טקסטים, עיצובים וקוד, הוא רכושם הרוחני של Awakening by Ksenia ומוגן בזכויות יוצרים.</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3 assistant-semibold">4. אחריות</h3>
            <p>Awakening by Ksenia לא תישא באחריות לכל נזק ישיר או עקיף הנובע משימוש באתר או בשירותים.</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3 assistant-semibold">5. שינויים בתנאים</h3>
            <p>אנו שומרות את הזכות לשנות תנאים אלה מעת לעת. המשך השימוש באתר מהווה הסכמה לתנאים המעודכנים.</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3 assistant-semibold">6. תשלומים והחזרים</h3>
            <p>כל התשלומים מעובדים באמצעות מערכות תשלום מאובטחות. החזרים ניתנים בהתאם למדיניות החזרים הרשמית ובכפוף לתנאים מיוחדים.</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3 assistant-semibold">7. פרטיות ואבטחת מידע</h3>
            <p>אנו מתחייבות לשמור על פרטיות המשתמשים ולא לחשוף מידע אישי לצדדים שלישיים ללא הסכמה מפורשת. כל המידע נשמר במערכות מאובטחות.</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3 assistant-semibold">8. שימוש מותר</h3>
            <p>האתר מיועד לשימוש אישי בלבד. אסור להעתיק, לשכפל או להפיץ את התכנים ללא רשות מפורשת בכתב מ-Awakening by Ksenia.</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3 assistant-semibold">9. יצירת קשר ותמיכה</h3>
            <p>לפניות, שאלות או בעיות טכניות, ניתן ליצור קשר דרך הערוצים הרשמיים: דוא״ל או WhatsApp. נשתדל לענות תוך 24 שעות בימי עסקים.</p>
            
            <h3 className="text-lg font-semibold text-espresso mt-6 mb-3 assistant-semibold">10. תקיפות התנאים</h3>
            <p>אם חלק מהתנאים יימצא כלא תקף או לא ניתן לאכיפה, שאר התנאים יישארו בתוקף. התנאים כפופים לדיני מדינת ישראל.</p>
          </div>
        </section>
        
        <div className="mt-10 text-center">
          <a
            href="/"
            className="inline-block ripple assistant-bold bg-charcoal hover:bg-gold-deep text-ivory px-6 py-3 rounded-lg transition-colors duration-300"
          >
            חזרה לעמוד הבית
          </a>
        </div>
      </div>
    </main>
  )
}
