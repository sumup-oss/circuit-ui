import React from 'react';
import { NextPage } from 'next';
import { css } from '@emotion/core';
import { Card, Heading, Text, List, Anchor } from '@sumup/circuit-ui';

import styled from '../utils/styled';
import { Meta } from '../components/Meta';
import { Logo } from '../components/Logo';

const Main = styled('main')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 450px;
    margin: 0 auto ${theme.spacings.mega};
  `,
);

const centeredStyles = css`
  text-align: center;
`;

const title = 'Welcome to SumUp Next.js';

const Page: NextPage = () => (
  <>
    <Meta title={title} path="/" />
    <Main>
      <Logo />
      <Card>
        <Heading size="tera" as="h1" css={centeredStyles}>
          {title}
        </Heading>
        <Text>
          This is a{' '}
          <Anchor href="https://nextjs.org" target="_blank" noMargin>
            Next.js
          </Anchor>
          -based starter project featuring some{' '}
          <Anchor href="https://sumup.com" target="_blank" noMargin>
            SumUp
          </Anchor>
          -specific customizations:
        </Text>

        <List size="mega">
          <li>
            <Anchor
              href="https://github.com/sumup-oss/circuit-ui"
              target="_blank"
              noMargin
            >
              Circuit UI
            </Anchor>{' '}
            integration
          </li>
          <li>
            <Anchor href="https://emotion.sh/" target="_blank" noMargin>
              Emotion
            </Anchor>{' '}
            support (incl. babel plugin)
          </li>
          <li>
            <Anchor href="https://lodash.com/" target="_blank" noMargin>
              Lodash
            </Anchor>{' '}
            support (incl. babel plugin)
          </li>
          <li>
            {`SumUp's default tooling provided by `}
            <Anchor
              href="https://github.com/sumup-oss/foundry"
              target="_blank"
              noMargin
            >
              Foundry
            </Anchor>
          </li>
          <li>Basic SEO and performance optimizations</li>
        </List>

        <Text size="giga" css={centeredStyles}>
          Now go and build things!
          <br />
        </Text>
        <Text
          size="giga"
          css={css`
            ${centeredStyles};
            transform: scale3d(1.5, 1.5, 1);
          `}
        >
          <span role="img" aria-label="Emojis for building things">
            🔨👩🏽‍💻👨🏼‍💻🚀
          </span>
        </Text>
      </Card>
    </Main>
  </>
);

export default Page;
