module.exports = {
  stories: [
    '../src/**/*.stories.@(js|ts|tsx|mdx)',
    '../docs/**/*.stories.@(js|ts|tsx|mdx)',
  ],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: { transpileManager: true },
    },
    '@storybook/addon-docs/',
    '@storybook/addon-storysource',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    'storybook-addon-performance',
  ],
  webpackFinal: transpileModules,
  managerWebpack: transpileModules,
};

// Transpile all node_modules under the @sumup/* namespace.
function transpileModules(config) {
  config.module.rules = config.module.rules.map((rule) => {
    // Modify all rules that apply to story files.
    if (
      rule.test &&
      rule.test instanceof RegExp &&
      ['.js', '.ts', '.tsx'].some((extension) => rule.test.test(extension))
    ) {
      return {
        ...rule,
        exclude: /node_modules\/(?!(@sumup|acorn-jsx)\/).*/,
      };
    }
    return rule;
  });
  return config;
}
