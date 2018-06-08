const { createTransformer } = require('babel-jest'); // eslint-disable-line import/no-extraneous-dependencies

const babelConfig = {
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
