import '@sumup/design-tokens/light.css';
import '../packages/circuit-ui/styles/base.css';

import { light, components } from './themes';
import { withThemeProvider } from './decorators/withThemeProvider';
import { withUnmountWhenHidden } from './decorators/withUnmountWhenHidden';
import { DocsContainer } from './components';

export const parameters = {
  layout: 'centered',
  versions: {
    current: 'v7',
    previous: [
      { name: 'v6', url: 'https://circuit-v6.sumup-vercel.app' },
      { name: 'v5', url: 'https://circuit-v5.sumup-vercel.app' },
    ],
  },
  previewTabs: { 'storybook/docs/panel': { index: -1 } },
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true },
  options: {
    storySort: {
      order: ['Introduction', 'Features'],
      includeName: true,
    },
  },
  docs: { theme: light, components, container: DocsContainer },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'legacy',
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: [
        {
          title: 'Legacy',
          value: 'legacy',
          icon: 'paintbrush',
        },
        {
          title: 'Light (WIP)',
          value: 'light',
          icon: 'circle',
        },
        {
          title: 'Dark (WIP)',
          value: 'dark',
          icon: 'circlehollow',
        },
      ],
    },
  },
};

export const decorators = [withThemeProvider, withUnmountWhenHidden];

// TODO: Remove this comment
