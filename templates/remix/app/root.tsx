import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { SumUpLogo } from '@sumup-oss/icons';

import '@sumup-oss/design-tokens/fonts.css';
import '@sumup-oss/design-tokens/light.css';
import '@sumup-oss/circuit-ui/styles.css';

import styles from './root.module.css';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />

        {/* Font performance optimization */}
        <link
          rel="preload"
          href="https://static.sumup.com/fonts/Inter/Inter-normal-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />

        {/* Browser icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://static.sumup.com/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://static.sumup.com/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://static.sumup.com/favicons/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="https://static.sumup.com/favicons/site.webmanifest"
        />
        <link
          rel="mask-icon"
          href="https://static.sumup.com/favicons/safari-pinned-tab.svg"
          color="#ffffff"
        />
        <link
          rel="shortcut icon"
          href="https://static.sumup.com/favicons/favicon.ico"
        />
        <meta
          name="msapplication-config"
          content="https://static.sumup.com/favicons/browserconfig.xml"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        <Meta />
        <Links />
      </head>
      <body>
        <div className={styles.base}>
          <main className={styles.main}>
            <Outlet />
          </main>
          <footer className={styles.footer}>
            <a
              href="https://sumup.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open SumUp's homepage in a new tab"
            >
              <SumUpLogo className={styles.logo} />
            </a>
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
