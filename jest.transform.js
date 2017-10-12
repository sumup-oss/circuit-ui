const { createTransformer } = require('babel-jest'); // eslint-disable-line import/no-extraneous-dependencies

const babelConfig = {
  plugins: [
    'lodash',
    'syntax-dynamic-import',
    'transform-object-rest-spread',
    'transform-class-properties'
  ],
  presets: [
    [
      'env',
      { targets: { browsers: '> 2% in my stats', uglify: true }, useBuiltIns: true }
    ]
    'react',
    'stage-3'
  ]
};

module.exports = createTransformer(babelConfig);
