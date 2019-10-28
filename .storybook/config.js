import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ThemeProvider } from 'emotion-theming';
import styled from '@emotion/styled';

import { theme as themes, BaseStyles } from '../src';
import { theme, components } from './util/theme';
import { sortStories } from './util/story-helpers';
import withTests from './util/withTests';

const { circuit } = themes;

// Add group and story names to the sort order to explicitly order them.
// Items that are not included in the list are shown below the sorted items.
const SORT_ORDER = {
  Introduction: [
    'Welcome',
    'Developers',
    'Designers',
    'Contributing',
    'Code of Conduct'
  ],
  Styles: ['Static Styles', 'Theme'],
  Typography: ['Heading', 'SubHeading', 'Text'],
  Layout: [],
  Forms: [],
  Components: [],
  Icons: []
};

addParameters({
  options: {
    storySort: sortStories(SORT_ORDER),
    theme,
    isFullscreen: false,
    panelPosition: 'bottom',
    isToolshown: true
  },
  docs: {
    components
  }
});

const Story = styled.div`
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

const withStoryStyles = storyFn => {
  return <Story>{storyFn()}</Story>;
};

const withThemeProvider = storyFn => (
  <ThemeProvider theme={circuit}>
    <BaseStyles />
    {storyFn()}
  </ThemeProvider>
);

addDecorator(withA11y);
addDecorator(withTests);
addDecorator(withKnobs);
addDecorator(withStoryStyles);
addDecorator(withThemeProvider);

configure(
  [
    require.context('../src', true, /\.(stories|story)\.(js|ts|tsx|mdx)$/),
    require.context('../docs', true, /\.(stories|story)\.(js|ts|tsx|mdx)$/)
  ],
  module
);
