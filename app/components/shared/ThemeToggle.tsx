"use client";

import { Moon, Lamp } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type ThemeMode = "light" | "dark";

function resolveInitialTheme(): ThemeMode {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return "light";
  }

  try {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch (error) {
    console.warn("Theme preference read failed", error);
  }

  const mediaQuery =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;
  const prefersDark = mediaQuery?.matches ?? false;
  return prefersDark ? "dark" : "light";
}

function applyTheme(mode: ThemeMode) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.setAttribute("data-theme", mode);
  root.classList.toggle("dark", mode === "dark");
  root.style.setProperty("color-scheme", mode);

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem("theme", mode);
    } catch (error) {
      console.warn("Theme preference persist failed", error);
    }
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const initial = resolveInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== "theme") {
        return;
      }

      const nextValue = event.newValue === "dark" ? "dark" : "light";
      setTheme(nextValue);
      applyTheme(nextValue);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <button className={styles.themeToggle} aria-label="טוען...">
        <div className={styles.iconContainer}>
          <Moon className={styles.icon} />
        </div>
      </button>
    );
  }

  const label = theme === "light" ? "מעבר למצב כהה" : "מעבר למצב בהיר";

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label={label}
      title={label}
      role="switch"
      aria-checked={theme === "dark"}
    >
      <div className={styles.iconContainer}>
        {theme === "light" ? (
          <Moon className={styles.icon} />
        ) : (
          <Lamp className={styles.icon} />
        )}
      </div>
    </button>
  );
}
