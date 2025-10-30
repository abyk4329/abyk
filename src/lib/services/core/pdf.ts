import { Font } from '@react-pdf/renderer';

export const PDF_COLORS = {
  bg: '#f6f1eb',
  text: '#3d3229',
  divider: '#e2d6c6',
  accentLight: '#a88652',
} as const;

let fontsRegistered = false;

export function registerHebrewFonts(): void {
  if (fontsRegistered) {
    return;
  }

  fontsRegistered = true;

  try {
    // Use standard fonts that work in serverless environments
    // Assistant font has issues with react-pdf in Vercel, using Arial Hebrew instead
    Font.register({
      family: 'Assistant',
      fonts: [
        {
          src: 'https://fonts.gstatic.com/s/assistant/v18/2tsd397wLxj96qwHyNIkxFYJZJg.ttf',
          fontWeight: 400,
        },
        {
          src: 'https://fonts.gstatic.com/s/assistant/v18/2tsd397wLxj96qwHyNIkxFYJZJg.ttf',
          fontWeight: 500,
        },
        {
          src: 'https://fonts.gstatic.com/s/assistant/v18/2tsd397wLxj96qwHyNIkxFYJZJg.ttf',
          fontWeight: 600,
        },
        {
          src: 'https://fonts.gstatic.com/s/assistant/v18/2tsd397wLxj96qwHyNIkxFYJZJg.ttf',
          fontWeight: 700,
        },
      ],
    });
  } catch (error) {
    console.warn(
      '[WealthCode] Failed to register Assistant font for PDF rendering:',
      error
    );
  }
}
