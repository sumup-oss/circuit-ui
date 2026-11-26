import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';
import path from 'node:path';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  staticDirs: [path.join(process.cwd(), '.storybook/public')],
  stories: [
    '../packages/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../docs/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  storySorts: [
    {
      order: [
        'Introduction',
        'Features',
        [
          'Theme',
          'Base Components',
          'Illustrations',
          'Utility Classes',
          'Style Mixins',
        ],
        'Icons',
        ['Overview', 'CardScheme', 'Flag', 'PaymentMethod'],
        'Typography',
      ],
    },
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
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-vitest',
    '@storybook/addon-mcp',
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal(viteConfig) {
    viteConfig.plugins = [
      ...(viteConfig.plugins || []),
      svgr({ include: '**/*.svg' }),
    ];

    return viteConfig;
  },
};

export default config;
