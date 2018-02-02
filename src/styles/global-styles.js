import { injectGlobal } from 'emotion';
import { textMega } from './style-helpers';

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

export default ({ theme }) => injectGlobal`
  /* http://meyerweb.com/eric/tools/css/reset/
   * v2.0 | 20110126
   * License: none (public domain)
   */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
  	margin: 0;
  	padding: 0;
  	border: 0;
  	font-size: 100%;
  	font: inherit;
  	vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
  	display: block;
  }
  body {
  	line-height: 1;
  }
  ol, ul {
  	list-style: none;
  }
  blockquote, q {
  	quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
  	content: '';
  	content: none;
  }
  table {
  	border-collapse: collapse;
  	border-spacing: 0;
  }

  /* Our globals */
  ${fontFaces}
  ${fontSettings}

  /**
   * Best practice from http://callmenick.com/post/the-new-box-sizing-reset
   * TLDR: It’s easier to override and a slight performance boost.
   */
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
    ${textMega({ theme })}
  }

`;
