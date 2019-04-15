const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { ANALYZE } = process.env;

module.exports = withPlugins(
  [[withTM, { transpileModules: ['@sumup/circuit-ui'] }]],
  {
    webpack: config => {
      // Fixes npm packages that depend on `fs` module
      // eslint-disable-next-line no-param-reassign
      config.node = {
        fs: 'empty'
      };

      // eslint-disable-next-line no-param-reassign
      config.resolve.alias = {
        ...config.resolve.alias,
        '@sumup/circuit-ui': require.resolve('@sumup/circuit-ui/lib/es')
      };

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
  }
);
