import { configure } from '@storybook/react';

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  require('../stories');
<<<<<<< HEAD
  req.keys().forEach((filename) => req(filename))
=======
  require('../stories/button');
  require('../stories/flash_alert');
>>>>>>> flash alerts are done. UI != behavior, right?
}

configure(loadStories, module);
