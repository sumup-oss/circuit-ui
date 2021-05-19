/** @jsxImportSource @emotion/core */

import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { Card, Heading, List, Text, BaseStyles } from '@sumup/circuit-ui';
import { light } from '@sumup/design-tokens';

import { ReactComponent as LogoIcon } from './assets/logo.svg';

const Logo = styled(LogoIcon)`
  ${({ theme }) => css`
    display: block;
    fill: ${theme.colors.white};
    margin-bottom: ${theme.spacings.tera};
    margin-top: ${theme.spacings.peta};
  `};
`;

const Container = styled('header')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 450px;
  min-height: 100vh;
  margin: 0 auto;
`;

const App = () => (
  <ThemeProvider theme={light}>
    <BaseStyles />
    <Container>
      <Logo data-testid="sumup-logo" />
      <Card>
        <Heading as="h1" size="kilo">
          Welcome to SumUp React
        </Heading>
        <Text>
          This is a <code>create-react-app</code>
          -based project featuring some SumUp-specific customizations:
        </Text>
        <List size="mega">
          <li>Circuit UI integration</li>
          <li>Emotion support (incl. babel plugin)</li>
          <li>Lodash support (incl. babel plugin)</li>
          <li>
            SumUp ESLint and Prettier configuration (in and outside{' '}
            <code>react-scripts</code>)
          </li>
        </List>
        <Text
          size="giga"
          css={css`
            text-align: center;
          `}
        >
          Now go and build things!
          <br />
        </Text>
        <Text
          size="giga"
          css={css`
            text-align: center;
            transform: scale3d(1.5, 1.5, 1);
          `}
        >
          <span role="img" aria-label="Emojis for building things">
            🔨👩🏽‍💻👨🏼‍💻🚀
          </span>
        </Text>
      </Card>
    </Container>
  </ThemeProvider>
);

export default App;
