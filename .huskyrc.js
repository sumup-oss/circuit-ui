const { merge } = require('lodash/fp');
const { base: baseConfig } = require('@sumup/foundry/husky');

const customConfig = {
  hooks: {
    'commit-msg': 'cz-customizable-ghooks ${HUSKY_GIT_PARAMS}'
  }
};

module.exports = merge(baseConfig, customConfig);
