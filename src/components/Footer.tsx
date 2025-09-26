'use client';

import { Instagram, MessageCircle, Mail } from 'lucide-react';
import { paths } from '@/lib/urls';
import { TikTokIcon } from './TikTokIcon';

export function Footer() {
  return (
    <footer 
      role="contentinfo" 
      className="backdrop-blur-sm bg-[#FAFAFA] border-t border-[#FAFAFA]/40 shadow-sm font-['Assistant']"
    >
  <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col items-center space-y-5">
          
          {/* Policy Links - Top */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                window.location.href = paths.termsPrivacy();
              }}
              className="text-white font-normal hover:text-white/80 transition-colors duration-200 text-sm tracking-wide bg-transparent border-none cursor-pointer pt-[0px] pr-[0px] pb-[-25px] pl-[0px] mt-[0px] mr-[0px] mb-[-8px] ml-[0px]"
            >
              תנאי שימוש ומדיניות פרטיות
            </button>
          </div>

          {/* Social Links - Middle */}
          <div className="flex items-center justify-center gap-6 mt-[0px] mr-[0px] mb-[2px] ml-[0px]">
            
            {/* WhatsApp */}
            <a 
              href="https://wa.me/message/PUSKMULYLLD7F1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp - צור קשר עם Awakening by Ksenia"
              className="flex items-center gap-2 rounded-full bg-white/20 hover:bg-white/30 text-[#8B4513] hover:text-[#B8860B] transition-all duration-300 border border-white/30 hover:border-[#B8860B]/50 hover:scale-105 p-[6px]"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              <span className="hidden lg:inline font-light text-sm tracking-wide text-white">WhatsApp</span>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/awakening.by.ksenia?igsh=MTZwOWljN2dsOXZzbQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Instagram - Awakening by Ksenia"
              className="flex items-center gap-2 rounded-full bg-white/20 hover:bg-white/30 text-[#8B4513] hover:text-[#B8860B] transition-all duration-300 border border-white/30 hover:border-[#B8860B]/50 hover:scale-105 p-[6px]"
            >
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
              <span className="hidden lg:inline font-light text-sm tracking-wide text-white">Follow Instagram</span>
            </a>

            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@awakening.by.ksenia?_t=ZS-8zogEbGfH0i&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow TikTok - Awakening by Ksenia"
              className="flex items-center gap-2 rounded-full bg-white/20 hover:bg-white/30 text-[#8B4513] hover:text-[#B8860B] transition-all duration-300 border border-white/30 hover:border-[#B8860B]/50 hover:scale-105 p-[6px]"
            >
              <TikTokIcon className="w-5 h-5" strokeWidth={1.5} />
              <span className="hidden lg:inline font-light text-sm tracking-wide text-white">Follow TikTok</span>
            </a>

            {/* Email */}
            <a 
              href="mailto:awakening.by.ksenia@gmail.com"
              aria-label="Email - שלח הודעה ל Awakening by Ksenia"
              className="flex items-center gap-2 rounded-full bg-white/20 hover:bg-white/30 text-[#8B4513] hover:text-[#B8860B] transition-all duration-300 border border-white/30 hover:border-[#B8860B]/50 hover:scale-105 py-[8px] px-[6px] p-[6px]"
            >
              <Mail className="w-5 h-5" strokeWidth={1.5} />
              <span className="hidden lg:inline font-light text-sm tracking-wide text-white">Email</span>
            </a>

          </div>

          {/* Copyright - Bottom */}
          <div className="text-center pt-2">
            <p className="text-[rgba(254,254,254,1)] text-sm drop-shadow-md tracking-wide font-bold">
              Awakening by Ksenia © 2025
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}