import type { Metadata, Viewport } from 'next';

import '@sumup-oss/design-tokens/fonts.css';
import '@sumup-oss/design-tokens/light.css';
import '@sumup-oss/circuit-ui/styles.css';

import { PreloadResources } from './preload-resources';

export const metadata: Metadata = {
  title: {
    template: '%s | SumUp',
    default: 'SumUp',
  },
  icons: {
    icon: 'https://static.sumup.com/favicons/favicon-32x32.png',
    shortcut: 'https://static.sumup.com/favicons/favicon.ico',
    apple: 'https://static.sumup.com/favicons/apple-touch-icon.png',
  },
  manifest: 'https://static.sumup.com/favicons/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PreloadResources />
      <body>{children}</body>
    </html>
  );
}
