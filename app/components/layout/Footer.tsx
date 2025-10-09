"use client";

import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { ReactNode } from "react";

import { SOCIAL } from "@/lib/constants";

import styles from "./Footer.module.css";

interface FooterProps {
  children?: ReactNode;
}

export function Footer({ children }: FooterProps = {}) {
  const socialLinks = [
    {
      name: "WhatsApp",
      href: SOCIAL.whatsapp.url,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
      label: "WhatsApp"
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/awakening.by.ksenia/",
      icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Instagram"
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@awakening.by.ksenia",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      label: "TikTok"
    },
    {
      name: "Email",
      href: "mailto:awakening.by.ksenia@gmail.com",
      icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Email"
    }
  ];

  return (
    <footer className={["relative", styles.footer].join(" ")}>
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Navigation Buttons (if provided) */}
        {children}

        {/* Legal Link */}
        <div className="text-center mb-6 sm:mb-8">
          <Link
            href="/terms"
            className={[
              "inline-block px-4 py-2.5 sm:px-8 sm:py-3 rounded-2xl transition-all duration-400 active:scale-95 touch-manipulation border-0 footer-terms-text",
              styles.termsButton,
            ].join(" ")}
          >
            תנאי שימוש ומדיניות פרטיות
          </Link>
        </div>
        
        {/* Social Links - 3D Neumorphism Buttons */}
        <div className="flex justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "group relative p-3 sm:p-4 rounded-full transition-all duration-400 touch-manipulation border-0",
                styles.socialButton,
              ].join(" ")}
              aria-label={link.label}
            >
              <span 
                className={["block transition-all duration-300", styles.socialIcon].join(" ")}
              >
                {link.icon}
              </span>
            </a>
          ))}
        </div>
        
        {/* Copyright - English text with inset styling */}
        <div className="text-center">
          <div 
            className={["inline-block px-3 py-2 sm:px-8 sm:py-2.5 rounded-full border-0", styles.copyrightShell].join(" ")}
          >
            <p 
              className={["footer-copyright-text", styles.copyrightText].join(" ")}
            >
              Awakening by Ksenia © 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
