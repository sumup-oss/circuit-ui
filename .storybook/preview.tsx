import { light, components } from './themes';
import { withThemeProvider } from './decorators/withThemeProvider';
import { withTrackingAction } from './decorators/withTrackingAction';
import { withUnmountWhenHidden } from './decorators/withUnmountWhenHidden';
import { DocsContainer } from './components';

export const parameters = {
  layout: 'centered',
  previewTabs: { 'storybook/docs/panel': { index: -1 } },
  actions: { argTypesRegex: '^on.*' },
  options: {
    storySort: {
      order: [
        'Introduction',
        'Features',
        '*',
        'Experimental',
        'Packages',
        'Contributing',
      ],
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
          title: 'Light',
          value: 'light',
          icon: 'circle',
        },
        {
          title: 'Dark',
          value: 'dark',
          icon: 'circlehollow',
        },
      ],
    },
  },
};

export const decorators = [
  withThemeProvider,
  withTrackingAction,
  withUnmountWhenHidden,
];
