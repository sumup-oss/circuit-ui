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

export interface SubHeadlineProps {
  /**
   * We're moving away from built-in margins. The `noMargin` prop is now
   * required and will be removed in v6 using codemods. Use the `spacing()`
   * mixin to add margin.
   */
  noMargin: true;
  /**
   * The HTML heading element to render. Headings should be nested sequentially
   * without skipping any levels. Learn more at
   * https://www.w3.org/WAI/tutorials/page-structure/headings/.
   */
  as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const baseStyles = ({ theme }: StyleProps) => css`
  text-transform: uppercase;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.typography.subHeadline.fontSize};
  line-height: ${theme.typography.subHeadline.lineHeight};
  color: ${theme.colors.black};
`;

const noMarginStyles = ({ theme, noMargin }: StyleProps & SubHeadlineProps) =>
  !noMargin &&
  css`
    margin-bottom: ${theme.spacings.kilo};
  `;

const StyledSubHeadline = styled('h3', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<SubHeadlineProps>(baseStyles, noMarginStyles);

function deprecateFn(props: SubHeadlineProps) {
  if (!props.noMargin) {
    return 'The `noMargin` prop is required since v5. Read more at https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md#runtime-errors-for-missing-nomargin-props.';
  }
  return null;
}

/**
 * A flexible SubHeadline component capable of rendering using any HTML heading
 * element, except h1.
 */
export const SubHeadline =
  process.env.UNSAFE_DISABLE_NO_MARGIN_ERRORS !== 'true' &&
  process.env.NODE_ENV !== 'production' &&
  process.env.NODE_ENV !== 'test'
    ? withDeprecation(StyledSubHeadline, deprecateFn, true)
    : StyledSubHeadline;
