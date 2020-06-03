[![License](https://img.shields.io/badge/license--lightgrey.svg)](https://github.com/sumup-oss/icons/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

<div align="center">

# SumUp Icons

A collection of icons for the web, part of the SumUp Design System.

</div>

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Import as React component](#import-as-react-component)
  - [Import as SVG file](#import-as-svg-file)
  - [Load from a URL](#load-from-a-url)
- [Code of Conduct](#code-of-conduct)
- [About SumUp](#about-sumup)

## Installation

The SumUp icons can be installed as a node module. Depending on your preference, run one of the following in your terminal:

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

To change the color of an icon, set the `color` property in CSS. The color will [cascade down](https://css-tricks.com/cascading-svg-fill-color/) since the `fill` and `stroke` attributes of most icons are set to `currentColor`. Here's an example with a CSS-in-JS library:

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

### Load from a URL

The latest version of the icon library is [automatically deployed](https://icons.sumup-oss.now.sh/) to [Vercel Now](https://vercel.com/). The files are hosted behind a global CDN, so they load quickly for all users. You can load the icons from `https://icons.sumup-oss.now.sh/v1/<name>_<size>.svg`. Below are some examples:

```html
<img src="https://icons.sumup-oss.now.sh/v1/check_small.svg" alt="checkmark" />
```

```css
.icon {
  background-image: url('https://icons.sumup-oss.now.sh/v1/circle_checkmark_filled_large.svg');
}
```

## Code of Conduct

We want to foster an inclusive and friendly community around our Open Source efforts. Like all SumUp Open Source projects, this project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](CODE_OF_CONDUCT.md).

If you feel another member of the community violated our CoC or you are experiencing problems participating in our community because of another individual's behavior, please get in touch with our maintainers. We will enforce the CoC.

### Maintainers

- [Connor Bär](mailto:connor.baer@sumup.com)

## About SumUp

![SumUp logo](https://raw.githubusercontent.com/sumup-oss/assets/master/sumup-logo.svg?sanitize=true)

[SumUp](https://sumup.com) is a mobile-point of sale provider. It is our mission to make easy and fast card payments a reality across the _entire_ world. You can pay with SumUp in more than 30 countries, already. Our engineers work in Berlin, Cologne, Sofia, and Sāo Paulo. They write code in JavaScript, Swift, Ruby, Go, Java, Erlang, Elixir, and more.

Want to come work with us? [Head to our careers page](https://sumup.com/careers) to find out more.
