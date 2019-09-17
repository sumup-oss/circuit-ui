const {
  react: baseConfig,
  overwritePresets
} = require('@sumup/foundry/eslint');

const customConfig = {
  rules: {
    'import/prefer-default-export': 'warn',
    'emotion/jsx-import': 'off'
  },
  overrides: [
    {
      files: ['src/**/*spec.js'],
      rules: {
        'max-len': [
          'error',
          {
            code: 80,
            tabWidth: 2,
            ignorePattern: '^\\s*it\\(',
            ignoreComments: true,
            ignoreUrls: true
          }
        ]
      },
      globals: {
        create: true,
        render: true,
        renderToHtml: true,
        axe: true,
        act: true,
        fireEvent: true,
        userEvent: true,
        wait: true
      },
      env: {
        'jest/globals': true
      }
    }
  ]
};

module.exports = overwritePresets(baseConfig, customConfig);
