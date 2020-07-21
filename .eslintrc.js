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
        files: ['src/cli/migrate/*.ts'],
        rules: {
          // jscodeshift expect no return value for files
          // that should not be transformed.
          'consistent-return': 'off',
        },
      },
    ],
  },
);
