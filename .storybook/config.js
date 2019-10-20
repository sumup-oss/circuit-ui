import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeProvider } from 'emotion-theming';
import styled from '@emotion/styled';

import { circuit } from '../src/themes';
import BaseStyles from '../src/components/BaseStyles';
import withTests from './withTests';
import storybookTheme from './theme';

addParameters({
  options: {
    theme: storybookTheme,
    isFullscreen: false,
    panelPosition: 'bottom',
    isToolshown: true
  },
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
});

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

const withThemeProvider = storyFn => (
  <ThemeProvider theme={circuit}>
    <div>
      <BaseStyles />
      {storyFn()}
    </div>
  </ThemeProvider>
);

addDecorator(withTests);
addDecorator(withKnobs);
addDecorator(withStoryStyles);
addDecorator(withThemeProvider);

configure(
  require.context('../src', true, /\.(stories|story)\.(js|ts|tsx|mdx)$/),
  module
);
