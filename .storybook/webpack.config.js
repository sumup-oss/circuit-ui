const webpack = require('webpack');

module.exports = ({ config, mode }) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      STORYBOOK: JSON.stringify(true),
      __TEST__: JSON.stringify(false),
      __PRODUCTION__: JSON.stringify(true),
      // Show deprecation warnings in Storybook
      __DEV__: JSON.stringify(true)
    })
  );

  return config;
};
