/** @jsx jsx */
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import {
  Card,
  Heading,
  List,
  Text,
  theme as themes,
  GlobalStyles
} from '@sumup/circuit-ui';
import { ReactComponent as LogoIcon } from './assets/logo.svg';

const { circuit } = themes;

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
  <ThemeProvider theme={circuit}>
    <GlobalStyles
      custom={`
        body {
          background-color: ${circuit.colors.n100};
        }
      `}
    />
    <Container>
      <Logo data-testid="sumup-logo" />
      <Card>
        <Heading size={Heading.KILO}>Welcome to SumUp React</Heading>
        <Text>
          This is a <code>create-react-app</code>
          -based project featuring some SumUp-specific customizations:
        </Text>
        <List size={List.MEGA}>
          <li>Circuit UI integration</li>
          <li>Emotion support (incl. babel plugin)</li>
          <li>Lodash support (incl. babel plugin)</li>
          <li>
            SumUp ESLint and Prettier configuration (in and outside{' '}
            <code>react-scripts</code>)
          </li>
        </List>
        <Text
          size={Text.GIGA}
          css={css`
            text-align: center;
          `}
        >
          Now go and build things!
          <br />
        </Text>
        <Text
          size={Text.GIGA}
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
