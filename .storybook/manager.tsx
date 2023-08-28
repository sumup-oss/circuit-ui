import { addons, types } from '@storybook/addons';

import { getTheme } from './themes';
import { PARAM_KEY as VERSIONS_PARAM_KEY, Versions } from './addons/versions';

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
