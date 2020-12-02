module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'JavaScript',
    environments: ['Node', 'Browser'],
    frameworks: ['React', 'Emotion', 'Jest'],
    openSource: true,
  },
  {
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    overrides: [
      {
        files: ['template/**/*.js'],
        rules: {
          'notice/notice': 'off',
          'import/no-unresolved': 'off',
          'no-unused-vars': 'warn',
        },
      },
    ],
  },
);
