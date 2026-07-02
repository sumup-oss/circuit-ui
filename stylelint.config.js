import { defineConfig } from '@sumup-oss/foundry/stylelint';

export default defineConfig({
  extends: ['stylelint-config-css-modules'],
  plugins: ['@sumup-oss/stylelint-plugin-circuit-ui'],
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
