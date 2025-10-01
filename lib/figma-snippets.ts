/**
 * Figma Import Helper Snippets
 * Ready-to-use code snippets for common Figma import scenarios
 */

import { cn } from "./utils";

/**
 * Glass Card Variants
 */
export const glassCardClasses = {
  main: cn(
    "backdrop-blur-xl",
    "bg-white/15",
    "rounded-2xl",
    "p-6 sm:p-8",
    "shadow-[0_8px_32px_0_rgba(94,73,52,0.2),inset_0_1px_2px_0_rgba(255,255,255,0.5)]",
    "transition-all duration-300",
    "hover:shadow-[0_12px_40px_0_rgba(94,73,52,0.25)]"
  ),
  
  secondary: cn(
    "backdrop-blur-xl",
    "bg-white/10",
    "rounded-2xl",
    "p-4 sm:p-6",
    "shadow-[0_4px_24px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.4)]",
    "transition-all duration-300"
  ),
  
  minimal: cn(
    "backdrop-blur-md",
    "bg-white/5",
    "rounded-xl",
    "p-4",
    "shadow-[0_2px_16px_0_rgba(94,73,52,0.08)]"
  )
};

/**
 * Button Variants
 */
export const buttonClasses = {
  primary: cn(
    "px-6 py-3",
    "backdrop-blur-xl bg-white/20",
    "rounded-full",
    "transition-all duration-300",
    "shadow-[0_8px_32px_0_rgba(94,73,52,0.2),inset_0_2px_8px_0_rgba(255,255,255,0.3)]",
    "hover:bg-white/30 hover:scale-[1.03]",
    "active:scale-95",
    "disabled:opacity-60 disabled:cursor-not-allowed"
  ),
  
  secondary: cn(
    "px-6 py-3",
    "backdrop-blur-xl bg-white/15",
    "rounded-full",
    "transition-all duration-300",
    "shadow-[0_4px_16px_0_rgba(94,73,52,0.15)]",
    "hover:bg-white/25",
    "active:scale-95"
  ),
  
  icon: cn(
    "p-3",
    "backdrop-blur-xl bg-white/15",
    "rounded-full",
    "transition-all duration-300",
    "hover:bg-white/25 hover:scale-110",
    "active:scale-95"
  )
};

/**
 * Input Field Classes
 */
export const inputClasses = cn(
  "w-full px-4 py-3",
  "backdrop-blur-xl bg-white/15",
  "rounded-2xl",
  "text-center",
  "transition-all duration-300",
  "shadow-[0_4px_16px_0_rgba(94,73,52,0.1),inset_0_1px_2px_0_rgba(255,255,255,0.3)]",
  "focus:outline-none focus:ring-2 focus:ring-[#87674F]/30 focus:bg-white/25",
  "hover:bg-white/20"
);

/**
 * Background Image Container
 */
export const backgroundImageStyles = {
  container: cn(
    "relative min-h-screen",
    "pt-24 sm:pt-28 lg:pt-32",
    "pb-8",
    "fullscreen-bg"
  ),
  
  image: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  
  overlay: cn(
    "absolute inset-0 -z-10",
    "bg-gradient-to-b from-white/40 via-white/30 to-white/50"
  )
};

/**
 * Typography Classes
 */
export const typography = {
  heading1: "text-[30px] sm:text-[36px] lg:text-[48px] font-bold leading-[0.9] text-[#5e4934]",
  heading2: "text-[24px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[0.9] text-[#87674F]",
  heading3: "text-[22px] sm:text-[26px] lg:text-[32px] font-black leading-[0.9] text-[#87674F]",
  heading4: "text-[20px] sm:text-[24px] lg:text-[28px] font-black leading-[0.9] text-[#87674F]",
  heading5: "text-[18px] sm:text-[20px] lg:text-[24px] font-black leading-[0.9] text-[#9f8572]",
  body: "text-[16px] sm:text-[16px] lg:text-[18px] font-normal leading-[1.1] text-[#473B31]",
  caption: "text-[14px] sm:text-[16px] lg:text-[18px] font-medium leading-[1.1] tracking-[0.13em] text-[#9f8572]",
};

/**
 * Color Palette
 */
export const colors = {
  brownDark: '#473B31',
  brownHeading: '#5e4934',
  brownBronze: '#87674F',
  brownNeutral: '#9f8572',
  sandLight: '#d3c6bd',
  sandLighter: '#ddcec0',
  beigeLight: '#eae0d8',
  whiteCream: '#FDFCFB',
};

/**
 * Shadow Presets
 */
export const shadows = {
  glass: '0_8px_32px_0_rgba(94,73,52,0.2),inset_0_1px_2px_0_rgba(255,255,255,0.5)',
  glassHover: '0_12px_40px_0_rgba(94,73,52,0.25),inset_0_2px_4px_0_rgba(255,255,255,0.4)',
  soft: '0_4px_16px_0_rgba(94,73,52,0.1)',
  medium: '0_8px_24px_0_rgba(94,73,52,0.15)',
  strong: '0_12px_32px_0_rgba(94,73,52,0.2)',
};

/**
 * Safe Area Padding (for mobile)
 */
export const safeAreaPadding = {
  top: 'env(safe-area-inset-top)',
  right: 'env(safe-area-inset-right)',
  bottom: 'env(safe-area-inset-bottom)',
  left: 'env(safe-area-inset-left)',
};

/**
 * Common Animation Variants for Motion
 */
export const motionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
};

/**
 * Responsive Breakpoints
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};