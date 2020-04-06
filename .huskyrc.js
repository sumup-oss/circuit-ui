module.exports = require('@sumup/foundry/husky')(null, {
  hooks: {
    'commit-msg': 'cz-customizable-ghooks ${HUSKY_GIT_PARAMS}',
  },
});
