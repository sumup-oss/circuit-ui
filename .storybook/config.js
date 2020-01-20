import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ThemeProvider } from 'emotion-theming';
import styled from '@emotion/styled';
import requireContext from 'require-context.macro';

import { theme as themes, BaseStyles } from '../src';
import { theme, components } from './util/theme';
import { sortStories } from './util/story-helpers';

const { circuit } = themes;

// Add group and story names to the sort order to explicitly order them.
// Items that are not included in the list are shown below the sorted items.
const SORT_ORDER = {
  Introduction: [
    'Welcome',
    'Getting Started',
    'Design Principles',
    'Contributing',
    'Code of Conduct'
  ],
  Advanced: ['Static CSS', 'Base Components', 'Theme', 'Grid', 'Fonts'],
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
    showPanel: false,
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
addDecorator(withKnobs);

// These decorators need to be disabled for StoryShots to work.
if (!__TEST__) {
  const withTests = require('./util/withTests').default;
  addDecorator(withTests);
  addDecorator(withStoryStyles);
}

addDecorator(withThemeProvider);

configure(
  [
    requireContext('../src', true, /\.(stories|story)\.(js|ts|tsx|mdx)$/),
    requireContext('../docs', true, /\.(stories|story)\.(js|ts|tsx|mdx)$/)
  ],
  module
);
