"use client";

import { useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import { Instagram, Mail } from "lucide-react";

import { ICON_STROKE, SOCIAL } from "@/lib/constants";

import { IconButton } from "@/components/neu";
import { TikTokIcon, WhatsAppIcon } from "./SocialIcons";

type SocialButton = {
  icon: ReactNode;
  label: string;
  href: string;
};

export function SocialLinks() {
  const openInNewTab = useCallback((target: string) => {
    if (typeof window === "undefined") {
      return;
    }

    window.open(target, "_blank", "noopener,noreferrer");
  }, []);

  const socialButtons = useMemo<SocialButton[]>(
    () => [
      {
        icon: (
          <Mail
            strokeWidth={ICON_STROKE.default}
            className="h-6 w-6"
            style={{ color: "var(--neu-accent)" }}
            aria-hidden="true"
          />
        ),
        label: "Email",
        href: SOCIAL.email.url,
      },
      {
        icon: (
          <TikTokIcon
            className="h-7 w-7"
            style={{ color: "var(--neu-accent)" }}
            aria-hidden="true"
          />
        ),
        label: "TikTok",
        href: SOCIAL.tiktok.url,
      },
      {
        icon: (
          <Instagram
            strokeWidth={ICON_STROKE.default}
            className="h-6 w-6"
            style={{ color: "var(--neu-accent)" }}
            aria-hidden="true"
          />
        ),
        label: "Instagram",
        href: SOCIAL.instagram.url,
      },
      {
        icon: (
          <WhatsAppIcon
            className="h-6 w-6"
            style={{ color: "var(--neu-accent)" }}
            aria-hidden="true"
          />
        ),
        label: "WhatsApp",
        href: SOCIAL.whatsapp.url,
      },
    ],
    []
  );

  return (
    <div className="mx-0 mb-0 mt-20 flex justify-center gap-5">
      {socialButtons.map(({ icon, label, href }) => (
        <IconButton
          key={label}
          aria-label={label}
          onClick={() => openInNewTab(href)}
          size="lg"
        >
          {icon}
        </IconButton>
      ))}
    </div>
  );
}
