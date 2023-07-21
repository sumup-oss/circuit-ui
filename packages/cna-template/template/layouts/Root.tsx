import type { ReactNode } from 'react';
import { SumUpLogo } from '@sumup/icons';

import styles from './Root.module.css';

export interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className={styles.base}>
      <main className={styles.main}>{children}</main>
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
  );
}
