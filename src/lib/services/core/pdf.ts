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
    // Use local Assistant font files that support Hebrew
    Font.register({
      family: 'Assistant',
      fonts: [
        {
          src: '/AssistantFont/static/Assistant-Regular.ttf',
          fontWeight: 400,
        },
        {
          src: '/AssistantFont/static/Assistant-Medium.ttf',
          fontWeight: 500,
        },
        {
          src: '/AssistantFont/static/Assistant-SemiBold.ttf',
          fontWeight: 600,
        },
        {
          src: '/AssistantFont/static/Assistant-Bold.ttf',
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
