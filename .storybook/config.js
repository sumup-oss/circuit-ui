import { configure } from '@storybook/react';

function loadStories() {
  require('../stories');
  require('../stories/button');
  require('../stories/notification');
}

configure(loadStories, module);
