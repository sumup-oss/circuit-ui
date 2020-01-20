import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

import { theme, components } from './util/theme';

addons.setConfig({
  theme,
  isFullscreen: false,
  showPanel: false,
  panelPosition: 'bottom',
  isToolshown: true
});
