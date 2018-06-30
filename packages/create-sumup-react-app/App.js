import React from 'react';
import styled, {css} from 'react-emotion';
import { Card, Heading, List, Text } from '@sumup/circuit-ui';
import { standard } from '@sumup/circuit-ui/themes';
import { globalStyles } from '@sumup/circuit-ui/styles';
import { ThemeProvider } from 'emotion-theming';

import LogoIcon from './logo.svg';

const customGlobalStyles = css`
  body {
    background-color: ${standard.colors.n100};
  }
`;

globalStyles({ theme: standard, custom: customGlobalStyles });

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
  margin: 0 auto;
`;

const App = () => (
  <ThemeProvider theme={standard}>
    <Container>
      <Logo />
      <Card>
        <Heading size={Heading.KILO}>Welcome to SumUp React</Heading>
        <Text>This is a <code>create-react-app</code>-based
        project featuring some SumUp-specific customizations:
        </Text>
        <List size={List.MEGA}>
          <li>Circuit UI integration</li>
          <li>Emotion support (incl. babel plugin)</li>
          <li>Lodash support (incl. babel plugin)</li>
          <li>
            SumUp ESLint and Prettier configuration
            (in and outside <code>react-scripts</code>)
           </li>
        </List>
        <Text size={Text.GIGA} css={{textAlign: 'center'}}>
          Now go and build things!<br/>
         </Text>
        <Text
          size={Text.GIGA}
          css={{textAlign: 'center', transform: 'scale3d(1.5, 1.5, 1)'}}>
          <span role="img" aria-label="Emojis for building things">
            🔨👩🏽‍💻👨🏼‍💻🚀
           </span>
         </Text>
      </Card>
    </Container>
  </ThemeProvider>
);

export default App;