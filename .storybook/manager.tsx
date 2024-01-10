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
  const setTheme = (prefersDark: boolean) => {
    api.setOptions({ theme: getTheme(prefersDark) });
    document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';
  };

  const query = window?.matchMedia('(prefers-color-scheme: dark)');

  setTheme(query.matches);

  query.addEventListener('change', (event) => {
    setTheme(event.matches);
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
