module.exports = {
  stories: ['../**/*.(stories|story).(js|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-docs/',
    '@storybook/addon-storysource',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-jest',
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport'
  ]
};
