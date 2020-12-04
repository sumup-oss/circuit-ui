import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { css } from '@emotion/core';
import { Card, Heading, Text, ButtonGroup, Button } from '@sumup/circuit-ui';

import styled from '../utils/styled';
import { Logo } from '../components/Logo';

interface ErrorPageProps {
  statusCode?: number;
}

const Container = styled('section')(
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

const title = 'An error occurred';

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Container>
      <a href="https://sumup.com" target="_blank" rel="noopener noreferrer">
        <Logo />
      </a>
      <Card>
        <Heading size="tera" css={centeredStyles}>
          {title}
        </Heading>
        <Text>
          {statusCode
            ? `An error ${statusCode} occurred while loading the page.`
            : 'An error occurred while rendering the page.'}
        </Text>

        <ButtonGroup>
          <Button onClick={() => window.location.reload()}>
            Reload the page
          </Button>
          <Link href="/" passHref>
            <Button variant="primary">Go to the homepage</Button>
          </Link>
        </ButtonGroup>
      </Card>
    </Container>
  </>
);

// eslint-disable-next-line @typescript-eslint/unbound-method
ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode;
  return { statusCode };
};

export default ErrorPage;
