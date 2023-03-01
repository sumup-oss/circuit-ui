/**
 * Copyright 2021, SumUp Ltd.
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

type Size = 'one' | 'two' | 'three' | 'four';

export interface TitleProps {
  /**
   * A Circuit UI title size. Defaults to `one`.
   */
  size?: Size;
  /**
   * The HTML heading element to render.
   * Headings should be nested sequentially without skipping any levels.
   * Learn more at https://www.w3.org/WAI/tutorials/page-structure/headings/.
   */
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const baseStyles = ({ theme }: StyleProps) => css`
  font-weight: ${theme.fontWeight.bold};
  color: var(--cui-fg-normal);
  letter-spacing: -0.03em;
`;

const sizeStyles = ({ theme, size = 'one' }: StyleProps & TitleProps) => {
  if (!size) {
    return null;
  }

  return css`
    font-size: ${theme.typography.title[size].fontSize};
    line-height: ${theme.typography.title[size].lineHeight};
  `;
};

/**
 * A flexible title component capable of rendering any HTML heading element.
 */
export const Title = styled('h2', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<TitleProps>(baseStyles, sizeStyles);
