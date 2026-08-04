<div align="center">

# @sumup-oss/illustrations

SumUp’s illustration library for the Circuit Design System.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/)
[![Version](https://img.shields.io/npm/v/@sumup-oss/illustrations)](https://www.npmjs.com/package/@sumup-oss/illustrations)
[![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/circuit-ui)](https://codecov.io/gh/sumup-oss/circuit-ui)
[![License](https://img.shields.io/github/license/sumup-oss/circuit-ui)](https://github.com/sumup-oss/circuit-ui/tree/main/packages/illustrations/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md)

</div>

## Overview

`@sumup-oss/illustrations` provides ready-to-use SVG illustrations for SumUp products and interfaces.

You can use the package in two ways:

- Render illustrations in React with the Illustration component.
- Load SVG files directly from the hosted CDN.

The package includes light and dark theme variants and TypeScript support for illustration names.

## Installation

Install the package with your package manager:

```sh
npm install @sumup-oss/illustrations
```

The React component requires `react` as a peer dependency.

Make sure to import the package styles in your application:

```tsx
import "@sumup-oss/illustration/styles.css";
```

## Usage

### Render an illustration in React

Import the Illustration component and pass the illustration name.

```tsx
import { Illustration } from "@sumup-oss/illustrations";

const SuccessScreen = ({ description }) => (
  <div>
    <Illustration name="celebration" />
    <span>Your payment was successful.</span>
  </div>
);
```

### Change the size

By default, illustrations render at `240px × 240px`.
Use the `size` prop to change the rendered size.

```tsx
import { Illustration } from "@sumup-oss/circuit-ui";

const SuccessScreen = ({ description }) => (
  <div>
    <Illustration name="celebration" size={320} />
    <span>Your payment was successful.</span>
  </div>
);
```

### Choose a color scheme

Illustrations support light and dark themes.

The Illustration component will automatically switch between the light and dark theme variants based on the `data-color-scheme` attribute in your app. This is the default and recommended way to use the component.
If you want to explicitly set the color scheme, use the `color-scheme` prop.

```tsx
import { Illustration } from "@sumup-oss/circuit-ui";

const SuccessScreen = ({ description }) => (
  <div>
    <Illustration name="celebration" color-scheme="dark" />
    <span>Your payment was successful.</span>
  </div>
);
```

## Accessibility

Illustrations are decorative by default and are ignored by screen readers.
They should _always_ be accompanied by visible text that describes the meaning of the illustration in their context.

If an illustration communicates meaning not already provided by nearby text, add an `alt` prop.

```tsx
import { Illustration } from "@sumup-oss/circuit-ui";

const SuccessScreen = ({ description }) => (
  <div>
    <Illustration name="celebration" alt="Your payment was successful." />
  </div>
);
```

### Load from a URL

The latest version of the illustrations library is [automatically deployed](https://circuit.sumup.com/illustrations) to [Vercel](https://vercel.com/). The files are hosted behind a global CDN, so they load quickly for all users. Use the `getIllustrationURL` helper function to get the full URL with type-safety:

```tsx
import { getIllustrationURL } from "@sumup-oss/illustrations";

const SuccessScreen = ({ message }) => (
  <div>
    <img src={getIllustrationURL("error-1", "light")} alt="" />
    <span>Payment failed. Please contact your card provider.</span>
  </div>
);
```

Alternatively, you can manually construct the URL (`https://circuit.sumup.com/illustrations/<name>_<color-scheme>.svg`). For example:

```css
.illustration {
  background-image: url("https://circuit.sumup.com/illustrations/bookings_dark.svg");
}
```
