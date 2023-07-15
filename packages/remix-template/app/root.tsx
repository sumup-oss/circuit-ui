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
import { SumUpLogo } from '@sumup/icons';

import '@sumup/design-tokens/light.css';
import '@sumup/circuit-ui/styles.css';

import styles from './root.module.css';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
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
