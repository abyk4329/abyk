/**
 * Central export file for all utility functions and helpers
 */

// Core utilities
export { cn, formatDateHebrew, isValidHebrewDate } from './utils';

// Figma design tokens and classes
export {
  glassCardClasses,
  buttonClasses,
  inputClasses,
  backgroundImageStyles,
  typography,
  colors,
  shadows,
  safeAreaPadding,
  motionVariants,
  breakpoints,
} from './figma-snippets';

// Figma helper functions
export {
  convertFigmaColor,
  getSafeAreaPadding,
  supportsBackdropFilter,
  getResponsiveImage,
  responsive,
  isMobile,
  isTablet,
  isDesktop,
  getCurrentBreakpoint,
  delay,
  debounce,
  scrollToElement,
  copyToClipboard,
  downloadFile,
  formatNumberHebrew,
  truncate,
} from './figma-helpers';