const webpack = require('webpack');
const path = require('path');
const toPath = _path => path.join(process.cwd(), _path);
module.exports = {
  staticDirs: [toPath('.storybook/public')],
  stories: ['../packages/**/*.@(mdx|stories.@(js|ts|tsx))', '../docs/**/*.@(mdx|stories.@(js|ts|tsx))'],
  addons: [{
    name: '@storybook/preset-typescript',
    options: {
      transpileManager: true
    }
  }, {
    name: '@storybook/addon-docs',
    options: {
      sourceLoaderOptions: {
        injectStoryParameters: false
      }
    }
  }, '@storybook/addon-storysource', '@storybook/addon-controls', '@storybook/addon-actions', '@storybook/addon-a11y', '@storybook/addon-links', '@storybook/addon-viewport', '@storybook/addon-backgrounds', '@storybook/addon-interactions'],
  features: {
    postcss: false
  },
  core: {
    disableTelemetry: true
  },
  webpackFinal: createWebpackConfig,
  managerWebpack: createWebpackConfig,
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: true
  }
};
function createWebpackConfig(config) {
  // Expose environment variables to Storybook
  config.plugins = [...config.plugins, new webpack.DefinePlugin({
    'process.env.UNSAFE_DISABLE_NO_MARGIN_ERRORS': JSON.stringify(process.env.UNSAFE_DISABLE_NO_MARGIN_ERRORS)
  })];
  return config;
}