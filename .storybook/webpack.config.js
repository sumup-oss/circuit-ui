const merge = require('webpack-merge');

const { getBaseConfig, prodConfig } = require('./webpack-helpers');

module.exports = ({ config, mode }) => {
  const isProduction = mode === 'PRODUCTION';
  const baseConfig = getBaseConfig(isProduction);
  const mergedConfig = merge(config, baseConfig);

  config.module.rules = config.module.rules.filter(
    rule => !rule.test.test('.svg')
  );

  return isProduction ? merge(mergedConfig, prodConfig) : mergedConfig;
};
