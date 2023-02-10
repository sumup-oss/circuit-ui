import path from 'path';
import remarkGfm from 'remark-gfm';

const toPath = (_path: string) => path.join(process.cwd(), _path);

module.exports = {
  staticDirs: [toPath('.storybook/public')],
  stories: [
    '../packages/circuit-ui/**/*.@(mdx|stories.@(js|ts|tsx))',
    '../docs/**/*.@(mdx|stories.@(js|ts|tsx))',
  ],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        transpileManager: true,
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },

    '@storybook/addon-storysource',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-interactions',
    'storybook-stylesheet-toggle',
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  babel: async (options) => ({
    ...options,
    presets: [
      ...options.presets,
      // HACK: Storybook includes `@babel/preset-react` by default, which
      // overrides the custom preset configuration in `babel.config.json`.
      // This override overrides the override.
      [
        '@babel/preset-react',
        { runtime: 'automatic', importSource: '@emotion/react' },
        'preset-jsx-import-source',
      ],
    ],
  }),
};
