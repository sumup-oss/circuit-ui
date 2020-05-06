module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'JavaScript',
    environments: ['Node', 'Browser'],
    frameworks: ['React', 'Emotion', 'Jest'],
    openSource: true,
  },
  {
    overrides: [
      {
        files: ['files/**/*.js'],
        rules: {
          'notice/notice': 'off',
          'import/no-unresolved': 'off',
          'no-unused-vars': 'warn',
        },
      },
    ],
  },
);
