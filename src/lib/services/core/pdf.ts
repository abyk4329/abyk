import { Font } from '@react-pdf/renderer';
import * as fs from 'fs';
import * as path from 'path';

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
    const fontDir = path.join(process.cwd(), 'public', 'fonts');

    // Read fonts as buffers to ensure they load properly
    const fonts = [
      { file: 'Assistant-ExtraLight.ttf', weight: 200 },
      { file: 'Assistant-Light.ttf', weight: 300 },
      { file: 'Assistant-Regular.ttf', weight: 400 },
      { file: 'Assistant-Medium.ttf', weight: 500 },
      { file: 'Assistant-SemiBold.ttf', weight: 600 },
      { file: 'Assistant-Bold.ttf', weight: 700 },
      { file: 'Assistant-ExtraBold.ttf', weight: 800 },
    ];

    Font.register({
      family: 'Assistant',
      fonts: fonts.map(({ file, weight }) => {
        const buffer = fs.readFileSync(path.join(fontDir, file));
        const base64 = buffer.toString('base64');
        return {
          src: `data:font/ttf;base64,${base64}`,
          fontWeight: weight,
        };
      }),
    });
  } catch (error) {
    console.warn(
      '[WealthCode] Failed to register Assistant font for PDF rendering:',
      error
    );
  }
}
