import ReactDOM from 'react-dom';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';
import { TrackingRoot, TrackingView } from '@sumup/collector';

import { theme, components } from './theme';

export const parameters = {
  layout: 'centered',
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: light.colors.bodyBg },
      { name: 'dark', value: light.colors.n900 },
    ],
    grid: {
      disable: true,
    },
  },
  viewMode: 'docs',
  previewTabs: { 'storybook/docs/panel': { index: -1 } },
  actions: { argTypesRegex: '^on.*' },
  options: {
    storySort: {
      order: ['Introduction', 'Welcome', 'Features'],
      includeName: true,
    },
  },
  docs: { theme, components },
};

const withUnmountWhenHidden = (Story, context) => {
  if (context.canvasElement) {
    const config = { attributeFilter: ['hidden'] };

    const observer = new MutationObserver(() => {
      if (context.canvasElement.getAttribute('hidden') === 'true') {
        ReactDOM.unmountComponentAtNode(context.canvasElement);
        observer.disconnect();
      }
    });

    observer.observe(context.canvasElement, config);
  }
  return <Story />;
};

const withThemeProvider = (Story) => (
  <ThemeProvider theme={light}>
    <BaseStyles />
    <Story />
  </ThemeProvider>
);

const withTrackingAction = (Story) => (
  <TrackingRoot name="tracking-root" onDispatch={action('Tracking event')}>
    <TrackingView name="tracking-view">
      <Story />
    </TrackingView>
  </TrackingRoot>
);

export const decorators = [
  withThemeProvider,
  withTrackingAction,
  withUnmountWhenHidden,
];
