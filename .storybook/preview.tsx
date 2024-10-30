import '@sumup-oss/design-tokens/fonts.css';
import '@sumup-oss/design-tokens/dynamic.css';
import '../packages/circuit-ui/styles/base.css';

import { light, components } from './themes';
import { withThemeProvider } from './decorators/withThemeProvider';
import { DocsContainer } from './components';
import { modes } from './modes';

export const parameters = {
  layout: 'centered',
  versions: {
    current: 'v8',
    previous: [
      { name: 'next', url: 'https://circuit-next.sumup-vercel.app' },
      { name: 'v7', url: 'https://circuit-v7.sumup-vercel.app' },
      { name: 'v6', url: 'https://circuit-v6.sumup-vercel.app' },
      { name: 'v5', url: 'https://circuit-v5.sumup-vercel.app' },
    ],
  },
  chromatic: {
    modes: {
      light: modes.light,
      dark: modes.dark,
    },
  },
  viewport: {
    viewports: {
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
      order: ['Introduction', 'Features'],
      includeName: true,
    },
  },
  docs: {
    theme: light,
    components,
    container: DocsContainer,
    toc: { title: 'On this page', headingSelector: 'h2, h3' },
  },
};

export const globalTypes = {
  colorScheme: {
    name: 'Color Scheme',
    description: 'Global theme for components',
    defaultValue: 'system',
    toolbar: {
      title: 'Color Scheme',
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
          icon: 'circlehollow',
        },
        {
          title: 'Dark (WIP)',
          value: 'dark',
          icon: 'circle',
        },
      ],
    },
  },
};

export const decorators = [withThemeProvider];
