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
# With npm
npm install @sumup-oss/illustrations

# With yarn
yarn add @sumup-oss/illustrations
```
The React component requires React as a peer dependency.


## Usage

### Render an illustration in React

Import the Illustration component and pass the illustration name.

```tsx
import { Illustration } from '@sumup-oss/illustrations';

const SuccessScreen = ({ description }) => (
  <div>
    <Illustration name="celebration"/>
    <span>Your payment was successful.</span>
  </div>
);
```


### Change the size

By default, illustrations render at `240px × 240px`.
Use the `size` prop to change the rendered size.

```tsx
import { Illustration } from '@sumup-oss/circuit-ui';

const SuccessScreen = ({ description }) => (
  <div>
    <Illustration name="celebration" size={320}/>
    <span>Your payment was successful.</span>
  </div>
);
```

### Choose a theme

Illustrations support light and dark themes.

If no `theme` prop is provided, the illustration uses the currently applied color scheme when available, based on the `data-color-scheme` attribute in your app. Otherwise, it falls back to the light theme.

```tsx
import { Illustration } from '@sumup-oss/circuit-ui';

const SuccessScreen = ({ description }) => (
  <div>
    <Illustration name="celebration" theme="dark"/>
    <span>Your payment was successful.</span>
  </div>
);
```


## Available illustrations


<table>
<thead>
  <tr>
    <th scope="col">Category</th>
    <th scope="col">Illustration</th>
    <th scope="col">Name</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="3">Feedback</td>
    <td>Success</td>
    <td><code>"celebration"</code>,<code>"financial-milestone"</code></td>
  </tr>
  <tr>
    <td>Error</td>
    <td><code>"error-1"</code>,<code>"error-2"</code></td>
  </tr>
  <tr>
    <td>Pending</td>
    <td><code>"waiting"</code></td>
  </tr>
  <tr>
    <td rowspan="3">States</td>
    <td>Empty</td>
    <td><code>"empty-state-1"</code>,<code>"empty-state-2"</code>,<code>"empty-state-3"</code></td>
  </tr>
  <tr>
    <td>Off</td>
    <td><code>"off"</code></td>
  </tr>
  <tr>
    <td>Problems</td>
    <td><code>"problems"</code></td>
  </tr>
  <tr>
    <td rowspan="10">Feature</td>
    <td>Account</td>
    <td><code>"account"</code></td>
  </tr>
  <tr>
    <td>bookings</td>
    <td><code>"bookings"</code></td>
  </tr>
  <tr>
    <td>Gift Cards</td>
    <td><code>"giftcards"</code></td>
  </tr>
  <tr>
    <td>Invoice</td>
    <td><code>"invoice"</code></td>
  </tr>
  <tr>
    <td>Loyalty</td>
    <td><code>"loyalty"</code></td>
  </tr>
  <tr>
    <td>Online Payments</td>
    <td><code>"onlinepayments"</code></td>
  </tr>
  <tr>
    <td>Payment Links</td>
    <td><code>"paymentlinks"</code></td>
  </tr>
  <tr>
    <td>Referral</td>
    <td><code>"referral"</code></td>
  </tr>
  <tr>
    <td>Rewards</td>
    <td><code>"rewards"</code></td>
  </tr>
  <tr>
    <td>Tap to Pay</td>
    <td><code>"taptopay"</code></td>
  </tr>

  <tr>
    <td rowspan="2">General communication</td>
    <td>Security</td>
    <td><code>"security"</code></td>
  </tr>
  <tr>
    <td>Support</td>
    <td><code>"support"</code></td>
  </tr>
</tbody>
</table>


## Accessibility

Illustrations are decorative by default and are ignored by screen readers.

If an illustration communicates meaning not already provided by nearby text, add an `alt` prop.


```tsx
import { Illustration } from '@sumup-oss/circuit-ui';

const SuccessScreen = ({ description }) => (
  <div>
    <Illustration name="celebration" alt="Your payment was successful."/>
  </div>
);
```

### Load from a URL

The latest version of the illustrations library is [automatically deployed](https://circuit.sumup.com/illustrations) to [Vercel](https://vercel.com/). The files are hosted behind a global CDN, so they load quickly for all users. Use the `getIllustrationURL` helper function to get the full URL with type-safety:

```tsx
import { getIllustrationURL } from '@sumup-oss/illustrations';

const SuccessScreen = ({ message }) => (
  <div>
    <img src={getIllustrationURL('error-1', 'light')}/>
    <span>Payment failed. Please contact your card provider.</span>
  </div>
);
```

Alternatively, you can manually construct the URL (`https://circuit.sumup.com/illustrations/<name>_<theme>.svg`). For example:

```css
.illustration {
  background-image: url('https://circuit.sumup.com/illustrations/bookings_dark.svg');
}
```
