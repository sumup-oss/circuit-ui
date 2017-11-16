import { configure } from '@storybook/react';

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  require('../stories');
<<<<<<< HEAD
  req.keys().forEach((filename) => req(filename))
=======
  require('../stories/button');
  require('../stories/flash-alert');
>>>>>>> kebab case change
}

configure(loadStories, module);
