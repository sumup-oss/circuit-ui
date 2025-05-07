import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import remarkGfm from 'remark-gfm';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  staticDirs: [path.join(process.cwd(), '.storybook/public')],
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
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-toolbars',
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      define: {
        'process.env.UNSAFE_DISABLE_ELEMENT_ERRORS': false,
      },
    });
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
