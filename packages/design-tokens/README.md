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

> **Warning**
> The design tokens are gradually being migrated from a JavaScript object to CSS custom properties. During the migration, you need to include both the JS object and CSS file in your application.

### CSS custom properties

```ts
import '@sumup/design-tokens/light.css';
```

### JavaScript theme

The package currently exports a single `light` theme that is meant to be used with SumUp's React component library, [Circuit UI](https://github.com/sumup-oss/circuit-ui/tree/main/packages/circuit-ui). Pass the theme to Emotion.js' [`ThemeProvider`](https://emotion.sh/docs/theming):

```jsx
import { light } from '@sumup/design-tokens';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

const Bold = styled.strong`
  font-weight: ${(p) => p.theme.fontWeight.bold};
`;

function App() {
  return (
    <ThemeProvider theme={light}>
      <Bold>This styled component has access to the theme.</Bold>
    </ThemeProvider>
  );
}
```

#### With TypeScript

The package exports a `Theme` interface that can be used to type the `theme` prop. This can be done globally by extending Emotion.js' type declarations via your own declarations file as described in the [Emotion.js docs](https://emotion.sh/docs/typescript#define-a-theme):

```tsx
import '@emotion/react';
import { Theme as CircuitTheme } from '@sumup/design-tokens';

declare module '@emotion/react' {
  export interface Theme extends CircuitTheme {}
}
```
