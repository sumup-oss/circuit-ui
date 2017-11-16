import { configure } from '@storybook/react';

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  require('../stories');
<<<<<<< HEAD
  req.keys().forEach((filename) => req(filename))
=======
  require('../stories/button');
  require('../stories/logo');
>>>>>>> adding logo, needs svg loader
}

configure(loadStories, module);
