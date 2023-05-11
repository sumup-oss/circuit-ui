<div align="center">

# @sumup/design-tokens

Visual primitives such as typography, color, and spacing that are shared across platforms.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup/design-tokens)](https://www.npmjs.com/package/@sumup/design-tokens) [![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/circuit-ui)](https://codecov.io/gh/sumup-oss/circuit-ui) [![License](https://img.shields.io/badge/license--lightgrey.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/packages/design-tokens/LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md)

</div>

## Installation

Depending on your preference, run one of the following in your terminal:

```sh
# With npm
npm install @sumup/design-tokens

# With yarn v1
yarn add @sumup/design-tokens
```

## Usage

The package currently exports a single `light` theme that is meant to be used with SumUp's React component library, [Circuit UI](https://github.com/sumup-oss/circuit-ui/tree/main/packages/circuit-ui). Pass the theme to Emotion's [`ThemeProvider`](https://emotion.sh/docs/theming):

```jsx
import { light } from '@sumup/design-tokens';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

const Bold = styled.strong`
  font-weight: ${(p) => p.theme.fontWeight.bold};
`;

const App = () => (
  <ThemeProvider theme={light}>
    <Bold>This styled component has access to the theme.</Bold>
  </ThemeProvider>
);
```

The theme is a plain JavaScript object, so you can use it in other ways, too.

### With prop types

The package exports a `themePropType` which can be used to check the `theme` prop:

```js
import PropTypes from 'prop-types';
import { withTheme } from '@emotion/react';
import { themePropType } from '@sumup/design-tokens';

function ComponentWithInlineStyles({ theme, label }) {
  return <div style={{ color: theme.colors.p500 }}>{label}</div>;
}

ComponentWithInlineStyles.propTypes = {
  theme: themePropType.isRequired,
  label: PropTypes.string,
};

export default function withTheme(ComponentWithInlineStyles);
```

### With TypeScript

The package exports a `Theme` interface which can be used to type Emotion's `styled` function. Create a custom `styled` instance as described in the [Emotion docs](https://emotion.sh/docs/typescript):

```tsx
import styled, { CreateStyled } from '@emotion/styled';
import { Theme } from '@sumup/design-tokens';

export default styled as CreateStyled<Theme>;
```
