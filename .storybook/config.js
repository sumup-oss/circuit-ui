import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeProvider } from 'emotion-theming';

import { circuit } from '../src/themes';
import BaseStyles from '../src/components/BaseStyles';
import withTests from './withTests';
import storybookTheme from './theme';

const req = require.context('../src/components', true, /\.story\.js$/);

addParameters({
  options: {
    theme: storybookTheme,
    isFullscreen: false,
    panelPosition: 'bottom',
    isToolshown: true
  }
});

const withThemeProvider = storyFn => (
  <ThemeProvider theme={circuit}>
    <div>
      <BaseStyles />
      {storyFn()}
    </div>
  </ThemeProvider>
);

const withStoryStyles = storyFn => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      {storyFn()}
    </div>
  );
};

const loadStories = () => {
  addDecorator(withTests);
  addDecorator(withKnobs);
  addDecorator(withStoryStyles);
  addDecorator(withThemeProvider);
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
