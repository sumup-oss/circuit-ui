import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Card,
  Headline,
  Body,
  Button,
  spacing,
  cx,
  center,
} from '@sumup/circuit-ui';

import { Logo } from '../components/Logo';

const Main = styled('main')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 450px;
    margin: 0 auto ${theme.spacings.kilo};
  `,
);

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
        <Headline
          as="h1"
          size="one"
          css={cx(center, spacing({ bottom: 'giga' }))}
        >
          {title}
        </Headline>
        <Body css={spacing({ bottom: 'giga' })}>{description}</Body>
        <Link href="/" passHref>
          <Button variant="primary">Return to the homepage</Button>
        </Link>
      </Card>
    </Main>
  </>
);

export default NotFound;
