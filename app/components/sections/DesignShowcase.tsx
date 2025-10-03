"use client";

import { useState } from "react";
import { GlassButton } from "@/app/components/shared/GlassButton";
import { neumorphismStyles, createHoverHandlers, createPressHandlers, getBoxShadow } from "@/app/components/lib/neomorphism-styles";
import { 
  Sparkles, Compass, Heart, Star, Moon, Sun, Mail, Phone, MapPin, Calendar, 
  Clock, User, Settings, Search, Filter, Download, Upload, Share2, Bell,
  ChevronRight, ChevronLeft, Plus, Minus, Check, X, Home, Zap, Target,
  TrendingUp, Award, Gift, BookOpen, Briefcase, Lightbulb
} from "lucide-react";

// Dev-only background placeholder. Replace with a real asset from /public when needed.
const backgroundImage = "/og/share-square.png";

export function DesignShowcase() {
  const [activeSection, setActiveSection] = useState<'cards' | 'buttons' | 'inputs' | 'icons' | 'layouts' | 'typography' | 'interactions'>('cards');

  return (
    <div className="relative min-h-[calc(100vh-var(--header-height))] pt-20 sm:pt-24 lg:pt-28 pb-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
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
        {/* DEV-ONLY NOTICE: This is a design playground and must not ship to production */}
        <div className="mb-6">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 border-0"
            style={{
              background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(248, 244, 240))',
              boxShadow: `
                8px 8px 16px rgba(159, 133, 114, 0.12),
                -8px -8px 16px rgba(255, 255, 255, 0.8),
                inset 1px 1px 2px rgba(255, 255, 255, 0.5)
              `,
              color: '#87674F',
              fontWeight: 700
            }}
          >
            <span>⚠️ דף פיתוח בלבד – לא לפרודקשן</span>
          </div>
        </div>
        {/* Title */}
        <h1 className="mb-6 text-center">
          ספר עיצוב Neumorphism
        </h1>
        <p className="caption text-center mb-10">
          כל הקומפוננטות והדוגמאות - Soft UI 3D
        </p>

        {/* Navigation Tabs */}
        <div className="mb-12">
          <div 
            className="rounded-[32px] p-4 sm:p-6 border-0 transition-all duration-500"
            style={neumorphismStyles.card.secondary}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { id: 'cards', label: 'כרטיסים' },
                { id: 'buttons', label: 'כפתורים' },
                { id: 'inputs', label: 'שדות קלט' },
                { id: 'icons', label: 'אייקונים' },
                { id: 'layouts', label: 'לייאאוטים' },
                { id: 'typography', label: 'טיפוגרפיה' },
                { id: 'interactions', label: 'אינטראקציות' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  className="rounded-full px-6 py-3 transition-all duration-400 border-0"
                  style={activeSection === tab.id 
                    ? {
                        background: 'linear-gradient(145deg, rgb(94, 73, 52), rgb(135, 103, 79))',
                        boxShadow: `
                          inset 6px 6px 12px rgba(71, 59, 49, 0.3),
                          inset -6px -6px 12px rgba(159, 133, 114, 0.3),
                          2px 2px 8px rgba(94, 73, 52, 0.2)
                        `,
                        color: '#fdfcfb',
                        fontWeight: '700'
                      }
                    : {
                        background: 'linear-gradient(145deg, rgb(255, 255, 255), rgb(248, 244, 240))',
                        boxShadow: `
                          8px 8px 16px rgba(159, 133, 114, 0.12),
                          -8px -8px 16px rgba(255, 255, 255, 0.8),
                          inset 1px 1px 2px rgba(255, 255, 255, 0.5)
                        `,
                        color: '#87674F',
                        fontWeight: '600'
                      }
                  }
                  onMouseEnter={(e) => {
                    if (activeSection !== tab.id) {
                      e.currentTarget.style.boxShadow = `
                        10px 10px 20px rgba(159, 133, 114, 0.15),
                        -10px -10px 20px rgba(255, 255, 255, 0.9),
                        inset 1px 1px 2px rgba(255, 255, 255, 0.6)
                      `;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== tab.id) {
                      e.currentTarget.style.boxShadow = `
                        8px 8px 16px rgba(159, 133, 114, 0.12),
                        -8px -8px 16px rgba(255, 255, 255, 0.8),
                        inset 1px 1px 2px rgba(255, 255, 255, 0.5)
                      `;
                      e.currentTarget.style.transform = '';
                    }
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Section */}
        {activeSection === 'cards' && (
          <div className="space-y-12">
            <h2 className="text-center mb-8">כרטיסים Neumorphism</h2>

            {/* Main Card - Floating 3D */}
            <div className="space-y-4">
              <h3 className="text-center">כרטיס ראשי מוגבה - Main Card</h3>
              <div 
                className="rounded-[40px] p-8 sm:p-10 lg:p-12 border-0 transition-all duration-500"
                style={neumorphismStyles.card.main}
                {...createHoverHandlers(
                  neumorphismStyles.card.main.boxShadow,
                  neumorphismStyles.card.main.hover
                )}
              >
                <div className="flex justify-center mb-6">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center border-0 transition-all duration-500"
                    style={neumorphismStyles.icon.default}
                  >
                    <Sparkles className="w-10 h-10" style={{ color: '#87674F' }} />
                  </div>
                </div>
                <h2 className="mb-4 text-center">כותרת ראשית</h2>
                <p className="text-center mb-8">
                  זהו כרטיס ראשי עם עיצוב Neumorphism מלא. השימוש בו מתאים לתוכן מרכזי וחשוב.
                  הצללים הכפולים יוצרים אפקט תלת-מימדי מרשים.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <GlassButton>פעולה ראשית</GlassButton>
                  <GlassButton>פעולה משנית</GlassButton>
                </div>
              </div>
            </div>

            {/* Secondary Card */}
            <div className="space-y-4">
              <h3 className="text-center">כרטיס משני - Secondary Card</h3>
              <div 
                className="rounded-[32px] p-6 sm:p-8 border-0 transition-all duration-500"
                style={neumorphismStyles.card.secondary}
                {...createHoverHandlers(
                  neumorphismStyles.card.secondary.boxShadow,
                  neumorphismStyles.card.secondary.hover
                )}
              >
                <h4 className="mb-4 text-center">כותרת משנית</h4>
                <p className="text-center mb-4">
                  כרטיס משני עם צללים מתונים יותר. מתאים לתוכן תומך או לכרטיסים פנימיים.
                </p>
                <div className="caption text-center">
                  עיצוב עדין ומאוזן
                </div>
              </div>
            </div>

            {/* Floating Card - Logo Style */}
            <div className="space-y-4">
              <h3 className="text-center">כרטיס צף - Floating Card</h3>
              <div className="flex justify-center">
                <div 
                  className="rounded-full w-32 h-32 flex items-center justify-center border-0 transition-all duration-600"
                  style={neumorphismStyles.card.floating}
                  {...createHoverHandlers(
                    neumorphismStyles.card.floating.boxShadow,
                    neumorphismStyles.card.floating.hover
                  )}
                >
                  <Star className="w-16 h-16" style={{ color: '#87674F' }} />
                </div>
              </div>
              <p className="caption text-center">
                כרטיס צף עם עומק מקסימלי - מושלם ללוגו או אלמנטים מיוחדים
              </p>
            </div>

            {/* Info Cards Grid */}
            <div className="space-y-4">
              <h3 className="text-center">כרטיסי מידע עם אייקונים</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Heart, title: "אהבה", description: "תחום של חיבור וקשר" },
                  { icon: Zap, title: "אנרגיה", description: "כוח פנימי ומוטיבציה" },
                  { icon: Target, title: "מטרה", description: "כיוון ומיקוד בחיים" },
                  { icon: TrendingUp, title: "צמיחה", description: "התפתחות מתמדת" },
                  { icon: Award, title: "הצלחה", description: "השגת יעדים" },
                  { icon: Gift, title: "מתנות", description: "כישורים ייחודיים" }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-[24px] p-6 border-0 transition-all duration-500"
                    style={neumorphismStyles.card.secondary}
                    {...createHoverHandlers(
                      neumorphismStyles.card.secondary.boxShadow,
                      neumorphismStyles.card.secondary.hover
                    )}
                  >
                    <div className="flex justify-center mb-4">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center border-0 transition-all duration-500"
                        style={neumorphismStyles.icon.default}
                      >
                        <item.icon className="w-8 h-8" style={{ color: '#87674F' }} />
                      </div>
                    </div>
                    <h5 className="mb-2 text-center">{item.title}</h5>
                    <p className="caption text-center">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Card */}
            <div className="space-y-4">
              <h3 className="text-center">כרטיס ציטוט</h3>
              <div 
                className="rounded-[40px] p-10 sm:p-12 border-0 transition-all duration-500"
                style={neumorphismStyles.card.main}
              >
                <div className="text-center mb-4" style={{ fontSize: '80px', color: '#d3c6bd', lineHeight: '1', fontWeight: '300' }}>
                  &ldquo;
                </div>
                <h3 className="mb-6 text-center" style={{ fontStyle: 'italic', fontWeight: '500' }}>
                  השינוי האמיתי מתחיל מבפנים
                </h3>
                <p className="caption text-center">— חוכמה עתיקה</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="space-y-4">
              <h3 className="text-center">כרטיסי סטטיסטיקה</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { number: "1,234", label: "משתמשים" },
                  { number: "98%", label: "שביעות רצון" },
                  { number: "24/7", label: "זמינות" }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-[24px] p-8 text-center border-0 transition-all duration-500"
                    style={neumorphismStyles.card.secondary}
                    {...createHoverHandlers(
                      neumorphismStyles.card.secondary.boxShadow,
                      neumorphismStyles.card.secondary.hover
                    )}
                  >
                    <div style={{ fontSize: '56px', fontWeight: '300', color: '#5e4934', marginBottom: '12px', lineHeight: '1' }}>
                      {stat.number}
                    </div>
                    <p className="caption">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Buttons Section */}
        {activeSection === 'buttons' && (
          <div className="space-y-12">
            <h2 className="text-center mb-8">כפתורים Neumorphism</h2>

            {/* Primary Buttons */}
            <div className="space-y-6">
              <h3 className="text-center">כפתורים ראשיים</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <GlassButton>כפתור רגיל</GlassButton>
                <GlassButton>
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    <span>הורדה</span>
                  </div>
                </GlassButton>
                <GlassButton>
                  <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    <span>שיתוף</span>
                  </div>
                </GlassButton>
                <GlassButton disabled>מושבת</GlassButton>
              </div>
            </div>

            {/* Icon Buttons - Round */}
            <div className="space-y-6">
              <h3 className="text-center">כפתורי אייקון עגולים</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[Heart, Star, Bell, Settings, Search, Filter, Upload, Download].map((Icon, index) => (
                  <button
                    key={index}
                    className="w-14 h-14 rounded-full flex items-center justify-center border-0 transition-all duration-400"
                    style={neumorphismStyles.button.primary}
                    {...createPressHandlers(
                      neumorphismStyles.button.primary.boxShadow,
                      neumorphismStyles.button.primary.pressed,
                      neumorphismStyles.button.primary.hover
                    )}
                  >
                    <Icon className="w-6 h-6" style={{ color: '#87674F' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="space-y-6">
              <h3 className="text-center">כפתורי ניווט</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  className="flex items-center gap-2 rounded-full px-8 py-4 border-0 transition-all duration-400"
                  style={neumorphismStyles.button.primary}
                  {...createPressHandlers(
                    neumorphismStyles.button.primary.boxShadow,
                    neumorphismStyles.button.primary.pressed,
                    neumorphismStyles.button.primary.hover
                  )}
                >
                  <ChevronRight className="w-5 h-5" style={{ color: '#87674F' }} />
                  <span style={{ color: '#87674F', fontWeight: '600' }}>הבא</span>
                </button>
                <button
                  className="flex items-center gap-2 rounded-full px-8 py-4 border-0 transition-all duration-400"
                  style={neumorphismStyles.button.primary}
                  {...createPressHandlers(
                    neumorphismStyles.button.primary.boxShadow,
                    neumorphismStyles.button.primary.pressed,
                    neumorphismStyles.button.primary.hover
                  )}
                >
                  <span style={{ color: '#87674F', fontWeight: '600' }}>הקודם</span>
                  <ChevronLeft className="w-5 h-5" style={{ color: '#87674F' }} />
                </button>
                <button
                  className="flex items-center gap-2 rounded-full px-8 py-4 border-0 transition-all duration-400"
                  style={neumorphismStyles.button.primary}
                  {...createPressHandlers(
                    neumorphismStyles.button.primary.boxShadow,
                    neumorphismStyles.button.primary.pressed,
                    neumorphismStyles.button.primary.hover
                  )}
                >
                  <Home className="w-5 h-5" style={{ color: '#87674F' }} />
                  <span style={{ color: '#87674F', fontWeight: '600' }}>בית</span>
                </button>
              </div>
            </div>

            {/* Small Icon Buttons */}
            <div className="space-y-6">
              <h3 className="text-center">כפתורים קטנים</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[Plus, Minus, Check, X].map((Icon, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 rounded-full flex items-center justify-center border-0 transition-all duration-400"
                    style={neumorphismStyles.button.primary}
                    {...createPressHandlers(
                      neumorphismStyles.button.primary.boxShadow,
                      neumorphismStyles.button.primary.pressed,
                      neumorphismStyles.button.primary.hover
                    )}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#87674F' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Buttons */}
            <div className="space-y-6">
              <h3 className="text-center">כפתורי תגיות</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['נומרולוגיה', 'צמיחה אישית', 'מודעות', 'רוחניות', 'פנג שואי', 'אנרגיה'].map((tag, index) => (
                  <button
                    key={index}
                    className="rounded-full px-6 py-2.5 border-0 transition-all duration-400"
                    style={{
                      ...neumorphismStyles.button.primary,
                      fontSize: '14px'
                    }}
                    {...createPressHandlers(
                      neumorphismStyles.button.primary.boxShadow,
                      neumorphismStyles.button.primary.pressed,
                      neumorphismStyles.button.primary.hover
                    )}
                  >
                    <span style={{ color: '#87674F', fontWeight: '600' }}>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Inputs Section */}
        {activeSection === 'inputs' && (
          <div className="space-y-12">
            <h2 className="text-center mb-8">שדות קלט Neumorphism</h2>

            {/* Text Inputs */}
            <div className="space-y-6">
              <h3 className="text-center">שדות טקסט</h3>
              <div className="max-w-lg mx-auto space-y-4">
                <input
                  type="text"
                  placeholder="שם מלא"
                  className="w-full rounded-2xl px-5 py-4 text-center border-0 transition-all duration-300 focus:outline-none"
                  style={{
                    ...neumorphismStyles.input.default,
                    color: '#473b31'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.focus);
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.boxShadow);
                  }}
                />
                <input
                  type="email"
                  placeholder="דוא״ל"
                  className="w-full rounded-2xl px-5 py-4 text-center border-0 transition-all duration-300 focus:outline-none"
                  style={{
                    ...neumorphismStyles.input.default,
                    color: '#473b31'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.focus);
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.boxShadow);
                  }}
                />
                <input
                  type="tel"
                  placeholder="טלפון"
                  className="w-full rounded-2xl px-5 py-4 text-center border-0 transition-all duration-300 focus:outline-none"
                  style={{
                    ...neumorphismStyles.input.default,
                    color: '#473b31'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.focus);
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.boxShadow);
                  }}
                />
              </div>
            </div>

            {/* Textarea */}
            <div className="space-y-6">
              <h3 className="text-center">תיבת טקסט רב-שורתי</h3>
              <div className="max-w-lg mx-auto">
                <textarea
                  placeholder="הודעה..."
                  rows={6}
                  className="w-full rounded-2xl px-5 py-4 text-center border-0 transition-all duration-300 focus:outline-none resize-none"
                  style={{
                    ...neumorphismStyles.input.default,
                    color: '#473b31'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.focus);
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.boxShadow);
                  }}
                />
              </div>
            </div>

            {/* Date Inputs (LTR) */}
            <div className="space-y-6">
              <h3 className="text-center">שדות תאריך (DD/MM/YYYY)</h3>
              <div className="max-w-lg mx-auto flex gap-4" dir="ltr">
                <input
                  type="number"
                  placeholder="DD"
                  min="1"
                  max="31"
                  dir="ltr"
                  className="w-full rounded-2xl px-4 py-4 border-0 transition-all duration-300 focus:outline-none"
                  style={{
                    ...neumorphismStyles.input.default,
                    color: '#473b31',
                    direction: 'ltr',
                    textAlign: 'left'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.focus);
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.boxShadow);
                  }}
                />
                <input
                  type="number"
                  placeholder="MM"
                  min="1"
                  max="12"
                  dir="ltr"
                  className="w-full rounded-2xl px-4 py-4 border-0 transition-all duration-300 focus:outline-none"
                  style={{
                    ...neumorphismStyles.input.default,
                    color: '#473b31',
                    direction: 'ltr',
                    textAlign: 'left'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.focus);
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.boxShadow);
                  }}
                />
                <input
                  type="number"
                  placeholder="YYYY"
                  min="1900"
                  max="2100"
                  dir="ltr"
                  className="w-full rounded-2xl px-4 py-4 border-0 transition-all duration-300 focus:outline-none"
                  style={{
                    ...neumorphismStyles.input.default,
                    color: '#473b31',
                    direction: 'ltr',
                    textAlign: 'left'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.focus);
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.boxShadow);
                  }}
                />
              </div>
            </div>

            {/* Form Example */}
            <div className="space-y-6">
              <h3 className="text-center">טופס מלא</h3>
              <div 
                className="max-w-2xl mx-auto rounded-[32px] p-8 sm:p-10 border-0"
                style={neumorphismStyles.card.main}
              >
                <h4 className="mb-8 text-center">טופס יצירת קשר</h4>
                <div className="space-y-5">
                  <input
                    type="text"
                    placeholder="שם מלא"
                    className="w-full rounded-2xl px-5 py-4 text-center border-0 transition-all duration-300 focus:outline-none"
                    style={{
                      ...neumorphismStyles.input.default,
                      color: '#473b31'
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.focus);
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.boxShadow);
                    }}
                  />
                  <input
                    type="email"
                    placeholder="כתובת דוא״ל"
                    className="w-full rounded-2xl px-5 py-4 text-center border-0 transition-all duration-300 focus:outline-none"
                    style={{
                      ...neumorphismStyles.input.default,
                      color: '#473b31'
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.focus);
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.boxShadow);
                    }}
                  />
                  <textarea
                    placeholder="ההודעה שלך..."
                    rows={5}
                    className="w-full rounded-2xl px-5 py-4 text-center border-0 transition-all duration-300 focus:outline-none resize-none"
                    style={{
                      ...neumorphismStyles.input.default,
                      color: '#473b31'
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.focus);
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = getBoxShadow(neumorphismStyles.input.default.boxShadow);
                    }}
                  />
                  <div className="flex justify-center pt-4">
                    <GlassButton>
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        <span>שלח הודעה</span>
                      </div>
                    </GlassButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Icons Section */}
        {activeSection === 'icons' && (
          <div className="space-y-12">
            <h2 className="text-center mb-8">אייקונים במעגלי Neumorphism</h2>

            {/* Large Icons */}
            <div className="space-y-6">
              <h3 className="text-center">אייקונים גדולים</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {[Sparkles, Compass, Heart, Star, Moon, Sun, Lightbulb, BookOpen, Briefcase].map((Icon, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 rounded-full flex items-center justify-center border-0 transition-all duration-500"
                    style={neumorphismStyles.icon.default}
                    {...createHoverHandlers(
                      neumorphismStyles.icon.default.boxShadow,
                      neumorphismStyles.icon.default.hover
                    )}
                  >
                    <Icon className="w-12 h-12" style={{ color: '#87674F' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Medium Icons */}
            <div className="space-y-6">
              <h3 className="text-center">אייקונים בינוניים</h3>
              <div className="flex flex-wrap justify-center gap-5">
                {[Calendar, Clock, User, Mail, Phone, MapPin, Search, Filter, Settings].map((Icon, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 rounded-full flex items-center justify-center border-0 transition-all duration-500"
                    style={neumorphismStyles.icon.default}
                    {...createHoverHandlers(
                      neumorphismStyles.icon.default.boxShadow,
                      neumorphismStyles.icon.default.hover
                    )}
                  >
                    <Icon className="w-8 h-8" style={{ color: '#87674F' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Small Icons */}
            <div className="space-y-6">
              <h3 className="text-center">אייקונים קטנים</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[Plus, Minus, Check, X, ChevronRight, ChevronLeft, Upload, Download, Share2, Bell].map((Icon, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-full flex items-center justify-center border-0 transition-all duration-500"
                    style={neumorphismStyles.icon.default}
                    {...createHoverHandlers(
                      neumorphismStyles.icon.default.boxShadow,
                      neumorphismStyles.icon.default.hover
                    )}
                  >
                    <Icon className="w-6 h-6" style={{ color: '#87674F' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Icon Cards */}
            <div className="space-y-6">
              <h3 className="text-center">כרטיסים עם אייקונים</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  { icon: Sparkles, label: "השראה" },
                  { icon: Target, label: "מטרה" },
                  { icon: Heart, label: "אהבה" },
                  { icon: Star, label: "הצלחה" },
                  { icon: Zap, label: "אנרגיה" },
                  { icon: Award, label: "הישגים" },
                  { icon: Gift, label: "מתנות" },
                  { icon: Lightbulb, label: "רעיונות" }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-[20px] p-6 border-0 transition-all duration-500"
                    style={neumorphismStyles.card.secondary}
                    {...createHoverHandlers(
                      neumorphismStyles.card.secondary.boxShadow,
                      neumorphismStyles.card.secondary.hover
                    )}
                  >
                    <div className="flex justify-center mb-3">
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center border-0"
                        style={neumorphismStyles.icon.default}
                      >
                        <item.icon className="w-7 h-7" style={{ color: '#87674F' }} />
                      </div>
                    </div>
                    <p className="caption text-center">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Layouts Section */}
        {activeSection === 'layouts' && (
          <div className="space-y-12">
            <h2 className="text-center mb-8">לייאאוטים</h2>

            {/* 2 Column Layout */}
            <div className="space-y-6">
              <h3 className="text-center">לייאאוט 2 עמודות</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div 
                  className="rounded-[32px] p-8 border-0 transition-all duration-500"
                  style={neumorphismStyles.card.main}
                >
                  <div className="flex justify-center mb-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center border-0"
                      style={neumorphismStyles.icon.default}
                    >
                      <Sparkles className="w-8 h-8" style={{ color: '#87674F' }} />
                    </div>
                  </div>
                  <h4 className="mb-4 text-center">עמודה ראשונה</h4>
                  <p className="text-center">
                    תוכן מלא עם כל הפרטים הרלוונטיים. כרטיס זה מכיל מידע חשוב.
                  </p>
                </div>
                <div 
                  className="rounded-[32px] p-8 border-0 transition-all duration-500"
                  style={neumorphismStyles.card.main}
                >
                  <div className="flex justify-center mb-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center border-0"
                      style={neumorphismStyles.icon.default}
                    >
                      <Compass className="w-8 h-8" style={{ color: '#87674F' }} />
                    </div>
                  </div>
                  <h4 className="mb-4 text-center">עמודה שנייה</h4>
                  <p className="text-center">
                    תוכן נוסף ומשלים. שני הכרטיסים מאוזנים וסימטריים.
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Column Grid */}
            <div className="space-y-6">
              <h3 className="text-center">גריד 3 עמודות</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div
                    key={num}
                    className="rounded-[24px] p-6 border-0 transition-all duration-500"
                    style={neumorphismStyles.card.secondary}
                    {...createHoverHandlers(
                      neumorphismStyles.card.secondary.boxShadow,
                      neumorphismStyles.card.secondary.hover
                    )}
                  >
                    <div className="flex justify-center mb-4">
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center border-0"
                        style={neumorphismStyles.icon.default}
                      >
                        <span style={{ fontSize: '24px', fontWeight: '700', color: '#87674F' }}>
                          {num}
                        </span>
                      </div>
                    </div>
                    <h5 className="mb-2 text-center">כרטיס {num}</h5>
                    <p className="caption text-center">תיאור קצר</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Layout */}
            <div className="space-y-6">
              <h3 className="text-center">לייאאוט Hero</h3>
              <div 
                className="rounded-[40px] p-12 sm:p-16 border-0 transition-all duration-500"
                style={neumorphismStyles.card.main}
              >
                <div className="flex justify-center mb-8">
                  <div 
                    className="w-32 h-32 rounded-full flex items-center justify-center border-0"
                    style={neumorphismStyles.card.floating}
                  >
                    <Sparkles className="w-16 h-16" style={{ color: '#87674F' }} />
                  </div>
                </div>
                <h1 className="mb-6 text-center">
                  כותרת ראשית גדולה
                </h1>
                <h3 className="mb-8 text-center" style={{ fontWeight: '500', color: '#87674F' }}>
                  תת-כותרת מסבירה
                </h3>
                <p className="text-center mb-10 max-w-2xl mx-auto">
                  טקסט מלא המסביר את התוכן והערך המוצע. זהו מקום מושלם להציג את הפיצ&apos;רים העיקריים.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <GlassButton>פעולה ראשית</GlassButton>
                  <GlassButton>למד עוד</GlassButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typography Section */}
        {activeSection === 'typography' && (
          <div className="space-y-12">
            <h2 className="text-center mb-8">טיפוגרפיה</h2>

            {/* Headings */}
            <div 
              className="rounded-[32px] p-8 sm:p-10 border-0"
              style={neumorphismStyles.card.main}
            >
              <h3 className="mb-8 text-center">כותרות</h3>
              <div className="space-y-6">
                <div>
                  <p className="caption mb-2">H1 - Heading 1</p>
                  <h1>כותרת ראשית גדולה</h1>
                </div>
                <div>
                  <p className="caption mb-2">H2 - Heading 2</p>
                  <h2>כותרת משנה בולטת</h2>
                </div>
                <div>
                  <p className="caption mb-2">H3 - Heading 3</p>
                  <h3>כותרת משנית</h3>
                </div>
                <div>
                  <p className="caption mb-2">H4 - Heading 4</p>
                  <h4>כותרת קטנה</h4>
                </div>
                <div>
                  <p className="caption mb-2">H5 - Heading 5</p>
                  <h5>כותרת קטנה מאוד</h5>
                </div>
              </div>
            </div>

            {/* Body Text */}
            <div 
              className="rounded-[32px] p-8 sm:p-10 border-0"
              style={neumorphismStyles.card.main}
            >
              <h3 className="mb-8 text-center">טקסט גוף</h3>
              <div className="space-y-6">
                <div>
                  <p className="caption mb-2">Paragraph - רגיל</p>
                  <p>
                    זהו טקסט גוף רגיל. הוא משמש לתוכן עיקרי ומסבירים ארוכים. הפונט הוא Assistant והגודל מותאם לגודל המסך.
                  </p>
                </div>
                <div>
                  <p className="caption mb-2">Caption - מקרא</p>
                  <p className="caption">
                    זהו טקסט Caption - טקסט קטן יותר לתיאורים ומידע משני. משמש לתיאורים מתחת לאייקונים או כתגיות.
                  </p>
                </div>
              </div>
            </div>

            {/* Text Colors */}
            <div 
              className="rounded-[32px] p-8 sm:p-10 border-0"
              style={neumorphismStyles.card.main}
            >
              <h3 className="mb-8 text-center">צבעי טקסט</h3>
              <div className="space-y-4">
                <p style={{ color: '#5e4934' }}>
                  #5e4934 - Brown Heading - לכותרות H1
                </p>
                <p style={{ color: '#87674F' }}>
                  #87674F - Bronze - לכותרות H2-H4 ואייקונים
                </p>
                <p style={{ color: '#473b31' }}>
                  #473b31 - Brown Dark - טקסט ראשי
                </p>
                <p style={{ color: '#9f8572' }}>
                  #9f8572 - Neutral - Caption ותיאורים
                </p>
              </div>
            </div>

            {/* Text Examples */}
            <div 
              className="rounded-[32px] p-8 sm:p-10 border-0"
              style={neumorphismStyles.card.main}
            >
              <h3 className="mb-8 text-center">דוגמאות טקסט</h3>
              <div className="space-y-8">
                <div>
                  <h2 className="mb-4">גילוי עצמי והכרה</h2>
                  <p className="mb-4">
                    המסע לתוך עצמך הוא אחד מהמסעות החשובים והמשמעותיים ביותר שתחווה בחייך. 
                    דרך הכרה עמוקה של הדפוסים הפנימיים שלך, אתה פותח דלת לשינוי אמיתי ומתמשך.
                  </p>
                  <p className="caption">
                    המלצה: התחל במסע קטן כל יום
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactions Section */}
        {activeSection === 'interactions' && (
          <div className="space-y-12">
            <h2 className="text-center mb-8">אינטראקציות ואנימציות</h2>

            {/* Hover States */}
            <div className="space-y-6">
              <h3 className="text-center">מצבי Hover</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  className="rounded-[24px] p-8 border-0 transition-all duration-500"
                  style={neumorphismStyles.card.secondary}
                  {...createHoverHandlers(
                    neumorphismStyles.card.secondary.boxShadow,
                    neumorphismStyles.card.secondary.hover
                  )}
                >
                  <h5 className="mb-3 text-center">העבר עכבר</h5>
                  <p className="caption text-center">
                    הכרטיס מגיב להעברת עכבר עם אנימציה חלקה
                  </p>
                </div>
                <div
                  className="rounded-[24px] p-8 border-0 transition-all duration-500"
                  style={neumorphismStyles.card.secondary}
                  {...createHoverHandlers(
                    neumorphismStyles.card.secondary.boxShadow,
                    neumorphismStyles.card.secondary.hover
                  )}
                >
                  <h5 className="mb-3 text-center">שינוי צל</h5>
                  <p className="caption text-center">
                    הצללים משתנים ליצירת עומק נוסף
                  </p>
                </div>
                <div
                  className="rounded-[24px] p-8 border-0 transition-all duration-500"
                  style={neumorphismStyles.card.secondary}
                  {...createHoverHandlers(
                    neumorphismStyles.card.secondary.boxShadow,
                    neumorphismStyles.card.secondary.hover
                  )}
                >
                  <h5 className="mb-3 text-center">תנועה עדינה</h5>
                  <p className="caption text-center">
                    הכרטיס זז מעט למעלה (translateY)
                  </p>
                </div>
              </div>
            </div>

            {/* Press States */}
            <div className="space-y-6">
              <h3 className="text-center">מצבי לחיצה</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: Heart, label: "אהבה" },
                  { icon: Star, label: "הצלחה" },
                  { icon: Zap, label: "אנרגיה" },
                  { icon: Target, label: "מטרה" }
                ].map((item, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center gap-3 rounded-[20px] p-6 border-0 transition-all duration-400 min-w-[140px]"
                    style={neumorphismStyles.button.primary}
                    {...createPressHandlers(
                      neumorphismStyles.button.primary.boxShadow,
                      neumorphismStyles.button.primary.pressed,
                      neumorphismStyles.button.primary.hover
                    )}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center border-0"
                      style={neumorphismStyles.icon.default}
                    >
                      <item.icon className="w-6 h-6" style={{ color: '#87674F' }} />
                    </div>
                    <span style={{ color: '#87674F', fontWeight: '600', fontSize: '14px' }}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
              <p className="caption text-center">
                לחץ על הכפתורים לראות אפקט לחיצה (pressed/inset)
              </p>
            </div>

            {/* Transitions */}
            <div className="space-y-6">
              <h3 className="text-center">מהירויות מעבר</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div
                  className="rounded-[20px] p-6 border-0 text-center"
                  style={{
                    ...neumorphismStyles.card.secondary,
                    transition: 'all 0.3s ease'
                  }}
                  {...createHoverHandlers(
                    neumorphismStyles.card.secondary.boxShadow,
                    neumorphismStyles.card.secondary.hover
                  )}
                >
                  <h5 className="mb-2">מהיר</h5>
                  <p className="caption">300ms</p>
                </div>
                <div
                  className="rounded-[20px] p-6 border-0 text-center"
                  style={{
                    ...neumorphismStyles.card.secondary,
                    transition: 'all 0.5s ease'
                  }}
                  {...createHoverHandlers(
                    neumorphismStyles.card.secondary.boxShadow,
                    neumorphismStyles.card.secondary.hover
                  )}
                >
                  <h5 className="mb-2">רגיל</h5>
                  <p className="caption">500ms</p>
                </div>
                <div
                  className="rounded-[20px] p-6 border-0 text-center"
                  style={{
                    ...neumorphismStyles.card.secondary,
                    transition: 'all 0.7s ease'
                  }}
                  {...createHoverHandlers(
                    neumorphismStyles.card.secondary.boxShadow,
                    neumorphismStyles.card.secondary.hover
                  )}
                >
                  <h5 className="mb-2">איטי</h5>
                  <p className="caption">700ms</p>
                </div>
              </div>
            </div>

            {/* Complex Interactions */}
            <div className="space-y-6">
              <h3 className="text-center">אינטראקציות מורכבות</h3>
              <div 
                className="rounded-[32px] p-10 border-0"
                style={neumorphismStyles.card.main}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {[Sparkles, Heart, Star, Zap, Target, Award, Gift, Lightbulb].map((Icon, index) => (
                    <div
                      key={index}
                      className="w-full aspect-square rounded-[20px] flex items-center justify-center border-0 transition-all duration-500 cursor-pointer"
                      style={neumorphismStyles.icon.default}
                      {...createHoverHandlers(
                        neumorphismStyles.icon.default.boxShadow,
                        neumorphismStyles.icon.default.hover
                      )}
                      onClick={(e) => {
                        e.currentTarget.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                          e.currentTarget.style.transform = '';
                        }, 200);
                      }}
                    >
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#87674F' }} />
                    </div>
                  ))}
                </div>
                <p className="caption text-center">
                  העבר עכבר ולחץ על האייקונים לראות אפקטים משולבים
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}