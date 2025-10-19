"use client";

import type {
  CSSProperties,
  FocusEventHandler,
  MouseEventHandler,
  TouchEventHandler,
  KeyboardEventHandler,
} from "react";

type InteractiveStyle = CSSProperties & {
  hover?: string;
  pressed?: string;
  focus?: string;
};

type HoverHandlers = {
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
  onTouchStart?: TouchEventHandler<HTMLElement>;
  onTouchEnd?: TouchEventHandler<HTMLElement>;
};

type PressHandlers = HoverHandlers & {
  onMouseDown?: MouseEventHandler<HTMLElement>;
  onMouseUp?: MouseEventHandler<HTMLElement>;
  onTouchCancel?: TouchEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  onKeyUp?: KeyboardEventHandler<HTMLElement>;
};

const applyShadow = (element: HTMLElement, value?: string) => {
  if (!value) {
    return;
  }

  element.style.boxShadow = value;
};

// Helper function to safely extract string box shadow
export const getBoxShadow = (value: string | string[] | undefined): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return Array.isArray(value) ? value.join(", ") : String(value);
};

export const createHoverHandlers = (
  baseShadow?: string,
  hoverShadow?: string
): HoverHandlers => {
  if (!baseShadow || !hoverShadow) {
    return {};
  }

  return {
    onMouseEnter: (event) => applyShadow(event.currentTarget, hoverShadow),
    onMouseLeave: (event) => applyShadow(event.currentTarget, baseShadow),
    onFocus: (event) => applyShadow(event.currentTarget, hoverShadow),
    onBlur: (event) => applyShadow(event.currentTarget, baseShadow),
    onTouchStart: (event) => applyShadow(event.currentTarget, hoverShadow),
    onTouchEnd: (event) => applyShadow(event.currentTarget, baseShadow),
  };
};

export const createPressHandlers = (
  baseShadow?: string,
  pressedShadow?: string,
  hoverShadow?: string
): PressHandlers => {
  if (!baseShadow || !pressedShadow) {
    return {};
  }

  const hoverHandlers = createHoverHandlers(
    baseShadow,
    hoverShadow ?? baseShadow
  );

  const handleMouseDown: MouseEventHandler<HTMLElement> = (event) => {
    applyShadow(event.currentTarget, pressedShadow);
  };

  const handleMouseUp: MouseEventHandler<HTMLElement> = (event) => {
    applyShadow(event.currentTarget, baseShadow);
  };

  const handleTouchStart: TouchEventHandler<HTMLElement> = (event) => {
    applyShadow(event.currentTarget, pressedShadow);
  };

  const handleTouchEnd: TouchEventHandler<HTMLElement> = (event) => {
    applyShadow(event.currentTarget, baseShadow);
  };

  return {
    ...hoverHandlers,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: (event) => applyShadow(event.currentTarget, baseShadow),
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd,
    onKeyDown: (event) => {
      if (event.key === " " || event.key === "Enter") {
        applyShadow(event.currentTarget, pressedShadow);
      }
    },
    onKeyUp: (event) => {
      if (event.key === " " || event.key === "Enter") {
        applyShadow(event.currentTarget, baseShadow);
      }
    },
  };
};

const MAIN_CARD_SHADOW =
  "22px 22px 52px rgba(159,133,114,0.22), -22px -22px 52px rgba(255,255,255,0.94), inset 2px 2px 6px rgba(255,255,255,0.65), inset -2px -2px 6px rgba(211,198,189,0.28)";
const MAIN_CARD_HOVER =
  "26px 26px 58px rgba(159,133,114,0.26), -26px -26px 58px rgba(255,255,255,0.98), inset 2px 2px 8px rgba(255,255,255,0.7), inset -2px -2px 8px rgba(211,198,189,0.34)";

const SECONDARY_CARD_SHADOW =
  "14px 14px 34px rgba(159,133,114,0.18), -14px -14px 34px rgba(255,255,255,0.92), inset 1px 1px 4px rgba(255,255,255,0.55)";
