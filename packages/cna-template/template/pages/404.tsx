import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { Card, Headline, Body, Button } from '@sumup/circuit-ui';

import { Main } from '../components/Main';
import { Logo } from '../components/Logo';

const title = 'Page not found';
const description =
  "The page you requested can't be found. What's worse, a hilarious 404 page can't be found either.";

const NotFound: NextPage = () => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Main>
      <Logo />
      <Card>
        <Headline as="h1" size="one">
          {title}
        </Headline>
        <Body>{description}</Body>
        <Link href="/" passHref>
          <Button variant="primary">Return to the homepage</Button>
        </Link>
      </Card>
    </Main>
  </>
);

export default NotFound;
