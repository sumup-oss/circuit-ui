import { configure } from '@storybook/react';

function loadStories() {
  require('../stories');
  require('../stories/button');
  require('../stories/logo');
}

configure(loadStories, module);
