# @sumup-oss/design-tokens

## 8.0.0-next.3

### Patch Changes

- [#2747](https://github.com/sumup-oss/circuit-ui/pull/2747) [`84091c5`](https://github.com/sumup-oss/circuit-ui/commit/84091c5fb2b8f8a1f95a55fc25ab37086a879562) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated the design token values for `headline-m-font-size`, `font-weight-semibold` and `font-weight-bold`.

## 8.0.0-next.2

### Major Changes

- [#2707](https://github.com/sumup-oss/circuit-ui/pull/2707) [`f8016eb`](https://github.com/sumup-oss/circuit-ui/commit/f8016ebe246005ed415ed9587ecdb76892e981c6) Thanks [@sirineJ](https://github.com/sirineJ)! - Raised the minimum Node.js version to 20+.

### Minor Changes

- [#2717](https://github.com/sumup-oss/circuit-ui/pull/2717) [`0fb5dc0`](https://github.com/sumup-oss/circuit-ui/commit/0fb5dc0d68221e0f63103883e6cd14ea801cf161) Thanks [@sirineJ](https://github.com/sirineJ)! - Updated several typography token values and replaced the component-specific letter spacing tokens with a unified one.

- [#2717](https://github.com/sumup-oss/circuit-ui/pull/2717) [`0fb5dc0`](https://github.com/sumup-oss/circuit-ui/commit/0fb5dc0d68221e0f63103883e6cd14ea801cf161) Thanks [@sirineJ](https://github.com/sirineJ)! - Updated new typography design tokens names by removing the `-typography` infix.

## 8.0.0-next.1

### Major Changes

- [#2654](https://github.com/sumup-oss/circuit-ui/pull/2654) [`55bf9ad`](https://github.com/sumup-oss/circuit-ui/commit/55bf9ad7569f1e1a4c739f4eac8df58ba9987ca2) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the default font from Aktiv Grotesk to Inter, a variable font. Variable fonts combine a continuous range of weights and other "axes" into a single file. This speeds up page load times and enables more creative freedom. Inter is a close match to Aktiv Grotesk, so users shouldn't notice a difference.

- [#2654](https://github.com/sumup-oss/circuit-ui/pull/2654) [`55bf9ad`](https://github.com/sumup-oss/circuit-ui/commit/55bf9ad7569f1e1a4c739f4eac8df58ba9987ca2) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a new `@sumup-oss/design-tokens/fonts.css` file containing the `@font-face` declarations to load the Inter font family. Refer to the documentation on [how to load fonts in your application](https://github.com/sumup-oss/circuit-ui/tree/main/packages/design-tokens#fonts).

### Minor Changes

- [#2653](https://github.com/sumup-oss/circuit-ui/pull/2653) [`33435cf`](https://github.com/sumup-oss/circuit-ui/commit/33435cf4a1a393bbb28fd0bcb9d63d8a2a6a5a60) Thanks [@connor-baer](https://github.com/connor-baer)! - Consolidated and renamed the `typography` tokens:

  | Old                                     | New                                 |
  | --------------------------------------- | ----------------------------------- |
  | `typography-title-one-font-size`        | `typography-display-l-font-size`    |
  | `typography-title-one-line-height`      | `typography-display-l-line-height`  |
  | `typography-title-two-font-size`        | `typography-display-m-font-size`    |
  | `typography-title-two-line-height`      | `typography-display-m-line-height`  |
  | `typography-title-three-font-size`      | `typography-display-m-font-size`    |
  | `typography-title-three-line-height`    | `typography-display-m-line-height`  |
  | `typography-title-four-font-size`       | `typography-display-s-font-size`    |
  | `typography-title-four-line-height`     | `typography-display-s-line-height`  |
  | `typography-headline-one-font-size`     | `typography-headline-l-font-size`   |
  | `typography-headline-one-line-height`   | `typography-headline-l-line-height` |
  | `typography-headline-two-font-size`     | `typography-headline-m-font-size`   |
  | `typography-headline-two-line-height`   | `typography-headline-m-line-height` |
  | `typography-headline-three-font-size`   | `typography-headline-m-font-size`   |
  | `typography-headline-three-line-height` | `typography-headline-m-line-height` |
  | `typography-headline-four-font-size`    | `typography-headline-s-font-size`   |
  | `typography-headline-four-line-height`  | `typography-headline-s-line-height` |
  | `typography-sub-headline-font-size`     | `typography-headline-s-font-size`   |
  | `typography-sub-headline-line-height`   | `typography-headline-s-line-height` |
  | `typography-body-large-font-size`       | `typography-body-l-font-size`       |
  | `typography-body-large-line-height`     | `typography-body-l-line-height`     |
  | `typography-body-one-font-size`         | `typography-body-m-font-size`       |
  | `typography-body-one-line-height`       | `typography-body-m-line-height`     |
  | `typography-body-two-font-size`         | `typography-body-s-font-size`       |
  | `typography-body-two-line-height`       | `typography-body-s-line-height`     |

## 8.0.0-next.0

### Major Changes

- [#2648](https://github.com/sumup-oss/circuit-ui/pull/2648) [`f583d05`](https://github.com/sumup-oss/circuit-ui/commit/f583d05d3af6c2ba68268ffb47b4099cecd89796) Thanks [@connor-baer](https://github.com/connor-baer)! - Renamed the package scope from `@sumup` to `@sumup-oss`. Replace `@sumup/design-tokens` with `@sumup-oss/design-tokens` in your `package.json` file, then update all imports:

  ```diff
  -import '@sumup/design-tokens/light.css';
  +import '@sumup-oss/design-tokens/light.css';
  ```

  [Circuit UI's ESLint plugin](https://circuit.sumup.com/?path=/docs/packages-eslint-plugin-circuit-ui--docs) offers the `renamed-package-scope` rule to automate updating the package imports.

## 7.3.1

### Patch Changes

- [#2613](https://github.com/sumup-oss/circuit-ui/pull/2613) [`a1f877a`](https://github.com/sumup-oss/circuit-ui/commit/a1f877acd0ddbcc934521371ce929709f13f04f8) Thanks [@connor-baer](https://github.com/connor-baer)! - Matched the interactive variants of the `fg-normal`, `fg-subtle`, `fg-on-strong`, and `fg-on-strong-subtle` color tokens to their default values.

## 7.3.0

### Minor Changes

- [#2551](https://github.com/sumup-oss/circuit-ui/pull/2551) [`d2115fb`](https://github.com/sumup-oss/circuit-ui/commit/d2115fba00c50668081ad40a34abce7abaa6d2a2) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated the `bg-normal-disabled`, `bg-subtle-hovered`, `bg-subtle-pressed`, `bg-highlight-disabled`, `bg-accent-hovered`,`bg-accent-pressed`, `bg-accent-strong-hovered`, `bg-accent-strong-pressed`, `bg-danger-hovered`, `bg-danger-pressed`, `bg-danger-disabled`, `bg-danger-strong-hovered`, `bg-danger-strong-pressed`, `fg-subtle-hovered`, `fg-danger-hovered`, `fg-danger-disabled`, `border-normal`, `border-subtle-hovered`, `border-danger`, `border-danger-hovered`, and `border-danger-disabled` color tokens.

## 7.2.0

### Minor Changes

- [`779a911`](https://github.com/sumup-oss/circuit-ui/commit/779a911bb080dfc129f471ab08a22cf7675adc33) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a dark theme. Import `@sumup/design-tokens/dark.css` for the standalone dark theme. Import `@sumup/design-tokens/dynamic.css` to switch between the light and dark themes automatically based on the system settings or explicitly using the `data-color-scheme` attribute.

- [`779a911`](https://github.com/sumup-oss/circuit-ui/commit/779a911bb080dfc129f471ab08a22cf7675adc33) Thanks [@connor-baer](https://github.com/connor-baer)! - Added scoped light and dark themes. Import `@sumup/design-tokens/light-scoped.css` or `@sumup/design-tokens/dark-scoped.css` to theme a subset of an application marked up with the `data-color-scheme` attribute.

### Patch Changes

- [`779a911`](https://github.com/sumup-oss/circuit-ui/commit/779a911bb080dfc129f471ab08a22cf7675adc33) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the `border-focus` color token value.

## 7.1.0

### Minor Changes

- [#2416](https://github.com/sumup-oss/circuit-ui/pull/2416) [`dcb816e`](https://github.com/sumup-oss/circuit-ui/commit/dcb816e84cc2edf26bd450d3f2a6f7a22ac30c38) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the order of the default font stack to prefer web safe fonts over system fonts. This provides a more consistent user experience across platforms, reduces layout shift when switching to SumUp's brand font, Aktiv Grotesk, and works around a (supposedly fixed) [Chrome bug](https://www.bram.us/2020/04/24/chrome-vs-blinkmacsystemfont-a-workaround/).

## 7.0.0

### Major Changes

- [#2355](https://github.com/sumup-oss/circuit-ui/pull/2355) [`43f357b`](https://github.com/sumup-oss/circuit-ui/commit/43f357b02f2dd8c358e0263d401a9e1bb3ddb80d) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed all colors from the legacy JavaScript theme object and theme prop type. Use the semantic color tokens instead:

  ```diff
  -color: ${theme.colors.p500};
  +color: var(--cui-fg-accent);
  ```

- [#2356](https://github.com/sumup-oss/circuit-ui/pull/2356) [`bc5e753`](https://github.com/sumup-oss/circuit-ui/commit/bc5e7531b42771ee04de3aa3f74aee537c9963e6) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the color scheme from blue to black & white.

## 6.2.0

### Minor Changes

- [#2302](https://github.com/sumup-oss/circuit-ui/pull/2302) [`815ae9d2`](https://github.com/sumup-oss/circuit-ui/commit/815ae9d2bec6b0feb74d5df50a0ba5304ac033fa) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the `--cui-fg-on-strong-subtle`, `--cui-fg-on-strong-subtle-hovered`, `--cui-fg-on-strong-subtle-pressed`, and `--cui-fg-on-strong-subtle-disabled` color tokens. Use them for secondary content that provides additional information on backgrounds ending with `-strong` in order to achieve the necessary contrast for accessibility.

## 6.1.0

### Minor Changes

- [#2296](https://github.com/sumup-oss/circuit-ui/pull/2296) [`bd4e7ec0`](https://github.com/sumup-oss/circuit-ui/commit/bd4e7ec091a05e526b01f94dcce9d37265c659e7) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated the `--cui-border-focus` color token to meet contrast requirements.

## 6.0.0

### Minor Changes

- [#2158](https://github.com/sumup-oss/circuit-ui/pull/2158) [`415c73dd`](https://github.com/sumup-oss/circuit-ui/commit/415c73dd70dc2720b44ead24cd4b9d7d77af3293) Thanks [@connor-baer](https://github.com/connor-baer)! - Exported all CSS custom properties as `@sumup/design-tokens/light.css`.

- [#2158](https://github.com/sumup-oss/circuit-ui/pull/2158) [`415c73dd`](https://github.com/sumup-oss/circuit-ui/commit/415c73dd70dc2720b44ead24cd4b9d7d77af3293) Thanks [@connor-baer](https://github.com/connor-baer)! - Deprecated the Emotion.js theme in favor of CSS custom properties. Use the [`circuit-ui/prefer-custom-properties`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/prefer-custom-properties) ESLint rule to automatically migrate your code.

## 5.3.0

### Minor Changes

- [#2040](https://github.com/sumup-oss/circuit-ui/pull/2040) [`fc006c27`](https://github.com/sumup-oss/circuit-ui/commit/fc006c275478dbea66be039160ad20701247448c) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a `schema` export that describes the shape of the new CSS custom properties.

## 5.2.0

### Minor Changes

- [`d4898da9`](https://github.com/sumup-oss/circuit-ui/commit/d4898da9a73c70e10691f043408407fbea4b1f7c) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated `fontStack.mono` to include more system fonts.

### Patch Changes

- [#2091](https://github.com/sumup-oss/circuit-ui/pull/2091) [`3334873d`](https://github.com/sumup-oss/circuit-ui/commit/3334873d33430fde670facaa0da311d63b1d259a) Thanks [@connor-baer](https://github.com/connor-baer)! - Upgraded all dependencies to their latest minor.

## 5.1.1

### Patch Changes

- [#2051](https://github.com/sumup-oss/circuit-ui/pull/2051) [`6b82b360`](https://github.com/sumup-oss/circuit-ui/commit/6b82b360e517fb4778c613739bb9c90466d24393) Thanks [@connor-baer](https://github.com/connor-baer)! - Refactored the theme to be fully static.

## 5.1.0

### Minor Changes

- [#1951](https://github.com/sumup-oss/circuit-ui/pull/1951) [`197f6851`](https://github.com/sumup-oss/circuit-ui/commit/197f6851c729512904112558cdac019d6fc1ed8e) Thanks [@connor-baer](https://github.com/connor-baer) [@robinmetral](https://github.com/robinmetral)! - Deprecated the legacy color tokens. Migrate to semantic color tokens instead. For context, refer to the [Figma documentation](https://www.figma.com/file/OgPQeoNZ2QoY7hZvy0ybk2/%F0%9F%8C%88-COLOR-TOKENS?node-id=913%3A3903&t=b9BsTOJnzKDomZ9E-4) (internal link). The new tokens are available as CSS custom properties, listed in the [Circuit UI theme documentation](https://circuit.sumup.com/?path=/docs/features-theme--docs).

## 5.0.0

### Major Changes

- [#1760](https://github.com/sumup-oss/circuit-ui/pull/1760) [`b8f129ee`](https://github.com/sumup-oss/circuit-ui/commit/b8f129eed5673a00a4e4b5deeed4494e5ee93912) Thanks [@robinmetral](https://github.com/robinmetral)! - Switched to rem units for typography design tokens. Do not override the root font-size in your global styles. See [The Surprising Truth About Pixels and Accessibility](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/).

## 4.0.1

### Patch Changes

- [#1846](https://github.com/sumup-oss/circuit-ui/pull/1846) [`e08e252e`](https://github.com/sumup-oss/circuit-ui/commit/e08e252eeabbc1be44406d25fe8c5b39a95cb99c) Thanks [@robinmetral](https://github.com/robinmetral)! - Adjusted the `confirm`, `notify` and `alert` brand colors.

## 4.0.0

### Major Changes

- [#1509](https://github.com/sumup-oss/circuit-ui/pull/1509) [`c7dfe6a4`](https://github.com/sumup-oss/circuit-ui/commit/c7dfe6a4b1b6c78a2477a8de2ac82a35a8f71dd6) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `zIndex.sidebar` token. Use `zIndex.navigation` instead.

* [#1526](https://github.com/sumup-oss/circuit-ui/pull/1526) [`ba059828`](https://github.com/sumup-oss/circuit-ui/commit/ba059828c3caec2cabf0a43118af27a8128e78a0) Thanks [@amelako](https://github.com/amelako)! - Removed the deprecated `success`, `warning` and `danger` legacy color names. Use `confirm`, `notify` and `alert` instead.

## 3.4.0

### Minor Changes

- [#1431](https://github.com/sumup-oss/circuit-ui/pull/1431) [`3f9585a4`](https://github.com/sumup-oss/circuit-ui/commit/3f9585a44744c67904b03fbc50d614104bfff927) Thanks [@amelako](https://github.com/amelako)! - Added new `info`, `confirm`, `alert`, and `notify` colors and deprecated the `success`, `warning`, and `danger` colors.

## 3.3.0

### Minor Changes

- [#1359](https://github.com/sumup-oss/circuit-ui/pull/1359) [`5804fd8d`](https://github.com/sumup-oss/circuit-ui/commit/5804fd8d720a7594bb880b9956a3310609cfbaa9) Thanks [@amelako](https://github.com/amelako)! - Added a new `zIndex.toast` value for the NotificationToast component in Circuit UI.

## 3.2.0

### Minor Changes

- [#1273](https://github.com/sumup-oss/circuit-ui/pull/1273) [`ed0c4f83`](https://github.com/sumup-oss/circuit-ui/commit/ed0c4f83258dccc93686ee7e5a282c1c720c6543) Thanks [@robinmetral](https://github.com/robinmetral)! - Added new `typography.title` and `typography.bodyLarge` values to the theme.

## 3.1.1

### Patch Changes

- [#1262](https://github.com/sumup-oss/circuit-ui/pull/1262) [`d619b6e1`](https://github.com/sumup-oss/circuit-ui/commit/d619b6e1cfe36f031a2e8604ec05ff6a1663f33d) Thanks [@hris27](https://github.com/hris27)! - Updated `themePropType` to match the current state of the Circuit UI theme.

## 3.1.0

### Minor Changes

- [#1108](https://github.com/sumup-oss/circuit-ui/pull/1108) [`c077b900`](https://github.com/sumup-oss/circuit-ui/commit/c077b90056aa9113910640ff7ebd93b0ff02b8ae) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a new `zIndex.navigation` token and deprecated the `zIndex.sidebar` token.

## 3.0.1

### Patch Changes

- [#1097](https://github.com/sumup-oss/circuit-ui/pull/1097) [`7f52ad7d`](https://github.com/sumup-oss/circuit-ui/commit/7f52ad7de6468b2cb382d7818f28c39acba86efe) Thanks [@robinmetral](https://github.com/robinmetral)! - Bumped package versions to release the stable v3.

## 3.0.0

### Major Changes

- [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the `drawer` and `select` z-index values from the design tokens. Use `input` instead of `select`.

* [#884](https://github.com/sumup-oss/circuit-ui/pull/884) [`eb9e0b47`](https://github.com/sumup-oss/circuit-ui/commit/eb9e0b474e675f13c9876e22857a170665e9a92f) Thanks [@amelako](https://github.com/amelako)! - Replaced the typography design tokens' `heading`, `subHeading` and `text` properties by `headline`, `subHeadline`, and `body`. These are used by the new semantic Headline, SubHeadline, and Body components in Circuit UI.

* [#980](https://github.com/sumup-oss/circuit-ui/pull/980) [`900e6bc4`](https://github.com/sumup-oss/circuit-ui/commit/900e6bc465e4f909ab000403da3d17724f2ab73e) Thanks [@robinmetral](https://github.com/robinmetral)! - Updated the design token's borderRadius properties. The 1px and 6px values are removed and a 16px value is added, and the sizes are renamed.

- [#1039](https://github.com/sumup-oss/circuit-ui/pull/1039) [`9a35c9a7`](https://github.com/sumup-oss/circuit-ui/commit/9a35c9a7d9c281a5a5a035ca04c52e5712f89821) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed all breakpoints to media query strings. The consistency helps predictability and allows the breakpoint values to be passed to `window.matchMedia` directly.

### Minor Changes

- [#984](https://github.com/sumup-oss/circuit-ui/pull/984) [`7879a990`](https://github.com/sumup-oss/circuit-ui/commit/7879a9901c06e389135e0d22697b97669c485949) Thanks [@amelako](https://github.com/amelako)! - Added a new icon size `tera` (48px).

- [#1039](https://github.com/sumup-oss/circuit-ui/pull/1039) [`9a35c9a7`](https://github.com/sumup-oss/circuit-ui/commit/9a35c9a7d9c281a5a5a035ca04c52e5712f89821) Thanks [@connor-baer](https://github.com/connor-baer)! - Added `untilGiga` and `untilTera` breakpoints and media queries.

## 2.2.0

### Minor Changes

- [#890](https://github.com/sumup-oss/circuit-ui/pull/890) [`e6c39366`](https://github.com/sumup-oss/circuit-ui/commit/e6c393662f6b736c3b3c80ed29f2805c58d93204) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated the body background color to white and darkened the overlay color.

- [#962](https://github.com/sumup-oss/circuit-ui/pull/962) [`35ce0033`](https://github.com/sumup-oss/circuit-ui/commit/35ce0033e2eb9305a44796e603da84439f851936) Thanks [@robinmetral](https://github.com/robinmetral)! - Add a new peta borderRadius size of 12px

## 2.1.2

### Patch Changes

- [#933](https://github.com/sumup-oss/circuit-ui/pull/933) [`e4c940bc`](https://github.com/sumup-oss/circuit-ui/commit/e4c940bc803623cab1e36eecc122d67aeb9ca8c8) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed two typos in the theme prop type: `theme.breakpoint` → `theme.breakpoints` and `theme.mx` → `theme.mq`.
