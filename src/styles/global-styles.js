import { injectGlobal } from 'emotion';
import { bodyMega } from './style-helpers';

// TODO: make this define actual font faces and optimize for size.
//       I think there is a better way to do this nowadays without
//       @fontface.
export const fontFaces = `
  @import url("https://use.typekit.net/dxb5kvg.css");
`;

export const fontSettings = `
  font-feature-settings: 'kern';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  text-rendering: optimizeLegibility;
`;

export const typeMarginResets = `
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
`;

export default ({ theme }) => injectGlobal`
  ${fontFaces}
  ${fontSettings}
  // Best practice from http://callmenick.com/post/the-new-box-sizing-reset
  // TLDR: It’s easier to override and a slight performance boost.
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-family: aktiv-grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI";

    [type='button'] {
      appearance: none;
    }
  }

  body {
    color: ${theme.colors.black};
    font-weight: ${theme.fontWeight.regular};
    font-family: aktiv-grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI";
    ${bodyMega({ theme })}
  }
`;
