module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'TypeScript',
    environments: ['Browser'],
    frameworks: ['React', 'Emotion', 'Jest'],
    openSource: true,
  },
  {
    parserOptions: {
      project: ['./tsconfig.eslint.json'],
    },
    rules: {
      // The custom JSX pragma is required to make Emotion's css prop
      // work with TypeScript.
      'emotion/jsx-import': 'error',
    },
    overrides: [
      {
        files: ['**/*.js'],
        rules: {
          '@typescript-eslint/no-explicit-any': 'off',
          '@typescript-eslint/no-unsafe-call': 'off',
          '@typescript-eslint/no-unsafe-return': 'off',
          '@typescript-eslint/no-unsafe-assignment': 'off',
          '@typescript-eslint/no-unsafe-member-access': 'off',
          '@typescript-eslint/restrict-template-expressions': 'off',
          '@typescript-eslint/restrict-plus-operands': 'off',
          '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
      },
      {
        files: [
          'src/cli/migrate/__testfixtures__/**/*.input.*',
          'src/cli/migrate/__testfixtures__/**/*.output.*',
        ],
        rules: {
          'import/no-unresolved': 'off',
          'notice/notice': 'off',
          '@typescript-eslint/no-unused-vars': 'off',
          'prettier/prettier': 'off',
        },
      },
      {
        files: ['src/cli/migrate/*.ts', 'src/cli/migrate/utils/*.ts'],
        rules: {
          // jscodeshift expect no return value for files
          // that should not be transformed.
          'consistent-return': 'off',
          'no-console': 'off',
          '@typescript-eslint/no-unsafe-call': 'off',
          '@typescript-eslint/no-unsafe-assignment': 'off',
          '@typescript-eslint/no-unsafe-member-access': 'off',
        },
      },
    ],
  },
);
