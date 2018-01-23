import { configure } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

import { standard } from '../src/themes';
import globalStyles from '../src/styles/global-styles';

// Sets the info addon's options.
setDefaults({
  header: false
});

const req = require.context('../src/components', true, /\.story\.js$/);

function loadStories() {
  globalStyles({ theme: standard });
  addDecorator(withSmartKnobs);
  addDecorator(withKnobs);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
