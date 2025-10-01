"use client";

import { useState } from "react";
import { GlassButton } from "../shared/GlassButton";
import { 
  Heart, Star, Moon, Sun, Mail, Phone, MapPin, Calendar, 
  Clock, User, Settings, Search, Filter, Download, Upload,
  ChevronRight, ChevronLeft, Plus, Minus, Check, X
} from "lucide-react";
const backgroundImage = "/images/61a287a191cbe6aa8bcb3bd084132926dd86fada.png";

export function DesignShowcase() {
  const [activeSection, setActiveSection] = useState<'cards' | 'buttons' | 'headers' | 'footers' | 'forms' | 'colors'>('cards');

  return (
    <div className="relative min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-16 fullscreen-bg">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          top: `calc(-1 * env(safe-area-inset-top))`,
          left: `calc(-1 * env(safe-area-inset-left))`,
          right: `calc(-1 * env(safe-area-inset-right))`,
          bottom: `calc(-1 * env(safe-area-inset-bottom))`,
          width: 'calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))',
          height: 'calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))'
        }}
      />

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50 -z-10"
        style={{
          top: `calc(-1 * env(safe-area-inset-top))`,
          left: `calc(-1 * env(safe-area-inset-left))`,
          right: `calc(-1 * env(safe-area-inset-right))`,
          bottom: `calc(-1 * env(safe-area-inset-bottom))`,
          width: 'calc(100% + env(safe-area-inset-left) + env(safe-area-inset-right))',
          height: 'calc(100% + env(safe-area-inset-top) + env(safe-area-inset-bottom))'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Title */}
        <h1 className="mb-8 text-center">
          ספר דוגמאות עיצוב
        </h1>

        {/* Navigation Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 backdrop-blur-xl bg-white/15 p-4 rounded-2xl shadow-[0_8px_32px_0_rgba(94,73,52,0.15)]">
            {[
              { id: 'cards', label: 'כרטיסיות' },
              { id: 'buttons', label: 'כפתורים' },
              { id: 'headers', label: 'הדרים' },
              { id: 'footers', label: 'פוטרים' },
              { id: 'forms', label: 'טפסים' },
              { id: 'colors', label: 'צבעים' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`
                  px-6 py-2.5 rounded-xl transition-all duration-300
                  ${activeSection === tab.id 
                    ? 'bg-[#5e4934] text-[#fdfcfb] shadow-[0_4px_16px_0_rgba(94,73,52,0.3)]' 
                    : 'backdrop-blur-md bg-white/20 text-[#5e4934] hover:bg-white/30'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Section */}
        {activeSection === 'cards' && (
          <div className="space-y-12">
            <h2 className="text-center mb-8">וריאציות כרטיסיות</h2>

            {/* Card Type 1: Glass Main */}
            <div className="space-y-4">
              <h3 className="text-center">כרטיסייה ראשית - Glass Main</h3>
              <div className="glass-card-main rounded-3xl p-8 shadow-[0_12px_40px_0_rgba(94,73,52,0.25)]">
                <h4 className="mb-4 text-center">כותרת הכרטיסייה</h4>
                <p className="text-center mb-6">
                  זוהי כרטיסייה ראשית עם אפקט זכוכית מלא. מושלם לתוכן מרכזי וחשוב.
                </p>
                <div className="flex justify-center gap-4">
                  <GlassButton>לחצן ראשי</GlassButton>
                  <GlassButton variant="secondary">לחצן משני</GlassButton>
                </div>
              </div>
            </div>

            {/* Card Type 2: Glass Secondary */}
            <div className="space-y-4">
              <h3 className="text-center">כרטיסייה משנית - Glass Secondary</h3>
              <div className="glass-card-secondary rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(94,73,52,0.2)]">
                <h5 className="mb-3 text-center">כותרת משנית</h5>
                <p className="text-center">
                  כרטיסייה משנית עם שקיפות גבוהה יותר. מתאימה לתוכן תומך.
                </p>
              </div>
            </div>

            {/* Card Type 3: Simple Blur */}
            <div className="space-y-4">
              <h3 className="text-center">כרטיסייה פשוטה - Simple Blur</h3>
              <div className="backdrop-blur-xl bg-white/15 rounded-2xl p-6 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]">
                <h5 className="mb-3 text-center">כותרת כרטיסייה</h5>
                <p className="text-center">
                  כרטיסייה עם blur פשוט וצל עדין. מינימליסטית ואלגנטית.
                </p>
              </div>
            </div>

            {/* Card Type 4: Info Card with Icon */}
            <div className="space-y-4">
              <h3 className="text-center">כרטיסיית מידע עם אייקון</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 shadow-[0_4px_16px_0_rgba(94,73,52,0.12)] hover:shadow-[0_8px_24px_0_rgba(94,73,52,0.2)] transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 backdrop-blur-md bg-white/30 rounded-full">
                      <Heart className="w-6 h-6" style={{ color: '#87674F' }} />
                    </div>
                  </div>
                  <h5 className="mb-2 text-center">אהבה</h5>
                  <p className="text-center" style={{ fontSize: '14px' }}>
                    תוכן מעניין על האהבה והחיבור
                  </p>
                </div>

                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 shadow-[0_4px_16px_0_rgba(94,73,52,0.12)] hover:shadow-[0_8px_24px_0_rgba(94,73,52,0.2)] transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 backdrop-blur-md bg-white/30 rounded-full">
                      <Star className="w-6 h-6" style={{ color: '#87674F' }} />
                    </div>
                  </div>
                  <h5 className="mb-2 text-center">הצלחה</h5>
                  <p className="text-center" style={{ fontSize: '14px' }}>
                    דרכים להשגת הצלחה אמיתית
                  </p>
                </div>

                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-6 shadow-[0_4px_16px_0_rgba(94,73,52,0.12)] hover:shadow-[0_8px_24px_0_rgba(94,73,52,0.2)] transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 backdrop-blur-md bg-white/30 rounded-full">
                      <Moon className="w-6 h-6" style={{ color: '#87674F' }} />
                    </div>
                  </div>
                  <h5 className="mb-2 text-center">רוגע</h5>
                  <p className="text-center" style={{ fontSize: '14px' }}>
                    מציאת שלווה פנימית
                  </p>
                </div>
              </div>
            </div>

            {/* Card Type 5: Quote Card */}
            <div className="space-y-4">
              <h3 className="text-center">כרטיסיית ציטוט</h3>
              <div className="backdrop-blur-2xl bg-white/25 rounded-3xl p-10 shadow-[0_16px_48px_0_rgba(94,73,52,0.2),inset_0_2px_4px_0_rgba(255,255,255,0.4)]">
                <div className="text-center mb-4" style={{ fontSize: '60px', color: '#d3c6bd', lineHeight: '1' }}>"</div>
                <p className="text-center mb-4" style={{ fontSize: '20px', fontWeight: '500', fontStyle: 'italic' }}>
                  השינוי האמיתי מתחיל מבפנים
                </p>
                <p className="text-center caption">— פתגם עתיק</p>
              </div>
            </div>

            {/* Card Type 6: Stats Card */}
            <div className="space-y-4">
              <h3 className="text-center">כרטיסיות סטטיסטיקה</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="backdrop-blur-xl bg-white/15 rounded-2xl p-6 text-center shadow-[0_4px_16px_0_rgba(94,73,52,0.1)]">
                  <div style={{ fontSize: '48px', fontWeight: '300', color: '#5e4934', marginBottom: '8px' }}>
                    1,234
                  </div>
                  <p className="caption">משתמשים מרוצים</p>
                </div>

                <div className="backdrop-blur-xl bg-white/15 rounded-2xl p-6 text-center shadow-[0_4px_16px_0_rgba(94,73,52,0.1)]">
                  <div style={{ fontSize: '48px', fontWeight: '300', color: '#5e4934', marginBottom: '8px' }}>
                    98%
                  </div>
                  <p className="caption">שביעות רצון</p>
                </div>

                <div className="backdrop-blur-xl bg-white/15 rounded-2xl p-6 text-center shadow-[0_4px_16px_0_rgba(94,73,52,0.1)]">
                  <div style={{ fontSize: '48px', fontWeight: '300', color: '#5e4934', marginBottom: '8px' }}>
                    24/7
                  </div>
                  <p className="caption">זמינות</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Buttons Section */}
        {activeSection === 'buttons' && (
          <div className="space-y-12">
            <h2 className="text-center mb-8">וריאציות כפתורים</h2>

            {/* Primary Buttons */}
            <div className="space-y-6">
              <h3 className="text-center">כפתורים ראשיים</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <GlassButton>כפתור רגיל</GlassButton>
                <GlassButton>
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    <span>עם אייקון</span>
                  </div>
                </GlassButton>
                <GlassButton disabled>כפתור מושבת</GlassButton>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div className="space-y-6">
              <h3 className="text-center">כפתורים משניים</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <GlassButton variant="secondary">כפתור משני</GlassButton>
                <GlassButton variant="secondary">
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    <span>עם אייקון</span>
                  </div>
                </GlassButton>
              </div>
            </div>

            {/* Icon Buttons */}
            <div className="space-y-6">
              <h3 className="text-center">כפתורי אייקון</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="p-3 backdrop-blur-xl bg-white/20 rounded-full transition-all duration-300 hover:bg-white/30 hover:scale-110 active:scale-95 shadow-[0_4px_16px_0_rgba(94,73,52,0.15)]">
                  <Heart className="w-5 h-5" style={{ color: '#5e4934' }} />
                </button>
                <button className="p-3 backdrop-blur-xl bg-white/20 rounded-full transition-all duration-300 hover:bg-white/30 hover:scale-110 active:scale-95 shadow-[0_4px_16px_0_rgba(94,73,52,0.15)]">
                  <Star className="w-5 h-5" style={{ color: '#5e4934' }} />
                </button>
                <button className="p-3 backdrop-blur-xl bg-white/20 rounded-full transition-all duration-300 hover:bg-white/30 hover:scale-110 active:scale-95 shadow-[0_4px_16px_0_rgba(94,73,52,0.15)]">
                  <Settings className="w-5 h-5" style={{ color: '#5e4934' }} />
                </button>
                <button className="p-3 backdrop-blur-xl bg-white/20 rounded-full transition-all duration-300 hover:bg-white/30 hover:scale-110 active:scale-95 shadow-[0_4px_16px_0_rgba(94,73,52,0.15)]">
                  <Search className="w-5 h-5" style={{ color: '#5e4934' }} />
                </button>
              </div>
            </div>

            {/* Small Icon Buttons */}
            <div className="space-y-6">
              <h3 className="text-center">כפתורי אייקון קטנים</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <button className="p-2 backdrop-blur-xl bg-white/15 rounded-full transition-all duration-300 hover:bg-white/25 hover:scale-110 active:scale-95">
                  <Plus className="w-4 h-4" style={{ color: '#5e4934' }} />
                </button>
                <button className="p-2 backdrop-blur-xl bg-white/15 rounded-full transition-all duration-300 hover:bg-white/25 hover:scale-110 active:scale-95">
                  <Minus className="w-4 h-4" style={{ color: '#5e4934' }} />
                </button>
                <button className="p-2 backdrop-blur-xl bg-white/15 rounded-full transition-all duration-300 hover:bg-white/25 hover:scale-110 active:scale-95">
                  <Check className="w-4 h-4" style={{ color: '#5e4934' }} />
                </button>
                <button className="p-2 backdrop-blur-xl bg-white/15 rounded-full transition-all duration-300 hover:bg-white/25 hover:scale-110 active:scale-95">
                  <X className="w-4 h-4" style={{ color: '#5e4934' }} />
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="space-y-6">
              <h3 className="text-center">כפתורי ניווט</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="flex items-center gap-2 px-6 py-3 backdrop-blur-xl bg-white/20 rounded-full transition-all duration-300 hover:bg-white/30 active:scale-95 shadow-[0_4px_16px_0_rgba(94,73,52,0.15)]">
                  <ChevronRight className="w-5 h-5" style={{ color: '#5e4934' }} />
                  <span style={{ color: '#5e4934' }}>הבא</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 backdrop-blur-xl bg-white/20 rounded-full transition-all duration-300 hover:bg-white/30 active:scale-95 shadow-[0_4px_16px_0_rgba(94,73,52,0.15)]">
                  <span style={{ color: '#5e4934' }}>הקודם</span>
                  <ChevronLeft className="w-5 h-5" style={{ color: '#5e4934' }} />
                </button>
              </div>
            </div>

            {/* Pill Buttons */}
            <div className="space-y-6">
              <h3 className="text-center">כפתורי טאג</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <button className="px-4 py-2 backdrop-blur-md bg-white/15 rounded-full transition-all duration-300 hover:bg-white/25 active:scale-95 text-[#5e4934]" style={{ fontSize: '14px' }}>
                  נומרולוגיה
                </button>
                <button className="px-4 py-2 backdrop-blur-md bg-white/15 rounded-full transition-all duration-300 hover:bg-white/25 active:scale-95 text-[#5e4934]" style={{ fontSize: '14px' }}>
                  צמיחה אישית
                </button>
                <button className="px-4 py-2 backdrop-blur-md bg-white/15 rounded-full transition-all duration-300 hover:bg-white/25 active:scale-95 text-[#5e4934]" style={{ fontSize: '14px' }}>
                  מודעות
                </button>
                <button className="px-4 py-2 backdrop-blur-md bg-white/15 rounded-full transition-all duration-300 hover:bg-white/25 active:scale-95 text-[#5e4934]" style={{ fontSize: '14px' }}>
                  רוחניות
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Headers Section */}
        {activeSection === 'headers' && (
          <div className="space-y-12">
            <h2 className="text-center mb-8">וריאציות הדר</h2>

            {/* Header Type 1: Minimal Glass */}
            <div className="space-y-4">
              <h3 className="text-center">הדר מינימלי</h3>
              <div className="backdrop-blur-md bg-white/5 rounded-2xl p-4">
                <p className="text-center caption" style={{ color: '#9f8572' }}>
                  Your Personal Space for Growth
                </p>
              </div>
            </div>

            {/* Header Type 2: With Logo Space */}
            <div className="space-y-4">
              <h3 className="text-center">הדר עם לוגו</h3>
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 backdrop-blur-md bg-white/20 rounded-full"></div>
                  <p className="caption" style={{ color: '#9f8572' }}>
                    Your Personal Space
                  </p>
                  <button className="p-2 backdrop-blur-md bg-white/15 rounded-full hover:bg-white/25 transition-all">
                    <Settings className="w-5 h-5" style={{ color: '#5e4934' }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Header Type 3: With Navigation */}
            <div className="space-y-4">
              <h3 className="text-center">הדר עם ניווט</h3>
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-5">
                <div className="flex flex-col gap-4">
                  <p className="text-center caption" style={{ color: '#9f8572' }}>
                    Your Personal Space for Growth
                  </p>
                  <div className="flex justify-center gap-3">
                    <button className="px-4 py-2 backdrop-blur-md bg-white/15 rounded-full hover:bg-white/25 transition-all text-[#5e4934]" style={{ fontSize: '14px' }}>
                      בית
                    </button>
                    <button className="px-4 py-2 backdrop-blur-md bg-white/15 rounded-full hover:bg-white/25 transition-all text-[#5e4934]" style={{ fontSize: '14px' }}>
                      אודות
                    </button>
                    <button className="px-4 py-2 backdrop-blur-md bg-white/15 rounded-full hover:bg-white/25 transition-all text-[#5e4934]" style={{ fontSize: '14px' }}>
                      יצירת קשר
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Header Type 4: Floating */}
            <div className="space-y-4">
              <h3 className="text-center">הדר צף</h3>
              <div className="backdrop-blur-2xl bg-white/15 rounded-full px-8 py-4 shadow-[0_8px_32px_0_rgba(94,73,52,0.2),inset_0_1px_2px_0_rgba(255,255,255,0.4)] inline-block">
                <p className="caption" style={{ color: '#9f8572' }}>
                  Awakening by Ksenia
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footers Section */}
        {activeSection === 'footers' && (
          <div className="space-y-12">
            <h2 className="text-center mb-8">וריאציות פוטר</h2>

            {/* Footer Type 1: Simple */}
            <div className="space-y-4">
              <h3 className="text-center">פוטר פשוט</h3>
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 text-center">
                <p className="caption mb-4">
                  Awakening by Ksenia © 2025
                </p>
                <div className="flex justify-center gap-3">
                  <button className="p-2 backdrop-blur-md bg-white/15 rounded-full hover:bg-white/25 hover:scale-110 transition-all">
                    <Mail className="w-4 h-4" style={{ color: '#87674F' }} />
                  </button>
                  <button className="p-2 backdrop-blur-md bg-white/15 rounded-full hover:bg-white/25 hover:scale-110 transition-all">
                    <Phone className="w-4 h-4" style={{ color: '#87674F' }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Type 2: With Links */}
            <div className="space-y-4">
              <h3 className="text-center">פוטר עם קישורים</h3>
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <h5 className="mb-3">אודות</h5>
                    <div className="space-y-2">
                      <p className="caption cursor-pointer hover:text-[#5e4934] transition-colors">הסיפור שלנו</p>
                      <p className="caption cursor-pointer hover:text-[#5e4934] transition-colors">הצוות</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h5 className="mb-3">שירותים</h5>
                    <div className="space-y-2">
                      <p className="caption cursor-pointer hover:text-[#5e4934] transition-colors">ייעוץ אישי</p>
                      <p className="caption cursor-pointer hover:text-[#5e4934] transition-colors">קורסים</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h5 className="mb-3">יצירת קשר</h5>
                    <div className="space-y-2">
                      <p className="caption cursor-pointer hover:text-[#5e4934] transition-colors">דוא"ל</p>
                      <p className="caption cursor-pointer hover:text-[#5e4934] transition-colors">טלפון</p>
                    </div>
                  </div>
                </div>
                <div className="text-center pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                  <p className="caption">
                    Awakening by Ksenia © 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Type 3: Minimal with Social */}
            <div className="space-y-4">
              <h3 className="text-center">פוטר מינימלי עם רשתות חברתיות</h3>
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-3">
                    <button className="p-2.5 backdrop-blur-md bg-white/15 rounded-full hover:bg-white/25 hover:scale-110 transition-all shadow-[0_4px_12px_0_rgba(135,103,79,0.15)]">
                      <Mail className="w-4 h-4" style={{ color: '#87674F' }} />
                    </button>
                    <button className="p-2.5 backdrop-blur-md bg-white/15 rounded-full hover:bg-white/25 hover:scale-110 transition-all shadow-[0_4px_12px_0_rgba(135,103,79,0.15)]">
                      <Phone className="w-4 h-4" style={{ color: '#87674F' }} />
                    </button>
                    <button className="p-2.5 backdrop-blur-md bg-white/15 rounded-full hover:bg-white/25 hover:scale-110 transition-all shadow-[0_4px_12px_0_rgba(135,103,79,0.15)]">
                      <MapPin className="w-4 h-4" style={{ color: '#87674F' }} />
                    </button>
                  </div>
                  <div className="backdrop-blur-xl bg-white/15 rounded-full px-4 py-1.5">
                    <p style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5e4934' }}>
                      Awakening by Ksenia © 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Forms Section */}
        {activeSection === 'forms' && (
          <div className="space-y-12">
            <h2 className="text-center mb-8">וריאציות טפסים</h2>

            {/* Input Fields */}
            <div className="space-y-6">
              <h3 className="text-center">שדות קלט</h3>
              <div className="max-w-md mx-auto space-y-4">
                <input
                  type="text"
                  placeholder="שם מלא"
                  className="w-full px-4 py-3 backdrop-blur-xl bg-white/15 rounded-2xl text-center transition-all duration-300 shadow-[0_4px_16px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#87674F]/30 focus:bg-white/25 hover:bg-white/20"
                  style={{ color: '#5e4934' }}
                />
                <input
                  type="email"
                  placeholder="דוא״ל"
                  className="w-full px-4 py-3 backdrop-blur-xl bg-white/15 rounded-2xl text-center transition-all duration-300 shadow-[0_4px_16px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#87674F]/30 focus:bg-white/25 hover:bg-white/20"
                  style={{ color: '#5e4934' }}
                />
                <input
                  type="tel"
                  placeholder="טלפון"
                  className="w-full px-4 py-3 backdrop-blur-xl bg-white/15 rounded-2xl text-center transition-all duration-300 shadow-[0_4px_16px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#87674F]/30 focus:bg-white/25 hover:bg-white/20"
                  style={{ color: '#5e4934' }}
                />
              </div>
            </div>

            {/* Textarea */}
            <div className="space-y-6">
              <h3 className="text-center">תיבת טקסט</h3>
              <div className="max-w-md mx-auto">
                <textarea
                  placeholder="הודעה..."
                  rows={5}
                  className="w-full px-4 py-3 backdrop-blur-xl bg-white/15 rounded-2xl text-center transition-all duration-300 shadow-[0_4px_16px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#87674F]/30 focus:bg-white/25 hover:bg-white/20 resize-none"
                  style={{ color: '#5e4934' }}
                />
              </div>
            </div>

            {/* Date Inputs */}
            <div className="space-y-6">
              <h3 className="text-center">שדות תאריך</h3>
              <div className="max-w-md mx-auto flex gap-4" dir="ltr">
                <input
                  type="number"
                  placeholder="DD"
                  min="1"
                  max="31"
                  className="w-full px-4 py-3 backdrop-blur-xl bg-white/15 rounded-2xl text-center transition-all duration-300 shadow-[0_4px_16px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#87674F]/30 focus:bg-white/25 hover:bg-white/20"
                  style={{ color: '#5e4934' }}
                />
                <input
                  type="number"
                  placeholder="MM"
                  min="1"
                  max="12"
                  className="w-full px-4 py-3 backdrop-blur-xl bg-white/15 rounded-2xl text-center transition-all duration-300 shadow-[0_4px_16px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#87674F]/30 focus:bg-white/25 hover:bg-white/20"
                  style={{ color: '#5e4934' }}
                />
                <input
                  type="number"
                  placeholder="YYYY"
                  min="1900"
                  max="2100"
                  className="w-full px-4 py-3 backdrop-blur-xl bg-white/15 rounded-2xl text-center transition-all duration-300 shadow-[0_4px_16px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#87674F]/30 focus:bg-white/25 hover:bg-white/20"
                  style={{ color: '#5e4934' }}
                />
              </div>
            </div>

            {/* Select Dropdown */}
            <div className="space-y-6">
              <h3 className="text-center">תפריט נפתח</h3>
              <div className="max-w-md mx-auto">
                <select
                  className="w-full px-4 py-3 backdrop-blur-xl bg-white/15 rounded-2xl text-center transition-all duration-300 shadow-[0_4px_16px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#87674F]/30 focus:bg-white/25 hover:bg-white/20 cursor-pointer"
                  style={{ color: '#5e4934' }}
                >
                  <option value="">בחר אפשרות</option>
                  <option value="1">אפשרות 1</option>
                  <option value="2">אפשרות 2</option>
                  <option value="3">אפשרות 3</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Colors Section */}
        {activeSection === 'colors' && (
          <div className="space-y-12">
            <h2 className="text-center mb-8">פלטת צבעים</h2>

            {/* Main Colors */}
            <div className="space-y-6">
              <h3 className="text-center">צבעים עיקריים</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-full aspect-square rounded-2xl mb-3 shadow-lg" style={{ backgroundColor: '#473B31' }}></div>
                  <h5 className="mb-1">חום כהה</h5>
                  <p className="caption">#473B31</p>
                </div>
                <div className="text-center">
                  <div className="w-full aspect-square rounded-2xl mb-3 shadow-lg" style={{ backgroundColor: '#5e4934' }}></div>
                  <h5 className="mb-1">חום כותרות</h5>
                  <p className="caption">#5e4934</p>
                </div>
                <div className="text-center">
                  <div className="w-full aspect-square rounded-2xl mb-3 shadow-lg" style={{ backgroundColor: '#87674F' }}></div>
                  <h5 className="mb-1">ברונזה</h5>
                  <p className="caption">#87674F</p>
                </div>
                <div className="text-center">
                  <div className="w-full aspect-square rounded-2xl mb-3 shadow-lg" style={{ backgroundColor: '#9f8572' }}></div>
                  <h5 className="mb-1">חום ניטרלי</h5>
                  <p className="caption">#9f8572</p>
                </div>
                <div className="text-center">
                  <div className="w-full aspect-square rounded-2xl mb-3 shadow-lg" style={{ backgroundColor: '#d3c6bd' }}></div>
                  <h5 className="mb-1">חול בהיר</h5>
                  <p className="caption">#d3c6bd</p>
                </div>
                <div className="text-center">
                  <div className="w-full aspect-square rounded-2xl mb-3 shadow-lg" style={{ backgroundColor: '#ddcec0' }}></div>
                  <h5 className="mb-1">חול בהיר יותר</h5>
                  <p className="caption">#ddcec0</p>
                </div>
                <div className="text-center">
                  <div className="w-full aspect-square rounded-2xl mb-3 shadow-lg" style={{ backgroundColor: '#eae0d8' }}></div>
                  <h5 className="mb-1">בז׳ בהיר</h5>
                  <p className="caption">#eae0d8</p>
                </div>
                <div className="text-center">
                  <div className="w-full aspect-square rounded-2xl mb-3 shadow-lg" style={{ backgroundColor: '#FDFCFB' }}></div>
                  <h5 className="mb-1">לבן קרם</h5>
                  <p className="caption">#FDFCFB</p>
                </div>
              </div>
            </div>

            {/* Color Combinations */}
            <div className="space-y-6">
              <h3 className="text-center">שילובי צבעים מומלצים</h3>
              
              {/* Combination 1 */}
              <div className="backdrop-blur-xl bg-white/15 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(94,73,52,0.15)]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
                  <div className="aspect-square rounded-xl" style={{ backgroundColor: '#5e4934' }}></div>
                  <div className="aspect-square rounded-xl" style={{ backgroundColor: '#d3c6bd' }}></div>
                  <div className="aspect-square rounded-xl" style={{ backgroundColor: '#FDFCFB' }}></div>
                </div>
                <p className="text-center caption">שילוב קלאסי - טקסט כהה על רקע בהיר</p>
              </div>

              {/* Combination 2 */}
              <div className="backdrop-blur-xl bg-white/15 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(94,73,52,0.15)]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
                  <div className="aspect-square rounded-xl" style={{ backgroundColor: '#87674F' }}></div>
                  <div className="aspect-square rounded-xl" style={{ backgroundColor: '#eae0d8' }}></div>
                  <div className="aspect-square rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}></div>
                </div>
                <p className="text-center caption">שילוב רך - מושלם לכרטיסיות</p>
              </div>

              {/* Combination 3 */}
              <div className="backdrop-blur-xl bg-white/15 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(94,73,52,0.15)]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
                  <div className="aspect-square rounded-xl" style={{ backgroundColor: '#473B31' }}></div>
                  <div className="aspect-square rounded-xl" style={{ backgroundColor: '#9f8572' }}></div>
                  <div className="aspect-square rounded-xl" style={{ backgroundColor: '#ddcec0' }}></div>
                </div>
                <p className="text-center caption">שילוב חם - טקסטים והדגשות</p>
              </div>
            </div>

            {/* Opacity Levels */}
            <div className="space-y-6">
              <h3 className="text-center">רמות שקיפות</h3>
              <div className="space-y-3">
                <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4">
                  <p className="text-center caption">bg-white/5 - שקיפות מקסימלית</p>
                </div>
                <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4">
                  <p className="text-center caption">bg-white/10 - שקיפות גבוהה</p>
                </div>
                <div className="backdrop-blur-xl bg-white/15 rounded-xl p-4">
                  <p className="text-center caption">bg-white/15 - שקיפות בינונית-גבוהה</p>
                </div>
                <div className="backdrop-blur-xl bg-white/20 rounded-xl p-4">
                  <p className="text-center caption">bg-white/20 - שקיפות בינונית</p>
                </div>
                <div className="backdrop-blur-xl bg-white/25 rounded-xl p-4">
                  <p className="text-center caption">bg-white/25 - שקיפות בינונית-נמוכה</p>
                </div>
                <div className="backdrop-blur-xl bg-white/30 rounded-xl p-4">
                  <p className="text-center caption">bg-white/30 - שקיפות נמוכה</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}