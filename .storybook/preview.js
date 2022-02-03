import { addParameters } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withPerformance } from 'storybook-addon-performance';
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
    'Contributing': {
      'Overview': {},
      'Code Conventions': {},
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
    'create-sumup-next-app': {},
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
  },
  viewMode: 'docs',
  previewTabs: { 'storybook/docs/panel': { index: -1 } },
  actions: { argTypesRegex: '^on.*' },
  options: {
    storySort: sortStories(SORT_ORDER),
  },
  docs: { theme, components },
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

// Run only client tasks in prod builds of Storybook, SSR tasks are failing.
// See https://github.com/atlassian-labs/storybook-addon-performance/pull/40
addParameters({
  performance: {
    allowedGroups:
      process.env.NODE_ENV === 'production' ? ['client'] : ['server', 'client'],
  },
});

export const decorators = [
  withThemeProvider,
  withTrackingAction,
  withPerformance,
];
