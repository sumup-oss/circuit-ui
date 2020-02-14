module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'JavaScript',
    environments: ['Browser'],
    frameworks: ['React', 'Emotion', 'Jest'],
    openSource: true
  },
  {
    rules: {
      'arrow-parens': 'off'
    }
  }
);
