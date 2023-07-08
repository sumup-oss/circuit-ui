import { SumUpLogo } from '@sumup/icons';

import styles from './Logo.module.css';

export function Logo() {
  return (
    <a
      href="https://sumup.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open SumUp's homepage in a new tab"
    >
      <SumUpLogo className={styles.base} />
    </a>
  );
}
