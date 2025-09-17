"use client";

import { GlassIconLink } from "@/components/glass/GlassIconLink";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { EmailIcon } from "@/components/icons/EmailIcon";

export default function Footer() {
  return (
    <footer className="border-t border-gold/25 bg-footer/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Social icons (glass) */}
        <div className="flex items-center gap-3">
          <GlassIconLink
            href="https://www.tiktok.com/@awakening.by.ksenia"
            label="TikTok"
            size={36}
          >
            <TikTokIcon size={18} />
          </GlassIconLink>
          <GlassIconLink
            href="https://www.instagram.com/awakening.by.ksenia?igsh=MTZwOWljN2dsOXZzbQ%3D%3D&utm_source=qr"
            label="Instagram"
            size={36}
          >
            <InstagramIcon size={18} />
          </GlassIconLink>
          <GlassIconLink
            href="https://wa.me/972524616121"
            label="WhatsApp"
            size={36}
          >
            <WhatsAppIcon size={18} />
          </GlassIconLink>
          <GlassIconLink
            href="mailto:awakening.by.ksenia@gmail.com"
            label="Email"
            size={36}
          >
            <EmailIcon size={18} />
          </GlassIconLink>
        </div>

        {/* Copyright */}
        <div className="text-sm text-text-secondary">
          Awakening by Ksenia © 2025
        </div>

        {/* Terms / Privacy */}
        <a
          href="/privacy"
          className="text-sm text-text-secondary transition-colors hover:text-gold-deep"
        >
          תנאי שימוש ומדיניות פרטיות
        </a>
      </div>
    </footer>
  );
}
