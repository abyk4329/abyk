import { Instagram, Mail } from "lucide-react";

export function Footer() {
  // Removed scrollToTop functionality as it's not intuitive for RTL users

  const socialLinks = [
    {
      name: "Email",
      href: "mailto:awakening.by.ksenia@gmail.com",
      icon: <Mail className="w-4 h-4" />,
      label: "Email"
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/awakening.by.ksenia?igsh=MTZwOWljN2dsOXZzbQ%3D%3D&utm_source=qr",
      icon: <Instagram className="w-4 h-4" />,
      label: "Instagram"
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@awakening.by.ksenia?_t=ZS-90ANx67uJlg&_r=1",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      label: "TikTok"
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/972524616121",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
      label: "WhatsApp"
    }
  ];

  return (
    <footer className="relative backdrop-blur-xl bg-white/10 mt-3 sm:mt-8 lg:mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-8 sm:pb-10">
        
        {/* Legal Link */}
        <div className="text-center mb-3 sm:mb-8">
          <a 
            href="#/terms-privacy"
            className="
              inline-block
              px-3 py-1 sm:px-4 sm:py-1.5
              backdrop-blur-xl
              bg-white/15
              rounded-xl
              transition-all duration-300
              shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.3),0_2px_8px_0_rgba(94,73,52,0.08)]
              hover:bg-white/20
              hover:shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.4),0_4px_12px_0_rgba(94,73,52,0.12)]
              active:scale-95
              touch-manipulation
              footer-terms-text
            "
            style={{ 
              fontFamily: 'Assistant, sans-serif',
              fontWeight: '500',
              lineHeight: '1.1',
              letterSpacing: '0.08em',
              color: '#9f8572',
              textShadow: '0 1px 1px rgba(0, 0, 0, 0.05)'
            }}
          >
            תנאי שימוש ומדיניות פרטיות
          </a>
        </div>
        
        {/* Social Links - Minimalist Icons */}
        <div className="flex justify-center items-center gap-3 sm:gap-6 mb-3 sm:mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative
                p-2 sm:p-2.5
                backdrop-blur-xl
                bg-white/15
                rounded-full
                transition-all duration-300
                shadow-[0_4px_12px_0_rgba(135,103,79,0.15),inset_0_1px_2px_0_rgba(255,255,255,0.3)]
                hover:shadow-[0_6px_20px_0_rgba(135,103,79,0.25),inset_0_2px_4px_0_rgba(255,255,255,0.4)]
                hover:bg-white/25
                hover:scale-110
                active:scale-95
                touch-manipulation
              "
              aria-label={link.label}
            >
              <span 
                className="block transition-all duration-300 text-[#87674F] group-hover:text-[#5e4934]" 
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
              >
                {link.icon}
              </span>
            </a>
          ))}
        </div>
        
        {/* Copyright - English text with subtle styling */}
        <div className="text-center">
          <div className="
            inline-block
            px-3 py-1 sm:px-4 sm:py-1.5
            backdrop-blur-xl
            bg-white/15
            rounded-full
            shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.15),0_2px_8px_0_rgba(94,73,52,0.08)]
          ">
            <p 
              className="footer-copyright-text"
              style={{ 
                color: '#5e4934',
                fontWeight: '600',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              Awakening by Ksenia © 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}