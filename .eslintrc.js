const {
  react: baseConfig,
  overwritePresets
} = require('@sumup/foundry/eslint');

const customConfig = {
  rules: {
    'import/prefer-default-export': 'warn'
  }
};

module.exports = overwritePresets(baseConfig, customConfig);
