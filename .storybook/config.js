import { configure } from '@storybook/react';

function loadStories() {
  require('../stories');
  require('../stories/button');
  require('../stories/flash_alert');
}

configure(loadStories, module);
