import Head from 'next/head';
import Link from 'next/link';
import { Title, BodyLarge, Button } from '@sumup/circuit-ui';

import { RootLayout } from '../layouts/Root';

import styles from './error.module.css';

const title = 'Page not found';
const description = "We looked all over, but that page doesn't seem to exist.";

export default function NotFound() {
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
        <Link href="/" passHref>
          <Button variant="primary">Return to the homepage</Button>
        </Link>
      </RootLayout>
    </>
  );
}
