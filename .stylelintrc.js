module.exports = require('@sumup/foundry/stylelint')({
  plugins: ['@sumup/stylelint-plugin-circuit-ui'],
  rules: {
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: (selector) =>
          `Expected class selector "${selector}" to be kebab-case`,
      },
    ],
    'circuit-ui/no-invalid-custom-properties': true,
  },
});
