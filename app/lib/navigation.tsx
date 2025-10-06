"use client";

import { createContext, ReactNode, useContext } from "react";

export interface NavigationOverrides {
  isVisible?: boolean;
  canGoBack?: boolean;
  onGoBack?: () => void;
  canGoForward?: boolean;
  onGoForward?: () => void;
  onGoHome?: () => void;
  showHeader?: boolean;
  showFooter?: boolean;
}

const NavigationContext = createContext<NavigationOverrides | undefined>(undefined);

interface NavigationProviderProps {
  value: NavigationOverrides;
  children: ReactNode;
}

export function NavigationProvider({ value, children }: NavigationProviderProps) {
  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigationOverrides(): NavigationOverrides {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationOverrides must be used within a NavigationProvider");
  }

  return context;
}

export function useOptionalNavigationOverrides(): NavigationOverrides | undefined {
  return useContext(NavigationContext);
}
