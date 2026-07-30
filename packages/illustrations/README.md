<div align="center">

# @sumup-oss/illustrations

Sumup's illustration library, part of the SumUp Circuit Design System.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup-oss/illustrations)](https://www.npmjs.com/package/@sumup-oss/illustrations) [![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/circuit-ui)](https://codecov.io/gh/sumup-oss/circuit-ui) [![License](https://img.shields.io/github/license/sumup-oss/circuit-ui)](https://github.com/sumup-oss/circuit-ui/tree/main/packages/illustrations/LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md)

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

### Import the Illustration component

Import the Illustration component and chose the variant you want to use:

<table>
<thead>
  <tr>
    <th scope="col">Category</th>
    <th scope="col">Illustration</th>
    <th scope="col">Code</th>
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

```tsx
import { Illustration } from '@sumup-oss/illustrations';

const SuccessScreen = ({ description }) => (
  <div>
    <Illustration variant="success" aria-labelledby="success-description" />
    <span id="success-description">{description}</span>
  </div>
);
```

Illustrations come in a default size of 240 x 240 px. You can apply your own size by using the `height` or `width` props, all while respecting a 1:1 aspect ratio.

If a theme is not specified, the illustration will render in the current theme (if available) or default to light.
If a theme is provided, the illustration will be rendered in the specified theme.

```tsx
import { Illustration } from '@sumup-oss/circuit-ui';

const SuccessScreen = ({ description }) => (
  <div>
    <Illustration variant="success" theme="dark" aria-labelledby="success-description"/>
    <span id="success-description">{description}</span>
  </div>
);
```

#### Accessibility
If the illustration is purely decorative, you don't need to provide any extra props and the illustration will be ignored by screen readers (role="presentation").
If not, and if there is no adjascent text conveing the meaning of the illustration, provide an `alt` prop ([Success Criterion 1.1.1 Non-text Content)](https://www.w3.org/TR/WCAG22/#non-text-content).

### Load from a URL

The latest version of the illustrations library is [automatically deployed](https://circuit.sumup.com/illustrations) to [Vercel](https://vercel.com/). The files are hosted behind a global CDN, so they load quickly for all users. Use the `getIllustrationURL` helper function to obtain the full URL with type-safety:

```tsx
import { getIllustrationURL } from '@sumup-oss/illustrations';

const SuccessScreen = ({ message }) => (
  <div>
    <img src={getIllustrationURL('success', 's', 'light')} aria-labelledby="success-description" />
    <span id="success-description">{message}</span>
  </div>
);
```

Alternatively, you can manually construct the URL (`https://circuit.sumup.com/icons/v2/<variant>_<theme>.svg`). For example:

```css
.illustration {
  background-image: url('https://circuit.sumup.com/icons/v2/success_s_light.svg');
}
```
