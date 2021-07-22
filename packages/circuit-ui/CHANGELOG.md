# @sumup/circuit-ui

## 3.0.0-next.3

### Minor Changes

- [#1023](https://github.com/sumup-oss/circuit-ui/pull/1023) [`07614c5f`](https://github.com/sumup-oss/circuit-ui/commit/07614c5f618a6904df66fb149fb44856756e0d80) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the `useClickOutside`, `useEscapeKey`, and `useFocusList` hooks which can be used to make custom components more keyboard accessible.

### Patch Changes

- [#1046](https://github.com/sumup-oss/circuit-ui/pull/1046) [`a39ee223`](https://github.com/sumup-oss/circuit-ui/commit/a39ee22339bd7f9db365ebf6d9cbcb481bf40486) Thanks [@connor-baer](https://github.com/connor-baer)! - Improved the Popover's focus handling to prevent it from hijacking the focus on render.

- Updated dependencies [[`9a35c9a7`](https://github.com/sumup-oss/circuit-ui/commit/9a35c9a7d9c281a5a5a035ca04c52e5712f89821), [`9a35c9a7`](https://github.com/sumup-oss/circuit-ui/commit/9a35c9a7d9c281a5a5a035ca04c52e5712f89821)]:
  - @sumup/design-tokens@3.0.0-next.1

## 3.0.0-next.2

### Major Changes

- [#1008](https://github.com/sumup-oss/circuit-ui/pull/1008) [`e76f2d03`](https://github.com/sumup-oss/circuit-ui/commit/e76f2d03e2525c0ddcae9e5590f7ee086e7520f7) Thanks [@connor-baer](https://github.com/connor-baer)! - Made the `as` prop required in the `Headline` and `SubHeadline` components. Intentionally setting the heading level ensures a consistent and accessible page structure.

* [#1014](https://github.com/sumup-oss/circuit-ui/pull/1014) [`2e0e4381`](https://github.com/sumup-oss/circuit-ui/commit/2e0e43816bbb15281cd4afdc5aca6c0d89d6e669) Thanks [@connor-baer](https://github.com/connor-baer)! - Restricted the `Headline`'s and `SubHeadline`'s `as` prop to heading elements.

### Minor Changes

- [#1022](https://github.com/sumup-oss/circuit-ui/pull/1022) [`afb2eb29`](https://github.com/sumup-oss/circuit-ui/commit/afb2eb29c41753caf6c3d797087629907bdba9bc) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the `focusVisible` style mixin that shows a focus outline only when the user agent determines via heuristics that the focus should be made evident on the element (see [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)).

### Patch Changes

- [#1013](https://github.com/sumup-oss/circuit-ui/pull/1013) [`d5e528bf`](https://github.com/sumup-oss/circuit-ui/commit/d5e528bfb12bd998f33629cf9cc1a865cda1862f) Thanks [@amelako](https://github.com/amelako)! - Extended the Popover component to accept custom [modifiers](https://popper.js.org/docs/v2/modifiers/), moved the open state outside of the component, and improved accessibility features.

* [#1020](https://github.com/sumup-oss/circuit-ui/pull/1020) [`cee2c0c4`](https://github.com/sumup-oss/circuit-ui/commit/cee2c0c4011f12d3c5bb3ad9633183ba477cb7b3) Thanks [@amelako](https://github.com/amelako)! - Fixed a bug in the Popover component to correctly stack the popover content on top of the overlay on mobile.

## 3.0.0-next.1

### Major Changes

- [#1000](https://github.com/sumup-oss/circuit-ui/pull/1000) [`8f181a6c`](https://github.com/sumup-oss/circuit-ui/commit/8f181a6cd08c113017f2afbf2e58f5e8cf08836f) Thanks [@robinmetral](https://github.com/robinmetral)! - Improved keyboard and accessibility support.

  - Now the Popover can be closed using Escape key.
  - The trigger component now accepts the `aria-haspopup` and `aria-controls` props.

* [#1000](https://github.com/sumup-oss/circuit-ui/pull/1000) [`8f181a6c`](https://github.com/sumup-oss/circuit-ui/commit/8f181a6cd08c113017f2afbf2e58f5e8cf08836f) Thanks [@robinmetral](https://github.com/robinmetral)! - Extended the Popover list item state with disabled variant.

### Minor Changes

- [#997](https://github.com/sumup-oss/circuit-ui/pull/997) [`4e6bbfea`](https://github.com/sumup-oss/circuit-ui/commit/4e6bbfeaccacfdf558488cfd20151ea25b23560d) Thanks [@robinmetral](https://github.com/robinmetral)! - Exported the missing style mixins from Circuit.

* [#998](https://github.com/sumup-oss/circuit-ui/pull/998) [`43b1403a`](https://github.com/sumup-oss/circuit-ui/commit/43b1403ad07f149c8f2daf0cb147a911419be968) Thanks [@robinmetral](https://github.com/robinmetral)! - Extended the typography-sizes codemod to transform the Anchor component and warn of any necessary manual migration.

### Patch Changes

- [#1007](https://github.com/sumup-oss/circuit-ui/pull/1007) [`efe0210e`](https://github.com/sumup-oss/circuit-ui/commit/efe0210e0c0b076f942a2aae83858f7dba4714e3) Thanks [@connor-baer](https://github.com/connor-baer)! - Refactored the modal components to consistently dispatch tracking events.

## 3.0.0

### Major Changes

- [#960](https://github.com/sumup-oss/circuit-ui/pull/960) [`1a1a3646`](https://github.com/sumup-oss/circuit-ui/commit/1a1a36466e096c20b0dd19dc468359d65341e0fe) Thanks [@robinmetral](https://github.com/robinmetral)! - The `TableHeader`, `TableRow` and `TableCell` components are no longer exported from Circuit. They are only used internally by the `Table` component and should not be used directly.

* [#979](https://github.com/sumup-oss/circuit-ui/pull/979) [`3cfefac0`](https://github.com/sumup-oss/circuit-ui/commit/3cfefac08339d8b45291b892b74a182226336b9b) Thanks [@robinmetral](https://github.com/robinmetral)! - Renamed the NotificationBanner component to NotificationCard. This frees up the NotificationBanner namespace for a new component that we will introduce in `v3.x` (🤖 _component-names-v3_).

- [#972](https://github.com/sumup-oss/circuit-ui/pull/972) [`95488037`](https://github.com/sumup-oss/circuit-ui/commit/95488037472ced5952a41b55d67872ae2b2355d8) Thanks [@connor-baer](https://github.com/connor-baer)! - Replaced the deprecated `text[Kilo|Mega|Giga]` style mixins by a single `typography` mixin, and removed the deprecated `heading[Kilo|Mega|Giga|Tera|Peta|Exa|Zetta]` and `subHeading[Kilo|Mega]` style mixins.

* [#992](https://github.com/sumup-oss/circuit-ui/pull/992) [`b898410e`](https://github.com/sumup-oss/circuit-ui/commit/b898410ef865d31b8b1d9b62c2928069e4d9f899) Thanks [@robinmetral](https://github.com/robinmetral)! - Switched to the new JSX transform with automatic runtime. You will need to update your Babel config to use Emotion's JSX runtime. For example, with Next.js and Emotion 10:

  ```json
  {
    "presets": [
      [
        "next/babel",
        {
          "preset-react": {
            "runtime": "automatic",
            "importSource": "@emotion/core"
          }
        }
      ]
    ],
    "plugins": [["babel-plugin-emotion", { "cssPropOptimization": true }]]
  }
  ```

- [#984](https://github.com/sumup-oss/circuit-ui/pull/984) [`7879a990`](https://github.com/sumup-oss/circuit-ui/commit/7879a9901c06e389135e0d22697b97669c485949) Thanks [@amelako](https://github.com/amelako)! - Increased the Button sizes to match other form components and renamed the default size from `mega` to `giga`. These changes can be codemodded (🤖 _button-default-size_).

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Harmonized the label prop names across components to follow the `actionLabel` pattern (🤖 _label-prop-names_).

  - `CardHeader`: `labelCloseButton` 👉 `closeButtonLabel`
  - `Hamburger`: `labelActive` 👉 `activeLabel`, `labelInActive` 👉 `inactiveLabel`
  - `Tag`: `labelRemoveButton` 👉 `removeButtonLabel`
  - `Toggle`: `labelChecked` 👉 `checkedLabel`, `labelUnchecked` 👉 `uncheckedLabel`

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Enforced accessible labels in several components. This is an accessibility requirement. If the labels are not provided, the interaction will be disabled.

  - A `SearchInput` requires a `clearLabel` when it is clearable
  - A `Tag` requires a `removeButtonLabel` when it is removable
  - A `CardHeader` requires a `labelCloseButton` when it is dismissible
  - A `Table` header requires a `sortLabel` when its column is sortable

* [#884](https://github.com/sumup-oss/circuit-ui/pull/884) [`eb9e0b47`](https://github.com/sumup-oss/circuit-ui/commit/eb9e0b474e675f13c9876e22857a170665e9a92f) Thanks [@amelako](https://github.com/amelako)! - The new semantic typography components make it clear when each should be used, are flexible enough to cover all use cases. To represent more semantic variations some of the sizes have been removed and new size names added.

  #### Headline

  Renamed the `Heading` component to `Headline` and mapped the styles to the new ones. These changes can be codemodded (🤖 _component-names-v3_).

  The `size` prop has been adapted to accept the new size numbers. For the `Headline` component, **_exa_** and **_peta_** should be migrated to **_one_**, **_tera_** to **_two_**, **_giga_** to **_three_**, and **_mega_** and **_kilo_** to **_four_** (🤖 _typography-sizes_).

  The uncommonly used `zetta` size should be migrated manually, if possible to `one`, or alternatively to a `2.625rem` size (with `1rem` = `16px`).

  Usage example:

  ```diff
  -  <Heading size="kilo" />
  +  <Headline size="four" />
  ```

  #### SubHeadline

  Renamed the `SubHeading` component to `SubHeadline` and mapped the styles to the new ones (🤖 _component-names-v3_). The `SubHeadline` component now uses only one size value, so the `size` prop should be removed (🤖 _typography-sizes_).

  #### Body, Anchor, List

  The `Text` component has been renamed to `Body` (🤖 _component-names-v3_).

  The `size` prop has been adapted to accept the new size numbers. For the `Body`, `Anchor` and `List` components, **_mega_** should be migrated to **_one_**, and **_kilo_** to **_two_** (🤖 _typography-sizes_).

  The uncommonly used `giga` size should be migrated manually, if possible to `one`, or alternatively to a `1.125rem` size (with `1rem` = `16px`).

  Usage example:

  ```diff
  -  <Text size="mega" />
  +  <Body size="one" />
  ```

  The `Text` and `Anchor` components' `bold` prop has been removed. Use the `variant="highlight"` prop instead (🤖 _body-variant-highlight_).

  Usage example:

  `<Body variant="highlight">bold</Body>`

  The `Text` and `Anchor` components' `italic` and `strike` props have been removed. Use custom styles instead.

  The `Blockquote` component has been removed and replaced by the `Body` component with `variant="quote"`. This should be migrated manually.

  Usage example:

  `<Body variant="quote">quote</Body>`

- [#960](https://github.com/sumup-oss/circuit-ui/pull/960) [`1a1a3646`](https://github.com/sumup-oss/circuit-ui/commit/1a1a36466e096c20b0dd19dc468359d65341e0fe) Thanks [@robinmetral](https://github.com/robinmetral)! - Default `data-testid`s are no longer built into the `Table` component. They can still be passed manually. We also recommend [querying by role](https://testing-library.com/docs/queries/about/#priority) in tests, for them to resemble how users interact with the code. You can find examples in the component's specs.

* [#943](https://github.com/sumup-oss/circuit-ui/pull/943) [`0543719b`](https://github.com/sumup-oss/circuit-ui/commit/0543719bfceaf616829a223f9e4f306539fbcc15) Thanks [@mykolaharmash](https://github.com/mykolaharmash)! - `Selector` now has multiple `size` options. `SelectorGroup` is changed to horizontal layout and to be inline element by default with an option to stretch to full width.

* [#985](https://github.com/sumup-oss/circuit-ui/pull/985) [`61c15cf7`](https://github.com/sumup-oss/circuit-ui/commit/61c15cf7a5a23fb723a2d9a0b1434639bc8ae700) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the experimental static styles extraction feature.

- [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Enforced the `Input` and `Select`'s built-in `label` prop. Do not use the `Label` component separately and pass the label as a prop instead.

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the `ProgressBar`'s deprecated `children` prop. Use the `label` prop instead.

- [#960](https://github.com/sumup-oss/circuit-ui/pull/960) [`1a1a3646`](https://github.com/sumup-oss/circuit-ui/commit/1a1a36466e096c20b0dd19dc468359d65341e0fe) Thanks [@robinmetral](https://github.com/robinmetral)! - The `TableHeader`, `TableRow` and `TableCell` components are no longer exported from Circuit. They should only be used internally by the `Table` component.

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `shadow` prop from the `Card`, shadows have been replaced by a single outline.

- [#984](https://github.com/sumup-oss/circuit-ui/pull/984) [`7879a990`](https://github.com/sumup-oss/circuit-ui/commit/7879a9901c06e389135e0d22697b97669c485949) Thanks [@amelako](https://github.com/amelako)! - Aligned the heights of all form components to be consistent. The new size values are:

  | Size name | Value |                 Usage                 |
  | --------- | :---: | :-----------------------------------: |
  | `giga`    | 48px  |       Default for web + mobile        |
  | `kilo`    | 32px  |     Dense layout for web + mobile     |
  | `byte`    | 24px  | Extreme dense layout for web + mobile |

  Here's an overview of how the component heights have changed:

  | Component                     | Old height | New height |
  | ----------------------------- | :--------: | :--------: |
  | Button and derived components |    40px    |    48px    |
  | Input and derived components  |    40px    |    48px    |
  | Select                        |    40px    |    48px    |
  | Tabs                          |    80px    |    48px    |
  | Tag                           |    34px    |    32px    |

- [#960](https://github.com/sumup-oss/circuit-ui/pull/960) [`1a1a3646`](https://github.com/sumup-oss/circuit-ui/commit/1a1a36466e096c20b0dd19dc468359d65341e0fe) Thanks [@robinmetral](https://github.com/robinmetral)! - Changed the signature of the Table's custom onSortBy method. The `nextDirection` argument moved to the third position (`(index, nextDirection, rows)` 👉 `(index, rows, nextDirection)`) and can now be `undefined` (instead of `null` in the previous implementation).

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the `data-testid` attribute from the `CardHeader`'s close button. Use `queryByRole('button')` in your tests instead.

- [#949](https://github.com/sumup-oss/circuit-ui/pull/949) [`4e636205`](https://github.com/sumup-oss/circuit-ui/commit/4e6362052643b86d904acd1dbe9b52768e8b57c0) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the exports of the `Modal`, `ModalWrapper`, `ModalHeader`, `ModalFooter`, `ModalContext`, and `ModalConsumer` components. Use the `useModal` hook instead.

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the aggregate `styleHelpers` export. Import each style mixin directly instead.

- [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the `themePropType` export from `@sumup/circuit-ui`. Import it from `@sumup/design-tokens` instead.

* [#944](https://github.com/sumup-oss/circuit-ui/pull/944) [`2628fce1`](https://github.com/sumup-oss/circuit-ui/commit/2628fce1b93dd5a1ef1fc4b05a6a29ccf5469f9d) Thanks [@amelako](https://github.com/amelako)! - Rebuilt the `Popover` component. It now uses Popper v2 and comes with a refreshed component API.

- [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `withComponents` HOC. Use the `useComponents` hook instead.

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `Spacing` component. Use the `spacing` style mixin instead.

- [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the `onClick` prop from the `Badge`. Badges are not meant to be interactive and should only communicate the status of an element. Use the Tag component for interactive elements instead. The `primary` variant of the Badge was also removed. Use the `neutral` variant instead.

### Minor Changes

- [#984](https://github.com/sumup-oss/circuit-ui/pull/984) [`7879a990`](https://github.com/sumup-oss/circuit-ui/commit/7879a9901c06e389135e0d22697b97669c485949) Thanks [@amelako](https://github.com/amelako)! - Added a `size` prop to the Spinner component. The possible values are `byte`, `kilo` (default), and `giga`.

* [#884](https://github.com/sumup-oss/circuit-ui/pull/884) [`eb9e0b47`](https://github.com/sumup-oss/circuit-ui/commit/eb9e0b474e675f13c9876e22857a170665e9a92f) Thanks [@amelako](https://github.com/amelako)! - Added new `success`, `error` and `subtle` variants to the `Body` and `Anchor` component.

### Patch Changes

- [#980](https://github.com/sumup-oss/circuit-ui/pull/980) [`900e6bc4`](https://github.com/sumup-oss/circuit-ui/commit/900e6bc465e4f909ab000403da3d17724f2ab73e) Thanks [@robinmetral](https://github.com/robinmetral)! - Tweaked components (`Anchor`, `InlineMessage`, `SearchInput`, `Selector`, `Tag`) to use the new border radius values.

* [#960](https://github.com/sumup-oss/circuit-ui/pull/960) [`1a1a3646`](https://github.com/sumup-oss/circuit-ui/commit/1a1a36466e096c20b0dd19dc468359d65341e0fe) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed a UI bug in the `Table` component where multiple words in a table header would wrap on mobile, and break row alignment.

## 2.7.1

### Patch Changes

- [#1047](https://github.com/sumup-oss/circuit-ui/pull/1047) [`19fa9c29`](https://github.com/sumup-oss/circuit-ui/commit/19fa9c29c8a6768f590a0427cf5d2bc67bcc6dbe) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the alignment of the icon next to a validation hint when the text is center-aligned.

* [#1047](https://github.com/sumup-oss/circuit-ui/pull/1047) [`19fa9c29`](https://github.com/sumup-oss/circuit-ui/commit/19fa9c29c8a6768f590a0427cf5d2bc67bcc6dbe) Thanks [@connor-baer](https://github.com/connor-baer)! - Passed the click event to the `onClear` prop of the ImageInput.

- [#1047](https://github.com/sumup-oss/circuit-ui/pull/1047) [`19fa9c29`](https://github.com/sumup-oss/circuit-ui/commit/19fa9c29c8a6768f590a0427cf5d2bc67bcc6dbe) Thanks [@connor-baer](https://github.com/connor-baer)! - Tweaked the ImageInput to work with images with arbitrary border-radii.

## 2.7.0

### Minor Changes

- [#1037](https://github.com/sumup-oss/circuit-ui/pull/1037) [`275eef7a`](https://github.com/sumup-oss/circuit-ui/commit/275eef7a1b45a21a4663b4108db9098a2f8ec5d4) Thanks [@robinmetral](https://github.com/robinmetral)! - Added the `inputOutline` style mixin. It can be used to communicate to the user that an element is hovered, focused, or active in the disabled, invalid, and warning states.

* [#1032](https://github.com/sumup-oss/circuit-ui/pull/1032) [`7ece6261`](https://github.com/sumup-oss/circuit-ui/commit/7ece6261748f069a0303658653f2832151dfd0a4) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for style objects to the `cx` style mixin.

- [#1034](https://github.com/sumup-oss/circuit-ui/pull/1034) [`d9ac0f99`](https://github.com/sumup-oss/circuit-ui/commit/d9ac0f99d6a2c946c1e4beb326b5a961f910df68) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the `shadow` style mixin which can be used to visually elevate an element above the surrounding content.

* [#1036](https://github.com/sumup-oss/circuit-ui/pull/1036) [`0a17a448`](https://github.com/sumup-oss/circuit-ui/commit/0a17a4486d24af15d76f1e82d2063ee4588769cb) Thanks [@connor-baer](https://github.com/connor-baer)! - Reduced the thickness of the Hr (horizontal rule) component.

### Patch Changes

- [#1038](https://github.com/sumup-oss/circuit-ui/pull/1038) [`fd5f1663`](https://github.com/sumup-oss/circuit-ui/commit/fd5f1663eff7381e9575c57f74b4678087f9d2c0) Thanks [@connor-baer](https://github.com/connor-baer)! - Improved CardProps interface to allow all default HTML attributes.

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
