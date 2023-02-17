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

import { css, ThemeProvider } from '@emotion/react';
import { BodyLarge, spacing, cx } from '@sumup/circuit-ui';
import { light } from '@sumup/design-tokens';

import type { BodyLargeProps } from '@sumup/circuit-ui';
import type { Theme } from '@sumup/design-tokens';

/**
 * We need this to force children to have bodyLarge typography when the Intro
 * is rendered as a div.
 */
const childrenBodyLargeStyles = (theme: Theme) => css`
  > * {
    font-size: ${theme.typography.bodyLarge.fontSize} !important;
    line-height: ${theme.typography.bodyLarge.lineHeight} !important;
  }
`;

function Intro({
  children,
  ...props
}: {
  children: BodyLargeProps['children'];
}): JSX.Element {
  return (
    <ThemeProvider theme={light}>
      <div>
        <BodyLarge
          variant="subtle"
          css={cx(childrenBodyLargeStyles, spacing({ bottom: 'giga' }))}
          {...props}
        >
          {children}
        </BodyLarge>
      </div>
    </ThemeProvider>
  );
}

export default Intro;
