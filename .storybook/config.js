import { configure } from '@storybook/react';

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  require('../stories');
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
