"use client";

import { Menu } from "lucide-react";

import IconButton from "@/app/components/neu/IconButton";
import { useDrawer } from "@/app/components/layout";
import { ICON_STROKE } from "@/lib/constants";

export function MenuTrigger() {
  const { open, toggleDrawer } = useDrawer();

  const label = open ? "סגירת תפריט" : "פתיחת תפריט";

  return (
    <IconButton
      aria-label={label}
      title={label}
      aria-haspopup="dialog"
      aria-expanded={open ? "true" : "false"}
      onClick={toggleDrawer}
      size="md"
    >
      <Menu
        strokeWidth={ICON_STROKE.default}
        className="h-6 w-6"
        aria-hidden="true"
      />
    </IconButton>
  );
}
