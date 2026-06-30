import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';
import path from 'node:path';
import remarkGfm from 'remark-gfm';
import { mergeConfig } from 'vite';
import type { PropItem } from 'react-docgen-typescript';

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
    '@storybook/addon-a11y',
    '@storybook/addon-links',
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(viteConfig) {
    // Add SVGR plugin
    viteConfig.plugins = [
      ...(viteConfig.plugins || []),
      svgr({
        // svgr options: https://react-svgr.com/docs/options/
        include: '**/*.svg',
      }),
    ];

    return mergeConfig(viteConfig, {
      define: {
        'process.env.UNSAFE_DISABLE_ELEMENT_ERRORS': false,
      },
      resolve: {
        alias: {
          'storybook/internal/theming': 'storybook/theming',
        },
      },
    });
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    // @ts-expect-error unknown type issue
    reactDocgenTypescriptOptions: {
      exclude: ['.storybook/**/*'],
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop: PropItem) => {
        // @ts-expect-error deprecated tag exists
        const deprecation = prop.tags.deprecated as string;
        if (deprecation) {
          prop.description = `<strong>⚠️ Deprecated:</strong> ${deprecation}<br/>${prop.description}`;
        }

        if (prop.name === 'children') {
          return true;
        }

        return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true;
      },
    },
  },
};

export default config;
