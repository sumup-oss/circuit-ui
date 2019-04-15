import React, { Fragment } from 'react';
import Head from 'next/head';
import { Card, Heading, List, Text } from '@sumup/circuit-ui';

import Container from '../components/Container';
import Logo from '../components/Logo';
import Anchor from '../components/Anchor/Anchor';

const title = 'Welcome to SumUp Next.js';

const Page = () => (
  <Fragment>
    <Head>
      <title>{title}</title>
    </Head>
    <Container>
      <Logo />
      <Card>
        <Heading size={Heading.KILO}>{title}</Heading>
        <Text>
          This is a{' '}
          <Anchor href="https://github.com/zeit/next.js">Next.js</Anchor>-based
          project featuring some SumUp-specific customizations:
        </Text>
        <List size={List.MEGA}>
          <li>Circuit UI integration</li>
          <li>Emotion support (incl. babel plugin)</li>
          <li>Lodash support (incl. babel plugin)</li>
          <li>
            SumUp ESLint and Prettier configuration provided by{' '}
            <Anchor href="https://github.com/sumup/foundry">Foundry</Anchor>
          </li>
        </List>
        <Text size={Text.GIGA} style={{ textAlign: 'center' }}>
          Now go and build things!
          <br />
        </Text>
        <Text
          size={Text.GIGA}
          style={{ textAlign: 'center', transform: 'scale3d(1.5, 1.5, 1)' }}
        >
          <span role="img" aria-label="Emojis for building things">
            🔨👩🏽‍💻👨🏼‍💻🚀
          </span>
        </Text>
      </Card>
    </Container>
  </Fragment>
);

export default Page;
