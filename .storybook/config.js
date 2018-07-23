import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';
import { ThemeProvider } from 'emotion-theming';

import { standard } from '../src/themes';
import injectGlobalStyles from '../src/styles/global-styles';

// Dynamically decide wich styles to load.
if (__PRODUCTION__) {
  require('./circuit-ui-global.css');
} else {
  injectGlobalStyles({ theme: standard });
}

// Sets the info addon's options.
setDefaults({
  header: false
});

setOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
  name: "Circuit UI",
  url: "https://github.com/sumup/circuit-ui",
});

const req = require.context('../src/components', true, /\.story\.js$/);

const withThemeProvider = storyFn => (
  <ThemeProvider theme={standard}>{storyFn()}</ThemeProvider>
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
  addDecorator(withKnobs);
  addDecorator(withStoryStyles);
  addDecorator(withThemeProvider);
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
