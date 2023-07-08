import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Card, Headline, Body, ButtonGroup } from '@sumup/circuit-ui';

import { Main } from '../components/Main';
import { Logo } from '../components/Logo';

interface ErrorPageProps {
  statusCode?: number;
}

const title = 'An error occurred';

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => (
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
        <Body>
          {statusCode
            ? `An error ${statusCode} occurred while loading the page.`
            : 'An error occurred while rendering the page.'}
        </Body>
        <ButtonGroup
          actions={{
            primary: {
              href: '/',
              children: 'Go to the homepage',
              as: Link,
            },
            secondary: {
              onClick: () => window.location.reload(),
              children: 'Reload the page',
            },
          }}
        />
      </Card>
    </Main>
  </>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode;
  return { statusCode };
};

export default ErrorPage;
