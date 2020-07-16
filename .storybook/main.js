module.exports = {
  stories: [
    '../src/**/*.(stories|story).(js|ts|tsx|mdx)',
    '../docs/**/*.(stories|story).(js|ts|tsx|mdx)',
  ],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: { transpileManager: true },
    },
    '@storybook/addon-docs/',
    '@storybook/addon-storysource',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
  ],
  webpack: (config) => {
    config.module.rules = config.module.rules.map((rule) => {
      // We want to override the rule for `.js` files only.
      if (rule.test && rule.test instanceof RegExp && rule.test.test('.js')) {
        return {
          ...rule,
          exclude: /node_modules\/(?!(@sumup|acorn-jsx)\/).*/,
        };
      }
      return rule;
    });
    // {
    //     test: /\.js$/,
    //     include: /node_modules\/acorn-jsx/,
    //     use: [
    //       {
    //         loader: 'babel-loader',
    //         options: {
    //           presets: [
    //             [
    //               '/Users/connorbaer/Code/GitHub/sumup-oss/circuit-ui/node_modules/@babel/preset-env/lib/index.js',
    //               { modules: 'commonjs' }
    //             ]
    //           ]
    //         }
    //       }
    //     ]
    //   },
    return config;
  },
};
