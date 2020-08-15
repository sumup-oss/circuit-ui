import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'emotion-theming';
import styled from '@emotion/styled';
import { light } from '@sumup/design-tokens';
import { TrackingRoot, TrackingView } from '@sumup/collector';

import { BaseStyles } from '../src';
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
  // withStoryStyles,
  withTrackingAction,
];
