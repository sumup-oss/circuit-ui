const webpack = require('webpack');
const path = require('path');

const babelConfig = {
  plugins: [
    ['emotion', { autoLabel: true, sourceMap: true }],
    '@babel/plugin-proposal-class-properties',
    'lodash'
  ],
  presets: [
    ['@babel/preset-env', { loose: true, modules: false }],
    '@babel/preset-react'
  ],
  babelrc: false
};

const getBaseConfig = isProduction => {
  return {
    devtool: 'eval-source-map',
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
          test: /\.story\.jsx?$/,
          loaders: [
            { loader: 'babel-loader', options: babelConfig },
            {
              loader: require.resolve('@storybook/addon-storysource/loader'),
              options: {
                prettierConfig: {
                  parser: 'babel'
                }
              }
            }
          ],
          enforce: 'pre'
        },
        {
          test: /.svg$/,
          use: ['@svgr/webpack', 'url-loader']
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        STORYBOOK: JSON.stringify(true),
        PRODUCTION: JSON.stringify(isProduction)
      })
    ]
  };
};

const prodConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname)
      }
    ]
  }
};

module.exports = {
  babelConfig,
  getBaseConfig,
  prodConfig
};
