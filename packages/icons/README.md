<div align="center">

# @sumup/icons

A collection of icons for the web, part of the SumUp Circuit Design System.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup/icons)](https://www.npmjs.com/package/@sumup/icons) [![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/circuit-ui)](https://codecov.io/gh/sumup-oss/circuit-ui) [![License](https://img.shields.io/github/license/sumup-oss/circuit-ui)](https://github.com/sumup-oss/circuit-ui/blob/main/packages/icons/LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

</div>

## Installation

Depending on your preference, run one of the following in your terminal:

```sh
# With Yarn
yarn add @sumup/icons

# With npm
npm install @sumup/icons
```

## Usage

### Import as React component

The easiest way to use an icon in [React](https://reactjs.org/) is to import it as a component. This approach works out of the box (no special loaders needed), is tree-shaking enabled, and comes with TypeScript typings included.

```jsx
import { Check } from '@sumup/icons';

const SuccessMessage = ({ description }) => (
  <div>
    <Check />
    <span>{description}</span>
  </div>
);
```

Some icons have multiple sizes. They default to the "small" size (16px). Use the `size` prop to show the "large" size (24px) instead:

```jsx
import { CircleCheckmark } from '@sumup/icons';

const SuccessMessage = ({ description }) => (
  <div>
    <CircleCheckmark size="large" />
    <span>{description}</span>
  </div>
);
```

To change the color of an icon, set the `color` property in CSS. The color will [cascade down](https://css-tricks.com/cascading-svg-fill-color/) since the `fill` and `stroke` attributes of all monochrome icons are set to `currentColor`. Here's an example with a CSS-in-JS library:

```jsx
import styled from '@emotion/styled';
import { Check } from '@sumup/icons';

const GreenCheck = styled(Check)`
  color: green;
`;

const SuccessMessage = ({ description }) => (
  <div>
    <GreenCheck />
    <span>{description}</span>
  </div>
);
```

### Import as SVG file

Alternatively, it's possible to import the raw SVG files. Most bundlers require a special loader to make this work. For Webpack, we recommend the [file-loader](https://github.com/webpack-contrib/file-loader) which turns the import into a URL to the SVG.

```jsx
import checkIcon from '@sumup/icons/check_small.svg';

const SuccessMessage = ({ description }) => (
  <div>
    <img src={checkIcon} alt="" aria-hidden="true" />
    <span>{description}</span>
  </div>
);
```

It is not possible to change the color of an external SVG using the `css` color property. Instead, you can use the [CSS `filter` hack](https://blog.union.io/code/2017/08/10/img-svg-fill/) to colorize the icon.

### Load from a URL

The latest version of the icon library is [automatically deployed](https://circuit.sumup.com/icons/v1) to [Vercel](https://vercel.com/). The files are hosted behind a global CDN, so they load quickly for all users. You can load the icons from `https://circuit.sumup.com/icons/v1/<name>_<size>.svg`. Below are some examples:

```html
<img src="https://circuit.sumup.com/icons/v1/check_small.svg" alt="checkmark" />
```

```css
.icon {
  background-image: url('https://circuit.sumup.com/icons/v1/circle_checkmark_filled_large.svg');
}
```

It is not possible to change the color of an external SVG using the `css` color property. Instead, you can use the [CSS `filter` hack](https://blog.union.io/code/2017/08/10/img-svg-fill/) to colorize the icon.
