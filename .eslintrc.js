module.exports = require('@sumup/foundry/eslint')({
  plugins: ['@sumup/circuit-ui'],
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
    '@sumup/circuit-ui/no-invalid-custom-properties': 'error',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
  parserOptions: {
    project: ['./packages/*/tsconfig.json', './tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-relative-packages': 'off',
      },
    },
    {
      files: ['vite.*', 'vitest.*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['packages/circuit-ui/**/*'],
      settings: {
        'import/core-modules': ['@linaria/core', '@linaria/react'],
      },
    },
    {
      files: ['packages/icons/scripts/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'node/no-unpublished-require': 'off',
      },
    },
  ],
});
