# @sumup/circuit-ui

## 2.6.1

### Patch Changes

- [#1010](https://github.com/sumup-oss/circuit-ui/pull/1010) [`9127352d`](https://github.com/sumup-oss/circuit-ui/commit/9127352d2234b175bbabefa49f23a71d269f356d) Thanks [@felixjung](https://github.com/felixjung)! - Do not render a placeholder in the `Select` component when a `defaultValue` is passed.

## 2.6.0

### Minor Changes

- [#922](https://github.com/sumup-oss/circuit-ui/pull/922) [`feb6b32a`](https://github.com/sumup-oss/circuit-ui/commit/feb6b32a61964a79d87492e99da73a2a63562811) Thanks [@robinmetral](https://github.com/robinmetral)! - Added a new `ImageInput` component to allow users to upload images.

* [#922](https://github.com/sumup-oss/circuit-ui/pull/922) [`feb6b32a`](https://github.com/sumup-oss/circuit-ui/commit/feb6b32a61964a79d87492e99da73a2a63562811) Thanks [@robinmetral](https://github.com/robinmetral)! - Added a new `Avatar` component to display identity or object images.

- [#890](https://github.com/sumup-oss/circuit-ui/pull/890) [`e6c39366`](https://github.com/sumup-oss/circuit-ui/commit/e6c393662f6b736c3b3c80ed29f2805c58d93204) Thanks [@connor-baer](https://github.com/connor-baer)! - Tweaked the styles of the Card, CardList, Modal, Notification, and Table components to increase the color contrast with the new white background color. The `shadow` prop of the Card component has been deprecated and replaced with a single outline.

## 2.5.0

### Minor Changes

- [#924](https://github.com/sumup-oss/circuit-ui/pull/924) [`4660f112`](https://github.com/sumup-oss/circuit-ui/commit/4660f112f973793245532a0e28517068c8f64e73) Thanks [@mykolaharmash](https://github.com/mykolaharmash)! - Added support for `null` or `undefined` values in `<Table>` cells.

* [#932](https://github.com/sumup-oss/circuit-ui/pull/932) [`ee278194`](https://github.com/sumup-oss/circuit-ui/commit/ee27819499f4b29adbc628f2cfba7fae2b1907a0) Thanks [@connor-baer](https://github.com/connor-baer)! - Added an `optionalLabel` prop to the Input and Select components. The "(optional)" label is displayed in lighter grey after the main label when the field is not required.

- [#946](https://github.com/sumup-oss/circuit-ui/pull/946) [`a089cf1c`](https://github.com/sumup-oss/circuit-ui/commit/a089cf1c883d409006452c7ddd9b82677a8b5547) Thanks [@connor-baer](https://github.com/connor-baer)! - Added `removeModal` and `isModalOpen` properties to `useModal` hook and deprecated the `getModal` property.

* [#935](https://github.com/sumup-oss/circuit-ui/pull/935) [`6c881cb6`](https://github.com/sumup-oss/circuit-ui/commit/6c881cb68636281694faa10aa556ee9146146b23) Thanks [@connor-baer](https://github.com/connor-baer)! - Added compatibility with the new [JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.htmlhttps://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) which was introduced in React 17.

- [#923](https://github.com/sumup-oss/circuit-ui/pull/923) [`c41a7353`](https://github.com/sumup-oss/circuit-ui/commit/c41a73532bfd373be6a650bb15bd8a802182a135) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a `destructive` prop to the Button component to be used for irreversible actions that require special care from users.

* [#945](https://github.com/sumup-oss/circuit-ui/pull/945) [`abf2c10b`](https://github.com/sumup-oss/circuit-ui/commit/abf2c10b4da586199e46ea639ac3e1c1c3b1e99c) Thanks [@connor-baer](https://github.com/connor-baer)! - Added `inset` option to the `focusOutline` style mixin. This should only be used when the outline cannot be shown outside the element, for example when the overflow is hidden.

### Patch Changes

- [#936](https://github.com/sumup-oss/circuit-ui/pull/936) [`b0f243a3`](https://github.com/sumup-oss/circuit-ui/commit/b0f243a3ada85d3e5f192111ddf0ed206b0e4d18) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the alignment of long, multiline labels in the RadioButton component (#934).

## 2.4.3

### Patch Changes

- [#908](https://github.com/sumup-oss/circuit-ui/pull/908) [`7a76802f`](https://github.com/sumup-oss/circuit-ui/commit/7a76802f5b54412a0989fbf5fea4760d6bf1ddbc) Thanks [@connor-baer](https://github.com/connor-baer)! - Prevent the Aggregator in the Sidebar from rendering its children when they're just an empty array, fixes #907.

## 2.4.2

### Patch Changes

- Updated dependencies [[`02558395`](https://github.com/sumup-oss/circuit-ui/commit/025583954df06c95c79584e8639936a03e7f77f4)]:
  - @sumup/icons@1.6.2

## 2.4.1

### Patch Changes

- [#852](https://github.com/sumup-oss/circuit-ui/pull/852) [`95be2245`](https://github.com/sumup-oss/circuit-ui/commit/95be224507274a2e21d0033151b4c02b0f4d3b5c) Thanks [@robinmetral](https://github.com/robinmetral)! - Migrated the Table component to TypeScript without any changes to its API.

* [#852](https://github.com/sumup-oss/circuit-ui/pull/852) [`95be2245`](https://github.com/sumup-oss/circuit-ui/commit/95be224507274a2e21d0033151b4c02b0f4d3b5c) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed an accessibility issue where Table header cells weren't getting the relevant scope (`col` or `row`).

* Updated dependencies [[`1912119f`](https://github.com/sumup-oss/circuit-ui/commit/1912119fd998ab9d4000e11db5dfa653fdd8c877), [`1912119f`](https://github.com/sumup-oss/circuit-ui/commit/1912119fd998ab9d4000e11db5dfa653fdd8c877)]:
  - @sumup/icons@1.6.1
