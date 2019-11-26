const { node: baseConfig, overwritePresets } = require('@sumup/foundry/eslint');

const customConfig = {
  overrides: [
    {
      files: ['files/**/*.js'],
      rules: {
        'notice/notice': 'off',
        'import/no-unresolved': 'off',
        'no-unused-vars': 'warn'
      }
    }
  ]
};

module.exports = overwritePresets(baseConfig, customConfig);
