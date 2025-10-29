declare module '@react-pdf/renderer' {
  import type { ComponentType, ReactElement, ReactNode } from 'react';

  export interface DocumentProps {
    title?: string;
    children?: ReactNode;
  }
  export const Document: ComponentType<DocumentProps>;

  export interface PageProps {
    size?: string | number[];
    style?: any;
    children?: ReactNode;
  }
  export const Page: ComponentType<PageProps>;

  export interface ViewProps {
    style?: any;
    children?: ReactNode;
  }
  export const View: ComponentType<ViewProps>;

  export interface TextProps {
    style?: any;
    children?: ReactNode;
  }
  export const Text: ComponentType<TextProps>;

  export const StyleSheet: {
    create<T extends Record<string, any>>(styles: T): T;
  };

  export interface FontRegistrationOptions {
    family: string;
    fonts: Array<{
      src: string;
      fontWeight?: number | string;
      fontStyle?: string;
    }>;
  }

  export const Font: {
    register(options: FontRegistrationOptions): void;
  };

  export function renderToBuffer(element: ReactElement): Promise<Buffer>;
}
