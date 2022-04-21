# @sumup/circuit-ui

## 5.0.0-canary.7

### Minor Changes

- [#1543](https://github.com/sumup-oss/circuit-ui/pull/1543) [`ef329372`](https://github.com/sumup-oss/circuit-ui/commit/ef329372376d936051e821a78d1b75a69fb25c4b) Thanks [@robinmetral](https://github.com/robinmetral)! - Updated the prerelease channel (`canary` branch) with recent minor changes from the stable release channel (`main` branch).

## 5.0.0-canary.6

### Major Changes

- [#1534](https://github.com/sumup-oss/circuit-ui/pull/1534) [`35d297aa`](https://github.com/sumup-oss/circuit-ui/commit/35d297aad0e69e56652530c0141977ac98577c9a) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `CardList` component. Use the `ListItemGroup` instead.

* [#1531](https://github.com/sumup-oss/circuit-ui/pull/1531) [`ff09e8cf`](https://github.com/sumup-oss/circuit-ui/commit/ff09e8cfe97b6cc333734297de18b7e7927bad7f) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `LoadingButton` component. Use the `Button` component instead.

- [#1533](https://github.com/sumup-oss/circuit-ui/pull/1533) [`dec0db59`](https://github.com/sumup-oss/circuit-ui/commit/dec0db596a2306c1e37a6f8ff4fc85692a02ba6b) Thanks [@robinmetral](https://github.com/robinmetral)! - Renamed the `ListItem` component's `prefix` and `suffix` props to `leadingComponent` and `trailingComponent`. Renamed the `suffixLabel` and `suffixDetails` props to `trailingLabel` and `trailingDetails`.

## 5.0.0-canary.5

### Major Changes

- [#1528](https://github.com/sumup-oss/circuit-ui/pull/1528) [`005d2a17`](https://github.com/sumup-oss/circuit-ui/commit/005d2a17983a83053d5a86fd9813b6130f3fefe2) Thanks [@robinmetral](https://github.com/robinmetral)! - Typed `noMargin` as a required prop in components.

* [#1528](https://github.com/sumup-oss/circuit-ui/pull/1528) [`005d2a17`](https://github.com/sumup-oss/circuit-ui/commit/005d2a17983a83053d5a86fd9813b6130f3fefe2) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the default placeholder option in the `Select` component. Pass a localized string to `placeholder` instead, or keep the default option empty.

- [#1529](https://github.com/sumup-oss/circuit-ui/pull/1529) [`fa2101e5`](https://github.com/sumup-oss/circuit-ui/commit/fa2101e56031d8341cc392817aa1436308f2d181) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `showValid` option from the `inputOutline` style mixin.

* [#1526](https://github.com/sumup-oss/circuit-ui/pull/1526) [`ba059828`](https://github.com/sumup-oss/circuit-ui/commit/ba059828c3caec2cabf0a43118af27a8128e78a0) Thanks [@amelako](https://github.com/amelako)! - Removed the deprecated `success`, `warning` and `danger` color variants. Use `confirm`, `notify` and `alert` instead.

### Patch Changes

- Updated dependencies [[`ba059828`](https://github.com/sumup-oss/circuit-ui/commit/ba059828c3caec2cabf0a43118af27a8128e78a0)]:
  - @sumup/design-tokens@4.0.0-canary.1

## 5.0.0-canary.4

### Major Changes

- [#1511](https://github.com/sumup-oss/circuit-ui/pull/1511) [`eed3888f`](https://github.com/sumup-oss/circuit-ui/commit/eed3888f8df92d9e8358a0dc3b441852c38f852f) Thanks [@amelako](https://github.com/amelako)! - Threw a runtime error when the `noMargin` prop isn't passed to components requiring it. Setting the `UNSAFE_DISABLE_NO_MARGIN_ERRORS` environment variable to `true` will temporarily turn off the errors.

* [#1518](https://github.com/sumup-oss/circuit-ui/pull/1518) [`2987be29`](https://github.com/sumup-oss/circuit-ui/commit/2987be297ab8a77f447f9e8052fbb88116d7e704) Thanks [@amelako](https://github.com/amelako)! - Removed the deprecated `Notification`, `NotificationCard`, `NotificationList` and `InlineMessage` components.

## 5.0.0-canary.3

### Major Changes

- [#1513](https://github.com/sumup-oss/circuit-ui/pull/1513) [`4740ef30`](https://github.com/sumup-oss/circuit-ui/commit/4740ef30d22ec5f482c9d259454dadb03bdcef83) Thanks [@amelako](https://github.com/amelako)! - Removed the `UNSAFE_DISABLE_ACCESSIBILITY_ERRORS` environment variable.

* [#1512](https://github.com/sumup-oss/circuit-ui/pull/1512) [`b7712b30`](https://github.com/sumup-oss/circuit-ui/commit/b7712b3054b9c652c42d344da60e208828006d89) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the `RadioButton`'s deprecated `children` prop. Use the `label` prop (now required) instead, in both the `RadioButton` and the `RadioButtonGroup`'s `options`.

- [#1510](https://github.com/sumup-oss/circuit-ui/pull/1510) [`908f1e77`](https://github.com/sumup-oss/circuit-ui/commit/908f1e77b25add3497c9dfcfecdd238bb035d79f) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `shadowSingle`, `shadowDouble` and `shadowTriple` style mixins. Use the `shadow()` style mixin instead.

* [#1512](https://github.com/sumup-oss/circuit-ui/pull/1512) [`b7712b30`](https://github.com/sumup-oss/circuit-ui/commit/b7712b3054b9c652c42d344da60e208828006d89) Thanks [@robinmetral](https://github.com/robinmetral)! - Made the `RadioButton`'s `label` prop required and throw an error if it isn't passed. This is an accessibility requirement.

## 5.0.0-canary.2

### Minor Changes

- [#1507](https://github.com/sumup-oss/circuit-ui/pull/1507) [`c1942507`](https://github.com/sumup-oss/circuit-ui/commit/c19425073709a61e2df6cf0e5f4cb9dfa6af8d86) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed `lodash` as a dependency to reduce Circuit UI's bundle size. If you aren't using `lodash` in your application, you can remove `babel-plugin-lodash`.

## 4.20.0

### Minor Changes

- [#1540](https://github.com/sumup-oss/circuit-ui/pull/1540) [`2a7d1c91`](https://github.com/sumup-oss/circuit-ui/commit/2a7d1c9141963f35df4f050da5df6fbcfec6c5f3) Thanks [@amelako](https://github.com/amelako)! - Added support for the `ButtonGroup` component's `align` prop when using the new `actions` prop. Defaults to `center`.

## 4.19.0

### Minor Changes

- [#1504](https://github.com/sumup-oss/circuit-ui/pull/1504) [`467c3a82`](https://github.com/sumup-oss/circuit-ui/commit/467c3a8277accb686a6072ce646d5475e19d5512) Thanks [@connor-baer](https://github.com/connor-baer)! - Migrated the `Grid`, `Row`, and `Col` components to TypeScript. The `Col` component's `span` and `skip` props now accept numbers or numeric strings, even when nested in a breakpoints object. Here are some examples:

  ```tsx
  <Col span={2} />
  <Col span="2" />
  <Col span={{ default: 2, kilo: "4" }} />
  ```

### Patch Changes

- [#1505](https://github.com/sumup-oss/circuit-ui/pull/1505) [`bbd20fd6`](https://github.com/sumup-oss/circuit-ui/commit/bbd20fd62930ac9c61b1a8f960195ff8668bf4b8) Thanks [@connor-baer](https://github.com/connor-baer)! - Migrated the `useStep` hook and `Step` component to TypeScript. The `useStep` hook now has the same default options as the `Step` component.

* [#1505](https://github.com/sumup-oss/circuit-ui/pull/1505) [`bbd20fd6`](https://github.com/sumup-oss/circuit-ui/commit/bbd20fd62930ac9c61b1a8f960195ff8668bf4b8) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a missing accessibility label to the progressbar of the `Carousel` component.

- [#1498](https://github.com/sumup-oss/circuit-ui/pull/1498) [`209b35bf`](https://github.com/sumup-oss/circuit-ui/commit/209b35bfcf8ae36256240c1a7ac23940cc7d644c) Thanks [@hris27](https://github.com/hris27)! - Fixed opening animation and unwanted page scroll when closing a `SidePanel` or `Modal` on Safari.

## 4.18.0

### Minor Changes

- [#1482](https://github.com/sumup-oss/circuit-ui/pull/1482) [`2f7537fa`](https://github.com/sumup-oss/circuit-ui/commit/2f7537fa9c586f18dc0b0a8f527cc3f11c36854f) Thanks [@hris27](https://github.com/hris27)! - Exported `TOP_NAVIGATION_HEIGHT` and `SIDE_PANEL_WIDTH` constants.

## 4.17.1

### Patch Changes

- [#1475](https://github.com/sumup-oss/circuit-ui/pull/1475) [`82112c1e`](https://github.com/sumup-oss/circuit-ui/commit/82112c1e13da43b5dc838d4c25e074913df870bb) Thanks [@tareqlol](https://github.com/tareqlol)! - Fixed the conditional rendering of aria attributes in loading buttons.

## 4.17.0

### Minor Changes

- [#1464](https://github.com/sumup-oss/circuit-ui/pull/1464) [`f22cf47a`](https://github.com/sumup-oss/circuit-ui/commit/f22cf47a85892153af2ba131debfb84a3096d0f3) Thanks [@sumius](https://github.com/sumius)! - Added a new `center` style mixin to center content horizontally and vertically.

### Patch Changes

- [#1453](https://github.com/sumup-oss/circuit-ui/pull/1453) [`21a5d902`](https://github.com/sumup-oss/circuit-ui/commit/21a5d902fe37ae2f7d6edef0e4d92522a355c6b5) Thanks [@felixjung](https://github.com/felixjung)! - Fixed a runtime error that occurred when users click on a disabled item in the `Sidebar` with an `onClick` handler.

## 4.16.0

### Minor Changes

- [#1401](https://github.com/sumup-oss/circuit-ui/pull/1401) [`d8361322`](https://github.com/sumup-oss/circuit-ui/commit/d836132205fd376ff9c02c414fb0e69cb73a654e) Thanks [@hris27](https://github.com/hris27)! - Added a new `SidePanel` component. Use it via the `useSidePanel` hook and `SidePanelProvider`.

* [#1401](https://github.com/sumup-oss/circuit-ui/pull/1401) [`d8361322`](https://github.com/sumup-oss/circuit-ui/commit/d836132205fd376ff9c02c414fb0e69cb73a654e) Thanks [@hris27](https://github.com/hris27)! - Added an `update` feature to the `useStack` hook.

### Patch Changes

- [#1401](https://github.com/sumup-oss/circuit-ui/pull/1401) [`d8361322`](https://github.com/sumup-oss/circuit-ui/commit/d836132205fd376ff9c02c414fb0e69cb73a654e) Thanks [@hris27](https://github.com/hris27)! - Changed the `Popover`'s strategy to `fixed` to prevent overflow issues.

* [#1401](https://github.com/sumup-oss/circuit-ui/pull/1401) [`d8361322`](https://github.com/sumup-oss/circuit-ui/commit/d836132205fd376ff9c02c414fb0e69cb73a654e) Thanks [@hris27](https://github.com/hris27)! - Fixed the focused state of `ListItemGroup` items.

## 4.15.1

### Patch Changes

- [#1450](https://github.com/sumup-oss/circuit-ui/pull/1450) [`db3f446b`](https://github.com/sumup-oss/circuit-ui/commit/db3f446bbb3f103ab2fd99aabeb0ceecaea1ba12) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the prop types of the InlineMessage to include the default HTML attributes."

## 4.15.0

### Minor Changes

- [#1448](https://github.com/sumup-oss/circuit-ui/pull/1448) [`9b2e18da`](https://github.com/sumup-oss/circuit-ui/commit/9b2e18da93da90d9337916150ec2dc9dae5b55a8) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a prop to change the alignment of the NotificationBanner image.

## 4.14.0

### Minor Changes

- [#1437](https://github.com/sumup-oss/circuit-ui/pull/1437) [`34177608`](https://github.com/sumup-oss/circuit-ui/commit/34177608dbebc7d62b993bfe70c259ba601daf85) Thanks [@amelako](https://github.com/amelako)! - Deprecated the `InlineMessage`, `Notification`, `NotificationList`, and `NotificationCard` components. Use the new `NotificationBanner`, `NotificationInline`, and `NotificationToast` components instead.

* [#1440](https://github.com/sumup-oss/circuit-ui/pull/1440) [`86991d10`](https://github.com/sumup-oss/circuit-ui/commit/86991d10596eab29bca8c8d6270f185e532ed9fd) Thanks [@robinmetral](https://github.com/robinmetral)! - Added new semantic variant names to the `Body`, `BodyLarge` and `Badge` components, and deprecated legacy variants. Read more in the [migration guide](https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md#new-semantic-color-names).

## 4.13.1

### Patch Changes

- [#1435](https://github.com/sumup-oss/circuit-ui/pull/1435) [`55e78782`](https://github.com/sumup-oss/circuit-ui/commit/55e7878251dc5a87392e099eb336490180df87ee) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed modern syntax in the NotificationInline component that wasn't transpiled and could lead to build issues in apps that consume Circuit UI.

## 4.13.0

### Minor Changes

- [#1431](https://github.com/sumup-oss/circuit-ui/pull/1431) [`3f9585a4`](https://github.com/sumup-oss/circuit-ui/commit/3f9585a44744c67904b03fbc50d614104bfff927) Thanks [@amelako](https://github.com/amelako)! - Replaced the `success`, `warning`, and `danger` colors with the new `confirm`, `notify`, and `alert` colors.

### Patch Changes

- Updated dependencies [[`3f9585a4`](https://github.com/sumup-oss/circuit-ui/commit/3f9585a44744c67904b03fbc50d614104bfff927)]:
  - @sumup/design-tokens@3.4.0

## 4.12.0

### Minor Changes

- [#1432](https://github.com/sumup-oss/circuit-ui/pull/1432) [`60d57a8a`](https://github.com/sumup-oss/circuit-ui/commit/60d57a8a2920a8e00bd061fc5a95950c288dd6ee) Thanks [@robinmetral](https://github.com/robinmetral)! - Allow heading levels `h2` to `h6` in the `NotificationInline` headline. Pass it an object with the properties `label` (the heading text) and `as` (the heading level).

## 4.11.4

### Patch Changes

- [#1421](https://github.com/sumup-oss/circuit-ui/pull/1421) [`4bc2b453`](https://github.com/sumup-oss/circuit-ui/commit/4bc2b453bd4361d30b656e8ac4fb73261daaf9b4) Thanks [@robinmetral](https://github.com/robinmetral)! - Set `aria-pressed` on a `ListItem` or `CardList.Item` (deprecated) only when it has a role of `button`. The attribute is invalid on any other role.

## 4.11.3

### Patch Changes

- [#1408](https://github.com/sumup-oss/circuit-ui/pull/1408) [`114f1270`](https://github.com/sumup-oss/circuit-ui/commit/114f12704ae4edef59931f34407aff908004131c) Thanks [@long-lazuli](https://github.com/long-lazuli)! - Upgraded the `react-number-format` dependency to v4.9.1.

## 4.11.2

### Patch Changes

- [#1406](https://github.com/sumup-oss/circuit-ui/pull/1406) [`a4cf4263`](https://github.com/sumup-oss/circuit-ui/commit/a4cf42639a1d803c7dc76d95aff57878f28c791a) Thanks [@robinmetral](https://github.com/robinmetral)! - Exported the Circuit Input component type as `InputElement`.

## 4.11.1

### Patch Changes

- [#1386](https://github.com/sumup-oss/circuit-ui/pull/1386) [`c49a6b42`](https://github.com/sumup-oss/circuit-ui/commit/c49a6b4201b85081088d52a5ebb7ac6f0d75c7f1) Thanks [@amelako](https://github.com/amelako)! - Changed the "Notify" icon to "NotifyCircle" for the `NotificationInline`, `NotificationToast` and `Input` components.

## 4.11.0

### Minor Changes

- [#1319](https://github.com/sumup-oss/circuit-ui/pull/1319) [`98d3f59c`](https://github.com/sumup-oss/circuit-ui/commit/98d3f59c80ead0d4e513721f104a64f024b2e17b) Thanks [@long-lazuli](https://github.com/long-lazuli)! - Added an auto expand behavior to the `TextArea` component.

## 4.10.2

### Patch Changes

- [#1387](https://github.com/sumup-oss/circuit-ui/pull/1387) [`23a7e0a3`](https://github.com/sumup-oss/circuit-ui/commit/23a7e0a378ecb7b4e1bbe6cb2ccfae9f26bba0fd) Thanks [@amelako](https://github.com/amelako)! - Exported `NotificationInline` component.

## 4.10.1

### Patch Changes

- [#1384](https://github.com/sumup-oss/circuit-ui/pull/1384) [`e0e5c431`](https://github.com/sumup-oss/circuit-ui/commit/e0e5c4312e7aaa6d0b7c3d902a5146a1f41e1e6b) Thanks [@robinmetral](https://github.com/robinmetral)! - Refactored `Checkbox` styles. This is an internal change only, but you'll need to update your snapshots.

## 4.10.0

### Minor Changes

- [#1332](https://github.com/sumup-oss/circuit-ui/pull/1332) [`dd65ad12`](https://github.com/sumup-oss/circuit-ui/commit/dd65ad125712c0ed00a06141bef054d708faad02) Thanks [@amelako](https://github.com/amelako)! - Added a new `NotificationInline` component that provides quick and contextual inline notifications.

## 4.9.0

### Minor Changes

- [#1379](https://github.com/sumup-oss/circuit-ui/pull/1379) [`785c76e5`](https://github.com/sumup-oss/circuit-ui/commit/785c76e54eb5abf0c2acdfda4eb53347d94fc6f9) Thanks [@AndreeWille](https://github.com/AndreeWille)! - Added the `initialSortDirection` and `initialSortedRow` props to the Table component.

## 4.8.1

### Patch Changes

- [#1367](https://github.com/sumup-oss/circuit-ui/pull/1367) [`e2362dc6`](https://github.com/sumup-oss/circuit-ui/commit/e2362dc68fede159952c30c7ffd1fcc423bd8f62) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed spacing in the `NotificationBanner`. Any extra horizontal spacing in the component should be added between the copy and the asset.

## 4.8.0

### Minor Changes

- [#1359](https://github.com/sumup-oss/circuit-ui/pull/1359) [`5804fd8d`](https://github.com/sumup-oss/circuit-ui/commit/5804fd8d720a7594bb880b9956a3310609cfbaa9) Thanks [@amelako](https://github.com/amelako)! - Added a `z-index` to the NotificationToasts so they always float above other content. Requires updating to `@sumup/design-tokens@3.3.0`.

### Patch Changes

- Updated dependencies [[`5804fd8d`](https://github.com/sumup-oss/circuit-ui/commit/5804fd8d720a7594bb880b9956a3310609cfbaa9)]:
  - @sumup/design-tokens@3.3.0

## 4.7.3

### Patch Changes

- [#1357](https://github.com/sumup-oss/circuit-ui/pull/1357) [`5d24f0d2`](https://github.com/sumup-oss/circuit-ui/commit/5d24f0d20bd310caa97a8819a0a953b8a19aee46) Thanks [@amelako](https://github.com/amelako)! - Increased the NotificationToast's default duration to 6 seconds to match the accessibility guidelines.

* [#1357](https://github.com/sumup-oss/circuit-ui/pull/1357) [`5d24f0d2`](https://github.com/sumup-oss/circuit-ui/commit/5d24f0d20bd310caa97a8819a0a953b8a19aee46) Thanks [@amelako](https://github.com/amelako)! - Updated the NotificationToast's prop types, now the `iconLabel` prop is optional and the `isVisible` prop is internal only.

## 4.7.2

### Patch Changes

- [#1355](https://github.com/sumup-oss/circuit-ui/pull/1355) [`d08ad565`](https://github.com/sumup-oss/circuit-ui/commit/d08ad5652a606649f417b25e37cdc9c9e12a531d) Thanks [@amelako](https://github.com/amelako)! - Fixed the issue of the NotificationToast transition, now the toast appears with a smoother fade and height transition.

## 4.7.1

### Patch Changes

- [#1346](https://github.com/sumup-oss/circuit-ui/pull/1346) [`e6a34e92`](https://github.com/sumup-oss/circuit-ui/commit/e6a34e92da4020ed005e782efbba20d9eaa8075b) Thanks [@robinmetral](https://github.com/robinmetral)! - Improved types in the `CurrencyInput`. The component's type (exposed via its `ref`) changed from `NumberFormat` to `NumberFormat<InputProps>`, now explicitly typing the wrapped Circuit UI `Input`.

## 4.7.0

### Minor Changes

- [#1295](https://github.com/sumup-oss/circuit-ui/pull/1295) [`3861db2a`](https://github.com/sumup-oss/circuit-ui/commit/3861db2ae25fec899e3e516c30f8b42ff6993a68) Thanks [@amelako](https://github.com/amelako)! - Added a new `NotificationToast` component that provides quick and contextual feedback to the user.

## 4.6.1

### Patch Changes

- [#1328](https://github.com/sumup-oss/circuit-ui/pull/1328) [`23065d4a`](https://github.com/sumup-oss/circuit-ui/commit/23065d4aa8b39bc5e29b5b275e158812c8d3298e) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed event listeners from the `Popover` when it is closed, to prevent unnecessary re-renders.

## 4.6.0

### Minor Changes

- [#1310](https://github.com/sumup-oss/circuit-ui/pull/1310) [`d9f0b380`](https://github.com/sumup-oss/circuit-ui/commit/d9f0b380d8eb50bda82a8b9339f532e9ccd56ef1) Thanks [@felixjung](https://github.com/felixjung)! - Converted the `Tooltip` component to TypeScript and removed its Lodash dependency.

## 4.5.6

### Patch Changes

- [#1308](https://github.com/sumup-oss/circuit-ui/pull/1308) [`ae1f00dc`](https://github.com/sumup-oss/circuit-ui/commit/ae1f00dc74860144a1dc9d06cae17e69d915d0fd) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the initialization of the Table `rows` on the first render.

## 4.5.5

### Patch Changes

- [#1306](https://github.com/sumup-oss/circuit-ui/pull/1306) [`062aaa11`](https://github.com/sumup-oss/circuit-ui/commit/062aaa11d95adb05b7d07be1aedf385b6f96599e) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed a bug where updating the Table's `rows` wouldn't re-render the Table.

## 4.5.4

### Patch Changes

- [#1304](https://github.com/sumup-oss/circuit-ui/pull/1304) [`6f621e53`](https://github.com/sumup-oss/circuit-ui/commit/6f621e53fcc1e02b3668dfa6932d58bc79239619) Thanks [@amelako](https://github.com/amelako)! - Removed the `onClick` function from `Image` component in `NotificationBanner`.

## 4.5.3

### Patch Changes

- [#1292](https://github.com/sumup-oss/circuit-ui/pull/1292) [`f5a172ae`](https://github.com/sumup-oss/circuit-ui/commit/f5a172ae6cbd39e98775e0ece5d7955f22aee353) Thanks [@robinmetral](https://github.com/robinmetral)! - Prevented the `Table` component from rerendering when hovering sortable header cells.

## 4.5.2

### Patch Changes

- [#1285](https://github.com/sumup-oss/circuit-ui/pull/1285) [`95a7f0f9`](https://github.com/sumup-oss/circuit-ui/commit/95a7f0f9c0e008c42d19b6918b3a16df173d8756) Thanks [@robinmetral](https://github.com/robinmetral)! - Centered the `NotificationFullscreen`'s headline when the copy wraps on two lines.

* [#1283](https://github.com/sumup-oss/circuit-ui/pull/1283) [`c35e1c2c`](https://github.com/sumup-oss/circuit-ui/commit/c35e1c2c8da886a36e885e2a11336bda9f0abc02) Thanks [@robinmetral](https://github.com/robinmetral)! - Added the `noMargin` prop to the `NotificationFullscreen`'s headline to prevent the deprecation warning.

## 4.5.1

### Patch Changes

- [#1276](https://github.com/sumup-oss/circuit-ui/pull/1276) [`701a668a`](https://github.com/sumup-oss/circuit-ui/commit/701a668abc9542cca44860c1a5858ebe31db0d2a) Thanks [@robinmetral](https://github.com/robinmetral)! - Added `role="progressbar"` to the `ProgressBar` component's time-based variant.

* [#1276](https://github.com/sumup-oss/circuit-ui/pull/1276) [`701a668a`](https://github.com/sumup-oss/circuit-ui/commit/701a668abc9542cca44860c1a5858ebe31db0d2a) Thanks [@robinmetral](https://github.com/robinmetral)! - Hid the `Carousel` component's visual progress indicator to screen readers.

## 4.5.0

### Minor Changes

- [#1273](https://github.com/sumup-oss/circuit-ui/pull/1273) [`ed0c4f83`](https://github.com/sumup-oss/circuit-ui/commit/ed0c4f83258dccc93686ee7e5a282c1c720c6543) Thanks [@robinmetral](https://github.com/robinmetral)! - Introduced the `Title` and `BodyLarge` components for rendering copy with large typography, for example on landing pages.

* [#1260](https://github.com/sumup-oss/circuit-ui/pull/1260) [`40339fe0`](https://github.com/sumup-oss/circuit-ui/commit/40339fe0204ce29b517bf8a19929e379d9915411) Thanks [@giedoka](https://github.com/giedoka)! - Added an optional `size` prop to the `ImageInput` component to change the action button's size.

### Patch Changes

- [#1273](https://github.com/sumup-oss/circuit-ui/pull/1273) [`ed0c4f83`](https://github.com/sumup-oss/circuit-ui/commit/ed0c4f83258dccc93686ee7e5a282c1c720c6543) Thanks [@robinmetral](https://github.com/robinmetral)! - Adapted the tracking of the `Headline` component for better readability.

* [#1260](https://github.com/sumup-oss/circuit-ui/pull/1260) [`40339fe0`](https://github.com/sumup-oss/circuit-ui/commit/40339fe0204ce29b517bf8a19929e379d9915411) Thanks [@giedoka](https://github.com/giedoka)! - Adjusted the border radius of the `Avatar` component when `size="giga"` and `variant="object"`.

* Updated dependencies [[`ed0c4f83`](https://github.com/sumup-oss/circuit-ui/commit/ed0c4f83258dccc93686ee7e5a282c1c720c6543)]:
  - @sumup/design-tokens@3.2.0

## 4.4.2

### Patch Changes

- [#1271](https://github.com/sumup-oss/circuit-ui/pull/1271) [`1c35dae3`](https://github.com/sumup-oss/circuit-ui/commit/1c35dae303e66e2c37a310d74d07a931363bdb02) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed the import of `IconProps` in the `IconButton` component. This was causing TypeScript build failures.

## 4.4.1

### Patch Changes

- [#1263](https://github.com/sumup-oss/circuit-ui/pull/1263) [`d07efc86`](https://github.com/sumup-oss/circuit-ui/commit/d07efc8618ff568a0cd2fe87880700e5e6877eb9) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed optional chaining from the `NotificationModal` for compatibility with Node 12.

- Updated dependencies [[`d619b6e1`](https://github.com/sumup-oss/circuit-ui/commit/d619b6e1cfe36f031a2e8604ec05ff6a1663f33d)]:
  - @sumup/design-tokens@3.1.1

## 4.4.0

### Minor Changes

- [#1182](https://github.com/sumup-oss/circuit-ui/pull/1182) [`8ad10a93`](https://github.com/sumup-oss/circuit-ui/commit/8ad10a93d6abe70e438e9f15eeece3405c0cb520) Thanks [@hris27](https://github.com/hris27)! - Added new `ListItem` and `ListItemGroup` components. The `ListItemGroup` replaces the `CardList` component.

## 4.3.0

### Minor Changes

- [#994](https://github.com/sumup-oss/circuit-ui/pull/994) [`0b7b3226`](https://github.com/sumup-oss/circuit-ui/commit/0b7b322667f41d6db2a2da21b3871b05a20661d9) Thanks [@amelako](https://github.com/connor-baer)! - Added a new `NotificationModal` component that communicates critical information, and needs the user's attention or action to proceed.

## 4.2.1

### Patch Changes

- [#1231](https://github.com/sumup-oss/circuit-ui/pull/1231) [`c9ec5169`](https://github.com/sumup-oss/circuit-ui/commit/c9ec5169a5b55b76bb001bb0bda48696372245c2) Thanks [@amelako](https://github.com/amelako)! - Updated the NotificationFullscreen `body` prop to accept a `ReactNode` and removed the external spacing.

## 4.2.0

### Minor Changes

- [#964](https://github.com/sumup-oss/circuit-ui/pull/964) [`75a67df4`](https://github.com/sumup-oss/circuit-ui/commit/75a67df465c927b1162233a82e65071de4aa029e) Thanks [@amelako](https://github.com/robinmetral)! - Added a new `NotificationFullscreen` component that provides important information or feedback as part of a process flow.

### Patch Changes

- [#964](https://github.com/sumup-oss/circuit-ui/pull/964) [`75a67df4`](https://github.com/sumup-oss/circuit-ui/commit/75a67df465c927b1162233a82e65071de4aa029e) Thanks [@amelako](https://github.com/robinmetral)! - Fixed the ButtonGroup to horizontally center buttons on wide viewports.

## 4.1.7

### Patch Changes

- [#1225](https://github.com/sumup-oss/circuit-ui/pull/1225) [`b451fb20`](https://github.com/sumup-oss/circuit-ui/commit/b451fb20ba0b4e36516fa156386b4401c69eab43) Thanks [@long-lazuli](https://github.com/long-lazuli)! - Fixed a bug where the RadioButtonGroup didn't forward the `required` attribute to the inputs.

## 4.1.6

### Patch Changes

- [#1222](https://github.com/sumup-oss/circuit-ui/pull/1222) [`986c7dea`](https://github.com/sumup-oss/circuit-ui/commit/986c7dea5314d58aa628edc30b74a98ab42c0a3b) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed the alignment of the SearchInput's clear button.

## 4.1.5

### Patch Changes

- [#1220](https://github.com/sumup-oss/circuit-ui/pull/1220) [`4161cc10`](https://github.com/sumup-oss/circuit-ui/commit/4161cc108b583272fab9a46aa034415c70a821e8) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the requirement for a label for hidden Inputs.

## 4.1.4

### Patch Changes

- [#1218](https://github.com/sumup-oss/circuit-ui/pull/1218) [`8402e6b9`](https://github.com/sumup-oss/circuit-ui/commit/8402e6b9cf7191de1858dcbb645ee8e7e05971a9) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed a compatibility issue between the Popover and Button where the Button content would remain visible when the Popover was closed.

## 4.1.3

### Patch Changes

- [#1216](https://github.com/sumup-oss/circuit-ui/pull/1216) [`9e5bfc11`](https://github.com/sumup-oss/circuit-ui/commit/9e5bfc111eb28eecce3df976c6b98a15a77fd8fc) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed a bug in the Button component when it is disabled and not loading.

## 4.1.2

### Patch Changes

- [#1214](https://github.com/sumup-oss/circuit-ui/pull/1214) [`994ee8e2`](https://github.com/sumup-oss/circuit-ui/commit/994ee8e2274041030d13e2c3719c3846fab9bf0b) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a codemod for the LoadingButton → Button migration (🤖 _component-names-v4-1_).

## 4.1.1

### Patch Changes

- [#1209](https://github.com/sumup-oss/circuit-ui/pull/1209) [`0ad1a7df`](https://github.com/sumup-oss/circuit-ui/commit/0ad1a7df287777eccee6d6499aaf8a3efa341fb8) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed a small wobble in the SideNavigation in Safari on some external displays.

* [#1213](https://github.com/sumup-oss/circuit-ui/pull/1213) [`a27426aa`](https://github.com/sumup-oss/circuit-ui/commit/a27426aa668d667656bded20f08249056dd54494) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the Circuit CRA template. Use the [CNA template](https://github.com/sumup-oss/circuit-ui/tree/main/packages/create-sumup-next-app) instead.

## 4.1.0

### Minor Changes

- [#1167](https://github.com/sumup-oss/circuit-ui/pull/1167) [`7b5c44c9`](https://github.com/sumup-oss/circuit-ui/commit/7b5c44c960ec35237f7fde86ec237895346741ff) Thanks [@amelako](https://github.com/amelako)! - Added a new `actions` prop to the ButtonGroup that replaces the `children` prop. The new API is more ergonomic and enables an improved look on mobile.

* [#1167](https://github.com/sumup-oss/circuit-ui/pull/1167) [`7b5c44c9`](https://github.com/sumup-oss/circuit-ui/commit/7b5c44c960ec35237f7fde86ec237895346741ff) Thanks [@amelako](https://github.com/amelako)! - Merged the LoadingButton into the Button component.

- [#1113](https://github.com/sumup-oss/circuit-ui/pull/1113) [`d6350cc3`](https://github.com/sumup-oss/circuit-ui/commit/d6350cc3d592d404a7b3e6cf29d8e3aeea004cee) Thanks [@amelako](https://github.com/amelako)! - Added a new `NotificationBanner` component that communicates and promotes high-level, site-wide information to the user.

## 4.0.0

### Major Changes

- [#1186](https://github.com/sumup-oss/circuit-ui/pull/1186) [`17cf95aa`](https://github.com/sumup-oss/circuit-ui/commit/17cf95aac03c804c0bd00c865d5d84f04810ee13) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the Modal's tracking event to include the `open`/`close` data in the tracking label.

* [#1186](https://github.com/sumup-oss/circuit-ui/pull/1186) [`17cf95aa`](https://github.com/sumup-oss/circuit-ui/commit/17cf95aac03c804c0bd00c865d5d84f04810ee13) Thanks [@connor-baer](https://github.com/connor-baer)! - Renamed and grouped the TopNavigation props that are forwarded to the ProfileMenu.

- [#1184](https://github.com/sumup-oss/circuit-ui/pull/1184) [`dfbe2bb3`](https://github.com/sumup-oss/circuit-ui/commit/dfbe2bb3b3bd6dffdebdb8d4a808896b6171a281) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the `useClickEvent` hook to track events even if no custom `onClick` handler is defined.

* [#1168](https://github.com/sumup-oss/circuit-ui/pull/1168) [`ca74d320`](https://github.com/sumup-oss/circuit-ui/commit/ca74d320168aba1285e23691ca6651a1d12f9d27) Thanks [@robinmetral](https://github.com/robinmetral)! - Upgraded icons to the new brand icons in all components.

- [#1186](https://github.com/sumup-oss/circuit-ui/pull/1186) [`17cf95aa`](https://github.com/sumup-oss/circuit-ui/commit/17cf95aac03c804c0bd00c865d5d84f04810ee13) Thanks [@connor-baer](https://github.com/connor-baer)! - Marked the `label` property of the `tracking` prop as required. This matches the existing behavior where click events are only tracked if the `label` property is provided.

* [`be3c0781`](https://github.com/sumup-oss/circuit-ui/commit/be3c0781d9708c2351b244516f6bcc22aa25988a) Thanks [@robinmetral](https://github.com/robinmetral)! - Replaced the `SideNavigation` badge's `label` prop by `children` for consistency with the `BadgeProps`.

- [#1176](https://github.com/sumup-oss/circuit-ui/pull/1176) [`c7483f0b`](https://github.com/sumup-oss/circuit-ui/commit/c7483f0bbc206b80c693e6b5f856464e012683f7) Thanks [@robinmetral](https://github.com/robinmetral)! - Migrated to Emotion 11.

### Minor Changes

- [#1186](https://github.com/sumup-oss/circuit-ui/pull/1186) [`17cf95aa`](https://github.com/sumup-oss/circuit-ui/commit/17cf95aac03c804c0bd00c865d5d84f04810ee13) Thanks [@connor-baer](https://github.com/connor-baer)! - Added tracking support to the ProfileMenu.

* [#1186](https://github.com/sumup-oss/circuit-ui/pull/1186) [`17cf95aa`](https://github.com/sumup-oss/circuit-ui/commit/17cf95aac03c804c0bd00c865d5d84f04810ee13) Thanks [@connor-baer](https://github.com/connor-baer)! - Added tracking support to the Popover.

- [#1168](https://github.com/sumup-oss/circuit-ui/pull/1168) [`ca74d320`](https://github.com/sumup-oss/circuit-ui/commit/ca74d320168aba1285e23691ca6651a1d12f9d27) Thanks [@robinmetral](https://github.com/robinmetral)! - Passed the icon size down from the IconButton.

### Patch Changes

- [#1168](https://github.com/sumup-oss/circuit-ui/pull/1168) [`ca74d320`](https://github.com/sumup-oss/circuit-ui/commit/ca74d320168aba1285e23691ca6651a1d12f9d27) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed the spacing between a PopoverItem's label and (optional) icon. Since the items should receive 24px icons, the component looks more balanced with a 16px spacing.

* [#1191](https://github.com/sumup-oss/circuit-ui/pull/1191) [`b4e0041f`](https://github.com/sumup-oss/circuit-ui/commit/b4e0041f221428ea30112000aed8596aa7ce2c94) Thanks [@robinmetral](https://github.com/robinmetral)! - Typed the grid components to prevent wrong type inference.

- [#1176](https://github.com/sumup-oss/circuit-ui/pull/1176) [`c7483f0b`](https://github.com/sumup-oss/circuit-ui/commit/c7483f0bbc206b80c693e6b5f856464e012683f7) Thanks [@robinmetral](https://github.com/robinmetral)! - Switched all component interfaces to extend `*HTMLAttributes<HTML*Element>` instead of the less accurate `HTMLProps`.

* [#1197](https://github.com/sumup-oss/circuit-ui/pull/1197) [`edd6f487`](https://github.com/sumup-oss/circuit-ui/commit/edd6f487ed6ab36d52b50b1a90e4f96a506deb66) Thanks [@robinmetral](https://github.com/robinmetral)! - Hid deprecation warnings on prod and test environments.

* Updated dependencies [[`139045d4`](https://github.com/sumup-oss/circuit-ui/commit/139045d4d055fa9435b4f409b087648db37b61ba), [`ca74d320`](https://github.com/sumup-oss/circuit-ui/commit/ca74d320168aba1285e23691ca6651a1d12f9d27)]:
  - @sumup/icons@2.0.0

## 4.0.0-next.5

### Patch Changes

- [#1197](https://github.com/sumup-oss/circuit-ui/pull/1197) [`edd6f487`](https://github.com/sumup-oss/circuit-ui/commit/edd6f487ed6ab36d52b50b1a90e4f96a506deb66) Thanks [@robinmetral](https://github.com/robinmetral)! - Hid deprecation warnings on prod and test environments.

## 4.0.0-next.4

### Major Changes

- [#1186](https://github.com/sumup-oss/circuit-ui/pull/1186) [`17cf95aa`](https://github.com/sumup-oss/circuit-ui/commit/17cf95aac03c804c0bd00c865d5d84f04810ee13) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the Modal's tracking event to include the `open`/`close` data in the tracking label.

* [#1186](https://github.com/sumup-oss/circuit-ui/pull/1186) [`17cf95aa`](https://github.com/sumup-oss/circuit-ui/commit/17cf95aac03c804c0bd00c865d5d84f04810ee13) Thanks [@connor-baer](https://github.com/connor-baer)! - Renamed and grouped the TopNavigation props that are forwarded to the ProfileMenu.

- [#1186](https://github.com/sumup-oss/circuit-ui/pull/1186) [`17cf95aa`](https://github.com/sumup-oss/circuit-ui/commit/17cf95aac03c804c0bd00c865d5d84f04810ee13) Thanks [@connor-baer](https://github.com/connor-baer)! - Marked the `label` property of the `tracking` prop as required. This matches the existing behaviour where click events are only tracked if the `label` property is provided.

### Minor Changes

- [#1186](https://github.com/sumup-oss/circuit-ui/pull/1186) [`17cf95aa`](https://github.com/sumup-oss/circuit-ui/commit/17cf95aac03c804c0bd00c865d5d84f04810ee13) Thanks [@connor-baer](https://github.com/connor-baer)! - Added tracking support to the ProfileMenu.

* [#1186](https://github.com/sumup-oss/circuit-ui/pull/1186) [`17cf95aa`](https://github.com/sumup-oss/circuit-ui/commit/17cf95aac03c804c0bd00c865d5d84f04810ee13) Thanks [@connor-baer](https://github.com/connor-baer)! - Added tracking support to the Popover.

## 4.0.0-next.3

### Patch Changes

- [#1191](https://github.com/sumup-oss/circuit-ui/pull/1191) [`b4e0041f`](https://github.com/sumup-oss/circuit-ui/commit/b4e0041f221428ea30112000aed8596aa7ce2c94) Thanks [@robinmetral](https://github.com/robinmetral)! - Typed the grid components to prevent wrong type inference.

## 4.0.0-next.2

### Major Changes

- [#1184](https://github.com/sumup-oss/circuit-ui/pull/1184) [`dfbe2bb3`](https://github.com/sumup-oss/circuit-ui/commit/dfbe2bb3b3bd6dffdebdb8d4a808896b6171a281) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the `useClickEvent` hook to track events even if no custom `onClick` handler is defined.

* [#1185](https://github.com/sumup-oss/circuit-ui/pull/1185) [`be3c0781`](https://github.com/sumup-oss/circuit-ui/commit/be3c0781d9708c2351b244516f6bcc22aa25988a) Thanks [@github-actions](https://github.com/apps/github-actions)! - Replaced the `SideNavigation` badge's `label` prop by `children` for consistency with the `BadgeProps`.

## 4.0.0-next.1

### Major Changes

- [#1176](https://github.com/sumup-oss/circuit-ui/pull/1176) [`c7483f0b`](https://github.com/sumup-oss/circuit-ui/commit/c7483f0bbc206b80c693e6b5f856464e012683f7) Thanks [@robinmetral](https://github.com/robinmetral)! - Migrated to Emotion 11.

### Patch Changes

- [#1176](https://github.com/sumup-oss/circuit-ui/pull/1176) [`c7483f0b`](https://github.com/sumup-oss/circuit-ui/commit/c7483f0bbc206b80c693e6b5f856464e012683f7) Thanks [@robinmetral](https://github.com/robinmetral)! - Switched all component interfaces to extend `*HTMLAttributes<HTML*Element>` instead of the less accurate `HTMLProps`.

## 4.0.0-next.0

### Major Changes

- [#1168](https://github.com/sumup-oss/circuit-ui/pull/1168) [`ca74d320`](https://github.com/sumup-oss/circuit-ui/commit/ca74d320168aba1285e23691ca6651a1d12f9d27) Thanks [@robinmetral](https://github.com/robinmetral)! - Upgraded icons to the new brand icons in all components.

### Patch Changes

- [#1168](https://github.com/sumup-oss/circuit-ui/pull/1168) [`ca74d320`](https://github.com/sumup-oss/circuit-ui/commit/ca74d320168aba1285e23691ca6651a1d12f9d27) Thanks [@robinmetral](https://github.com/robinmetral)! - Forwarded the icon size from an IconButton down to its Icon child.

* [#1168](https://github.com/sumup-oss/circuit-ui/pull/1168) [`ca74d320`](https://github.com/sumup-oss/circuit-ui/commit/ca74d320168aba1285e23691ca6651a1d12f9d27) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed the spacing between a PopoverItem's label and (optional) icon. Since the items should receive 24px icons, the component looks more balanced with a 16px spacing.

* Updated dependencies [[`ca74d320`](https://github.com/sumup-oss/circuit-ui/commit/ca74d320168aba1285e23691ca6651a1d12f9d27)]:
  - @sumup/icons@2.0.0-next.0

## 3.1.0

### Minor Changes

- [#1092](https://github.com/sumup-oss/circuit-ui/pull/1092) [`7ad912fd`](https://github.com/sumup-oss/circuit-ui/commit/7ad912fd08976d2496f03ea7eeeb994413a82de7) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a new SideNavigation component. It is part of the [application shell](https://developers.google.com/web/fundamentals/architecture/app-shell) and contains the primary and secondary navigation links.

* [#1117](https://github.com/sumup-oss/circuit-ui/pull/1117) [`e878a6e6`](https://github.com/sumup-oss/circuit-ui/commit/e878a6e6986fc6ca31781cd916eee63df41c0d30) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a skeleton loading UI to the TopNavigation and SideNavigation components.

- [#1169](https://github.com/sumup-oss/circuit-ui/pull/1169) [`0c7416cf`](https://github.com/sumup-oss/circuit-ui/commit/0c7416cf60e57c4d22ead4628527f3fd03aea0f1) Thanks [@connor-baer](https://github.com/connor-baer)! - Exposed the `isAnimating` state from the useCollapsible hook.

* [`12ef7cf6`](https://github.com/sumup-oss/circuit-ui/commit/12ef7cf6c147e73b265139237751ecfa4fe37804) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a new TopNavigation component. It is part of the [application shell](https://developers.google.com/web/fundamentals/architecture/app-shell) and contains the branding, page links, and the user profile menu.

### Patch Changes

- [#1130](https://github.com/sumup-oss/circuit-ui/pull/1130) [`7b4b5d88`](https://github.com/sumup-oss/circuit-ui/commit/7b4b5d886057583a32459e8986a95e313f57193a) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a loading state to the Hamburger.

* [#1114](https://github.com/sumup-oss/circuit-ui/pull/1114) [`159bd7ad`](https://github.com/sumup-oss/circuit-ui/commit/159bd7ad9f7aa6fd73528b209377e073c498e40e) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the styles returned by the `useCollapsible` hook to only hide vertical overflow, fixing a compatibility issue with the form components.

- [#1128](https://github.com/sumup-oss/circuit-ui/pull/1128) [`fdc0575e`](https://github.com/sumup-oss/circuit-ui/commit/fdc0575e728ba2e25596a97c48e4b35b78991082) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed the click handler to close the Popover when a PopoverItem doesn't have an onClick.

* [#1124](https://github.com/sumup-oss/circuit-ui/pull/1124) [`785878d9`](https://github.com/sumup-oss/circuit-ui/commit/785878d9936accf490850bb13dac6a09fa730b43) Thanks [@robinmetral](https://github.com/robinmetral)! - Changed the Popover behavior to close when one of the items is clicked.

- [#1114](https://github.com/sumup-oss/circuit-ui/pull/1114) [`159bd7ad`](https://github.com/sumup-oss/circuit-ui/commit/159bd7ad9f7aa6fd73528b209377e073c498e40e) Thanks [@connor-baer](https://github.com/connor-baer)! - Prevented interactions with content behind the Popover overlay.

* [#1138](https://github.com/sumup-oss/circuit-ui/pull/1138) [`6c9fe3b2`](https://github.com/sumup-oss/circuit-ui/commit/6c9fe3b24290f2f63575b63fad179cd66f9a6e05) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed compatibility of the useMedia hook with older versions of Safari.

- [#1130](https://github.com/sumup-oss/circuit-ui/pull/1130) [`7b4b5d88`](https://github.com/sumup-oss/circuit-ui/commit/7b4b5d886057583a32459e8986a95e313f57193a) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a z-index to the Modal's close button.

* [#1169](https://github.com/sumup-oss/circuit-ui/pull/1169) [`0c7416cf`](https://github.com/sumup-oss/circuit-ui/commit/0c7416cf60e57c4d22ead4628527f3fd03aea0f1) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed a bug in the `useCollapsible` hook to start the closing animation immediately.

* Updated dependencies [[`159bd7ad`](https://github.com/sumup-oss/circuit-ui/commit/159bd7ad9f7aa6fd73528b209377e073c498e40e), [`12ef7cf6`](https://github.com/sumup-oss/circuit-ui/commit/12ef7cf6c147e73b265139237751ecfa4fe37804), [`c077b900`](https://github.com/sumup-oss/circuit-ui/commit/c077b90056aa9113910640ff7ebd93b0ff02b8ae)]:
  - @sumup/icons@1.9.0
  - @sumup/design-tokens@3.1.0

## 3.1.0-canary.16

### Minor Changes

- [#1169](https://github.com/sumup-oss/circuit-ui/pull/1169) [`0c7416cf`](https://github.com/sumup-oss/circuit-ui/commit/0c7416cf60e57c4d22ead4628527f3fd03aea0f1) Thanks [@connor-baer](https://github.com/connor-baer)! - Exposed the `isAnimating` state from the useCollapsible hook.

### Patch Changes

- [#1169](https://github.com/sumup-oss/circuit-ui/pull/1169) [`0c7416cf`](https://github.com/sumup-oss/circuit-ui/commit/0c7416cf60e57c4d22ead4628527f3fd03aea0f1) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed a bug in the `useCollapsible` hook to start the closing animation immediately.

## 3.1.0-canary.15

### Patch Changes

- [#1160](https://github.com/sumup-oss/circuit-ui/pull/1160) [`2808ed54`](https://github.com/sumup-oss/circuit-ui/commit/2808ed54423e2207b142a3b013fe6263a3066560) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the hamburger size to match the increased navigation height.

## 3.1.0-canary.14

### Patch Changes

- [#1158](https://github.com/sumup-oss/circuit-ui/pull/1158) [`e2ba00b0`](https://github.com/sumup-oss/circuit-ui/commit/e2ba00b047624929860f0d681d21fe14ac81ea87) Thanks [@connor-baer](https://github.com/connor-baer)! - Tweaked a few styles of the new navigation.

## 3.1.0-canary.13

### Patch Changes

- [#1156](https://github.com/sumup-oss/circuit-ui/pull/1156) [`5c865e15`](https://github.com/sumup-oss/circuit-ui/commit/5c865e15df7c249fc99d7cc4c0625e2eab126d5d) Thanks [@connor-baer](https://github.com/connor-baer)! - Improved the display of long strings in the primary, secondary, and utility navigation.

## 3.1.0-canary.12

### Patch Changes

- [#1138](https://github.com/sumup-oss/circuit-ui/pull/1138) [`6c9fe3b2`](https://github.com/sumup-oss/circuit-ui/commit/6c9fe3b24290f2f63575b63fad179cd66f9a6e05) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed the useMedia hook (used in the navigation components) for Safari <14.

## 3.1.0-canary.11

### Patch Changes

- [#1136](https://github.com/sumup-oss/circuit-ui/pull/1136) [`9dfda4e9`](https://github.com/sumup-oss/circuit-ui/commit/9dfda4e99c08e00d81d7d8d788729c6e1fde26ae) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed the nav tracking by passing a defaut noop as onClick. This will be fixed in collector in the next major.

## 3.1.0-canary.10

### Patch Changes

- [#1134](https://github.com/sumup-oss/circuit-ui/pull/1134) [`daec52cb`](https://github.com/sumup-oss/circuit-ui/commit/daec52cbb13bc34f83cd16a07b72d1370a790715) Thanks [@connor-baer](https://github.com/connor-baer)! - Aligned the navigation components' border color with other Circuit UI components.

## 3.1.0-canary.9

### Minor Changes

- [#1132](https://github.com/sumup-oss/circuit-ui/pull/1132) [`5647889b`](https://github.com/sumup-oss/circuit-ui/commit/5647889b9edc0b55358f4a35552a535fc53de319) Thanks [@connor-baer](https://github.com/connor-baer)! - Added tracking to the TopNavigation and SideNavigation components.

## 3.1.0-canary.8

### Patch Changes

- [#1130](https://github.com/sumup-oss/circuit-ui/pull/1130) [`7b4b5d88`](https://github.com/sumup-oss/circuit-ui/commit/7b4b5d886057583a32459e8986a95e313f57193a) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a loading state to the Hamburger.

* [#1130](https://github.com/sumup-oss/circuit-ui/pull/1130) [`7b4b5d88`](https://github.com/sumup-oss/circuit-ui/commit/7b4b5d886057583a32459e8986a95e313f57193a) Thanks [@connor-baer](https://github.com/connor-baer)! - Aligned the TopNavigation breakpoint with the other navigation components.

- [#1130](https://github.com/sumup-oss/circuit-ui/pull/1130) [`7b4b5d88`](https://github.com/sumup-oss/circuit-ui/commit/7b4b5d886057583a32459e8986a95e313f57193a) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a z-index to the Modal's close button.

## 3.1.0-canary.7

### Patch Changes

- [#1128](https://github.com/sumup-oss/circuit-ui/pull/1128) [`fdc0575e`](https://github.com/sumup-oss/circuit-ui/commit/fdc0575e728ba2e25596a97c48e4b35b78991082) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed the click handler to close the Popover when a PopoverItem doesn't have an onClick.

## 3.1.0-canary.6

### Minor Changes

- [#1126](https://github.com/sumup-oss/circuit-ui/pull/1126) [`08b95cc6`](https://github.com/sumup-oss/circuit-ui/commit/08b95cc6a5f3c12c829bc3df8e36feac3a897915) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the option to display a badge next to a secondary navigation link.

## 3.1.0-canary.5

### Patch Changes

- [#1124](https://github.com/sumup-oss/circuit-ui/pull/1124) [`785878d9`](https://github.com/sumup-oss/circuit-ui/commit/785878d9936accf490850bb13dac6a09fa730b43) Thanks [@robinmetral](https://github.com/robinmetral)! - Changed the Popover behavior to close when one of the items is clicked.

## 3.1.0-canary.4

### Minor Changes

- [#1117](https://github.com/sumup-oss/circuit-ui/pull/1117) [`e878a6e6`](https://github.com/sumup-oss/circuit-ui/commit/e878a6e6986fc6ca31781cd916eee63df41c0d30) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a skeleton loading UI to the TopNavigation and SideNavigation components.

## 3.1.0-canary.3

### Patch Changes

- [#1114](https://github.com/sumup-oss/circuit-ui/pull/1114) [`159bd7ad`](https://github.com/sumup-oss/circuit-ui/commit/159bd7ad9f7aa6fd73528b209377e073c498e40e) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the styles returned by the `useCollapsible` hook to only hide vertical overflow, fixing a compatibility issue with the form components.

* [#1114](https://github.com/sumup-oss/circuit-ui/pull/1114) [`159bd7ad`](https://github.com/sumup-oss/circuit-ui/commit/159bd7ad9f7aa6fd73528b209377e073c498e40e) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed a number of issues in the navigation components, including adding a min-width when the secondary nav is hidden, closing the mobile navigation modal when a link is clicked, and exporting additional navigation types.

- [#1114](https://github.com/sumup-oss/circuit-ui/pull/1114) [`159bd7ad`](https://github.com/sumup-oss/circuit-ui/commit/159bd7ad9f7aa6fd73528b209377e073c498e40e) Thanks [@connor-baer](https://github.com/connor-baer)! - Prevented interactions with content behind the Popover overlay.

* [#1114](https://github.com/sumup-oss/circuit-ui/pull/1114) [`159bd7ad`](https://github.com/sumup-oss/circuit-ui/commit/159bd7ad9f7aa6fd73528b209377e073c498e40e) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the `TopNavigation`'s profile menu alignment when no `userId` is provided.

* Updated dependencies [[`159bd7ad`](https://github.com/sumup-oss/circuit-ui/commit/159bd7ad9f7aa6fd73528b209377e073c498e40e)]:
  - @sumup/icons@1.9.0-canary.1

## 3.1.0-canary.2

### Patch Changes

- Updated dependencies [[`c077b900`](https://github.com/sumup-oss/circuit-ui/commit/c077b90056aa9113910640ff7ebd93b0ff02b8ae)]:
  - @sumup/design-tokens@3.1.0-canary.0

## 3.1.0-canary.1

### Patch Changes

- [`c7c3f417`](https://github.com/sumup-oss/circuit-ui/commit/c7c3f4174601cd26b9f3b98228d406cf0531ec47) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the missing export for the SideNavigation component.

## 3.1.0-canary.0

### Minor Changes

- [#1092](https://github.com/sumup-oss/circuit-ui/pull/1092) [`7ad912fd`](https://github.com/sumup-oss/circuit-ui/commit/7ad912fd08976d2496f03ea7eeeb994413a82de7) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a new SideNavigation component. It is part of the [application shell](https://developers.google.com/web/fundamentals/architecture/app-shell) and contains the primary and secondary navigation links.

* [#1104](https://github.com/sumup-oss/circuit-ui/pull/1104) [`12ef7cf6`](https://github.com/sumup-oss/circuit-ui/commit/12ef7cf6c147e73b265139237751ecfa4fe37804) Thanks [@github-actions](https://github.com/apps/github-actions)! - Added a new TopNavigation component. It is part of the [application shell](https://developers.google.com/web/fundamentals/architecture/app-shell) and contains the branding, page links, and the user profile menu.

### Patch Changes

- Updated dependencies [[`12ef7cf6`](https://github.com/sumup-oss/circuit-ui/commit/12ef7cf6c147e73b265139237751ecfa4fe37804)]:
  - @sumup/icons@1.9.0-canary.0

## 3.0.1

### Patch Changes

- [#1097](https://github.com/sumup-oss/circuit-ui/pull/1097) [`7f52ad7d`](https://github.com/sumup-oss/circuit-ui/commit/7f52ad7de6468b2cb382d7818f28c39acba86efe) Thanks [@robinmetral](https://github.com/robinmetral)! - Bumped package versions to release the stable v3.

## 3.0.0

### Major Changes

- [#960](https://github.com/sumup-oss/circuit-ui/pull/960) [`1a1a3646`](https://github.com/sumup-oss/circuit-ui/commit/1a1a36466e096c20b0dd19dc468359d65341e0fe) Thanks [@robinmetral](https://github.com/robinmetral)! - The `TableHeader`, `TableRow` and `TableCell` components are no longer exported from Circuit. They are only used internally by the `Table` component and should not be used directly.

* [#979](https://github.com/sumup-oss/circuit-ui/pull/979) [`3cfefac0`](https://github.com/sumup-oss/circuit-ui/commit/3cfefac08339d8b45291b892b74a182226336b9b) Thanks [@robinmetral](https://github.com/robinmetral)! - Renamed the NotificationBanner component to NotificationCard. This frees up the NotificationBanner namespace for a new component that we will introduce in `v3.x`.

- [#972](https://github.com/sumup-oss/circuit-ui/pull/972) [`95488037`](https://github.com/sumup-oss/circuit-ui/commit/95488037472ced5952a41b55d67872ae2b2355d8) Thanks [@connor-baer](https://github.com/connor-baer)! - Replaced the deprecated `text[Kilo|Mega|Giga]` style mixins by a single `typography` mixin, and removed the deprecated `heading[Kilo|Mega|Giga|Tera|Peta|Exa|Zetta]` and `subHeading[Kilo|Mega]` style mixins.

* [#992](https://github.com/sumup-oss/circuit-ui/pull/992) [`b898410e`](https://github.com/sumup-oss/circuit-ui/commit/b898410ef865d31b8b1d9b62c2928069e4d9f899) Thanks [@robinmetral](https://github.com/robinmetral)! - Switched to the new JSX transform with automatic runtime. You will need to update your Babel config to use Emotion's JSX runtime. For example, with Next.js and Emotion 10:

- [#984](https://github.com/sumup-oss/circuit-ui/pull/984) [`7879a990`](https://github.com/sumup-oss/circuit-ui/commit/7879a9901c06e389135e0d22697b97669c485949) Thanks [@amelako](https://github.com/amelako)! - Increased the Button sizes to match other form components and renamed the default size from `mega` to `giga`.

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Harmonized the label prop names across components to follow the `actionLabel` pattern.

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Enforced accessible labels in several components. This is an accessibility requirement. If the labels are not provided, the interaction will be disabled.

* [#884](https://github.com/sumup-oss/circuit-ui/pull/884) [`eb9e0b47`](https://github.com/sumup-oss/circuit-ui/commit/eb9e0b474e675f13c9876e22857a170665e9a92f) Thanks [@amelako](https://github.com/amelako)! - The new semantic typography components make it clear when each should be used, are flexible enough to cover all use cases. To represent more semantic variations some of the sizes have been removed and new size names added.

- [#960](https://github.com/sumup-oss/circuit-ui/pull/960) [`1a1a3646`](https://github.com/sumup-oss/circuit-ui/commit/1a1a36466e096c20b0dd19dc468359d65341e0fe) Thanks [@robinmetral](https://github.com/robinmetral)! - Default `data-testid`s are no longer built into the `Table` component. They can still be passed manually. We also recommend [querying by role](https://testing-library.com/docs/queries/about/#priority) in tests, for them to resemble how users interact with the code. You can find examples in the component's specs.

* [#943](https://github.com/sumup-oss/circuit-ui/pull/943) [`0543719b`](https://github.com/sumup-oss/circuit-ui/commit/0543719bfceaf616829a223f9e4f306539fbcc15) Thanks [@mykolaharmash](https://github.com/mykolaharmash)! - `Selector` now has multiple `size` options. `SelectorGroup` is changed to horizontal layout and to be inline element by default with an option to stretch to full width.

* [#985](https://github.com/sumup-oss/circuit-ui/pull/985) [`61c15cf7`](https://github.com/sumup-oss/circuit-ui/commit/61c15cf7a5a23fb723a2d9a0b1434639bc8ae700) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the experimental static styles extraction feature.

- [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Enforced the `Input` and `Select`'s built-in `label` prop. Do not use the `Label` component separately and pass the label as a prop instead.

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the `ProgressBar`'s deprecated `children` prop. Use the `label` prop instead.

- [#960](https://github.com/sumup-oss/circuit-ui/pull/960) [`1a1a3646`](https://github.com/sumup-oss/circuit-ui/commit/1a1a36466e096c20b0dd19dc468359d65341e0fe) Thanks [@robinmetral](https://github.com/robinmetral)! - The `TableHeader`, `TableRow` and `TableCell` components are no longer exported from Circuit. They should only be used internally by the `Table` component.

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `shadow` prop from the `Card`, shadows have been replaced by a single outline.

- [#984](https://github.com/sumup-oss/circuit-ui/pull/984) [`7879a990`](https://github.com/sumup-oss/circuit-ui/commit/7879a9901c06e389135e0d22697b97669c485949) Thanks [@amelako](https://github.com/amelako)! - Aligned the heights of all form components to be consistent. The new size values are:

- [#960](https://github.com/sumup-oss/circuit-ui/pull/960) [`1a1a3646`](https://github.com/sumup-oss/circuit-ui/commit/1a1a36466e096c20b0dd19dc468359d65341e0fe) Thanks [@robinmetral](https://github.com/robinmetral)! - Changed the signature of the Table's custom onSortBy method. The `nextDirection` argument moved to the third position (`(index, nextDirection, rows)` 👉 `(index, rows, nextDirection)`) and can now be `undefined` (instead of `null` in the previous implementation).

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the `data-testid` attribute from the `CardHeader`'s close button. Use `queryByRole('button')` in your tests instead.

- [#949](https://github.com/sumup-oss/circuit-ui/pull/949) [`4e636205`](https://github.com/sumup-oss/circuit-ui/commit/4e6362052643b86d904acd1dbe9b52768e8b57c0) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the exports of the `Modal`, `ModalWrapper`, `ModalHeader`, `ModalFooter`, `ModalContext`, and `ModalConsumer` components. Use the `useModal` hook instead.

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the aggregate `styleHelpers` export. Import each style mixin directly instead.

- [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the `themePropType` export from `@sumup/circuit-ui`. Import it from `@sumup/design-tokens` instead.

* [#944](https://github.com/sumup-oss/circuit-ui/pull/944) [`2628fce1`](https://github.com/sumup-oss/circuit-ui/commit/2628fce1b93dd5a1ef1fc4b05a6a29ccf5469f9d) Thanks [@amelako](https://github.com/amelako)! - Rebuilt the `Popover` component. It now uses Popper v2 and comes with a refreshed component API.

- [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `withComponents` HOC. Use the `useComponents` hook instead.

* [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `Spacing` component. Use the `spacing` style mixin instead.

- [#995](https://github.com/sumup-oss/circuit-ui/pull/995) [`bd234296`](https://github.com/sumup-oss/circuit-ui/commit/bd23429679f2644ccfdc3fe3ebbad190e9948f09) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the `onClick` prop from the `Badge`. Badges are not meant to be interactive and should only communicate the status of an element. Use the Tag component for interactive elements instead. The `primary` variant of the Badge was also removed. Use the `neutral` variant instead.

- [#1008](https://github.com/sumup-oss/circuit-ui/pull/1008) [`e76f2d03`](https://github.com/sumup-oss/circuit-ui/commit/e76f2d03e2525c0ddcae9e5590f7ee086e7520f7) Thanks [@connor-baer](https://github.com/connor-baer)! - Made the `as` prop required in the `Headline` and `SubHeadline` components. Intentionally setting the heading level ensures a consistent and accessible page structure.

* [#1082](https://github.com/sumup-oss/circuit-ui/pull/1082) [`00ee3ffb`](https://github.com/sumup-oss/circuit-ui/commit/00ee3ffba760af3e9721e479a0f263d9a2f2c2e1) Thanks [@connor-baer](https://github.com/connor-baer)! - Tweaked the Hamburger design and aligned its height with the Button component.

* [#1080](https://github.com/sumup-oss/circuit-ui/pull/1080) [`91324688`](https://github.com/sumup-oss/circuit-ui/commit/9132468817078649c91d032ed837ede494ee6da1) Thanks [@robinmetral](https://github.com/robinmetral)! - Added a development-only check for required label props that throws a runtime error if any is missing.

- [#1014](https://github.com/sumup-oss/circuit-ui/pull/1014) [`2e0e4381`](https://github.com/sumup-oss/circuit-ui/commit/2e0e43816bbb15281cd4afdc5aca6c0d89d6e669) Thanks [@connor-baer](https://github.com/connor-baer)! - Restricted the `Headline`'s and `SubHeadline`'s `as` prop to heading elements.

* [#1073](https://github.com/sumup-oss/circuit-ui/pull/1073) [`5eaa9520`](https://github.com/sumup-oss/circuit-ui/commit/5eaa9520acde4345dda01383ba28bde540c2cf40) Thanks [@connor-baer](https://github.com/connor-baer)! - Made the label of the SelectorGroup visible by default. It can be hidden with the `hideLabel` prop, but this should only be done in rare cases and only if the purpose of the field can be inferred from context.

- [#1077](https://github.com/sumup-oss/circuit-ui/pull/1077) [`4166e2ea`](https://github.com/sumup-oss/circuit-ui/commit/4166e2ea1bacadfba8bb0a41648c4692031684ee) Thanks [@connor-baer](https://github.com/connor-baer)! - Aligned the Calendar styles with other input components and injected the styles as global styles. Previously, they were scoped to a parent classname which prevented the use of the `withPortal` prop.

### Minor Changes

- [#984](https://github.com/sumup-oss/circuit-ui/pull/984) [`7879a990`](https://github.com/sumup-oss/circuit-ui/commit/7879a9901c06e389135e0d22697b97669c485949) Thanks [@amelako](https://github.com/amelako)! - Added a `size` prop to the Spinner component. The possible values are `byte`, `kilo` (default), and `giga`.

* [#884](https://github.com/sumup-oss/circuit-ui/pull/884) [`eb9e0b47`](https://github.com/sumup-oss/circuit-ui/commit/eb9e0b474e675f13c9876e22857a170665e9a92f) Thanks [@amelako](https://github.com/amelako)! - Added new `success`, `error` and `subtle` variants to the `Body` and `Anchor` component.

- [#1089](https://github.com/sumup-oss/circuit-ui/pull/1089) [`2d216980`](https://github.com/sumup-oss/circuit-ui/commit/2d2169805eddc54f2b54d42ed151b078f59711b3) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a `useCollapsible` hook to build accessible and smoothly animated collapsible sections.

* [#1023](https://github.com/sumup-oss/circuit-ui/pull/1023) [`07614c5f`](https://github.com/sumup-oss/circuit-ui/commit/07614c5f618a6904df66fb149fb44856756e0d80) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the `useClickOutside`, `useEscapeKey`, and `useFocusList` hooks which can be used to make custom components more keyboard accessible.

- [#997](https://github.com/sumup-oss/circuit-ui/pull/997) [`4e6bbfea`](https://github.com/sumup-oss/circuit-ui/commit/4e6bbfeaccacfdf558488cfd20151ea25b23560d) Thanks [@robinmetral](https://github.com/robinmetral)! - Exported missing style mixins from Circuit UI.

* [#1074](https://github.com/sumup-oss/circuit-ui/pull/1074) [`1869c218`](https://github.com/sumup-oss/circuit-ui/commit/1869c21810c10182e6ace038e096c0e1d68a489c) Thanks [@connor-baer](https://github.com/connor-baer)! - Persisted the active state of the Button when it is pressed or an associated menu is expanded.

- [#1022](https://github.com/sumup-oss/circuit-ui/pull/1022) [`afb2eb29`](https://github.com/sumup-oss/circuit-ui/commit/afb2eb29c41753caf6c3d797087629907bdba9bc) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the `focusVisible` style mixin that shows a focus outline only when the user agent determines via heuristics that the focus should be made evident on the element (see [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)).

* [#1073](https://github.com/sumup-oss/circuit-ui/pull/1073) [`5eaa9520`](https://github.com/sumup-oss/circuit-ui/commit/5eaa9520acde4345dda01383ba28bde540c2cf40) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a `hideLabel` prop to the RadioButtonGroup to visually hide the label. This should only be used in rare cases and only if the purpose of the field can be inferred from context.

### Patch Changes

- [#980](https://github.com/sumup-oss/circuit-ui/pull/980) [`900e6bc4`](https://github.com/sumup-oss/circuit-ui/commit/900e6bc465e4f909ab000403da3d17724f2ab73e) Thanks [@robinmetral](https://github.com/robinmetral)! - Tweaked components (`Anchor`, `InlineMessage`, `SearchInput`, `Selector`, `Tag`) to use the new border radius values.

* [#960](https://github.com/sumup-oss/circuit-ui/pull/960) [`1a1a3646`](https://github.com/sumup-oss/circuit-ui/commit/1a1a36466e096c20b0dd19dc468359d65341e0fe) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed a UI bug in the `Table` component where multiple words in a table header would wrap on mobile, and break row alignment.

- [#1051](https://github.com/sumup-oss/circuit-ui/pull/1051) [`9234ebc3`](https://github.com/sumup-oss/circuit-ui/commit/9234ebc3dd322e6d57eb36b6315d0344339dd1d5) Thanks [@robinmetral](https://github.com/robinmetral)! - Tweaked the Card component interface to support any optional ref.

- [#1078](https://github.com/sumup-oss/circuit-ui/pull/1078) [`ee1446a3`](https://github.com/sumup-oss/circuit-ui/commit/ee1446a31a7c82f69711233a83c638958d0e09a4) Thanks [@amelako](https://github.com/amelako)! - Fixed the CurrencyInput bug for Chile locale where shouldn’t be any fraction digits in the input.

## 3.0.0-next.14

### Patch Changes

- [#1087](https://github.com/sumup-oss/circuit-ui/pull/1087) [`9ac7aa8f`](https://github.com/sumup-oss/circuit-ui/commit/9ac7aa8f26e60ad6fa82abd92cb153474eadde99) Thanks [@connor-baer](https://github.com/connor-baer)! - Improved fullscreen display of immersive Modals on iOS and added bottom padding to the Modal content to clear any browser chrome overlays.

## 3.0.0-next.13

### Patch Changes

- [`be99e904`](https://github.com/sumup-oss/circuit-ui/commit/be99e9049f366070cf2c99fe4af5193d05546089) Thanks [@robinmetral](https://github.com/robinmetral)! - Passed a dummy label to the `ImageInput`'s presentational `AddButton` to prevent it from throwing because of a missing label.

## 3.0.0-next.12

### Minor Changes

- [#1083](https://github.com/sumup-oss/circuit-ui/pull/1083) [`3513326a`](https://github.com/sumup-oss/circuit-ui/commit/3513326aa70e43b8f1314869dcede8555adf5110) Thanks [@robinmetral](https://github.com/robinmetral)! - Added an escape hatch to silence accessibility errors in development when the `UNSAFE_DISABLE_ACCESSIBILITY_ERRORS` environment variable is set to `true`.

## 3.0.0-next.11

### Major Changes

- [#1082](https://github.com/sumup-oss/circuit-ui/pull/1082) [`00ee3ffb`](https://github.com/sumup-oss/circuit-ui/commit/00ee3ffba760af3e9721e479a0f263d9a2f2c2e1) Thanks [@connor-baer](https://github.com/connor-baer)! - Tweaked the Hamburger design and aligned its height with the Button component.

* [#1080](https://github.com/sumup-oss/circuit-ui/pull/1080) [`91324688`](https://github.com/sumup-oss/circuit-ui/commit/9132468817078649c91d032ed837ede494ee6da1) Thanks [@robinmetral](https://github.com/robinmetral)! - Added a development-only check for required label props that throws a runtime error if any is missing.

### Patch Changes

- [#1082](https://github.com/sumup-oss/circuit-ui/pull/1082) [`00ee3ffb`](https://github.com/sumup-oss/circuit-ui/commit/00ee3ffba760af3e9721e479a0f263d9a2f2c2e1) Thanks [@connor-baer](https://github.com/connor-baer)! - Reduced the height of the Button's `kilo` size from 34px to 32px to align it with the other components.

## 3.0.0-next.10

### Patch Changes

- [#1078](https://github.com/sumup-oss/circuit-ui/pull/1078) [`ee1446a3`](https://github.com/sumup-oss/circuit-ui/commit/ee1446a31a7c82f69711233a83c638958d0e09a4) Thanks [@amelako](https://github.com/amelako)! - Fixed the CurrencyInput bug for Chile locale where shouldn’t be any fraction digits in the input.

## 3.0.0-next.9

### Major Changes

- [#1073](https://github.com/sumup-oss/circuit-ui/pull/1073) [`5eaa9520`](https://github.com/sumup-oss/circuit-ui/commit/5eaa9520acde4345dda01383ba28bde540c2cf40) Thanks [@connor-baer](https://github.com/connor-baer)! - Made the label of the SelectorGroup visible by default. It can be hidden with the `hideLabel` prop, but this should only be done in rare cases and only if the purpose of the field can be inferred from context.

* [#1077](https://github.com/sumup-oss/circuit-ui/pull/1077) [`4166e2ea`](https://github.com/sumup-oss/circuit-ui/commit/4166e2ea1bacadfba8bb0a41648c4692031684ee) Thanks [@connor-baer](https://github.com/connor-baer)! - Aligned the Calendar styles with other input components and injected the styles as global styles. Previously, they were scoped to a parent classname which prevented the use of the `withPortal` prop.

### Minor Changes

- [#1074](https://github.com/sumup-oss/circuit-ui/pull/1074) [`1869c218`](https://github.com/sumup-oss/circuit-ui/commit/1869c21810c10182e6ace038e096c0e1d68a489c) Thanks [@connor-baer](https://github.com/connor-baer)! - Persisted the active state of the Button when it is pressed or an associated menu is expanded.

* [#1073](https://github.com/sumup-oss/circuit-ui/pull/1073) [`5eaa9520`](https://github.com/sumup-oss/circuit-ui/commit/5eaa9520acde4345dda01383ba28bde540c2cf40) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a `hideLabel` prop to the RadioButtonGroup to visually hide the label. This should only be used in rare cases and only if the purpose of the field can be inferred from context.

### Patch Changes

- [#1077](https://github.com/sumup-oss/circuit-ui/pull/1077) [`4166e2ea`](https://github.com/sumup-oss/circuit-ui/commit/4166e2ea1bacadfba8bb0a41648c4692031684ee) Thanks [@connor-baer](https://github.com/connor-baer)! - Allowed content to overflow the Modal.

* [#1072](https://github.com/sumup-oss/circuit-ui/pull/1072) [`35a6048c`](https://github.com/sumup-oss/circuit-ui/commit/35a6048cb16c29deb22270ded6769d020b1be346) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the `useClickOutside` hook when the clicked element is inside the container and removed from the DOM immediately after the click.

## 3.0.0-next.8

### Patch Changes

- [#1070](https://github.com/sumup-oss/circuit-ui/pull/1070) [`94fee802`](https://github.com/sumup-oss/circuit-ui/commit/94fee802c607005501b87148a93703c15530cf2f) Thanks [@connor-baer](https://github.com/connor-baer)! - Implemented a temporary fix for the `removeModal` method.

* [#1070](https://github.com/sumup-oss/circuit-ui/pull/1070) [`94fee802`](https://github.com/sumup-oss/circuit-ui/commit/94fee802c607005501b87148a93703c15530cf2f) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the overflow behavior of Modals, including an iOS-specific issue.

## 3.0.0-next.7

### Patch Changes

- [#1068](https://github.com/sumup-oss/circuit-ui/pull/1068) [`3f06e091`](https://github.com/sumup-oss/circuit-ui/commit/3f06e09184706d7ee6646cc879b5ffc03d4560cd) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed the contextual modal heights to match content height instead of 90vh.

## 3.0.0-next.6

### Patch Changes

- [#1067](https://github.com/sumup-oss/circuit-ui/pull/1067) [`aa40cd8d`](https://github.com/sumup-oss/circuit-ui/commit/aa40cd8da9adf0ebda2c25d2892e2eb2c4d586a9) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the scrolling behaviour when the content overflows a Modal.

* [#1065](https://github.com/sumup-oss/circuit-ui/pull/1065) [`8322bd64`](https://github.com/sumup-oss/circuit-ui/commit/8322bd647583de510ab12f3bba25b60233dbe8fd) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the stacking order of a Popover inside a Modal.

## 3.0.0-next.5

### Patch Changes

- [#1059](https://github.com/sumup-oss/circuit-ui/pull/1059) [`a76a5954`](https://github.com/sumup-oss/circuit-ui/commit/a76a5954c61b27dd6a4fb61337eef8bcea28036e) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed a layout bug when a Popover was rendered inside a Modal.

* [#1061](https://github.com/sumup-oss/circuit-ui/pull/1061) [`37a4950f`](https://github.com/sumup-oss/circuit-ui/commit/37a4950f569b41a31f17a8633808c22ab64b45ed) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the Modal's min-height to support modals with little content.

- [#1062](https://github.com/sumup-oss/circuit-ui/pull/1062) [`6a6e1f06`](https://github.com/sumup-oss/circuit-ui/commit/6a6e1f06ffe635cf8eafa04b2621fa99f7bcfd2a) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed the JSX runtime import source for Circuit UI package.

* [#1055](https://github.com/sumup-oss/circuit-ui/pull/1055) [`a4a514fd`](https://github.com/sumup-oss/circuit-ui/commit/a4a514fd41e70095ed4722faf6a41cfcb80fa828) Thanks [@connor-baer](https://github.com/connor-baer)! - Prevented pointer events when the Popover is closed. Previously, it would obstruct the content behind it.

## 3.0.0-next.4

### Patch Changes

- [#1051](https://github.com/sumup-oss/circuit-ui/pull/1051) [`9234ebc3`](https://github.com/sumup-oss/circuit-ui/commit/9234ebc3dd322e6d57eb36b6315d0344339dd1d5) Thanks [@robinmetral](https://github.com/robinmetral)! - Tweaked the Card component interface to support any optional ref.

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

## 2.8.0

### Minor Changes

- [#1053](https://github.com/sumup-oss/circuit-ui/pull/1053) [`ad7d6c8a`](https://github.com/sumup-oss/circuit-ui/commit/ad7d6c8aa43f362b9591e2f758316ff94da6dd0b) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for drag'n'drop and paste to the ImageInput.

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
