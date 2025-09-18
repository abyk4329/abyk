"use client";

import { useEffect, useState } from "react";

type ThemeKey = "gold" | "rose" | "sand";
type ScaleKey = "tight" | "classic" | "silver" | "golden";
type SpaceKey = "compact" | "comfortable" | "airy";

const THEME_KEY = "abyk_theme";
const SCALE_KEY = "abyk_scale";
const SPACE_KEY = "abyk_space";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeKey>("gold");
  const [scale, setScale] = useState<ScaleKey>("classic");
  const [space, setSpace] = useState<SpaceKey>("comfortable");

  // Load persisted preferences
  useEffect(() => {
    try {
      const t = (localStorage.getItem(THEME_KEY) as ThemeKey) || theme;
      const s = (localStorage.getItem(SCALE_KEY) as ScaleKey) || scale;
      const p = (localStorage.getItem(SPACE_KEY) as SpaceKey) || space;
      setTheme(t);
      setScale(s);
      setSpace(p);
      apply(t, s, p);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function apply(t: ThemeKey, s: ScaleKey, p: SpaceKey) {
    const html = document.documentElement;
    html.setAttribute("data-theme", t);
    html.setAttribute("data-scale", s);
    html.setAttribute("data-space", p);
  }

  function update<K extends "theme" | "scale" | "space">(key: K, value: any) {
    if (key === "theme") {
      setTheme(value);
      localStorage.setItem(THEME_KEY, value);
      apply(value, scale, space);
    } else if (key === "scale") {
      setScale(value);
      localStorage.setItem(SCALE_KEY, value);
      apply(theme, value, space);
    } else {
      setSpace(value);
      localStorage.setItem(SPACE_KEY, value);
      apply(theme, scale, value);
    }
  }

  return (
    <div className="fixed bottom-20 left-3 z-40 select-none">
      <div className="rounded-xl border border-white/30 bg-footer/90 backdrop-blur-md p-3 shadow-xl">
        <div className="mb-2 text-ms--1 font-semibold tracking-widest text-espresso/80">
          Theme
        </div>
        <div className="mb-3 flex gap-2">
          {(["gold", "rose", "sand"] as ThemeKey[]).map((k) => (
            <button
              key={k}
              onClick={() => update("theme", k)}
              className={`rounded-md px-2 py-1 text-ms--1 ${
                theme === k
                  ? "bg-gold text-ivory"
                  : "bg-transparent border border-white/20 text-espresso/80"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="mb-2 text-ms--1 font-semibold tracking-widest text-espresso/80">
          Type Scale
        </div>
        <div className="mb-3 grid grid-cols-2 gap-2">
          {(["tight", "classic", "silver", "golden"] as ScaleKey[]).map((k) => (
            <button
              key={k}
              onClick={() => update("scale", k)}
              className={`rounded-md px-2 py-1 text-ms--1 ${
                scale === k
                  ? "bg-gold text-ivory"
                  : "bg-transparent border border-white/20 text-espresso/80"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="mb-2 text-ms--1 font-semibold tracking-widest text-espresso/80">
          Spacing
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(["compact", "comfortable", "airy"] as SpaceKey[]).map((k) => (
            <button
              key={k}
              onClick={() => update("space", k)}
              className={`rounded-md px-2 py-1 text-ms--1 ${
                space === k
                  ? "bg-gold text-ivory"
                  : "bg-transparent border border-white/20 text-espresso/80"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
