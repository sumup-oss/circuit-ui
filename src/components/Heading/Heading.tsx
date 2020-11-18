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

export interface HeadingProps
  extends Omit<HTMLProps<HTMLHeadingElement>, 'size'> {
  /**
   * A Circuit UI heading size.
   */
  size?: 'kilo' | 'mega' | 'giga' | 'tera' | 'peta' | 'exa' | 'zetta';
  /**
   * Removes the default bottom margin from the heading.
   */
  noMargin?: boolean;
  /**
   * The HTML heading element to render.
   */
  as?: string;
}

type Size = 'kilo' | 'mega' | 'giga' | 'tera' | 'peta' | 'exa' | 'zetta';

const mobileSizeMap: { [key in Size]: Size } = {
  kilo: 'kilo',
  mega: 'mega',
  giga: 'mega',
  tera: 'giga',
  peta: 'tera',
  exa: 'peta',
  zetta: 'peta',
};

const baseStyles = ({ theme }: StyleProps) => css`
  label: heading;
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacings.giga};
  color: ${theme.colors.black};
`;

const sizeStyles = ({ theme, size = 'peta' }: StyleProps & HeadingProps) =>
  size &&
  css`
    label: ${`heading--${size}`};
    font-size: ${theme.typography.headings[mobileSizeMap[size]].fontSize};
    line-height: ${theme.typography.headings[mobileSizeMap[size]].lineHeight};

    ${theme.mq.kilo} {
      font-size: ${theme.typography.headings[size].fontSize};
      line-height: ${theme.typography.headings[size].lineHeight};
    }
  `;

const noMarginStyles = ({ noMargin }: HeadingProps) =>
  noMargin &&
  css`
    label: heading--no-margin;
    margin-bottom: 0;
  `;

/**
 * A flexible heading component capable of rendering using any HTML heading tag.
 */
export const Heading: FC<HeadingProps> = styled('h2', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<HeadingProps>(baseStyles, sizeStyles, noMarginStyles);
