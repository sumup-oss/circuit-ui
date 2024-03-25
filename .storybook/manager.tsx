import { addons, types } from '@storybook/manager-api';

import { dark, light, listenToColorScheme } from './themes.js';
import { PARAM_KEY as VERSIONS_PARAM_KEY, Versions } from './addons/versions';

addons.setConfig({
  isFullscreen: false,
  showPanel: true,
  showToolbar: true,
  panelPosition: 'bottom',
});

/**
 * Switch color scheme based on the global types or system preferences
 */
addons.register('color-scheme', (api) => {
  const setTheme = (colorScheme: 'dark' | 'light') => {
    api.setOptions({ theme: colorScheme === 'dark' ? dark : light });
    document.documentElement.dataset.colorScheme = colorScheme;
  };

  listenToColorScheme(api, setTheme);
});

/**
 * Switch to older version of the documentation
 */
addons.register('version-switcher', () => {
  addons.add(VERSIONS_PARAM_KEY, {
    type: types.TOOL,
    title: 'Versions',
    match: ({ viewMode }) => !!(viewMode && viewMode?.match(/^(story|docs)$/)),
    render: Versions,
  });
});
