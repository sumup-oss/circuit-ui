import { configure } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';

// Sets the info addon's options.
setDefaults({
  header: false
});

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  require('../stories');
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
