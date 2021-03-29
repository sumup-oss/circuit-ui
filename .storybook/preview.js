import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withPerformance } from 'storybook-addon-performance';
import { ThemeProvider } from 'emotion-theming';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { light } from '@sumup/design-tokens';
import { TrackingRoot, TrackingView } from '@sumup/collector';

import { BaseStyles } from '../packages/circuit-ui';
import { theme, components } from './util/theme';
import { sortStories } from './util/story-helpers';

// Add group and story names to the sort order to explicitly order them.
// Items that are not included in the list are shown below the sorted items.
const SORT_ORDER = {
  Introduction: [
    'Welcome',
    'Getting Started',
    'Design Principles',
    'Contributing',
    'Code of Conduct',
  ],
  Advanced: [
    'Theme',
    'Icons',
    'Style Mixins',
    'Base Components',
    'Event Tracking',
    'Static CSS',
  ],
  Typography: ['Heading', 'SubHeading', 'Text'],
  Layout: [],
  Forms: [],
  Components: [],
  Icons: [],
};

export const parameters = {
  layout: 'centered',
  actions: { argTypesRegex: '^on.*' },
  options: {
    storySort: sortStories(SORT_ORDER),
  },
  docs: { theme, components },
};

const StoryStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  .sbdocs & {
    min-height: auto;
  }
`;

const globalStyles = (theme) => css`
  code {
    padding: 0.15em 0.2em 0.05em;
    margin: -0.15em 0 -0.05em;
    border-radius: 0.2em;
    background: ${theme.colors.n200};
  }

  pre code {
    background: inherit;
  }
`;

const withStoryStyles = (Story) => {
  return (
    <StoryStyles>
      <Story />
    </StoryStyles>
  );
};

const withThemeProvider = (Story) => (
  <ThemeProvider theme={light}>
    <BaseStyles />
    <Global styles={globalStyles} />
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
  // withStoryStyles,
  withTrackingAction,
  withPerformance,
];
