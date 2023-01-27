import { NextPage } from 'next';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Card,
  Headline,
  Body,
  List,
  Anchor,
  cx,
  spacing,
  center,
} from '@sumup/circuit-ui';

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

const title = 'Welcome to SumUp Next.js';

const Page: NextPage = () => (
  <>
    <Meta title={title} path="/" />
    <Main>
      <Logo />
      <Card>
        <Headline as="h1" css={cx(center, spacing({ bottom: 'giga' }))}>
          {title}
        </Headline>
        <Body css={spacing({ bottom: 'giga' })}>
          This is a{' '}
          <Anchor href="https://nextjs.org" target="_blank">
            Next.js
          </Anchor>
          -based starter project featuring some{' '}
          <Anchor href="https://sumup.com" target="_blank">
            SumUp
          </Anchor>
          -specific customizations:
        </Body>
        <List css={spacing({ bottom: 'giga' })}>
          <li>
            <Anchor
              href="https://github.com/sumup-oss/circuit-ui"
              target="_blank"
            >
              Circuit UI
            </Anchor>{' '}
            integration
          </li>
          <li>
            <Anchor href="https://emotion.sh/" target="_blank">
              Emotion
            </Anchor>{' '}
            support
          </li>
          <li>
            SumUp&apos;s default tooling provided by{' '}
            <Anchor href="https://github.com/sumup-oss/foundry" target="_blank">
              Foundry
            </Anchor>
          </li>
          <li>Basic SEO and performance optimizations</li>
        </List>
        <Body css={cx(center, spacing({ bottom: 'giga' }))}>
          Now go and build things!
        </Body>
        <Body
          aria-hidden
          css={cx(
            css`
              transform: scale3d(1.5, 1.5, 1);
            `,
            center,
            spacing({ bottom: 'giga' }),
          )}
        >
          🔨👩🏽‍💻👨🏼‍💻🚀
        </Body>
      </Card>
    </Main>
  </>
);

export default Page;
