import { Title, BodyLarge } from '@sumup/circuit-ui';

import { RootLayout } from '../layouts/Root';
import { Meta } from '../components/Meta';
import { DocCard } from '../components/DocCard';

import styles from './index.module.css';

const title = 'Welcome to Circuit UI + Next.js';

export default function Page() {
  return (
    <>
      <Meta title={title} path="/" />
      <RootLayout>
        <Title as="h1" size="three">
          {title}
        </Title>

        <BodyLarge className={styles.intro}>
          Get started by editing <code>pages/index.tsx</code>
        </BodyLarge>

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
      </RootLayout>
    </>
  );
}
