[![License](https://img.shields.io/badge/license--lightgrey.svg)](https://github.com/sumup-oss/design-tokens/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

<div align="center">

# SumUp Design Tokens

Visual primitives such as typography, color, and spacing that are shared across platforms. Part of the SumUp Design System.

</div>

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Code of Conduct](#code-of-conduct)
- [About SumUp](#about-sumup)

## Installation

The SumUp design tokens can be installed as a node module. Depending on your preference, run one of the following in your terminal:

```sh
# With Yarn
$ yarn add @sumup/design-tokens

# With npm
$ npm install @sumup/design-tokens
```

## Usage

The package currently exports a single `light` theme that is meant to be used in combination with the [`emotion-theming`](https://emotion.sh/docs/theming) package.

```jsx
import { light } from '@sumup/design-tokens';
import { ThemeProvider } from 'emotion-theming';
import styled from '@emotion/styled';

const App = () => (
  <ThemeProvider theme={light}>
    <Bold>This styled component has access to the theme.</Bold>
  </ThemeProvider>
);

const Bold = styled.strong`
  font-weight: ${(p) => p.theme.fontWeight.bold};
`;
```

### With TypeScript

The package exports a `Theme` interface which can be used to type Emotion's `styled` function. Create a custom `styled` instance as described in the [Emotion docs](https://emotion.sh/docs/typescript):

```tsx
import styled, { CreateStyled } from '@emotion/styled';
import { Theme } from '@sumup/design-tokens';

export default styled as CreateStyled<Theme>;
```

## Code of Conduct (CoC)

We want to foster an inclusive and friendly community around our Open Source efforts. Like all SumUp Open Source projects, this project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](CODE_OF_CONDUCT.md).

If you feel another member of the community violated our CoC or you are experiencing problems participating in our community because of another individual's behavior, please get in touch with our maintainers. We will enforce the CoC.

### Maintainers

- [Connor Bär](mailto:connor.baer@sumup.com)

## About SumUp

![SumUp logo](https://raw.githubusercontent.com/sumup-oss/assets/master/sumup-logo.svg?sanitize=true)

[SumUp](https://sumup.com) is a mobile-point of sale provider. It is our mission to make easy and fast card payments a reality across the _entire_ world. You can pay with SumUp in more than 30 countries, already. Our engineers work in Berlin, Cologne, Sofia, and Sāo Paulo. They write code in JavaScript, Swift, Ruby, Go, Java, Erlang, Elixir, and more.

Want to come work with us? [Head to our careers page](https://sumup.com/careers) to find out more.
