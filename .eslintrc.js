module.exports = require('@sumup/foundry/eslint')({
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
      files: ['packages/icons/scripts/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'node/no-unpublished-require': 'off',
      },
    },
  ],
});
