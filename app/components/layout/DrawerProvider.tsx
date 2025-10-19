"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface DrawerContextValue {
  open: boolean;
  railOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  openRail: () => void;
  closeRail: () => void;
  toggleRail: () => void;
}

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

interface DrawerProviderProps {
  children: ReactNode;
}

export function DrawerProvider({ children }: DrawerProviderProps) {
  const [open, setOpen] = useState(false);
  const [railOpen, setRailOpen] = useState(false);
  const pathname = usePathname();
  const previousPadding = useRef<string>("");

  const openDrawer = useCallback(() => {
    setRailOpen(false);
    setOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleDrawer = useCallback(() => {
    setRailOpen(false);
    setOpen((value) => !value);
  }, []);

  const openRail = useCallback(() => {
    setOpen(false);
    setRailOpen(true);
  }, []);

  const closeRail = useCallback(() => {
    setRailOpen(false);
  }, []);

  const toggleRail = useCallback(() => {
    setOpen(false);
    setRailOpen((value) => !value);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setRailOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!railOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setRailOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [railOpen]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const { body, documentElement } = document;
    const anyOpen = open || railOpen;

    if (anyOpen) {
      previousPadding.current = body.style.paddingRight;

      const scrollbarWidth = Math.max(
        window.innerWidth - documentElement.clientWidth,
        0
      );
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }

      documentElement.classList.add("drawer-locked");
      body.classList.add("drawer-locked");

      return () => {
        documentElement.classList.remove("drawer-locked");
        body.classList.remove("drawer-locked");
        body.style.paddingRight = previousPadding.current;
        previousPadding.current = "";
      };
    }

    documentElement.classList.remove("drawer-locked");
    body.classList.remove("drawer-locked");
    body.style.paddingRight = previousPadding.current;
    previousPadding.current = "";

    return undefined;
  }, [open, railOpen]);

  const value = useMemo(
    () => ({
      open,
      railOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      openRail,
      closeRail,
      toggleRail,
    }),
    [
      open,
      railOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      openRail,
      closeRail,
      toggleRail,
    ]
  );

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}

export function useDrawer(): DrawerContextValue {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
}
