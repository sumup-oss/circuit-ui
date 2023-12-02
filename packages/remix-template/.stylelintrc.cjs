module.exports = require('@sumup/foundry/stylelint')({
  plugins: ['@sumup/stylelint-plugin-circuit-ui'],
  rules: {
    'circuit-ui/no-invalid-custom-properties': true,
  },
});
