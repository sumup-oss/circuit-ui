const path = require('path');
const bourbonPath = require('bourbon').includePaths;
const neatPath = require('bourbon-neat').includePaths;
const webpack = require('webpack');

const normalizePath = path.join(__dirname, '../node_modules/normalize.css');
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
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, '../'),
          use: [
            { loader: 'isomorphic-style-loader' },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [normalizePath]
                  .concat(neatPath)
                  .concat(bourbonPath)
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        STORYBOOK: JSON.stringify(true),
      })
    ]
  };

  return merge(storybookBaseConfig, ourConfig);
};
