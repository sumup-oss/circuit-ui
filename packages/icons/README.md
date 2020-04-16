[![License](https://img.shields.io/badge/license--lightgrey.svg)](https://github.com/sumup-oss/icons/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

<div align="center">

# Icons by SumUp

A collection of icons for the web, part of the SumUp Design System.

</div>

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Import as React component](#import-as-react-component)
  - [Import as SVG file](#import-as-svg-file)
- [Code of Conduct](#code-of-conduct)
- [About SumUp](#about-sumup)

## Installation

The SumUp icons can be installed as a node module:

```sh
yarn add @sumup/icons
# Or if you prefer npm:
npm install @sumup/icons
```

## Usage

### Import as React component

The easiest way to use the icons in [React](https://reactjs.org/) is to import them as components. This approach works out of the box (no special loaders needed), is tree-shaking enabled, and has TypeScript typings included.

```jsx
import { Valid } from '@sumup/icons';

const SuccessMessage = ({ description }) => (
  <div>
    <Valid fill="#37b24d" />
    <span>{description}</span>
  </div>
);
```

Applying styles with a CSS-in-JS library:

```jsx
import styled from '@emotion/styled';
import { Valid } from '@sumup/icons';

const ValidIcon = styled(Valid)`
  fill: #37b24d;
`;

const SuccessMessage = ({ description }) => (
  <div>
    <ValidIcon />
    <span>{description}</span>
  </div>
);
```

### Import as SVG file

Alternatively, it's possible to import the raw SVG files. Most bundlers require a special loader to make this work. For Webpack, we recommend the [file-loader](https://github.com/webpack-contrib/file-loader) which turns the import into a URL to the SVG.

```jsx
import valid from '@sumup/icons/icons/valid.svg';

const SuccessMessage = ({ description }) => (
  <div>
    <img src={valid} alt="" aria-hidden="true" />
    <span>{description}</span>
  </div>
);
```

## Code of conduct

We want to foster an inclusive and friendly community around our Open Source efforts. Like all SumUp Open Source projects, this project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](CODE_OF_CONDUCT.md).

If you feel another member of the community violated our CoC or you are experiencing problems participating in our community because of another individual's behavior, please get in touch with our maintainers. We will enforce the CoC.

### Maintainers

- [Connor Bär](mailto:connor.baer@sumup.com)

## About SumUp

![SumUp logo](https://raw.githubusercontent.com/sumup-oss/assets/master/sumup-logo.svg?sanitize=true)

[SumUp](https://sumup.com) is a mobile-point of sale provider. It is our mission to make easy and fast card payments a reality across the _entire_ world. You can pay with SumUp in more than 30 countries, already. Our engineers work in Berlin, Cologne, Sofia, and Sāo Paulo. They write code in JavaScript, Swift, Ruby, Go, Java, Erlang, Elixir, and more.

Want to come work with us? [Head to our careers page](https://sumup.com/careers) to find out more.
