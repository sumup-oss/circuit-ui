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

import { FC, HTMLProps } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';

type Size = 'kilo' | 'mega';

export interface SubHeadingProps
  extends Omit<HTMLProps<HTMLHeadingElement>, 'size'> {
  /**
   * A Circuit UI subheading size.
   */
  size?: Size;
  /**
   * Removes the default bottom margin from the subheading.
   */
  noMargin?: boolean;
  /**
   * The HTML subheading element to render.
   */
  as?: string;
}

const baseStyles = ({ theme }: StyleProps) => css`
  label: sub-heading;
  text-transform: uppercase;
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacings.kilo};
`;

const sizeStyles = ({ theme, size = 'kilo' }: StyleProps & SubHeadingProps) =>
  size &&
  css`
    label: ${`sub-heading--${size}`};
    font-size: ${theme.typography.subHeadings[size].fontSize};
    line-height: ${theme.typography.subHeadings[size].lineHeight};
  `;

const noMarginStyles = ({ noMargin }: SubHeadingProps) =>
  noMargin &&
  css`
    label: sub-heading--no-margin;
    margin-bottom: 0;
  `;

/**
 * A flexible subheading component capable of rendering using any HTML heading
 * tag, except h1.
 */
export const SubHeading: FC<SubHeadingProps> = styled('h3', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'size'
})<SubHeadingProps>(baseStyles, sizeStyles, noMarginStyles);
