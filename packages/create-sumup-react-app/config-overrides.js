const { injectBabelPlugin, compose } = require('react-app-rewired');
const rewireReactSvgLoader = require('react-app-rewire-react-svg-loader');

// We load the local eslintrc to overwrite CRA's config completely.
const eslintrc = require('./.eslintrc');

const injectBabelPluginWithConfig = (plugin, pluginConfig = {}) => config =>
  injectBabelPlugin([plugin, pluginConfig], config);

module.exports = compose(
  // BabelPlugins
  injectBabelPluginWithConfig('emotion'),
  injectBabelPluginWithConfig('lodash'),
  // Webpack loaders
  rewireReactSvgLoader
);
