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
      order: ['Introduction', 'Features'],
      includeName: true,
    },
  },
  docs: { theme: light, components, container: DocsContainer },
  stylesheetToggle: {
    stylesheets: [
      {
        id: 'blue',
        title: 'Current',
        url: 'themes/blue.css',
      },
    ],
  },
};

export const decorators = [
  withThemeProvider,
  withTrackingAction,
  withUnmountWhenHidden,
];
