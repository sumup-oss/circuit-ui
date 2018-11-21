const { createTransformer } = require('babel-jest');
const baseConfig = require('./src/.babelrc');

const babelConfig = {
  ...baseConfig,
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          modules: 'commonjs'
        }
      }
    ]
  ]
};

module.exports = createTransformer(babelConfig);
