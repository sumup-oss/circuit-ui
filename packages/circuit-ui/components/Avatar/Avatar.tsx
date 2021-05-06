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

import { HTMLAttributes } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';

export interface AvatarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
  /**
   * Image to render
   */
  imageUrl?: string;
  /**
   * Shape of the Avatar
   */
  variant?: 'square' | 'round';
  /**
   * Size of the Avatar
   */
  size?: 'small' | 'large';
  /**
   * Alternative DOM element to render
   */
  as?: 'label';
  /**
   * htmlFor when the element is a label
   * TODO the element should extend either a div or a label
   */
  htmlFor?: string;
}

const avatarSizes = {
  large: '96px',
  small: '48px',
};

const baseStyles = ({
  theme,
  imageUrl,
  variant = 'square',
  size = 'large',
}: AvatarProps & StyleProps) => css`
  display: block;
  width: ${avatarSizes[size]};
  height: ${avatarSizes[size]};
  box-shadow: inset 0 0 0 ${theme.borderWidth.kilo} rgba(0, 0, 0, 0.1);
  border-radius: ${variant === 'round'
    ? theme.borderRadius.circle
    : theme.borderRadius.tera};
  border: none;
  background-color: ${theme.colors.n200};

  ${imageUrl &&
  css`
    background-image: url(${imageUrl});
    background-size: cover;
    background-position: center;
  `};
`;

/**
 * The Avatar component.
 */
export const Avatar = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<AvatarProps>(baseStyles);
