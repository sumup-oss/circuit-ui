<div align="center">

# @sumup-oss/illustrations

Sumup's illustration library, part of the SumUp Circuit Design System.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup-oss/illustrations)](https://www.npmjs.com/package/@sumup-oss/icons) [![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/circuit-ui)](https://codecov.io/gh/sumup-oss/circuit-ui) [![License](https://img.shields.io/github/license/sumup-oss/circuit-ui)](https://github.com/sumup-oss/circuit-ui/tree/main/packages/icons/LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md)

</div>

## Installation

Depending on your preference, run one of the following in your terminal:

```sh
# With npm
npm install @sumup-oss/illustrations

# With yarn v1
yarn add @sumup-oss/illustrations
```

## Usage

### Import as React component

Import the Illustration component and chose the variant you want to use:
- Success: `"success"`
- Error: `"error"`
- Warning: `"warning"`
- Info: `"info"`

```tsx
import { Illustration } from '@sumup-oss/illustrations';

const SuccessScreen = ({ description }) => (
  <div>
    <Illustration variant="success" />
    <span>{description}</span>
  </div>
);
```

Illustrations come in 3 sizes: 
- Small `"s"`: 120 x 120 px
- Medium `"m"`: 240 x 240 px
- Large `"l"`: 320 x 320 px
- 
. They default to size `"m"`. Use the `size` prop to show one of the other sizes ('l' or 's') instead:

```tsx
import { Illustration } from '@sumup-oss/circuit-ui';

const SuccessScreen = ({ description }) => (
  <div>
    <Illustration variant="success" size="l" />
    <span>{description}</span>
  </div>
);
```

To change the variant of an icon, set the `theme` prop to one. The color will [cascade down](https://css-tricks.com/cascading-svg-fill-color/) since the `fill` and `stroke` attributes of all monochrome icons are set to `currentColor`. Here's an example using CSS Modules:

```css
/* SuccessMessage.module.css */
.icon {
  color: green;
}
```


### Import as SVG file

Alternatively, it's possible to import the raw SVG files. Most bundlers require a special loader to make this work. For Webpack, we recommend the [file-loader](https://github.com/webpack-contrib/file-loader) which turns the import into a URL to the SVG.

```tsx
import successSmallLight from '@sumup-oss/illustrations/success_s_light.svg';

const SuccessScreen = ({ message }) => (
  <div>
    <img src={successSmallLight} alt="" />
    <span>{message}</span>
  </div>
);
```

### Load from a URL

The latest version of the illustrations library is [automatically deployed](https://circuit.sumup.com/icons/v2) to [Vercel](https://vercel.com/). The files are hosted behind a global CDN, so they load quickly for all users. Use the `getIllustrationURL` helper function to obtain the full URL with type-safety:

```tsx
import { getIllustrationURL } from '@sumup-oss/illustrations';

const SuccessScreen = ({ message }) => (
  <div>
    <img src={getIllustrationURL('success', 's', 'light')} alt="" />
    <span>{message}</span>
  </div>
);
```

Alternatively, you can manually construct the URL (`https://circuit.sumup.com/icons/v2/<variant>_<size>_<theme>.svg`). For example:

```css
.icon {
  background-image: url('https://circuit.sumup.com/icons/v2/success_s_light.svg');
}
```
