import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import '@sumup-oss/design-tokens/light.css';
import '@sumup-oss/circuit-ui/styles.css';

const inter = Inter({
  subsets: ['latin'],
  // FIXME: Re-enable once https://github.com/vercel/next.js/issues/68395 has been resolved
  // axes: ['ital'],
  variable: '--cui-font-stack-default',
  display: 'swap',
  preload: true,
});

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
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
