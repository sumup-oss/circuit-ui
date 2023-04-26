import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import remarkGfm from 'remark-gfm';
import { mergeConfig } from 'vite';
import turbosnap from 'vite-plugin-turbosnap';

const toPath = (_path: string) => path.join(process.cwd(), _path);

const config: StorybookConfig = {
  staticDirs: [toPath('.storybook/public')],
  stories: [
    '../packages/circuit-ui/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../docs/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  addons: [
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
    '@storybook/addon-toolbars',
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins:
        configType === 'PRODUCTION'
          ? [turbosnap({ rootDir: config.root ?? process.cwd() })]
          : [],
    });
  },
};

export default config;
