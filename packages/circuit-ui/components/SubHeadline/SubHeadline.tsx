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

import { FC, HTMLAttributes } from 'react';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';
import { deprecate } from '../../util/logger';

export interface SubHeadlineProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Removes the default bottom margin from the subheading.
   */
  noMargin?: boolean;
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
  margin-bottom: ${theme.spacings.kilo};
  color: ${theme.colors.black};
`;

const noMarginStyles = ({ noMargin }: SubHeadlineProps) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    !noMargin
  ) {
    deprecate(
      'SubHeadline',
      'The default outer spacing in the SubHeadline component is deprecated.',
      'Use the `noMargin` prop to silence this warning.',
      'Read more at https://github.com/sumup-oss/circuit-ui/issues/534.',
    );
    return null;
  }
  return css`
    margin-bottom: 0;
  `;
};

/**
 * A flexible SubHeadline component capable of rendering using any HTML heading
 * element, except h1.
 */
export const SubHeadline: FC<SubHeadlineProps> = styled('h3', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<SubHeadlineProps>(baseStyles, noMarginStyles);
