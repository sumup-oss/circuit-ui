const { createTransformer } = require('babel-jest');
const baseConfig = require('./.babelrc');

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
