import type { ReactNode } from 'react';
import { clsx } from '@sumup/circuit-ui';

import styles from './Main.module.css';

export interface MainProps {
  children: ReactNode;
  className?: string;
}

export function Main({ children, className }: MainProps) {
  return <main className={clsx(styles.base, className)}>{children}</main>;
}
