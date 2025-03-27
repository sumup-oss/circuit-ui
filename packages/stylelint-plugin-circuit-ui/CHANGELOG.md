# @sumup-oss/stylelint-plugin-circuit-ui

## 4.0.0-next.0

### Patch Changes

- Updated dependencies [[`3dd75c9`](https://github.com/sumup-oss/circuit-ui/commit/3dd75c9b647eb80d5043c6cac1cbb0d299654f56), [`b7ff643`](https://github.com/sumup-oss/circuit-ui/commit/b7ff643cbb1d190d82a164b5116808546241a528)]:
  - @sumup-oss/design-tokens@9.0.0-next.0

## 3.0.0

### Major Changes

- [#2707](https://github.com/sumup-oss/circuit-ui/pull/2707) [`f8016eb`](https://github.com/sumup-oss/circuit-ui/commit/f8016ebe246005ed415ed9587ecdb76892e981c6) Thanks [@sirineJ](https://github.com/sirineJ)! - Raised the minimum Node.js version to 20+.

- [#2648](https://github.com/sumup-oss/circuit-ui/pull/2648) [`f583d05`](https://github.com/sumup-oss/circuit-ui/commit/f583d05d3af6c2ba68268ffb47b4099cecd89796) Thanks [@connor-baer](https://github.com/connor-baer)! - Renamed the package scope from `@sumup` to `@sumup-oss`. Replace `@sumup/stylelint-plugin-circuit-ui` with `@sumup-oss/stylelint-plugin-circuit-ui` in your `package.json` file, then update the plugin name in your Stylelint config:

  ```diff
  // .stylelintrc.js

  module.exports = {
  -  plugins: ['@sumup/stylelint-plugin-circuit-ui'],
  +  plugins: ['@sumup-oss/stylelint-plugin-circuit-ui'],
  };
  ```

### Minor Changes

- [#2653](https://github.com/sumup-oss/circuit-ui/pull/2653) [`33435cf`](https://github.com/sumup-oss/circuit-ui/commit/33435cf4a1a393bbb28fd0bcb9d63d8a2a6a5a60) Thanks [@connor-baer](https://github.com/connor-baer)! - Added `circuit-ui/no-deprecated-custom-properties` rule to flag uses of deprecated custom properties.

## 2.0.0

### Major Changes

- [#2406](https://github.com/sumup-oss/circuit-ui/pull/2406) [`455e5ed`](https://github.com/sumup-oss/circuit-ui/commit/455e5edf1ae951bbac04c2e523720a6544deb95e) Thanks [@connor-baer](https://github.com/connor-baer)! - Upgraded to [Stylelint 16](https://stylelint.io/migration-guide/to-16/#removed-support-for-nodejs-less-than-18120) and migrated to ECMAScript modules (ESM). The minimum required Node.js version is 18.12.0.

## 1.0.0

### Major Changes

- [#2156](https://github.com/sumup-oss/circuit-ui/pull/2156) [`982e4933`](https://github.com/sumup-oss/circuit-ui/commit/982e493339040b656068e9d1f174fb47b1675af0) Thanks [@connor-baer](https://github.com/connor-baer)! - Release the first major version 🚀
