const path = require('path');
const webpack = require('webpack');

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
      STORYBOOK: JSON.stringify(true),
      PRODUCTION: JSON.stringify(isProduction)
    })
  );

  if (isProduction) {
    config.module.rules.push({
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname)
    });
  }

  return config;
};
