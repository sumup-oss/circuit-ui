import '@sumup-oss/design-tokens/fonts.css';
import '@sumup-oss/design-tokens/dynamic.css';
import '@sumup-oss/design-tokens/consumer-scoped.css';
import '@sumup-oss/illustrations/styles.css';
import '../packages/circuit-ui/styles/base.css';

import {
  FALLBACK_LOCALE,
  SUPPORTED_LOCALES,
} from '../packages/circuit-ui/util/i18n.js';

import { light, components } from './themes.js';
import { withThemeProvider } from './decorators/withThemeProvider.js';
import { withI18nProvider } from './decorators/withI18nProvider.js';
import { DocsContainer } from './components/DocsContainer.js';
import { modes } from './modes.js';

export const parameters = {
  layout: 'centered',
  versions: {
    current: 'v11',
    previous: [
      { name: 'v10', url: 'https://circuit-v10.sumup-vercel.app' },
      { name: 'v9', url: 'https://circuit-v9.sumup-vercel.app' },
      { name: 'v8', url: 'https://circuit-v8.sumup-vercel.app' },
      { name: 'v7', url: 'https://circuit-v7.sumup-vercel.app' },
      { name: 'v6', url: 'https://circuit-v6.sumup-vercel.app' },
      { name: 'v5', url: 'https://circuit-v5.sumup-vercel.app' },
    ],
  },
  chromatic: {
    modes: {
      light: modes.light,
      dark: modes.dark,
      consumer: modes.consumer,
    },
  },
  viewport: {
    options: {
      smallMobile: {
        name: 'Small mobile',
        styles: { width: '320px', height: '568px' },
      },
      largeMobile: {
        name: 'Large mobile',
        styles: { width: '414px', height: '896px' },
      },
      tablet: {
        name: 'Tablet',
        styles: { width: '834px', height: '1112px' },
      },
      desktop: {
        name: 'Desktop',
        styles: { width: '1280px', height: '1000px' },
      },
    },
  },
  previewTabs: { 'storybook/docs/panel': { index: -1 } },
  controls: { expanded: true },
  options: {
    storySort: {
      order: [
        'Introduction',
        'Features',
        [
          'Theme',
          'Base Components',
          'Illustrations',
          'Utility Classes',
          'Style Mixins',
        ],
        'Icons',
        ['Overview', 'CardScheme', 'Flag', 'PaymentMethod'],
        'Typography',
      ],
      includeName: true,
    },
  },
  docs: {
    theme: light,
    components,
    container: DocsContainer,
    toc: { title: 'On this page', headingSelector: 'h2, h3' },
    codePanel: true,
  },
};

// eslint-disable-next-line compat/compat
const languageName = new Intl.DisplayNames(FALLBACK_LOCALE, {
  type: 'language',
});

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Theme',
    defaultValue: 'system',
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: [
        {
          title: 'Match system',
          value: 'system',
          icon: 'mirror',
        },
        {
          title: 'Light',
          value: 'light',
          icon: 'sun',
        },
        {
          title: 'Dark',
          value: 'dark',
          icon: 'moon',
        },
        {
          title: 'Consumer',
          value: 'consumer',
          icon: 'lightning',
        },
      ],
    },
  },
  locale: {
    name: 'Locale',
    description: 'Locale',
    defaultValue: FALLBACK_LOCALE,
    toolbar: {
      title: 'Locale',
      icon: 'globe',
      items: SUPPORTED_LOCALES.map((locale) => ({
        title: languageName.of(locale) || locale,
        value: locale,
      })).sort((a, b) => a.title.localeCompare(b.title)),
    },
  },
};

export const decorators = [withThemeProvider, withI18nProvider];

// hide React 19 ref prop on all function components
export const argTypes = {
  ref: { table: { disable: true } },
};
