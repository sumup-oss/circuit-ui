<div align="center">

# @sumup-oss/icons

A collection of icons for the web, part of the SumUp Circuit Design System.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup-oss/icons)](https://www.npmjs.com/package/@sumup-oss/icons) [![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/circuit-ui)](https://codecov.io/gh/sumup-oss/circuit-ui) [![License](https://img.shields.io/github/license/sumup-oss/circuit-ui)](https://github.com/sumup-oss/circuit-ui/tree/main/packages/icons/LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md)

</div>

## Installation

Depending on your preference, run one of the following in your terminal:

```sh
# With npm
npm install @sumup-oss/icons

# With yarn v1
yarn add @sumup-oss/icons
```

## Usage

### Import as React component

The easiest way to use an icon in [React](https://reactjs.org/) is to import it as a component. This approach works out of the box (no special loaders needed), is tree-shaking enabled, and comes with TypeScript typings included.

```tsx
import { Check } from '@sumup-oss/icons';

const SuccessMessage = ({ description }) => (
  <div>
    <Check />
    <span>{description}</span>
  </div>
);
```

Some icons have multiple sizes. They default to size '24', if supported, or to the smallest available size. Use the `size` prop to show one of the other sizes ('16' or '32') instead:

```tsx
import { CircleCheckmark } from '@sumup-oss/icons';

const SuccessMessage = ({ description }) => (
  <div>
    <CircleCheckmark size="24" />
    <span>{description}</span>
  </div>
);
```

To change the color of an icon, set the `color` property in CSS. The color will [cascade down](https://css-tricks.com/cascading-svg-fill-color/) since the `fill` and `stroke` attributes of all monochrome icons are set to `currentColor`. Here's an example using CSS Modules:

```css
/* SuccessMessage.module.css */
.icon {
  color: green;
}
```

```tsx
// SuccessMessage.tsx
import { Check } from '@sumup-oss/icons';
import styles from './SuccessMessage.module.css';

const SuccessMessage = ({ message }) => (
  <div>
    <Check className={styles.icon} />
    <span>{message}</span>
  </div>
);
```

### Import as SVG file

Alternatively, it's possible to import the raw SVG files. Most bundlers require a special loader to make this work. For Webpack, we recommend the [file-loader](https://github.com/webpack-contrib/file-loader) which turns the import into a URL to the SVG.

```tsx
import checkIcon from '@sumup-oss/icons/check_24.svg';

const SuccessMessage = ({ message }) => (
  <div>
    <img src={checkIcon} alt="" aria-hidden="true" />
    <span>{message}</span>
  </div>
);
```

It is not possible to change the color of an external SVG using the `css` color property. Instead, you can use the [CSS `filter` hack](https://blog.union.io/code/2017/08/10/img-svg-fill/) to colorize the icon.

### Load from a URL

The latest version of the icon library is [automatically deployed](https://circuit.sumup.com/icons/v2) to [Vercel](https://vercel.com/). The files are hosted behind a global CDN, so they load quickly for all users. Use the `getIconURL` helper function to obtain the full URL with type-safety:

```tsx
import { getIconURL } from '@sumup-oss/icons';

const SuccessMessage = ({ message }) => (
  <div>
    <img src={getIconURL('check', '24')} alt="" aria-hidden="true" />
    <span>{message}</span>
  </div>
);
```

Alternatively, you can manually construct the URL:

```css
.icon {
  background-image: url('https://circuit.sumup.com/icons/v2/checkmark_16.svg');
}
```

It is not possible to change the color of an external SVG using the CSS `color` property. Instead, you can use the [CSS `filter` hack](https://blog.union.io/code/2017/08/10/img-svg-fill/) to colorize the icon.
