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
    // Use full URLs to font files hosted on the site
    const baseUrl = 'https://abyk.online';

    Font.register({
      family: 'Assistant',
      fonts: [
        {
          src: `${baseUrl}/fonts/Assistant-Regular.ttf`,
          fontWeight: 400,
        },
        {
          src: `${baseUrl}/fonts/Assistant-Medium.ttf`,
          fontWeight: 500,
        },
        {
          src: `${baseUrl}/fonts/Assistant-SemiBold.ttf`,
          fontWeight: 600,
        },
        {
          src: `${baseUrl}/fonts/Assistant-Bold.ttf`,
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
