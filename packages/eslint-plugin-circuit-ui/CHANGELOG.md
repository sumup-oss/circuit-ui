# @sumup/eslint-plugin-circuit-ui

## 4.0.0

### Minor Changes

- [#2307](https://github.com/sumup-oss/circuit-ui/pull/2307) [`a51de39c`](https://github.com/sumup-oss/circuit-ui/commit/a51de39cc1c5081474468149aac21a6a0b990749) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a migration for the IconButton's `icon` and `label` props to the `circuit-ui/no-renamed-props` rule.

- [#2311](https://github.com/sumup-oss/circuit-ui/pull/2311) [`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547) Thanks [@connor-baer](https://github.com/connor-baer)! - Added migrations for the Avatar, Button, CloseButton, Hamburger, IconButton, ProgressBar, Selector and Spinner size values to the `circuit-ui/no-renamed-props` rule.

### Patch Changes

- [`658916f6`](https://github.com/sumup-oss/circuit-ui/commit/658916f6f13003d4547c6e06da640fec2cd39eb9) Thanks [@connor-baer](https://github.com/connor-baer)! - Increased the specificity of AST node selectors to prevent false positives and improve performance.

- Updated dependencies [[`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547), [`a51de39c`](https://github.com/sumup-oss/circuit-ui/commit/a51de39cc1c5081474468149aac21a6a0b990749), [`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547), [`a51de39c`](https://github.com/sumup-oss/circuit-ui/commit/a51de39cc1c5081474468149aac21a6a0b990749), [`a51de39c`](https://github.com/sumup-oss/circuit-ui/commit/a51de39cc1c5081474468149aac21a6a0b990749), [`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547), [`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547), [`7959570f`](https://github.com/sumup-oss/circuit-ui/commit/7959570f8f8889eb8d964cc5e851ef637edfbc18)]:
  - @sumup/circuit-ui@7.5.0

## 4.0.0-canary.2

### Patch Changes

- [`658916f6`](https://github.com/sumup-oss/circuit-ui/commit/658916f6f13003d4547c6e06da640fec2cd39eb9) Thanks [@connor-baer](https://github.com/connor-baer)! - Increased the specificity of AST node selectors to prevent false positives and improve performance.

## 4.0.0-canary.1

### Patch Changes

- Updated dependencies [[`7959570f`](https://github.com/sumup-oss/circuit-ui/commit/7959570f8f8889eb8d964cc5e851ef637edfbc18)]:
  - @sumup/circuit-ui@7.5.0-canary.1

## 4.0.0-canary.0

### Minor Changes

- [#2307](https://github.com/sumup-oss/circuit-ui/pull/2307) [`a51de39c`](https://github.com/sumup-oss/circuit-ui/commit/a51de39cc1c5081474468149aac21a6a0b990749) Thanks [@connor-baer](https://github.com/connor-baer)! - Added a migration for the IconButton's `icon` prop to the `circuit-ui/no-renamed-props` rule.

- [#2311](https://github.com/sumup-oss/circuit-ui/pull/2311) [`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547) Thanks [@connor-baer](https://github.com/connor-baer)! - Added migrations for the Avatar, Button, Hamburger, IconButton, ProgressBar, Selector and Spinner size values to the `circuit-ui/no-renamed-props` rule.

### Patch Changes

- Updated dependencies [[`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547), [`a51de39c`](https://github.com/sumup-oss/circuit-ui/commit/a51de39cc1c5081474468149aac21a6a0b990749), [`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547), [`a51de39c`](https://github.com/sumup-oss/circuit-ui/commit/a51de39cc1c5081474468149aac21a6a0b990749), [`a51de39c`](https://github.com/sumup-oss/circuit-ui/commit/a51de39cc1c5081474468149aac21a6a0b990749), [`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547), [`39466c05`](https://github.com/sumup-oss/circuit-ui/commit/39466c054968e28b14a7a7b1389964f9b2573547)]:
  - @sumup/circuit-ui@7.5.0-canary.0

## 3.1.0

### Minor Changes

- [#2236](https://github.com/sumup-oss/circuit-ui/pull/2236) [`3fc4ef44`](https://github.com/sumup-oss/circuit-ui/commit/3fc4ef44fea5be861ac26fc210aeebafe5eb1760) Thanks [@connor-baer](https://github.com/connor-baer)! - Re-exported the RadioButton and Selector components as legacy components. They will be removed again in the next major release.

## 3.0.0

### Major Changes

- [#2164](https://github.com/sumup-oss/circuit-ui/pull/2164) [`e1db8492`](https://github.com/sumup-oss/circuit-ui/commit/e1db84920a152cb110ad53b5588849e1e705a01d) Thanks [@connor-baer](https://github.com/connor-baer)! - Added `circuit-ui/component-lifecycle-imports` rule to update component imports when they move to a different lifecycle stage.

### Minor Changes

- [#2158](https://github.com/sumup-oss/circuit-ui/pull/2158) [`415c73dd`](https://github.com/sumup-oss/circuit-ui/commit/415c73dd70dc2720b44ead24cd4b9d7d77af3293) Thanks [@connor-baer](https://github.com/connor-baer)! - Added `circuit-ui/prefer-custom-properties` rule to replace the Emotion.js theme with CSS custom properties.

### Patch Changes

- Updated dependencies [[`22b03d04`](https://github.com/sumup-oss/circuit-ui/commit/22b03d04f000b72b882962fcf9a67f1c93faff51), [`82878190`](https://github.com/sumup-oss/circuit-ui/commit/82878190d70c414032027449e14d8473aa196856), [`0b7fb453`](https://github.com/sumup-oss/circuit-ui/commit/0b7fb453e6eb714561ab4ff8311ef3d4853006c5), [`22b03d04`](https://github.com/sumup-oss/circuit-ui/commit/22b03d04f000b72b882962fcf9a67f1c93faff51), [`22b03d04`](https://github.com/sumup-oss/circuit-ui/commit/22b03d04f000b72b882962fcf9a67f1c93faff51), [`415c73dd`](https://github.com/sumup-oss/circuit-ui/commit/415c73dd70dc2720b44ead24cd4b9d7d77af3293), [`da1a11b0`](https://github.com/sumup-oss/circuit-ui/commit/da1a11b0f8fe2803cb4fc8cb35e759c178ce6916), [`bc882426`](https://github.com/sumup-oss/circuit-ui/commit/bc882426a859e68ec7c029e1b56adbaa63f8260f), [`0f29f87b`](https://github.com/sumup-oss/circuit-ui/commit/0f29f87bf28878f70e047ae42dd18c98660a2ffd), [`bc882426`](https://github.com/sumup-oss/circuit-ui/commit/bc882426a859e68ec7c029e1b56adbaa63f8260f), [`4f78573e`](https://github.com/sumup-oss/circuit-ui/commit/4f78573e94829e87fc250f284159969d4e5d8fc2), [`fef5b955`](https://github.com/sumup-oss/circuit-ui/commit/fef5b9554d2ff858fb8587f5624d8ee65dfbb969), [`6ff0b7da`](https://github.com/sumup-oss/circuit-ui/commit/6ff0b7da7f7aae906ffe467da08115d5500e157a), [`da1a11b0`](https://github.com/sumup-oss/circuit-ui/commit/da1a11b0f8fe2803cb4fc8cb35e759c178ce6916), [`6ff0b7da`](https://github.com/sumup-oss/circuit-ui/commit/6ff0b7da7f7aae906ffe467da08115d5500e157a), [`415c73dd`](https://github.com/sumup-oss/circuit-ui/commit/415c73dd70dc2720b44ead24cd4b9d7d77af3293), [`8adb8fee`](https://github.com/sumup-oss/circuit-ui/commit/8adb8feee02bbfef1d1fc6a9c7a9c5a30e25d027), [`0b7fb453`](https://github.com/sumup-oss/circuit-ui/commit/0b7fb453e6eb714561ab4ff8311ef3d4853006c5), [`da1a11b0`](https://github.com/sumup-oss/circuit-ui/commit/da1a11b0f8fe2803cb4fc8cb35e759c178ce6916), [`8adb8fee`](https://github.com/sumup-oss/circuit-ui/commit/8adb8feee02bbfef1d1fc6a9c7a9c5a30e25d027), [`bc882426`](https://github.com/sumup-oss/circuit-ui/commit/bc882426a859e68ec7c029e1b56adbaa63f8260f), [`6f992ae6`](https://github.com/sumup-oss/circuit-ui/commit/6f992ae6aa39767dcc7df5a6754dbcea4d06af9d), [`51cd70d3`](https://github.com/sumup-oss/circuit-ui/commit/51cd70d37e0fc4609f81e885a503a35e6f102d11), [`fef5b955`](https://github.com/sumup-oss/circuit-ui/commit/fef5b9554d2ff858fb8587f5624d8ee65dfbb969), [`82878190`](https://github.com/sumup-oss/circuit-ui/commit/82878190d70c414032027449e14d8473aa196856), [`8adb8fee`](https://github.com/sumup-oss/circuit-ui/commit/8adb8feee02bbfef1d1fc6a9c7a9c5a30e25d027), [`1267c69c`](https://github.com/sumup-oss/circuit-ui/commit/1267c69cee8dc7c30520753b7c2d662c222c5f03), [`51cd70d3`](https://github.com/sumup-oss/circuit-ui/commit/51cd70d37e0fc4609f81e885a503a35e6f102d11), [`22b03d04`](https://github.com/sumup-oss/circuit-ui/commit/22b03d04f000b72b882962fcf9a67f1c93faff51), [`8adb8fee`](https://github.com/sumup-oss/circuit-ui/commit/8adb8feee02bbfef1d1fc6a9c7a9c5a30e25d027), [`f53e4336`](https://github.com/sumup-oss/circuit-ui/commit/f53e4336739fa317ce7a6511ec3f9716382f5a15), [`eef360c4`](https://github.com/sumup-oss/circuit-ui/commit/eef360c4c0b5b4ab07cf178884cc3dc00e9bf842), [`22b03d04`](https://github.com/sumup-oss/circuit-ui/commit/22b03d04f000b72b882962fcf9a67f1c93faff51), [`8adb8fee`](https://github.com/sumup-oss/circuit-ui/commit/8adb8feee02bbfef1d1fc6a9c7a9c5a30e25d027)]:
  - @sumup/circuit-ui@7.0.0
  - @sumup/design-tokens@6.0.0

## 3.0.0-next.2

### Minor Changes

- [#2194](https://github.com/sumup-oss/circuit-ui/pull/2194) [`b423525f`](https://github.com/sumup-oss/circuit-ui/commit/b423525fdff80dd018e5ed5ab0a776e6ddcf51ec) Thanks [@connor-baer](https://github.com/connor-baer)! - Added the style mixins to the `component-lifecycle-imports` rule.

### Patch Changes

- Updated dependencies [[`d3e35bea`](https://github.com/sumup-oss/circuit-ui/commit/d3e35beaec1a82ed1486be24ab06afd2dbb9c82c), [`6f992ae6`](https://github.com/sumup-oss/circuit-ui/commit/6f992ae6aa39767dcc7df5a6754dbcea4d06af9d)]:
  - @sumup/circuit-ui@7.0.0-next.8

## 3.0.0-next.1

### Major Changes

- [#2164](https://github.com/sumup-oss/circuit-ui/pull/2164) [`e1db8492`](https://github.com/sumup-oss/circuit-ui/commit/e1db84920a152cb110ad53b5588849e1e705a01d) Thanks [@connor-baer](https://github.com/connor-baer)! - Added `circuit-ui/component-lifecycle-imports` rule to update component imports when they move to a different lifecycle stage.

### Patch Changes

- Updated dependencies [[`cf5e82fc`](https://github.com/sumup-oss/circuit-ui/commit/cf5e82fc0fb9f0c4179fa61e9c22a2ccf20c8510), [`b51431fc`](https://github.com/sumup-oss/circuit-ui/commit/b51431fc7f8ce7447a04f1c63b0a8066615228dd), [`4b7dd4d6`](https://github.com/sumup-oss/circuit-ui/commit/4b7dd4d6e18e0026542771580119924f5f318c92)]:
  - @sumup/circuit-ui@7.0.0-next.6
  - @sumup/design-tokens@6.0.0-next.3

## 3.0.0-next.0

### Minor Changes

- [#2158](https://github.com/sumup-oss/circuit-ui/pull/2158) [`415c73dd`](https://github.com/sumup-oss/circuit-ui/commit/415c73dd70dc2720b44ead24cd4b9d7d77af3293) Thanks [@connor-baer](https://github.com/connor-baer)! - Added `circuit-ui/prefer-custom-properties` rule to replace the Emotion.js theme with CSS custom properties.

### Patch Changes

- Updated dependencies [[`415c73dd`](https://github.com/sumup-oss/circuit-ui/commit/415c73dd70dc2720b44ead24cd4b9d7d77af3293), [`6ff0b7da`](https://github.com/sumup-oss/circuit-ui/commit/6ff0b7da7f7aae906ffe467da08115d5500e157a), [`6ff0b7da`](https://github.com/sumup-oss/circuit-ui/commit/6ff0b7da7f7aae906ffe467da08115d5500e157a), [`415c73dd`](https://github.com/sumup-oss/circuit-ui/commit/415c73dd70dc2720b44ead24cd4b9d7d77af3293), [`eef360c4`](https://github.com/sumup-oss/circuit-ui/commit/eef360c4c0b5b4ab07cf178884cc3dc00e9bf842)]:
  - @sumup/design-tokens@6.0.0-next.2
  - @sumup/circuit-ui@7.0.0-next.5

## 2.1.0

### Minor Changes

- [#2175](https://github.com/sumup-oss/circuit-ui/pull/2175) [`8292173e`](https://github.com/sumup-oss/circuit-ui/commit/8292173eb9edb5cd6a78a817db77b0fef95001d5) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for flagging and fixing `setToast` calls to the `circuit-ui/no-renamed-props` rule.

## 2.0.1

### Patch Changes

- [#2173](https://github.com/sumup-oss/circuit-ui/pull/2173) [`df2921af`](https://github.com/sumup-oss/circuit-ui/commit/df2921afa1a05fe7b9c9e2800dc235ef6d26c1a8) Thanks [@connor-baer](https://github.com/connor-baer)! - Made the reported node more specific.

## 2.0.0

### Major Changes

- [#2171](https://github.com/sumup-oss/circuit-ui/pull/2171) [`1afb4ad9`](https://github.com/sumup-oss/circuit-ui/commit/1afb4ad9337af8cd8b1bf369740a39fa60024cae) Thanks [@connor-baer](https://github.com/connor-baer)! - Added `@sumup/circuit-ui >=6.8.0` as a required peer dependency.

### Minor Changes

- [#2171](https://github.com/sumup-oss/circuit-ui/pull/2171) [`1afb4ad9`](https://github.com/sumup-oss/circuit-ui/commit/1afb4ad9337af8cd8b1bf369740a39fa60024cae) Thanks [@connor-baer](https://github.com/connor-baer)! - Added `circuit-ui/no-deprecated-props` rule to warn when using deprecated component props.

- [#2171](https://github.com/sumup-oss/circuit-ui/pull/2171) [`1afb4ad9`](https://github.com/sumup-oss/circuit-ui/commit/1afb4ad9337af8cd8b1bf369740a39fa60024cae) Thanks [@connor-baer](https://github.com/connor-baer)! - Added `circuit-ui/no-renamed-props` rule to update renamed component prop names and values.

- [#2171](https://github.com/sumup-oss/circuit-ui/pull/2171) [`1afb4ad9`](https://github.com/sumup-oss/circuit-ui/commit/1afb4ad9337af8cd8b1bf369740a39fa60024cae) Thanks [@connor-baer](https://github.com/connor-baer)! - Added `circuit-ui/no-deprecated-components` rule to warn when using deprecated components.

## 1.0.0

### Major Changes

- [#2156](https://github.com/sumup-oss/circuit-ui/pull/2156) [`982e4933`](https://github.com/sumup-oss/circuit-ui/commit/982e493339040b656068e9d1f174fb47b1675af0) Thanks [@connor-baer](https://github.com/connor-baer)! - Release the first major version 🚀

## 0.1.0

### Minor Changes

- [#2040](https://github.com/sumup-oss/circuit-ui/pull/2040) [`fc006c27`](https://github.com/sumup-oss/circuit-ui/commit/fc006c275478dbea66be039160ad20701247448c) Thanks [@connor-baer](https://github.com/connor-baer)! - Imported the valid custom properties from `@sumup/design-tokens` which is now a required peer dependency.

## 0.0.2

### Patch Changes

- [#2091](https://github.com/sumup-oss/circuit-ui/pull/2091) [`3334873d`](https://github.com/sumup-oss/circuit-ui/commit/3334873d33430fde670facaa0da311d63b1d259a) Thanks [@connor-baer](https://github.com/connor-baer)! - Upgraded all dependencies to their latest minor.

## 0.0.1

### Patch Changes

- [#1991](https://github.com/sumup-oss/circuit-ui/pull/1991) [`401ac252`](https://github.com/sumup-oss/circuit-ui/commit/401ac252d883c74cc14ea343dab0b7e0b5fac8f5) Thanks [@robinmetral](https://github.com/robinmetral)! - Released ESLint rules to lint Circuit UI in `@sumup/eslint-plugin-circuit-ui`.
