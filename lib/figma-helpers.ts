/**
 * Figma Import Helper Functions
 * Useful functions when working with Figma imports
 */

/**
 * Convert Figma color format to CSS
 * @example convertFigmaColor({ r: 0.5, g: 0.3, b: 0.2, a: 1 }) => "rgba(128, 77, 51, 1)"
 */
export function convertFigmaColor(color: { r: number; g: number; b: number; a?: number }): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a ?? 1;
  
  return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Generate safe area padding object
 * Use for components that need to respect device safe areas
 */
export function getSafeAreaPadding(sides: ('top' | 'right' | 'bottom' | 'left')[] = ['top', 'right', 'bottom', 'left']) {
  const padding: Record<string, string> = {};
  
  if (sides.includes('top')) padding.paddingTop = 'env(safe-area-inset-top)';
  if (sides.includes('right')) padding.paddingRight = 'env(safe-area-inset-right)';
  if (sides.includes('bottom')) padding.paddingBottom = 'env(safe-area-inset-bottom)';
  if (sides.includes('left')) padding.paddingLeft = 'env(safe-area-inset-left)';
  
  return padding;
}

/**
 * Check if device supports backdrop-filter
 */
export function supportsBackdropFilter(): boolean {
  if (typeof window === 'undefined') return false;
  
  return CSS.supports('backdrop-filter', 'blur(1px)') || 
         CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
}

/**
 * Get responsive image source
 * @example getResponsiveImage('hero', { mobile: 'jpg', desktop: 'webp' })
 */
export function getResponsiveImage(
  name: string, 
  formats: { mobile?: string; tablet?: string; desktop?: string } = {}
) {
  return {
    mobile: `/images/${name}-mobile.${formats.mobile || 'jpg'}`,
    tablet: `/images/${name}-tablet.${formats.tablet || 'jpg'}`,
    desktop: `/images/${name}-desktop.${formats.desktop || 'jpg'}`,
  };
}

/**
 * Generate Tailwind responsive class string
 * @example responsive({ base: 'text-sm', sm: 'text-base', lg: 'text-lg' })
 */
export function responsive(sizes: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string {
  const classes: string[] = [];
  
  if (sizes.base) classes.push(sizes.base);
  if (sizes.sm) classes.push(`sm:${sizes.sm}`);
  if (sizes.md) classes.push(`md:${sizes.md}`);
  if (sizes.lg) classes.push(`lg:${sizes.lg}`);
  if (sizes.xl) classes.push(`xl:${sizes.xl}`);
  if (sizes['2xl']) classes.push(`2xl:${sizes['2xl']}`);
  
  return classes.join(' ');
}

/**
 * Check if running on mobile device
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 640;
}

/**
 * Check if running on tablet device
 */
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 640 && window.innerWidth < 1024;
}

/**
 * Check if running on desktop device
 */
export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
}

/**
 * Get current breakpoint
 */
export function getCurrentBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
}

/**
 * Delay function (useful for animations)
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Scroll to element smoothly
 */
export function scrollToElement(elementId: string, offset: number = 0) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
}

/**
 * Download file from URL
 */
export function downloadFile(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Format number with Hebrew thousands separator
 */
export function formatNumberHebrew(num: number): string {
  return new Intl.NumberFormat('he-IL').format(num);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}