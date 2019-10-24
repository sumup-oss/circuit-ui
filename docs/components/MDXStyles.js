/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';

import BaseStyles from '../../src/components/BaseStyles';
import { circuit } from '../../src/themes';

/**
 * FIXME: This is a hack to style the Markdown for Storybook Docs.
 * Unexplicably, the MDX elements don't render their custom components.
 * The styles are included with the Status badge. If it isn't used on a page,
 * the styles should be included manually.
 */
export const styles = theme => css`
  .sbdocs-content {
    > h1,
    > h2,
    > h3 {
      font-weight: bold;
      margin-bottom: ${theme.spacings.mega};
    }

    > h1 {
      font-size: ${theme.typography.headings.exa.fontSize};
      line-height: ${theme.typography.headings.exa.lineHeight};
    }

    > h2 {
      font-size: ${theme.typography.headings.tera.fontSize};
      line-height: ${theme.typography.headings.tera.lineHeight};
      margin-top: ${theme.spacings.peta};
    }

    > h3 {
      font-size: ${theme.typography.headings.giga.fontSize};
      line-height: ${theme.typography.headings.giga.lineHeight};
      margin-top: ${theme.spacings.giga};
    }

    > p,
    > ul > li,
    > ol > li {
      font-size: ${theme.typography.text.mega.fontSize};
      line-height: ${theme.typography.text.mega.lineHeight};
      margin-bottom: ${theme.spacings.mega};

      > strong {
        font-weight: bold;
      }

      > code {
        background: ${theme.colors.n200};
        border-radius: ${theme.borderRadius.mega};
        padding: 0 ${theme.spacings.bit};
      }
    }

    > pre {
      background: ${theme.colors.n200};
      border-radius: ${theme.borderRadius.mega};
      padding: ${theme.spacings.bit} ${theme.spacings.byte};
      margin-bottom: ${theme.spacings.mega};
    }

    > ul,
    > ol {
      padding-left: ${theme.spacings.kilo};
      margin-bottom: ${theme.spacings.mega};

      > li {
        margin-bottom: ${theme.spacings.bit};
        margin-left: ${theme.spacings.kilo};
      }
    }
  }
`;

const MDXStyles = () => (
  <ThemeProvider theme={circuit}>
    <BaseStyles />
    <Global styles={styles} />
  </ThemeProvider>
);

export default MDXStyles;
