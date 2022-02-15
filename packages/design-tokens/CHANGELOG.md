# @sumup/design-tokens

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

## 3.1.0-canary.0

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

## 3.0.0-next.1

### Major Changes

- [#1039](https://github.com/sumup-oss/circuit-ui/pull/1039) [`9a35c9a7`](https://github.com/sumup-oss/circuit-ui/commit/9a35c9a7d9c281a5a5a035ca04c52e5712f89821) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed all breakpoints to media query strings. The consistency helps predictability and allows the breakpoint values to be passed to `window.matchMedia` directly.

### Minor Changes

- [#1039](https://github.com/sumup-oss/circuit-ui/pull/1039) [`9a35c9a7`](https://github.com/sumup-oss/circuit-ui/commit/9a35c9a7d9c281a5a5a035ca04c52e5712f89821) Thanks [@connor-baer](https://github.com/connor-baer)! - Added `untilGiga` and `untilTera` breakpoints and media queries.

## 2.2.0

### Minor Changes

- [#890](https://github.com/sumup-oss/circuit-ui/pull/890) [`e6c39366`](https://github.com/sumup-oss/circuit-ui/commit/e6c393662f6b736c3b3c80ed29f2805c58d93204) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated the body background color to white and darkened the overlay color.

- [#962](https://github.com/sumup-oss/circuit-ui/pull/962) [`35ce0033`](https://github.com/sumup-oss/circuit-ui/commit/35ce0033e2eb9305a44796e603da84439f851936) Thanks [@robinmetral](https://github.com/robinmetral)! - Add a new peta borderRadius size of 12px

## 2.1.2

### Patch Changes

- [#933](https://github.com/sumup-oss/circuit-ui/pull/933) [`e4c940bc`](https://github.com/sumup-oss/circuit-ui/commit/e4c940bc803623cab1e36eecc122d67aeb9ca8c8) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed two typos in the theme prop type: `theme.breakpoint` → `theme.breakpoints` and `theme.mx` → `theme.mq`.
