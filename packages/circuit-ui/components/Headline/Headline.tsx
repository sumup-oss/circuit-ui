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

type Size = 'one' | 'two' | 'three' | 'four';

export interface HeadlineProps
  extends Omit<HTMLProps<HTMLHeadingElement>, 'size'> {
  /**
   * A Circuit UI headline size.
   */
  size?: Size;
  /**
   * The HTML headline element to render.
   */
  as?: string;
}

const baseStyles = ({ theme }: StyleProps) => css`
  label: headline;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.black};
`;

const sizeStyles = ({ theme, size = 'one' }: StyleProps & HeadlineProps) => {
  if (!size) {
    return null;
  }

  return css`
    label: ${`headline-${size}`};
    font-size: ${theme.typography.headline[size].fontSize};
    line-height: ${theme.typography.headline[size].lineHeight};
  `;
};

/**
 * A flexible headline component capable of rendering using any HTML headline tag.
 */
export const Headline: FC<HeadlineProps> = styled('h2', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<HeadlineProps>(baseStyles, sizeStyles);
