const path = require('path');
const webpack = require('@storybook/react/node_modules/webpack');

const merge = require('webpack-merge');

module.exports = function(storybookBaseConfig, configType) {
  const isProduction = configType === 'PRODUCTION';

  const babelOptions = {
    plugins: [
      ['emotion', { autoLabel: true, sourceMap: true }],
      '@babel/plugin-proposal-class-properties',
      'lodash',
    ],
    presets: [['@babel/preset-env', { loose: true, modules: false }], '@babel/preset-react'],
    babelrc: false
  };

  const ourConfig = {
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
            { loader: 'babel-loader', options: babelOptions },
            {
              loader: require.resolve('@storybook/addon-storysource/loader'),
              options: {
                prettierConfig: {
                  parser: 'babylon'
                }
              }
            }
          ],
          enforce: 'pre'
        },
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
        STORYBOOK: JSON.stringify(true),
        PRODUCTION: JSON.stringify(isProduction)
      })
    ]
  };

  const ourProdSpecificConfig = {
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

  const baseConfig = merge(storybookBaseConfig, ourConfig);

  return isProduction ? merge(baseConfig, ourProdSpecificConfig) : baseConfig;
};
