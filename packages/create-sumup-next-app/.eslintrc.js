module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'TypeScript',
    environments: ['Browser'],
    frameworks: ['Jest', 'Emotion', 'React'],
    openSource: false,
  },
  {
    settings: {
      // We need to hard-code the Jest version since eslint-plugin-jest
      // can't infer the Jest version from the template package.json.
      jest: {
        version: 26,
      },
    },
  },
);
