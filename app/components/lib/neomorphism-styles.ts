'use client';

import type {
  CSSProperties,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  TouchEventHandler,
} from 'react';

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
  if (!value) return '';
  if (typeof value === 'string') return value;
  return Array.isArray(value) ? value.join(', ') : String(value);
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
      if (event.key === ' ' || event.key === 'Enter') {
        applyShadow(event.currentTarget, pressedShadow);
      }
    },
    onKeyUp: (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        applyShadow(event.currentTarget, baseShadow);
      }
    },
  };
};

const MAIN_CARD_SHADOW = [
  '22px 22px 52px color-mix(in srgb, var(--palette-shadow-warm-soft) 22%, transparent)',
  '-22px -22px 52px color-mix(in srgb, var(--palette-neutral-0) 94%, transparent)',
  'inset 2px 2px 6px color-mix(in srgb, var(--palette-neutral-0) 65%, transparent)',
  'inset -2px -2px 6px color-mix(in srgb, var(--palette-shadow-warm-soft) 28%, transparent)',
].join(', ');
const MAIN_CARD_HOVER = [
  '26px 26px 58px color-mix(in srgb, var(--palette-shadow-warm-soft) 26%, transparent)',
  '-26px -26px 58px color-mix(in srgb, var(--palette-neutral-0) 98%, transparent)',
  'inset 2px 2px 8px color-mix(in srgb, var(--palette-neutral-0) 70%, transparent)',
  'inset -2px -2px 8px color-mix(in srgb, var(--palette-warm-glow) 34%, transparent)',
].join(', ');

const SECONDARY_CARD_SHADOW = [
  '14px 14px 34px color-mix(in srgb, var(--palette-shadow-warm-soft) 18%, transparent)',
  '-14px -14px 34px color-mix(in srgb, var(--palette-neutral-0) 92%, transparent)',
  'inset 1px 1px 4px color-mix(in srgb, var(--palette-neutral-0) 55%, transparent)',
].join(', ');
const SECONDARY_CARD_HOVER = [
  '18px 18px 40px color-mix(in srgb, var(--palette-shadow-warm-soft) 22%, transparent)',
  '-18px -18px 40px color-mix(in srgb, var(--palette-neutral-0) 97%, transparent)',
  'inset 1px 1px 5px color-mix(in srgb, var(--palette-neutral-0) 62%, transparent)',
].join(', ');

const FLOATING_CARD_SHADOW = [
  '28px 28px 64px color-mix(in srgb, var(--palette-shadow-warm-soft) 24%, transparent)',
  '-28px -28px 64px color-mix(in srgb, var(--palette-neutral-0) 95%, transparent)',
  'inset 3px 3px 9px color-mix(in srgb, var(--palette-neutral-0) 60%, transparent)',
  'inset -3px -3px 9px color-mix(in srgb, var(--palette-warm-glow) 36%, transparent)',
].join(', ');
const FLOATING_CARD_HOVER = [
  '32px 32px 70px color-mix(in srgb, var(--palette-shadow-warm-soft) 28%, transparent)',
  '-32px -32px 70px color-mix(in srgb, var(--palette-neutral-0) 99%, transparent)',
  'inset 3px 3px 11px color-mix(in srgb, var(--palette-neutral-0) 68%, transparent)',
  'inset -3px -3px 11px color-mix(in srgb, var(--palette-warm-glow) 42%, transparent)',
].join(', ');

const BUTTON_PRIMARY_SHADOW = [
  '10px 10px 24px color-mix(in srgb, var(--palette-text-light-900) 22%, transparent)',
  '-8px -8px 20px color-mix(in srgb, var(--palette-neutral-0) 90%, transparent)',
  'inset 1px 1px 3px color-mix(in srgb, var(--palette-neutral-0) 40%, transparent)',
].join(', ');
const BUTTON_PRIMARY_PRESSED = [
  'inset 6px 6px 12px color-mix(in srgb, var(--palette-text-light-900) 28%, transparent)',
  'inset -3px -3px 8px color-mix(in srgb, var(--palette-neutral-0) 60%, transparent)',
].join(', ');

const ICON_DEFAULT_SHADOW = [
  '6px 6px 16px color-mix(in srgb, var(--palette-text-light-900) 20%, transparent)',
  '-6px -6px 16px color-mix(in srgb, var(--palette-neutral-0) 85%, transparent)',
  'inset 1px 1px 2px color-mix(in srgb, var(--palette-neutral-0) 50%, transparent)',
].join(', ');
const ICON_DEFAULT_HOVER = [
  '8px 8px 18px color-mix(in srgb, var(--palette-text-light-900) 26%, transparent)',
  '-8px -8px 18px color-mix(in srgb, var(--palette-neutral-0) 92%, transparent)',
  'inset 1px 1px 3px color-mix(in srgb, var(--palette-neutral-0) 60%, transparent)',
].join(', ');

const INPUT_DEFAULT_SHADOW = [
  '8px 8px 18px color-mix(in srgb, var(--palette-text-light-900) 18%, transparent)',
  '-8px -8px 18px color-mix(in srgb, var(--palette-neutral-0) 90%, transparent)',
  'inset 1px 1px 3px color-mix(in srgb, var(--palette-neutral-0) 50%, transparent)',
].join(', ');
const INPUT_DEFAULT_FOCUS = [
  'inset 4px 4px 8px color-mix(in srgb, var(--palette-text-light-900) 28%, transparent)',
  'inset -2px -2px 6px color-mix(in srgb, var(--palette-neutral-0) 70%, transparent)',
].join(', ');

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
      background: 'var(--neu-card)',
      boxShadow: MAIN_CARD_SHADOW,
      color: 'var(--palette-neu-ink-light)',
      hover: MAIN_CARD_HOVER,
    },
    secondary: {
      background: 'var(--neu-card)',
      boxShadow: SECONDARY_CARD_SHADOW,
      color: 'var(--palette-neu-ink-light)',
      hover: SECONDARY_CARD_HOVER,
    },
    floating: {
      background: 'var(--neu-card)',
      boxShadow: FLOATING_CARD_SHADOW,
      color: 'var(--palette-neu-ink-light)',
      hover: FLOATING_CARD_HOVER,
    },
  },
  button: {
    primary: {
      background: 'var(--neu-card)',
      boxShadow: BUTTON_PRIMARY_SHADOW,
      border:
        '1px solid color-mix(in srgb, var(--palette-neutral-0) 40%, transparent)',
      hover: MAIN_CARD_HOVER,
      pressed: BUTTON_PRIMARY_PRESSED,
    },
  },
  icon: {
    default: {
      background: 'var(--neu-card)',
      boxShadow: ICON_DEFAULT_SHADOW,
      border:
        '1px solid color-mix(in srgb, var(--palette-neutral-0) 45%, transparent)',
      hover: ICON_DEFAULT_HOVER,
    },
  },
  input: {
    default: {
      background: 'var(--neu-card)',
      boxShadow: INPUT_DEFAULT_SHADOW,
      border:
        '1px solid color-mix(in srgb, var(--palette-neutral-0) 50%, transparent)',
      color: 'var(--palette-neu-ink-light)',
      focus: INPUT_DEFAULT_FOCUS,
    },
  },
};
