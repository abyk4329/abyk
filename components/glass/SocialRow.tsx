"use client";

import React from "react";
import { GlassIconLink } from "@/components/glass/GlassIconLink";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { EmailIcon } from "@/components/icons/EmailIcon";

interface SocialRowProps {
  size?: number;
  gap?: number;
  className?: string;
}

export function SocialRow({
  size = 40,
  gap = 12,
  className = "",
}: SocialRowProps) {
  return (
    <div className={`flex items-center justify-center`} style={{ gap }}>
      <GlassIconLink
        href="https://www.tiktok.com/@awakening.by.ksenia"
        label="TikTok"
        size={size}
      >
        <TikTokIcon size={Math.max(16, Math.floor(size * 0.45))} />
      </GlassIconLink>
      <GlassIconLink
        href="https://www.instagram.com/awakening.by.ksenia?igsh=MTZwOWljN2dsOXZzbQ%3D%3D&utm_source=qr"
        label="Instagram"
        size={size}
      >
        <InstagramIcon size={Math.max(16, Math.floor(size * 0.45))} />
      </GlassIconLink>
      <GlassIconLink
        href="https://wa.me/972524616121"
        label="WhatsApp"
        size={size}
      >
        <WhatsAppIcon size={Math.max(16, Math.floor(size * 0.45))} />
      </GlassIconLink>
      <GlassIconLink
        href="mailto:awakening.by.ksenia@gmail.com"
        label="Email"
        size={size}
      >
        <EmailIcon size={Math.max(16, Math.floor(size * 0.45))} />
      </GlassIconLink>
    </div>
  );
}
