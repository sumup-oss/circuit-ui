<div align="center">

# @sumup/design-tokens

Visual primitives such as typography, color, and spacing that are shared across platforms.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup/design-tokens)](https://www.npmjs.com/package/@sumup/design-tokens) [![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/circuit-ui)](https://codecov.io/gh/sumup-oss/circuit-ui) [![License](https://img.shields.io/badge/license--lightgrey.svg)](https://github.com/sumup-oss/circuit-ui/blob/main/packages/design-tokens/LICENSE)

</div>

## Installation

The package can be installed as a node module. Depending on your preference, run one of the following in your terminal:

```sh
# With Yarn
$ yarn add @sumup/design-tokens

# With npm
$ npm install @sumup/design-tokens
```

## Usage

The package currently exports a single `light` theme that is meant to be used with SumUp's React component library, [Circuit UI](https://github.com/sumup-oss/circuit-ui/blob/main/packages/circuit-ui). Pass the theme to the `ThemeProvider` from the [`emotion-theming`](https://emotion.sh/docs/theming) package:

```jsx
import { light } from '@sumup/design-tokens';
import { ThemeProvider } from 'emotion-theming';
import styled from '@emotion/styled';

const App = () => (
  <ThemeProvider theme={light}>
    <Bold>This styled component has access to the theme.</Bold>
  </ThemeProvider>
);

const Bold = styled.strong`
  font-weight: ${(p) => p.theme.fontWeight.bold};
`;
```

The theme is a plain JavaScript object, so you can use it in other ways, too.

### With prop types

The package exports a `themePropType` which can be used to check the `theme` prop:

```js
import PropTypes from 'prop-types';
import { withTheme } from 'emotion-theming';
import { themePropType } from '@sumup/design-tokens';

export function ComponentWithInlineStyles({ theme, label }) {
  return <div style={{ color: theme.colors.p500 }}>{label}</div>;
}

ComponentWithInlineStyles.propTypes = {
  theme: themePropType.isRequired,
  label: PropTypes.string,
};
```

### With TypeScript

The package exports a `Theme` interface which can be used to type Emotion's `styled` function. Create a custom `styled` instance as described in the [Emotion docs](https://emotion.sh/docs/typescript):

```tsx
import styled, { CreateStyled } from '@emotion/styled';
import { Theme } from '@sumup/design-tokens';

export default styled as CreateStyled<Theme>;
```
