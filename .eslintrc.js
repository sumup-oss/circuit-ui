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
    '@sumup-oss/circuit-ui/prefer-custom-properties': 'warn',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
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
      files: ['**/*.stories.*'],
      rules: {
        'import/no-relative-packages': 'off',
        'react-server-components/use-client': 'off',
      },
    },
    {
      files: ['**/*.spec.*'],
      rules: {
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
      files: ['packages/remix-template/**/*', 'packages/astro-template/**/*'],
      rules: {
        'notice/notice': 'off',
      },
    },
  ],
});
