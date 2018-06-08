import React from 'react';
import { hydrate, css } from 'react-emotion';
import Link from 'next/link';
import { Card, Heading, List, Text } from '@sumup/circuit-ui';
import { standard } from '@sumup/circuit-ui/themes';
import { globalStyles } from '@sumup/circuit-ui/styles';
import { ThemeProvider } from 'emotion-theming';

import Container from '../components/Container';
import Logo from '../components/Logo';

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-underscore-dangle
  hydrate(window.__NEXT_DATA__.ids);
}

const customGlobalStyles = css`
  body {
    background-color: ${standard.colors.n100};
  }
`;

globalStyles({ theme: standard, custom: customGlobalStyles });

const Page = () => (
  <ThemeProvider theme={standard}>
    <Container>
      <Logo />
      <Card>
        <Heading size={Heading.KILO}>Welcome to SumUp Next.js</Heading>
        <Text>
          This is a{' '}
          <Link href="https://github.com/zeit/next.js">
            <a>Next.js</a>
          </Link>-based project featuring some SumUp-specific customizations:
        </Text>
        <List size={List.MEGA}>
          <li>Circuit UI integration</li>
          <li>Emotion support (excl. babel plugin)</li>
          <li>Lodash support (incl. babel plugin)</li>
          <li>
            SumUp ESLint and Prettier configuration provided by{' '}
            <Link href="https://github.com/sumup/foundry">
              <a>Foundry</a>
            </Link>
          </li>
        </List>
        <Text size={Text.GIGA} style={{ textAlign: 'center' }}>
          Now go and build things!<br />
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
  </ThemeProvider>
);

export default Page;
