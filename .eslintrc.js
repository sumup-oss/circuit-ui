module.exports = {
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'prettier',
    'prettier/react'
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'no-use-before-define': ['error', { functions: false }],
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'max-len': [
      'error',
      {
        code: 80,
        tabWidth: 2,
        ignorePattern: "^\\s*it\\(",
        ignoreComments: true,
        ignoreUrls: true
      }
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ],
    'react/prop-types': [1, { ignore: ['i18n', 'children'] }],
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['stories/**/*.js'] }
    ]
  },
  globals: {
    STORYBOOK: true,
    describe: true,
    beforeEach: true,
    inject: true,
    it: true,
    test: true,
    expect: true,
    afterEach: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      ecmaVersion: 2017,
      impliedStrict: true,
      jsx: true
    }
  },
  env: {
    browser: true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: '.storybook/webpack.config.js'
      }
    }
  }
};
