import Head from 'next/head';
import Link from 'next/link';
import { Title, BodyLarge, ButtonGroup } from '@sumup/circuit-ui';

import { RootLayout } from '../layouts/Root';

import styles from './error.module.css';

const title = "Couldn't complete your request";
const description =
  'Reload this page to try again. If you keep seeing this message, please contact our support team.';

export default function ServerError() {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <RootLayout>
        <Title as="h1" size="three">
          {title}
        </Title>
        <BodyLarge className={styles.description}>{description}</BodyLarge>
        <ButtonGroup
          actions={{
            primary: {
              onClick: () => window.location.reload(),
              children: 'Reload the page',
            },
            secondary: {
              href: '/',
              children: 'Go to the homepage',
              as: Link,
            },
          }}
        />
      </RootLayout>
    </>
  );
}
