"use client";

import { SocialRow } from "@/components/glass/SocialRow";
import { GlassIconLink } from "@/components/glass/GlassIconLink";
import { EmailIcon } from "@/components/icons/EmailIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export default function Footer() {
  return (
    <footer className="bg-footer fixed inset-x-0 bottom-0 z-30 backdrop-blur-md border-t border-white/30 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
      <div className="mx-auto max-w-6xl px-4 py-4 md:px-6 md:py-5">
        {/* Stack: Terms/Privacy (top) -> Socials (middle) -> Brand (bottom) */}
        <div className="flex flex-col items-center gap-3 md:gap-4">
          {/* Terms & Privacy */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <a
              href="/terms"
              className="rounded px-1.5 py-0.5 text-ms-0 md:text-ms-1 text-text-secondary underline-offset-4 transition-colors hover:text-gold-deep hover:underline"
              aria-label="תנאי שימוש"
            >
              תנאי שימוש
            </a>
            <span className="select-none text-text-secondary/40">|</span>
            <a
              href="/privacy"
              className="rounded px-1.5 py-0.5 text-ms-0 md:text-ms-1 text-text-secondary underline-offset-4 transition-colors hover:text-gold-deep hover:underline"
              aria-label="מדיניות פרטיות"
            >
              מדיניות פרטיות
            </a>
          </div>

          {/* Socials: md+ labeled row; mobile single row icons */}
          <div className="hidden md:flex">
            <SocialRow size={40} labeled />
          </div>
          <div className="md:hidden">
            <div className="flex items-center justify-center gap-3">
              <GlassIconLink
                href="mailto:awakening.by.ksenia@gmail.com"
                label="Email"
                size={36}
              >
                <EmailIcon size={18} />
              </GlassIconLink>
              <GlassIconLink
                href="https://www.tiktok.com/@awakening.by.ksenia"
                label="TikTok"
                size={36}
              >
                <TikTokIcon size={18} />
              </GlassIconLink>
              <GlassIconLink
                href="https://wa.me/972524616121"
                label="WhatsApp"
                size={36}
              >
                <WhatsAppIcon size={18} />
              </GlassIconLink>
              <GlassIconLink
                href="https://www.instagram.com/awakening.by.ksenia?igsh=MTZwOWljN2dsOXZzbQ%3D%3D&utm_source=qr"
                label="Instagram"
                size={36}
              >
                <InstagramIcon size={18} />
              </GlassIconLink>
            </div>
          </div>

          {/* Brand */}
          <div className="font-semibold tracking-[0.2em] text-text-secondary text-ms-0 md:text-ms-1">
            Awakening by Ksenia © 2025
          </div>
        </div>
      </div>
      {/* Safe area for iOS home indicator */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </footer>
  );
}
