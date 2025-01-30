module.exports = require('@sumup-oss/foundry/eslint')({
  extends: [
    'plugin:storybook/recommended',
    'plugin:react-server-components/recommended',
  ],
  plugins: ['@sumup-oss/circuit-ui'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./packages/*/tsconfig.json', './tsconfig.eslint.json'],
      },
    },
  },
  rules: {
    '@sumup-oss/circuit-ui/no-invalid-custom-properties': 'error',
    '@sumup-oss/circuit-ui/no-deprecated-custom-properties': 'error',
    '@sumup-oss/circuit-ui/no-deprecated-props': 'error',
    '@sumup-oss/circuit-ui/no-deprecated-components': 'error',
    '@sumup-oss/circuit-ui/no-renamed-props': 'error',
    '@sumup-oss/circuit-ui/prefer-custom-properties': 'warn',
    '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    // These rules are already covered by Biome
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
  parserOptions: {
    project: ['./packages/*/tsconfig.json', './tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: [
        '**/*.spec.*',
        '**/jest*',
        '**/setupTests.*',
        '**/test-utils.*',
        '**/*Fixtures.*',
        '**/__fixtures__/**/*',
        '**/__mocks__/**/*',
      ],
      rules: {
        'testing-library/no-container': 'warn',
      },
    },
    {
      files: ['**/*.stories.*', '**/*.spec.*'],
      rules: {
        'import/no-relative-packages': 'off',
        'react-server-components/use-client': 'off',
      },
    },
    {
      files: ['packages/circuit-ui/components/legacy/**/*'],
      rules: {
        '@sumup-oss/circuit-ui/prefer-custom-properties': 'off',
      },
    },
    {
      files: ['vite.*', 'vitest.*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['packages/icons/scripts/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'node/no-unpublished-require': 'off',
      },
    },
    {
      files: ['templates/remix/**/*', 'templates/astro/**/*'],
      rules: {
        'notice/notice': 'off',
      },
    },
  ],
});
