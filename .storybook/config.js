import React from 'react';
import { configure } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { ThemeProvider } from 'emotion-theming';

import { standard } from '../src/themes';
import injectGlobalStyles from '../src/styles/global-styles';

// Dynamically decide wich styles to load.
if (PRODUCTION) {
  import('./circuit-ui-global.css');
}

if (!PRODUCTION) {
  injectGlobalStyles({ theme: standard });
}

// Sets the info addon's options.
setDefaults({
  header: false
});

const req = require.context('../src/components', true, /\.story\.js$/);

const withThemeProvider = storyFn => (
  <ThemeProvider theme={standard}>{storyFn()}</ThemeProvider>
);

const withStoryStyles = storyFn => {
  return (
    <div
      style={{
        backgroundColor: standard.colors.n100,
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
  addDecorator(withSmartKnobs);
  addDecorator(withKnobs);
  addDecorator(withStoryStyles);
  addDecorator(withThemeProvider);
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
