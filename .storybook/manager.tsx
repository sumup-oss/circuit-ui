import { addons } from '@storybook/addons';

import { getTheme } from './themes';

addons.setConfig({
  isFullscreen: false,
  showPanel: true,
  showToolbar: true,
  panelPosition: 'bottom',
});

/**
 * Automatically switch light/dark theme based on system preferences
 */
addons.register('auto-theme-switcher', (api) => {
  const query = window?.matchMedia('(prefers-color-scheme: dark)');

  const theme = getTheme(query.matches);

  api.setOptions({ theme });

  query.addEventListener('change', (event) => {
    const updatedTheme = getTheme(event.matches);

    api.setOptions({ theme: updatedTheme });
  });
});
