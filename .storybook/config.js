import { configure } from '@storybook/react';

function loadStories() {
  require('../stories');
  require('../stories/button');
}

configure(loadStories, module);
