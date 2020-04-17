module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'TypeScript',
    environments: ['Node'],
    frameworks: ['React'],
    openSource: true,
  },
  {
    overrides: [
      {
        files: ['scripts/*'],
        rules: {
          'import/no-extraneous-dependencies': 'off',
          'node/no-unpublished-require': 'off',
        },
      },
    ],
  },
);
