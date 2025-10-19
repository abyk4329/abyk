import type { ReactNode } from "react";

export default function FunnelsLayout({ children }: { children: ReactNode }) {
  return (
    <section
      className="min-h-[100dvh] w-full"
      data-route-group="funnels"
      data-theme-section="funnels"
    >
      {children}
    </section>
  );
}
