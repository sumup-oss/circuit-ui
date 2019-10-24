import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
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
