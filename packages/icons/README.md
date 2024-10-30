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

```jsx
import { Check } from '@sumup-oss/icons';

const SuccessMessage = ({ description }) => (
  <div>
    <Check />
    <span>{description}</span>
  </div>
);
```

Some icons have multiple sizes. They default to size '24', if supported, or to the smallest available size. Use the `size` prop to show one of the other sizes ('16' or '32') instead:

```jsx
import { CircleCheckmark } from '@sumup-oss/icons';

const SuccessMessage = ({ description }) => (
  <div>
    <CircleCheckmark size="24" />
    <span>{description}</span>
  </div>
);
```

To change the color of an icon, set the `color` property in CSS. The color will [cascade down](https://css-tricks.com/cascading-svg-fill-color/) since the `fill` and `stroke` attributes of all monochrome icons are set to `currentColor`. Here's an example with a CSS-in-JS library:

```jsx
import styled from '@emotion/styled';
import { Check } from '@sumup-oss/icons';

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
import checkIcon from '@sumup-oss/icons/check_small.svg';

const SuccessMessage = ({ description }) => (
  <div>
    <img src={checkIcon} alt="" aria-hidden="true" />
    <span>{description}</span>
  </div>
);
```

It is not possible to change the color of an external SVG using the `css` color property. Instead, you can use the [CSS `filter` hack](https://blog.union.io/code/2017/08/10/img-svg-fill/) to colorize the icon.

### Load from a URL

The latest version of the icon library is [automatically deployed](https://circuit.sumup.com/icons/v2) to [Vercel](https://vercel.com/). The files are hosted behind a global CDN, so they load quickly for all users. You can load the icons from `https://circuit.sumup.com/icons/v2/<name>_<size>.svg`. Below are some examples:

```html
<img
  src="https://circuit.sumup.com/icons/v2/checkmark_16.svg"
  alt="checkmark"
/>
```

```css
.icon {
  background-image: url('https://circuit.sumup.com/icons/v2/checkmark_16.svg');
}
```

It is not possible to change the color of an external SVG using the CSS `color` property. Instead, you can use the [CSS `filter` hack](https://blog.union.io/code/2017/08/10/img-svg-fill/) to colorize the icon.
