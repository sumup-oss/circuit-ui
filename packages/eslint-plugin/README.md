<div align="center">

# @sumup/eslint-plugin

ESLint rules to lint Circuit UI.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup/design-tokens)](https://www.npmjs.com/package/@sumup/design-tokens) [![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/circuit-ui)](https://codecov.io/gh/sumup-oss/circuit-ui) [![License](https://img.shields.io/badge/license--lightgrey.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/packages/design-tokens/LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md)

</div>

## Installation

Depending on your preference, run one of the following in your terminal:

```sh
# With Yarn
yarn add @sumup/design-tokens
# With npm
npm install @sumup/design-tokens
```

## Usage

Add the plugin to your [ESLint configuration file](https://eslint.org/docs/latest/use/configure/configuration-files):

```json
{
  "plugins": ["@sumup"]
}
```

Rules are configured under the rules section:

```json
{
  "rules": {
    "@sumup/<rule-name>": "error"
  }
}
```

## Supported Rules

- [`no-invalid-custom-properties`](./no-invalid-custom-properties/)