const SECONDARY_CARD_HOVER =
  "18px 18px 40px rgba(159,133,114,0.22), -18px -18px 40px rgba(255,255,255,0.97), inset 1px 1px 5px rgba(255,255,255,0.62)";

const FLOATING_CARD_SHADOW =
  "28px 28px 64px rgba(159,133,114,0.24), -28px -28px 64px rgba(255,255,255,0.95), inset 3px 3px 9px rgba(255,255,255,0.6), inset -3px -3px 9px rgba(211,198,189,0.36)";
const FLOATING_CARD_HOVER =
  "32px 32px 70px rgba(159,133,114,0.28), -32px -32px 70px rgba(255,255,255,0.99), inset 3px 3px 11px rgba(255,255,255,0.68), inset -3px -3px 11px rgba(211,198,189,0.42)";

const BUTTON_PRIMARY_SHADOW =
  "10px 10px 24px rgba(94,73,52,0.22), -8px -8px 20px rgba(255,255,255,0.9), inset 1px 1px 3px rgba(255,255,255,0.4)";
const BUTTON_PRIMARY_PRESSED =
  "inset 6px 6px 12px rgba(94,73,52,0.28), inset -3px -3px 8px rgba(255,255,255,0.6)";

const ICON_DEFAULT_SHADOW =
  "6px 6px 16px rgba(94,73,52,0.2), -6px -6px 16px rgba(255,255,255,0.85), inset 1px 1px 2px rgba(255,255,255,0.5)";
const ICON_DEFAULT_HOVER =
  "8px 8px 18px rgba(94,73,52,0.26), -8px -8px 18px rgba(255,255,255,0.92), inset 1px 1px 3px rgba(255,255,255,0.6)";

const INPUT_DEFAULT_SHADOW =
  "8px 8px 18px rgba(94,73,52,0.18), -8px -8px 18px rgba(255,255,255,0.9), inset 1px 1px 3px rgba(255,255,255,0.5)";
const INPUT_DEFAULT_FOCUS =
  "inset 4px 4px 8px rgba(94,73,52,0.28), inset -2px -2px 6px rgba(255,255,255,0.7)";

export const neumorphismStyles: {
  card: {
    main: InteractiveStyle;
    secondary: InteractiveStyle;
    floating: InteractiveStyle;
  };
  button: {
    primary: InteractiveStyle;
  };
  icon: {
    default: InteractiveStyle;
  };
  input: {
    default: InteractiveStyle;
  };
} = {
  card: {
    main: {
      background: "var(--neu-card)",
      boxShadow: MAIN_CARD_SHADOW,
      color: "#473b31",
      hover: MAIN_CARD_HOVER,
    },
    secondary: {
      background: "var(--neu-card)",
      boxShadow: SECONDARY_CARD_SHADOW,
      color: "#473b31",
      hover: SECONDARY_CARD_HOVER,
    },
    floating: {
      background: "var(--neu-card)",
      boxShadow: FLOATING_CARD_SHADOW,
      color: "#473b31",
      hover: FLOATING_CARD_HOVER,
    },
  },
  button: {
    primary: {
      background: "var(--neu-card)",
      boxShadow: BUTTON_PRIMARY_SHADOW,
      border: "1px solid rgba(255,255,255,0.4)",
      hover: MAIN_CARD_HOVER,
      pressed: BUTTON_PRIMARY_PRESSED,
    },
  },
  icon: {
    default: {
      background: "var(--neu-card)",
      boxShadow: ICON_DEFAULT_SHADOW,
      border: "1px solid rgba(255,255,255,0.45)",
      hover: ICON_DEFAULT_HOVER,
    },
  },
  input: {
    default: {
      background: "var(--neu-card)",
      boxShadow: INPUT_DEFAULT_SHADOW,
      border: "1px solid rgba(255,255,255,0.5)",
      color: "#473b31",
      focus: INPUT_DEFAULT_FOCUS,
    },
  },
};
