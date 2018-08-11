import { babel } from 'docz-plugin-babel6';
import { circuit as theme } from './themes';

export default {
  dest: './dist',
  base: '/',
  plugins: [babel()],
  modifyBabelRc: config => config,
  hashRouter: true,
  themeConfig: {
    colors: {
      white: theme.colors.white,
      grayExtraLight: theme.colors.n100,
      grayLight: theme.colors.n300,
      gray: theme.colors.n500,
      grayDark: theme.colors.n700,
      grayExtraDark: theme.colors.n900,
      dark: theme.colors.n900,
      blue: theme.colors.b500,
      skyBlue: theme.colors.b300,
      primary: theme.colors.b500,
      text: theme.colors.n900,
      link: theme.colors.p500,
      footerText: theme.colors.n700,
      sidebarBg: theme.colors.n100,
      sidebarText: theme.colors.n900,
      background: theme.colors.white,
      border: theme.colors.n300,
      theadColor: theme.colors.n500,
      theadBg: theme.colors.n300,
      tableColor: theme.colors.n700,
      tooltipBg: theme.colors.n900,
      tooltipColor: theme.colors.n100,
      codeBg: theme.colors.n100,
      codeColor: theme.colors.n700,
      preBg: theme.colors.n100
    }
  },
  modifyBundlerConfig: config => {
    const idx = config.module.rules.findIndex(
      r => r.test.toString() === '/\\.(svg)(\\?.*)?$/'
    );

    config.module.rules[idx] = {
      test: /\.svg$/,
      use: [
        {
          loader: 'react-svg-loader',
          options: {
            es5: true
          }
        }
      ]
    };

    return config;
  }
};
