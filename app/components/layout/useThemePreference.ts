"use client";

import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

interface ThemePreferenceState {
  mode: ThemeMode;
  hasManualPreference: boolean;
}

function readThemePreference(): ThemePreferenceState {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { mode: "light", hasManualPreference: false };
  }

  try {
    const stored = window.localStorage.getItem("theme") as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      return { mode: stored, hasManualPreference: true };
    }
  } catch (error) {
    console.warn("Unable to read saved theme preference", error);
  }

  const mediaQuery =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;
  const prefersDark = mediaQuery?.matches ?? false;
  const hasDarkClass = document.documentElement.classList.contains("dark");

  if (hasDarkClass || prefersDark) {
    return { mode: "dark", hasManualPreference: false };
  }

  return { mode: "light", hasManualPreference: false };
}

function applyTheme(mode: ThemeMode, persist: boolean) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
  root.setAttribute("data-theme", mode);
  root.style.setProperty("color-scheme", mode);

  if (persist && typeof window !== "undefined") {
    try {
      window.localStorage.setItem("theme", mode);
    } catch (error) {
      console.warn("Unable to persist theme preference", error);
    }
  }
}

export function useThemePreference() {
  const [state, setState] = useState<ThemePreferenceState>({
    mode: "light",
    hasManualPreference: false,
  });

  useEffect(() => {
    const preference = readThemePreference();
    setState((prev) => {
      if (
        prev.mode === preference.mode &&
        prev.hasManualPreference === preference.hasManualPreference
      ) {
        return prev;
      }

      return preference;
    });
  }, []);

  useEffect(() => {
    applyTheme(state.mode, state.hasManualPreference);
  }, [state.mode, state.hasManualPreference]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== "theme") {
        return;
      }

      const nextMode: ThemeMode = event.newValue === "dark" ? "dark" : "light";
      const hasManual = event.newValue === "dark" || event.newValue === "light";

      setState({ mode: nextMode, hasManualPreference: hasManual });
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => {
    setState({ mode, hasManualPreference: true });
  }, []);

  const toggleTheme = useCallback(() => {
    setState((prev) => {
      const nextMode: ThemeMode = prev.mode === "dark" ? "light" : "dark";
      return { mode: nextMode, hasManualPreference: true };
    });
  }, []);

  return {
    mode: state.mode,
    toggleTheme,
    setTheme,
  };
}
