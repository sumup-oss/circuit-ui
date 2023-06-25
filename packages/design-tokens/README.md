<div align="center">

# @sumup/design-tokens

Visual primitives such as typography, color, and spacing for [Circuit UI Web](https://github.com/sumup-oss/circuit-ui/tree/main/packages/circuit-ui).

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

The [legacy JavaScript theme](#legacy-javascript-theme) for Emotion.js is being replaced by [CSS custom properties](#css-custom-properties) (aka CSS variables) to improve performance and compatibility with other frameworks. We recommend installing the [`@sumup/eslint-plugin-circuit-ui`](https://circuit.sumup.com/?path=/docs/packages-eslint-plugin-circuit-ui--docs) ESLint plugin and turning on the `prefer-custom-properties` and `no-invalid-custom-properties` rules to help with the migration.

Refer to the [theme documentation](https://circuit.sumup.com/?path=/docs/features-theme--docs) for a full reference of the available tokens.

### CSS custom properties

The `@sumup/design-tokens/light.css` CSS file contains all CSS custom properties that are used by Circuit UI. Import it globally in your application, such as in Next.js' `_app.tsx` file:

```tsx
// _app.tsx
import '@sumup/design-tokens/light.css';

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

The application code must be processed by a bundler that can handle CSS files. [Next.js](https://nextjs.org/docs/pages/building-your-application/styling), [Create React App](https://create-react-app.dev/docs/adding-a-stylesheet), [Vite](https://vitejs.dev/guide/features.html#css-modules), [Parcel](https://parceljs.org/languages/css/#css-modules), and others support importing CSS files out of the box.

### Legacy JavaScript theme

The `light` theme is meant to be used with Emotion.js' [`ThemeProvider`](https://emotion.sh/docs/theming):

```tsx
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

The theme is a plain JavaScript object, so you can use it in other ways, too.

#### With prop types

The package exports a `themePropType` which can be used to check the `theme` prop:

```tsx
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

#### With TypeScript

The package exports a `Theme` interface that can be used to augment Emotion.js' types as described in the [Emotion.js docs](https://emotion.sh/docs/typescript#define-a-theme):

```ts
import '@emotion/react';
import { Theme as CircuitUITheme } from '@sumup/design-tokens';

declare module '@emotion/react' {
  export interface Theme extends CircuitUITheme {}
}
```
