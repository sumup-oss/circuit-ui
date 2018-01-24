const path = require('path');
const webpack = require('webpack');

const merge = require('webpack-merge');

module.exports = function(storybookBaseConfig, configType) {
  if (configType === 'PRODUCTION') {
    storybookBaseConfig.plugins = storybookBaseConfig.plugins.filter(
      plugin => plugin.constructor.name !== 'UglifyJsPlugin'
    );
  }

  const ourConfig = {
    externals: {
      jsdom: 'window',
      cheerio: 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
      'react/addons': true
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'react-svg-loader',
              options: {
                es5: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        STORYBOOK: JSON.stringify(true)
      })
    ]
  };

  return merge(storybookBaseConfig, ourConfig);
};
