module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'TypeScript',
    environments: ['Browser'],
    frameworks: ['React', 'Emotion', 'Jest'],
    openSource: true
  },
  {
    rules: {
      'arrow-parens': 'off'
    },
    parserOptions: {
      project: ['./tsconfig.eslint.json']
    },
    overrides: [
      {
        files: ['**/*.js', '**/*.jsx'],
        rules: {
          '@typescript-eslint/explicit-function-return-type': 'off'
        }
      }
    ]
  }
);
