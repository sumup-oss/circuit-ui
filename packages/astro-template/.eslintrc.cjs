module.exports = require('@sumup/foundry/eslint')({
  plugins: ['@sumup/circuit-ui'],
  rules: {
    '@sumup/circuit-ui/component-lifecycle-imports': 'error',
    '@sumup/circuit-ui/no-invalid-custom-properties': 'error',
    '@sumup/circuit-ui/no-deprecated-components': 'error',
    '@sumup/circuit-ui/no-deprecated-props': 'error',
    '@sumup/circuit-ui/no-renamed-props': 'error',
    '@sumup/circuit-ui/prefer-custom-properties': 'error',
  },
});
