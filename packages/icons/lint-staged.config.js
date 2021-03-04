module.exports = require('@sumup/foundry/lint-staged')(
  {
    language: 'TypeScript',
  },
  {
    '*.svg': ['svgo --config svgo.config.js --pretty'],
  },
);
