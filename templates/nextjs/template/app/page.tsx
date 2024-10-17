import type { Metadata } from 'next';
import { Display, Body } from '@sumup-oss/circuit-ui';
import { SumUpLogo } from '@sumup-oss/icons';

import { DocCard } from '../components/DocCard';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Welcome to Circuit UI + Next.js',
};

export default function Page() {
  return (
    <div className={styles.grid}>
      <main className={styles.main}>
        <Display as="h1" size="three">
          {metadata.title as string}
        </Display>

        <Body size="l" className={styles.intro}>
          Get started by editing <code>app/page.tsx</code>
        </Body>

        <div className={styles.cards}>
          <DocCard
            title="Next.js"
            description="Find in-depth information about Next.js features and API."
            href="https://nextjs.org/docs"
          />

          <DocCard
            title="Circuit UI"
            description="Discover SumUp's design system for the web."
            href="https://circuit.sumup.com"
          />

          <DocCard
            title="Foundry"
            description="Learn about SumUp's toolkit for building TypeScript applications."
            href="https://github.com/sumup-oss/foundry"
          />
        </div>
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
  );
}
