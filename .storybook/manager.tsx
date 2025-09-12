import '@sumup-oss/design-tokens/dynamic.css';

// biome-ignore lint/correctness/noUnusedImports: React must be in scope to use JSX
import React, { type CSSProperties } from 'react';
import { addons, types } from 'storybook/manager-api';

import { dark, light, listenToColorScheme } from './themes.js';
import { PARAM_KEY as VERSIONS_PARAM_KEY, Versions } from './addons/versions';

type BadgeConfig = {
  style: CSSProperties;
  label: string;
};

const badges: Record<string, BadgeConfig> = {
  // 'status:stable' is excluded to reduce visual clutter
  'status:experimental': {
    label: 'Experimental',
    style: {
      color: 'var(--cui-fg-promo)',
      backgroundColor: 'var(--cui-bg-promo)',
      borderColor: 'var(--cui-border-promo)',
    },
  },
  'status:under-review': {
    label: 'Under Review',
    style: {
      color: 'var(--cui-fg-warning)',
      backgroundColor: 'var(--cui-bg-warning)',
      borderColor: 'var(--cui-border-warning)',
    },
  },
  'status:legacy': {
    label: 'Legacy',
    style: {
      color: 'var(--cui-fg-warning)',
      backgroundColor: 'var(--cui-bg-warning)',
      borderColor: 'var(--cui-border-warning)',
    },
  },
  'status:deprecated': {
    label: 'Deprecated',
    style: {
      color: 'var(--cui-fg-danger)',
      backgroundColor: 'var(--cui-bg-danger)',
      borderColor: 'var(--cui-border-danger)',
    },
  },
  'status:internal': {
    label: 'Internal',
    style: {
      color: 'var(--cui-fg-normal)',
      backgroundColor: 'var(--cui-bg-subtle)',
      borderColor: 'var(--cui-border-normal)',
    },
  },
};

addons.setConfig({
  isFullscreen: false,
  showPanel: true,
  showToolbar: true,
  panelPosition: 'bottom',
  sidebar: {
    filters: {
      patterns: (item) => !item.tags?.includes('hidden'),
    },
    renderLabel(item) {
      if (item.type !== 'component') {
        return item.name;
      }

      let badge: BadgeConfig | undefined;

      for (const tag of item.tags) {
        badge = badges[tag];
        if (badge) {
          break;
        }
      }

      if (!badge) {
        return item.name;
      }

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
            flex: 1,
          }}
        >
          <span>{item.name}</span>
          <span
            style={{
              ...badge.style,
              display: 'inline-block',
              padding: '2px 6px',
              fontSize: '12px',
              lineHeight: '1',
              textAlign: 'center',
              borderRadius: 'var(--cui-border-radius-pill)',
              borderWidth: 'var(--cui-border-width-kilo)',
              borderStyle: 'solid',
            }}
          >
            {badge.label}
          </span>
        </div>
      );
    },
  },
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
    match: ({ viewMode }) =>
      viewMode ? /^(story|docs)$/.test(viewMode) : false,
    render: Versions,
  });
});
