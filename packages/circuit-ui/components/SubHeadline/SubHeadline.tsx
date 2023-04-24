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

import styled, { StyleProps } from '../../styles/styled.js';

export interface SubHeadlineProps {
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
  color: var(--cui-fg-normal);
`;

/**
 * A flexible SubHeadline component capable of rendering using any HTML heading
 * element, except h1.
 */
export const SubHeadline = styled('h3', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<SubHeadlineProps>(baseStyles);
