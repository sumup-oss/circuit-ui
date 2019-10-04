import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { ThemeProvider } from 'emotion-theming';
import styled from '@emotion/styled';

import { circuit } from '../src/themes';
import storybookTheme from './theme';
import BaseStyles from '../src/components/BaseStyles';

// Sets the info addon's options.
setDefaults({
  header: false
});

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  },
  options: {
    theme: storybookTheme,
    isFullscreen: false,
    panelPosition: 'right',
    isToolshown: true
  }
});

const req = require.context('../src/components', true, /\.story\.js$/);

const withThemeProvider = storyFn => (
  <ThemeProvider theme={circuit}>
    <div>
      <BaseStyles />
      {storyFn()}
    </div>
  </ThemeProvider>
);

const Story = styled.div`
  display: flex;
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

const loadStories = () => {
  addDecorator(withKnobs);
  addDecorator(withStoryStyles);
  addDecorator(withThemeProvider);
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
