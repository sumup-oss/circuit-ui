import { configure } from '@storybook/react';

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  require('../stories');
<<<<<<< HEAD
  req.keys().forEach((filename) => req(filename))
=======
  require('../stories/button');
  require('../stories/notification');
>>>>>>> a9ea553b40716b2d060f3e276696ffb89085e704
}

configure(loadStories, module);
