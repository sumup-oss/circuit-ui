const path = require('path');
const webpack = require('webpack');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = ({ config, mode }) => {
  const isProduction = mode === 'PRODUCTION';

  // modify storybook's file-loader rule to avoid conflicts with svgr
  config.module.rules.find(rule =>
    rule.test.test('.svg')
  ).exclude = path.resolve(__dirname, '../src/');

  config.module.rules.push({
    test: /\.story\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre'
  });

  config.module.rules.push({
    test: /.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: {
              removeViewBox: false
            }
          }
        }
      },
      'url-loader'
    ]
  });

  config.plugins.push(
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true), // show deprecation warnings in storybook
      STORYBOOK: JSON.stringify(true),
      PRODUCTION: JSON.stringify(isProduction)
    })
  );

  config.module.rules.push({
    test: /\.(stories|story)\.mdx$/,
    use: [
      {
        loader: 'babel-loader',
        // may or may not need this line depending on your app's setup
        options: {
          plugins: ['@babel/plugin-transform-react-jsx'],
        },
      },
      {
        loader: '@mdx-js/loader',
        options: {
          compilers: [createCompiler({})],
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.(stories|story)\.[tj]sx?$/,
    loader: require.resolve('@storybook/source-loader'),
    exclude: [/node_modules/],
    enforce: 'pre',
  });

  if (isProduction) {
    config.module.rules.push({
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname)
    });
  }

  return config;
};
