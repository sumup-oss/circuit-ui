module.exports = require('@sumup/foundry/eslint')({
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
  plugins: ['@sumup/circuit-ui'],
  rules: {
    'notice/notice': 'off',
    '@sumup/circuit-ui/component-lifecycle-imports': 'error',
    '@sumup/circuit-ui/no-invalid-custom-properties': 'error',
    '@sumup/circuit-ui/no-deprecated-components': 'error',
    '@sumup/circuit-ui/no-deprecated-props': 'error',
    '@sumup/circuit-ui/no-renamed-props': 'error',
    '@sumup/circuit-ui/prefer-custom-properties': 'error',
  },
});
