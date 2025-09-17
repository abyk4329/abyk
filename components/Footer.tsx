"use client";

import { SocialRow } from "@/components/glass/SocialRow";

export default function Footer() {
  return (
    <footer className="bg-footer/90 border-t border-gold/25 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-4">
        {/* Desktop/Tablet: Social icons centered above */}
        <div className="hidden justify-center md:flex">
          <SocialRow size={40} />
        </div>

        {/* Bottom row: copyright + privacy */}
        <div className="mt-0 flex items-center justify-between md:mt-3">
          <div />
          <div className="text-sm text-text-secondary">
            Awakening by Ksenia © 2025
          </div>
          <a
            href="/privacy"
            className="text-sm text-text-secondary transition-colors hover:text-gold-deep"
          >
            תנאי שימוש ומדיניות פרטיות
          </a>
        </div>
      </div>
    </footer>
  );
}
