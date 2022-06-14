import ReactDOM from 'react-dom';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';
import { TrackingRoot, TrackingView } from '@sumup/collector';

import { BaseStyles } from '@sumup/circuit-ui';
import { theme, components } from './util/theme';
import { sortStories } from './util/story-helpers';

// Add group and story names to the sort order to explicitly order them.
// Items that are not included in the list are shown below the sorted items.
const SORT_ORDER = {
  Introduction: {
    'Welcome': {},
    'Getting Started': {},
    'Browser Support': {},
    'Contributing': {
      'Overview': {},
      'Code Conventions': {},
      'Browser support (for contributors)': {},
      'Testing': {},
      'Release Process': {},
      'Deprecations': {},
    },
  },
  Features: {
    'Theme': {},
    'Icons': {},
    'Style Mixins': {},
    'Event Tracking': {},
    'Base Components': {},
    'Static CSS': {},
  },
  Typography: { Headline: {}, SubHeadline: {}, Body: {} },
  Layout: {},
  Forms: {},
  Navigation: {
    TopNavigation: {},
    SideNavigation: {},
    Pagination: {},
    Tabs: {},
    Sidebar: {},
    Hamburger: {},
  },
  Notification: {},
  Components: {},
  Hooks: {},
  Patterns: {},
  Packages: {
    'circuit-ui': {},
    'design-tokens': {},
    'icons': {},
    'cna-template': {},
  },
};

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
    storySort: sortStories(SORT_ORDER),
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
