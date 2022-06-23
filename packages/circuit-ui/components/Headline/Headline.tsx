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

import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';
import { withDeprecation } from '../../util/logger';

type Size = 'one' | 'two' | 'three' | 'four';

export interface HeadlineProps {
  /**
   * A Circuit UI headline size. Defaults to `one`.
   */
  size?: Size;
  /**
   * We're moving away from built-in margins. The `noMargin` prop is now
   * required and will be removed in v6 using codemods. Use the `spacing()`
   * mixin to add margin.
   */
  noMargin: true;
  /**
   * The HTML heading element to render.
   * Headings should be nested sequentially without skipping any levels.
   * Learn more at https://www.w3.org/WAI/tutorials/page-structure/headings/.
   */
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const baseStyles = ({ theme }: StyleProps) => css`
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.black};
  letter-spacing: -0.03em;
`;

const sizeStyles = ({ theme, size = 'one' }: StyleProps & HeadlineProps) => css`
  font-size: ${theme.typography.headline[size].fontSize};
  line-height: ${theme.typography.headline[size].lineHeight};
`;

const noMarginStyles = ({ theme, noMargin }: StyleProps & HeadlineProps) =>
  !noMargin &&
  css`
    margin-bottom: ${theme.spacings.giga};
  `;

const StyledHeadline = styled('h2', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<HeadlineProps>(baseStyles, sizeStyles, noMarginStyles);

StyledHeadline.displayName = 'Headline';

function deprecateFn(props: HeadlineProps) {
  if (!props.noMargin) {
    return 'The `noMargin` prop is required since v5. Read more at https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md#runtime-errors-for-missing-nomargin-props.';
  }
  return null;
}

/**
 * A flexible headline component capable of rendering any HTML heading element.
 */
export const Headline =
  process.env.UNSAFE_DISABLE_NO_MARGIN_ERRORS !== 'true' &&
  process.env.NODE_ENV !== 'production' &&
  process.env.NODE_ENV !== 'test'
    ? withDeprecation(StyledHeadline, deprecateFn, true)
    : StyledHeadline;
