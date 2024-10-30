<div align="center">

# @sumup-oss/eslint-plugin-circuit-ui

ESLint rules to help users follow best practices when using Circuit UI.

[![Stars](https://img.shields.io/github/stars/sumup-oss/circuit-ui?style=social)](https://github.com/sumup-oss/circuit-ui/) [![Version](https://img.shields.io/npm/v/@sumup-oss/eslint-plugin-circuit-ui)](https://www.npmjs.com/package/@sumup-oss/eslint-plugin-circuit-ui) [![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/circuit-ui)](https://codecov.io/gh/sumup-oss/circuit-ui) [![License](https://img.shields.io/badge/license--lightgrey.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](https://github.com/sumup-oss/circuit-ui/tree/main/CODE_OF_CONDUCT.md)

</div>

## Installation

Depending on your preference, run one of the following in your terminal:

```sh
# With npm
npm install --save-dev @sumup-oss/eslint-plugin-circuit-ui

# With yarn v1
yarn add --dev @sumup-oss/eslint-plugin-circuit-ui
```

## Usage

Add the plugin to your [ESLint configuration file](https://eslint.org/docs/latest/use/configure/configuration-files):

```json
{
  "plugins": ["@sumup-oss/circuit-ui"]
}
```

Rules are configured under the rules section:

```json
{
  "rules": {
    "@sumup-oss/circuit-ui/<rule-name>": "error"
  }
}
```

## Supported Rules

- [`component-lifecycle-imports`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/component-lifecycle-imports)
- [`no-invalid-custom-properties`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/no-invalid-custom-properties)
- [`no-deprecated-components`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/no-deprecated-components)
- [`no-deprecated-props`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/no-deprecated-props)
- [`no-renamed-props`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/no-renamed-props)
- [`prefer-custom-properties`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/prefer-custom-properties)
- [`renamed-organization-imports`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/renamed-organization-imports)
