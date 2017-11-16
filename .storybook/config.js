import { configure } from '@storybook/react';

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  require('../stories');
<<<<<<< HEAD
  req.keys().forEach((filename) => req(filename))
=======
  require('../stories/button');
  require('../stories/flash-alert');
<<<<<<< HEAD
>>>>>>> kebab case change
=======
>>>>>>> 5643129f550e16a344ef76094ae0ed261ecebee0
}

configure(loadStories, module);
