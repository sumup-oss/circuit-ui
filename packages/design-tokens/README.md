<div align="center">

# @sumup-oss/design-tokens

Visual primitives such as typography, color, and spacing for [Circuit UI Web](https://github.com/sumup-oss/circuit-ui/tree/main/packages/circuit-ui).

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup-oss/design-tokens)](https://www.npmjs.com/package/@sumup-oss/design-tokens) [![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/circuit-ui)](https://codecov.io/gh/sumup-oss/circuit-ui) [![License](https://img.shields.io/badge/license--lightgrey.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/packages/design-tokens/LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md)

</div>

## Installation

Depending on your preference, run one of the following in your terminal:

```sh
# With npm
npm install @sumup-oss/design-tokens

# With yarn v1
yarn add @sumup-oss/design-tokens
```

## Usage

The design tokens are exported as [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). Choose a [font loading strategy](#fonts) and a [color scheme](#color-schemes), then import the corresponding CSS file globally in your application, such as in Next.js' `app/layout.tsx` file:

```tsx
// app/layout.tsx
import '@sumup-oss/design-tokens/fonts.css';
import '@sumup-oss/design-tokens/light.css';

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

The application code must be processed by a bundler that can handle CSS files. [Next.js](https://nextjs.org/docs/pages/building-your-application/styling), [Create React App](https://create-react-app.dev/docs/adding-a-stylesheet), [Vite](https://vitejs.dev/guide/features.html#css-modules), [Parcel](https://parceljs.org/languages/css/#css-modules), and others support importing CSS files out of the box.

Refer to the [theme documentation](https://circuit.sumup.com/?path=/docs/features-theme--docs) for a complete reference of the available tokens.

### Fonts

Import the stylesheet that contains the font face declarations globally in your application, such as in a global layout file:

```ts
import '@sumup-oss/design-tokens/fonts.css';
```

To speed up the loading of the fonts, add preload links to the global `<head>` element of your application. Choose which subsets to preload based on the languages your app supports. The available subsets are `latin`, `latin-ext`, `cyrillic`, `cyrillic-ext`, `greek`, `greek-ext`, and `vietnamese`.

```html
<link
  rel="preload"
  href="https://static.sumup.com/fonts/Inter/Inter-normal-latin.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

Do not use Next.js' built-in font optimization as it doesn't support Inter's italic axis.

### Color schemes

#### Single color scheme

For applications that support a single color scheme, import the `@sumup-oss/design-tokens/light.css` or `@sumup-oss/design-tokens/dark.css` themes. They contain the complete set of design tokens, in light and dark mode respectively. The tokens are defined globally on the `:root` element. The themes can be used independently or with a [scoped theme](#scoped-color-scheme).

#### Scoped color scheme

To apply a different color scheme to a subset of an application, import the `@sumup-oss/design-tokens/light-scoped.css` or `@sumup-oss/design-tokens/dark-scoped.css` themes. They contain only color tokens which are scoped to the `data-color-scheme="light"` and `data-color-scheme="dark"` selectors respectively. The themes must be used alongside a [full theme](#single-color-scheme) to ensure that all design tokens are defined.

#### Multiple color schemes

For applications that support switching between light and dark color schemes, import the `@sumup-oss/design-tokens/dynamic.css` theme. It contains all tokens defined globally on the `:root` element, the dark color tokens scoped to the `prefers-color-scheme: dark` media query, and the [scoped themes](#scoped-color-scheme). By default, the color scheme follows the system settings. Add the `data-color-scheme` attribute on the document root to set a specific color scheme.

Ensure that users have full control over their preferred color mode: dark, light, or match system. Their choice should be persisted between devices and sessions. There should be no [Flash of inAccurate coloR Theme (FART)](https://css-tricks.com/flash-of-inaccurate-color-theme-fart/), regardless of whether the app is client-side or server-side rendered.

### Legacy JavaScript theme

> [!WARNING]
> The JavaScript theme is being replaced by [CSS custom properties](#usage) (aka CSS variables) to improve performance and compatibility with other frameworks. We recommend installing the [`@sumup-oss/eslint-plugin-circuit-ui`](https://circuit.sumup.com/?path=/docs/packages-eslint-plugin-circuit-ui--docs) ESLint plugin and turning on the `prefer-custom-properties` and `no-invalid-custom-properties` rules to help with the migration.

The `light` theme is meant to be used with Emotion.js' [`ThemeProvider`](https://emotion.sh/docs/theming):

```tsx
import { light } from '@sumup-oss/design-tokens';
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
import { themePropType } from '@sumup-oss/design-tokens';

function ComponentWithInlineStyles({ theme, label }) {
  return <div style={{ borderRadius: theme.borderRadius.kilo }}>{label}</div>;
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
import type { Theme as CircuitUITheme } from '@sumup-oss/design-tokens';

declare module '@emotion/react' {
  export interface Theme extends CircuitUITheme {}
}
```
