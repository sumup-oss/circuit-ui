const withTM = require('@weco/next-plugin-transpile-modules');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { ANALYZE } = process.env;

module.exports = withTM({
  transpileModules: ['@sumup/circuit-ui'],
  webpack: (config, { defaultLoaders }) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    config.module.rules.push({
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
    });

    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8889,
          openAnalyzer: true
        })
      );
    }

    return config;
  }
});
