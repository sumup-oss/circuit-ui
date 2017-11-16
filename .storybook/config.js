import { configure } from '@storybook/react';

function loadStories() {
  require('../stories');
  require('../stories/button');
  require('../stories/flash-alert');
}

configure(loadStories, module);
