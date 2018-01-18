import { injectGlobal } from 'emotion';

// TODO: make this define actual font faces and optimize for size.
//       I think there is a better way to do this nowadays without
//       @fontface.
export const fontFaces = `
  @font-face {
    font-family: aktiv-grotesk;
    src: url("https://use.typekit.net/dxb5kvg.css");
  }
`;

export const fontSettings = `
  color: $color-darker;
  font-feature-settings: 'kern';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  text-rendering: optimizeLegibility;
`;

export default ({ theme }) => injectGlobal`
  ${fontFaces}
  // Best practice from http://callmenick.com/post/the-new-box-sizing-reset
  // TLDR: It’s easier to override and a slight performance boost.
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: ${theme.fontSize.kilo};
    font-family: aktiv-grotesk;

    [type='button'] {
      appearance: none;
    }
  }

  body {
    font-size: ${theme.fontSize.kilo};
    font-weight: ${theme.fontWeight.regular};
    line-height: ${theme.lineHeight.kilo};
    font-family: aktiv-grotesk;
    ${fontSettings}
  }
`;
