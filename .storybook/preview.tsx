import '@sumup/design-tokens/light.css';
import '../packages/circuit-ui/styles/base.css';

import { light, components } from './themes';
import { withThemeProvider } from './decorators/withThemeProvider';
import { withUnmountWhenHidden } from './decorators/withUnmountWhenHidden';
import { DocsContainer } from './components';

export const parameters = {
  layout: 'centered',
  versions: {
    current: 'v8',
    previous: [
      { name: 'v7', url: 'https://circuit-v7.sumup-vercel.app' },
      { name: 'v6', url: 'https://circuit-v6.sumup-vercel.app' },
      { name: 'v5', url: 'https://circuit-v5.sumup-vercel.app' },
    ],
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
  actions: { argTypesRegex: '^on.*' },
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

// TODO: Re-enable once a dark theme exists
// export const globalTypes = {
//   theme: {
//     name: 'Theme',
//     description: 'Global theme for components',
//     defaultValue: 'light',
//     toolbar: {
//       title: 'Theme',
//       icon: 'paintbrush',
//       items: [
//         {
//           title: 'Light',
//           value: 'light',
//           icon: 'circle',
//         },
//         {
//           title: 'Dark (WIP)',
//           value: 'dark',
//           icon: 'circlehollow',
//         },
//       ],
//     },
//   },
// };

export const decorators = [withThemeProvider, withUnmountWhenHidden];
