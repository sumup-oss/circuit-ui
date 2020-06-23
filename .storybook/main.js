module.exports = {
  stories: [
    '../src/**/*.(stories|story).(js|ts|tsx|mdx)',
    '../docs/**/*.(stories|story).(js|ts|tsx|mdx)'
  ],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: { transpileManager: true }
    },
    '@storybook/addon-docs/',
    '@storybook/addon-storysource',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport'
  ]
};
