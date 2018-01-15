const { createTransformer } = require('babel-jest'); // eslint-disable-line import/no-extraneous-dependencies

const babelConfig = {
  plugins: [
    'lodash',
    'syntax-dynamic-import',
    'transform-es2015-modules-commonjs',
    'transform-object-rest-spread',
    'transform-class-properties'
  ],
  presets: [['env', { targets: { node: 'current' } }], 'react', 'stage-3']
};

module.exports = createTransformer(babelConfig);
