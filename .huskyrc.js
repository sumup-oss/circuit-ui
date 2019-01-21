const { base: baseConfig } = require('@sumup/foundry/husky');

const customConfig = {
  'commit-msg': 'cz-customizable-ghooks'
};

module.exports = { ...baseConfig, ...customConfig };
