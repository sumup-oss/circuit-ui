import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { css } from '@emotion/core';
import { Card, Heading, Text, Button } from '@sumup/circuit-ui';

import styled from '../utils/styled';
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

const centeredStyles = css`
  text-align: center;
`;

const title = 'Page not found';

const NotFound: NextPage = () => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Main>
      <Logo />
      <Card>
        <Heading size="tera" css={centeredStyles}>
          {title}
        </Heading>
        <Text>
          {`The page you requested can't be found. What’s worse, a hilarious 404 page can’t be found either.`}
        </Text>

        <Link href="/" passHref>
          <Button variant="primary">Return to the homepage</Button>
        </Link>
      </Card>
    </Main>
  </>
);

export default NotFound;
