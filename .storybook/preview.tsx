import { light } from './themes';
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
      order: ['Introduction', 'Welcome', 'Features'],
      includeName: true,
    },
  },
  docs: { theme: light, container: DocsContainer },
};

export const decorators = [
  withThemeProvider,
  withTrackingAction,
  withUnmountWhenHidden,
];
