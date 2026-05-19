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
    <td rowspan="4">Feedback</td>
    <td>Success</td>
    <td><code>"success"</code></td>
  </tr>
  <tr>
    <td>Error</td>
    <td><code>"error"</code></td>
  </tr>
  <tr>
    <td>Warning</td>
    <td><code>"warning"</code></td>
  </tr>
  <tr>
    <td>Pending</td>
    <td><code>"pending"</code></td>
  </tr>
  <tr>
    <td rowspan="3">Empty states</td>
    <td>Generic</td>
    <td><code>"empty"</code></td>
  </tr>
  <tr>
    <td>No data</td>
    <td><code>"no-data"</code></td>
  </tr>
  <tr>
    <td>No results</td>
    <td><code>"no-results"</code></td>
  </tr>
  <tr>
    <td rowspan="6">Communication</td>
    <td>Celebration</td>
    <td><code>"celebration"</code></td>
  </tr>
  <tr>
    <td>Rewards</td>
    <td><code>"rewards"</code></td>
  </tr>
  <tr>
    <td>Support</td>
    <td><code>"support"</code></td>
  </tr>
  <tr>
    <td>Security</td>
    <td><code>"security"</code></td>
  </tr>
  <tr>
    <td>Referral</td>
    <td><code>"referral"</code></td>
  </tr>
  <tr>
    <td>Messages</td>
    <td><code>"messages"</code></td>
  </tr>
  <tr>
    <td rowspan="2">System</td>
    <td>Device problems</td>
    <td><code>"device-problems"</code></td>
  </tr>
  <tr>
    <td>Offline</td>
    <td><code>"offline"</code></td>
  </tr>
  <tr>
    <td rowspan="6">SumUp Devices</td>
    <td>Solo</td>
    <td><code>"solo"</code></td>
  </tr>
  <tr>
    <td>POS Lite + Solo</td>
    <td><code>"pos-lite-solo"</code></td>
  </tr>
  <tr>
    <td>POS Stand</td>
    <td><code>"pos-stand"</code></td>
  </tr>
  <tr>
    <td>SumUp Air</td>
    <td><code>"sumup-air"</code></td>
  </tr>
  <tr>
    <td>Android Terminal</td>
    <td><code>"terminal"</code></td>
  </tr>
  <tr>
    <td>Kiosk</td>
    <td><code>"kiosk"</code></td>
  </tr>
  <tr>
    <td rowspan="9">Merchant Products</td>
    <td>Bank</td>
    <td><code>"bank"</code></td>
  </tr>
  <tr>
    <td>Invoices</td>
    <td><code>"invoices"</code></td>
  </tr>
  <tr>
    <td>Online Payments / Online Store</td>
    <td><code>"online-payments"</code></td>
  </tr>
  <tr>
    <td>Payment Links</td>
    <td><code>"payment-links"</code></td>
  </tr>
  <tr>
    <td>Bookings</td>
    <td><code>"bookings"</code></td>
  </tr>
  <tr>
    <td>Tap to Pay</td>
    <td><code>"tap-to-pay"</code></td>
  </tr>
  <tr>
    <td>Gift Cards</td>
    <td><code>"gift-card"</code></td>
  </tr>
  <tr>
    <td>Cash advance</td>
    <td><code>"cash-advance"</code></td>
  </tr>
  <tr>
    <td>Loyalty</td>
    <td><code>"loyalty"</code></td>
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

Illustrations come in three sizes: 
- Small `"s"`: 120 x 120 px
- Medium `"m"`: 240 x 240 px
- Large `"l"`: 320 x 320 px

They default to size `"m"`. Use the `size` prop to show one of the other sizes (`"s"` or `"l"`) instead:

```tsx
import { Illustration } from '@sumup-oss/circuit-ui';

const SuccessScreen = ({ description }) => (
  <div>
    <Illustration variant="success" size="l" aria-labelledby="success-description" />
    <span id="success-description">{description}</span>
  </div>
);
```

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

Alternatively, you can manually construct the URL (`https://circuit.sumup.com/icons/v2/<variant>_<size>_<theme>.svg`). For example:

```css
.illustration {
  background-image: url('https://circuit.sumup.com/icons/v2/success_s_light.svg');
}
```
