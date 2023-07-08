import { NextPage } from 'next';
import { Card, Headline, Body, List, Anchor } from '@sumup/circuit-ui';

import { Meta } from '../components/Meta';
import { Main } from '../components/Main';
import { Logo } from '../components/Logo';

const title = 'Welcome to SumUp Next.js';

const Page: NextPage = () => (
  <>
    <Meta title={title} path="/" />
    <Main>
      <Logo />
      <Card>
        <Headline as="h1">{title}</Headline>
        <Body>
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
        <List>
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
            SumUp&apos;s default tooling provided by{' '}
            <Anchor href="https://github.com/sumup-oss/foundry" target="_blank">
              Foundry
            </Anchor>
          </li>
          <li>Basic SEO and performance optimizations</li>
        </List>
        <Body>Now go and build things!</Body>
        <Body aria-hidden>🔨👩🏽‍💻👨🏼‍💻🚀</Body>
      </Card>
    </Main>
  </>
);

export default Page;
