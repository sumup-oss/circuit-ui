module.exports = require('@sumup-oss/foundry/stylelint')({
  extends: ['stylelint-prettier/recommended', 'stylelint-config-css-modules'],
  plugins: [
    // TODO: Remove once Foundry has been updated
    '@sumup-oss/stylelint-plugin-circuit-ui',
  ],
  rules: {
    'circuit-ui/no-invalid-custom-properties': true,
    'circuit-ui/no-deprecated-custom-properties': true,
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: (selector) =>
          `Expected class selector "${selector}" to be kebab-case`,
      },
    ],
  },
});
