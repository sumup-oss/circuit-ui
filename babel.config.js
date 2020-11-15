module.exports = {
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'lodash',
    'react-docgen',
    [
      'babel-plugin-react-docgen-typescript',
      {
        shouldExtractLiteralValuesFromEnum: true,
        propFilter: (prop, component) => {
          if (prop.parent) {
            return !prop.parent.fileName.includes('node_modules');
          }

          return true;
        },
        exclude: 'stories\\.tsx$',
      },
    ],
  ],
  presets: [
    ['@babel/preset-env', { loose: true }],
    '@babel/preset-react',
    [
      '@emotion/babel-preset-css-prop',
      {
        autoLabel: false,
        labelFormat: '[filename]--[local]',
      },
    ],
  ],
  env: {
    static: {
      presets: [
        '@babel/preset-typescript',
        ['@babel/preset-env', { loose: true }],
        '@babel/preset-react',
        [
          '@emotion/babel-preset-css-prop',
          {
            autoLabel: false,
            labelFormat: '[filename]--[local]',
          },
        ],
      ],
    },
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react',
        ['@emotion/babel-preset-css-prop', { autoLabel: false }],
      ],
    },
  },
};
