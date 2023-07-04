<div align="center">

# @sumup/eslint-plugin-circuit-ui

ESLint rules to lint Circuit UI.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup/eslint-plugin-circuit-ui)](https://www.npmjs.com/package/@sumup/eslint-plugin-circuit-ui) [![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/circuit-ui)](https://codecov.io/gh/sumup-oss/circuit-ui) [![License](https://img.shields.io/badge/license--lightgrey.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md)

</div>

## Installation

Depending on your preference, run one of the following in your terminal:

```sh
# With npm
npm install --save-dev @sumup/eslint-plugin-circuit-ui

# With yarn v1
yarn add --dev @sumup/eslint-plugin-circuit-ui
```

## Usage

Add the plugin to your [ESLint configuration file](https://eslint.org/docs/latest/use/configure/configuration-files):

```json
{
  "plugins": ["@sumup/circuit-ui"]
}
```

Rules are configured under the rules section:

```json
{
  "rules": {
    "@sumup/circuit-ui/<rule-name>": "error"
  }
}
```

## Supported Rules

- [`no-invalid-custom-properties`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/no-invalid-custom-properties)
- [`no-deprecated-components`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/no-deprecated-components)
- [`no-deprecated-props`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/no-deprecated-props)
- [`no-renamed-props`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/no-renamed-props)
