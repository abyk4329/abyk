import { Instagram, MessageCircle, Mail } from 'lucide-react';
import { paths } from '@/lib/urls';
import { TikTokIcon } from './TikTokIcon';

interface FooterProps {
  onShowTerms?: () => void;
  onShowPrivacy?: () => void;
  onShowTermsAndPrivacy?: () => void;
}

export function Footer({ onShowTerms, onShowPrivacy, onShowTermsAndPrivacy }: FooterProps = {}) {
  return (
    <footer 
      role="contentinfo" 
      className="backdrop-blur-lg bg-white/15 border-t border-white/30 shadow-xl sm:backdrop-blur-md sm:bg-white/12 sm:border-white/25 font-['Assistant']"
    >
  <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col items-center space-y-5">
          
          {/* Policy Links - Top */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onShowTermsAndPrivacy) return onShowTermsAndPrivacy();
                // fallback: navigate via location
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
              className="flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-[rgba(135,103,79,1)] hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:scale-105 p-[6px]"
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
              className="flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-[rgba(135,103,79,1)] hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:scale-105 p-[6px]"
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
              className="flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-[rgba(135,103,79,1)] hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:scale-105 p-[6px]"
            >
              <TikTokIcon className="w-5 h-5" strokeWidth={1.5} />
              <span className="hidden lg:inline font-light text-sm tracking-wide text-white">Follow TikTok</span>
            </a>

            {/* Email */}
            <a 
              href="mailto:awakening.by.ksenia@gmail.com"
              aria-label="Email - שלח הודעה ל Awakening by Ksenia"
              className="flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-[rgba(135,103,79,1)] hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:scale-105 py-[8px] px-[6px] p-[6px]"
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