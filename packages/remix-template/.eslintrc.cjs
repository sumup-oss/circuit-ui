module.exports = require('@sumup-oss/foundry/eslint')({
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
  rules: {
    'notice/notice': 'off',
  },
});
