# @sumup/circuit-ui

## 8.13.2

### Patch Changes

- [#2687](https://github.com/sumup-oss/circuit-ui/pull/2687) [`2e85454`](https://github.com/sumup-oss/circuit-ui/commit/2e85454eb631250fd231783085957d2dfef5609f) Thanks [@matoous](https://github.com/matoous)! - Fixed event and values handling for the experimental ColorInput component.

## 8.13.1

### Patch Changes

- [#2682](https://github.com/sumup-oss/circuit-ui/pull/2682) [`032b696`](https://github.com/sumup-oss/circuit-ui/commit/032b696ead332d5fa52cf22a62e91c77bf7e0d5f) Thanks [@matoous](https://github.com/matoous)! - Added the missing exports for the experimental ColorInput component.

## 8.13.0

### Minor Changes

- [#2679](https://github.com/sumup-oss/circuit-ui/pull/2679) [`ce178f8`](https://github.com/sumup-oss/circuit-ui/commit/ce178f8b6463e4c3a93fc3a5551af8cae05247a2) Thanks [@connor-baer](https://github.com/connor-baer)! - Deprecated the Toggle component's `checkedLabel` and `uncheckedLabel` props since they are no longer needed.

- [#2655](https://github.com/sumup-oss/circuit-ui/pull/2655) [`5c62949`](https://github.com/sumup-oss/circuit-ui/commit/5c629491b1bb8f7fe1eeeca5cff4918eefdb91f9) Thanks [@matoous](https://github.com/matoous)! - Added an experimental ColorInput component that enables users to type or select a color.

## 8.12.1

### Patch Changes

- [#2646](https://github.com/sumup-oss/circuit-ui/pull/2646) [`3cdcd69`](https://github.com/sumup-oss/circuit-ui/commit/3cdcd69588af28f7dc9dd6b17a194e87b39f1aeb) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed invalid HTML attributes from the Table component.

## 8.12.0

### Minor Changes

- [#2642](https://github.com/sumup-oss/circuit-ui/pull/2642) [`d53ccb1`](https://github.com/sumup-oss/circuit-ui/commit/d53ccb100806680039ad6d5429a614696efd5c87) Thanks [@connor-baer](https://github.com/connor-baer)! - Switched the ImageInput's button variant from `primary` to `secondary` to improve its appearance on dark backgrounds.

## 8.11.0

### Minor Changes

- [#2551](https://github.com/sumup-oss/circuit-ui/pull/2551) [`d2115fb`](https://github.com/sumup-oss/circuit-ui/commit/d2115fba00c50668081ad40a34abce7abaa6d2a2) Thanks [@connor-baer](https://github.com/connor-baer)! - Always use the secondary Button variant for the second button in a ButtonGroup. Previously, it switched to the tertiary variant in narrow spaces.

- [#2551](https://github.com/sumup-oss/circuit-ui/pull/2551) [`d2115fb`](https://github.com/sumup-oss/circuit-ui/commit/d2115fba00c50668081ad40a34abce7abaa6d2a2) Thanks [@connor-baer](https://github.com/connor-baer)! - Tweaked the Button's updated design to improve its usability.

  - Normalized the border-radius to 8px for all sizes.
  - Removed the horizontal padding of the tertiary variant and improved the color contrast its underline.
  - Updated the disabled styles to better distinguish the button variants.

## 8.10.2

### Patch Changes

- [#2611](https://github.com/sumup-oss/circuit-ui/pull/2611) [`4d394a6`](https://github.com/sumup-oss/circuit-ui/commit/4d394a6d2ba2e3dd58010af23ef36825afe28b40) Thanks [@connor-baer](https://github.com/connor-baer)! - Increased the NotificationBanner content's maximum width to better use the available space on wide viewports.

- [#2610](https://github.com/sumup-oss/circuit-ui/pull/2610) [`b895f7e`](https://github.com/sumup-oss/circuit-ui/commit/b895f7e8351559e079fc2c9b9f5be1f5b753b821) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed a style specificity issue in the PhoneNumberInput component.

## 8.10.1

### Patch Changes

- [#2601](https://github.com/sumup-oss/circuit-ui/pull/2601) [`c33d370`](https://github.com/sumup-oss/circuit-ui/commit/c33d3702c115346f82e4ba80d207d9794ee8b828) Thanks [@roma-claudio](https://github.com/roma-claudio)! - Fixed the visibility of the PhoneNumberInput's country code prefix when hovered or focused.

## 8.10.0

### Minor Changes

- [#2577](https://github.com/sumup-oss/circuit-ui/pull/2577) [`c3dc064`](https://github.com/sumup-oss/circuit-ui/commit/c3dc0649dd721c7c175fdf9bc484d677838a7f96) Thanks [@voronianski](https://github.com/voronianski)! - Added new `position` and `className` props to the ToastProvider component.

## 8.9.1

### Patch Changes

- [#2578](https://github.com/sumup-oss/circuit-ui/pull/2578) [`3c026f3`](https://github.com/sumup-oss/circuit-ui/commit/3c026f334de98062f7dc85d661b99f8cd4eee00a) Thanks [@connor-baer](https://github.com/connor-baer)! - Balanced the widths of the PhoneNumberInput component's country code and subscriber number fields.

## 8.9.0

### Minor Changes

- [#2500](https://github.com/sumup-oss/circuit-ui/pull/2500) [`349be76`](https://github.com/sumup-oss/circuit-ui/commit/349be7665e1e3dd079fbd61a7f42321ad6488138) Thanks [@roma-claudio](https://github.com/roma-claudio)! - Added an experimental PhoneNumberInput component to provide a straightforward way for users to type their phone number in an accurate, consistent format including the country code and subscriber number.

## 8.8.4

### Patch Changes

- [#2497](https://github.com/sumup-oss/circuit-ui/pull/2497) [`03c3c31`](https://github.com/sumup-oss/circuit-ui/commit/03c3c3136e44c03a7a96b7b06a40b87fc64bf004) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed polyfill for the `dialog` element to work in isomorphic environments.

## 8.8.3

### Patch Changes

- [`c10a6f9`](https://github.com/sumup-oss/circuit-ui/commit/c10a6f909022d3bb68cc02703acde718d0d3f802) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the display of the month headline and weekday names in the Calendar component.

## 8.8.2

### Patch Changes

- [#2516](https://github.com/sumup-oss/circuit-ui/pull/2516) [`d3ce6bf`](https://github.com/sumup-oss/circuit-ui/commit/d3ce6bf7613e90c66c542fc1c95d754ef79c3b75) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the size of the main content while the SidePanel's `onClose` callback is pending.

## 8.8.1

### Patch Changes

- [#2514](https://github.com/sumup-oss/circuit-ui/pull/2514) [`8217e7b`](https://github.com/sumup-oss/circuit-ui/commit/8217e7b88594e8adc16d169e076cf61e42aa3fff) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the positioning of the Calender component's month navigation buttons.

- [#2514](https://github.com/sumup-oss/circuit-ui/pull/2514) [`8217e7b`](https://github.com/sumup-oss/circuit-ui/commit/8217e7b88594e8adc16d169e076cf61e42aa3fff) Thanks [@connor-baer](https://github.com/connor-baer)! - Deprecated the RangePickerController component. Use the experimental Calendar component instead.

## 8.8.0

### Minor Changes

- [#2511](https://github.com/sumup-oss/circuit-ui/pull/2511) [`3e98f16`](https://github.com/sumup-oss/circuit-ui/commit/3e98f16b3bdc8cb89be22d58376472cb363d35f3) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a new `useMedia` hook to track the state of a [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries).

- [#2499](https://github.com/sumup-oss/circuit-ui/pull/2499) [`def7f98`](https://github.com/sumup-oss/circuit-ui/commit/def7f98b30da1a110f30c218a5382c586d7d6ded) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for the SidePanel's `onClose` prop to be asynchronous. The SidePanel is closed after the `onClose` callback resolves and is prevented from closing if the callback rejects.

- [#2494](https://github.com/sumup-oss/circuit-ui/pull/2494) [`3d3ae20`](https://github.com/sumup-oss/circuit-ui/commit/3d3ae201bd816b381c6000c47a6f88025719a3a0) Thanks [@connor-baer](https://github.com/connor-baer)! - Added an experimental Calendar component that displays a monthly date grid. This is a low-level component for advanced use cases; new DateInput and DateRangeInput components are in development.

- [#2494](https://github.com/sumup-oss/circuit-ui/pull/2494) [`3d3ae20`](https://github.com/sumup-oss/circuit-ui/commit/3d3ae201bd816b381c6000c47a6f88025719a3a0) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a new `useSwipe` hook to detect swipe gestures on touch screen devices.

## 8.7.0

### Minor Changes

- [#2491](https://github.com/sumup-oss/circuit-ui/pull/2491) [`35ee26a`](https://github.com/sumup-oss/circuit-ui/commit/35ee26ad6c3c08a1fe4d06c336fa9217a17ee3c0) Thanks [@Burtchen](https://github.com/Burtchen)! - Renamed the Table's `initialSortedRow` prop to `initialSortedColumn` to better express its purpose. The `initialSortedRow` is deprecated and will be removed in the next major release.
- [#2508](https://github.com/sumup-oss/circuit-ui/pull/2508) [`5e90c53`](https://github.com/sumup-oss/circuit-ui/commit/5e90c53772a48acb811f957eb2d073f9d3cfb3c4) Thanks [@connor-baer](https://github.com/connor-baer)! Reverted the overflow behaviour of long Button labels. Text that would previously be truncated to a single line with a trailing ellipsis once again wraps to multiple lines, as it did before v8.

## 8.6.2

### Patch Changes

- [#2489](https://github.com/sumup-oss/circuit-ui/pull/2489) [`c97a10a`](https://github.com/sumup-oss/circuit-ui/commit/c97a10afa19cec3beb3a994ad623b95c47ace7a4) Thanks [@connor-baer](https://github.com/connor-baer)! - Reverted usage of the experimental Tooltip component in the IconButton, Pagination, and Table components. Testing the change in applications surfaced too many edge cases and conflicts. The changes will be re-applied in the next major release.

## 8.6.1

### Patch Changes

- [#2486](https://github.com/sumup-oss/circuit-ui/pull/2486) [`54dbfd2`](https://github.com/sumup-oss/circuit-ui/commit/54dbfd23e9daed9792369995b847a62d7771bc28) Thanks [@connor-baer](https://github.com/connor-baer)! - Switched to using an option's `value` instead of its `label` as the [React key](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) in the CheckboxGroup, RadioButtonGroup and SelectorGroup components.

## 8.6.0

### Minor Changes

⚠️ This version adds two new dependencies to Circuit UI: `@nanostores/react` and `nanostores`. Both packages use the ES Module format and might need to be transpiled (e.g. for Jest).

- [`2d69309`](https://github.com/sumup-oss/circuit-ui/commit/2d6930930204bc7da2772e411b841237f144e64f) Thanks [@connor-baer](https://github.com/connor-baer)! - Added experimental Tooltip and Toggletip components to display additional information that is contextual, helpful, and nonessential to clarify the purpose of otherwise ambiguous elements.

- [`2d69309`](https://github.com/sumup-oss/circuit-ui/commit/2d6930930204bc7da2772e411b841237f144e64f) Thanks [@connor-baer](https://github.com/connor-baer)! - Extended the function signature of the `useClickOutside` hook to accept an array of refs as its first argument.

- [#2481](https://github.com/sumup-oss/circuit-ui/pull/2481) [`43951d0`](https://github.com/sumup-oss/circuit-ui/commit/43951d01fa9b0d9671192e654d5476199d66c55a) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for passing custom components to the `links` prop of the TopNavigation component and deprecated the `user` and `profileMenu` props.

## 8.5.4

### Patch Changes

- [#2483](https://github.com/sumup-oss/circuit-ui/pull/2483) [`76657a1`](https://github.com/sumup-oss/circuit-ui/commit/76657a176dd2946753b6db08c233746135be62f5) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the semantics of the TopNavigation's profile menu.

- [`67e49bc`](https://github.com/sumup-oss/circuit-ui/commit/67e49bc09702406f564c9db7cbcd93f52b8e9309) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the disabled styles of the Input and Select components.

## 8.5.3

### Patch Changes

- [#2478](https://github.com/sumup-oss/circuit-ui/pull/2478) [`9d0bfdc`](https://github.com/sumup-oss/circuit-ui/commit/9d0bfdcf30d52557dd0043b1cde4537128fd78a7) Thanks [@andonimihai](https://github.com/andonimihai)! - Fixed the display of the slides in the composed Carousel component.

## 8.5.2

### Patch Changes

- [#2469](https://github.com/sumup-oss/circuit-ui/pull/2469) [`1a2e807`](https://github.com/sumup-oss/circuit-ui/commit/1a2e807c172711d1e4a973d74b813c717072eff5) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the `aria-pressed="true"` attribute to the Tag component when it is rendered as a selected button.

- [#2469](https://github.com/sumup-oss/circuit-ui/pull/2469) [`1a2e807`](https://github.com/sumup-oss/circuit-ui/commit/1a2e807c172711d1e4a973d74b813c717072eff5) Thanks [@connor-baer](https://github.com/connor-baer)! - Wired up the total number of pages to the page `select` as its accessible description in the Pagination component.

- [#2469](https://github.com/sumup-oss/circuit-ui/pull/2469) [`1a2e807`](https://github.com/sumup-oss/circuit-ui/commit/1a2e807c172711d1e4a973d74b813c717072eff5) Thanks [@connor-baer](https://github.com/connor-baer)! - Added instructions for writing relevant alternative text for images.

- [#2469](https://github.com/sumup-oss/circuit-ui/pull/2469) [`1a2e807`](https://github.com/sumup-oss/circuit-ui/commit/1a2e807c172711d1e4a973d74b813c717072eff5) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the semantics from the Hr component by default since its most commonly used for purely visual or aesthetic purposes. If the horizontal rule is useful or essential to understanding the structure of the content, pass the `aria-hidden="false"` attribute to restore its semantics.

- [#2469](https://github.com/sumup-oss/circuit-ui/pull/2469) [`1a2e807`](https://github.com/sumup-oss/circuit-ui/commit/1a2e807c172711d1e4a973d74b813c717072eff5) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the redundant `aria-label` label from the TableHeader component.

## 8.5.1

### Patch Changes

- [#2461](https://github.com/sumup-oss/circuit-ui/pull/2461) [`ea05708`](https://github.com/sumup-oss/circuit-ui/commit/ea057089c1c4d3b3cb769de94766ce5dcc2789a8) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the missing focus outline of the Anchor component when it renders as the `a` element.

## 8.5.0

### Minor Changes

- [`779a911`](https://github.com/sumup-oss/circuit-ui/commit/779a911bb080dfc129f471ab08a22cf7675adc33) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the CloseButton to use the _tertiary_ instead of the _secondary_ Button variant.

- [`779a911`](https://github.com/sumup-oss/circuit-ui/commit/779a911bb080dfc129f471ab08a22cf7675adc33) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the background color of the active Toggle to green to better distinguish its states.

## 8.4.1

### Patch Changes

- [#2448](https://github.com/sumup-oss/circuit-ui/pull/2448) [`9b6c7d6`](https://github.com/sumup-oss/circuit-ui/commit/9b6c7d68820d557dfdcf1b14b2a2b96275d9e353) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the `use client` directive to a few more components that require it.

## 8.4.0

### Minor Changes

- [`ad4c31f`](https://github.com/sumup-oss/circuit-ui/commit/ad4c31fcafcde9f8534c5793dfc1c7b04d645980) Thanks [@connor-baer](https://github.com/connor-baer)! - Made all components compatible with [React Server Components](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md) out of the box by adding the [`use client`](https://react.dev/reference/react/use-client) directive to client components.

### Patch Changes

- [`f1977ef`](https://github.com/sumup-oss/circuit-ui/commit/f1977ef93fadfbbc8a255a3a616ff814e23cba50) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed how CSS Modules are bundled to fix CSS specificity issues caused by out-of-order styles.

## 8.3.1

### Patch Changes

- [#2434](https://github.com/sumup-oss/circuit-ui/pull/2434) [`789d796`](https://github.com/sumup-oss/circuit-ui/commit/789d79685bd3c5c5d7908bc960ae490c60a1811f) Thanks [@connor-baer](https://github.com/connor-baer)! - Fix the display and transition of Carousel slides.

- [#2433](https://github.com/sumup-oss/circuit-ui/pull/2433) [`0e0a8e8`](https://github.com/sumup-oss/circuit-ui/commit/0e0a8e8bd261ff7cc8705f26a3b90c08620060ee) Thanks [@connor-baer](https://github.com/connor-baer)! - Adjust components to better support the experimental dark theme.

## 8.3.0

### Minor Changes

- [#2414](https://github.com/sumup-oss/circuit-ui/pull/2414) [`5d7a92f`](https://github.com/sumup-oss/circuit-ui/commit/5d7a92f45c2475e1b9b705d2e2c349e5f9969437) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a minimum height to the SidePanelProvider to allow its children to be vertically centered.

## 8.2.0

### Minor Changes

- [#2394](https://github.com/sumup-oss/circuit-ui/pull/2394) [`0d9d407`](https://github.com/sumup-oss/circuit-ui/commit/0d9d407dc3eb3a0384679890b5e476a704907749) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a PercentageInput component for fractional numeric values.

### Patch Changes

- [#2412](https://github.com/sumup-oss/circuit-ui/pull/2412) [`86a15c8`](https://github.com/sumup-oss/circuit-ui/commit/86a15c80c2112faab6ae771e8a9b655a8238c60f) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed a bug where users were unable to scroll after the ModalProvider was mounted and immediately unmounted.

## 8.1.2

### Patch Changes

- [#2403](https://github.com/sumup-oss/circuit-ui/pull/2403) [`d3a85a9`](https://github.com/sumup-oss/circuit-ui/commit/d3a85a93684321b04c363efcd3fbc23631309e9b) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed a bug where users were unable to scroll after a modal was mounted and immediately unmounted.

- [#2391](https://github.com/sumup-oss/circuit-ui/pull/2391) [`9f57d45`](https://github.com/sumup-oss/circuit-ui/commit/9f57d453e962eecf3935a339a6cfb54ff2080b25) Thanks [@connor-baer](https://github.com/connor-baer)! - Resolved deprecation warnings in the Carousel component.

## 8.1.1

### Patch Changes

- [#2388](https://github.com/sumup-oss/circuit-ui/pull/2388) [`e7fbc09`](https://github.com/sumup-oss/circuit-ui/commit/e7fbc09ddcbaa84730d2426310d0f9c6d357ff8b) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed passing custom styles to the SelectorGroup options.

## 8.1.0

### Minor Changes

- [#2385](https://github.com/sumup-oss/circuit-ui/pull/2385) [`cef26d5`](https://github.com/sumup-oss/circuit-ui/commit/cef26d58f50100069b39cb4166ed101a580194d4) Thanks [@connor-baer](https://github.com/connor-baer)! - Replaced the Tabs' and TabList's outer shadow with a border at the bottom.

## 8.0.1

### Patch Changes

- [#2382](https://github.com/sumup-oss/circuit-ui/pull/2382) [`0541ffd`](https://github.com/sumup-oss/circuit-ui/commit/0541ffd74d49b35664a1483b5fb3c97dcefe7a0d) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed Buttons not taking up the available space, causing the label to be hidden.

- [#2384](https://github.com/sumup-oss/circuit-ui/pull/2384) [`9923844`](https://github.com/sumup-oss/circuit-ui/commit/992384497477899aeeeabbe9900437339cbb59c2) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed presentational icons in the Popover component from the accessibility tree.

## 8.0.0

### Major Changes

- [#2351](https://github.com/sumup-oss/circuit-ui/pull/2351) [`cf297de`](https://github.com/sumup-oss/circuit-ui/commit/cf297de226b8b89cf40a34f0cbf7864d547b14ef) Thanks [@connor-baer](https://github.com/connor-baer)! - Improved the accessibility of disabled Buttons. The `disabled` attribute has been replaced with the `aria-disabled` attribute which enables the disabled element to receive focus and be perceived by screenreader users. Interactions with the disabled element are blocked by a dummy click handler.

- [#2352](https://github.com/sumup-oss/circuit-ui/pull/2352) [`08aa962`](https://github.com/sumup-oss/circuit-ui/commit/08aa962165307de6ba2ef1ca6e7a833aecf89b9e) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the overflow behaviour of long Button labels. Text that would previously wrap is now truncated to a single line with a trailing ellipsis.

- [#2299](https://github.com/sumup-oss/circuit-ui/pull/2299) [`7c92ef0`](https://github.com/sumup-oss/circuit-ui/commit/7c92ef0d1b3063628c25e473d3d6fb9aa92ee49d) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the default size of the CloseButton from 40px to 48px to match the Button component.

- [#2299](https://github.com/sumup-oss/circuit-ui/pull/2299) [`7c92ef0`](https://github.com/sumup-oss/circuit-ui/commit/7c92ef0d1b3063628c25e473d3d6fb9aa92ee49d) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the NotificationInline's action from the Button to the Anchor component. Update the action props if necessary.

- [#2361](https://github.com/sumup-oss/circuit-ui/pull/2361) [`31b6f03`](https://github.com/sumup-oss/circuit-ui/commit/31b6f03489cb5706685cdc9f0499e36f91affa84) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the deprecated `variant` prop from the ProgressBar component.

- [#2353](https://github.com/sumup-oss/circuit-ui/pull/2353) [`f33c269`](https://github.com/sumup-oss/circuit-ui/commit/f33c2699178e546aa8c023c80e774d4fb569e0dd) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the legacy navigation components: Header, Sidebar, SidebarContextProvider and SidebarContextConsumer. Use the [TopNavigation](https://circuit.sumup.com/?path=/docs/navigation-topnavigation--docs) and [SideNavigation](https://circuit.sumup.com/?path=/docs/navigation-sidenavigation--docs) components instead.

### Minor Changes

- [#2299](https://github.com/sumup-oss/circuit-ui/pull/2299) [`7c92ef0`](https://github.com/sumup-oss/circuit-ui/commit/7c92ef0d1b3063628c25e473d3d6fb9aa92ee49d) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated the look of the Button component. Corners are now rounded instead of pill-shaped, the loading spinner has been replaced with three animated dots, and the tertiary variant now sports an underline to improve accessibility.

- [#2299](https://github.com/sumup-oss/circuit-ui/pull/2299) [`7c92ef0`](https://github.com/sumup-oss/circuit-ui/commit/7c92ef0d1b3063628c25e473d3d6fb9aa92ee49d) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the variant of the previous/next buttons in the Pagination component from "tertiary" to "secondary".

- [#2372](https://github.com/sumup-oss/circuit-ui/pull/2372) [`8f6dfee`](https://github.com/sumup-oss/circuit-ui/commit/8f6dfeed5558422971986b2fb7e109b87c2e218f) Thanks [@connor-baer](https://github.com/connor-baer)! - Deprecated the ButtonGroup's `actions.[primary|secondary].size` prop. Use the top-level `size` prop instead.

- [#2299](https://github.com/sumup-oss/circuit-ui/pull/2299) [`7c92ef0`](https://github.com/sumup-oss/circuit-ui/commit/7c92ef0d1b3063628c25e473d3d6fb9aa92ee49d) Thanks [@connor-baer](https://github.com/connor-baer)! - Replaced the NotificationBanner's "tertiary" action variant with the "secondary" one and changed the action size to medium. Update the action props if necessary.

### Patch Changes

- Updated dependencies [[`43f357b`](https://github.com/sumup-oss/circuit-ui/commit/43f357b02f2dd8c358e0263d401a9e1bb3ddb80d), [`bc5e753`](https://github.com/sumup-oss/circuit-ui/commit/bc5e7531b42771ee04de3aa3f74aee537c9963e6)]:
  - @sumup/design-tokens@7.0.0

## 7.7.3

### Patch Changes

- [#2376](https://github.com/sumup-oss/circuit-ui/pull/2376) [`dadbde1d`](https://github.com/sumup-oss/circuit-ui/commit/dadbde1db5e7283c602dc196cc1b53b502569b4b) Thanks [@connor-baer](https://github.com/connor-baer)! - Improve compatibility of the Button component with Google Translate ([ref](https://github.com/facebook/react/issues/11538#issuecomment-390386520)).

## 7.7.2

### Patch Changes

- [#2367](https://github.com/sumup-oss/circuit-ui/pull/2367) [`4effd4fb`](https://github.com/sumup-oss/circuit-ui/commit/4effd4fbed96aca09cce86f109ed8525bff6fa80) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the alignment of the Anchor component when rendered as a `button` element.

## 7.7.1

### Patch Changes

- [`2a9cc199`](https://github.com/sumup-oss/circuit-ui/commit/2a9cc199ea9a8b6c78f7ce8504da391c5ee01ea2) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the ProgressBar's deprecation notice.

## 7.7.0

### Minor Changes

- [#2358](https://github.com/sumup-oss/circuit-ui/pull/2358) [`947340b6`](https://github.com/sumup-oss/circuit-ui/commit/947340b6751e8414445556a2de2c3bf721dd051b) Thanks [@connor-baer](https://github.com/connor-baer)! - Deprecated the ProgressBar's `variant` prop. The ProgressBar will always be black in the future.

## 7.6.0

### Minor Changes

- [#2344](https://github.com/sumup-oss/circuit-ui/pull/2344) [`e0fa9ef4`](https://github.com/sumup-oss/circuit-ui/commit/e0fa9ef42ef1e5893e71ada04c2b44fa2fbeaac8) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for rendering the Tag component as an anchor (`a`) element when passed the `href` prop.

## 7.5.2

### Patch Changes

- [#2332](https://github.com/sumup-oss/circuit-ui/pull/2332) [`4cd3c9cb`](https://github.com/sumup-oss/circuit-ui/commit/4cd3c9cb31469ad8f783dc4d82909d65a505d281) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the size of icons inside IconButtons when the available icon size doesn't match the IconButton size.

## 7.5.1

### Patch Changes

- [#2330](https://github.com/sumup-oss/circuit-ui/pull/2330) [`3eafd13d`](https://github.com/sumup-oss/circuit-ui/commit/3eafd13d334894e8b727043924332791549a7ce4) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the size of icons inside Buttons when the available icon size doesn't match the Button size.

## 7.5.0

### Minor Changes

- [#2307](https://github.com/sumup-oss/circuit-ui/pull/2307) [`a51de39c`](https://github.com/sumup-oss/circuit-ui/commit/a51de39cc1c5081474468149aac21a6a0b990749) Thanks [@connor-baer](https://github.com/connor-baer)! - Replaced the IconButton's `children` with a new `icon` prop.

- [#2326](https://github.com/sumup-oss/circuit-ui/pull/2326) [`7959570f`](https://github.com/sumup-oss/circuit-ui/commit/7959570f8f8889eb8d964cc5e851ef637edfbc18) Thanks [@connor-baer](https://github.com/connor-baer)! - Replaced the IconButton's and CloseButton's `label` prop with `children`.

- [#2307](https://github.com/sumup-oss/circuit-ui/pull/2307) [`a51de39c`](https://github.com/sumup-oss/circuit-ui/commit/a51de39cc1c5081474468149aac21a6a0b990749) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a new `navigationIcon` prop to the Button component. Navigation icons hint that the button will perform an unexpected action, such as opening a dropdown or navigating the user to a new tab.

- [#2307](https://github.com/sumup-oss/circuit-ui/pull/2307) [`a51de39c`](https://github.com/sumup-oss/circuit-ui/commit/a51de39cc1c5081474468149aac21a6a0b990749) Thanks [@connor-baer](https://github.com/connor-baer)! - Renamed the Button sizes from `kilo` to `s` and `giga` to `m`. The legacy size names are deprecated and will be removed in the next major version.

- [#2311](https://github.com/sumup-oss/circuit-ui/pull/2311) [`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547) Thanks [@connor-baer](https://github.com/connor-baer)! - Renamed the Avatar sizes from `giga` to `s` and `yotta` to `m`. The legacy size names are deprecated and will be removed in the next major version.

- [#2311](https://github.com/sumup-oss/circuit-ui/pull/2311) [`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547) Thanks [@connor-baer](https://github.com/connor-baer)! - Renamed the ProgressBar sizes from `byte` to `s`, `kilo` to `m` and `mega` to `l`. The legacy size names are deprecated and will be removed in the next major version.

- [#2311](https://github.com/sumup-oss/circuit-ui/pull/2311) [`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547) Thanks [@connor-baer](https://github.com/connor-baer)! - Renamed the SelectorGroup sizes from `kilo` to `s` and `mega` to `m`. The legacy size names are deprecated and will be removed in the next major version.

- [#2311](https://github.com/sumup-oss/circuit-ui/pull/2311) [`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547) Thanks [@connor-baer](https://github.com/connor-baer)! - Renamed the Spinner sizes from `byte` to `s`, `kilo` to `m` and `giga` to `l`. The legacy size names are deprecated and will be removed in the next major version.

## 7.4.2

### Patch Changes

- [#2308](https://github.com/sumup-oss/circuit-ui/pull/2308) [`94f1d207`](https://github.com/sumup-oss/circuit-ui/commit/94f1d207cac8b24f46963e9cff97fda996c15410) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed invalid styles from disabled Inputs.

## 7.4.1

### Patch Changes

- [#2304](https://github.com/sumup-oss/circuit-ui/pull/2304) [`ecc7bbde`](https://github.com/sumup-oss/circuit-ui/commit/ecc7bbde9aecdaa18bc478fe5f6bfc207fe16971) Thanks [@tareqlol](https://github.com/tareqlol)! - Fixed compatibility of the Popover component with server-side rendering.

## 7.4.0

### Minor Changes

- [#2300](https://github.com/sumup-oss/circuit-ui/pull/2300) [`0a2073b3`](https://github.com/sumup-oss/circuit-ui/commit/0a2073b322baab07845672184c64f1b682620933) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for an `activeIcon` to the TopNavigation links.

### Patch Changes

- [#2300](https://github.com/sumup-oss/circuit-ui/pull/2300) [`0a2073b3`](https://github.com/sumup-oss/circuit-ui/commit/0a2073b322baab07845672184c64f1b682620933) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the alignment of the ProfileMenu.

## 7.3.0

### Minor Changes

- [#2296](https://github.com/sumup-oss/circuit-ui/pull/2296) [`bd4e7ec0`](https://github.com/sumup-oss/circuit-ui/commit/bd4e7ec091a05e526b01f94dcce9d37265c659e7) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the focus ring to have a 2px offset from the focused element.

- [#2295](https://github.com/sumup-oss/circuit-ui/pull/2295) [`6c536a27`](https://github.com/sumup-oss/circuit-ui/commit/6c536a27b661bd17b2b0c045de13dd2056db9b4d) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for an `activeIcon` to the TopNavigation and SideNavigation links.

### Patch Changes

- [#2297](https://github.com/sumup-oss/circuit-ui/pull/2297) [`2f4fbaf6`](https://github.com/sumup-oss/circuit-ui/commit/2f4fbaf69b32cf36905dbf62bd6c28cb4e2d261d) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the HTML semantics in the TopNavigation and SideNavigation components.

- [#2297](https://github.com/sumup-oss/circuit-ui/pull/2297) [`2f4fbaf6`](https://github.com/sumup-oss/circuit-ui/commit/2f4fbaf69b32cf36905dbf62bd6c28cb4e2d261d) Thanks [@connor-baer](https://github.com/connor-baer)! - Properly hid presentational icons from the accessibility tree.

- [#2297](https://github.com/sumup-oss/circuit-ui/pull/2297) [`2f4fbaf6`](https://github.com/sumup-oss/circuit-ui/commit/2f4fbaf69b32cf36905dbf62bd6c28cb4e2d261d) Thanks [@connor-baer](https://github.com/connor-baer)! - Restored the focus styles of the utility links and profile menu in the TopNavigation.

- Updated dependencies [[`bd4e7ec0`](https://github.com/sumup-oss/circuit-ui/commit/bd4e7ec091a05e526b01f94dcce9d37265c659e7)]:
  - @sumup/design-tokens@6.1.0

## 7.2.1

### Patch Changes

- [#2282](https://github.com/sumup-oss/circuit-ui/pull/2282) [`6402e293`](https://github.com/sumup-oss/circuit-ui/commit/6402e2932c71430d70246b88dd16f438a4386c0f) Thanks [@dependabot](https://github.com/apps/dependabot)! - Safely access `process.env` environment variables other than `NODE_ENV`.

- [#2289](https://github.com/sumup-oss/circuit-ui/pull/2289) [`b75f63a5`](https://github.com/sumup-oss/circuit-ui/commit/b75f63a50177a7c978112072c07e416175d85136) Thanks [@connor-baer](https://github.com/connor-baer)! - Scroll Popover content when it overflows vertically.

- [#2287](https://github.com/sumup-oss/circuit-ui/pull/2287) [`6a026a8d`](https://github.com/sumup-oss/circuit-ui/commit/6a026a8dbb9cd50764a73c66da514a2ee5243408) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the Button text disappearing when a parent element has `aria-busy="true"`.

## 7.2.0

### Minor Changes

- [#2280](https://github.com/sumup-oss/circuit-ui/pull/2280) [`2897ec7a`](https://github.com/sumup-oss/circuit-ui/commit/2897ec7a1e6ca361fabaeced894064101cdd894e) Thanks [@tranhoangan22](https://github.com/tranhoangan22)! - Inside `TopNavigation`, extended `ProfileMenu`'s props to accept a class name to be passed to the `ProfileMenu`'s `PopOver` component. Passed an empty array for the `fallbackPlacements` prop to the `PopOver` used by `TopNavigation` to disable the flipping behavior.

### Patch Changes

- Updated dependencies [[`b2edba64`](https://github.com/sumup-oss/circuit-ui/commit/b2edba6482851cfa4c8726a1706e6b862a8c7073)]:
  - @sumup/icons@3.3.0

## 7.1.11

### Patch Changes

- Updated dependencies [[`61d5ca87`](https://github.com/sumup-oss/circuit-ui/commit/61d5ca8726bf80298d925a4410dd8aac8b972586)]:
  - @sumup/icons@3.2.0

## 7.1.10

### Patch Changes

- [#2264](https://github.com/sumup-oss/circuit-ui/pull/2264) [`6ad6fd6d`](https://github.com/sumup-oss/circuit-ui/commit/6ad6fd6d940a8781f82dd76df9fa7d662ce89836) Thanks [@tareqlol](https://github.com/tareqlol)! - Increase IconButton css specificity

## 7.1.9

### Patch Changes

- [#2261](https://github.com/sumup-oss/circuit-ui/pull/2261) [`d6bb1bbc`](https://github.com/sumup-oss/circuit-ui/commit/d6bb1bbc76431f91cbde236047c91af709e6e653) Thanks [@tareqlol](https://github.com/tareqlol)! - Fixes missing className prop passed to the Popover component

## 7.1.8

### Patch Changes

- [#2259](https://github.com/sumup-oss/circuit-ui/pull/2259) [`07066f95`](https://github.com/sumup-oss/circuit-ui/commit/07066f95e84f1b53d45b396322936c96eaa14a77) Thanks [@tareqlol](https://github.com/tareqlol)! - Increase css specificity for ListItem child

## 7.1.7

### Patch Changes

- [#2257](https://github.com/sumup-oss/circuit-ui/pull/2257) [`e7307294`](https://github.com/sumup-oss/circuit-ui/commit/e73072947e0620004c2ef8f2d409b5c436eec341) Thanks [@tareqlol](https://github.com/tareqlol)! - Fix Checkbox custom id

- [#2255](https://github.com/sumup-oss/circuit-ui/pull/2255) [`600eff2c`](https://github.com/sumup-oss/circuit-ui/commit/600eff2ca0d912d1691097d886aef3ca10375c36) Thanks [@tareqlol](https://github.com/tareqlol)! - Fixes Selector component size padding

## 7.1.6

### Patch Changes

- [#2254](https://github.com/sumup-oss/circuit-ui/pull/2254) [`17a9bcb3`](https://github.com/sumup-oss/circuit-ui/commit/17a9bcb383aba883bff5678c5371aa1e1f91771d) Thanks [@tareqlol](https://github.com/tareqlol)! - Fix style SearchInput clear icon

- Updated dependencies [[`4f080121`](https://github.com/sumup-oss/circuit-ui/commit/4f08012109c62e03dab5611c1bd8a60ed3fc73c1)]:
  - @sumup/icons@3.1.0

## 7.1.5

### Patch Changes

- [`5db4aca3`](https://github.com/sumup-oss/circuit-ui/commit/5db4aca368f024d07dacaf8ecfeb1c952e33a38d) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed a style specificity issue affecting immersive Modals.

## 7.1.4

### Patch Changes

- [#2249](https://github.com/sumup-oss/circuit-ui/pull/2249) [`c44c6c58`](https://github.com/sumup-oss/circuit-ui/commit/c44c6c58ebc5a491897074b2ec2f13e3159867db) Thanks [@connor-baer](https://github.com/connor-baer)! - Increased the specificity of nested component styles.

## 7.1.3

### Patch Changes

- [#2246](https://github.com/sumup-oss/circuit-ui/pull/2246) [`7c53988b`](https://github.com/sumup-oss/circuit-ui/commit/7c53988b3f98a52c426c9f3c731dbb9fd7823534) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the spacing inside a ButtonGroup.

- [#2247](https://github.com/sumup-oss/circuit-ui/pull/2247) [`390d1e4e`](https://github.com/sumup-oss/circuit-ui/commit/390d1e4e62f9933b2638072ed2de4b542f1eaf48) Thanks [@connor-baer](https://github.com/connor-baer)! - Hid the Button's loading label in JSDOM environments.

## 7.1.2

### Patch Changes

- [#2244](https://github.com/sumup-oss/circuit-ui/pull/2244) [`7326063c`](https://github.com/sumup-oss/circuit-ui/commit/7326063c24e78b15ff66ba72c9b34d5e651bc180) Thanks [@connor-baer](https://github.com/connor-baer)! - Silenced the error for a missing `as` prop in the Title, Headline, and SubHeadline components in test environments.

- [#2241](https://github.com/sumup-oss/circuit-ui/pull/2241) [`296709f8`](https://github.com/sumup-oss/circuit-ui/commit/296709f8b18aaeb9b5522a1ec49c341d4e0b9a3d) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a missing type for the `onValueChange` prop of the CurrencyInput.

## 7.1.1

### Patch Changes

- [#2239](https://github.com/sumup-oss/circuit-ui/pull/2239) [`3b8933f3`](https://github.com/sumup-oss/circuit-ui/commit/3b8933f34fbbe38a69ac46f6e22c00a6e16d6063) Thanks [@connor-baer](https://github.com/connor-baer)! - Widened the type for the SelectorGroup's new `icon` prop.

## 7.1.0

### Minor Changes

- [#2224](https://github.com/sumup-oss/circuit-ui/pull/2224) [`7e5bbd57`](https://github.com/sumup-oss/circuit-ui/commit/7e5bbd57f01011bc3f928ba1255cfa908ea03294) Thanks [@connor-baer](https://github.com/connor-baer)! - Added additional validation for labels.

  Labels are required for form fields and other controls so those who use assistive technologies can tell what the control is for. Labels should concisely describe the control's purpose and need to be localized.

- [#2228](https://github.com/sumup-oss/circuit-ui/pull/2228) [`4d67245d`](https://github.com/sumup-oss/circuit-ui/commit/4d67245da988f79d59d82d4fa3679341336b8d08) Thanks [@connor-baer](https://github.com/connor-baer)! - Truncated placeholders using an ellipsis when they overflow the input.

- [#2225](https://github.com/sumup-oss/circuit-ui/pull/2225) [`4df339ce`](https://github.com/sumup-oss/circuit-ui/commit/4df339ceae065c624fb313a8cc5b9522339c99c5) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for an optional label to the Checkbox component.

- [#2236](https://github.com/sumup-oss/circuit-ui/pull/2236) [`3fc4ef44`](https://github.com/sumup-oss/circuit-ui/commit/3fc4ef44fea5be861ac26fc210aeebafe5eb1760) Thanks [@connor-baer](https://github.com/connor-baer)! - Re-exported the RadioButton and Selector components as legacy components. They will be removed again in the next major release.

- [#2238](https://github.com/sumup-oss/circuit-ui/pull/2238) [`24d746b0`](https://github.com/sumup-oss/circuit-ui/commit/24d746b0f41548c2d34582d86c854136258563d4) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for icons to illustrate SelectorGroup options.

## 7.0.4

### Patch Changes

- [#2222](https://github.com/sumup-oss/circuit-ui/pull/2222) [`3deeb5c1`](https://github.com/sumup-oss/circuit-ui/commit/3deeb5c14a6a8edce9c05356b08f8da5ccdb8862) Thanks [@a5e](https://github.com/a5e)! - Removed unnecessary padding in the SearchInput component.

- [#2226](https://github.com/sumup-oss/circuit-ui/pull/2226) [`6eb8a5f0`](https://github.com/sumup-oss/circuit-ui/commit/6eb8a5f09badd0894ac3460202f0276f99baea4b) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed forwarding a custom `className` to the TableHeader component.

## 7.0.3

### Patch Changes

- [#2220](https://github.com/sumup-oss/circuit-ui/pull/2220) [`858f75a3`](https://github.com/sumup-oss/circuit-ui/commit/858f75a382290a8ca2693908bebab85c0cf39f4f) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the Icon's prefix and suffix icons from the accessibility tree.

## 7.0.2

### Patch Changes

- [#2218](https://github.com/sumup-oss/circuit-ui/pull/2218) [`f1d3a458`](https://github.com/sumup-oss/circuit-ui/commit/f1d3a458cd00e85d628da809005c41fb6e845452) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the primary SideNavigation width on wide viewports.

## 7.0.1

### Patch Changes

- [#2216](https://github.com/sumup-oss/circuit-ui/pull/2216) [`e7cfe0cd`](https://github.com/sumup-oss/circuit-ui/commit/e7cfe0cd6bc398639ed56ce2dcb9399c52286419) Thanks [@connor-baer](https://github.com/connor-baer)! - Narrowed the version range of the Emotion.js peer dependencies to ensure they can be imported in an ESM environment (see [emotion-js/emotion#3029](https://github.com/emotion-js/emotion/pull/3029)).

## 7.0.0

### Major Changes

- [#1992](https://github.com/sumup-oss/circuit-ui/pull/1992) [`0b7fb453`](https://github.com/sumup-oss/circuit-ui/commit/0b7fb453e6eb714561ab4ff8311ef3d4853006c5) Thanks [@connor-baer](https://github.com/connor-baer)! - Raised the minimum version of the `react` and `react-dom` peer dependencies to >=18.

- [#2061](https://github.com/sumup-oss/circuit-ui/pull/2061) [`bc882426`](https://github.com/sumup-oss/circuit-ui/commit/bc882426a859e68ec7c029e1b56adbaa63f8260f) Thanks [@connor-baer](https://github.com/connor-baer)! - Raised the minimum Node.js version to 18+.

- [#2061](https://github.com/sumup-oss/circuit-ui/pull/2061) [`bc882426`](https://github.com/sumup-oss/circuit-ui/commit/bc882426a859e68ec7c029e1b56adbaa63f8260f) Thanks [@connor-baer](https://github.com/connor-baer)! - **This package is now pure ESM**. Please [read this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

  - If you use TypeScript, you need to use TypeScript 4.7 or later ([ref](https://github.com/microsoft/TypeScript/issues/46452)).
  - If you use a bundler, make sure it supports ESM and that you have correctly configured it for ESM. (Next.js supports ESM packages out of the box since [v12](https://nextjs.org/blog/next-12#es-modules-support-and-url-imports)).

- [#2061](https://github.com/sumup-oss/circuit-ui/pull/2061) [`bc882426`](https://github.com/sumup-oss/circuit-ui/commit/bc882426a859e68ec7c029e1b56adbaa63f8260f) Thanks [@connor-baer](https://github.com/connor-baer)! - Switched to the `"exports"` field to configure the package entry points. Files that are not explicitly defined in `"exports"` can no longer be imported.

- [#2163](https://github.com/sumup-oss/circuit-ui/pull/2163) [`6ff0b7da`](https://github.com/sumup-oss/circuit-ui/commit/6ff0b7da7f7aae906ffe467da08115d5500e157a) Thanks [@connor-baer](https://github.com/connor-baer)! - Migrated all [stable](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs) components from [Emotion.js](https://github.com/emotion-js/emotion) to [CSS Modules](https://github.com/css-modules/css-modules).

  The styles are bundled and exported as a single CSS file as `@sumup/circuit-ui/styles.css`. Refer to your framework's documentation on how to include the styles globally in your application.

  The CSS file includes the base styles, so the BaseStyles component has been removed.

  If you are only importing [stable](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs) components and aren't using Emotion.js in your app, you can remove all Emotion.js-related dependencies.

- [#2154](https://github.com/sumup-oss/circuit-ui/pull/2154) [`eef360c4`](https://github.com/sumup-oss/circuit-ui/commit/eef360c4c0b5b4ab07cf178884cc3dc00e9bf842) Thanks [@connor-baer](https://github.com/connor-baer)! - Updated the list of supported browsers:

  | Browser          | Previous | New   |
  | ---------------- | -------- | ----- |
  | Chrome           | 63+      | 73+   |
  | Firefox          | 67+      | 67+   |
  | Edge             | 79+      | 79+   |
  | Safari iOS       | 11.0+    | 12.2+ |
  | Safari macOS     | 11.1+    | 12.1+ |
  | Opera            | 50+      | 60+   |
  | Samsung Internet | 8.2+     | 11.1+ |

- [#1972](https://github.com/sumup-oss/circuit-ui/pull/1972) [`0f29f87b`](https://github.com/sumup-oss/circuit-ui/commit/0f29f87bf28878f70e047ae42dd18c98660a2ffd) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed `@sumup/collector` from the peer dependencies and removed the related `tracking` and `trackingLabel` props (deprecated since v6.4).

- [#2124](https://github.com/sumup-oss/circuit-ui/pull/2124) [`22b03d04`](https://github.com/sumup-oss/circuit-ui/commit/22b03d04f000b72b882962fcf9a67f1c93faff51) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the public export of the RadioButton component. Use the RadioButtonGroup component instead.

- [#2124](https://github.com/sumup-oss/circuit-ui/pull/2124) [`22b03d04`](https://github.com/sumup-oss/circuit-ui/commit/22b03d04f000b72b882962fcf9a67f1c93faff51) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the public export of the Selector component. Use the SelectorGroup component instead.

- [#2124](https://github.com/sumup-oss/circuit-ui/pull/2124) [`22b03d04`](https://github.com/sumup-oss/circuit-ui/commit/22b03d04f000b72b882962fcf9a67f1c93faff51) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the deprecated `children` prop from the Selector component. Use the `label` and `description` props instead.

- [#2063](https://github.com/sumup-oss/circuit-ui/pull/2063) [`fef5b955`](https://github.com/sumup-oss/circuit-ui/commit/fef5b9554d2ff858fb8587f5624d8ee65dfbb969) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the deprecated `children` prop from the Checkbox component. Use the `label` prop instead.

- [#2124](https://github.com/sumup-oss/circuit-ui/pull/2124) [`22b03d04`](https://github.com/sumup-oss/circuit-ui/commit/22b03d04f000b72b882962fcf9a67f1c93faff51) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the deprecated `explanation` prop from the Toggle component. Use the `description` prop instead.

- [#2067](https://github.com/sumup-oss/circuit-ui/pull/2067) [`4f78573e`](https://github.com/sumup-oss/circuit-ui/commit/4f78573e94829e87fc250f284159969d4e5d8fc2) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the signature of the ImageInput's `component` prop. The `component` should now accept `aria-hidden` instead of `alt`.

- [#2063](https://github.com/sumup-oss/circuit-ui/pull/2063) [`fef5b955`](https://github.com/sumup-oss/circuit-ui/commit/fef5b9554d2ff858fb8587f5624d8ee65dfbb969) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the deprecated `confirm`, `notify`, and `alert` variants from the Badge, NotificationInline, and NotificationToast components. Use the `success`, `warning`, and `danger` variants instead.

- [#2125](https://github.com/sumup-oss/circuit-ui/pull/2125) [`82878190`](https://github.com/sumup-oss/circuit-ui/commit/82878190d70c414032027449e14d8473aa196856) Thanks [@connor-baer](https://github.com/connor-baer)! - Moved the Grid, Row, Col, and InlineElements components to the ["legacy" status](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs). Update your imports:

  ```diff
  -import { Grid } from '@sumup/circuit-ui';
  +import { Grid } from '@sumup/circuit-ui/legacy';
  ```

- [#2094](https://github.com/sumup-oss/circuit-ui/pull/2094) [`da1a11b0`](https://github.com/sumup-oss/circuit-ui/commit/da1a11b0f8fe2803cb4fc8cb35e759c178ce6916) Thanks [@connor-baer](https://github.com/connor-baer)! - Moved the SingleDayPicker, RangePicker, CalendarTag, and CalendarTagTwoStep components to the ["legacy" status](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs).

  Install the optional peer dependencies...

  ```bash
  npm install react-dates@^21.8 moment@^2.29
  ```

  ...and update your imports:

  ```diff
  -import { SingleDayPicker } from '@sumup/circuit-ui';
  +import { SingleDayPicker } from '@sumup/circuit-ui/legacy';
  ```

- [#2094](https://github.com/sumup-oss/circuit-ui/pull/2094) [`da1a11b0`](https://github.com/sumup-oss/circuit-ui/commit/da1a11b0f8fe2803cb4fc8cb35e759c178ce6916) Thanks [@connor-baer](https://github.com/connor-baer)! - Moved the Tooltip component to the ["legacy" status](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs). Update your imports:

  ```diff
  -import { Tooltip } from '@sumup/circuit-ui';
  +import { Tooltip } from '@sumup/circuit-ui/legacy';
  ```

- [#2094](https://github.com/sumup-oss/circuit-ui/pull/2094) [`da1a11b0`](https://github.com/sumup-oss/circuit-ui/commit/da1a11b0f8fe2803cb4fc8cb35e759c178ce6916) Thanks [@connor-baer](https://github.com/connor-baer)! - Moved the Sidebar, SidebarContextProvider, SidebarContextConsumer, and Header components to the ["legacy" status](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs). Update your imports:

  ```diff
  -import { Sidebar } from '@sumup/circuit-ui';
  +import { Sidebar } from '@sumup/circuit-ui/legacy';
  ```

- [#2125](https://github.com/sumup-oss/circuit-ui/pull/2125) [`82878190`](https://github.com/sumup-oss/circuit-ui/commit/82878190d70c414032027449e14d8473aa196856) Thanks [@connor-baer](https://github.com/connor-baer)! - Moved the `uniqueId` util to the ["legacy" status](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs). Update your imports:

  ```diff
  -import { uniqueId } from '@sumup/circuit-ui';
  +import { uniqueId } from '@sumup/circuit-ui/legacy';
  ```

- [#2065](https://github.com/sumup-oss/circuit-ui/pull/2065) [`8adb8fee`](https://github.com/sumup-oss/circuit-ui/commit/8adb8feee02bbfef1d1fc6a9c7a9c5a30e25d027) Thanks [@connor-baer](https://github.com/connor-baer)! - Migrated the Carousel components to TypeScript. Added the required `playButtonLabel`, `pauseButtonLabel`, `prevButtonLabel`, and `nextButtonLabel` props.

- [#2065](https://github.com/sumup-oss/circuit-ui/pull/2065) [`8adb8fee`](https://github.com/sumup-oss/circuit-ui/commit/8adb8feee02bbfef1d1fc6a9c7a9c5a30e25d027) Thanks [@connor-baer](https://github.com/connor-baer)! - Migrated the Calendar components to TypeScript. Some props are now required. The CalendarTagTwoStep's `clearText` and `confirmText` props have been renamed to `clearButtonLabel` and `confirmButtonLabel` respectively.

- [#1995](https://github.com/sumup-oss/circuit-ui/pull/1995) [`1267c69c`](https://github.com/sumup-oss/circuit-ui/commit/1267c69cee8dc7c30520753b7c2d662c222c5f03) Thanks [@connor-baer](https://github.com/connor-baer)! - Simplified the function signature of the style mixins that no longer require the `theme` parameter (`shadow`, `focusOutline`, `focusVisible`, and `inputOutline`).

- [#2065](https://github.com/sumup-oss/circuit-ui/pull/2065) [`8adb8fee`](https://github.com/sumup-oss/circuit-ui/commit/8adb8feee02bbfef1d1fc6a9c7a9c5a30e25d027) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the `sharedPropTypes` export. Type the props using TypeScript instead.

- [#2114](https://github.com/sumup-oss/circuit-ui/pull/2114) [`f53e4336`](https://github.com/sumup-oss/circuit-ui/commit/f53e4336739fa317ce7a6511ec3f9716382f5a15) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the font-display of Aktiv Grotesk, Circuit UI's default font family, from `swap` to `optional`. If the font family is not available locally or cached, a fallback font is used. This reduces the cumulative layout shift (CLS) and largest contentful paint (LCP). The visual difference is minimal.

### Minor Changes

- [#2124](https://github.com/sumup-oss/circuit-ui/pull/2124) [`22b03d04`](https://github.com/sumup-oss/circuit-ui/commit/22b03d04f000b72b882962fcf9a67f1c93faff51) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for validations to the SelectorGroup component. Use the `validationHint` and `invalid` props to communicate validation requirements to users.

- [#2163](https://github.com/sumup-oss/circuit-ui/pull/2163) [`6ff0b7da`](https://github.com/sumup-oss/circuit-ui/commit/6ff0b7da7f7aae906ffe467da08115d5500e157a) Thanks [@connor-baer](https://github.com/connor-baer)! - Improved the accessibility of the SearchInput component. The input now has the `search` type and focus is returned to the input after clearing the value.

- [#2065](https://github.com/sumup-oss/circuit-ui/pull/2065) [`8adb8fee`](https://github.com/sumup-oss/circuit-ui/commit/8adb8feee02bbfef1d1fc6a9c7a9c5a30e25d027) Thanks [@connor-baer](https://github.com/connor-baer)! - Migrated the Tabs components to TypeScript.

- [#2065](https://github.com/sumup-oss/circuit-ui/pull/2065) [`8adb8fee`](https://github.com/sumup-oss/circuit-ui/commit/8adb8feee02bbfef1d1fc6a9c7a9c5a30e25d027) Thanks [@connor-baer](https://github.com/connor-baer)! - Migrated the Sidebar component to TypeScript.

- [#1992](https://github.com/sumup-oss/circuit-ui/pull/1992) [`0b7fb453`](https://github.com/sumup-oss/circuit-ui/commit/0b7fb453e6eb714561ab4ff8311ef3d4853006c5) Thanks [@connor-baer](https://github.com/connor-baer)! - Deprecated the `uniqueId` util. Use the official [`useId` hook](https://beta.reactjs.org/reference/react/useId) instead.

- [#2195](https://github.com/sumup-oss/circuit-ui/pull/2195) [`6f992ae6`](https://github.com/sumup-oss/circuit-ui/commit/6f992ae6aa39767dcc7df5a6754dbcea4d06af9d) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a helpful error message when the Title, Headline or SubHeadline components are missing the `as` prop.

- [#1615](https://github.com/sumup-oss/circuit-ui/pull/1615) [`51cd70d3`](https://github.com/sumup-oss/circuit-ui/commit/51cd70d37e0fc4609f81e885a503a35e6f102d11) Thanks [@connor-baer](https://github.com/connor-baer)! - Automatically set the `size` prop on the Button's `icon` prop based on the Button's `size` prop.

### Patch Changes

- [#1615](https://github.com/sumup-oss/circuit-ui/pull/1615) [`51cd70d3`](https://github.com/sumup-oss/circuit-ui/commit/51cd70d37e0fc4609f81e885a503a35e6f102d11) Thanks [@connor-baer](https://github.com/connor-baer)! - Properly hide icons inside a Button.

- Updated dependencies [[`415c73dd`](https://github.com/sumup-oss/circuit-ui/commit/415c73dd70dc2720b44ead24cd4b9d7d77af3293), [`66b18d61`](https://github.com/sumup-oss/circuit-ui/commit/66b18d61f5683a24414725a488f7005bad80c8b1), [`bc882426`](https://github.com/sumup-oss/circuit-ui/commit/bc882426a859e68ec7c029e1b56adbaa63f8260f), [`bc882426`](https://github.com/sumup-oss/circuit-ui/commit/bc882426a859e68ec7c029e1b56adbaa63f8260f), [`415c73dd`](https://github.com/sumup-oss/circuit-ui/commit/415c73dd70dc2720b44ead24cd4b9d7d77af3293), [`bc882426`](https://github.com/sumup-oss/circuit-ui/commit/bc882426a859e68ec7c029e1b56adbaa63f8260f), [`51cd70d3`](https://github.com/sumup-oss/circuit-ui/commit/51cd70d37e0fc4609f81e885a503a35e6f102d11)]:
  - @sumup/design-tokens@6.0.0
  - @sumup/icons@3.0.0

## 6.11.0

### Minor Changes

- [#2191](https://github.com/sumup-oss/circuit-ui/pull/2191) [`7ba96798`](https://github.com/sumup-oss/circuit-ui/commit/7ba9679870c5a595bbd3036aa5a6f65c7ad29f8c) Thanks [@sirineJ](https://github.com/sirineJ)! - Added a new `description` prop to the RadioInput component. Use it to provide additional context for an option.

## 6.10.1

### Patch Changes

- [#2160](https://github.com/sumup-oss/circuit-ui/pull/2160) [`7774d603`](https://github.com/sumup-oss/circuit-ui/commit/7774d603fd0acff5776d8edfa27805147fac979c) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the alignment of the field validation hint icon.

## 6.10.0

### Minor Changes

- [#1415](https://github.com/sumup-oss/circuit-ui/pull/1415) [`f2c20b88`](https://github.com/sumup-oss/circuit-ui/commit/f2c20b88c31e9358cfe99f0851a43390e304673c) Thanks [@long-lazuli](https://github.com/long-lazuli)! - Added the `indeterminate` prop to the Checkbox component. Use it to display and control the collective state of a group of nested checkboxes.

## 6.9.0

### Minor Changes

- [#2105](https://github.com/sumup-oss/circuit-ui/pull/2105) [`9aabce8d`](https://github.com/sumup-oss/circuit-ui/commit/9aabce8d5a43847f00bab9d0f218fcf28367f715) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for the CheckboxGroup, RadioButtonGroup and SelectorGroup components to be used as uncontrolled inputs using the new `defaultValue` prop.

- [#2105](https://github.com/sumup-oss/circuit-ui/pull/2105) [`9aabce8d`](https://github.com/sumup-oss/circuit-ui/commit/9aabce8d5a43847f00bab9d0f218fcf28367f715) Thanks [@connor-baer](https://github.com/connor-baer)! - Deprecated the RadioButton component. Use the RadioButtonGroup component instead.

- [#2105](https://github.com/sumup-oss/circuit-ui/pull/2105) [`9aabce8d`](https://github.com/sumup-oss/circuit-ui/commit/9aabce8d5a43847f00bab9d0f218fcf28367f715) Thanks [@connor-baer](https://github.com/connor-baer)! - Deprecated the Selector component. Use the SelectorGroup component instead.

- [#1851](https://github.com/sumup-oss/circuit-ui/pull/1851) [`0e3bdd53`](https://github.com/sumup-oss/circuit-ui/commit/0e3bdd53c86845da58afcc6b27b5360d71d02e00) Thanks [@tranhoangan22](https://github.com/tranhoangan22)! - Added the `CheckboxGroup` component. The `options` prop specifies how the Checkboxes are rendered. Each option in the `options` prop must have a `value` key and a `label` key. The `value` prop indicates which Checkboxes are checked by default. The `validationHint` for the individual Checkboxes are disallowed in favor of a single `validationHint` for the `CheckboxGroup`.

- [#2105](https://github.com/sumup-oss/circuit-ui/pull/2105) [`9aabce8d`](https://github.com/sumup-oss/circuit-ui/commit/9aabce8d5a43847f00bab9d0f218fcf28367f715) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for the `required` and `optionalLabel` props to the SelectorGroup component.

### Patch Changes

- [#2123](https://github.com/sumup-oss/circuit-ui/pull/2123) [`22184900`](https://github.com/sumup-oss/circuit-ui/commit/221849002806c91783afdc54750b8d23210fcf35) Thanks [@connor-baer](https://github.com/connor-baer)! - Reduced the breakpoint for the expanded SideNavigation on wide viewpoints to account for scroll bars.

- [#2115](https://github.com/sumup-oss/circuit-ui/pull/2115) [`5f955ce5`](https://github.com/sumup-oss/circuit-ui/commit/5f955ce5bc532803185feb25ff9dba4ecc8345d7) Thanks [@pdrmdrs](https://github.com/pdrmdrs)! - Fixed the styles of a checked and disabled Checkbox.

- [#2113](https://github.com/sumup-oss/circuit-ui/pull/2113) [`2bea43ff`](https://github.com/sumup-oss/circuit-ui/commit/2bea43ff074ddfe1148a80da5b64affeb11056c5) Thanks [@robinmetral](https://github.com/robinmetral)! - Marked `Popover` dividers as presentational to ensure that the right number of items is announced by screen readers.

- [#2121](https://github.com/sumup-oss/circuit-ui/pull/2121) [`eb445e65`](https://github.com/sumup-oss/circuit-ui/commit/eb445e655ed5d7d1b482d8a2551e37776acd487f) Thanks [@connor-baer](https://github.com/connor-baer)! - Don't crop content overflow when the `useCollapsible` hook is expanded.

## 6.8.0

### Minor Changes

- [#2071](https://github.com/sumup-oss/circuit-ui/pull/2071) [`abf11b69`](https://github.com/sumup-oss/circuit-ui/commit/abf11b69a483e67cb758b193f4a5ec7b8d2f4203) Thanks [@connor-baer](https://github.com/connor-baer)! - Added an optional `description` prop to the `Toggle` component, and deprecated the legacy `explanation` prop. This aligns with the `Selector ` component's API.

- [#2071](https://github.com/sumup-oss/circuit-ui/pull/2071) [`abf11b69`](https://github.com/sumup-oss/circuit-ui/commit/abf11b69a483e67cb758b193f4a5ec7b8d2f4203) Thanks [@connor-baer](https://github.com/connor-baer)! - Added optional `label` and `description` props to the `Selector` component, and deprecated the legacy `children` prop. The `label` prop will become required in the next major version. This aligns with the `Checkbox ` and `RadioButton` component APIs.

### Patch Changes

- [#2071](https://github.com/sumup-oss/circuit-ui/pull/2071) [`abf11b69`](https://github.com/sumup-oss/circuit-ui/commit/abf11b69a483e67cb758b193f4a5ec7b8d2f4203) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the RadioButton's disabled border color.

## 6.7.0

### Minor Changes

- [#2091](https://github.com/sumup-oss/circuit-ui/pull/2091) [`3334873d`](https://github.com/sumup-oss/circuit-ui/commit/3334873d33430fde670facaa0da311d63b1d259a) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed `@emotion/cache` from the peer dependencies.

### Patch Changes

- [#2091](https://github.com/sumup-oss/circuit-ui/pull/2091) [`3334873d`](https://github.com/sumup-oss/circuit-ui/commit/3334873d33430fde670facaa0da311d63b1d259a) Thanks [@connor-baer](https://github.com/connor-baer)! - Upgraded all dependencies to their latest minor.

## 6.6.4

### Patch Changes

- [#2059](https://github.com/sumup-oss/circuit-ui/pull/2059) [`86c309c1`](https://github.com/sumup-oss/circuit-ui/commit/86c309c11e63eeca21c0ec22408a70320ff45b83) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed an internal cyclic dependency.

## 6.6.3

### Patch Changes

- [#2037](https://github.com/sumup-oss/circuit-ui/pull/2037) [`e72d1ce2`](https://github.com/sumup-oss/circuit-ui/commit/e72d1ce261fa8b637426e682d1f281bcb4ae2b7c) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the alignment of wrapped Popover items.

## 6.6.2

### Patch Changes

- [#2021](https://github.com/sumup-oss/circuit-ui/pull/2021) [`c6fb3aed`](https://github.com/sumup-oss/circuit-ui/commit/c6fb3aed99bb5f70b0255dc226c10074bea0f470) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the `title` attribute from the `ProgressBar` component. The `ProgressBar` already has an accessible label, so the `title` is redundant. You might need to update your snapshots.

## 6.6.1

### Patch Changes

- [#2011](https://github.com/sumup-oss/circuit-ui/pull/2011) [`2728e9da`](https://github.com/sumup-oss/circuit-ui/commit/2728e9da5a32762c11e4d34cc9ffd45c5bbd2f97) Thanks [@connor-baer](https://github.com/connor-baer)! - Moved the Toggle's `explanation` outside the switch button's `label` and connected it to the switch button using `aria-describedby` to provide a better experience to screen reader users. This affects the component's markup and might be a breaking change in instances customizing the Toggle's styles.

## 6.6.0

### Minor Changes

- [#2007](https://github.com/sumup-oss/circuit-ui/pull/2007) [`8ab8c209`](https://github.com/sumup-oss/circuit-ui/commit/8ab8c2098967d04634e9a6f47830c54bee603e99) Thanks [@connor-baer](https://github.com/connor-baer)! - Forward `ref`s to the NotificationBanner, NotificationFullscreen, and NotificationInline components.

### Patch Changes

- [#1991](https://github.com/sumup-oss/circuit-ui/pull/1991) [`401ac252`](https://github.com/sumup-oss/circuit-ui/commit/401ac252d883c74cc14ea343dab0b7e0b5fac8f5) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed the `ImageInput` component's invalid label box-shadow color.

## 6.5.0

### Minor Changes

- [#1996](https://github.com/sumup-oss/circuit-ui/pull/1996) [`6d7c5de4`](https://github.com/sumup-oss/circuit-ui/commit/6d7c5de41e933409992d6d762d9a424390cda5d8) Thanks [@connor-baer](https://github.com/connor-baer)! - Added an optional `label` prop to the `Checkbox` component, and deprecated the legacy `children` prop. The `label` prop will become required in the next major version. This aligns with the `RadioButton` component's API.

## 6.4.0

### Minor Changes

- [#1997](https://github.com/sumup-oss/circuit-ui/pull/1997) [`9a348fd2`](https://github.com/sumup-oss/circuit-ui/commit/9a348fd233d87871db21356862b3c9ca383445c2) Thanks [@connor-baer](https://github.com/connor-baer)! - Deprecated the `tracking` and `trackingLabel` props in all components. Use event handlers to dispatch user interaction events instead. `@sumup/collector` will be removed from `@sumup/circuit-ui` in the next major version.

- [#1998](https://github.com/sumup-oss/circuit-ui/pull/1998) [`81e3ea06`](https://github.com/sumup-oss/circuit-ui/commit/81e3ea0604945a5f366c6221243b000b53db50f1) Thanks [@connor-baer](https://github.com/connor-baer)! - Deprecated the `uniqueId` util. If your app is already using React 18, use the official [`useId` hook](https://beta.reactjs.org/reference/react/useId) instead. `uniqueId` will be removed from Circuit UI v7, along with dropping support for React <18.

- [#2000](https://github.com/sumup-oss/circuit-ui/pull/2000) [`757e0c1e`](https://github.com/sumup-oss/circuit-ui/commit/757e0c1e0ff3f350fdaaaf6cf329cc6d8818c1b2) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the `success`, `warning`, and `danger` variants to the Badge, NotificationInline, and NotificationToast components and deprecated the `confirm`, `notify`, and `alert` variants.

## 6.3.5

### Patch Changes

- [#1993](https://github.com/sumup-oss/circuit-ui/pull/1993) [`167ec183`](https://github.com/sumup-oss/circuit-ui/commit/167ec18375e6393fc82bc912e3a0805517d439dc) Thanks [@connor-baer](https://github.com/connor-baer)! - Remove duplicate id from the validation hint icon in form components.

## 6.3.4

### Patch Changes

- [#1983](https://github.com/sumup-oss/circuit-ui/pull/1983) [`e2bc1c8f`](https://github.com/sumup-oss/circuit-ui/commit/e2bc1c8f953465cf8a04079cbd539f89f93a58fc) Thanks [@connor-baer](https://github.com/connor-baer)! - Tweaked the design of the Toggle component.

- [#1984](https://github.com/sumup-oss/circuit-ui/pull/1984) [`f2e04479`](https://github.com/sumup-oss/circuit-ui/commit/f2e04479e452be3d5e1dbf6f65b64c3d45011aa7) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed the `notify` icon for the NotificationInline and NotificationToast components and the form field validation hint.

## 6.3.3

### Patch Changes

- [#1980](https://github.com/sumup-oss/circuit-ui/pull/1980) [`261e1850`](https://github.com/sumup-oss/circuit-ui/commit/261e1850a03564aa2ba5104bd19f3b1b655f238e) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the border from the Button's `primary` variant.

## 6.3.2

### Patch Changes

- [#1973](https://github.com/sumup-oss/circuit-ui/pull/1973) [`226e6cd9`](https://github.com/sumup-oss/circuit-ui/commit/226e6cd927ec71bb91538b57cf5fe474443ccabb) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed codemods for legacy Circuit UI versions and removed the obsolete `circuit-ui` CLI. The library doesn't support skipping major versions when upgrading.

## 6.3.1

### Patch Changes

- [#1969](https://github.com/sumup-oss/circuit-ui/pull/1969) [`c723f68e`](https://github.com/sumup-oss/circuit-ui/commit/c723f68e4d54d6c9c3db97e01ce2410fa76150a7) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the `Table` component's sticky row header on narrow viewports.

- [#1970](https://github.com/sumup-oss/circuit-ui/pull/1970) [`3b6c0de0`](https://github.com/sumup-oss/circuit-ui/commit/3b6c0de041104a75e96bdf0074c893325b9dd81f) Thanks [@robinmetral](https://github.com/robinmetral)! - Reverted a breaking change in the ImageInput component API.

## 6.3.0

### Minor Changes

- [#1944](https://github.com/sumup-oss/circuit-ui/pull/1944) [`5e1bbb6a`](https://github.com/sumup-oss/circuit-ui/commit/5e1bbb6a4729873a3cbd4ab7e6f9849d50e187f3) Thanks [@connor-baer](https://github.com/connor-baer) [@robinmetral](https://github.com/robinmetral)! - Migrated all components to use the new semantic color tokens. There are minor visual differences between colors. You will also notice the change in snapshots.

- [#1944](https://github.com/sumup-oss/circuit-ui/pull/1944) [`5e1bbb6a`](https://github.com/sumup-oss/circuit-ui/commit/5e1bbb6a4729873a3cbd4ab7e6f9849d50e187f3) Thanks [@robinmetral](https://github.com/robinmetral)! - Added a new `--cui-bg-elevated` color token to use as background for elevated elements such as modals, popovers, etc.

- [#1944](https://github.com/sumup-oss/circuit-ui/pull/1944) [`5e1bbb6a`](https://github.com/sumup-oss/circuit-ui/commit/5e1bbb6a4729873a3cbd4ab7e6f9849d50e187f3) Thanks [@connor-baer](https://github.com/connor-baer) [@robinmetral](https://github.com/robinmetral)! - Adapted the warning state of form components `validationHint` to the new color tokens. Both the warning icon and copy are now orange with the default Circuit UI theme.

- [#1944](https://github.com/sumup-oss/circuit-ui/pull/1944) [`5e1bbb6a`](https://github.com/sumup-oss/circuit-ui/commit/5e1bbb6a4729873a3cbd4ab7e6f9849d50e187f3) Thanks [@connor-baer](https://github.com/connor-baer) [@robinmetral](https://github.com/robinmetral)! - Adjusted the Avatar component's design to work with new semantic color tokens.

### Patch Changes

- [#1944](https://github.com/sumup-oss/circuit-ui/pull/1944) [`5e1bbb6a`](https://github.com/sumup-oss/circuit-ui/commit/5e1bbb6a4729873a3cbd4ab7e6f9849d50e187f3) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the ImageInput component's disabled state.

## 6.2.3

### Patch Changes

- [#1959](https://github.com/sumup-oss/circuit-ui/pull/1959) [`f5c48588`](https://github.com/sumup-oss/circuit-ui/commit/f5c485888b63099ba07f40447cf1339d25720c8c) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the value of the `--cui-bg-danger` color token.

## 6.2.2

### Patch Changes

- [#1942](https://github.com/sumup-oss/circuit-ui/pull/1942) [`fd62d2f5`](https://github.com/sumup-oss/circuit-ui/commit/fd62d2f50a20dd58efa246b5ec3aba7ab3c63b03) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the height of the `DateInput` component.

## 6.2.1

### Patch Changes

- [#1938](https://github.com/sumup-oss/circuit-ui/pull/1938) [`18735f1c`](https://github.com/sumup-oss/circuit-ui/commit/18735f1c51dbdbc2b8d0b9175fd8179164c6b366) Thanks [@sirineJ](https://github.com/sirineJ)! - Fixed the interactive styles of the secondary button inside a `ButtonGroup`.

## 6.2.0

### Minor Changes

- [#1916](https://github.com/sumup-oss/circuit-ui/pull/1916) [`75a1b203`](https://github.com/sumup-oss/circuit-ui/commit/75a1b203d5af0bb392a953cd1b2486032702a3f0) Thanks [@tavarest](https://github.com/tavarest)! - Tweaked the `SideNavigation` to expand the primary navigation on large viewports.

## 6.1.0

### Minor Changes

- [#1880](https://github.com/sumup-oss/circuit-ui/pull/1880) [`38dcc5c1`](https://github.com/sumup-oss/circuit-ui/commit/38dcc5c13a44a2331a744d2ddda5c0b1617d4f72) Thanks [@robinmetral](https://github.com/robinmetral)! - Added semantic color tokens as CSS custom properties to the `BaseStyles`. See the [documentation](https://circuit.sumup.com/?path=/docs/features-theme--docs) for details.

## 6.0.0

### Major Changes

- [#1664](https://github.com/sumup-oss/circuit-ui/pull/1664) [`e7c6ed5e`](https://github.com/sumup-oss/circuit-ui/commit/e7c6ed5e60c57b9c3da322c33fba5987bde34ee9) Thanks [@connor-baer](https://github.com/connor-baer)! - Wrapped the `ImageInput` component in a `div`. This aligns the component with other form components and makes it easier to apply style mixins such as `spacing`.

- [#1664](https://github.com/sumup-oss/circuit-ui/pull/1664) [`e7c6ed5e`](https://github.com/sumup-oss/circuit-ui/commit/e7c6ed5e60c57b9c3da322c33fba5987bde34ee9) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the `inline` prop from the `Input`, `Textarea`, and `Select` components. Use the `css` prop to apply custom styles instead.

- [#1772](https://github.com/sumup-oss/circuit-ui/pull/1772) [`817d7585`](https://github.com/sumup-oss/circuit-ui/commit/817d75851c295b0c1810aeacdd7474ee29afa6a6) Thanks [@a5e](https://github.com/a5e)! - Tweaked the `ButtonGroup` component to switch between a secondary button (on viewports of at least `mq.kilo`) and a tertiary button (on viewports narrower than `mq.kilo`) using CSS media queries instead of rendering three buttons. Tests (e.g. using `@testing-library`) can now query the secondary button without using `*AllBy` queries.

- [#1664](https://github.com/sumup-oss/circuit-ui/pull/1664) [`e7c6ed5e`](https://github.com/sumup-oss/circuit-ui/commit/e7c6ed5e60c57b9c3da322c33fba5987bde34ee9) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the `Label` component from the public exports. Use the `label` prop on the form components instead. When building a custom form component, use a `label` element with the `typography('two')` style mixin (don't forget about the `for` prop).

- [#1759](https://github.com/sumup-oss/circuit-ui/pull/1759) [`b03da80d`](https://github.com/sumup-oss/circuit-ui/commit/b03da80d1dd3d625c70bb3bf1824ff9beeac44ff) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the `noMargin` prop from Circuit UI form and typography components. Use the `spacing()` style mixin instead.

- [#1661](https://github.com/sumup-oss/circuit-ui/pull/1661) [`177fe66f`](https://github.com/sumup-oss/circuit-ui/commit/177fe66f7ce73d9c4fe90605c94e08e5b9959e31) Thanks [@tranhoangan22](https://github.com/tranhoangan22)! - Migrated the Popover component from [Popper](https://popper.js.org/) to [Floating UI](https://floating-ui.com/). Popper's `modifiers` are no longer supported, use the `offset` prop for flexible placement of the floating element instead. The `placement` prop no longer accepts `auto*` values.

- [#1664](https://github.com/sumup-oss/circuit-ui/pull/1664) [`e7c6ed5e`](https://github.com/sumup-oss/circuit-ui/commit/e7c6ed5e60c57b9c3da322c33fba5987bde34ee9) Thanks [@connor-baer](https://github.com/connor-baer)! - Changed how custom styles are forwarded to the `Input` and `Textarea` components. The `className` and `style` props are now passed to the outermost `div` (this also applies to Emotion's `css` prop). The `labelStyles` prop has been removed. This aligns the components with other form components and makes it easier to apply style mixins such as `spacing`.

- [#1760](https://github.com/sumup-oss/circuit-ui/pull/1760) [`b8f129ee`](https://github.com/sumup-oss/circuit-ui/commit/b8f129eed5673a00a4e4b5deeed4494e5ee93912) Thanks [@robinmetral](https://github.com/robinmetral)! - Switched typography units for the `Badge` component to use rem units. See [The Surprising Truth About Pixels and Accessibility](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/).

- [#1789](https://github.com/sumup-oss/circuit-ui/pull/1789) [`3c0c98dd`](https://github.com/sumup-oss/circuit-ui/commit/3c0c98dd5cacceca1e53f30a298a8d62a35c5cc8) Thanks [@robinmetral](https://github.com/robinmetral)! - Rendered the `Checkbox`'s `validationHint` under the input instead of in a tooltip. This makes the behavior consistent with other form components and improves accessibility.

- [#1795](https://github.com/sumup-oss/circuit-ui/pull/1795) [`426a0f63`](https://github.com/sumup-oss/circuit-ui/commit/426a0f639e38e949ce2ae5a36cefbb40c46dd791) Thanks [@robinmetral](https://github.com/robinmetral)! - Moved the `validationHint` outside the input `label`s and connected them to the inputs using `aria-describedby`. This affects form component markup and might be a breaking change in instances customizing input styles.

- [#1664](https://github.com/sumup-oss/circuit-ui/pull/1664) [`e7c6ed5e`](https://github.com/sumup-oss/circuit-ui/commit/e7c6ed5e60c57b9c3da322c33fba5987bde34ee9) Thanks [@connor-baer](https://github.com/connor-baer)! - Restricted the `label` prop on all form components to the `string` type.

- [#1766](https://github.com/sumup-oss/circuit-ui/pull/1766) [`47ef6962`](https://github.com/sumup-oss/circuit-ui/commit/47ef696295b0267e2cc50efa1034a7526308f835) Thanks [@robinmetral](https://github.com/robinmetral)! - Updated the browser support policy for Circuit UI. Moving forward, only browsers that support dynamic module imports will be supported.

- [#1781](https://github.com/sumup-oss/circuit-ui/pull/1781) [`5fe99fe8`](https://github.com/sumup-oss/circuit-ui/commit/5fe99fe86544ef7ae0ce6ef6756c6f8f73b0ae8a) Thanks [@robinmetral](https://github.com/robinmetral)! - Upgraded to `react-number-format` version 5. This could be a breaking change if you were relying on internal `react-number-format` props. Refer to the `react-number-format` [migration guide](https://s-yadav.github.io/react-number-format/docs/migration/) for details. Any explicit typings will also need to be updated.

### Minor Changes

- [#1664](https://github.com/sumup-oss/circuit-ui/pull/1664) [`e7c6ed5e`](https://github.com/sumup-oss/circuit-ui/commit/e7c6ed5e60c57b9c3da322c33fba5987bde34ee9) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for the `optionalLabel` and `disabled` props to the `RadioButtonGroup` component. This aligns the component with other form components.

### Patch Changes

- [#1813](https://github.com/sumup-oss/circuit-ui/pull/1813) [`269d4a19`](https://github.com/sumup-oss/circuit-ui/commit/269d4a19094a4c6fd30a9807327deb5a28357813) Thanks [@robinmetral](https://github.com/robinmetral)! - Allowed passing a custom `aria-describedby` value to form components. The custom value (an element `id`, or list of `id`s separated by a space) will be combined with the generated `id` of the `validationHint` element.

- [#1809](https://github.com/sumup-oss/circuit-ui/pull/1809) [`bd184b53`](https://github.com/sumup-oss/circuit-ui/commit/bd184b53a3d047ee878dab55813151ffb7bc8b52) Thanks [@robinmetral](https://github.com/robinmetral)! - Marked invalid radio buttons as invalid using `aria-invalid="true"`. This makes the state available to assistive technologies.

- [#1795](https://github.com/sumup-oss/circuit-ui/pull/1795) [`426a0f63`](https://github.com/sumup-oss/circuit-ui/commit/426a0f639e38e949ce2ae5a36cefbb40c46dd791) Thanks [@robinmetral](https://github.com/robinmetral)! - Fixed the size of the `Input` component's optional `prefix` and `suffix` (when passed as strings). They are now 16px (the size of the input's placeholder and value) instead of 14px (the size of the input's label).

- [#1795](https://github.com/sumup-oss/circuit-ui/pull/1795) [`426a0f63`](https://github.com/sumup-oss/circuit-ui/commit/426a0f639e38e949ce2ae5a36cefbb40c46dd791) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed unintended spacing below the `TextArea` component.

- [#1795](https://github.com/sumup-oss/circuit-ui/pull/1795) [`426a0f63`](https://github.com/sumup-oss/circuit-ui/commit/426a0f639e38e949ce2ae5a36cefbb40c46dd791) Thanks [@robinmetral](https://github.com/robinmetral)! - Improved the accessibility of the `RadioButtonGroup` component by adding the `role="radiogroup"` and `orientation="vertical"` attributes.

- [#1814](https://github.com/sumup-oss/circuit-ui/pull/1814) [`befbeee4`](https://github.com/sumup-oss/circuit-ui/commit/befbeee41d292c91674fcf24c0fdb4acfd769e7d) Thanks [@robinmetral](https://github.com/robinmetral)! - Added the currency symbol to the `CurrencyInput`'s accessible description.

- [#1811](https://github.com/sumup-oss/circuit-ui/pull/1811) [`0db1e468`](https://github.com/sumup-oss/circuit-ui/commit/0db1e4684b30fe4b7f28fdff615bf9361f56498e) Thanks [@robinmetral](https://github.com/robinmetral)! - Hid the decorative chevron icons in the `Select` component from assistive technology.

- [#1738](https://github.com/sumup-oss/circuit-ui/pull/1738) [`b0e046d3`](https://github.com/sumup-oss/circuit-ui/commit/b0e046d39cbb83cfac2b3f53abdd06c6aa018f69) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the unnecessary `passive` option from the Popover component's scroll event listener.

- [#1809](https://github.com/sumup-oss/circuit-ui/pull/1809) [`bd184b53`](https://github.com/sumup-oss/circuit-ui/commit/bd184b53a3d047ee878dab55813151ffb7bc8b52) Thanks [@robinmetral](https://github.com/robinmetral)! - Ensured that `aria-invalid` is always either `'true'` or undefined (defaults to 'false'). This prevents errors in implementations not using TypeScript.

## 5.4.0

### Minor Changes

- [#1786](https://github.com/sumup-oss/circuit-ui/pull/1786) [`242e1541`](https://github.com/sumup-oss/circuit-ui/commit/242e1541ef84f22fa3d1d3264cea961230eabd8b) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the option of using initials as a placeholder for the `identity` variant of the `Avatar` component.

## 5.3.2

### Patch Changes

- [#1779](https://github.com/sumup-oss/circuit-ui/pull/1779) [`0be74924`](https://github.com/sumup-oss/circuit-ui/commit/0be74924a42bf179fabaa960ce7bf7f5d0dca97a) Thanks [@hris27](https://github.com/hris27)! - Fixed a z-index issue with the SidePanel header.

## 5.3.1

### Patch Changes

- [#1651](https://github.com/sumup-oss/circuit-ui/pull/1651) [`ea1ebb0d`](https://github.com/sumup-oss/circuit-ui/commit/ea1ebb0dd95a8c5bdb57ddbfabc0caf8e4875375) Thanks [@anasalles47](https://github.com/anasalles47)! - Adjusted the SelectorGroup component to ensure that all Selectors have the same height.

## 5.3.0

### Minor Changes

- [#1720](https://github.com/sumup-oss/circuit-ui/pull/1720) [`d3c6165d`](https://github.com/sumup-oss/circuit-ui/commit/d3c6165d1971c25d0bfe2ffde1a78b33155d758b) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for passing an SVG component as `image.svg` to the `NotificationFullscreen` and `NotificationModal` components.

## 5.2.4

### Patch Changes

- [#1719](https://github.com/sumup-oss/circuit-ui/pull/1719) [`e0dbb2c8`](https://github.com/sumup-oss/circuit-ui/commit/e0dbb2c8666cce666ba681753bcdfe02e5274ad7) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed extra bottom spacing from the `NotificationInline` action.

## 5.2.3

### Patch Changes

- [#1644](https://github.com/sumup-oss/circuit-ui/pull/1644) [`6c5c2a1a`](https://github.com/sumup-oss/circuit-ui/commit/6c5c2a1a21e87ddee66d53dcbafb3ecf0eae34d1) Thanks [@amelako](https://github.com/amelako)! - Improved the accessibility of the `ImageInput` component by associating the validation hint with the input and announcing updates to screen reader users.

## 5.2.2

### Patch Changes

- [#1692](https://github.com/sumup-oss/circuit-ui/pull/1692) [`cab2f20c`](https://github.com/sumup-oss/circuit-ui/commit/cab2f20cf89746bd4b09aa3577176de405cbdf82) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a max-width to the headline of an imageless `NotificationModal` to prevent it from being overlapped by the close button.

## 5.2.1

### Patch Changes

- [#1690](https://github.com/sumup-oss/circuit-ui/pull/1690) [`66bef295`](https://github.com/sumup-oss/circuit-ui/commit/66bef29596c93a99e29bd97ca6efda1e47856ebe) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the spacing in imageless `NotificationModal`s.

## 5.2.0

### Minor Changes

- [#1682](https://github.com/sumup-oss/circuit-ui/pull/1682) [`d4ce46f0`](https://github.com/sumup-oss/circuit-ui/commit/d4ce46f042e993d8d3eb872dd92ef4fd6d7d6697) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the `ClickEvent`, `PopoverItemProps`, and `TableSortByValue` types to the public exports.

## 5.1.7

### Patch Changes

- [#1662](https://github.com/sumup-oss/circuit-ui/pull/1662) [`a74749c0`](https://github.com/sumup-oss/circuit-ui/commit/a74749c04b8ce737518bf31626b97f65a869b074) Thanks [@robinmetral](https://github.com/robinmetral)! - Improved `Table` component types. Deprecated the `Cell` type in favor of `HeaderCell` and `RowCell`, to reflect differences in sorting-related props. Correctly typed the `align` prop on the `Cell` instead of the `Row`.

- [`b74dc5e2`](https://github.com/sumup-oss/circuit-ui/commit/b74dc5e28a3e1eeda27c845e2a2d0d0750474d0b) Thanks [@dependabot[bot]](https://github.com/dependabot%5Bbot%5D)! - Upgraded `moment.js` to v2.29.4. If your app also depends on `moment.js`, you need to pin it to the same version to avoid the bug described in [#674](https://github.com/sumup-oss/circuit-ui/issues/674).

- [#1653](https://github.com/sumup-oss/circuit-ui/pull/1653) [`d4ecc20f`](https://github.com/sumup-oss/circuit-ui/commit/d4ecc20fb21cafc536dd8c6d41c737990feb054f) Thanks [@tranhoangan22](https://github.com/tranhoangan22)! - Fixed a spacing issue in the `Table` component when sorting a column in `condensed` mode.

## 5.1.6

### Patch Changes

- [#1645](https://github.com/sumup-oss/circuit-ui/pull/1645) [`607ba30f`](https://github.com/sumup-oss/circuit-ui/commit/607ba30f5f463975419a846f44d74a26c19c7d81) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed codemods for legacy Circuit UI versions. Any given Circuit UI version will now only include codemods for migrating from the previous major version. The library doesn't support skipping major versions when upgrading.

## 5.1.5

### Patch Changes

- [#1635](https://github.com/sumup-oss/circuit-ui/pull/1635) [`5c2ea976`](https://github.com/sumup-oss/circuit-ui/commit/5c2ea976a3320fe78d175f9b3260680e1d4ed070) Thanks [@robinmetral](https://github.com/robinmetral)! - Changed `Pagination` return type from `ReactNode` to `ReactElement | null` to prevent a clash with React 18 types.

## 5.1.4

### Patch Changes

- [#1627](https://github.com/sumup-oss/circuit-ui/pull/1627) [`4eaab3b2`](https://github.com/sumup-oss/circuit-ui/commit/4eaab3b25dfdc3d4a376aa1954e493fdef533c74) Thanks [@connor-baer](https://github.com/connor-baer)! - Added component stack traces to accessibility and deprecation warnings.

## 5.1.3

### Patch Changes

- [#1614](https://github.com/sumup-oss/circuit-ui/pull/1614) [`2ac245b6`](https://github.com/sumup-oss/circuit-ui/commit/2ac245b6b68ecb5f87ebd2fa68b542f04a63b0b6) Thanks [@connor-baer](https://github.com/connor-baer)! - Replaced `colors.n900` with `colors.bodyColor` when used as a text color for consistency.

* [#1605](https://github.com/sumup-oss/circuit-ui/pull/1605) [`384cedb7`](https://github.com/sumup-oss/circuit-ui/commit/384cedb79fc70857927c43e66e56145f177efdb8) Thanks [@robinmetral](https://github.com/robinmetral)! - Switched the `ToastContext`'s live region element from a `ul` to a `div`: lists shouldn't have `role="status"` since this strips list semantics.

## 5.1.2

### Patch Changes

- [#1607](https://github.com/sumup-oss/circuit-ui/pull/1607) [`46fa52e6`](https://github.com/sumup-oss/circuit-ui/commit/46fa52e64b7b1c541a225db9c8860165113379dd) Thanks [@connor-baer](https://github.com/connor-baer)! - Fixed the width of the `NotificationToast` component on narrow viewports.

## 5.1.1

### Patch Changes

- Updated dependencies [[`701b9f4b`](https://github.com/sumup-oss/circuit-ui/commit/701b9f4b957cf0fb8bda0d5050b5f72747832422)]:
  - @sumup/icons@2.9.1

## 5.1.0

### Minor Changes

- [#1585](https://github.com/sumup-oss/circuit-ui/pull/1585) [`2a8370e0`](https://github.com/sumup-oss/circuit-ui/commit/2a8370e0d1b1a4b2988853e935f71e6a2850fd2b) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for Docusaurus to the Modal.

### Patch Changes

- [#1570](https://github.com/sumup-oss/circuit-ui/pull/1570) [`bb9a8a39`](https://github.com/sumup-oss/circuit-ui/commit/bb9a8a39fa7966eb4a26d9e3e590c297aa147198) Thanks [@vascofg](https://github.com/vascofg)! - Allowed the loading state for the `IconButton` component. Pass an `isLoading` prop with an accessible `loadingLabel` label.

## 5.0.0

### Major Changes

- [#1534](https://github.com/sumup-oss/circuit-ui/pull/1534) [`35d297aa`](https://github.com/sumup-oss/circuit-ui/commit/35d297aad0e69e56652530c0141977ac98577c9a) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `CardList` component. Use the `ListItemGroup` instead.

* [#1531](https://github.com/sumup-oss/circuit-ui/pull/1531) [`ff09e8cf`](https://github.com/sumup-oss/circuit-ui/commit/ff09e8cfe97b6cc333734297de18b7e7927bad7f) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `LoadingButton` component. Use the `Button` component instead.

- [#1528](https://github.com/sumup-oss/circuit-ui/pull/1528) [`005d2a17`](https://github.com/sumup-oss/circuit-ui/commit/005d2a17983a83053d5a86fd9813b6130f3fefe2) Thanks [@robinmetral](https://github.com/robinmetral)! - Typed `noMargin` as a required prop in components.

* [#1513](https://github.com/sumup-oss/circuit-ui/pull/1513) [`4740ef30`](https://github.com/sumup-oss/circuit-ui/commit/4740ef30d22ec5f482c9d259454dadb03bdcef83) Thanks [@amelako](https://github.com/amelako)! - Removed the `UNSAFE_DISABLE_ACCESSIBILITY_ERRORS` environment variable.

- [#1511](https://github.com/sumup-oss/circuit-ui/pull/1511) [`eed3888f`](https://github.com/sumup-oss/circuit-ui/commit/eed3888f8df92d9e8358a0dc3b441852c38f852f) Thanks [@amelako](https://github.com/amelako)! - Threw a runtime error when the `noMargin` prop isn't passed to components requiring it. Setting the `UNSAFE_DISABLE_NO_MARGIN_ERRORS` environment variable to `true` will temporarily turn off the errors.

* [#1461](https://github.com/sumup-oss/circuit-ui/pull/1461) [`86e03b8d`](https://github.com/sumup-oss/circuit-ui/commit/86e03b8dffec7d410595197b9d682a712d2275f2) Thanks [@hris27](https://github.com/hris27)! - Changed the SideNavigation breakpoint to 1280px.

- [#1528](https://github.com/sumup-oss/circuit-ui/pull/1528) [`005d2a17`](https://github.com/sumup-oss/circuit-ui/commit/005d2a17983a83053d5a86fd9813b6130f3fefe2) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the default placeholder option in the `Select` component. Pass a localized string to `placeholder` instead, or keep the default option empty.

* [#1529](https://github.com/sumup-oss/circuit-ui/pull/1529) [`fa2101e5`](https://github.com/sumup-oss/circuit-ui/commit/fa2101e56031d8341cc392817aa1436308f2d181) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `showValid` option from the `inputOutline` style mixin.

- [#1542](https://github.com/sumup-oss/circuit-ui/pull/1542) [`2c62d308`](https://github.com/sumup-oss/circuit-ui/commit/2c62d3087a7a772e5feb0126cc39ad5c84b564f4) Thanks [@robinmetral](https://github.com/robinmetral)! - Optimized Circuit UI for modern browsers. Refer to the [browser support policy](https://circuit.sumup.com/?path=/docs/introduction-browser-support--docs) for details.

* [#1552](https://github.com/sumup-oss/circuit-ui/pull/1552) [`4e6a3750`](https://github.com/sumup-oss/circuit-ui/commit/4e6a375010aed43dcf5abc6b57c0503747b42b4b) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `children` prop from the `ButtonGroup` component. Use the `actions` prop instead.

- [#1512](https://github.com/sumup-oss/circuit-ui/pull/1512) [`b7712b30`](https://github.com/sumup-oss/circuit-ui/commit/b7712b3054b9c652c42d344da60e208828006d89) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the `RadioButton`'s deprecated `children` prop. Use the `label` prop (now required) instead, in both the `RadioButton` and the `RadioButtonGroup`'s `options`.

* [#1526](https://github.com/sumup-oss/circuit-ui/pull/1526) [`ba059828`](https://github.com/sumup-oss/circuit-ui/commit/ba059828c3caec2cabf0a43118af27a8128e78a0) Thanks [@amelako](https://github.com/amelako)! - Removed the deprecated `success`, `warning` and `danger` color variants. Use `confirm`, `notify` and `alert` instead.

- [#1510](https://github.com/sumup-oss/circuit-ui/pull/1510) [`908f1e77`](https://github.com/sumup-oss/circuit-ui/commit/908f1e77b25add3497c9dfcfecdd238bb035d79f) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the deprecated `shadowSingle`, `shadowDouble` and `shadowTriple` style mixins. Use the `shadow()` style mixin instead.

* [#1518](https://github.com/sumup-oss/circuit-ui/pull/1518) [`2987be29`](https://github.com/sumup-oss/circuit-ui/commit/2987be297ab8a77f447f9e8052fbb88116d7e704) Thanks [@amelako](https://github.com/amelako)! - Removed the deprecated `Notification`, `NotificationCard`, `NotificationList` and `InlineMessage` components.

- [#1533](https://github.com/sumup-oss/circuit-ui/pull/1533) [`dec0db59`](https://github.com/sumup-oss/circuit-ui/commit/dec0db596a2306c1e37a6f8ff4fc85692a02ba6b) Thanks [@robinmetral](https://github.com/robinmetral)! - Renamed the `ListItem` component's `prefix` and `suffix` props to `leadingComponent` and `trailingComponent`. Renamed the `suffixLabel` and `suffixDetails` props to `trailingLabel` and `trailingDetails`.

* [#1512](https://github.com/sumup-oss/circuit-ui/pull/1512) [`b7712b30`](https://github.com/sumup-oss/circuit-ui/commit/b7712b3054b9c652c42d344da60e208828006d89) Thanks [@robinmetral](https://github.com/robinmetral)! - Made the `RadioButton`'s `label` prop required and throw an error if it isn't passed. This is an accessibility requirement.

### Minor Changes

- [#1554](https://github.com/sumup-oss/circuit-ui/pull/1554) [`d3fb618a`](https://github.com/sumup-oss/circuit-ui/commit/d3fb618a3b73b1751067421bcd237e861d593f33) Thanks [@robinmetral](https://github.com/robinmetral)! - Added support for React 18.

* [#1507](https://github.com/sumup-oss/circuit-ui/pull/1507) [`c1942507`](https://github.com/sumup-oss/circuit-ui/commit/c19425073709a61e2df6cf0e5f4cb9dfa6af8d86) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed `lodash` as a dependency to reduce Circuit UI's bundle size. If you aren't using `lodash` in your application, you can remove `babel-plugin-lodash`.

- [#1559](https://github.com/sumup-oss/circuit-ui/pull/1559) [`1d7dc8c3`](https://github.com/sumup-oss/circuit-ui/commit/1d7dc8c3ba837099daafed58808216eb954e3f61) Thanks [@robinmetral](https://github.com/robinmetral)! - Added support for the `as` prop in the `Button` component. This is necessary to render buttons in a `ButtonGroup` as links with routing.

### Patch Changes

- [#1563](https://github.com/sumup-oss/circuit-ui/pull/1563) [`aa48826c`](https://github.com/sumup-oss/circuit-ui/commit/aa48826c82980d39bbc06e4b5d92c15c69e06bb8) Thanks [@robinmetral](https://github.com/robinmetral)! - Omitted the `noMargin` prop from the Anchor component's props.

- Updated dependencies [[`c7dfe6a4`](https://github.com/sumup-oss/circuit-ui/commit/c7dfe6a4b1b6c78a2477a8de2ac82a35a8f71dd6), [`d3fb618a`](https://github.com/sumup-oss/circuit-ui/commit/d3fb618a3b73b1751067421bcd237e861d593f33), [`ba059828`](https://github.com/sumup-oss/circuit-ui/commit/ba059828c3caec2cabf0a43118af27a8128e78a0)]:
  - @sumup/design-tokens@4.0.0
  - @sumup/icons@2.7.0

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

* [#1213](https://github.com/sumup-oss/circuit-ui/pull/1213) [`a27426aa`](https://github.com/sumup-oss/circuit-ui/commit/a27426aa668d667656bded20f08249056dd54494) Thanks [@robinmetral](https://github.com/robinmetral)! - Removed the Circuit CRA template. Use the [Next.js template](https://github.com/sumup-oss/circuit-ui/tree/main/packages/cna-template) instead.

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
