<div align="center">

# @sumup-oss/stylelint-plugin-circuit-ui

Stylelint rules to help users follow best practices when using Circuit UI.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup-oss/stylelint-plugin-circuit-ui)](https://www.npmjs.com/package/@sumup-oss/stylelint-plugin-circuit-ui) [![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/circuit-ui)](https://codecov.io/gh/sumup-oss/circuit-ui) [![License](https://img.shields.io/badge/license--lightgrey.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/packages/stylelint-plugin-circuit-ui/LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md)

</div>

## Installation

Depending on your preference, run one of the following in your terminal:

```sh
# With npm
npm install --save-dev @sumup-oss/stylelint-plugin-circuit-ui

# With yarn v1
yarn add --dev @sumup-oss/stylelint-plugin-circuit-ui
```

## Usage

Add the plugin to your [Stylelint configuration file](https://stylelint.io/user-guide/configure):

```json
{
  "plugins": ["@sumup-oss/stylelint-plugin-circuit-ui"]
}
```

Rules are configured under the rules section:

```json
{
  "rules": {
    "circuit-ui/<rule-name>": true
  }
}
```

## Supported Rules

- [`no-invalid-custom-properties`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/stylelint-plugin-circuit-ui/no-invalid-custom-properties)
